<script setup lang="ts">
import { computed } from 'vue'
import type { Todos } from '../types'

type PropTypes = {
  todo: Todos
}

const props = defineProps<PropTypes>()

const emits = defineEmits<{
  (e: 'delete-todo', todo: Todos): void
}>()

const statusColor = computed(() => {
  switch (props.todo.status) {
    case 'i Have time for This':
      return 'is-warning'
    case 'Should be done this weak':
      return 'is-success'
    case 'Force':
      return 'is-danger'
    default:
      return '' 
  }
})

const deleteTodo = () => {
  emits('delete-todo', props.todo)
}
</script>

<template>
  <article class="box">
    <div class="media">
      <aside class="media-left">
        <img src="https://placehold.jp/150x150.png" alt="" />
      </aside>
      <div class="media-content">
        <p class="title is-4 is-spaced mb-1">
          {{ todo.name }}
        </p>
        <p class="subtitle mb-2">
          <span class="tag" :class="statusColor">{{ todo.status }}</span>
        </p>
        <div class="content mb-2">
          {{ todo.desc }}
        </div>
        <div>
          <button @click="deleteTodo" class="button is-small is-danger is-light">Delete</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style></style>