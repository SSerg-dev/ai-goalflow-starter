import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { TimeEntry } from '@/types/models'
import { loadFromStorage, saveToStorage } from '@/services/storageService'
import { getDurationMinutes } from '@/services/time'
import { useTaskStore } from './taskStore'

const STORAGE_KEY = 'goalflow_time_entries'
const ACTIVE_STORAGE_KEY = 'goalflow_active_timer'

interface ActiveTimerState {
  entryId: string
  taskId: string
  startAt: string
}

export const useTimerStore = defineStore('timer', () => {
  const entries = ref<TimeEntry[]>(loadFromStorage<TimeEntry[]>(STORAGE_KEY, []))
  const activeTimer = ref<ActiveTimerState | null>(loadFromStorage<ActiveTimerState | null>(ACTIVE_STORAGE_KEY, null))

  watch(entries, (value) => saveToStorage(STORAGE_KEY, value), { deep: true })
  watch(activeTimer, (value) => saveToStorage(ACTIVE_STORAGE_KEY, value), { deep: true })

  function startTimer(taskId: string): void {
    if (activeTimer.value) return

    const entry: TimeEntry = {
      id: crypto.randomUUID(),
      taskId,
      startAt: new Date().toISOString()
    }

    entries.value.unshift(entry)
    activeTimer.value = {
      entryId: entry.id,
      taskId,
      startAt: entry.startAt
    }

    const taskStore = useTaskStore()
    taskStore.updateTaskStatus(taskId, 'doing')
  }

  function stopTimer(): void {
    if (!activeTimer.value) return

    const entry = entries.value.find((item) => item.id === activeTimer.value?.entryId)
    if (!entry) return

    const endAt = new Date().toISOString()
    entry.endAt = endAt

    const minutes = getDurationMinutes(entry.startAt, endAt)
    const taskStore = useTaskStore()
    taskStore.addSpentMinutes(entry.taskId, minutes)

    activeTimer.value = null
  }

  const isRunning = computed(() => activeTimer.value !== null)

  return { entries, activeTimer, isRunning, startTimer, stopTimer }
})
