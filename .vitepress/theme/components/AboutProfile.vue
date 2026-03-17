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
      <img src="/avatar.png" alt="Kevin De Benedetti" class="avatar" />
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
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-dark-blue);
  box-shadow: 0 4px 16px rgba(91, 164, 214, 0.4);
  transition: box-shadow 0.3s ease;
}

.dark .avatar {
  border-color: var(--color-dark-blue-3);
  box-shadow: 0 4px 16px rgba(125, 211, 248, 0.4);
}

.avatar:hover {
  box-shadow: 0 4px 24px rgba(91, 164, 214, 0.6);
}

.dark .avatar:hover {
  box-shadow: 0 4px 24px rgba(125, 211, 248, 0.6);
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
}

.about-title .first-name {
  color: var(--color-dark-blue);
  display: block;
}

.dark .about-title .first-name {
  color: var(--color-dark-blue-3);
}

.about-title .last-name {
  background: -webkit-linear-gradient(
    120deg,
    var(--color-gold) 10%,
    var(--color-dark-blue) 55%,
    var(--color-dark-blue-3) 90%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.about-job {
  margin: 0.75rem 0 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--color-gold-text);
}

.about-description {
  margin: 1.5rem 0 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.about-footer {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
}

.profile-links {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.profile-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  background: rgba(91, 164, 214, 0.1);
  border: 1px solid var(--glass-border);
  color: var(--color-dark-blue);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.dark .profile-link {
  background: rgba(125, 211, 248, 0.08);
  color: var(--color-dark-blue-3);
}

.profile-link:hover {
  background: rgba(91, 164, 214, 0.2);
  border-color: var(--color-dark-blue);
  transform: translateY(-2px);
}

.dark .profile-link:hover {
  background: rgba(125, 211, 248, 0.15);
  border-color: var(--color-dark-blue-3);
}

.profile-link :deep(svg) {
  width: 1.3rem;
  height: 1.3rem;
  flex-shrink: 0;
}

.link-label {
  font-weight: 500;
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
    font-size: 1.1rem;
  }

  .about-description {
    font-size: 0.95rem;
  }

  .about-center {
    height: 300px;
  }

  .orbit-container {
    width: 320px;
    height: 320px;
    margin-top: -160px;
    margin-left: -160px;
  }

  .orbit-container::before {
    width: 320px;
    height: 320px;
  }

  .orbit-container::after {
    width: 220px;
    height: 220px;
  }

  .avatar-orbit {
    width: 70px;
    height: 70px;
  }

  @keyframes orbit {
    0% {
      transform: rotate(0deg) translateX(130px);
    }
    100% {
      transform: rotate(360deg) translateX(130px);
    }
  }

  .avatar-planet {
    width: 70px;
    height: 70px;
  }

  .profile-links {
    gap: 0.8rem;
  }

  .profile-link {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>
