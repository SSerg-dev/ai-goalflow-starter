<script setup lang="ts">
import { computed } from 'vue'
import { exportJson } from '@/services/exportService'
import { formatMinutes } from '@/services/time'
import { useGoalStore } from '@/stores/goalStore'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'
import { useTimerStore } from '@/stores/timerStore'

const goalStore = useGoalStore()
const projectStore = useProjectStore()
const taskStore = useTaskStore()
const timerStore = useTimerStore()

const completedTasks = computed(() => taskStore.tasks.filter((task) => task.status === 'done').length)

function exportBackup(): void {
  exportJson('goalflow-backup.json', {
    goals: goalStore.goals,
    projects: projectStore.projects,
    tasks: taskStore.tasks,
    timeEntries: timerStore.entries,
    exportedAt: new Date().toISOString()
  })
}
</script>

<template>
  <section class="page">
    <div class="grid-2">
      <div class="card stack">
        <h2>Summary</h2>
        <div class="row"><span class="badge">Goals: {{ goalStore.goals.length }}</span></div>
        <div class="row"><span class="badge">Projects: {{ projectStore.projects.length }}</span></div>
        <div class="row"><span class="badge">Tasks done: {{ completedTasks }}</span></div>
        <div class="row"><span class="badge">Time: {{ formatMinutes(taskStore.totalMinutes) }}</span></div>
      </div>

      <div class="card stack">
        <h2>Export</h2>
        <p>Download all app data as JSON backup.</p>
        <button class="button" @click="exportBackup">Export JSON</button>
      </div>
    </div>

    <div class="card">
      <h2>Recent Time Entries</h2>
      <div class="item-list" v-if="timerStore.entries.length">
        <div class="item" v-for="entry in timerStore.entries.slice(0, 10)" :key="entry.id">
          <strong>Task ID: {{ entry.taskId }}</strong>
          <div class="muted">Start: {{ new Date(entry.startAt).toLocaleString() }}</div>
          <div class="muted">End: {{ entry.endAt ? new Date(entry.endAt).toLocaleString() : 'Running now' }}</div>
        </div>
      </div>
      <div v-else class="empty">No time entries yet.</div>
    </div>
  </section>
</template>
