<div align="center">

# 🖥️ Quinta Perspectiva

<img src="https://img.shields.io/badge/Electron-28-47848F?style=for-the-badge&logo=electron" alt="Electron" />
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React" />
<img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />

### 💻 Aplicação Desktop • Admin Avançado • Relatórios & Impressão

**A reimaginação do EventosFSA para gestores: uma estação de trabalho completa para administradores e donos de estabelecimentos.**

[![Status](https://img.shields.io/badge/Status-📋%20Planejado-yellow?style=flat-square)](.)
[![ETA](https://img.shields.io/badge/ETA-Abr%202026-blue?style=flat-square)](.)

</div>

---

## 🎯 A Visão

A **Quinta Perspectiva** não é apenas mais um frontend. É uma **estação de trabalho desktop** pensada para quem gerencia o EventosFSA no dia-a-dia: administradores da plataforma, donos de múltiplos estabelecimentos e equipes de suporte.

### 💡 Por que Desktop?

```
┌─────────────────────────────────────────────────────────────────┐
│                    🖥️ VANTAGENS DESKTOP                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📊 GRANDES VOLUMES          🖨️ IMPRESSÃO NATIVA              │
│   Dashboards multi-tela       Relatórios PDF                    │
│   Tabelas gigantes            Etiquetas, QR Codes               │
│   sem scroll infinito         Contratos                         │
│                                                                 │
│   💾 OFFLINE FIRST            ⚡ PERFORMANCE                     │
│   SQLite local                Sem limitações                    │
│   Sync inteligente            de browser                        │
│                                                                 │
│   🔐 SEGURANÇA                📁 FILE SYSTEM                    │
│   Dados sensíveis             Exportar/Importar                 │
│   no dispositivo              Backups locais                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Preview Conceitual

> 🎨 *Interface otimizada para produtividade com múltiplos painéis*

<div align="center">

| Dashboard Master | Gestão de Eventos |
|:---:|:---:|
| 📊 | 📅 |
| KPIs em tempo real | Calendário drag & drop |
| Gráficos interativos | Bulk actions |
| Alertas críticos | Filtros avançados |

| Relatórios | Central de Impressão |
|:---:|:---:|
| 📄 | 🖨️ |
| Export PDF/Excel | QR Codes em lote |
| Templates customizáveis | Etiquetas adesivas |
| Agendamento | Preview antes de imprimir |

| Multi-Window | System Tray |
|:---:|:---:|
| 🪟 | 🔔 |
| Duas telas | Fica minimizado |
| Comparar dados | Notificações push |
| Trabalho paralelo | Sempre disponível |

</div>

---

## 🛠️ Stack Planejada

### Core
| Tecnologia | Versão | Uso |
|:-----------|:------:|:----|
| **Electron** | 28+ | Framework desktop |
| **React** | 18+ | UI library |
| **TypeScript** | 5.x | Tipagem estática |
| **Vite** | 5.x | Build tool rápido |

### UI & Data
| Biblioteca | Uso |
|:-----------|:----|
| **Tailwind CSS** | Styling |
| **TanStack Table** | Tabelas avançadas |
| **Recharts** | Gráficos |
| **React Hook Form** | Formulários |
| **Zustand** | State management |

### Desktop Specific
| Biblioteca | Uso |
|:-----------|:----|
| **electron-store** | Persistência local |
| **better-sqlite3** | Banco local |
| **electron-updater** | Auto-update |
| **electron-log** | Logging |

### Impressão & Export
| Biblioteca | Uso |
|:-----------|:----|
| **react-to-pdf** | Gerar PDFs |
| **xlsx** | Exportar Excel |
| **qrcode** | Gerar QR Codes |
| **node-thermal-printer** | Impressoras térmicas |

---

## 📁 Estrutura Planejada

```
Quinta-Perspectiva/
│
├── 📁 src/
│   ├── main/                    # 🔧 Processo principal (Electron)
│   │   ├── index.ts             # Entry point
│   │   ├── menu.ts              # Menu nativo
│   │   ├── tray.ts              # System tray
│   │   ├── ipc/                 # IPC handlers
│   │   ├── database/            # SQLite local
│   │   └── print/               # Serviço de impressão
│   │
│   ├── renderer/                # 🎨 Processo renderer (React)
│   │   ├── App.tsx
│   │   ├── pages/
│   │   │   ├── dashboard/       # Dashboard master
│   │   │   ├── events/          # Gestão de eventos
│   │   │   ├── artists/         # Gestão de artistas
│   │   │   ├── venues/          # Gestão de estabelecimentos
│   │   │   ├── finances/        # Financeiro
│   │   │   ├── reports/         # Relatórios
│   │   │   └── settings/        # Configurações
│   │   │
│   │   ├── components/
│   │   │   ├── layout/          # Sidebar, Header
│   │   │   ├── tables/          # DataTables
│   │   │   ├── charts/          # Gráficos
│   │   │   └── modals/          # Dialogs
│   │   │
│   │   └── stores/              # Zustand stores
│   │
│   └── preload/                 # Bridge segura
│       └── index.ts
│
├── 📁 resources/                # Ícones, assets
├── 📁 build/                    # Configs de build
│   ├── entitlements.mac.plist
│   └── installer.nsh
│
├── electron-builder.yml         # Build config
├── package.json
└── README.md
```

---

## ✨ Features Planejadas

### 📊 Dashboard Master
- [ ] KPIs em tempo real
- [ ] Gráficos de receita, eventos, usuários
- [ ] Mapa de calor de eventos
- [ ] Alertas e notificações críticas
- [ ] Comparativo período anterior

### 📅 Gestão de Eventos
- [ ] Tabela com filtros avançados
- [ ] Bulk approve/reject
- [ ] Drag & drop para reagendar
- [ ] Conflito de agenda visual
- [ ] Export para calendário

### 💰 Financeiro
- [ ] Relatório de comissões
- [ ] Gorjetas por período
- [ ] Pagamentos pendentes
- [ ] Conciliação bancária
- [ ] Notas fiscais (futuro)

### 🖨️ Central de Impressão
- [ ] QR Codes em lote por estabelecimento
- [ ] Etiquetas adesivas (Pimaco/Avery)
- [ ] Contratos de show
- [ ] Relatórios formatados
- [ ] Preview antes de imprimir
- [ ] Suporte a impressoras térmicas

### 💾 Offline & Sync
- [ ] Banco SQLite local
- [ ] Trabalhar offline
- [ ] Sync quando conectar
- [ ] Resolver conflitos
- [ ] Backup automático

### 🪟 Multi-Window
- [ ] Abrir eventos em nova janela
- [ ] Comparar períodos lado a lado
- [ ] Picture-in-picture para métricas
- [ ] Arrastar entre telas

---

## 🚀 Roadmap

```
┌─────────────────────────────────────────────────────────────────┐
│                    📅 CRONOGRAMA ESTIMADO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ABR 2026  ▓▓▓▓▓░░░░░  Setup + Dashboard                      │
│   MAI 2026  ▓▓▓▓▓▓▓▓░░  Gestão + Relatórios                    │
│   JUN 2026  ▓▓▓▓▓▓▓▓▓▓  Impressão + Offline                    │
│   JUL 2026  ░░░░░░░░░░  Testes + Distribuição                  │
│                                                                 │
│   PROGRESSO: ░░░░░░░░░░ 0% (Planejado)                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 💻 Instaladores Planejados

| Plataforma | Formato | Tamanho Estimado |
|:-----------|:--------|:----------------:|
| **Windows** | .exe (NSIS) | ~80MB |
| **macOS** | .dmg | ~90MB |
| **Linux** | .AppImage, .deb | ~75MB |

### Auto-Update
```
App inicia → Verifica versão → 
Download em background → 
Notifica usuário → Instala no próximo restart
```

---

## 🆚 Comparativo com Outras Perspectivas

| Aspecto | Web (2ª) | Mobile (3ª/4ª) | Desktop (5ª) |
|:--------|:--------:|:--------------:|:------------:|
| **Público** | Todos | Usuários móveis | Gestores |
| **Dados** | Online | Cache local | SQLite full |
| **Impressão** | Limitada | ❌ | Nativa |
| **Multi-tela** | ❌ | ❌ | ✅ |
| **Offline** | PWA básico | Parcial | Completo |
| **Relatórios** | Simples | ❌ | Avançados |

> 💡 **Conclusão:** A Quinta Perspectiva é complementar às outras. Enquanto web/mobile servem usuários finais, o desktop serve gestores e operadores.

---

## 🔧 Pré-requisitos

Quando iniciarmos o desenvolvimento:

```bash
# Node.js 18+
node --version

# Para build em cada plataforma:
# Windows: Visual Studio Build Tools
# macOS: Xcode Command Line Tools
# Linux: build-essential
```

---

## 📞 Próximos Passos

1. ✅ Validar necessidade com Carlos
2. 📊 Definir features prioritárias
3. 🎨 Prototipar interface no Figma
4. 🚀 Iniciar desenvolvimento

---

<div align="center">

**Quinta Perspectiva** - A estação de trabalho do EventosFSA

*Planejado por Deivison Santana para Carlos*

[![Status](https://img.shields.io/badge/Coming-Soon-orange?style=flat-square)]()

</div>
