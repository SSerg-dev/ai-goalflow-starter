# GoalFlow

GoalFlow is a simple local task manager with time tracking.

This project demonstrates a minimal productivity application built with:

* Vue 3
* TypeScript
* Vite
* Pinia
* Vue Router
* localStorage

The goal of the project is to manage:

* Goals
* Projects
* Tasks
* Time tracking

All data is stored locally in the browser.

---

# Features

Current MVP features:

* Create Goals
* Create Projects
* Create Tasks
* Start and Stop timer for tasks
* Track time spent on tasks
* Filter tasks by status
* Store data locally
* Export data to JSON

---

# Project Structure

```
src
 ├ components
 │   ├ GoalList.vue
 │   ├ ProjectList.vue
 │   ├ TaskList.vue
 │   └ TimerButton.vue
 │
 ├ pages
 │   ├ GoalsPage.vue
 │   ├ ProjectsPage.vue
 │   ├ TasksPage.vue
 │   └ AnalyticsPage.vue
 │
 ├ stores
 │   ├ goalStore.ts
 │   ├ projectStore.ts
 │   ├ taskStore.ts
 │   └ timerStore.ts
 │
 ├ services
 │   ├ storageService.ts
 │   ├ timerService.ts
 │   └ exportService.ts
 │
 ├ types
 │   └ models.ts
 │
 ├ router
 │   └ index.ts
 │
 ├ App.vue
 └ main.ts
```

---

# Data Model

### Goal

```
interface Goal {
  id: string
  title: string
  createdAt: string
}
```

### Project

```
interface Project {
  id: string
  goalId: string
  title: string
  status: "active" | "done"
}
```

### Task

```
interface Task {
  id: string
  projectId: string
  title: string
  status: "todo" | "doing" | "done"
  spentMinutes: number
}
```

### TimeEntry

```
interface TimeEntry {
  id: string
  taskId: string
  startAt: string
  endAt?: string
}
```

---

# Running the Project

Install dependencies:

```
yarn install
```

Start development server:

```
yarn dev
```

Open browser:

```
http://localhost:5173
```

---

# Build

```
yarn build
```

Preview production:

```
yarn preview
```

---

# Export Data

The application can export all stored data as a JSON backup file.

---

# Conclusion

GoalFlow is a simple productivity application designed to demonstrate:

* hierarchical task management
* built-in time tracking
* local-first data storage
