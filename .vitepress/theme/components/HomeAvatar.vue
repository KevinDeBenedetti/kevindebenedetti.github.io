<template>
  <div class="home-avatar">
    <img
      class="home-avatar__img"
      src="/avatar.webp"
      alt="Kevin De Benedetti"
      width="256"
      height="256"
      decoding="async"
      fetchpriority="high"
    />
  </div>
</template>

<style scoped>
/* Static gradient ring (padding + background) — painted once, no animation loop */
.home-avatar {
  width: 160px;
  height: 160px;
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c-accent), var(--c-gold));
  box-shadow: var(--c-shadow-md);
  animation: avatarIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.home-avatar__img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid var(--c-bg);
  object-fit: cover;
  object-position: center top;
}

/* One-shot entrance — opacity/transform only (compositor-friendly) */
@keyframes avatarIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

@media (max-width: 959px) {
  .home-avatar { width: 120px; height: 120px; }
}

@media (max-width: 639px) {
  .home-avatar { width: 100px; height: 100px; }
}
</style>
