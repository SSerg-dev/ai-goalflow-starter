import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Task } from '@/types/models'
import { loadFromStorage, saveToStorage } from '@/services/storageService'

const STORAGE_KEY = 'goalflow_tasks'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(loadFromStorage<Task[]>(STORAGE_KEY, []))
  const selectedStatus = ref<'all' | Task['status']>('all')

  watch(tasks, (value) => saveToStorage(STORAGE_KEY, value), { deep: true })

  function addTask(title: string, projectId: string): void {
    tasks.value.unshift({
      id: crypto.randomUUID(),
      projectId,
      title,
      status: 'todo',
      spentMinutes: 0,
      createdAt: new Date().toISOString()
    })
  }

  function updateTaskStatus(taskId: string, status: Task['status']): void {
    const task = tasks.value.find((item) => item.id === taskId)
    if (!task) return
    task.status = status
  }

  function addSpentMinutes(taskId: string, minutes: number): void {
    const task = tasks.value.find((item) => item.id === taskId)
    if (!task) return
    task.spentMinutes += minutes
  }

  function getTasksByProject(projectId: string): Task[] {
    return tasks.value.filter((task) => task.projectId === projectId)
  }

  const filteredTasks = computed(() => {
    if (selectedStatus.value === 'all') return tasks.value
    return tasks.value.filter((task) => task.status === selectedStatus.value)
  })

  const totalMinutes = computed(() => tasks.value.reduce((sum, task) => sum + task.spentMinutes, 0))

  return {
    tasks,
    selectedStatus,
    filteredTasks,
    totalMinutes,
    addTask,
    updateTaskStatus,
    addSpentMinutes,
    getTasksByProject
  }
})
