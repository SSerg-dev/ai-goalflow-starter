<script setup lang="ts">
import { useGoalStore } from '@/stores/goalStore'

const goalStore = useGoalStore()
</script>

<template>
  <div class="card">
    <h2>Goals</h2>

    <div class="item-list" v-if="goalStore.goals.length">
      <div class="item" v-for="goal in goalStore.goals" :key="goal.id">
        <strong>{{ goal.title }}</strong>
        <span class="muted">Created: {{ new Date(goal.createdAt).toLocaleDateString() }}</span>
      </div>
    </div>

    <div v-else class="empty">No goals yet.</div>
  </div>
</template>
