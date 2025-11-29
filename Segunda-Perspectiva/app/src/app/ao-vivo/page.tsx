'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Radio, MapPin, Music, 
  Clock, Users, Star, ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Header, BottomNav, Footer } from '@/components/layout'
import { FadeIn, RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/animations'
import { useToast } from '@/components/toast'

// Mock data - Shows ao vivo
const liveNow = [
  { 
    id: '1', 
    venue: { id: '1', name: 'Cidade da Cultura', type: 'Bar Cultural', neighborhood: 'Mangabeira' },
    artist: { id: '1', name: 'Canindé', style: 'MPB' },
    startedAt: '20:00',
    viewers: 45,
    rating: 4.8
  },
  { 
    id: '2', 
    venue: { id: '2', name: 'Aragas Bar', type: 'Bar e Petiscaria', neighborhood: 'Fraga Maia' },
    artist: { id: '5', name: 'Duo Sertanejo', style: 'Sertanejo' },
    startedAt: '21:00',
    viewers: 28,
    rating: 4.6
  },
  { 
    id: '3', 
    venue: { id: '3', name: 'Casa Parrilla', type: 'Restaurante', neighborhood: 'Cidade Nova' },
    artist: { id: '4', name: 'Fábio Fanal', style: 'Voz e Violão' },
    startedAt: '19:30',
    viewers: 62,
    rating: 4.7
  },
]

// Próximos a começar
const upcoming = [
  { venue: 'Seu Zé Lounge', artist: 'Victoria Alencar', time: '22:00', neighborhood: 'Ponto Central' },
  { venue: 'Cúpula do Som', artist: 'Cúpula Sessions', time: '22:30', neighborhood: 'Centro' },
]

export default function AoVivoPage() {
  const [currentTime, setCurrentTime] = useState('')
  const { addToast } = useToast()

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNotify = (venue: string) => {
    addToast({
      type: 'success',
      title: '🔔 Notificação ativada!',
      message: `Você será avisado quando começar em ${venue}`
    })
  }

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-red-600 via-purple-600 to-amber-500 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="container-custom relative z-10">
          <FadeIn>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Radio className="w-5 h-5 animate-pulse" />
                <span className="font-medium">{liveNow.length} locais ao vivo agora</span>
                <span className="text-white/80">• {currentTime}</span>
              </div>
              <h1 className="heading-1 mb-4">Ao Vivo Agora</h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Descubra onde está rolando música ao vivo neste momento em Feira de Santana
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Live Now */}
      <section className="py-12">
        <div className="container-custom">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
              <h2 className="heading-3">Acontecendo Agora</h2>
            </div>
          </RevealOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveNow.map((show) => (
              <StaggerItem key={show.id}>
                <Link href={`/portal/${show.venue.id}`}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-700 group"
                  >
                    {/* Header com Live Badge */}
                    <div className="relative h-40 bg-gradient-to-br from-red-600 to-purple-600 p-4">
                      <div className="absolute top-4 left-4 badge-live flex items-center gap-2">
                        <div className="music-bars">
                          <span></span><span></span><span></span><span></span>
                        </div>
                        AO VIVO
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white/80 text-sm">{show.venue.type}</p>
                        <h3 className="text-xl font-bold text-white">{show.venue.name}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {/* Artist */}
                      <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-amber-500 rounded-lg flex items-center justify-center">
                          <Music className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{show.artist.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">{show.artist.style}</p>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {show.venue.neighborhood}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {show.viewers}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          {show.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <RevealOnScroll>
            <div className="flex items-center gap-3 mb-8">
              <Clock className="w-6 h-6 text-amber-600" />
              <h2 className="heading-3">Próximos a Começar</h2>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-4">
            {upcoming.map((show, index) => (
              <RevealOnScroll key={index}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 flex items-center justify-between shadow-sm border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-semibold">{show.venue}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {show.artist} • {show.neighborhood}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-amber-600">{show.time}</p>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleNotify(show.venue)
                      }}
                      className="text-xs text-slate-500 hover:text-red-600 transition-colors"
                    >
                      🔔 Avisar
                    </button>
                  </div>
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Map CTA */}
      <section className="py-16">
        <div className="container-custom text-center">
          <RevealOnScroll>
            <div className="max-w-xl mx-auto">
              <MapPin className="w-16 h-16 text-red-600 mx-auto mb-6" />
              <h2 className="heading-2 mb-4">Veja no Mapa</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Encontre os shows mais próximos de você no mapa interativo.
              </p>
              <Link href="/estabelecimentos" className="btn-primary">
                Ver Mapa
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
      <BottomNav />

      {/* Styles for music bars */}
      <style jsx>{`
        .music-bars {
          display: flex;
          gap: 2px;
          height: 12px;
          align-items: flex-end;
        }
        .music-bars span {
          width: 3px;
          background: white;
          border-radius: 1px;
          animation: musicBar 1s ease-in-out infinite;
        }
        .music-bars span:nth-child(1) { animation-delay: 0s; }
        .music-bars span:nth-child(2) { animation-delay: 0.2s; }
        .music-bars span:nth-child(3) { animation-delay: 0.4s; }
        .music-bars span:nth-child(4) { animation-delay: 0.6s; }
        @keyframes musicBar {
          0%, 100% { height: 4px; }
          50% { height: 12px; }
        }
      `}</style>
    </div>
  )
}
