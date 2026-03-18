import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Goal } from '@/types/models'
import { loadFromStorage, saveToStorage } from '@/services/storageService'

const STORAGE_KEY = 'goalflow_goals'

export const useGoalStore = defineStore('goals', () => {
  const goals = ref<Goal[]>(loadFromStorage<Goal[]>(STORAGE_KEY, [
    {
      id: crypto.randomUUID(),
      title: 'Learn Web Development',
      createdAt: new Date().toISOString()
    }
  ]))

  watch(goals, (value) => saveToStorage(STORAGE_KEY, value), { deep: true })

  function addGoal(title: string): void {
    goals.value.unshift({
      id: crypto.randomUUID(),
      title,
      createdAt: new Date().toISOString()
    })
  }

  const totalGoals = computed(() => goals.value.length)

  return { goals, totalGoals, addGoal }
})
