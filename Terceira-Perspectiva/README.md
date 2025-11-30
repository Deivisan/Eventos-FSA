<div align="center">

# 📱 Terceira Perspectiva

<img src="https://img.shields.io/badge/React%20Native-0.73-61DAFB?style=for-the-badge&logo=react" alt="React Native" />
<img src="https://img.shields.io/badge/Expo-SDK%2050-000020?style=for-the-badge&logo=expo" alt="Expo" />
<img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />

### 📲 App Nativo Puro • iOS & Android • Performance Máxima

**A reimaginação do EventosFSA como aplicativo nativo, aproveitando 100% das capacidades de cada plataforma.**

[![Status](https://img.shields.io/badge/Status-📋%20Planejado-yellow?style=flat-square)](.)
[![ETA](https://img.shields.io/badge/ETA-Fev%202026-blue?style=flat-square)](.)

</div>

---

## 🎯 A Visão

Enquanto a Segunda Perspectiva foca em uma PWA universal, a **Terceira Perspectiva** representa o caminho **nativo puro** - onde cada pixel, animação e interação é otimizado para o hardware do dispositivo.

### 💡 Por que React Native?

```
┌─────────────────────────────────────────────────────────────────┐
│                    🚀 VANTAGENS NATIVAS                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   📱 FEEL NATIVO              ⚡ 60 FPS GARANTIDO               │
│   Gestos iOS/Android          Animações sem lag                 │
│   perfeitos                   Reanimated 3                      │
│                                                                 │
│   🔔 PUSH NATIVO              📍 GEOLOCATION                    │
│   Notificações ricas          Background location               │
│   com imagens                 para tracking                     │
│                                                                 │
│   🎵 AUDIO BACKGROUND         💳 PAGAMENTOS                     │
│   Tocando em segundo          Apple Pay, Google Pay             │
│   plano                       PIX nativo                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Preview Conceitual

> 🎨 *Interface reimaginada para experiência mobile nativa*

<div align="center">

| Splash Screen | Home (iOS Style) | Perfil Artista |
|:---:|:---:|:---:|
| 🎵 | 📱 | 🎤 |
| Logo animado | Bottom Tab nativa | Scroll com parallax |
| Gradiente premium | Blur effects | Sticky header |

| Gorjeta PIX | Eventos | AR Preview |
|:---:|:---:|:---:|
| 💝 | 📅 | 🔮 |
| Sheet bottom | Calendar nativo | Futuro: AR filters |
| Haptic feedback | Pull to refresh | para artistas |

</div>

---

## 🛠️ Stack Planejada

### Core
| Tecnologia | Versão | Uso |
|:-----------|:------:|:----|
| **React Native** | 0.73+ | Framework mobile |
| **Expo** | SDK 50+ | Managed workflow |
| **TypeScript** | 5.x | Tipagem estática |
| **NativeWind** | 4.x | Tailwind no RN |

### Navegação & UI
| Biblioteca | Uso |
|:-----------|:----|
| **React Navigation** | Tab + Stack navigation |
| **React Native Gesture Handler** | Gestos nativos |
| **Reanimated 3** | Animações 60fps |
| **Moti** | Animações declarativas |

### Integrações Nativas
| Feature | Biblioteca |
|:--------|:-----------|
| 🔔 Push Notifications | expo-notifications |
| 📍 Geolocalização | expo-location |
| 📸 Câmera/Galeria | expo-image-picker |
| 💳 Pagamentos | react-native-payments |
| 🗺️ Mapas | react-native-maps |
| 🎵 Audio | expo-av |

---

## 📁 Estrutura Planejada

```
Terceira-Perspectiva/
│
├── 📁 app/                      # 🚀 Código fonte
│   ├── src/
│   │   ├── screens/             # Telas do app
│   │   │   ├── (tabs)/          # Tab screens
│   │   │   ├── artist/          # Perfil artista
│   │   │   ├── event/           # Detalhes evento
│   │   │   └── auth/            # Login/Cadastro
│   │   │
│   │   ├── components/          # Componentes
│   │   │   ├── ui/              # Buttons, Cards
│   │   │   ├── artist/          # Específicos artista
│   │   │   └── event/           # Específicos evento
│   │   │
│   │   ├── navigation/          # React Navigation config
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API, storage
│   │   ├── store/               # Zustand stores
│   │   └── utils/               # Helpers
│   │
│   ├── assets/                  # Imagens, fontes
│   ├── app.json                 # Expo config
│   └── eas.json                 # Build config
│
├── 📁 docs/                     # Documentação
│   ├── setup.md                 # Como rodar
│   ├── architecture.md          # Arquitetura
│   └── design-system.md         # Componentes
│
└── README.md                    # Este arquivo
```

---

## ✨ Features Planejadas

### 📱 Experiência Core
- [ ] Onboarding animado
- [ ] Tab navigation com blur
- [ ] Pull-to-refresh nativo
- [ ] Skeleton loaders
- [ ] Haptic feedback

### 🎤 Para Artistas
- [ ] Dashboard com gráficos nativos
- [ ] Push notifications de propostas
- [ ] Aceitar/recusar com swipe
- [ ] Histórico de gorjetas em tempo real
- [ ] Share com Deep Links

### 🍺 Para Estabelecimentos
- [ ] Busca de artistas com filtros
- [ ] Agenda em calendário nativo
- [ ] QR Code generator nativo
- [ ] Relatórios exportáveis

### 👥 Para Público
- [ ] Mapa com eventos ao redor
- [ ] Gorjeta com Apple Pay/Google Pay
- [ ] Notificações de artistas favoritos
- [ ] Check-in em eventos
- [ ] Avaliações com fotos

### 🔔 Push Notifications
- [ ] Propostas de show
- [ ] Gorjetas recebidas
- [ ] Eventos próximos
- [ ] Artista favorito tocando
- [ ] Lembretes de agenda

---

## 🚀 Roadmap

```
┌─────────────────────────────────────────────────────────────────┐
│                    📅 CRONOGRAMA ESTIMADO                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   JAN 2026  ▓▓▓▓▓░░░░░  Setup + Navegação                      │
│   FEV 2026  ▓▓▓▓▓▓▓▓░░  Telas públicas                         │
│   MAR 2026  ▓▓▓▓▓▓▓▓▓▓  Dashboards + Auth                      │
│   ABR 2026  ░░░░░░░░░░  Push + Pagamentos                      │
│   MAI 2026  ░░░░░░░░░░  Testes + Publicação                    │
│                                                                 │
│   PROGRESSO: ░░░░░░░░░░ 0% (Planejado)                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Pré-requisitos

Quando iniciarmos o desenvolvimento, você precisará de:

```bash
# Node.js 18+
node --version

# Expo CLI
npm install -g expo-cli

# Para iOS (macOS only)
# Xcode 15+

# Para Android
# Android Studio + SDK 34
```

---

## 🆚 Comparativo com Segunda Perspectiva

| Aspecto | Segunda (PWA) | Terceira (Nativo) |
|:--------|:-------------:|:-----------------:|
| **Performance** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Gestos** | Básico | Nativo perfeito |
| **Push** | Limitado | Completo |
| **Offline** | Service Worker | SQLite nativo |
| **Instalação** | Browser | App Store |
| **Tamanho** | ~5MB | ~30MB |
| **Custo dev** | Baixo | Médio |
| **Manutenção** | Única | iOS + Android |

> 💡 **Conclusão:** A Segunda Perspectiva é ideal para MVP e validação. A Terceira é o próximo passo para escalar com qualidade premium.

---

## 📞 Próximos Passos

1. ✅ Finalizar Segunda Perspectiva
2. 🎯 Validar MVP com usuários reais
3. 📊 Analisar métricas de uso mobile
4. 🚀 Iniciar desenvolvimento nativo

---

<div align="center">

**Terceira Perspectiva** - O futuro nativo do EventosFSA

*Planejado por Deivison Santana para Carlos*

[![Status](https://img.shields.io/badge/Coming-Soon-orange?style=flat-square)]()

</div>
