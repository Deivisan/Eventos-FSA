'use client'

import { useState } from 'react'
import { 
  Music2, Calendar, MapPin, Info, 
  DollarSign, Heart, Share2, ChevronRight,
  PlayCircle, ListMusic
} from 'lucide-react'
import { FadeIn } from '@/components/animations'
import { formatCurrency } from '@/lib/utils'

// Mock Data
const venueData = {
  id: '1',
  name: 'Bar do Zé',
  image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1974&auto=format&fit=crop',
  address: 'Rua da Aurora, 123 - Centro',
  description: 'O melhor bar de rock da cidade, com música ao vivo todos os dias e as melhores cervejas artesanais.',
  currentArtist: {
    name: 'Banda Rock',
    image: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
    genre: 'Rock Nacional',
    startTime: '20:00',
    endTime: '23:00'
  },
  nextEvents: [
    { id: '1', name: 'Sexta do Jazz', date: 'Sexta, 20h', artist: 'Jazz Trio' },
    { id: '2', name: 'Sábado Sertanejo', date: 'Sábado, 21h', artist: 'Dupla Sertaneja' }
  ],
  setlist: [
    'Tempo Perdido - Legião Urbana',
    'Pro Dia Nascer Feliz - Barão Vermelho',
    'Mulher de Fases - Raimundos',
    'Anna Júlia - Los Hermanos'
  ]
}

const tipOptions = [10, 20, 50, 100]

export default function PortalPage({ params }: { params: { venueId: string } }) {
  const [selectedTip, setSelectedTip] = useState<number | null>(null)
  const [showTipModal, setShowTipModal] = useState(false)

  const handleTip = (amount: number) => {
    setSelectedTip(amount)
    setShowTipModal(true)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      {/* Hero / Header */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950 z-10" />
        <img 
          src={venueData.image} 
          alt={venueData.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
          <FadeIn>
            <h1 className="text-3xl font-bold mb-1">{venueData.name}</h1>
            <div className="flex items-center text-slate-300 text-sm gap-2">
              <MapPin className="w-4 h-4" />
              {venueData.address}
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-30 space-y-8">
        {/* Now Playing Card */}
        <FadeIn delay={0.1}>
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-wider text-red-500 uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Tocando Agora
              </span>
              <span className="text-xs text-slate-400">Até {venueData.currentArtist.endTime}</span>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <img 
                src={venueData.currentArtist.image} 
                alt={venueData.currentArtist.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-red-600"
              />
              <div>
                <h2 className="text-xl font-bold">{venueData.currentArtist.name}</h2>
                <p className="text-slate-400 text-sm">{venueData.currentArtist.genre}</p>
              </div>
            </div>

            {/* Tip Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {tipOptions.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleTip(amount)}
                  className="flex flex-col items-center justify-center py-3 rounded-xl bg-slate-800 hover:bg-red-600/20 hover:border-red-600 border border-slate-700 transition-all group"
                >
                  <span className="text-xs text-slate-400 group-hover:text-red-400">R$</span>
                  <span className="text-lg font-bold group-hover:text-red-500">{amount}</span>
                </button>
              ))}
            </div>
            <button className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 font-bold flex items-center justify-center gap-2 transition-colors">
              <DollarSign className="w-5 h-5" />
              Enviar Gorjeta Personalizada
            </button>
          </div>
        </FadeIn>

        {/* Setlist */}
        <FadeIn delay={0.2}>
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ListMusic className="w-5 h-5 text-red-500" />
              Setlist Atual
            </h3>
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-800 space-y-3">
              {venueData.setlist.map((song, index) => (
                <div key={index} className="flex items-center gap-3 text-sm text-slate-300 border-b border-slate-800 last:border-0 pb-2 last:pb-0">
                  <PlayCircle className="w-4 h-4 text-slate-500" />
                  {song}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Next Events */}
        <FadeIn delay={0.3}>
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              Próximos Eventos
            </h3>
            <div className="space-y-3">
              {venueData.nextEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div>
                    <h4 className="font-bold">{event.name}</h4>
                    <p className="text-sm text-slate-400">{event.artist}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-red-400 font-bold block">{event.date}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600 ml-auto mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* About */}
        <FadeIn delay={0.4}>
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center space-y-4">
            <Info className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm leading-relaxed">
              {venueData.description}
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
                <Heart className="w-5 h-5 text-red-500" />
              </button>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Tip Modal (Mock) */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 w-full max-w-sm rounded-2xl p-6 border border-slate-800 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">Confirmar Gorjeta</h3>
              <p className="text-slate-400 mt-2">
                Você vai enviar <span className="text-white font-bold">{formatCurrency(selectedTip || 0)}</span> para {venueData.currentArtist.name}
              </p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => setShowTipModal(false)}
                className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 font-bold text-white transition-colors"
              >
                Pagar com PIX
              </button>
              <button 
                onClick={() => setShowTipModal(false)}
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-medium text-slate-300 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
