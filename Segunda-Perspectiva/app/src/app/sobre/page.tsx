'use client'

import { motion } from 'framer-motion'
import { Music, Heart, Shield, Sparkles, Users, MapPin, Mic2 } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { FadeIn, RevealOnScroll } from '@/components/animations'

const values = [
  {
    icon: <Heart className="w-8 h-8" />,
    title: 'Paixão pela Música',
    description: 'Nascemos do amor pela cena musical de Feira de Santana. Cada artista, cada show, cada nota conta.'
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: 'Transparência Total',
    description: 'Sem taxas escondidas. Gorjetas vão 100% para o artista. Preços claros desde o primeiro momento.'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Comunidade Unida',
    description: 'Conectamos artistas, bares e público numa comunidade que celebra o talento local.'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: 'Inovação Contínua',
    description: 'QR Code nas mesas, gorjetas via PIX, ranking de artistas. Sempre evoluindo.'
  },
]

const stats = [
  { value: '500+', label: 'Artistas Cadastrados' },
  { value: '150+', label: 'Estabelecimentos Parceiros' },
  { value: '50.000+', label: 'Usuários Ativos' },
  { value: '2.000+', label: 'Shows/Mês' },
]

const team = [
  { name: 'Deivison Santana', role: 'Fundador & CEO', description: 'Desenvolvedor full-stack apaixonado por música e tecnologia.' },
]

export default function SobrePage() {
  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-red-600 via-red-500 to-amber-500 text-white">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Music className="w-8 h-8" />
                <span className="text-xl font-bold">EventosFSA</span>
              </div>
              <h1 className="heading-1 mb-6">
                A Maior Plataforma de Música ao Vivo de Feira de Santana
              </h1>
              <p className="text-xl text-white/90">
                Conectando artistas, estabelecimentos e amantes da música desde 2024.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 -mt-8">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <RevealOnScroll key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center shadow-xl border border-slate-100 dark:border-slate-700"
                >
                  <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16">
        <div className="container-custom">
          <RevealOnScroll>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="heading-2 mb-6">Nossa História</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                O EventosFSA nasceu de uma frustração: como feirense, era difícil descobrir onde tinha música 
                ao vivo acontecendo na cidade. Instagram Stories que somem, grupos de WhatsApp desorganizados, 
                informação espalhada...
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Em paralelo, vimos artistas talentosos lutando para conseguir shows e bares sem saber onde 
                encontrar músicos de qualidade. Era um ecossistema desconectado.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Criamos o EventosFSA para ser a ponte que une todos: <strong className="text-red-600">artistas</strong> ganham 
                visibilidade e propostas, <strong className="text-red-600">estabelecimentos</strong> encontram talentos e 
                lotam a casa, e o <strong className="text-red-600">público</strong> nunca mais fica sem saber onde tem 
                música boa rolando.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <RevealOnScroll>
            <h2 className="heading-2 text-center mb-12">Nossos Valores</h2>
          </RevealOnScroll>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <RevealOnScroll key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe */}
      <section className="py-16">
        <div className="container-custom">
          <RevealOnScroll>
            <h2 className="heading-2 text-center mb-4">Quem Faz Acontecer</h2>
            <p className="text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
              Uma equipe apaixonada por música e tecnologia, trabalhando para transformar a cena musical de FSA.
            </p>
          </RevealOnScroll>
          
          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <RevealOnScroll key={index}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="text-center bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Mic2 className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{member.description}</p>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-amber-500 text-white">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="heading-2 mb-6">Faça Parte dessa Revolução</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Junte-se a centenas de artistas e estabelecimentos que já estão transformando a cena musical de Feira de Santana.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/cadastro?tipo=artista" className="btn-secondary bg-white text-red-600 hover:bg-white/90">
                <Mic2 className="w-5 h-5 mr-2" />
                Cadastrar como Artista
              </a>
              <a href="/cadastro?tipo=estabelecimento" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white/10">
                <MapPin className="w-5 h-5 mr-2" />
                Cadastrar Estabelecimento
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
