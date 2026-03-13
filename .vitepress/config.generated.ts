// ⚠️ GENERATED — do not edit manually.
// This file is overwritten on every deploy by scripts/generate-config.ts.
// Run `bun run generate` to regenerate locally (requires synced docs/).

import type { DefaultTheme } from 'vitepress'

export const generatedNav: DefaultTheme.NavItem[] = [
  {
    "text": "Home",
    "link": "/"
  },
  {
    "text": "Documentation",
    "link": "/documentation/"
  },
  {
    "text": "Dotfiles",
    "link": "/dotfiles/"
  },
  {
    "text": "GitHub Workflows",
    "link": "/github-workflows/"
  },
  {
    "text": "Tools",
    "link": "/tools/"
  }
]

export const generatedSidebar: DefaultTheme.SidebarMulti = {
  "/documentation/": [
    {
      "text": "Overview",
      "link": "/documentation/"
    },
    {
      "text": "Devops",
      "collapsed": true,
      "items": [
        {
          "text": "Docker",
          "link": "/documentation/devops/docker"
        },
        {
          "text": "Firewall",
          "link": "/documentation/devops/firewall"
        },
        {
          "text": "Git",
          "link": "/documentation/devops/git"
        },
        {
          "text": "GitHub",
          "link": "/documentation/devops/github"
        },
        {
          "text": "Hosting",
          "link": "/documentation/devops/hosting"
        },
        {
          "text": "Kubernetes",
          "link": "/documentation/devops/kubernetes",
          "collapsed": true,
          "items": [
            {
              "text": "Prerequisites",
              "link": "/documentation/devops/kubernetes/01-prerequisites"
            },
            {
              "text": "k3s Master Setup",
              "link": "/documentation/devops/kubernetes/02-kubeadm-setup"
            },
            {
              "text": "Networking",
              "link": "/documentation/devops/kubernetes/03-networking"
            },
            {
              "text": "Worker Node — Join the Cluster",
              "link": "/documentation/devops/kubernetes/04-worker-join"
            },
            {
              "text": "Storage — Persistent Volumes with local-path",
              "link": "/documentation/devops/kubernetes/05-storage"
            },
            {
              "text": "Observability — Prometheus, Grafana, Alertmanager",
              "link": "/documentation/devops/kubernetes/06-observability"
            },
            {
              "text": "Architecture",
              "link": "/documentation/devops/kubernetes/architecture"
            },
            {
              "text": "Kubernetes — k3s Setup Overview",
              "link": "/documentation/devops/kubernetes/README"
            },
            {
              "text": "Roadmap — From Fresh VPS to a Fully Managed Cluster",
              "link": "/documentation/devops/kubernetes/ROADMAP"
            },
            {
              "text": "Troubleshooting",
              "link": "/documentation/devops/kubernetes/troubleshooting"
            }
          ]
        }
      ]
    },
    {
      "text": "Javascript",
      "collapsed": true,
      "items": [
        {
          "text": "Next.js",
          "link": "/documentation/javascript/nextjs"
        },
        {
          "text": "Nuxt",
          "link": "/documentation/javascript/nuxt"
        },
        {
          "text": "Vue 3",
          "link": "/documentation/javascript/vue"
        }
      ]
    },
    {
      "text": "Linux",
      "collapsed": true,
      "items": [
        {
          "text": "Caddy",
          "link": "/documentation/linux/caddy"
        },
        {
          "text": "Debian",
          "link": "/documentation/linux/debian"
        },
        {
          "text": "Fail2Ban",
          "link": "/documentation/linux/fail2ban"
        },
        {
          "text": "SSH",
          "link": "/documentation/linux/ssh"
        },
        {
          "text": "Tree",
          "link": "/documentation/linux/tree"
        },
        {
          "text": "Ubuntu — Configuration and Hardening Guide",
          "link": "/documentation/linux/ubuntu"
        },
        {
          "text": "UFW",
          "link": "/documentation/linux/ufw"
        }
      ]
    },
    {
      "text": "Python",
      "collapsed": true,
      "items": [
        {
          "text": "FastAPI",
          "link": "/documentation/python/fastapi"
        },
        {
          "text": "Ruff",
          "link": "/documentation/python/ruff"
        },
        {
          "text": "UV",
          "link": "/documentation/python/uv"
        }
      ]
    }
  ],
  "/dotfiles/": [
    {
      "text": "Overview",
      "link": "/dotfiles/"
    },
    {
      "text": "Debian Setup",
      "link": "/dotfiles/debian"
    },
    {
      "text": "macOS Setup",
      "link": "/dotfiles/macos"
    }
  ],
  "/github-workflows/": [
    {
      "text": "Overview",
      "link": "/github-workflows/"
    },
    {
      "text": "CI — Node.js",
      "link": "/github-workflows/workflow-ci-node"
    },
    {
      "text": "CI — Python",
      "link": "/github-workflows/workflow-ci-python"
    },
    {
      "text": "CI — Shell",
      "link": "/github-workflows/workflow-ci-shell"
    },
    {
      "text": "Deploy — Docker",
      "link": "/github-workflows/workflow-deploy-docker"
    },
    {
      "text": "Deploy — GitHub Pages",
      "link": "/github-workflows/workflow-deploy-pages"
    },
    {
      "text": "Deploy — Vercel",
      "link": "/github-workflows/workflow-deploy-vercel"
    },
    {
      "text": "Release",
      "link": "/github-workflows/workflow-release"
    },
    {
      "text": "Security",
      "link": "/github-workflows/workflow-security"
    }
  ],
  "/tools/": [
    {
      "text": "Overview",
      "link": "/tools/"
    },
    {
      "text": "CLI App",
      "link": "/tools/cli"
    },
    {
      "text": "Docker Templates",
      "link": "/tools/docker-templates"
    },
    {
      "text": "Getting Started",
      "link": "/tools/getting-started"
    },
    {
      "text": "Makefile Fragments",
      "link": "/tools/makefile-fragments"
    },
    {
      "text": "Shell Tools",
      "link": "/tools/shell-tools"
    },
    {
      "text": "Testing and Quality",
      "link": "/tools/testing-and-quality"
    }
  ]
}

export function generatedEditLinkPattern({ filePath }: { filePath: string }): string {
  if (filePath.startsWith('documentation/')) {
    if (filePath === 'documentation/index.md') return 'https://github.com/KevinDeBenedetti/documentation/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/documentation/edit/main/docs/' + filePath.slice(14)
  }
  if (filePath.startsWith('dotfiles/')) {
    if (filePath === 'dotfiles/index.md') return 'https://github.com/KevinDeBenedetti/dotfiles/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/dotfiles/edit/main/docs/' + filePath.slice(9)
  }
  if (filePath.startsWith('github-workflows/')) {
    if (filePath === 'github-workflows/index.md') return 'https://github.com/KevinDeBenedetti/github-workflows/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/github-workflows/edit/main/docs/' + filePath.slice(17)
  }
  if (filePath.startsWith('tools/')) {
    return 'https://github.com/KevinDeBenedetti/tools/edit/main/docs/' + filePath.slice(6)
  }
  return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/' + filePath
}
