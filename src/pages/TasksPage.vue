<script setup lang="ts">
import ActiveTimerCard from '@/components/ActiveTimerCard.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskList from '@/components/TaskList.vue'
import { useProjectStore } from '@/stores/projectStore'

const projectStore = useProjectStore()
</script>

<template>
  <section class="page">
    <div class="grid-2">
      <TaskForm />
      <div class="card">
        <h2>Task Tips</h2>
        <p>Create tasks inside projects.</p>
        <p class="muted">Current projects: {{ projectStore.projects.length }}</p>
      </div>
    </div>

    <ActiveTimerCard />
    <TaskList />
  </section>
</template>
