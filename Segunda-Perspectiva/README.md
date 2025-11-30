<div align="center">

# 🌐 Segunda Perspectiva

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
<img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind" />
<img src="https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge" alt="PWA" />

### 🚀 Web App Moderna • PWA Instalável • Android via Capacitor

**A reimaginação da interface EventosFSA com foco em performance, animações fluidas e experiência mobile-first.**

[![Deploy Status](https://img.shields.io/badge/Deploy-✅%20GitHub%20Pages-success?style=flat-square)](https://deivisan.github.io/Eventos-FSA/)
[![Progress](https://img.shields.io/badge/Progresso-80%25-green?style=flat-square)](./app)

[🌐 **Ver Online**](https://deivisan.github.io/Eventos-FSA/) • [📚 **Guias**](./books/final/) • [🎧 **Podcasts**](./notebooklm/)

</div>

---

## 🎨 A Visão

Esta perspectiva representa a **versão web moderna** do EventosFSA, construída do zero com as tecnologias mais recentes do ecossistema React/Next.js.

### 💡 Filosofia de Design

```
┌─────────────────────────────────────────────────────────────────┐
│                    🎯 PRINCÍPIOS DE UX                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ✨ ANIMAÇÕES SUAVES         📱 MOBILE FIRST                   │
│   Framer Motion em tudo       Experiência touch nativa          │
│                                                                 │
│   🌓 TEMAS DINÂMICOS          ⚡ PERFORMANCE                     │
│   Light/Dark + Festivais      Static Export, CDN ready          │
│                                                                 │
│   💎 GLASSMORPHISM            🎭 MICROINTERAÇÕES                │
│   Cards com blur premium      Feedback visual constante         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🖼️ Preview

<div align="center">

| Homepage com Hero Animado | Catálogo de Artistas |
|:---:|:---:|
| ![Home](../Primeira-Perspectiva/screenshots/01-homepage.png) | ![Artistas](../Primeira-Perspectiva/screenshots/05-artistas.png) |

| Dashboard do Artista | Portal QR Code (Dark Premium) |
|:---:|:---:|
| ![Dashboard](../Primeira-Perspectiva/screenshots/08-artista-dashboard.png) | ![QR](../Primeira-Perspectiva/screenshots/11-portal-qrcode.png) |

</div>

---

## 🛠️ Stack Tecnológica

### Core
| Tecnologia | Versão | Uso |
|:-----------|:------:|:----|
| **Next.js** | 14.x | Framework React com App Router |
| **TypeScript** | 5.x | Tipagem estática |
| **Tailwind CSS** | 3.4 | Utility-first styling |
| **Framer Motion** | 10.x | Animações declarativas |

### UI Components
| Biblioteca | Uso |
|:-----------|:----|
| **shadcn/ui** | Componentes acessíveis |
| **Lucide React** | Ícones modernos |
| **React Hook Form** | Formulários performáticos |
| **Zod** | Validação de schemas |

### Infra & Deploy
| Tecnologia | Uso |
|:-----------|:----|
| **GitHub Pages** | Hosting estático |
| **GitHub Actions** | CI/CD automatizado |
| **Capacitor** | Build Android/iOS |
| **next-pwa** | Progressive Web App |

---

## 📁 Estrutura

```
Segunda-Perspectiva/
│
├── 📁 app/                      # 🚀 Código fonte Next.js
│   ├── src/
│   │   ├── app/                 # App Router (páginas)
│   │   ├── components/          # Componentes React
│   │   │   ├── layout/          # Header, Footer, Nav
│   │   │   ├── ui/              # Buttons, Cards, Modals
│   │   │   └── animations/      # Framer Motion wrappers
│   │   ├── lib/                 # Utilities, hooks
│   │   └── styles/              # CSS global
│   │
│   ├── public/                  # Assets estáticos
│   ├── prisma/                  # Schema do banco
│   └── android/                 # Build Capacitor
│
├── 📁 books/                    # 📚 Documentação específica
│   └── final/
│       ├── 01-guia-artista.md
│       ├── 02-guia-estabelecimento.md
│       ├── 03-guia-publico.md
│       └── 04-visao-investidor.md
│
├── 📁 notebooklm/               # 🎧 Scripts para Podcast
│   ├── 01-podcast-artistas.md
│   ├── 02-podcast-bares.md
│   ├── 03-podcast-publico.md
│   ├── 04-analise-investidor.md
│   └── 05-tutorial-uso.md
│
├── 📁 assets/                   # Recursos visuais
└── 📁 screenshots/              # Capturas de tela
```

---

## ✨ Features Implementadas

### 🏠 Páginas Públicas
- [x] Homepage com hero animado
- [x] Eventos com filtros e calendário
- [x] Catálogo de artistas com ranking
- [x] Estabelecimentos com badges "Ao Vivo"
- [x] Perfil completo do artista

### 🔐 Autenticação
- [x] Login com email/senha
- [x] Login social (Google, Facebook)
- [x] Modo demo para apresentações
- [x] Cadastro multi-step

### 📊 Dashboards
- [x] Dashboard Artista (agenda, propostas, gorjetas)
- [x] Dashboard Estabelecimento (eventos, artistas favoritos)
- [x] Dashboard Admin (métricas, aprovações)
- [x] Dashboard Usuário (histórico, favoritos)

### 🎨 Sistema de Temas
- [x] Tema Padrão (Vermelho EventosFSA)
- [x] Tema Escuro (Dark Mode)
- [x] Tema Carnaval (cores vibrantes)
- [x] Tema São João (tons terrosos)
- [x] Tema Noturno (azul/roxo)

### ⚡ Performance
- [x] Static Export otimizado
- [x] Code splitting automático
- [x] Lazy loading de imagens
- [x] Service Worker para cache

---

## 🚀 Como Rodar

```bash
# 1. Entre na pasta do app
cd app

# 2. Instale as dependências
npm install

# 3. Rode em desenvolvimento
npm run dev

# 🌐 Acesse http://localhost:3000
```

### Scripts Disponíveis

| Comando | Descrição |
|:--------|:----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção (estático) |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificar código |
| `npx cap sync android` | Sincronizar com Android |

---

## 📱 Build Android

```bash
# 1. Gerar build estático
npm run build

# 2. Sincronizar com Capacitor
npx cap sync android

# 3. Abrir no Android Studio
npx cap open android

# 4. Build APK via Android Studio
```

---

## 🔗 Links Úteis

| Recurso | Link |
|:--------|:-----|
| 🌐 Demo Online | [deivisan.github.io/Eventos-FSA](https://deivisan.github.io/Eventos-FSA/) |
| 📘 Guia do Artista | [books/final/01-guia-artista.md](books/final/01-guia-artista.md) |
| 📗 Guia do Estabelecimento | [books/final/02-guia-estabelecimento.md](books/final/02-guia-estabelecimento.md) |
| 📙 Roadmap Global | [../Docs/ROADMAP-GLOBAL.md](../Docs/ROADMAP-GLOBAL.md) |

---

## 🚧 Próximos Passos

- [ ] Rotas dinâmicas (/artistas/[id])
- [ ] Portal QR Code completo
- [ ] Ícones PWA em todos os tamanhos
- [ ] Testes E2E com Playwright
- [ ] Build APK para Play Store

---

<div align="center">

**Segunda Perspectiva** - A Web App que define o futuro do EventosFSA

*Desenvolvido por Deivison Santana*

</div>
