<script setup lang="ts">
interface Project {
  title: string
  description: string
  repo: string
  slug: string
}

const projects: Project[] = [
  {
    title: 'Docs Generator',
    description: 'Documentation for this documentation hub — sync, generation, and contribution guides.',
    repo: 'KevinDeBenedetti/kevindebenedetti.github.io',
    slug: 'docs',
  },
  {
    title: 'Dotfiles',
    description: 'Dotfiles and setup scripts for fast environment provisioning.',
    repo: 'KevinDeBenedetti/dotfiles',
    slug: 'dotfiles',
  },
  {
    title: 'Github Workflows',
    description: 'Collection of reusable GitHub Actions workflows for automating CI/CD and repository tasks.',
    repo: 'KevinDeBenedetti/github-workflows',
    slug: 'github-workflows',
  },
  {
    title: 'K3s Lab',
    description: 'k3s-lab — Reproducible, lightweight k3s clusters for experiments, demos, and CI',
    repo: 'KevinDeBenedetti/k3s-lab',
    slug: 'k3s-lab',
  },
  {
    title: 'Notes',
    description: 'Personal dev notes & references in Markdown.',
    repo: 'KevinDeBenedetti/notes',
    slug: 'notes',
  },
  {
    title: 'Tools',
    description: 'A collection of reusable tools to initialize, configure, and automate projects.',
    repo: 'KevinDeBenedetti/tools',
    slug: 'tools',
  },
]

const getDocLink = (slug: string) => {
  if (slug === 'docs') return '/docs/'
  return `/${slug}/`
}

const getGitHubLink = (repo: string) => `https://github.com/${repo}`
</script>

<template>
  <div class="projects-table-wrapper">
    <table class="projects-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>Description</th>
          <th class="actions-col">Links</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="project in projects" :key="project.slug" class="project-row">
          <td class="project-name">
            <div class="project-title">{{ project.title }}</div>
          </td>
          <td class="project-desc">
            {{ project.description }}
          </td>
          <td class="project-actions">
            <a :href="getDocLink(project.slug)" class="action-link docs-link" title="View Documentation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Docs</span>
            </a>
            <a :href="getGitHubLink(project.repo)" target="_blank" rel="noopener noreferrer" class="action-link github-link" title="View on GitHub">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.projects-table-wrapper {
  width: 100%;
  margin: 2rem 0;
  overflow-x: auto;
}

.projects-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
}

.dark .projects-table {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

thead {
  background: var(--color-dark-blue);
  color: white;
}

.dark thead {
  background: var(--color-dark-blue-3);
}

th {
  padding: 1rem 1.5rem;
  text-align: left;
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

tbody tr {
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background-color 0.3s ease;
}

tbody tr:hover {
  background: var(--vp-c-bg-mute);
}

.dark tbody tr:hover {
  background: rgba(125, 211, 248, 0.05);
}

td {
  padding: 1.25rem 1.5rem;
  font-size: 0.95rem;
  vertical-align: top;
  overflow: visible;
}

.project-name {
  font-weight: 600;
  max-width: 200px;
  vertical-align: top;
}

.project-title {
  color: var(--vp-c-text-1);
}

.project-desc {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  max-width: 400px;
  vertical-align: top;
}

.actions-col {
  width: 220px;
  text-align: left;
}

.project-actions {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  vertical-align: top;
  flex-wrap: wrap;
}

.action-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  white-space: nowrap;
}

.docs-link {
  color: var(--color-dark-blue);
  background: rgba(91, 164, 214, 0.1);
  border-color: rgba(91, 164, 214, 0.2);
}

.dark .docs-link {
  color: var(--color-dark-blue-3);
  background: rgba(125, 211, 248, 0.1);
  border-color: rgba(125, 211, 248, 0.2);
}

.docs-link:hover {
  background: rgba(91, 164, 214, 0.2);
  border-color: rgba(91, 164, 214, 0.4);
  color: var(--color-dark-blue);
}

.dark .docs-link:hover {
  background: rgba(125, 211, 248, 0.2);
  border-color: rgba(125, 211, 248, 0.4);
  color: var(--color-dark-blue-3);
}

.github-link {
  color: #333;
  background: rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.1);
}

.dark .github-link {
  color: #e1e1e1;
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.github-link:hover {
  background: rgba(0, 0, 0, 0.1);
  border-color: rgba(0, 0, 0, 0.2);
}

.dark .github-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  th,
  td {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  .project-desc {
    max-width: 250px;
  }

  .project-actions {
    flex-direction: column;
    gap: 0.5rem;
  }

  .action-link {
    width: 100%;
    justify-content: center;
    padding: 0.4rem 0.6rem;
  }

  .action-link span {
    display: none;
  }
}

@media (max-width: 640px) {
  .projects-table-wrapper {
    margin: 1rem 0;
  }

  th,
  td {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  th {
    font-size: 0.75rem;
  }

  .project-name {
    max-width: 100px;
  }

  .project-desc {
    display: none;
  }

  .actions-col {
    width: auto;
  }

  .project-actions {
    flex-direction: row;
    gap: 0.25rem;
  }

  .action-link {
    padding: 0.3rem 0.5rem;
  }
}
</style>
