'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Trash2, Database, Bell, Users, HelpCircle } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { FadeIn, RevealOnScroll } from '@/components/animations'

const sections = [
  {
    icon: <Database className="w-6 h-6" />,
    title: '1. Dados que Coletamos',
    content: `Coletamos apenas os dados necessários para o funcionamento da plataforma:

**Dados de Cadastro:**
• Nome completo
• E-mail
• Telefone (opcional para artistas)
• CPF/CNPJ (para verificação de estabelecimentos)

**Dados de Uso:**
• Preferências de estilo musical
• Histórico de interações (favoritos, avaliações)
• Localização aproximada (apenas quando autorizado)

**Dados de Artistas:**
• Portfólio (fotos, vídeos)
• Biografia e repertório
• Agenda de shows
• Dados de pagamento para gorjetas (PIX)`
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: '2. Como Usamos seus Dados',
    content: `Utilizamos seus dados para:

• Fornecer e personalizar nossos serviços
• Conectar artistas com estabelecimentos
• Processar gorjetas e avaliações
• Enviar notificações relevantes (novos shows, mensagens)
• Melhorar a experiência do usuário
• Gerar estatísticas anônimas sobre a plataforma
• Prevenir fraudes e garantir segurança`
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: '3. Proteção dos Dados',
    content: `Implementamos medidas de segurança robustas:

• Criptografia SSL/TLS em todas as comunicações
• Senhas armazenadas com hash bcrypt
• Acesso restrito a dados sensíveis
• Monitoramento contínuo de segurança
• Backups regulares e seguros
• Conformidade com a LGPD (Lei Geral de Proteção de Dados)`
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: '4. Compartilhamento de Dados',
    content: `Seus dados podem ser compartilhados com:

• **Outros usuários:** Apenas informações públicas do perfil
• **Estabelecimentos:** Dados necessários para contratação de artistas
• **Processadores de pagamento:** Apenas para transações de gorjeta
• **Autoridades:** Quando legalmente exigido

**Nunca vendemos seus dados pessoais para terceiros.**`
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '5. Seus Direitos (LGPD)',
    content: `Conforme a Lei Geral de Proteção de Dados, você tem direito a:

• **Acesso:** Saber quais dados temos sobre você
• **Correção:** Atualizar dados incorretos
• **Exclusão:** Solicitar remoção de seus dados
• **Portabilidade:** Receber seus dados em formato estruturado
• **Revogação:** Cancelar consentimentos dados anteriormente
• **Oposição:** Contestar tratamento de dados

Para exercer esses direitos, entre em contato pelo e-mail: privacidade@eventosfsa.com.br`
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: '6. Cookies e Rastreamento',
    content: `Utilizamos cookies para:

• Manter você logado na plataforma
• Lembrar suas preferências
• Analisar uso do site (analytics)
• Personalizar experiência

Você pode desativar cookies nas configurações do navegador, mas algumas funcionalidades podem ser afetadas.`
  },
  {
    icon: <Trash2 className="w-6 h-6" />,
    title: '7. Retenção de Dados',
    content: `Mantemos seus dados enquanto sua conta estiver ativa. Após exclusão da conta:

• Dados pessoais são removidos em até 30 dias
• Avaliações e histórico podem ser mantidos anonimizados
• Dados legais são mantidos pelo período exigido por lei
• Backups são atualizados em até 90 dias`
  },
  {
    icon: <HelpCircle className="w-6 h-6" />,
    title: '8. Alterações na Política',
    content: `Esta política pode ser atualizada periodicamente. Alterações significativas serão comunicadas por:

• Notificação no aplicativo
• E-mail para usuários cadastrados
• Aviso na página inicial

Recomendamos revisar esta política regularmente.`
  },
]

export default function PrivacidadePage() {
  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h1 className="heading-1 mb-4">Política de Privacidade</h1>
              <p className="text-lg text-white/80">
                Última atualização: Novembro 2024
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 bg-green-50 dark:bg-green-900/10">
        <div className="container-custom max-w-4xl">
          <RevealOnScroll>
            <div className="text-center">
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Sua privacidade é fundamental para nós. Esta política explica como o EventosFSA 
                coleta, usa e protege suas informações pessoais em conformidade com a 
                <strong className="text-green-600"> Lei Geral de Proteção de Dados (LGPD)</strong>.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <RevealOnScroll key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                      <div className="prose prose-slate dark:prose-invert max-w-none prose-strong:text-green-600">
                        <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">{section.content}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Contact */}
          <RevealOnScroll>
            <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Encarregado de Proteção de Dados</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-2">
                Para questões sobre privacidade e seus dados, entre em contato:
              </p>
              <a 
                href="mailto:privacidade@eventosfsa.com.br" 
                className="text-green-600 font-semibold hover:underline"
              >
                privacidade@eventosfsa.com.br
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
