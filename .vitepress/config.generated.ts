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
    "text": "Notes",
    "link": "/notes/"
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
  "/notes/": [
    {
      "text": "Overview",
      "link": "/notes/"
    },
    {
      "text": "Devops",
      "collapsed": true,
      "items": [
        {
          "text": "Docker",
          "link": "/notes/devops/docker"
        },
        {
          "text": "Firewall",
          "link": "/notes/devops/firewall"
        },
        {
          "text": "Git",
          "link": "/notes/devops/git"
        },
        {
          "text": "GitHub",
          "link": "/notes/devops/github"
        },
        {
          "text": "Hosting",
          "link": "/notes/devops/hosting"
        },
        {
          "text": "Kubernetes",
          "link": "/notes/devops/kubernetes",
          "collapsed": true,
          "items": [
            {
              "text": "Prerequisites",
              "link": "/notes/devops/kubernetes/01-prerequisites"
            },
            {
              "text": "k3s Master Setup",
              "link": "/notes/devops/kubernetes/02-kubeadm-setup"
            },
            {
              "text": "Networking",
              "link": "/notes/devops/kubernetes/03-networking"
            },
            {
              "text": "Worker Node — Join the Cluster",
              "link": "/notes/devops/kubernetes/04-worker-join"
            },
            {
              "text": "Storage — Persistent Volumes with local-path",
              "link": "/notes/devops/kubernetes/05-storage"
            },
            {
              "text": "Observability — Prometheus, Grafana, Alertmanager",
              "link": "/notes/devops/kubernetes/06-observability"
            },
            {
              "text": "Architecture",
              "link": "/notes/devops/kubernetes/architecture"
            },
            {
              "text": "Kubernetes — k3s Setup Overview",
              "link": "/notes/devops/kubernetes/README"
            },
            {
              "text": "Roadmap — From Fresh VPS to a Fully Managed Cluster",
              "link": "/notes/devops/kubernetes/ROADMAP"
            },
            {
              "text": "Troubleshooting",
              "link": "/notes/devops/kubernetes/troubleshooting"
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
          "link": "/notes/javascript/nextjs"
        },
        {
          "text": "Nuxt",
          "link": "/notes/javascript/nuxt"
        },
        {
          "text": "Vue 3",
          "link": "/notes/javascript/vue"
        }
      ]
    },
    {
      "text": "Linux",
      "collapsed": true,
      "items": [
        {
          "text": "Caddy",
          "link": "/notes/linux/caddy"
        },
        {
          "text": "Debian",
          "link": "/notes/linux/debian"
        },
        {
          "text": "Fail2Ban",
          "link": "/notes/linux/fail2ban"
        },
        {
          "text": "SSH",
          "link": "/notes/linux/ssh"
        },
        {
          "text": "Tree",
          "link": "/notes/linux/tree"
        },
        {
          "text": "Ubuntu — Configuration and Hardening Guide",
          "link": "/notes/linux/ubuntu"
        },
        {
          "text": "UFW",
          "link": "/notes/linux/ufw"
        }
      ]
    },
    {
      "text": "Python",
      "collapsed": true,
      "items": [
        {
          "text": "FastAPI",
          "link": "/notes/python/fastapi"
        },
        {
          "text": "Ruff",
          "link": "/notes/python/ruff"
        },
        {
          "text": "UV",
          "link": "/notes/python/uv"
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
      "text": "Setup",
      "collapsed": true,
      "items": [
        {
          "text": "Debian Setup",
          "link": "/dotfiles/setup/debian"
        },
        {
          "text": "macOS Setup",
          "link": "/dotfiles/setup/macos"
        }
      ]
    }
  ],
  "/github-workflows/": [
    {
      "text": "Overview",
      "link": "/github-workflows/"
    },
    {
      "text": "Workflows",
      "collapsed": true,
      "items": [
        {
          "text": "CI — Node.js",
          "link": "/github-workflows/workflows/ci-node"
        },
        {
          "text": "CI — Python",
          "link": "/github-workflows/workflows/ci-python"
        },
        {
          "text": "CI — Shell",
          "link": "/github-workflows/workflows/ci-shell"
        },
        {
          "text": "Deploy — Docker",
          "link": "/github-workflows/workflows/deploy-docker"
        },
        {
          "text": "Deploy — GitHub Pages",
          "link": "/github-workflows/workflows/deploy-pages"
        },
        {
          "text": "Deploy — Vercel",
          "link": "/github-workflows/workflows/deploy-vercel"
        },
        {
          "text": "Release",
          "link": "/github-workflows/workflows/release"
        },
        {
          "text": "Security",
          "link": "/github-workflows/workflows/security"
        }
      ]
    }
  ],
  "/tools/": [
    {
      "text": "Overview",
      "link": "/tools/"
    },
    {
      "text": "Getting Started",
      "link": "/tools/getting-started"
    },
    {
      "text": "App",
      "collapsed": true,
      "items": [
        {
          "text": "CLI App",
          "link": "/tools/app/cli"
        }
      ]
    },
    {
      "text": "Docker",
      "collapsed": true,
      "items": [
        {
          "text": "Docker Templates",
          "link": "/tools/docker/docker-templates"
        }
      ]
    },
    {
      "text": "Makefiles",
      "collapsed": true,
      "items": [
        {
          "text": "Makefile Fragments",
          "link": "/tools/makefiles/makefile-fragments"
        }
      ]
    },
    {
      "text": "Shell",
      "collapsed": true,
      "items": [
        {
          "text": "Shell Tools",
          "link": "/tools/shell/shell-tools"
        }
      ]
    },
    {
      "text": "Tests",
      "collapsed": true,
      "items": [
        {
          "text": "Testing and Quality",
          "link": "/tools/tests/testing-and-quality"
        }
      ]
    }
  ]
}

export function generatedEditLinkPattern({ filePath }: { filePath: string }): string {
  if (filePath.startsWith('notes/')) {
    if (filePath === 'notes/index.md') return 'https://github.com/KevinDeBenedetti/notes/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/notes/edit/main/docs/' + filePath.slice(6)
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
