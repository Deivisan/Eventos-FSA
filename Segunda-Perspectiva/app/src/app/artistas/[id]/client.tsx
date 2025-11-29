'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Star, Calendar, Music, Heart, 
  Share2, DollarSign, ArrowLeft, Instagram,
  Youtube, Phone, Award
} from 'lucide-react'
import Link from 'next/link'
import { Header, BottomNav, Footer } from '@/components/layout'
import { TipModal } from '@/components/ui'
import { RevealOnScroll } from '@/components/animations'
import { useToast } from '@/components/toast'
import { formatCurrency } from '@/lib/utils'

// Mock data - em produção viria do banco
const artistsData: Record<string, {
  id: string
  name: string
  style: string
  bio: string
  rating: number
  totalShows: number
  totalTips: number
  followers: number
  imageUrl?: string
  genres: string[]
  nextShows: { venue: string; date: string; time: string }[]
  reviews: { author: string; rating: number; comment: string; date: string }[]
  social: { instagram?: string; youtube?: string; phone?: string; email?: string }
}> = {
  '1': {
    id: '1',
    name: 'Canindé',
    style: 'MPB',
    bio: 'Cantor e compositor feirense, especializado em MPB e música brasileira. Com mais de 15 anos de carreira, já se apresentou nos principais palcos da cidade.',
    rating: 4.9,
    totalShows: 156,
    totalTips: 2340,
    followers: 1250,
    genres: ['MPB', 'Bossa Nova', 'Samba'],
    nextShows: [
      { venue: 'Cidade da Cultura', date: '30/11', time: '20h' },
      { venue: 'Aragas Bar', date: '02/12', time: '21h' },
    ],
    reviews: [
      { author: 'Maria S.', rating: 5, comment: 'Show incrível! Melhor MPB de FSA!', date: '28/11' },
      { author: 'João P.', rating: 5, comment: 'Repertório perfeito, voz sensacional', date: '25/11' },
    ],
    social: { instagram: '@caninde.mpb', youtube: 'CanindeOficial', phone: '75 99999-1234' }
  },
  '2': {
    id: '2',
    name: 'Oz Pretus',
    style: 'Regional',
    bio: 'Grupo de música regional que mistura ritmos nordestinos com sonoridades contemporâneas. Formado em 2015, já tocou em diversos festivais da Bahia.',
    rating: 4.8,
    totalShows: 98,
    totalTips: 1560,
    followers: 890,
    genres: ['Forró', 'Xote', 'Baião'],
    nextShows: [
      { venue: 'Seu Zé Lounge', date: '01/12', time: '22h' },
    ],
    reviews: [
      { author: 'Carlos M.', rating: 5, comment: 'Autêntica música nordestina!', date: '27/11' },
    ],
    social: { instagram: '@ozpretus' }
  },
  '3': {
    id: '3',
    name: 'Victoria Alencar',
    style: 'Sertanejo',
    bio: 'Cantora sertaneja revelação de Feira de Santana. Voz potente e repertório que vai do clássico ao universitário.',
    rating: 4.7,
    totalShows: 67,
    totalTips: 980,
    followers: 2100,
    genres: ['Sertanejo', 'Sertanejo Universitário', 'Sofrência'],
    nextShows: [
      { venue: 'Casa Parrilla', date: '03/12', time: '20h' },
      { venue: 'Cúpula do Som', date: '07/12', time: '21h' },
    ],
    reviews: [
      { author: 'Ana C.', rating: 5, comment: 'Voz maravilhosa! Voltarei sempre!', date: '26/11' },
    ],
    social: { instagram: '@victoriaalencar', youtube: 'VictoriaAlencarOficial' }
  },
}

// Fallback para artistas não encontrados
const defaultArtist = {
  id: '0',
  name: 'Artista',
  style: 'Diversos',
  bio: 'Artista talentoso de Feira de Santana.',
  rating: 4.5,
  totalShows: 50,
  totalTips: 500,
  followers: 100,
  genres: ['Diversos'],
  nextShows: [],
  reviews: [],
  social: {}
}

export default function ArtistaPage({ id }: { id: string }) {
  const artist = artistsData[id] || { ...defaultArtist, id, name: `Artista ${id}` }
  
  const [isFavorite, setIsFavorite] = useState(false)
  const [tipModalOpen, setTipModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    addToast({
      type: isFavorite ? 'info' : 'success',
      title: isFavorite ? 'Removido dos favoritos' : '❤️ Adicionado aos favoritos!',
      message: isFavorite ? undefined : `Você receberá notificações de ${artist.name}`
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${artist.name} - EventosFSA`,
        text: `Confira ${artist.name} no EventosFSA!`,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      addToast({ type: 'success', title: 'Link copiado!' })
    }
  }

  const handleConfirmTip = (amount: number) => {
    setTipModalOpen(false)
    addToast({
      type: 'success',
      title: '🎉 Gorjeta enviada!',
      message: `${formatCurrency(amount)} para ${artist.name}. Obrigado pelo apoio!`
    })
  }

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero com Imagem */}
      <section className="pt-16 relative">
        <div className="h-64 bg-gradient-to-br from-red-600 via-purple-600 to-amber-500 relative">
          <div className="absolute inset-0 bg-black/30" />
          <Link 
            href="/artistas"
            className="absolute top-20 left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        
        {/* Avatar */}
        <div className="container-custom relative -mt-16 z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-800">
              <Music className="w-16 h-16 text-white" />
            </div>
            <div className="text-center sm:text-left flex-1 pb-2">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold">{artist.name}</h1>
                {artist.rating >= 4.8 && (
                  <Award className="w-6 h-6 text-amber-500" />
                )}
              </div>
              <p className="text-red-600 font-medium">{artist.style}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleFavorite}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  isFavorite 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-6 border-b border-slate-200 dark:border-slate-700">
        <div className="container-custom">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                {artist.rating.toFixed(1)}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Avaliação</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{artist.totalShows}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Shows</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{artist.totalTips}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Gorjetas</p>
            </div>
            <div>
              <div className="text-2xl font-bold">{artist.followers}</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Seguidores</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container-custom space-y-8">
          {/* Bio */}
          <RevealOnScroll>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="font-bold text-lg mb-3">Sobre</h2>
              <p className="text-slate-600 dark:text-slate-400">{artist.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {artist.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Próximos Shows */}
          {artist.nextShows.length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4">Próximos Shows</h2>
                <div className="space-y-3">
                  {artist.nextShows.map((show, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{show.venue}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {show.date} às {show.time}
                          </p>
                        </div>
                      </div>
                      <Link 
                        href={`/eventos/${index + 1}`}
                        className="btn-ghost text-sm"
                      >
                        Ver
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Avaliações */}
          {artist.reviews.length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4">Avaliações</h2>
                <div className="space-y-4">
                  {artist.reviews.map((review, index) => (
                    <div key={index} className="border-b border-slate-100 dark:border-slate-700 last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{review.author}</span>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">{review.comment}</p>
                      <p className="text-xs text-slate-400 mt-1">{review.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Contato */}
          {Object.keys(artist.social).length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4">Contato</h2>
                <div className="flex flex-wrap gap-3">
                  {artist.social.instagram && (
                    <a href={`https://instagram.com/${artist.social.instagram.replace('@', '')}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
                      <Instagram className="w-5 h-5" />
                      {artist.social.instagram}
                    </a>
                  )}
                  {artist.social.youtube && (
                    <a href={`https://youtube.com/${artist.social.youtube}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl">
                      <Youtube className="w-5 h-5" />
                      YouTube
                    </a>
                  )}
                  {artist.social.phone && (
                    <a href={`tel:${artist.social.phone}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl">
                      <Phone className="w-5 h-5" />
                      {artist.social.phone}
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      {/* Fixed Action Button */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 right-4 z-40">
        <div className="container-custom max-w-lg mx-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setTipModalOpen(true)}
            className="w-full btn-primary py-4 text-lg shadow-xl shadow-red-500/30"
          >
            <DollarSign className="w-6 h-6 mr-2" />
            Enviar Gorjeta
          </motion.button>
        </div>
      </div>

      <Footer />
      <BottomNav />

      {/* Tip Modal */}
      <TipModal
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        artistName={artist.name}
        onConfirm={handleConfirmTip}
      />
    </div>
  )
}
