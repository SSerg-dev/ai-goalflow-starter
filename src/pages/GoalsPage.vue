<script setup lang="ts">
import GoalForm from '@/components/GoalForm.vue'
import GoalList from '@/components/GoalList.vue'
import { useGoalStore } from '@/stores/goalStore'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'

const goalStore = useGoalStore()
const projectStore = useProjectStore()
const taskStore = useTaskStore()
</script>

<template>
  <section class="page">
    <div class="grid-2">
      <div class="card">
        <h2>Overview</h2>
        <div class="row">
          <span class="badge">Goals: {{ goalStore.totalGoals }}</span>
          <span class="badge">Projects: {{ projectStore.totalProjects }}</span>
          <span class="badge">Tasks: {{ taskStore.tasks.length }}</span>
        </div>
      </div>
      <GoalForm />
    </div>

    <GoalList />
  </section>
</template>
