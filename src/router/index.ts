import { createRouter, createWebHistory } from 'vue-router'
import GoalsPage from '@/pages/GoalsPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import AnalyticsPage from '@/pages/AnalyticsPage.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/goals' },
    { path: '/goals', component: GoalsPage },
    { path: '/projects', component: ProjectsPage },
    { path: '/tasks', component: TasksPage },
    { path: '/analytics', component: AnalyticsPage }
  ]
})

export default router
