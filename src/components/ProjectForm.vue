<script setup lang="ts">
import { ref } from 'vue'
import { useGoalStore } from '@/stores/goalStore'
import { useProjectStore } from '@/stores/projectStore'

const goalStore = useGoalStore()
const projectStore = useProjectStore()

const title = ref('')
const goalId = ref('')

function submit(): void {
  if (!title.value.trim() || !goalId.value) return
  projectStore.addProject(title.value.trim(), goalId.value)
  title.value = ''
}
</script>

<template>
  <div class="card stack">
    <h2>Create Project</h2>
    <select v-model="goalId" class="select">
      <option disabled value="">Select goal</option>
      <option v-for="goal in goalStore.goals" :key="goal.id" :value="goal.id">
        {{ goal.title }}
      </option>
    </select>
    <input v-model="title" class="input" placeholder="Example: Portfolio Website" />
    <button class="button" @click="submit">Add Project</button>
  </div>
</template>
