<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { TodoStatusList } from '../constants'
import type { Todos } from '../types'
import { looseIndexOf } from '@vue/shared'

const emit = defineEmits<{
  (e: 'add-new-todo', todo: Todos): void
  (e: 'cancel-new-todo'): void
}>()

const elNameInput = ref<HTMLInputElement | null>(null)

const newTodo = ref<Todos>({
  id: uuidv4(),
  name: '',
  desc: '',
  status: 'Force',
})

const addTodo = () => {
  emit('add-new-todo', newTodo.value)
}

const cancelNewTodo = () => {
  emit('cancel-new-todo')
}


onMounted(() => {
  elNameInput.value?.focus()
})
</script>

<template>
  <form @submit.prevent>
    <div class="field">
      <div class="field">
        <label for="name" class="label">Name</label>
        <div class="control">
          <input
            v-model="newTodo.name"
            type="text"
            class="input is-large"
            placeholder="title of todo..."
            required
            ref="elNameInput"
          />
        </div>
      </div>
      <div class="field">
        <label for="desc" class="label">description</label>
        <div class="control">
          <input v-model="newTodo.desc" type="text" class="input" placeholder="..." />
        </div>
      </div>
      <div class="field mb-5">
        <label for="status" class="label">Status</label>
        <div class="select">
          <select v-model="newTodo.status" id="status">
            <option v-for="status in TodoStatusList" :value="status" :key="`option-${status}`">
              {{ status }}
            </option>
          </select>
        </div>
      </div>
      <div class="field">
        <div class="buttons">
          <button @click="addTodo" class="button is-success">Create</button>
          <button @click="cancelNewTodo" class="button is-light">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style></style>