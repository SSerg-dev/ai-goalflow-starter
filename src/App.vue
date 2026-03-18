<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
</script>

<template>
  <div class="app-shell">
    <AppSidebar />

    <main class="main-content">
      <header class="topbar">
        <div>
          <h1>GoalFlow</h1>
          <p>Simple local task manager with time tracking</p>
        </div>
      </header>

      <RouterView />
    </main>
  </div>
</template>
