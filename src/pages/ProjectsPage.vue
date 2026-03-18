<script setup lang="ts">
import ProjectForm from '@/components/ProjectForm.vue'
import ProjectList from '@/components/ProjectList.vue'
</script>

<template>
  <section class="page">
    <div class="grid-2">
      <ProjectForm />
      <div class="card">
        <h2>How it works</h2>
        <p>Create a project and connect it to a goal.</p>
        <p class="muted">Example: Goal = Learn Web Development, Project = Portfolio Website.</p>
      </div>
    </div>

    <ProjectList />
  </section>
</template>
