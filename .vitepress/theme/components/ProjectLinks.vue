<script setup lang="ts">
interface Props {
  docsLink: string
  githubLink: string
}

defineProps<Props>()
</script>

<template>
  <div class="project-links">
    <a :href="docsLink" class="project-link docs-btn">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
      <span>Docs</span>
    </a>
    <a :href="githubLink" target="_blank" rel="noopener noreferrer" class="project-link github-btn">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
      </svg>
      <span>GitHub</span>
    </a>
  </div>
</template>

<style scoped>
.project-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: color 0.15s ease, border-color 0.15s ease;
  border: 1px solid transparent;
  white-space: nowrap;
}

.docs-btn {
  color: var(--c-accent);
  background: var(--c-accent-soft);
  border-color: color-mix(in srgb, var(--c-accent) 25%, transparent);
}

.docs-btn:hover {
  color: var(--c-accent-hover);
  border-color: color-mix(in srgb, var(--c-accent) 50%, transparent);
}

.github-btn {
  color: var(--c-text-1);
  background: var(--c-surface-2);
  border-color: var(--c-border);
}

.github-btn:hover {
  border-color: var(--c-text-3);
}

svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .project-links {
    flex-wrap: wrap;
    gap: 0.3rem;
  }

  .project-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }

  .project-link span {
    display: none;
  }
}
</style>
