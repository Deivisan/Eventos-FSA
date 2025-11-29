<style>
@page { size: A4; margin: 2cm; }
body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.8; color: #1a1a2e; }
h1 { color: #DC2626; border-bottom: 3px solid #DC2626; padding-bottom: 10px; }
h2 { color: #16213e; margin-top: 30px; }
h3 { color: #0f3460; }
.highlight { background: #FEF3C7; padding: 15px; border-radius: 8px; border-left: 4px solid #F59E0B; margin: 20px 0; }
.success { background: #D1FAE5; padding: 15px; border-radius: 8px; border-left: 4px solid #10B981; margin: 20px 0; }
.info { background: #DBEAFE; padding: 15px; border-radius: 8px; border-left: 4px solid #3B82F6; margin: 20px 0; }
.tech { background: #1a1a2e; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; font-family: monospace; }
table { width: 100%; border-collapse: collapse; margin: 20px 0; }
th, td { border: 1px solid #E5E7EB; padding: 12px; text-align: left; }
th { background: #DC2626; color: white; }
tr:nth-child(even) { background: #F9FAFB; }
.cover { text-align: center; padding: 100px 0; page-break-after: always; }
.cover h1 { font-size: 3em; border: none; }
.diagram { background: #F3F4F6; padding: 30px; border-radius: 12px; margin: 20px 0; text-align: center; }
.flow-box { display: inline-block; background: white; padding: 15px 20px; border-radius: 8px; margin: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.arrow { font-size: 24px; color: #DC2626; }
</style>

<div class="cover">

# 📱 EventosFSA

## Infraestrutura QR Code

### Documentação técnica do sistema de acesso via QR Code nos estabelecimentos

---

**Versão 1.0 | Novembro 2025**

*Para entendimento do modelo de operação*

</div>

# Visão Geral da Infraestrutura

O sistema de **QR Code** é o diferencial tecnológico do EventosFSA. Ele permite que clientes nos estabelecimentos acessem a plataforma de forma natural e integrada.

<div class="info">

📱 **Conceito:** Cliente escaneia → Acessa portal → Vê artista → Envia gorjeta → Avalia

</div>

---

# Arquitetura do Sistema

## Fluxo Completo

<div class="diagram">

<div class="flow-box">👤 Cliente<br>no bar</div>
<span class="arrow">→</span>
<div class="flow-box">📱 Escaneia<br>QR Code</div>
<span class="arrow">→</span>
<div class="flow-box">🌐 Wi-Fi<br>do local</div>
<span class="arrow">→</span>
<div class="flow-box">🎤 Portal<br>do artista</div>
<span class="arrow">→</span>
<div class="flow-box">💝 Envia<br>gorjeta</div>

</div>

## Componentes

| Componente | Descrição |
|------------|-----------|
| **QR Code físico** | Adesivo/display nas mesas e balcão |
| **Wi-Fi local** | Rede do estabelecimento |
| **Portal mobile** | Página otimizada para celular |
| **Sistema PIX** | Integração para gorjetas |
| **Backend** | Servidor que processa tudo |

---

# O QR Code

## O que contém?

Cada QR Code é **único por evento** e contém:

<div class="tech">

URL: https://eventosfsa.com.br/portal/{estabelecimento_id}/{evento_id}

Exemplo: https://eventosfsa.com.br/portal/bar-do-ze/2025-11-28

</div>

## Tipos de QR Code

### 1. QR Code do Evento (Temporário)

- Gerado para cada show
- Expira após o evento
- Mostra o artista que está tocando AGORA
- Ideal para mesas

### 2. QR Code do Estabelecimento (Permanente)

- Fixo para o local
- Sempre mostra a agenda de eventos
- Quando tem show, direciona para o artista
- Ideal para porta/vitrine

## Materiais de Impressão

Para cada estabelecimento parceiro, fornecemos:

| Material | Quantidade | Onde usar |
|----------|------------|-----------|
| Display de mesa (10x10cm) | 10 unidades | Cada mesa |
| Adesivo porta (A4) | 2 unidades | Entrada |
| Cartaz interno (A3) | 3 unidades | Paredes |
| Flyer (10x15cm) | 50 unidades | Distribuir |

---

# O Portal Mobile

## Tela Principal

Quando o cliente escaneia, ele vê:

### Cabeçalho
- Logo do estabelecimento
- Nome e endereço
- Badge "AO VIVO" piscando

### Seção do Artista
- Foto grande do artista
- Nome e estilo musical
- Avaliação (estrelas)
- **Botão gigante "ENVIAR GORJETA"**

### Valores Rápidos
- R$ 10, R$ 20, R$ 50, R$ 100
- Campo para valor personalizado

### Informações Adicionais
- Setlist (músicas que estão tocando)
- Próximos eventos do local
- Sobre o estabelecimento

### Rodapé
- "Powered by EventosFSA"
- Link para o site principal

---

# Sistema de Gorjetas via PIX

## Como funciona tecnicamente?

<div class="diagram">

<div class="flow-box">1. Cliente<br>escolhe valor</div>
<span class="arrow">→</span>
<div class="flow-box">2. Sistema gera<br>QR Code PIX</div>
<span class="arrow">→</span>
<div class="flow-box">3. Cliente<br>paga no app banco</div>
<span class="arrow">→</span>
<div class="flow-box">4. Confirmação<br>instantânea</div>
<span class="arrow">→</span>
<div class="flow-box">5. Artista<br>recebe 100%</div>

</div>

## Integração PIX

| Aspecto | Implementação |
|---------|---------------|
| **Geração do QR** | API Mercado Pago / Stripe |
| **Chave PIX** | Cadastrada pelo artista |
| **Confirmação** | Webhook em tempo real |
| **Recibo** | Enviado por e-mail |

## Segurança

<div class="success">

✅ O dinheiro vai **direto** para a chave PIX do artista
✅ A plataforma **não retém** valores de gorjeta
✅ Transação segura via **instituição financeira**
✅ Registro completo para **transparência**

</div>

---

# Implementação nos Estabelecimentos

## Passo a Passo

### 1. Configuração Inicial (Feita uma vez)

1. Estabelecimento se cadastra na plataforma
2. Equipe EventosFSA aprova o cadastro
3. QR Codes são gerados e enviados
4. Materiais são impressos e entregues

### 2. Para Cada Evento

1. Estabelecimento confirma o evento com artista
2. Sistema gera QR Code específico
3. Portal é atualizado automaticamente
4. No dia, cliente escaneia e interage

### 3. Manutenção

- QR Codes permanentes não precisam trocar
- Materiais danificados podem ser reimpressos
- Atualizações de software são automáticas

---

# Requisitos Técnicos

## Para o Estabelecimento

| Requisito | Especificação |
|-----------|---------------|
| **Internet** | Banda larga estável |
| **Wi-Fi** | Rede para clientes |
| **QR Codes** | Fornecidos pela plataforma |

<div class="highlight">

💡 **Nota:** O cliente pode usar dados móveis (4G/5G) se preferir. O Wi-Fi não é obrigatório, apenas recomendado.

</div>

## Para o Cliente

| Requisito | Especificação |
|-----------|---------------|
| **Celular** | Qualquer smartphone |
| **Câmera** | Para escanear QR Code |
| **App banco** | Para pagar via PIX |

---

# Fluxo de Dados

<div class="tech">

EVENTO CRIADO
     ↓
Sistema gera URL única
     ↓
QR Code é criado (PNG/SVG)
     ↓
Disponível no painel do estabelecimento
     ↓
Estabelecimento imprime/exibe
     ↓
Cliente escaneia
     ↓
Servidor identifica evento ativo
     ↓
Portal carrega com dados do artista
     ↓
Cliente pode interagir (gorjeta/avaliação)
     ↓
Ações são registradas no banco de dados
     ↓
Artista recebe notificação em tempo real

</div>

---

# Cenários de Uso

## Cenário 1: Show Normal

1. Cliente chega no bar às 20h
2. Pede bebida, senta na mesa
3. Vê o display com QR Code
4. Escaneia por curiosidade
5. Vê o artista Weslei Ribeiro tocando
6. Gosta do show, envia R$ 20 de gorjeta
7. No fim, avalia com 5 estrelas

## Cenário 2: Descoberta

1. Cliente escaneia o QR Code
2. Vê a agenda de próximos eventos
3. Descobre que terá forró no sábado
4. Salva o evento nos favoritos
5. Volta no sábado com os amigos

## Cenário 3: Fidelização

1. Cliente frequente sempre escaneia
2. Conhece todos os artistas do local
3. Segue seus favoritos na plataforma
4. Recebe notificação quando vão tocar
5. Nunca perde um show

---

# Métricas e Analytics

## O que podemos medir?

| Métrica | Utilidade |
|---------|-----------|
| **Escaneamentos** | Engajamento do público |
| **Tempo na página** | Interesse no artista |
| **Gorjetas enviadas** | Monetização |
| **Avaliações** | Qualidade dos shows |
| **Retorno de usuários** | Fidelização |

## Dashboard para Estabelecimentos

O dono do bar pode ver:
- Quantas pessoas escanearam
- Total de gorjetas do mês
- Artistas mais bem avaliados
- Horários de pico de acesso

---

# Considerações de Segurança

<div class="success">

✅ **HTTPS** em todas as conexões
✅ **Dados sensíveis** criptografados
✅ **PIX** processado por instituição autorizada
✅ **Sem armazenamento** de dados bancários
✅ **LGPD** em conformidade

</div>

---

# Próximos Desenvolvimentos

## Roadmap Tecnológico

| Fase | Funcionalidade |
|------|----------------|
| **v1.1** | Notificações push |
| **v1.2** | Integração com Spotify |
| **v1.3** | Pedido de músicas |
| **v2.0** | App nativo (iOS/Android) |
| **v2.1** | Realidade aumentada no QR |

---

<div style="text-align: center; margin-top: 50px; padding: 30px; background: #1a1a2e; color: white; border-radius: 12px;">

## 🔧 Suporte Técnico

Para dúvidas sobre implementação:

**E-mail:** tech@eventosfsa.com.br

**Documentação:** docs.eventosfsa.com.br

</div>
