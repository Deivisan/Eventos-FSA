'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mic2, 
  Calendar, 
  MapPin, 
  Star, 
  ArrowRight, 
  Play,
  Users,
  Music,
  Sparkles,
  TrendingUp,
  Heart
} from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { EventCard, ArtistCard, VenueCard, FilterChips, TipModal } from '@/components/ui'
import { FadeIn, StaggerContainer, StaggerItem, AnimatedBackground, RevealOnScroll, Float } from '@/components/animations'
import { useState } from 'react'
import { useToast } from '@/components/toast'
import { formatCurrency } from '@/lib/utils'

// Mock Data
const featuredEvents = [
  { id: '1', title: 'Noite de MPB', artist: 'Canindé', venue: 'Cidade da Cultura', neighborhood: 'Mangabeira', date: '30/11', time: '20h', style: 'MPB', isLive: true },
  { id: '2', title: 'Sertanejo Universitário', artist: 'Banda Mesa de Bar', venue: 'Seu Zé Lounge', neighborhood: 'Ponto Central', date: '30/11', time: '21h', style: 'Sertanejo' },
  { id: '3', title: 'Rock Night', artist: 'Cúpula Sessions', venue: 'Cúpula do Som', neighborhood: 'Centro', date: '01/12', time: '22h', style: 'Rock' },
]

const topArtists = [
  { id: '1', name: 'Canindé', style: 'MPB', rating: 4.9, totalShows: 156, ranking: 1 },
  { id: '2', name: 'Oz Pretus', style: 'Regional', rating: 4.8, totalShows: 98, ranking: 2 },
  { id: '3', name: 'Victoria Alencar', style: 'Sertanejo', rating: 4.7, totalShows: 67, ranking: 3 },
  { id: '4', name: 'Fábio Fanal', style: 'Voz e Violão', rating: 4.6, totalShows: 203 },
]

const liveNowVenues = [
  { id: '1', name: 'Cidade da Cultura', type: 'Bar Cultural', neighborhood: 'Mangabeira', rating: 4.8, isLive: true, currentArtist: 'Canindé' },
  { id: '2', name: 'Aragas Bar', type: 'Bar e Petiscaria', neighborhood: 'Fraga Maia', rating: 4.6, isLive: true, currentArtist: 'Duo Sertanejo' },
  { id: '3', name: 'Casa Parrilla', type: 'Restaurante', neighborhood: 'Cidade Nova', rating: 4.7, isLive: true, currentArtist: 'Voz e Violão' },
]

const stats = [
  { icon: <Mic2 className="w-6 h-6" />, value: '500+', label: 'Artistas' },
  { icon: <MapPin className="w-6 h-6" />, value: '150+', label: 'Estabelecimentos' },
  { icon: <Calendar className="w-6 h-6" />, value: '2.000+', label: 'Eventos/mês' },
  { icon: <Users className="w-6 h-6" />, value: '50.000+', label: 'Usuários' },
]

export default function Home() {
  const [selectedStyle, setSelectedStyle] = useState('Todos')
  const [tipModalOpen, setTipModalOpen] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState<{ id: string; name: string } | null>(null)
  const { addToast } = useToast()

  const handleTip = (artistId: string) => {
    const artist = topArtists.find(a => a.id === artistId)
    if (artist) {
      setSelectedArtist({ id: artist.id, name: artist.name })
      setTipModalOpen(true)
    }
  }

  const handleConfirmTip = (amount: number) => {
    setTipModalOpen(false)
    addToast({
      type: 'success',
      title: '🎉 Gorjeta enviada!',
      message: `${formatCurrency(amount)} para ${selectedArtist?.name}. Obrigado pelo apoio!`
    })
    setSelectedArtist(null)
  }
  const styles = ['Todos', 'MPB', 'Sertanejo', 'Forró', 'Rock', 'Pagode']
  
  return (
    <div className="page-container">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <AnimatedBackground />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">A maior plataforma de eventos de Feira de Santana</span>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 className="heading-1 mb-6">
                Descubra a{' '}
                <span className="gradient-text">música ao vivo</span>
                <br />
                que pulsa na cidade
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                Conectamos artistas talentosos, bares incríveis e você. 
                Encontre eventos, apoie artistas e viva experiências únicas.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/eventos" className="btn-primary text-lg px-8 py-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Eventos
                </Link>
                <Link href="/cadastro" className="btn-secondary text-lg px-8 py-4">
                  Cadastre-se Grátis
                </Link>
              </div>
            </FadeIn>
            
            {/* Stats */}
            <FadeIn delay={0.5}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 mb-3">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold mb-1">{stat.value}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center pt-2">
            <motion.div
              className="w-1.5 h-3 bg-slate-400 rounded-full"
              animate={{ opacity: [1, 0], y: [0, 6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Live Now Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-4 h-4 bg-white rounded-full" />
                <div className="absolute inset-0 w-4 h-4 bg-white rounded-full animate-ping" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Ao Vivo Agora
              </h2>
            </div>
            <Link 
              href="/ao-vivo"
              className="text-white/80 hover:text-white flex items-center gap-1 transition-colors"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liveNowVenues.map((venue, index) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <VenueCard {...venue} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container-custom">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-2 mb-2">Eventos em Destaque</h2>
                <p className="text-slate-500 dark:text-slate-400">
                  Os melhores shows desta semana
                </p>
              </div>
              <Link 
                href="/eventos"
                className="btn-ghost hidden sm:flex"
              >
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <FilterChips 
              options={styles} 
              selected={selectedStyle} 
              onChange={setSelectedStyle} 
            />
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {featuredEvents.map((event, index) => (
              <RevealOnScroll key={event.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard {...event} />
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
          
          <div className="text-center mt-8 sm:hidden">
            <Link href="/eventos" className="btn-primary">
              Ver todos os eventos
            </Link>
          </div>
        </div>
      </section>

      {/* Top Artists */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container-custom">
          <RevealOnScroll>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span className="text-red-600 font-medium">Ranking</span>
                </div>
                <h2 className="heading-2">Artistas em Alta</h2>
              </div>
              <Link 
                href="/artistas"
                className="btn-ghost hidden sm:flex"
              >
                Ver todos <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </RevealOnScroll>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {topArtists.map((artist, index) => (
              <RevealOnScroll key={artist.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ArtistCard {...artist} onTip={() => handleTip(artist.id)} />
                </motion.div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* For Artists */}
              <RevealOnScroll>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card-base p-8 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                    <Mic2 className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="heading-3 mb-3">Sou Artista</h3>
                  <p className="paragraph mb-6">
                    Receba propostas de shows, gorjetas via PIX e construa sua reputação 
                    na maior plataforma de eventos de Feira de Santana.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Cadastro gratuito
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      100% das gorjetas para você
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      Ranking por estilo musical
                    </li>
                  </ul>
                  
                  <Link href="/cadastro?tipo=artista" className="btn-primary w-full justify-center group-hover:shadow-xl group-hover:shadow-red-500/20 transition-shadow">
                    Cadastrar como Artista
                  </Link>
                </motion.div>
              </RevealOnScroll>
              
              {/* For Venues */}
              <RevealOnScroll>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="card-base p-8 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full" />
                  
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mb-6">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="heading-3 mb-3">Sou Bar/Restaurante</h3>
                  <p className="paragraph mb-6">
                    Contrate os melhores artistas, divulgue seus eventos e 
                    atraia mais clientes para o seu estabelecimento.
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      Divulgação gratuita
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      Taxa de apenas 5% sobre cachês
                    </li>
                    <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                      QR Code para engajamento
                    </li>
                  </ul>
                  
                  <Link href="/cadastro?tipo=estabelecimento" className="btn-secondary w-full justify-center border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20">
                    Cadastrar Estabelecimento
                  </Link>
                </motion.div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Social Proof */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container-custom text-center">
          <RevealOnScroll>
            <h2 className="heading-2 mb-4">
              Alavancar os eventos de{' '}
              <span className="text-red-500">Feira de Santana</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12">
              Nossa missão é conectar talentos locais com estabelecimentos e criar 
              uma cultura de música ao vivo mais forte na cidade.
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="flex justify-center gap-8 flex-wrap">
              <Float>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span>Feito com ❤️ em FSA</span>
                </div>
              </Float>
              <Float>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span>4.9 de avaliação média</span>
                </div>
              </Float>
              <Float>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                  <Music className="w-5 h-5 text-purple-500" />
                  <span>+50 shows por semana</span>
                </div>
              </Float>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <Footer />
      <BottomNav />

      {/* Tip Modal */}
      <TipModal
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        artistName={selectedArtist?.name || ''}
        onConfirm={handleConfirmTip}
      />
    </div>
  )
}
