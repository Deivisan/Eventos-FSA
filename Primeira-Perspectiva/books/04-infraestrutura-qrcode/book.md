<div class="cover">
  <div class="logo-icon">📱</div>
  <h1>EventosFSA</h1>
  <h2>Infraestrutura QR Code</h2>
  <h3>Documentação técnica do sistema de acesso via QR Code nos estabelecimentos</h3>
  <div class="version">
    <strong>Versão 2.0</strong> | Novembro 2025<br>
    Para entendimento do modelo de operação
  </div>
</div>

---

# Visão Geral

O sistema de **QR Code** é o diferencial tecnológico do EventosFSA. Ele cria uma ponte entre o mundo físico (o bar, o show) e o mundo digital (a plataforma, as gorjetas).

<div class="info">

📱 **Conceito Principal:** Cliente escaneia → Acessa portal → Vê artista → Envia gorjeta → Avalia o show

Tudo isso acontece em **menos de 30 segundos**, direto do celular do cliente.

</div>

## Por Que QR Code?

| Vantagem | Impacto |
|----------|---------|
| **Sem instalação de app** | Cliente não precisa baixar nada |
| **Acesso instantâneo** | Câmera do celular é suficiente |
| **Contexto automático** | Sistema sabe qual bar e qual artista |
| **Baixo custo** | Material impresso é barato |
| **Universal** | Funciona em qualquer smartphone |

---

# Arquitetura do Sistema

## Fluxo Completo de Funcionamento

<div class="diagram">
<div class="flow-box">👤 Cliente<br>no bar</div>
<span class="arrow">→</span>
<div class="flow-box">📱 Escaneia<br>QR Code</div>
<span class="arrow">→</span>
<div class="flow-box">🌐 Acessa<br>portal web</div>
<span class="arrow">→</span>
<div class="flow-box">🎤 Vê artista<br>ao vivo</div>
<span class="arrow">→</span>
<div class="flow-box">💝 Envia<br>gorjeta PIX</div>
</div>

## Componentes do Sistema

| Componente | Descrição | Responsabilidade |
|------------|-----------|------------------|
| **QR Code físico** | Impresso em displays, adesivos, cartazes | Entrada do sistema |
| **URL única** | Link específico por evento | Identificação |
| **Portal mobile** | Página web otimizada para celular | Interface do usuário |
| **Backend API** | Servidor que processa requisições | Lógica de negócio |
| **Gateway PIX** | Integração com Mercado Pago | Processamento de pagamentos |
| **Banco de dados** | PostgreSQL | Armazenamento |

---

# Estrutura da URL

## Formato do Link

Cada QR Code contém uma URL única que identifica o evento:

<div class="tech">

https://eventosfsa.com.br/portal/{estabelecimento_slug}/{evento_id}

Exemplos:
https://eventosfsa.com.br/portal/bar-do-ze/evt-2025-11-30-001
https://eventosfsa.com.br/portal/cidade-da-cultura/evt-2025-12-01-002

</div>

## Tipos de QR Code

### 1. QR Code de Evento (Temporário)

| Característica | Descrição |
|----------------|-----------|
| **Validade** | Apenas durante o evento |
| **Conteúdo** | Mostra o artista que está tocando AGORA |
| **Uso ideal** | Mesas, balcão, displays rotativos |
| **Geração** | Automática ao confirmar evento |

### 2. QR Code do Estabelecimento (Permanente)

| Característica | Descrição |
|----------------|-----------|
| **Validade** | Sempre ativo |
| **Conteúdo** | Agenda de eventos + artista ao vivo (se houver) |
| **Uso ideal** | Porta de entrada, vitrine, cardápio |
| **Geração** | Uma vez, no cadastro |

<div class="highlight">

💡 **Estratégia recomendada:** Use QR Code permanente na entrada e QR Code de evento nas mesas durante os shows.

</div>

---

# Materiais de Impressão

## Kit Padrão para Estabelecimentos

Cada estabelecimento parceiro recebe:

| Material | Quantidade | Dimensão | Onde usar |
|----------|------------|----------|-----------|
| Display de mesa | 10 unidades | 10x10 cm | Cada mesa |
| Adesivo porta | 2 unidades | A4 | Entrada principal |
| Cartaz interno | 3 unidades | A3 | Paredes internas |
| Flyers | 50 unidades | 10x15 cm | Distribuir para clientes |
| Porta-guardanapo | 5 unidades | 7x7 cm | Suportes de guardanapo |

## Design dos Materiais

Todos os materiais seguem identidade visual:

- **Cores:** Vermelho (#DC2626), Branco, Cinza escuro
- **Logo:** EventosFSA sempre presente
- **CTA:** "Escaneie e envie uma gorjeta!" ou "Veja quem está tocando"
- **Instrução:** Ícone de câmera + seta para o QR Code

---

# O Portal Mobile

## Tela Principal (Quando há show ao vivo)

### Header
- Logo do estabelecimento
- Nome e endereço
- Badge animado **"🔴 AO VIVO"**

### Seção do Artista
- **Foto grande** do artista (80% da largura)
- **Nome** em destaque
- **Estilo musical** (ex: MPB, Sertanejo)
- **Avaliação** com estrelas
- **Botão gigante** "ENVIAR GORJETA" (call-to-action principal)

### Valores de Gorjeta
- Botões rápidos: R$ 10 | R$ 20 | R$ 50 | R$ 100
- Campo para valor personalizado
- Integração direta com PIX

### Seção Secundária
- Lista de músicas tocadas (setlist)
- Próximos eventos do estabelecimento
- Sobre o artista (mini bio)
- Link para perfil completo

### Footer
- "Powered by EventosFSA"
- Link para o site principal
- Política de privacidade

---

# Sistema de Gorjetas via PIX

## Fluxo Técnico

<div class="diagram">
<div class="flow-box">1️⃣ Cliente<br>escolhe valor</div>
<span class="arrow">→</span>
<div class="flow-box">2️⃣ API gera<br>QR Code PIX</div>
<span class="arrow">→</span>
<div class="flow-box">3️⃣ Cliente<br>paga no app banco</div>
<span class="arrow">→</span>
<div class="flow-box">4️⃣ Webhook<br>confirma</div>
<span class="arrow">→</span>
<div class="flow-box">5️⃣ Artista<br>recebe 100%</div>
</div>

## Especificações Técnicas

| Aspecto | Implementação |
|---------|---------------|
| **Geração do QR PIX** | API Mercado Pago (PIX Copia e Cola) |
| **Chave PIX do artista** | Cadastrada no perfil (CPF, e-mail, telefone ou aleatória) |
| **Confirmação de pagamento** | Webhook em tempo real (<5 segundos) |
| **Recibo** | Enviado por e-mail para cliente e artista |
| **Fallback** | Se PIX falhar, oferece chave para copiar manualmente |

## Fluxo de Dados

<div class="tech">

1. Cliente clica em "Enviar Gorjeta R$ 20"
2. Frontend envia POST /api/tips/create
   {
     artistId: "art_123",
     eventId: "evt_456",
     amount: 2000 // centavos
   }
3. Backend gera cobrança via Mercado Pago API
4. Retorna QR Code PIX (imagem + código copia-cola)
5. Cliente paga usando app do banco
6. Mercado Pago envia webhook POST /api/webhooks/mercadopago
7. Backend confirma pagamento e atualiza banco
8. Artista recebe notificação push
9. Valor aparece no dashboard do artista

</div>

## Segurança

<div class="success">

✅ **Dinheiro direto para o artista** — Não retemos valores

✅ **PIX instantâneo** — Crédito em segundos

✅ **Criptografia ponta a ponta** — HTTPS + tokens seguros

✅ **Sem armazenamento de dados bancários** — Gateway cuida de tudo

✅ **Conformidade LGPD** — Dados tratados conforme legislação

</div>

---

# Implementação nos Estabelecimentos

## Processo de Onboarding

### Etapa 1: Configuração Inicial (Feita uma vez)

<div class="step">
<span class="step-number">1</span>
<div>Estabelecimento se cadastra na plataforma</div>
</div>

<div class="step">
<span class="step-number">2</span>
<div>Equipe EventosFSA aprova o cadastro (até 24h)</div>
</div>

<div class="step">
<span class="step-number">3</span>
<div>QR Code permanente é gerado automaticamente</div>
</div>

<div class="step">
<span class="step-number">4</span>
<div>Materiais de impressão são enviados digitalmente (PDF)</div>
</div>

<div class="step">
<span class="step-number">5</span>
<div>Estabelecimento imprime e distribui nas mesas</div>
</div>

### Etapa 2: Para Cada Evento

<div class="step">
<span class="step-number">1</span>
<div>Estabelecimento confirma evento com artista pela plataforma</div>
</div>

<div class="step">
<span class="step-number">2</span>
<div>QR Code específico do evento é gerado automaticamente</div>
</div>

<div class="step">
<span class="step-number">3</span>
<div>Portal é atualizado para mostrar o artista confirmado</div>
</div>

<div class="step">
<span class="step-number">4</span>
<div>No dia do show, clientes escaneiam e interagem</div>
</div>

---

# Requisitos Técnicos

## Para o Estabelecimento

| Requisito | Obrigatório? | Observação |
|-----------|--------------|------------|
| Internet banda larga | ✅ Sim | Necessário para processar transações |
| Wi-Fi para clientes | ❌ Opcional | Cliente pode usar 4G/5G próprio |
| QR Codes impressos | ✅ Sim | Fornecidos pela plataforma |
| Smartphone do gerente | ✅ Sim | Para acessar dashboard |

## Para o Cliente Final

| Requisito | Observação |
|-----------|------------|
| Smartphone | Qualquer modelo com câmera |
| App de banco | Para pagar via PIX |
| Internet | 4G/5G ou Wi-Fi do estabelecimento |

<div class="info">

💡 **Importante:** O sistema funciona 100% via navegador. O cliente NÃO precisa instalar nenhum aplicativo do EventosFSA.

</div>

---

# Métricas e Analytics

## O Que Medimos

| Métrica | Utilidade | Disponível para |
|---------|-----------|-----------------|
| **Escaneamentos** | Engajamento do público | Estabelecimento + Admin |
| **Tempo na página** | Interesse no artista | Admin |
| **Taxa de conversão** | % que envia gorjeta | Artista + Estabelecimento |
| **Valor médio gorjeta** | Ticket médio | Artista |
| **Avaliações** | Qualidade dos shows | Todos |
| **Retorno de usuários** | Fidelização | Estabelecimento |

## Dashboard do Estabelecimento

O dono do bar pode ver em tempo real:

- 📊 Quantas pessoas escanearam hoje/semana/mês
- 💰 Total de gorjetas enviadas para os artistas
- ⭐ Avaliação média dos shows no local
- 🎤 Artistas mais populares
- ⏰ Horários de pico de acesso
- 📈 Comparativo mês a mês

---

# Considerações de Segurança

<div class="success">

### Segurança em Múltiplas Camadas

✅ **HTTPS obrigatório** — Todas as conexões são criptografadas

✅ **Tokens JWT** — Autenticação stateless e segura

✅ **Rate limiting** — Proteção contra ataques de força bruta

✅ **Validação de entrada** — Sanitização de todos os dados

✅ **PIX via instituição autorizada** — Mercado Pago (licenciado pelo Bacen)

✅ **Sem armazenamento de cartão** — Dados bancários não ficam conosco

✅ **Logs de auditoria** — Todas as transações são registradas

✅ **Conformidade LGPD** — Política de privacidade e consentimento

</div>

---

# Roadmap Tecnológico

## Próximas Implementações

| Versão | Feature | Previsão |
|--------|---------|----------|
| **v1.1** | Notificações push para artistas | Q1 2026 |
| **v1.2** | Integração com Spotify (setlist) | Q1 2026 |
| **v1.3** | Pedido de músicas pelo público | Q2 2026 |
| **v2.0** | App nativo iOS/Android | Q2 2026 |
| **v2.1** | Live streaming integrado | Q3 2026 |
| **v2.2** | Realidade aumentada no QR | Q4 2026 |

---

# Suporte Técnico

<div class="cta-footer">

## 🔧 Problemas com QR Code?

**Estabelecimento:** Acesse o painel e baixe novos QR Codes

**Material danificado:** Solicite reimpressão gratuita

**QR não funciona:** Verifique conexão de internet

**Dúvidas técnicas:** tech@eventosfsa.com.br

---

**Documentação completa:** docs.eventosfsa.com.br

**Status do sistema:** status.eventosfsa.com.br

</div>
