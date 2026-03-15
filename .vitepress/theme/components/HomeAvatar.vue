<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)
const wrapperRef = ref<HTMLElement | null>(null)
const imgOffsetX = ref(0)
const imgOffsetY = ref(0)

onMounted(() => {
  requestAnimationFrame(() => { visible.value = true })
})

function onMouseMove(e: MouseEvent) {
  const el = wrapperRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  // Move image opposite to cursor direction (elusive effect)
  imgOffsetX.value = -(e.clientX - cx) * 0.35
  imgOffsetY.value = -(e.clientY - cy) * 0.35
}

function onMouseLeave() {
  imgOffsetX.value = 0
  imgOffsetY.value = 0
}
</script>

<template>
  <div
    ref="wrapperRef"
    class="home-avatar-wrapper"
    :class="{ visible }"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <div class="avatar-ring" />
    <div class="avatar-glow" />
    <img
      class="avatar-img"
      src="/avatar.png"
      alt="Kevin De Benedetti"
      :style="{
        transform: `translate(${imgOffsetX}px, ${imgOffsetY}px) scale(1)`,
      }"
    />
  </div>
</template>

<style scoped>
.home-avatar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 160px;

  /* Glass background behind the avatar */
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.06) inset,
    0 8px 32px rgba(0, 0, 0, 0.18);

  opacity: 0;
  transform: scale(0.88);
  transition:
    opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.home-avatar-wrapper.visible {
  opacity: 1;
  transform: scale(1);
}

/* Pulsing outer glow ring */
.avatar-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    var(--color-gold),
    var(--color-dark-blue-3),
    var(--color-gold-2),
    var(--color-dark-blue),
    var(--color-gold)
  );
  animation: ringRotate 6s linear infinite;
  mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px));
  -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px));
  opacity: 0.85;
}

/* Ambient glow behind image */
.avatar-glow {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--color-gold-soft) 0%,
    var(--color-dark-blue-soft) 60%,
    transparent 100%
  );
  filter: blur(16px);
  animation: breathe 4s ease-in-out infinite;
  pointer-events: none;
}

/* Avatar image */
.avatar-img {
  position: relative;
  width: 124px;
  height: 124px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center top;

  /* Opacity so hero background shows through */
  opacity: 0.88;

  /* Glass-like border + sheen */
  border: 2px solid rgba(255, 255, 255, 0.28);
  box-shadow:
    0 0 0 3px var(--color-dark-blue-soft),
    0 8px 32px rgba(0, 0, 0, 0.28),
    inset 0 2px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(0, 0, 0, 0.12);

  animation: breathe 4s ease-in-out infinite;
  /* Smooth elusive movement */
  transition:
    transform 0.18s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.4s ease,
    filter 0.4s ease,
    opacity 0.4s ease;
  will-change: transform;
  cursor: default;
}

.home-avatar-wrapper:hover .avatar-img {
  opacity: 1;
  box-shadow:
    0 0 0 4px var(--color-gold-soft),
    0 16px 48px rgba(0, 0, 0, 0.36),
    0 0 40px var(--color-gold-soft),
    inset 0 2px 0 rgba(255, 255, 255, 0.25);
  filter: brightness(1.08) saturate(1.1);
}

.home-avatar-wrapper:hover .avatar-ring {
  animation: ringRotate 2s linear infinite;
  opacity: 1;
}

/* Breathing — subtle aspect-ratio-like scale oscillation */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.04); }
}

@keyframes ringRotate {
  to { transform: rotate(360deg); }
}

/* Responsive sizing */
@media (max-width: 959px) {
  .home-avatar-wrapper { width: 120px; height: 120px; }
  .avatar-img          { width: 94px; height: 94px; }
}

@media (max-width: 639px) {
  .home-avatar-wrapper { width: 100px; height: 100px; }
  .avatar-img          { width: 78px; height: 78px; }
}
</style>
