import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Project } from '@/types/models'
import { loadFromStorage, saveToStorage } from '@/services/storageService'

const STORAGE_KEY = 'goalflow_projects'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>(loadFromStorage<Project[]>(STORAGE_KEY, []))

  watch(projects, (value) => saveToStorage(STORAGE_KEY, value), { deep: true })

  function addProject(title: string, goalId: string): void {
    projects.value.unshift({
      id: crypto.randomUUID(),
      goalId,
      title,
      status: 'active',
      createdAt: new Date().toISOString()
    })
  }

  function getProjectsByGoal(goalId: string): Project[] {
    return projects.value.filter((project) => project.goalId === goalId)
  }

  const totalProjects = computed(() => projects.value.length)

  return { projects, totalProjects, addProject, getProjectsByGoal }
})
