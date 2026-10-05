<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const showButton = ref(false)

function scrollToTop() {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({
    top: 0,
    behavior: reduceMotion ? 'auto' : 'smooth',
  })
}

function handleScroll() {
  showButton.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <Transition name="scroll-top">
    <button
      v-if="showButton"
      class="scroll-top"
      type="button"
      aria-label="Scroll to top"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.scroll-top {
  position: fixed;
  z-index: 100;
  right: 1rem;
  bottom: 1rem;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-text-2);
  box-shadow: var(--c-shadow-md);
  cursor: pointer;
  transition: color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.scroll-top:hover {
  color: var(--c-accent);
  border-color: var(--c-accent);
  transform: translateY(-2px);
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
