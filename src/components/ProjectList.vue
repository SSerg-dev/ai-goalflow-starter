<script setup lang="ts">
import { computed } from 'vue'
import { useGoalStore } from '@/stores/goalStore'
import { useProjectStore } from '@/stores/projectStore'

const goalStore = useGoalStore()
const projectStore = useProjectStore()

const goalMap = computed(() => {
  return new Map(goalStore.goals.map((goal) => [goal.id, goal.title]))
})
</script>

<template>
  <div class="card">
    <h2>Projects</h2>

    <div class="item-list" v-if="projectStore.projects.length">
      <div class="item" v-for="project in projectStore.projects" :key="project.id">
        <strong>{{ project.title }}</strong>
        <div class="row">
          <span class="badge">{{ project.status }}</span>
          <span class="muted">Goal: {{ goalMap.get(project.goalId) ?? 'Unknown goal' }}</span>
        </div>
      </div>
    </div>

    <div v-else class="empty">No projects yet.</div>
  </div>
</template>
