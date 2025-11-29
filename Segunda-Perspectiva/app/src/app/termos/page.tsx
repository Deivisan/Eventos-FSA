'use client'

import { motion } from 'framer-motion'
import { Shield, Scale, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { FadeIn, RevealOnScroll } from '@/components/animations'

const sections = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: '1. Aceitação dos Termos',
    content: `Ao acessar e usar a plataforma EventosFSA, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.`
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '2. Uso da Plataforma',
    content: `A plataforma EventosFSA é destinada a conectar artistas, estabelecimentos e público interessado em eventos de música ao vivo em Feira de Santana e região. Os usuários concordam em:

• Fornecer informações verdadeiras e atualizadas
• Não usar a plataforma para fins ilegais
• Respeitar os direitos de outros usuários
• Não enviar spam ou conteúdo malicioso`
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: '3. Responsabilidades',
    content: `EventosFSA atua como intermediário entre artistas e estabelecimentos. Não somos responsáveis por:

• Qualidade das apresentações artísticas
• Pagamentos diretos entre partes
• Conflitos entre usuários
• Veracidade das informações fornecidas por terceiros

Cada usuário é responsável por suas ações e acordos feitos através da plataforma.`
  },
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: '4. Gorjetas e Pagamentos',
    content: `O sistema de gorjetas via PIX funciona da seguinte forma:

• 100% do valor vai para o artista
• A plataforma não cobra taxas sobre gorjetas
• Transações são feitas diretamente entre usuário e artista
• EventosFSA não se responsabiliza por estornos ou disputas de pagamento`
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: '5. Cadastro e Conta',
    content: `Ao criar uma conta, você concorda em:

• Manter suas credenciais seguras
• Notificar imediatamente sobre uso não autorizado
• Manter informações de perfil atualizadas
• Não compartilhar acesso com terceiros

Reservamo-nos o direito de suspender ou encerrar contas que violem estes termos.`
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: '6. Propriedade Intelectual',
    content: `Todo o conteúdo da plataforma, incluindo logos, design, textos e funcionalidades, é propriedade do EventosFSA. O conteúdo enviado por usuários (fotos, vídeos, descrições) permanece de propriedade do usuário, mas concede ao EventosFSA licença para exibição na plataforma.`
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: '7. Modificações',
    content: `Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas por email ou notificação no app. O uso continuado após as alterações constitui aceitação dos novos termos.`
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: '8. Lei Aplicável',
    content: `Estes termos são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da comarca de Feira de Santana, Bahia, Brasil.`
  },
]

export default function TermosPage() {
  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h1 className="heading-1 mb-4">Termos de Uso</h1>
              <p className="text-lg text-white/80">
                Última atualização: Novembro 2024
              </p>
            </div>
          </FadeIn>
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
                    <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center text-red-600 shrink-0">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                      <div className="prose prose-slate dark:prose-invert max-w-none">
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
              <h3 className="text-xl font-bold mb-4">Dúvidas sobre os Termos?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Se você tiver qualquer dúvida sobre estes Termos de Uso, entre em contato conosco.
              </p>
              <a 
                href="mailto:contato@eventosfsa.com.br" 
                className="btn-primary"
              >
                Entrar em Contato
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
