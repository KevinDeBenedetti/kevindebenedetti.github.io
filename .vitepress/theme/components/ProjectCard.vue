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
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  box-shadow: var(--c-shadow-sm);
  text-decoration: none;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
}

.project-card:hover {
  border-color: color-mix(in srgb, var(--c-accent) 45%, var(--c-border));
  box-shadow: var(--c-shadow-md);
  transform: translateY(-2px);
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
  color: var(--c-accent);
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.project-card:hover .card-link {
  color: var(--c-accent-hover);
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
