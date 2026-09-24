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
    "text": "About",
    "link": "/about/"
  }
]

export const generatedSidebar: DefaultTheme.SidebarMulti = {
  "/docs/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": false,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/dotfiles/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": false,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/github-workflows/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": false,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/k3s-lab/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": false,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/notes/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": false,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/tools/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": false,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/web-check/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": false,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/projects/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ],
  "/about/": [
    {
      "text": "Projects",
      "link": "/projects/"
    },
    {
      "text": "Docs Generator",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/docs/"
        },
        {
          "text": "Architecture",
          "link": "/docs/architecture"
        },
        {
          "text": "Configuration",
          "link": "/docs/configuration"
        },
        {
          "text": "Development",
          "link": "/docs/development"
        }
      ]
    },
    {
      "text": "Dotfiles",
      "collapsed": true,
      "items": [
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
              "text": "Claude Code",
              "link": "/dotfiles/config/claude-code"
            },
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
          "text": "Guides",
          "collapsed": true,
          "items": [
            {
              "text": "Git multi-account (personal / work) over SSH",
              "link": "/dotfiles/guides/git-multi-account"
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
      ]
    },
    {
      "text": "Github Workflows",
      "collapsed": true,
      "items": [
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
              "text": "Action — check-docs-links",
              "link": "/github-workflows/actions/check-docs-links"
            },
            {
              "text": "Action — check-vitepress-md",
              "link": "/github-workflows/actions/check-vitepress-md"
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
              "text": "notify-deployment",
              "link": "/github-workflows/actions/notify-deployment"
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
              "text": "Deploy — Docker",
              "link": "/github-workflows/workflows/cd-docker"
            },
            {
              "text": "Deploy — Docs to Central Repo",
              "link": "/github-workflows/workflows/cd-docs"
            },
            {
              "text": "CD — Kaniko",
              "link": "/github-workflows/workflows/cd-kaniko"
            },
            {
              "text": "Deploy — GitHub Pages",
              "link": "/github-workflows/workflows/cd-pages"
            },
            {
              "text": "Deploy — Vercel",
              "link": "/github-workflows/workflows/cd-vercel"
            },
            {
              "text": "`check-bot-commits` workflow",
              "link": "/github-workflows/workflows/check-bot-commits"
            },
            {
              "text": "CI — Ansible",
              "link": "/github-workflows/workflows/ci-ansible"
            },
            {
              "text": "CI / CD (orchestrator)",
              "link": "/github-workflows/workflows/ci-cd"
            },
            {
              "text": "CI — Helm",
              "link": "/github-workflows/workflows/ci-helm"
            },
            {
              "text": "CI — Kubernetes",
              "link": "/github-workflows/workflows/ci-kubernetes"
            },
            {
              "text": "CI — Node.js",
              "link": "/github-workflows/workflows/ci-node"
            },
            {
              "text": "CI — prek hooks",
              "link": "/github-workflows/workflows/ci-prek"
            },
            {
              "text": "CI — Prometheus rules",
              "link": "/github-workflows/workflows/ci-prometheus"
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
              "text": "CI — Terraform",
              "link": "/github-workflows/workflows/ci-terraform"
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
      ]
    },
    {
      "text": "K3s Lab",
      "collapsed": true,
      "items": [
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
          "text": "Platform Deployment — Helm Wrapper Chart",
          "link": "/k3s-lab/helm-platform-deployment"
        },
        {
          "text": "Example — Refactoring `homepage` to use Kustomize Components",
          "link": "/k3s-lab/kustomize-components-example"
        },
        {
          "text": "Kustomize Components — Usage Guide",
          "link": "/k3s-lab/kustomize-components"
        },
        {
          "text": "Platform Deployment — Release Notes & Transition",
          "link": "/k3s-lab/platform-deployment-release-notes"
        },
        {
          "text": "Étape 3 — Helm Wrapper Chart for Platform Dependencies",
          "link": "/k3s-lab/STAGE3-SUMMARY"
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
              "text": "Deploying an App",
              "link": "/k3s-lab/operations/deploy-app"
            },
            {
              "text": "Task Targets Reference",
              "link": "/k3s-lab/operations/task-targets"
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
              "text": "ArgoCD — GitOps Continuous Delivery",
              "link": "/k3s-lab/stack/argocd"
            },
            {
              "text": "cert-manager — Automatic TLS",
              "link": "/k3s-lab/stack/cert-manager"
            },
            {
              "text": "external-dns — Automatic DNS Management",
              "link": "/k3s-lab/stack/external-dns"
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
            },
            {
              "text": "Vault + External Secrets Operator",
              "link": "/k3s-lab/stack/vault"
            }
          ]
        }
      ]
    },
    {
      "text": "Notes",
      "collapsed": true,
      "items": [
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
            },
            {
              "text": "WireGuard",
              "link": "/notes/linux/wireguard"
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
      ]
    },
    {
      "text": "Tools",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/tools/"
        },
        {
          "text": "Getting Started",
          "link": "/tools/getting-started"
        },
        {
          "text": "Benchmark",
          "collapsed": true,
          "items": [
            {
              "text": "Benchmark",
              "link": "/tools/benchmark/benchmark"
            }
          ]
        },
        {
          "text": "Cli",
          "collapsed": true,
          "items": [
            {
              "text": "Interactive CLI",
              "link": "/tools/cli/interactive"
            },
            {
              "text": "Web UI",
              "link": "/tools/cli/web-ui"
            }
          ]
        },
        {
          "text": "Copilot",
          "collapsed": true,
          "items": [
            {
              "text": "Copilot Chat & Session Management",
              "link": "/tools/copilot/chat-and-sessions"
            },
            {
              "text": "Copilot Sdk",
              "link": "/tools/copilot/copilot-sdk"
            },
            {
              "text": "Instructions",
              "link": "/tools/copilot/instructions"
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
          "text": "Github",
          "collapsed": true,
          "items": [
            {
              "text": "GitHub — Bot Detection",
              "link": "/tools/github/bot"
            },
            {
              "text": "GitHub — Purge",
              "link": "/tools/github/purge"
            },
            {
              "text": "GitHub — Secrets",
              "link": "/tools/github/secrets"
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
          "text": "Todo",
          "collapsed": true,
          "items": [
            {
              "text": "Todo Sync",
              "link": "/tools/todo/todo"
            }
          ]
        }
      ]
    },
    {
      "text": "Web Check",
      "collapsed": true,
      "items": [
        {
          "text": "Overview",
          "link": "/web-check/"
        },
        {
          "text": "Architecture",
          "link": "/web-check/architecture"
        },
        {
          "text": "Configuration",
          "link": "/web-check/configuration"
        },
        {
          "text": "Development",
          "link": "/web-check/development"
        },
        {
          "text": "my-check — Unified Security Scanner",
          "link": "/web-check/my-check"
        }
      ]
    }
  ]
}

export function generatedEditLinkPattern({ filePath }: { filePath: string }): string {
  if (filePath.startsWith('ocs/docs/')) {
    if (filePath === 'ocs/docs/index.md') return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/docs/' + filePath.slice(9)
  }
  if (filePath.startsWith('ynced/dotfiles/')) {
    if (filePath === 'ynced/dotfiles/index.md') return 'https://github.com/KevinDeBenedetti/dotfiles/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/dotfiles/edit/main/docs/' + filePath.slice(15)
  }
  if (filePath.startsWith('ynced/github-workflows/')) {
    if (filePath === 'ynced/github-workflows/index.md') return 'https://github.com/KevinDeBenedetti/github-workflows/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/github-workflows/edit/main/docs/' + filePath.slice(23)
  }
  if (filePath.startsWith('ynced/k3s-lab/')) {
    if (filePath === 'ynced/k3s-lab/index.md') return 'https://github.com/KevinDeBenedetti/k3s-lab/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/k3s-lab/edit/main/docs/' + filePath.slice(14)
  }
  if (filePath.startsWith('ynced/notes/')) {
    if (filePath === 'ynced/notes/index.md') return 'https://github.com/KevinDeBenedetti/notes/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/notes/edit/main/docs/' + filePath.slice(12)
  }
  if (filePath.startsWith('ynced/tools/')) {
    if (filePath === 'ynced/tools/index.md') return 'https://github.com/KevinDeBenedetti/tools/tree/main/docs'
    return 'https://github.com/KevinDeBenedetti/tools/edit/main/docs/' + filePath.slice(12)
  }
  if (filePath.startsWith('ynced/web-check/')) {
    return 'https://github.com/KevinDeBenedetti/web-check/edit/main/docs/' + filePath.slice(16)
  }
  return 'https://github.com/KevinDeBenedetti/kevindebenedetti.github.io/edit/main/' + filePath
}
