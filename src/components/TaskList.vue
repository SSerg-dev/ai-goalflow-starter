<script setup lang="ts">
import { computed } from 'vue'
import { useProjectStore } from '@/stores/projectStore'
import { useTaskStore } from '@/stores/taskStore'
import { useTimerStore } from '@/stores/timerStore'
import { formatMinutes } from '@/services/time'
import type { Task } from '@/types/models'

const projectStore = useProjectStore()
const taskStore = useTaskStore()
const timerStore = useTimerStore()

const projectMap = computed(() => {
  return new Map(projectStore.projects.map((project) => [project.id, project.title]))
})

function changeStatus(taskId: string, event: Event): void {
  const target = event.target as HTMLSelectElement
  taskStore.updateTaskStatus(taskId, target.value as Task['status'])
}
</script>

<template>
  <div class="card stack">
    <div class="row" style="justify-content: space-between;">
      <h2>Tasks</h2>

      <select v-model="taskStore.selectedStatus" class="select" style="max-width: 180px;">
        <option value="all">All</option>
        <option value="todo">Todo</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>
    </div>

    <div class="item-list" v-if="taskStore.filteredTasks.length">
      <div class="item" v-for="task in taskStore.filteredTasks" :key="task.id">
        <div class="task-row">
          <div>
            <strong>{{ task.title }}</strong>
            <div class="muted">Project: {{ projectMap.get(task.projectId) ?? 'Unknown project' }}</div>
            <div class="muted">Time: {{ formatMinutes(task.spentMinutes) }}</div>
          </div>

          <div class="row">
            <select class="select" style="width: 110px;" :value="task.status" @change="changeStatus(task.id, $event)">
              <option value="todo">todo</option>
              <option value="doing">doing</option>
              <option value="done">done</option>
            </select>

            <button
              v-if="timerStore.activeTimer?.taskId !== task.id"
              class="button success"
              :disabled="timerStore.isRunning"
              @click="timerStore.startTimer(task.id)"
            >
              Start
            </button>

            <button
              v-else
              class="button danger"
              @click="timerStore.stopTimer"
            >
              Stop
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty">No tasks found.</div>
  </div>
</template>
