export interface Goal {
  id: string
  title: string
  createdAt: string
}

export interface Project {
  id: string
  goalId: string
  title: string
  status: 'active' | 'done'
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  status: 'todo' | 'doing' | 'done'
  spentMinutes: number
  createdAt: string
}

export interface TimeEntry {
  id: string
  taskId: string
  startAt: string
  endAt?: string
}
