<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import type { DefaultTheme } from 'vitepress'

const { theme } = useData()

// Extract project links from the "Projects" dropdown in nav
const projects = computed(() => {
  const nav = theme.value.nav as DefaultTheme.NavItem[]
  const projectsEntry = nav.find(
    (item): item is DefaultTheme.NavItemWithChildren =>
      'items' in item && item.text === 'Projects'
  )
  if (!projectsEntry) return []
  return (projectsEntry.items as DefaultTheme.NavItemWithLink[]).filter(
    (item): item is DefaultTheme.NavItemWithLink => 'link' in item
  )
})

const year = new Date().getFullYear()
</script>

<template>
  <footer class="sf">
    <div class="sf__inner">
      <!-- Per-project quick-links row -->
      <nav class="sf__projects" aria-label="Projects">
        <a
          v-for="p in projects"
          :key="p.link"
          :href="p.link"
          class="sf__proj-link"
        >{{ p.text }}</a>
      </nav>

      <!-- Bottom strip: copyright + GitHub -->
      <div class="sf__meta">
        <span class="sf__copy">
          © {{ year }}
          <a
            href="https://github.com/KevinDeBenedetti"
            target="_blank"
            rel="noopener"
          >Kevin De Benedetti</a>
        </span>

        <a
          href="https://github.com/KevinDeBenedetti"
          target="_blank"
          rel="noopener"
          class="sf__gh"
          aria-label="GitHub profile"
        >
          <!-- GitHub mark SVG -->
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
              1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
              1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
              1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.sf {
  border-top: 1px solid var(--glass-border);
  background: var(--glass-bg);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
}

.sf__inner {
  max-width: 1152px;
  margin: 0 auto;
  padding: 1rem 1.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* Project links row */
.sf__projects {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.25rem;
  align-items: center;
  justify-content: center;
}

.sf__proj-link {
  font-size: 0.8rem;
  color: var(--vp-c-text-3);
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.sf__proj-link:hover {
  color: var(--vp-c-text-1);
}

/* Bottom meta row */
.sf__meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.sf__copy {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
}

.sf__copy a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
}

.sf__copy a:hover {
  color: var(--vp-c-text-1);
}

/* GitHub icon */
.sf__gh {
  color: var(--vp-c-text-3);
  display: flex;
  align-items: center;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.sf__gh:hover {
  color: var(--vp-c-text-1);
}

/* Mobile: full width, text center already set via justify-content: center */
@media (max-width: 639px) {
  .sf__inner {
    padding: 0.75rem 1rem 0.5rem;
  }
}
</style>
