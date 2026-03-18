<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import { useTimerStore } from '@/stores/timerStore'

const timerStore = useTimerStore()
const taskStore = useTaskStore()

const activeTaskTitle = computed(() => {
  const taskId = timerStore.activeTimer?.taskId
  const task = taskStore.tasks.find((item) => item.id === taskId)
  return task?.title ?? 'Unknown task'
})
</script>

<template>
  <div class="timer-box" v-if="timerStore.activeTimer">
    <div class="row" style="justify-content: space-between;">
      <div>
        <strong>Active task: {{ activeTaskTitle }}</strong>
        <div class="muted">Started at: {{ new Date(timerStore.activeTimer.startAt).toLocaleTimeString() }}</div>
      </div>
      <button class="button danger" @click="timerStore.stopTimer">Stop timer</button>
    </div>
  </div>
</template>
