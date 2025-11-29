# 🚀 EventosFSA - A Revolução do Entretenimento (Beta Público)

<div align="center">
  <img src="public/assets/logo.svg" alt="EventosFSA Logo" width="200"/>
  <h3>Conectando Artistas, Estabelecimentos e Público em Feira de Santana</h3>
  <p>
    <a href="https://wa.me/557591501680"><strong>Participar do Beta (WhatsApp)</strong></a> •
    <a href="#-documentação-oficial">Documentação</a> •
    <a href="#-tecnologia">Tecnologia</a>
  </p>
</div>

---

## 📢 Status do Projeto: Beta Público (Fase 2)

O **EventosFSA** está em fase de **Beta Público**. Nesta etapa, focamos na validação de mercado e aquisição de usuários utilizando uma abordagem **Low-Code/No-Code** para o fluxo de cadastro e negociação, integrado diretamente ao WhatsApp Business.

### 🎯 O que está funcionando agora?
- **Portal Público:** Visualização de artistas e eventos (Next.js estático).
- **Cadastro Simplificado:** Redirecionamento inteligente para WhatsApp CRM.
- **Guias e Manuais:** Documentação completa para todos os stakeholders.
- **Infraestrutura:** Hospedagem de alta performance via GitHub Pages.

---

## 📚 Documentação Oficial (Books)

Preparamos guias detalhados para cada perfil de usuário. Acesse o conteúdo completo na pasta Segunda-Perspectiva/books/final/:

| 📘 Book | 👤 Público Alvo | 📝 Descrição |
|---------|-----------------|--------------|
| **[Guia do Artista](Segunda-Perspectiva/books/final/01-guia-artista.md)** | Músicos e Bandas | Como criar perfil, receber propostas e aumentar cachê. |
| **[Guia do Estabelecimento](Segunda-Perspectiva/books/final/02-guia-estabelecimento.md)** | Bares e Restaurantes | Como contratar shows e divulgar eventos. |
| **[Guia do Público](Segunda-Perspectiva/books/final/03-guia-publico.md)** | Visitantes | Como encontrar rolês e apoiar artistas. |
| **[Visão do Investidor](Segunda-Perspectiva/books/final/04-visao-investidor.md)** | Investidores | Modelo de negócio, projeções e roadmap. |

> 🎧 **Bônus:** Scripts para Podcast/Audiobook disponíveis em Segunda-Perspectiva/notebooklm/.

---

## 🛠️ Tecnologia e Arquitetura

Esta versão (Segunda Perspectiva) foi arquitetada para **escala e custo zero** de infraestrutura inicial.

- **Frontend:** Next.js 14 (App Router)
- **Estilização:** Tailwind CSS + Lucide Icons
- **Build:** Static Export (output: 'export')
- **Hospedagem:** GitHub Pages
- **CRM/Backend (Beta):** WhatsApp Business API (Link Direct)
- **Mobile:** Capacitor (Android Wrapper)

### Estrutura de Pastas Relevante
`
EventosFSA/
├── Segunda-Perspectiva/    # �� CÓDIGO FONTE ATUAL
│   ├── app/                # Aplicação Next.js
│   ├── books/              # Documentação e Manuais
│   └── notebooklm/         # Scripts para IA de Áudio
├── Docs/                   # Documentação Legada
└── README.md               # Este arquivo
`

---

## 🚀 Como Rodar Localmente

Para desenvolvedores que desejam contribuir ou testar a plataforma:

1. **Acesse a pasta do projeto:**
   `ash
   cd Segunda-Perspectiva/app
   `

2. **Instale as dependências:**
   `ash
   npm install
   `

3. **Rode o servidor de desenvolvimento:**
   `ash
   npm run dev
   `
   Acesse http://localhost:3000.

4. **Gerar Build de Produção (Estático):**
   `ash
   npm run build
   `
   Os arquivos serão gerados na pasta out/.

---

## 📲 Fluxo de Cadastro (Beta)

Nesta fase, removemos a barreira de entrada de formulários complexos.

1. Usuário clica em **"Cadastrar"** no site.
2. Seleciona seu perfil (Artista, Estabelecimento, Público).
3. O sistema gera uma mensagem pré-formatada.
4. O usuário é redirecionado para o **WhatsApp Oficial**, onde nossa equipe (ou bot) finaliza o onboarding.

---

## 📞 Contato e Suporte

- **WhatsApp Oficial:** [(75) 9150-1680](https://wa.me/557591501680)
- **Desenvolvedor:** Deivison Santana
- **Licença:** Proprietária - Todos os direitos reservados.

---
<div align="center">
  Feito com 🧡 e Next.js em Feira de Santana
</div>
