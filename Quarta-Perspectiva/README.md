<div align="center">

# 🦋 Quarta Perspectiva

<img src="https://img.shields.io/badge/Flutter-3.16-02569B?style=for-the-badge&logo=flutter" alt="Flutter" />
<img src="https://img.shields.io/badge/Dart-3.2-0175C2?style=for-the-badge&logo=dart" alt="Dart" />
<img src="https://img.shields.io/badge/Material%203-Design-6750A4?style=for-the-badge&logo=material-design" alt="Material 3" />

### 🌐 Uma Base de Código • Todas as Plataformas • Performance Nativa

**A reimaginação do EventosFSA com Flutter: iOS, Android, Web e Desktop a partir de um único projeto.**

[![Status](https://img.shields.io/badge/Status-📋%20Planejado-yellow?style=flat-square)](.)
[![ETA](https://img.shields.io/badge/ETA-Mar%202026-blue?style=flat-square)](.)

</div>

---

## 🎯 A Visão

A **Quarta Perspectiva** representa a aposta em **unificação total**. Com Flutter, podemos alcançar iOS, Android, Web e Desktop com uma única base de código, mantendo performance próxima ao nativo.

### 💡 Por que Flutter?

```
┌─────────────────────────────────────────────────────────────────┐
│                    🦋 VANTAGENS FLUTTER                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   🎯 UM CÓDIGO              📱 TODAS PLATAFORMAS                │
│   Dart único                 iOS, Android, Web                  │
│   para tudo                  Windows, macOS, Linux              │
│                                                                 │
│   🎨 MATERIAL 3              ⚡ COMPILAÇÃO NATIVA               │
│   Design system              Sem bridge, sem                    │
│   do Google                  overhead JavaScript                │
│                                                                 │
│   🔥 HOT RELOAD              💎 WIDGETS RICOS                   │
│   Dev ultrarrápido           UI customizável                    │
│   sem perder estado          pixel por pixel                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Preview Conceitual

> 🎨 *Interface reimaginada com Material Design 3*

<div align="center">

| Mobile (Adaptive) | Tablet (Master-Detail) | Desktop (Sidebar) |
|:---:|:---:|:---:|
| 📱 | 📲 | 🖥️ |
| Material 3 You | Split view | Window management |
| Dynamic colors | Drag & drop | Keyboard shortcuts |
| Bottom sheet | Side panel | Multi-window |

| Light Theme | Dark Theme | Custom Theme (FSA) |
|:---:|:---:|:---:|
| 🌞 | 🌙 | 🎵 |
| Cores claras | AMOLED friendly | Vermelho EventosFSA |
| Sombras suaves | Contraste alto | Gradientes únicos |

</div>

---

## 🛠️ Stack Planejada

### Core
| Tecnologia | Versão | Uso |
|:-----------|:------:|:----|
| **Flutter** | 3.16+ | Framework UI |
| **Dart** | 3.2+ | Linguagem |
| **Material 3** | Latest | Design system |

### State & Architecture
| Biblioteca | Uso |
|:-----------|:----|
| **Riverpod** | State management |
| **GoRouter** | Navegação declarativa |
| **Freezed** | Imutabilidade |
| **Injectable** | Dependency injection |

### Data & Network
| Biblioteca | Uso |
|:-----------|:----|
| **Dio** | HTTP client |
| **Drift** | SQLite ORM |
| **Hive** | NoSQL local |
| **GraphQL Flutter** | (opcional) |

### UI Components
| Biblioteca | Uso |
|:-----------|:----|
| **Flutter Hooks** | Lifecycle hooks |
| **Animations** | Animações fluidas |
| **Lottie** | Animações After Effects |
| **Cached Network Image** | Cache de imagens |

---

## 📁 Estrutura Planejada

```
Quarta-Perspectiva/
│
├── 📁 lib/                      # 🚀 Código fonte
│   ├── main.dart                # Entry point
│   │
│   ├── core/                    # Core da aplicação
│   │   ├── theme/               # Material 3 themes
│   │   ├── router/              # GoRouter config
│   │   ├── di/                  # Injectable setup
│   │   └── utils/               # Extensions, helpers
│   │
│   ├── features/                # Feature-first structure
│   │   ├── auth/
│   │   │   ├── data/            # Repositories, models
│   │   │   ├── domain/          # Entities, usecases
│   │   │   └── presentation/    # Pages, widgets
│   │   │
│   │   ├── home/
│   │   ├── events/
│   │   ├── artists/
│   │   ├── venues/
│   │   ├── tips/                # Sistema de gorjetas
│   │   └── dashboard/
│   │
│   └── shared/                  # Componentes compartilhados
│       ├── widgets/
│       ├── providers/
│       └── models/
│
├── 📁 assets/                   # Imagens, fontes, Lottie
│   ├── images/
│   ├── fonts/
│   └── animations/
│
├── 📁 test/                     # Testes
│   ├── unit/
│   ├── widget/
│   └── integration/
│
├── pubspec.yaml                 # Dependências
└── README.md                    # Este arquivo
```

---

## ✨ Features Planejadas

### 🎨 Adaptive UI
- [ ] Layout responsivo (mobile/tablet/desktop)
- [ ] Material 3 Dynamic Colors
- [ ] Themes customizados (FSA, Carnaval, São João)
- [ ] Animações Lottie

### 📱 Mobile Features
- [ ] Push notifications
- [ ] Deep linking
- [ ] Camera/Gallery picker
- [ ] Location services
- [ ] Biometric auth

### 🖥️ Desktop Features
- [ ] Window management
- [ ] Keyboard shortcuts
- [ ] System tray
- [ ] Multi-window support
- [ ] Print support (relatórios)

### 🌐 Web Features
- [ ] SEO otimizado
- [ ] PWA capabilities
- [ ] URL routing
- [ ] Responsive breakpoints

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    🏛️ CLEAN ARCHITECTURE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   ┌─────────────────┐                                           │
│   │  PRESENTATION   │  Pages, Widgets, Controllers              │
│   └────────┬────────┘                                           │
│            │                                                    │
│   ┌────────▼────────┐                                           │
│   │     DOMAIN      │  Entities, Use Cases, Repositories        │
│   └────────┬────────┘  (interfaces)                             │
│            │                                                    │
│   ┌────────▼────────┐                                           │
│   │      DATA       │  Models, Repository Impl, Data Sources    │
│   └─────────────────┘                                           │
│                                                                 │
│   🔄 Fluxo unidirecional com Riverpod                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🚀 Roadmap

```
┌─────────────────────────────────────────────────────────────────┐
│                    📅 CRONOGRAMA ESTIMADO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   MAR 2026  ▓▓▓▓▓░░░░░  Setup + Design System                  │
│   ABR 2026  ▓▓▓▓▓▓▓▓░░  Features core                          │
│   MAI 2026  ▓▓▓▓▓▓▓▓▓▓  Adaptive UI                            │
│   JUN 2026  ░░░░░░░░░░  Testes + Publicação                    │
│                                                                 │
│   PROGRESSO: ░░░░░░░░░░ 0% (Planejado)                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🆚 Comparativo com Outras Perspectivas

| Aspecto | Segunda (Next.js) | Terceira (RN) | Quarta (Flutter) |
|:--------|:----------------:|:-------------:|:----------------:|
| **Plataformas** | Web + PWA | iOS + Android | Todas |
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **UI Customização** | Média | Alta | Máxima |
| **Tamanho equipe** | 1 dev | 1-2 devs | 1 dev |
| **Desktop** | ❌ | ❌ | ✅ |
| **Maturidade** | Madura | Madura | Em crescimento |

> 💡 **Conclusão:** Flutter é ideal quando precisamos de máxima cobertura de plataformas com equipe reduzida e alto nível de customização visual.

---

## 🔧 Pré-requisitos

Quando iniciarmos o desenvolvimento, você precisará de:

```bash
# Flutter SDK
flutter --version  # 3.16+

# Dart SDK (vem com Flutter)
dart --version     # 3.2+

# Para iOS (macOS only)
# Xcode 15+, CocoaPods

# Para Android
# Android Studio + SDK

# Para Desktop
# Visual Studio (Windows)
# Xcode (macOS)
# Build tools (Linux)
```

---

## 📞 Próximos Passos

1. ✅ Finalizar Segunda Perspectiva (Web)
2. ✅ Validar com usuários reais
3. 📊 Decidir próxima perspectiva (RN vs Flutter)
4. 🚀 Iniciar desenvolvimento

---

<div align="center">

**Quarta Perspectiva** - Um código, todas as plataformas

*Planejado por Deivison Santana para Carlos*

[![Status](https://img.shields.io/badge/Coming-Soon-orange?style=flat-square)]()

</div>
