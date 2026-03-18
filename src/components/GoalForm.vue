<script setup lang="ts">
import { ref } from 'vue'
import { useGoalStore } from '@/stores/goalStore'

const goalStore = useGoalStore()
const title = ref('')

function submit(): void {
  if (!title.value.trim()) return
  goalStore.addGoal(title.value.trim())
  title.value = ''
}
</script>

<template>
  <div class="card stack">
    <h2>Create Goal</h2>
    <input v-model="title" class="input" placeholder="Example: Build Portfolio" />
    <button class="button" @click="submit">Add Goal</button>
  </div>
</template>
