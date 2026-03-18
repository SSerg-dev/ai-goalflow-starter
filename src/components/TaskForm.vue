<script setup lang="ts">
import { ref } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'

const projectStore = useProjectStore()
const taskStore = useTaskStore()

const title = ref('')
const projectId = ref('')

function submit(): void {
  if (!title.value.trim() || !projectId.value) return
  taskStore.addTask(title.value.trim(), projectId.value)
  title.value = ''
}
</script>

<template>
  <div class="card stack">
    <h2>Create Task</h2>
    <select v-model="projectId" class="select">
      <option disabled value="">Select project</option>
      <option v-for="project in projectStore.projects" :key="project.id" :value="project.id">
        {{ project.title }}
      </option>
    </select>
    <input v-model="title" class="input" placeholder="Example: Write CSS" />
    <button class="button" @click="submit">Add Task</button>
  </div>
</template>
