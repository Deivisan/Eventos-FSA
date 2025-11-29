# 🗺️ ROADMAP GLOBAL - EventosFSA

<div align="center">

![EventosFSA](https://img.shields.io/badge/EventosFSA-Roadmap%20Master-DC2626?style=for-the-badge)
![Version](https://img.shields.io/badge/Versão-2.0-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow?style=for-the-badge)

**Documento Mestre de Planejamento e Implementação**

*Última atualização: 29 de Novembro de 2025*

</div>

---

## 📋 ÍNDICE MASTER

1. [Visão Geral do Projeto](#-visão-geral-do-projeto)
2. [As 4 Perspectivas](#-as-4-perspectivas)
3. [Roadmap por Perspectiva](#-roadmap-por-perspectiva)
4. [Checklist de Implementação](#-checklist-de-implementação)
5. [Arquitetura Técnica](#-arquitetura-técnica)
6. [Cronograma Global](#-cronograma-global)
7. [Recursos e Dependências](#-recursos-e-dependências)
8. [Métricas de Sucesso](#-métricas-de-sucesso)

---

## 🎯 VISÃO GERAL DO PROJETO

### Objetivo Principal
Criar uma plataforma SaaS completa para conectar **artistas**, **estabelecimentos** e **público** em Feira de Santana, Bahia, através de múltiplas perspectivas tecnológicas.

### Público-Alvo
- 🎤 **Artistas locais** (músicos, bandas, DJs)
- 🍺 **Estabelecimentos** (bares, restaurantes, casas de show)
- 👥 **Público** (moradores e turistas)
- 💼 **Investidores** (venture capital, anjos)

### Modelo de Negócio
```
┌─────────────────────────────────────────────────────────────┐
│                    FONTES DE RECEITA                        │
├─────────────────────────────────────────────────────────────┤
│ • Comissão sobre cachês: 5%                                 │
│ • Plano Premium Artista: R$ 29,90/mês                       │
│ • Plano Premium Estabelecimento: R$ 49,90/mês               │
│ • Taxa de processamento PIX: 0% (grátis para atrair)        │
│ • Anúncios e patrocínios: variável                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔮 AS 4 PERSPECTIVAS

### Estrutura de Pastas

```
Eventos FSA/
│
├── 📁 Cliente-Carlos/          ← Materiais para investidor (COMPLETO ✅)
│   ├── books/                  ← 5 PDFs profissionais
│   ├── screenshots/            ← 11 imagens do sistema
│   └── README.md
│
├── 📁 Segunda-Perspectiva/     ← Next.js + PWA + Android (EM PROGRESSO 🚧)
│   ├── app/                    ← Código Next.js 14
│   ├── books/                  ← Documentação específica
│   └── screenshots/
│
├── 📁 Terceira-Perspectiva/    ← React Native puro (PLANEJADO 📋)
│   ├── app/
│   └── books/
│
├── 📁 Quarta-Perspectiva/      ← Flutter multiplataforma (PLANEJADO 📋)
│   ├── lib/
│   └── books/
│
├── 📁 Quinta-Perspectiva/      ← Electron Desktop (PLANEJADO 📋)
│   ├── src/
│   └── books/
│
├── 📁 Docs/                    ← Documentação global
│   ├── ROADMAP-GLOBAL.md       ← VOCÊ ESTÁ AQUI
│   ├── CONTATOS-ESTABELECIMENTOS.md
│   ├── ARQUITETURA.md
│   └── API-SPECS.md
│
├── 📁 backend/                 ← API Node.js + Express (EXISTENTE ✅)
├── 📁 src/                     ← Frontend HTML original (EXISTENTE ✅)
└── 📁 public/                  ← Assets públicos
```

---

## 🎨 PERSPECTIVA 1: CLIENTE-CARLOS (COMPLETO ✅)

### Status: ✅ 100% COMPLETO

| Item | Status | Descrição |
|------|--------|-----------|
| ✅ | Completo | 5 Books em PDF profissionais |
| ✅ | Completo | 11 Screenshots de todas as telas |
| ✅ | Completo | README.md documentado |
| ✅ | Completo | Índice Master com navegação |
| ✅ | Completo | Interface Portal QR Code |

### Arquivos Entregues
- `books/01-visao-geral/book.pdf`
- `books/02-guia-estabelecimentos/book.pdf`
- `books/03-guia-artistas/book.pdf`
- `books/04-infraestrutura-qrcode/book.pdf`
- `books/05-modelo-negocio/book.pdf`

---

## 🚀 PERSPECTIVA 2: NEXT.JS + PWA + ANDROID

### Status: 🚧 EM DESENVOLVIMENTO

### Visão
Recriar toda a plataforma em **Next.js 14** com:
- 🎨 Design system moderno com Tailwind CSS
- ✨ Animações com Framer Motion
- 📱 PWA instalável em qualquer dispositivo
- 🤖 App Android nativo via Capacitor
- 🌓 Modo escuro/claro
- 🎭 Múltiplos temas (skins)

### Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|------------|--------|
| Framework | Next.js | 14.x |
| Styling | Tailwind CSS | 3.x |
| Animações | Framer Motion | 10.x |
| UI Components | shadcn/ui | latest |
| Icons | Lucide React | latest |
| Forms | React Hook Form | 7.x |
| Validation | Zod | 3.x |
| State | Zustand | 4.x |
| PWA | next-pwa | 5.x |
| Mobile | Capacitor | 5.x |

### Checklist de Implementação

#### 🏗️ Fase 1: Setup Inicial
- [ ] Criar projeto Next.js 14 com App Router
- [ ] Configurar Tailwind CSS + Tema customizado
- [ ] Instalar shadcn/ui components
- [ ] Configurar Framer Motion
- [ ] Setup ESLint + Prettier
- [ ] Configurar estrutura de pastas

#### 🎨 Fase 2: Design System
- [ ] Definir paleta de cores (múltiplos temas)
- [ ] Criar tokens de design (spacing, typography)
- [ ] Implementar componentes base:
  - [ ] Button (variants: primary, secondary, ghost, danger)
  - [ ] Card (with hover effects, glassmorphism)
  - [ ] Input (with floating label)
  - [ ] Select (with search)
  - [ ] Modal (with animations)
  - [ ] Toast (notifications)
  - [ ] Skeleton (loading states)
  - [ ] Avatar (with status indicator)
  - [ ] Badge (with pulse animation)
  - [ ] Tabs (with underline animation)
  - [ ] Drawer (mobile menu)
  - [ ] Carousel (for images/events)

#### 📱 Fase 3: Layout & Navegação
- [ ] Header responsivo com menu hamburger
- [ ] Bottom navigation (mobile)
- [ ] Sidebar (desktop)
- [ ] Footer com links
- [ ] Breadcrumbs
- [ ] Page transitions (Framer Motion)

#### 🏠 Fase 4: Páginas Públicas
- [ ] Homepage
  - [ ] Hero section com animação
  - [ ] Eventos em destaque (carousel)
  - [ ] Artistas populares (grid animado)
  - [ ] Bares com música agora (cards pulsantes)
  - [ ] CTA de cadastro
  - [ ] Estatísticas animadas (contadores)
- [ ] Página de Eventos
  - [ ] Grid de eventos com filtros
  - [ ] Mapa interativo (integração Google Maps)
  - [ ] Calendário visual
  - [ ] Busca por data/bairro/estilo
- [ ] Página de Artistas
  - [ ] Ranking com animações
  - [ ] Cards com hover effects
  - [ ] Filtro por estilo musical
  - [ ] Modal de gorjeta
- [ ] Página de Estabelecimentos
  - [ ] Lista com badges "Ao Vivo"
  - [ ] Filtro por tipo (bar, restaurante, etc)
  - [ ] Mapa de localização
- [ ] Perfil do Artista
  - [ ] Galeria com lightbox
  - [ ] Player de vídeo
  - [ ] Repertório
  - [ ] Próximos shows
  - [ ] Sistema de avaliações
  - [ ] Botão de gorjeta PIX

#### 🔐 Fase 5: Autenticação
- [ ] Página de Login
  - [ ] Login com email/senha
  - [ ] Login social (Google, Facebook)
  - [ ] "Esqueci minha senha"
  - [ ] Modo demo (acesso rápido)
- [ ] Página de Cadastro
  - [ ] Formulário multi-step
  - [ ] Seleção de tipo (Usuário/Artista/Estabelecimento)
  - [ ] Validação em tempo real
  - [ ] Upload de foto de perfil
  - [ ] Seleção de bairro (autocomplete)

#### 🎤 Fase 6: Dashboard Artista
- [ ] Visão geral (métricas)
- [ ] Agenda de shows
- [ ] Propostas recebidas
- [ ] Gorjetas (histórico + gráficos)
- [ ] Ranking (posição no estilo)
- [ ] Editar perfil
- [ ] Configurações

#### 🍺 Fase 7: Dashboard Estabelecimento
- [ ] Visão geral (métricas)
- [ ] Contratar artista (busca avançada)
- [ ] Eventos agendados
- [ ] Histórico de shows
- [ ] Artistas favoritos
- [ ] Avaliações recebidas
- [ ] Editar perfil
- [ ] Configurações

#### 🛡️ Fase 8: Dashboard Admin
- [ ] Métricas globais (gráficos)
- [ ] Aprovação de cadastros
- [ ] Gestão de usuários
- [ ] Gestão de eventos
- [ ] Relatórios financeiros
- [ ] Moderação de conteúdo
- [ ] Logs de sistema

#### 📱 Fase 9: Portal QR Code (Cliente no Bar)
- [ ] Design dark premium
- [ ] Artista tocando agora
- [ ] Botões de gorjeta (R$10, R$20, R$50, R$100)
- [ ] Setlist atual
- [ ] Próximos eventos do local
- [ ] Sobre o estabelecimento
- [ ] Modal de confirmação PIX

#### ⚡ Fase 10: PWA Configuration
- [ ] Configurar next-pwa
- [ ] Criar manifest.json
- [ ] Gerar ícones em todos os tamanhos
- [ ] Configurar service worker
- [ ] Implementar cache strategy
- [ ] Testar offline mode
- [ ] Add to Home Screen prompt

#### 🤖 Fase 11: Android com Capacitor
- [ ] Instalar Capacitor
- [ ] Configurar capacitor.config.ts
- [ ] Adicionar plataforma Android
- [ ] Configurar splash screen
- [ ] Configurar ícones Android
- [ ] Implementar deep links
- [ ] Configurar push notifications
- [ ] Testar no emulador
- [ ] Gerar APK de teste
- [ ] Configurar para Play Store

#### 🎭 Fase 12: Múltiplos Temas (Skins)
- [ ] Tema Padrão (Vermelho EventosFSA)
- [ ] Tema Escuro (Dark Mode)
- [ ] Tema Carnaval (cores vibrantes)
- [ ] Tema São João (tons terrosos)
- [ ] Tema Noturno (azul/roxo)
- [ ] Tema Minimalista (preto/branco)
- [ ] Seletor de tema com preview
- [ ] Persistência de preferência

#### ✨ Fase 13: Animações e Microinterações
- [ ] Page transitions (fade, slide)
- [ ] Scroll animations (reveal on scroll)
- [ ] Hover effects (scale, glow)
- [ ] Loading skeletons
- [ ] Button ripple effect
- [ ] Card flip animations
- [ ] Counter animations
- [ ] Parallax effects
- [ ] Confetti (após gorjeta)
- [ ] Pulse (ao vivo badge)

#### 🧪 Fase 14: Testes
- [ ] Unit tests (Jest)
- [ ] Component tests (Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Visual regression (Percy)
- [ ] Accessibility tests (axe)
- [ ] Performance tests (Lighthouse)

#### 📦 Fase 15: Deploy
- [ ] Configurar Vercel
- [ ] Configurar domínio
- [ ] SSL/HTTPS
- [ ] CDN para assets
- [ ] Monitoramento (Sentry)
- [ ] Analytics (Google Analytics)

---

## 📱 PERSPECTIVA 3: REACT NATIVE (PLANEJADO)

### Status: 📋 PLANEJADO

### Objetivo
App nativo puro para iOS e Android com máxima performance.

### Tecnologias Planejadas
- React Native 0.73+
- Expo SDK 50+
- React Navigation 6
- NativeWind (Tailwind para RN)
- React Native Reanimated
- React Native Gesture Handler

### Checklist (Alto Nível)
- [ ] Setup Expo com TypeScript
- [ ] Configurar NativeWind
- [ ] Implementar navegação (Tab + Stack)
- [ ] Criar componentes nativos
- [ ] Integrar com API backend
- [ ] Push Notifications
- [ ] Deep Linking
- [ ] Publicar na App Store
- [ ] Publicar na Play Store

---

## 🦋 PERSPECTIVA 4: FLUTTER (PLANEJADO)

### Status: 📋 PLANEJADO

### Objetivo
App multiplataforma com código único para iOS, Android, Web e Desktop.

### Tecnologias Planejadas
- Flutter 3.16+
- Dart 3.2+
- Riverpod (state management)
- Go Router (navigation)
- Dio (HTTP)
- Freezed (code generation)

### Checklist (Alto Nível)
- [ ] Setup Flutter com estrutura clean
- [ ] Implementar design system Material 3
- [ ] Criar widgets customizados
- [ ] Integrar com API backend
- [ ] Compilar para todas as plataformas
- [ ] Publicar nas lojas

---

## 🖥️ PERSPECTIVA 5: ELECTRON DESKTOP (PLANEJADO)

### Status: 📋 PLANEJADO

### Objetivo
Aplicação desktop para gestão administrativa avançada.

### Tecnologias Planejadas
- Electron 28+
- React 18+
- TypeScript
- electron-builder
- Auto-updater

### Checklist (Alto Nível)
- [ ] Setup Electron + React
- [ ] Criar interface administrativa
- [ ] Implementar relatórios avançados
- [ ] Exportação de dados
- [ ] Impressão de materiais
- [ ] Auto-update
- [ ] Instaladores (Windows, Mac, Linux)

---

## 📊 CRONOGRAMA GLOBAL

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         2025 - 2026                                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ NOV 2025  ████████████████ Cliente-Carlos COMPLETO ✅                   │
│ DEZ 2025  ████████████████ Segunda Perspectiva (Next.js) 🚧             │
│ JAN 2026  ████████████████ Segunda Perspectiva (PWA + Android)          │
│ FEV 2026  ████████████████ Terceira Perspectiva (React Native)          │
│ MAR 2026  ████████████████ Quarta Perspectiva (Flutter)                 │
│ ABR 2026  ████████████████ Quinta Perspectiva (Electron)                │
│ MAI 2026  ████████████████ Testes & Refinamentos                        │
│ JUN 2026  ████████████████ Launch & Marketing                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Marcos Importantes

| Data | Marco | Descrição |
|------|-------|-----------|
| 29/11/2025 | ✅ M1 | Cliente-Carlos package completo |
| 15/12/2025 | 🎯 M2 | Segunda Perspectiva MVP |
| 31/12/2025 | 🎯 M3 | PWA funcional |
| 15/01/2026 | 🎯 M4 | App Android beta |
| 28/02/2026 | 🎯 M5 | React Native beta |
| 31/03/2026 | 🎯 M6 | Flutter beta |
| 30/04/2026 | 🎯 M7 | Electron beta |
| 15/05/2026 | 🎯 M8 | Todas perspectivas completas |
| 01/06/2026 | 🚀 M9 | Launch oficial |

---

## 💰 RECURSOS E INVESTIMENTO

### Investimento por Perspectiva

| Perspectiva | Horas Estimadas | Custo Estimado |
|-------------|-----------------|----------------|
| Cliente-Carlos | 40h | ✅ Concluído |
| Segunda (Next.js) | 120h | ~R$ 12.000 |
| Terceira (React Native) | 100h | ~R$ 10.000 |
| Quarta (Flutter) | 100h | ~R$ 10.000 |
| Quinta (Electron) | 60h | ~R$ 6.000 |
| **TOTAL** | **420h** | **~R$ 38.000** |

### Custos Operacionais Mensais

| Item | Custo/mês |
|------|-----------|
| Hospedagem (Vercel Pro) | ~R$ 100 |
| Domínio (.com.br) | ~R$ 40/ano |
| Apple Developer | ~R$ 500/ano |
| Google Play | ~R$ 125 (único) |
| Analytics/Monitoramento | ~R$ 0 (free tier) |

---

## 📈 MÉTRICAS DE SUCESSO

### KPIs por Perspectiva

| Métrica | Meta 3 meses | Meta 6 meses | Meta 12 meses |
|---------|--------------|--------------|---------------|
| Estabelecimentos cadastrados | 20 | 50 | 150 |
| Artistas cadastrados | 50 | 150 | 500 |
| Eventos cadastrados | 100 | 500 | 2000 |
| Gorjetas processadas | R$ 5.000 | R$ 20.000 | R$ 100.000 |
| Downloads App | 500 | 2.000 | 10.000 |
| Receita mensal | R$ 2.000 | R$ 11.000 | R$ 50.000 |

### Métricas de Qualidade

| Métrica | Meta |
|---------|------|
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Core Web Vitals (LCP) | < 2.5s |
| Crash Rate (Mobile) | < 0.5% |
| NPS Score | > 50 |
| App Store Rating | > 4.5 |

---

## 🔧 INSTRUÇÕES PARA AGENTES FUTUROS

### Como Continuar Este Projeto

1. **Verifique o status atual:**
   - Leia este ROADMAP-GLOBAL.md
   - Verifique as pastas existentes
   - Identifique o que está ✅ completo vs 🚧 em progresso

2. **Siga a checklist:**
   - Marque itens como concluídos [x] quando terminar
   - Mantenha este arquivo atualizado
   - Adicione novas tarefas se necessário

3. **Padrões de código:**
   - TypeScript obrigatório
   - Componentes funcionais com hooks
   - Tailwind para styling
   - shadcn/ui para UI components
   - Comentários em português

4. **Estrutura de commits:**
   ```
   feat: adiciona nova funcionalidade
   fix: corrige bug
   docs: atualiza documentação
   style: formatação
   refactor: refatoração
   test: adiciona testes
   chore: manutenção
   ```

5. **Antes de implementar:**
   - Leia a documentação em Docs/
   - Verifique se há contatos em CONTATOS-ESTABELECIMENTOS.md
   - Consulte o design system existente

---

## 📞 CONTATOS DO PROJETO

| Papel | Nome | Contato |
|-------|------|---------|
| Idealizador/Investidor | Carlos | - |
| Desenvolvedor Principal | Deivison | - |
| Agente AI | DevSan | Sempre disponível 🤖 |

---

<div align="center">

**EventosFSA - Alavancar os eventos de Feira de Santana 🎵**

*Roadmap criado por DevSan | Novembro 2025*

![Progress](https://img.shields.io/badge/Progresso-25%25-yellow?style=flat-square)

</div>
