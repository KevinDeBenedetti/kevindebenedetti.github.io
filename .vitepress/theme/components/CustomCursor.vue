<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isSupported = ref(false)
const isVisible   = ref(false)

// Inner dot — instant tracking
const dotX = ref(-200)
const dotY = ref(-200)

// Outer ring — lerped tracking
const ringX = ref(-200)
const ringY = ref(-200)
let _ringX = -200
let _ringY = -200

// Interaction state
const isClicking  = ref(false)
const hoverType   = ref<'' | 'link' | 'button' | 'input'>('')
const hoverHint   = ref('')

let rafId = 0
let clickTimer: ReturnType<typeof setTimeout> | null = null

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function tick() {
  _ringX = lerp(_ringX, dotX.value, 0.12)
  _ringY = lerp(_ringY, dotY.value, 0.12)
  ringX.value = _ringX
  ringY.value = _ringY
  rafId = requestAnimationFrame(tick)
}

function onMouseMove(e: MouseEvent) {
  dotX.value = e.clientX
  dotY.value = e.clientY
  if (!isVisible.value) isVisible.value = true

  const target = e.target as Element

  const link = target.closest('a')
  if (link) {
    const href  = link.getAttribute('href') ?? ''
    const isExt = link.getAttribute('target') === '_blank' || /^https?:\/\//.test(href)
    hoverType.value = 'link'
    hoverHint.value = isExt ? '↗' : '→'
    return
  }

  if (target.closest('button, [role="button"]')) {
    hoverType.value = 'button'
    hoverHint.value = ''
    return
  }

  if (target.closest('input, textarea, select')) {
    hoverType.value = 'input'
    hoverHint.value = ''
    return
  }

  hoverType.value = ''
  hoverHint.value = ''
}

function onMouseDown() {
  isClicking.value = true
  if (clickTimer) clearTimeout(clickTimer)
  clickTimer = setTimeout(() => {
    isClicking.value = false
    clickTimer = null
  }, 380)
}

function onDocLeave()  { isVisible.value = false }
function onDocEnter()  { isVisible.value = true  }

onMounted(() => {
  if (typeof window === 'undefined') return
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

  isSupported.value = true
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mousedown', onMouseDown)
  document.documentElement.addEventListener('mouseleave', onDocLeave)
  document.documentElement.addEventListener('mouseenter', onDocEnter)
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (!isSupported.value) return
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mousedown', onMouseDown)
  document.documentElement.removeEventListener('mouseleave', onDocLeave)
  document.documentElement.removeEventListener('mouseenter', onDocEnter)
  cancelAnimationFrame(rafId)
  if (clickTimer) clearTimeout(clickTimer)
})
</script>

<template>
  <Teleport v-if="isSupported" to="body">
    <div
      class="cc"
      :class="[
        hoverType ? `cc--${hoverType}` : '',
        { 'cc--clicking': isClicking, 'cc--hidden': !isVisible },
      ]"
      aria-hidden="true"
    >
      <!-- Outer ring (lagged, glass) -->
      <div
        class="cc__ring-pos"
        :style="{ transform: `translate(${ringX}px, ${ringY}px)` }"
      >
        <div class="cc__ring">
          <span v-if="hoverHint" class="cc__hint">{{ hoverHint }}</span>
        </div>
      </div>

      <!-- Inner dot (instant) -->
      <div
        class="cc__dot"
        :style="{ transform: `translate(${dotX}px, ${dotY}px)` }"
      />
    </div>
  </Teleport>
</template>

<style scoped>
/* ── Root overlay ─────────────────────────────────────── */
.cc {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
  transition: opacity 0.3s ease;
}

.cc.cc--hidden { opacity: 0; }

/* ── Dot ──────────────────────────────────────────────── */
.cc__dot {
  position: fixed;
  top:  -3px;
  left: -3px;
  width:  6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-gold);
  will-change: transform;
  transition: opacity 0.15s ease;
}

.cc--clicking .cc__dot {
  opacity: 0.35;
}

/* ── Ring position anchor (no size, just a point) ─────── */
.cc__ring-pos {
  position: fixed;
  top:  0;
  left: 0;
  will-change: transform;
}

/* ── Ring visual ──────────────────────────────────────── */
.cc__ring {
  width:  40px;
  height: 40px;
  border-radius: 50%;
  /* Center around the position anchor */
  margin: -20px 0 0 -20px;

  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px) saturate(160%);
  -webkit-backdrop-filter: blur(8px) saturate(160%);
  border: 1.5px solid rgba(244, 211, 94, 0.3);
  box-shadow:
    0 0 12px rgba(244, 211, 94, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    width  0.32s cubic-bezier(0.22, 1, 0.36, 1),
    height 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    margin 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    background   0.25s ease,
    box-shadow   0.25s ease;
}

/* ── Hover: link ──────────────────────────────────────── */
.cc--link .cc__ring {
  width:  54px;
  height: 54px;
  margin: -27px 0 0 -27px;
  border-color: var(--color-gold);
  background: rgba(244, 211, 94, 0.08);
  box-shadow:
    0 0 24px rgba(244, 211, 94, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
}

/* ── Hover: button ────────────────────────────────────── */
.cc--button .cc__ring {
  width:  54px;
  height: 54px;
  margin: -27px 0 0 -27px;
  border-color: rgba(13, 59, 102, 0.55);
  background: rgba(13, 59, 102, 0.08);
  box-shadow:
    0 0 20px rgba(13, 59, 102, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

/* ── Hover: input ─────────────────────────────────────── */
.cc--input .cc__ring {
  width:  48px;
  height: 24px;
  border-radius: 12px;
  margin: -12px 0 0 -24px;
  border-color: rgba(244, 211, 94, 0.45);
}

/* ── Click pulse ──────────────────────────────────────── */
.cc--clicking .cc__ring {
  animation: cc-click-pulse 0.38s cubic-bezier(0, 0.6, 0.4, 1);
}

@keyframes cc-click-pulse {
  0%   { transform: scale(1);   opacity: 1; }
  40%  { transform: scale(1.7); opacity: 0.25; }
  100% { transform: scale(1);   opacity: 1; }
}

/* ── Hint label ───────────────────────────────────────── */
.cc__hint {
  font-size: 15px;
  font-weight: 700;
  color: var(--color-gold);
  opacity: 0;
  transform: scale(0.6);
  transition:
    opacity   0.2s ease 0.06s,
    transform 0.2s cubic-bezier(0.22, 1, 0.36, 1) 0.06s;
  pointer-events: none;
  display: block;
  line-height: 1;
}

.cc--link   .cc__hint,
.cc--button .cc__hint {
  opacity: 1;
  transform: scale(1);
}

/* ── Dark mode tint adjustments ───────────────────────── */
.dark .cc__ring {
  background: rgba(8, 16, 34, 0.18);
  border-color: rgba(244, 211, 94, 0.25);
}

.dark .cc--link .cc__ring {
  background: rgba(244, 211, 94, 0.06);
}

.dark .cc--button .cc__ring {
  background: rgba(77, 157, 224, 0.08);
  border-color: rgba(77, 157, 224, 0.45);
}
</style>
