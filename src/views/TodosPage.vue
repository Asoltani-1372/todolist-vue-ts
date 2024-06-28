<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import NewTodoForm from '../components/NewTodoForm.vue'
import TodoCard from '../components/TodoCard.vue'
import type { Todos } from '../types'

const filterText = ref('')
const showNewForm = ref(false)
const TodosList = ref<Todos[]>([
]) 

const filteredTodsList = computed((): Todos[] => {
  console.log(TodosList)
  return TodosList.value.filter((Todo) => {
    if (Todo.name) {
      return Todo.name.toLowerCase().includes(filterText.value.toLowerCase())
    } else {
      return TodosList.value
    }
  })
})


const updateLocaleStorage = () => {
  localStorage.setItem("todo", JSON.stringify(TodosList.value))
}

const numberOfTodos = computed((): number => {
  return filteredTodsList.value.length
})

const addTodo = (payload: Todos) => {
  console.log(payload , TodosList)
  TodosList.value.push(payload)
  updateLocaleStorage()
  hideForm()
}

const deleteTodo = (payload: Todos) => {
  console.log("todoList", TodosList)
  TodosList.value = TodosList.value.filter((todo) => {
    return todo.id !== payload.id
  })
  updateLocaleStorage()
}



const hideForm = () => {
  showNewForm.value = false
}


onMounted(() => {
  const  initDataJson  =   window.localStorage.getItem("todo")

  if (initDataJson !== null) {
    const initData  = JSON.parse(initDataJson) as Todos[]
    console.log(initData , "initData")
    TodosList.value = initData
  }
  const route = useRoute()

  if (route.query.new) {
    showNewForm.value = true
  }
})
</script>

<template>
  <main class="section">
    <div class="columns">

      <!-- Main Content -->
      <div class="column">
        <h1 class="title">Todos</h1>

        <!-- CTA Bar -->
        <nav v-if="!showNewForm" class="level">
          <div class="level-left">
            <div class="level-item">
              <p class="subtitle is-5">
                <strong>{{ numberOfTodos }}</strong> todo
              </p>
            </div>

            <p class="level-item">
              <button @click="showNewForm = true" class="button is-success">Add Todo</button>
            </p>

            <div class="level-item is-hidden-tablet-only">
              <div class="field has-addons">
                <p class="control">
                  <input class="input" type="text" placeholder="Todo Item Name" v-model="filterText" />
                </p>
                <p class="control">
                  <button class="button">Search</button>
                </p>
              </div>
            </div>
          </div>
        </nav>

        <!-- New Todo Form -->
        <NewTodoForm v-if="showNewForm" @add-new-todo="addTodo" @cancel-new-todo="hideForm" />

        <!-- Display Results -->
        <div v-else class="columns is-multiline">
          <div v-for="item in filteredTodsList" class="column is-full" :key="`item-${item}`">
            <TodoCard :todo="item" @delete-todo="deleteTodo" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>