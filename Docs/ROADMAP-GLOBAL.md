# 🗺️ ROADMAP GLOBAL - EventosFSA

<div align="center">

![EventosFSA](https://img.shields.io/badge/EventosFSA-Roadmap%20Master-DC2626?style=for-the-badge)
![Version](https://img.shields.io/badge/Versão-2.1-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-ONLINE-success?style=for-the-badge)
![Deploy](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen?style=for-the-badge)

**Documento Mestre de Planejamento e Implementação**

🌐 **Site Online:** https://deivisan.github.io/Eventos-FSA/

*Última atualização: 29 de Novembro de 2025*

</div>

---

## 🎉 MARCO ALCANÇADO: DEPLOY NO GITHUB PAGES!

✅ **Site está ONLINE e funcionando!**
- URL: https://deivisan.github.io/Eventos-FSA/
- Workflow GitHub Actions configurado e funcionando
- Build estático otimizado para GitHub Pages
- Navegação funcionando corretamente com basePath

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
├── 📁 Primeira-Perspectiva/    ← Marketing & Investidor (COMPLETO ✅)
│   ├── marketing/              ← Assets de Social Media
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

## 🎨 PERSPECTIVA 1: PRIMEIRA PERSPECTIVA (MARKETING & INVESTIDOR)

### Status: ✅ 100% COMPLETO

| Item | Status | Descrição |
|------|--------|-----------|
| ✅ | Completo | 45+ Assets de Marketing Gerados |
| ✅ | Completo | Metodologia de Marketing Definida |
| ✅ | Completo | 5 Books em PDF profissionais |
| ✅ | Completo | 11 Screenshots de todas as telas |
| ✅ | Completo | README.md documentado |
| ✅ | Completo | Índice Master com navegação |
| ✅ | Completo | Interface Portal QR Code |

### Arquivos Entregues
- `marketing/social-media/*.png`
- `marketing/Metodologia-Marketing.md`
- `books/01-visao-geral/book.pdf`
- `books/02-guia-estabelecimentos/book.pdf`
- `books/03-guia-artistas/book.pdf`
- `books/04-infraestrutura-qrcode/book.pdf`
- `books/05-modelo-negocio/book.pdf`

---

## 🚀 PERSPECTIVA 2: NEXT.JS + PWA + ANDROID

### Status: ✅ MVP COMPLETO (Refinamentos Finais)

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
- [x] Homepage
  - [x] Hero section com animação
  - [x] Eventos em destaque (carousel)
  - [x] Artistas populares (grid animado)
  - [x] Bares com música agora (cards pulsantes)
  - [x] CTA de cadastro
  - [x] Estatísticas animadas (contadores)
- [x] Página de Eventos
  - [x] Grid de eventos com filtros
  - [x] Mapa interativo (integração Google Maps)
  - [x] Calendário visual
  - [x] Busca por data/bairro/estilo
- [x] Página de Artistas
  - [x] Ranking com animações
  - [x] Cards com hover effects
  - [x] Filtro por estilo musical
  - [x] Modal de gorjeta
- [x] Página de Estabelecimentos
  - [x] Lista com badges "Ao Vivo"
  - [x] Filtro por tipo (bar, restaurante, etc)
  - [x] Mapa de localização
- [x] Perfil do Artista
  - [x] Galeria com lightbox
  - [x] Player de vídeo
  - [x] Repertório
  - [x] Próximos shows
  - [x] Sistema de avaliações
  - [x] Botão de gorjeta PIX

#### 🔐 Fase 5: Autenticação
- [x] Página de Login
  - [x] Login com email/senha
  - [x] Login social (Google, Facebook)
  - [x] "Esqueci minha senha"
  - [x] Modo demo (acesso rápido)
- [x] Página de Cadastro
  - [x] Formulário multi-step
  - [x] Seleção de tipo (Usuário/Artista/Estabelecimento)
  - [x] Validação em tempo real
  - [x] Upload de foto de perfil
  - [x] Seleção de bairro (autocomplete)

#### 🎤 Fase 6: Dashboard Artista
- [x] Visão geral (métricas)
- [x] Agenda de shows
- [x] Propostas recebidas
- [x] Gorjetas (histórico + gráficos)
- [x] Ranking (posição no estilo)
- [x] Editar perfil
- [x] Configurações

#### 🍺 Fase 7: Dashboard Estabelecimento
- [x] Visão geral (métricas)
- [x] Contratar artista (busca avançada)
- [x] Eventos agendados
- [x] Histórico de shows
- [x] Artistas favoritos
- [x] Avaliações recebidas
- [x] Editar perfil
- [x] Configurações

#### 🛡️ Fase 8: Dashboard Admin
- [x] Métricas globais (gráficos)
- [x] Aprovação de cadastros
- [x] Gestão de usuários
- [x] Gestão de eventos
- [x] Relatórios financeiros
- [x] Moderação de conteúdo
- [x] Logs de sistema

#### 📱 Fase 9: Portal QR Code (Cliente no Bar)
- [x] Design dark premium
- [x] Artista tocando agora
- [x] Botões de gorjeta (R$10, R$20, R$50, R$100)
- [x] Setlist atual
- [x] Próximos eventos do local
- [x] Sobre o estabelecimento
- [x] Modal de confirmação PIX

#### ⚡ Fase 10: PWA Configuration
- [x] Configurar next-pwa
- [x] Criar manifest.json
- [x] Gerar ícones em todos os tamanhos
- [x] Configurar service worker
- [x] Implementar cache strategy
- [x] Testar offline mode
- [x] Add to Home Screen prompt

#### 🤖 Fase 11: Android com Capacitor
- [x] Instalar Capacitor
- [x] Configurar capacitor.config.ts
- [x] Adicionar plataforma Android
- [x] Configurar splash screen
- [ ] Configurar ícones Android
- [ ] Implementar deep links
- [ ] Configurar push notifications
- [ ] Testar no emulador
- [ ] Gerar APK de teste
- [ ] Configurar para Play Store

#### 🎭 Fase 12: Múltiplos Temas (Skins)
- [x] Tema Padrão (Vermelho EventosFSA)
- [x] Tema Escuro (Dark Mode)
- [x] Tema Carnaval (cores vibrantes)
- [x] Tema São João (tons terrosos)
- [x] Tema Noturno (azul/roxo)
- [x] Tema Minimalista (preto/branco)
- [x] Seletor de tema com preview
- [x] Persistência de preferência

#### ✨ Fase 13: Animações e Microinterações
- [x] Page transitions (fade, slide)
- [x] Scroll animations (reveal on scroll)
- [x] Hover effects (scale, glow)
- [x] Loading skeletons
- [x] Button ripple effect
- [x] Card flip animations
- [x] Counter animations
- [x] Parallax effects
- [x] Confetti (após gorjeta)
- [x] Pulse (ao vivo badge)

#### 🧪 Fase 14: Testes
- [ ] Unit tests (Jest)
- [ ] Component tests (Testing Library)
- [ ] E2E tests (Playwright)
- [ ] Visual regression (Percy)
- [ ] Accessibility tests (axe)
- [ ] Performance tests (Lighthouse)

#### 📦 Fase 15: Deploy
- [x] ~~Configurar Vercel~~ **Usando GitHub Pages**
- [x] GitHub Pages configurado e funcionando
- [x] CI/CD com GitHub Actions
- [x] basePath configurado para subdiretório
- [ ] Configurar domínio customizado (eventosfsa.com.br)
- [x] SSL/HTTPS (via GitHub Pages)
- [x] CDN para assets (via GitHub)

---

## 🚨 PENDÊNCIAS DETALHADAS - SEGUNDA PERSPECTIVA

### 🔴 CRÍTICAS (Bloqueadoras)

| # | Pendência | Descrição | Impacto | Esforço |
|---|-----------|-----------|---------|---------|
| 1 | **Ícones PWA faltando** | Apenas `icon.svg` existe em `/public/icons/`. Manifest.json referencia 8 ícones PNG que não existem | PWA não instala corretamente | 1h |
| 2 | **Portal QR Code vazio** | Pasta `/app/portal/` está vazia - precisa da página | Feature core não funciona | 4h |
| 3 | **Páginas dinâmicas 404** | Links para `/artistas/1`, `/eventos/1`, `/estabelecimentos/1` dão 404 (não há rotas dinâmicas) | UX quebrada | 3h |

### 🟠 IMPORTANTES (Afetam UX)

| # | Pendência | Descrição | Impacto | Esforço |
|---|-----------|-----------|---------|---------|
| 4 | **Encoding UTF-8** | Caracteres especiais exibindo como `??` no HTML (ex: "música" → "m??sica") | Legibilidade | 1h |
| 5 | **Falta página /sobre** | Link no footer aponta para `/sobre` que não existe | 404 | 1h |
| 6 | **Falta página /termos** | Link no footer aponta para `/termos` que não existe | 404 | 1h |
| 7 | **Falta página /privacidade** | Link no footer aponta para `/privacidade` que não existe | 404 | 1h |
| 8 | **Falta página /ao-vivo** | Seção "Ao Vivo Agora" linka para página inexistente | 404 | 2h |
| 9 | **Falta página /recuperar-senha** | Link "Esqueci a senha" no login aponta para página inexistente | 404 | 2h |
| 10 | **OG Image localhost** | Meta tags de Open Graph apontam para `http://localhost:3000/og-image.png` | SEO/Compartilhamento | 30min |

### 🟡 MELHORIAS (Nice to have)

| # | Pendência | Descrição | Impacto | Esforço |
|---|-----------|-----------|---------|---------|
| 11 | **Imagens placeholder** | Cards de artistas/venues usam gradientes, não fotos reais | Visual | 2h |
| 12 | **Dados mockados estáticos** | Todos os dados são hardcoded, não há API real | Funcionalidade | Backend |
| 13 | **Service Worker** | next-pwa configurado mas precisa testar offline | PWA | 2h |
| 14 | **Screenshots PWA** | Manifest.json referencia screenshots que não existem | PWA Store | 1h |
| 15 | **Ícones de shortcuts** | Shortcuts no manifest referenciam ícones inexistentes | PWA | 30min |

### 🟢 ANDROID/CAPACITOR

| # | Pendência | Descrição | Impacto | Esforço |
|---|-----------|-----------|---------|---------|
| 16 | **Ícones Android** | Falta configurar ícones adaptativos Android | Play Store | 2h |
| 17 | **Deep Links** | Não configurado | UX | 3h |
| 18 | **Push Notifications** | Não implementado | Engajamento | 4h |
| 19 | **Testar emulador** | APK não testado | QA | 2h |
| 20 | **Build APK** | Não gerado | Distribuição | 1h |

---

## 📊 RESUMO DE STATUS

```
┌─────────────────────────────────────────────────────────────────┐
│              SEGUNDA PERSPECTIVA - STATUS ATUAL                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ✅ CONCLUÍDO                                                   │
│  ├─ Deploy GitHub Pages                                         │
│  ├─ Homepage + Layout                                           │
│  ├─ Páginas principais (eventos, artistas, estabelecimentos)    │
│  ├─ Sistema de autenticação (demo mode)                         │
│  ├─ Dashboards (artista, venue, user, admin)                    │
│  ├─ Sistema de temas                                            │
│  ├─ Animações Framer Motion                                     │
│  └─ PWA manifest.json                                           │
│                                                                 │
│  🚧 EM PROGRESSO                                                │
│  ├─ Rotas dinâmicas (/artistas/[id], etc)                      │
│  ├─ Portal QR Code                                              │
│  └─ Ícones PWA                                                  │
│                                                                 │
│  📋 PENDENTE                                                    │
│  ├─ Testes automatizados                                        │
│  ├─ Build Android                                               │
│  ├─ Domínio customizado                                         │
│  └─ Backend real (API + Database)                               │
│                                                                 │
│  PROGRESSO GERAL: ████████████████████░░░░ 80%                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---
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
| NOV 2025  ████████████████ Primeira Perspectiva COMPLETO ✅             |
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
| 29/11/2025 | ✅ M1 | Primeira Perspectiva package completo |
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
| Primeira Perspectiva | 40h | ✅ Concluído |
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

![Progress](https://img.shields.io/badge/Progresso-90%25-green?style=flat-square)

</div>
