<script setup lang="ts">
interface Props {
  title: string
  description: string
  link: string
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <a :href="link" class="project-card">
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-description">{{ description }}</p>
      <span class="card-link">View docs →</span>
    </div>
  </a>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  backdrop-filter: var(--glass-blur);
  text-decoration: none;
  transition: all 0.3s ease;
}

.project-card:hover {
  background: var(--glass-bg-hover);
  border-color: var(--glass-border-hover);
  box-shadow: var(--glass-shadow-hover);
  transform: translateY(-4px);
}

.card-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.card-description {
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  flex-grow: 1;
}

.card-link {
  display: inline-flex;
  align-items: center;
  color: var(--color-dark-blue);
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.dark .card-link {
  color: var(--color-dark-blue-3);
}

.project-card:hover .card-link {
  color: var(--color-gold);
  transform: translateX(2px);
}

@media (max-width: 640px) {
  .project-card {
    padding: 1rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-description {
    font-size: 0.9rem;
  }
}
</style>
