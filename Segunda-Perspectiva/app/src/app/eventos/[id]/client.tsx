'use client'

import { useState } from 'react'
import { 
  MapPin, Clock, Calendar, Music, ArrowLeft, Share2, 
  Heart, Mic2, Users, Star, DollarSign, Navigation
} from 'lucide-react'
import Link from 'next/link'
import { Header, BottomNav, Footer } from '@/components/layout'
import { TipModal } from '@/components/ui'
import { RevealOnScroll } from '@/components/animations'
import { useToast } from '@/components/toast'
import { formatCurrency } from '@/lib/utils'

// Mock data
const eventsData: Record<string, {
  id: string
  title: string
  artist: { id: string; name: string; style: string; rating: number }
  venue: { id: string; name: string; neighborhood: string; address: string }
  date: string
  time: string
  endTime: string
  style: string
  description: string
  isLive?: boolean
  setlist: string[]
  interestedCount: number
}> = {
  '1': {
    id: '1',
    title: 'Noite de MPB',
    artist: { id: '1', name: 'Canindé', style: 'MPB', rating: 4.9 },
    venue: { id: '1', name: 'Cidade da Cultura', neighborhood: 'Mangabeira', address: 'Rua Castro Alves, 123 - Mangabeira' },
    date: '30/11/2024',
    time: '20h',
    endTime: '23h',
    style: 'MPB',
    description: 'Uma noite especial com o melhor da MPB. Canindé traz seu repertório clássico com músicas de Caetano, Gil, Djavan e muito mais.',
    isLive: true,
    setlist: ['Andar com Fé', 'Aquarela', 'Flor de Lis', 'Oceano', 'Evidências'],
    interestedCount: 45
  },
  '2': {
    id: '2',
    title: 'Sertanejo Universitário',
    artist: { id: '3', name: 'Victoria Alencar', style: 'Sertanejo', rating: 4.7 },
    venue: { id: '2', name: 'Seu Zé Lounge', neighborhood: 'Ponto Central', address: 'Av. Getúlio Vargas, 456 - Ponto Central' },
    date: '30/11/2024',
    time: '21h',
    endTime: '00h',
    style: 'Sertanejo',
    description: 'A revelação do sertanejo feirense em uma noite imperdível. Do clássico ao universitário, Victoria promete uma noite inesquecível.',
    setlist: ['Evidências', 'Medo Bobo', 'Atrasadinha', 'Largado às Traças'],
    interestedCount: 32
  },
  '3': {
    id: '3',
    title: 'Rock Night',
    artist: { id: '9', name: 'Cúpula Sessions', style: 'Rock', rating: 4.6 },
    venue: { id: '3', name: 'Cúpula do Som', neighborhood: 'Centro', address: 'Praça da Bandeira, 789 - Centro' },
    date: '01/12/2024',
    time: '22h',
    endTime: '02h',
    style: 'Rock',
    description: 'Noite de rock clássico e nacional. A Cúpula Sessions traz os maiores hits do rock brasileiro e internacional.',
    setlist: ['Smells Like Teen Spirit', 'Que País É Este', 'Tempo Perdido', 'Sweet Child O Mine'],
    interestedCount: 67
  },
}

const defaultEvent = {
  id: '0',
  title: 'Evento',
  artist: { id: '0', name: 'Artista', style: 'Diversos', rating: 4.5 },
  venue: { id: '0', name: 'Local', neighborhood: 'Centro', address: 'Feira de Santana, BA' },
  date: '01/12/2024',
  time: '20h',
  endTime: '23h',
  style: 'Diversos',
  description: 'Um evento especial com música ao vivo em Feira de Santana.',
  setlist: [],
  interestedCount: 10
}

export default function EventoPage({ id }: { id: string }) {
  const event = eventsData[id] || { ...defaultEvent, id, title: `Evento ${id}` }
  
  const [isInterested, setIsInterested] = useState(false)
  const [tipModalOpen, setTipModalOpen] = useState(false)
  const { addToast } = useToast()

  const handleInterested = () => {
    setIsInterested(!isInterested)
    addToast({
      type: isInterested ? 'info' : 'success',
      title: isInterested ? 'Interesse removido' : '✨ Tenho interesse!',
      message: isInterested ? undefined : 'Você receberá notificações sobre este evento'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${event.title} - EventosFSA`,
        text: `Confira ${event.title} com ${event.artist.name}!`,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      addToast({ type: 'success', title: 'Link copiado!' })
    }
  }

  const handleDirections = () => {
    const query = encodeURIComponent(event.venue.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
  }

  const handleConfirmTip = (amount: number) => {
    setTipModalOpen(false)
    addToast({
      type: 'success',
      title: '🎉 Gorjeta enviada!',
      message: `${formatCurrency(amount)} para ${event.artist.name}. Obrigado pelo apoio!`
    })
  }

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-16 relative">
        <div className="h-72 bg-gradient-to-br from-red-600 via-purple-600 to-amber-500 relative">
          <div className="absolute inset-0 bg-black/40" />
          <Link 
            href="/eventos"
            className="absolute top-20 left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          {/* Live Badge */}
          {event.isLive && (
            <div className="absolute top-20 right-4 z-10 badge-live flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              AO VIVO AGORA
            </div>
          )}

          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
            <div className="container-custom">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full mb-3">
                {event.style}
              </span>
              <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <Mic2 className="w-4 h-4" />
                  {event.artist.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {event.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {event.time} - {event.endTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-4 border-b border-slate-200 dark:border-slate-700">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Users className="w-4 h-4" />
              <span>{event.interestedCount + (isInterested ? 1 : 0)} interessados</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleInterested}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  isInterested 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInterested ? 'fill-current' : ''}`} />
                {isInterested ? 'Interessado' : 'Interesse'}
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container-custom space-y-6">
          {/* Descrição */}
          <RevealOnScroll>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="font-bold text-lg mb-3">Sobre o Evento</h2>
              <p className="text-slate-600 dark:text-slate-400">{event.description}</p>
            </div>
          </RevealOnScroll>

          {/* Artista */}
          <RevealOnScroll>
            <Link href={`/artistas/${event.artist.id}`}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <h2 className="font-bold text-lg mb-4">Artista</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-amber-500 rounded-xl flex items-center justify-center">
                    <Mic2 className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{event.artist.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{event.artist.style}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{event.artist.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      setTipModalOpen(true)
                    }}
                    className="btn-primary"
                  >
                    <DollarSign className="w-5 h-5 mr-1" />
                    Gorjeta
                  </button>
                </div>
              </div>
            </Link>
          </RevealOnScroll>

          {/* Local */}
          <RevealOnScroll>
            <Link href={`/estabelecimentos/${event.venue.id}`}>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
                <h2 className="font-bold text-lg mb-4">Local</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{event.venue.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{event.venue.neighborhood}</p>
                    <p className="text-xs text-slate-400 mt-1">{event.venue.address}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleDirections()
                    }}
                    className="btn-secondary"
                  >
                    <Navigation className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          </RevealOnScroll>

          {/* Setlist */}
          {event.setlist.length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5 text-red-600" />
                  Setlist Provável
                </h2>
                <div className="space-y-2">
                  {event.setlist.map((song, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <span className="w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-xs font-bold text-red-600">
                        {index + 1}
                      </span>
                      <span>{song}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <Footer />
      <BottomNav />

      {/* Tip Modal */}
      <TipModal
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        artistName={event.artist.name}
        onConfirm={handleConfirmTip}
      />
    </div>
  )
}
