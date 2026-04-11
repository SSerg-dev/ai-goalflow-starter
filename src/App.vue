<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'

const THEME_KEY = 'goalflow_theme'
const isDarkMode = ref(false)

const themeLabel = computed(() => (isDarkMode.value ? 'Dark' : 'Light'))

onMounted(() => {
  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme === 'dark' || savedTheme === 'light') {
    isDarkMode.value = savedTheme === 'dark'
    return
  }

  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
})

watch(
  isDarkMode,
  (isDark) => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  },
  { immediate: true }
)

function toggleTheme(): void {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div class="app-shell">
    <AppSidebar />

    <main class="main-content">
      <header class="topbar row">
        <div>
          <h1>GoalFlow</h1>
          <p>Simple local task manager with time tracking</p>
        </div>

        <button class="button secondary" type="button" @click="toggleTheme">
          Switch to {{ isDarkMode ? 'Light' : 'Dark' }} mode (Current: {{ themeLabel }})
        </button>
      </header>

      <RouterView />
    </main>
  </div>
</template>
