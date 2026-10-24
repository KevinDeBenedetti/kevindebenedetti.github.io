<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { nextTick, provide } from 'vue'

import HomeAvatar from './components/HomeAvatar.vue'
import ScrollTop from './components/ScrollTop.vue'
import SiteFooter from './components/SiteFooter.vue'
import { viewTransitionsEnabled } from './page-transition'

const { isDark } = useData()

/** Added to <html> while the appearance wipe runs (scopes its CSS). */
const SWITCHING_CLASS = 'vp-switching'

// Appearance toggle: circular wipe from the switch, VitePress's own example
// (https://vitepress.dev/guide/extending-default-theme#on-appearance-toggle).
// One snapshot pair, 300ms, then nothing — the same budget as a hover.
provide('toggle-appearance', ({ clientX, clientY }: MouseEvent) => {
  if (!viewTransitionsEnabled()) {
    isDark.value = !isDark.value
    return
  }

  const root = document.documentElement
  const x = (100 * clientX) / innerWidth
  const y = (100 * clientY) / innerHeight
  // Radius reaching the farthest viewport corner, in % of the viewport diagonal.
  const maxRadius =
    (100 *
      Math.hypot(
        Math.max(clientX, innerWidth - clientX),
        Math.max(clientY, innerHeight - clientY),
      )) /
    (Math.hypot(innerWidth, innerHeight) / Math.SQRT2)

  root.style.setProperty('--switch-x', `${x}%`)
  root.style.setProperty('--switch-y', `${y}%`)
  root.style.setProperty('--switch-r', `${maxRadius}%`)
  root.classList.add(SWITCHING_CLASS)

  document
    .startViewTransition(async () => {
      isDark.value = !isDark.value
      await nextTick()
    })
    .finished.catch(() => {})
    .finally(() => root.classList.remove(SWITCHING_CLASS))
})
</script>

<template>
  <DefaultTheme.Layout>
    <!-- https://vitepress.dev/guide/extending-default-theme#layout-slots -->
    <template #home-hero-image>
      <HomeAvatar />
    </template>
    <template #layout-bottom>
      <SiteFooter />
      <ScrollTop />
    </template>
  </DefaultTheme.Layout>
</template>
