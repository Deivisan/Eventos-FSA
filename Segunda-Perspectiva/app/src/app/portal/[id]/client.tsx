'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic2, Music, Star, DollarSign, Heart, 
  Calendar, Clock, QrCode, Volume2,
  ThumbsUp, Share2
} from 'lucide-react'
import Link from 'next/link'
import { TipModal } from '@/components/ui'
import { FadeIn } from '@/components/animations'
import { useToast } from '@/components/toast'
import { formatCurrency } from '@/lib/utils'

// Mock data - Portal de um estabelecimento específico
const portalsData: Record<string, {
  id: string
  venue: { name: string; type: string }
  currentArtist?: { id: string; name: string; style: string; rating: number; bio: string }
  isLive: boolean
  currentSong?: string
  upcomingSongs: string[]
  upcomingEvents: { artist: string; date: string; time: string }[]
}> = {
  '1': {
    id: '1',
    venue: { name: 'Cidade da Cultura', type: 'Bar Cultural' },
    currentArtist: { id: '1', name: 'Canindé', style: 'MPB', rating: 4.9, bio: 'Cantor e compositor feirense, especializado em MPB.' },
    isLive: true,
    currentSong: 'Andar com Fé - Gilberto Gil',
    upcomingSongs: ['Aquarela - Toquinho', 'Flor de Lis - Djavan', 'Oceano - Djavan'],
    upcomingEvents: [
      { artist: 'Cúpula Sessions', date: '01/12', time: '21h' },
      { artist: 'Victoria Alencar', date: '07/12', time: '20h' },
    ]
  },
  '2': {
    id: '2',
    venue: { name: 'Aragas Bar', type: 'Bar e Petiscaria' },
    currentArtist: { id: '5', name: 'Duo Sertanejo', style: 'Sertanejo', rating: 4.5, bio: 'Duo de voz e violão especializado em sertanejo.' },
    isLive: true,
    currentSong: 'Evidências - Chitãozinho & Xororó',
    upcomingSongs: ['Amor Perfeito', 'Pense em Mim'],
    upcomingEvents: []
  },
}

const defaultPortal = {
  id: '0',
  venue: { name: 'Estabelecimento', type: 'Bar' },
  isLive: false,
  upcomingSongs: [],
  upcomingEvents: []
}

export default function PortalPage({ id }: { id: string }) {
  const portal = portalsData[id] || defaultPortal
  
  const [tipModalOpen, setTipModalOpen] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const { addToast } = useToast()

  const handleVote = (song: string) => {
    if (hasVoted) {
      addToast({ type: 'warning', title: 'Você já votou!', message: 'Aguarde a próxima música para votar novamente.' })
      return
    }
    setHasVoted(true)
    addToast({ type: 'success', title: '🎵 Voto registrado!', message: `Pedido: ${song}` })
  }

  const handleConfirmTip = (amount: number) => {
    setTipModalOpen(false)
    addToast({
      type: 'success',
      title: '🎉 Gorjeta enviada!',
      message: `${formatCurrency(amount)} para ${portal.currentArtist?.name}. Obrigado pelo apoio!`
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${portal.venue.name} - Ao Vivo`,
        text: `Confira quem está tocando no ${portal.venue.name}!`,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      addToast({ type: 'success', title: 'Link copiado!' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header com Logo */}
      <header className="p-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <span className="font-bold text-sm">E</span>
          </div>
          <span className="font-bold">EventosFSA</span>
        </Link>
        <button onClick={handleShare} className="p-2 rounded-lg bg-white/10">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      <main className="container mx-auto px-4 pb-32">
        {/* Venue Info */}
        <FadeIn>
          <div className="text-center mb-8">
            <span className="text-xs text-white/60 uppercase tracking-wider">{portal.venue.type}</span>
            <h1 className="text-2xl font-bold mt-1">{portal.venue.name}</h1>
          </div>
        </FadeIn>

        {/* Live Status */}
        {portal.isLive && portal.currentArtist ? (
          <>
            {/* Now Playing */}
            <FadeIn delay={0.1}>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-gradient-to-br from-red-600/20 to-purple-600/20 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/10"
              >
                {/* Live Badge */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-full">
                    <div className="music-bars">
                      <span></span><span></span><span></span><span></span>
                    </div>
                    <span className="font-bold text-sm">AO VIVO</span>
                  </div>
                </div>

                {/* Artist */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Mic2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-2xl font-bold">{portal.currentArtist.name}</h2>
                  <p className="text-white/70">{portal.currentArtist.style}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{portal.currentArtist.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Current Song */}
                {portal.currentSong && (
                  <div className="bg-white/10 rounded-2xl p-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center">
                        <Volume2 className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-xs text-white/60 uppercase">Tocando agora</p>
                        <p className="font-semibold">{portal.currentSong}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTipModalOpen(true)}
                    className="bg-gradient-to-r from-amber-500 to-red-500 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <DollarSign className="w-5 h-5" />
                    Enviar Gorjeta
                  </button>
                  <Link 
                    href={`/artistas/${portal.currentArtist.id}`}
                    className="bg-white/10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Ver Perfil
                  </Link>
                </div>
              </motion.div>
            </FadeIn>

            {/* Request Songs */}
            {portal.upcomingSongs.length > 0 && (
              <FadeIn delay={0.2}>
                <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/10">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Music className="w-5 h-5 text-purple-400" />
                    Peça uma música
                  </h3>
                  <div className="space-y-3">
                    {portal.upcomingSongs.map((song, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleVote(song)}
                        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <span>{song}</span>
                        <ThumbsUp className="w-5 h-5 text-purple-400" />
                      </motion.button>
                    ))}
                  </div>
                  {hasVoted && (
                    <p className="text-center text-sm text-white/50 mt-4">
                      Obrigado pelo seu voto! 🎵
                    </p>
                  )}
                </div>
              </FadeIn>
            )}
          </>
        ) : (
          /* No Live Performance */
          <FadeIn>
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-white/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Mic2 className="w-12 h-12 text-white/40" />
              </div>
              <h2 className="text-xl font-bold mb-2">Sem show no momento</h2>
              <p className="text-white/60 mb-6">
                Fique de olho na agenda para não perder o próximo evento!
              </p>
            </div>
          </FadeIn>
        )}

        {/* Upcoming Events */}
        {portal.upcomingEvents.length > 0 && (
          <FadeIn delay={0.3}>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                Próximos eventos aqui
              </h3>
              <div className="space-y-3">
                {portal.upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <div>
                      <p className="font-semibold">{event.artist}</p>
                      <p className="text-sm text-white/60">{event.date} às {event.time}</p>
                    </div>
                    <Clock className="w-5 h-5 text-white/40" />
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* QR Code Info */}
        <FadeIn delay={0.4}>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-white/40">
              <QrCode className="w-4 h-4" />
              <span>Portal via QR Code</span>
            </div>
          </div>
        </FadeIn>
      </main>

      {/* Bottom Branding */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900 to-transparent">
        <div className="text-center">
          <p className="text-xs text-white/40">
            Powered by <span className="text-red-500 font-bold">EventosFSA</span>
          </p>
        </div>
      </div>

      {/* Tip Modal */}
      {portal.currentArtist && (
        <TipModal
          isOpen={tipModalOpen}
          onClose={() => setTipModalOpen(false)}
          artistName={portal.currentArtist.name}
          onConfirm={handleConfirmTip}
        />
      )}

      {/* Styles for music bars animation */}
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
