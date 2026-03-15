<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isHomePage = computed(() => frontmatter.value.layout === 'home')

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/KevinDeBenedetti',
    icon: `<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
        0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
        -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
        .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
        -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0
        1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82
        1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01
        1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
    </svg>`,
  },
  {
    label: 'Portfolio',
    href: 'https://kevindb.dev',
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10
               15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>`,
  },
]
</script>

<template>
  <div v-if="isHomePage" class="home-social">
    <a
      v-for="link in links"
      :key="link.href"
      :href="link.href"
      :aria-label="link.label"
      target="_blank"
      rel="noopener noreferrer"
      class="home-social__link"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <span v-html="link.icon" />
    </a>
  </div>
</template>

<style scoped>
.home-social {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1.5rem 2.5rem;
  margin-top: -2rem;
}

.home-social__link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  transition: color 0.2s ease, transform 0.2s ease;
}

.home-social__link:hover {
  color: var(--color-dark-blue);
  transform: scale(1.15);
}

.dark .home-social__link:hover {
  color: var(--color-gold);
}

.home-social__link :deep(svg) {
  width: 1.6rem;
  height: 1.6rem;
}

@media (max-width: 639px) {
  .home-social__link :deep(svg) {
    width: 2rem;
    height: 2rem;
  }
}
</style>
