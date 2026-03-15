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
    "text": "Projects",
    "items": [
      {
        "text": "Dotfiles",
        "link": "/dotfiles/"
      },
      {
        "text": "Github Workflows",
        "link": "/github-workflows/"
      },
      {
        "text": "K3s Lab",
        "link": "/k3s-lab/"
      },
      {
        "text": "Kevindebenedetti.Github.Io",
        "link": "/kevindebenedetti.github.io/"
      },
      {
        "text": "Notes",
        "link": "/notes/"
      },
      {
        "text": "Tools",
        "link": "/tools/"
      }
    ]
  }
]

export const generatedSidebar: DefaultTheme.SidebarMulti = {
  "/dotfiles/": [
    {
      "text": "Overview",
      "link": "/dotfiles/"
    },
    {
      "text": "Getting Started",
      "link": "/dotfiles/getting-started"
    },
    {
      "text": "Config",
      "collapsed": true,
      "items": [
        {
          "text": "Git",
          "link": "/dotfiles/config/git"
        },
        {
          "text": "Oh My Zsh Theme",
          "link": "/dotfiles/config/oh-my-zsh"
        },
        {
          "text": "Proto",
          "link": "/dotfiles/config/proto"
        },
        {
          "text": "Shell",
          "link": "/dotfiles/config/shell"
        },
        {
          "text": "SSH",
          "link": "/dotfiles/config/ssh"
        },
        {
          "text": "VS Code",
          "link": "/dotfiles/config/vscode"
        },
        {
          "text": "Zsh",
          "link": "/dotfiles/config/zsh"
        }
      ]
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
      "text": "Getting Started",
      "link": "/github-workflows/getting-started"
    },
    {
      "text": "Actions",
      "collapsed": true,
      "items": [
        {
          "text": "Action — actionlint",
          "link": "/github-workflows/actions/actionlint"
        },
        {
          "text": "Action — bats",
          "link": "/github-workflows/actions/bats"
        },
        {
          "text": "Action — detect-changes",
          "link": "/github-workflows/actions/detect-changes"
        },
        {
          "text": "Action — kubeconform",
          "link": "/github-workflows/actions/kubeconform"
        },
        {
          "text": "Action — setup-node",
          "link": "/github-workflows/actions/setup-node"
        },
        {
          "text": "Action — setup-python",
          "link": "/github-workflows/actions/setup-python"
        },
        {
          "text": "Action — shellcheck",
          "link": "/github-workflows/actions/shellcheck"
        }
      ]
    },
    {
      "text": "Workflows",
      "collapsed": true,
      "items": [
        {
          "text": "`check-bot-commits` workflow",
          "link": "/github-workflows/workflows/check-bot-commits"
        },
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
          "text": "`dependabot-automerge` workflow",
          "link": "/github-workflows/workflows/dependabot-automerge"
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
  "/k3s-lab/": [
    {
      "text": "Overview",
      "link": "/k3s-lab/"
    },
    {
      "text": "Configuration Reference",
      "link": "/k3s-lab/configuration"
    },
    {
      "text": "Getting Started",
      "link": "/k3s-lab/getting-started"
    },
    {
      "text": "Using k3s-lab with a Private Infra Repo",
      "link": "/k3s-lab/using-with-infra"
    },
    {
      "text": "Operations",
      "collapsed": true,
      "items": [
        {
          "text": "Local Testing",
          "link": "/k3s-lab/operations/local-testing"
        },
        {
          "text": "Make Targets Reference",
          "link": "/k3s-lab/operations/make-targets"
        },
        {
          "text": "Troubleshooting",
          "link": "/k3s-lab/operations/troubleshooting"
        }
      ]
    },
    {
      "text": "Stack",
      "collapsed": true,
      "items": [
        {
          "text": "cert-manager — Automatic TLS",
          "link": "/k3s-lab/stack/cert-manager"
        },
        {
          "text": "k3s — Lightweight Kubernetes",
          "link": "/k3s-lab/stack/k3s"
        },
        {
          "text": "Monitoring & Observability",
          "link": "/k3s-lab/stack/monitoring"
        },
        {
          "text": "Traefik — Ingress Controller",
          "link": "/k3s-lab/stack/traefik"
        }
      ]
    }
  ],
  "/kevindebenedetti.github.io/": [
    {
      "text": "Overview",
      "link": "/kevindebenedetti.github.io/"
    }
  ],
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
  if (filePath.startsWith('dotfiles/')) {
    if (filePath === 'dotfiles/index.md') return 'https://github.com/KevinDeBenedetti/dotfiles/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/dotfiles/edit/main/docs/' + filePath.slice(9)
  }
  if (filePath.startsWith('github-workflows/')) {
    if (filePath === 'github-workflows/index.md') return 'https://github.com/KevinDeBenedetti/github-workflows/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/github-workflows/edit/main/docs/' + filePath.slice(17)
  }
  if (filePath.startsWith('k3s-lab/')) {
    if (filePath === 'k3s-lab/index.md') return 'https://github.com/KevinDeBenedetti/k3s-lab/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/k3s-lab/edit/main/docs/' + filePath.slice(8)
  }
  if (filePath.startsWith('kevindebenedetti.github.io/')) {
    if (filePath === 'kevindebenedetti.github.io/index.md') return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/docs/' + filePath.slice(27)
  }
  if (filePath.startsWith('notes/')) {
    if (filePath === 'notes/index.md') return 'https://github.com/KevinDeBenedetti/notes/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/notes/edit/main/docs/' + filePath.slice(6)
  }
  if (filePath.startsWith('tools/')) {
    if (filePath === 'tools/index.md') return 'https://github.com/KevinDeBenedetti/tools/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/tools/edit/main/docs/' + filePath.slice(6)
  }
  return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/' + filePath
}
