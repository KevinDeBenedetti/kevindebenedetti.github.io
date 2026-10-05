<script setup lang="ts">
import { ref } from 'vue'

const profile = {
  firstName: 'Kevin',
  lastName: 'De Benedetti',
  job: 'Full Stack Developer',
  description: 'Building open-source tools and documentation hubs. Passionate about clean code, automation, and developer experience.',
}

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
  <div class="about-profile">
    <!-- Top: Avatar -->
    <div class="avatar-wrapper">
      <img src="/avatar.webp" alt="Kevin De Benedetti" class="avatar" width="256" height="256" decoding="async" />
    </div>

    <!-- Header: Title, Job, Description -->
    <div class="about-header">
      <h1 class="about-title">
        <span class="first-name">{{ profile.firstName }}</span>
        <span class="last-name">{{ profile.lastName }}</span>
      </h1>
      <p class="about-job">{{ profile.job }}</p>
      <p class="about-description">{{ profile.description }}</p>
    </div>

    <!-- Bottom: Social Links -->
    <div class="about-footer">
      <div class="profile-links">
        <a
          v-for="link in links"
          :key="link.href"
          :href="link.href"
          :aria-label="link.label"
          target="_blank"
          rel="noopener noreferrer"
          class="profile-link"
        >
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="link.icon" />
          <span class="link-label">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-profile {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 2rem;
  align-items: center;
}

.avatar-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--c-accent), var(--c-gold));
  box-shadow: var(--c-shadow-md);
}

.avatar {
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--c-bg);
  object-fit: cover;
}

.about-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-title {
  margin: 0 0 0.5rem;
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.about-title .first-name {
  color: var(--c-text-1);
  display: block;
}

.about-title .last-name {
  background: linear-gradient(120deg, var(--c-accent) 30%, var(--c-gold));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.about-job {
  margin: 0.75rem 0 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--c-gold);
}

.about-description {
  margin: 1.5rem auto 0;
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--c-text-2);
  max-width: 600px;
}

.about-footer {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.profile-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 1.1rem;
  border-radius: 10px;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  color: var(--c-text-1);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: var(--c-shadow-sm);
  transition: color 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
}

.profile-link:hover {
  color: var(--c-accent);
  border-color: var(--c-accent);
  transform: translateY(-2px);
}

.profile-link :deep(svg) {
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
}

@media (max-width: 640px) {
  .about-profile {
    padding: 2rem 1rem;
    gap: 2.5rem;
  }

  .about-title {
    font-size: 2rem;
  }

  .about-job {
    font-size: 1.05rem;
  }

  .about-description {
    font-size: 0.95rem;
  }

  .profile-links {
    gap: 0.75rem;
  }

  .profile-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
