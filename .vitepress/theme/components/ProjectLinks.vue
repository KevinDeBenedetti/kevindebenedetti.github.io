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
  transition: all 0.2s ease;
  border: 1px solid transparent;
  white-space: nowrap;
}

.docs-btn {
  color: var(--color-dark-blue);
  background: rgba(91, 164, 214, 0.1);
  border-color: rgba(91, 164, 214, 0.2);
}

.dark .docs-btn {
  color: var(--color-dark-blue-3);
  background: rgba(125, 211, 248, 0.1);
  border-color: rgba(125, 211, 248, 0.2);
}

.docs-btn:hover {
  background: rgba(91, 164, 214, 0.2);
  border-color: rgba(91, 164, 214, 0.4);
}

.dark .docs-btn:hover {
  background: rgba(125, 211, 248, 0.2);
  border-color: rgba(125, 211, 248, 0.4);
}

.github-btn {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

.dark .github-btn {
  color: #e1e1e1;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.github-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.dark .github-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
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
