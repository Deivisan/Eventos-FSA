'use client'

import { useState } from 'react'
import { 
  MapPin, Star, Clock, Calendar, Music, Phone, 
  Globe, Instagram, ArrowLeft, Navigation, Share2, Heart
} from 'lucide-react'
import Link from 'next/link'
import { Header, BottomNav, Footer } from '@/components/layout'
import { RevealOnScroll } from '@/components/animations'
import { useToast } from '@/components/toast'

// Mock data
const venuesData: Record<string, {
  id: string
  name: string
  type: string
  neighborhood: string
  address: string
  rating: number
  totalReviews: number
  description: string
  isLive?: boolean
  currentArtist?: string
  openHours: string
  features: string[]
  upcomingEvents: { title: string; artist: string; date: string; time: string }[]
  reviews: { author: string; rating: number; comment: string; date: string }[]
  contact: { phone?: string; instagram?: string; website?: string }
}> = {
  '1': {
    id: '1',
    name: 'Cidade da Cultura',
    type: 'Bar Cultural',
    neighborhood: 'Mangabeira',
    address: 'Rua Castro Alves, 123 - Mangabeira, Feira de Santana',
    rating: 4.8,
    totalReviews: 234,
    description: 'O point da música ao vivo em FSA. Ambiente descontraído, petiscos deliciosos e os melhores artistas da cidade toda semana.',
    isLive: true,
    currentArtist: 'Canindé',
    openHours: 'Ter-Dom: 18h às 02h',
    features: ['Música ao Vivo', 'Estacionamento', 'Ar Condicionado', 'Acessível'],
    upcomingEvents: [
      { title: 'Noite de MPB', artist: 'Canindé', date: '30/11', time: '20h' },
      { title: 'Rock Session', artist: 'Cúpula Sessions', date: '01/12', time: '21h' },
    ],
    reviews: [
      { author: 'Pedro M.', rating: 5, comment: 'Melhor bar para curtir música ao vivo!', date: '28/11' },
      { author: 'Ana L.', rating: 5, comment: 'Ambiente incrível, petiscos deliciosos', date: '26/11' },
    ],
    contact: { phone: '75 3333-1234', instagram: '@cidadedacultura' }
  },
  '2': {
    id: '2',
    name: 'Aragas Bar',
    type: 'Bar e Petiscaria',
    neighborhood: 'Fraga Maia',
    address: 'Av. Maria Quitéria, 456 - Fraga Maia, Feira de Santana',
    rating: 4.6,
    totalReviews: 187,
    description: 'Bar tradicional de Feira com música ao vivo nos fins de semana. Especializado em petiscos nordestinos e cervejas artesanais.',
    isLive: true,
    currentArtist: 'Duo Sertanejo',
    openHours: 'Qua-Dom: 17h às 01h',
    features: ['Música ao Vivo', 'Wi-Fi Grátis', 'Happy Hour'],
    upcomingEvents: [
      { title: 'Sertanejo Night', artist: 'Victoria Alencar', date: '02/12', time: '20h' },
    ],
    reviews: [
      { author: 'Carlos R.', rating: 4, comment: 'Ótimo ambiente familiar', date: '25/11' },
    ],
    contact: { phone: '75 3333-5678', instagram: '@aragasbar' }
  },
}

const defaultVenue = {
  id: '0',
  name: 'Estabelecimento',
  type: 'Bar',
  neighborhood: 'Centro',
  address: 'Feira de Santana, BA',
  rating: 4.5,
  totalReviews: 50,
  description: 'Um ótimo lugar para curtir música ao vivo em Feira de Santana.',
  openHours: '18h às 02h',
  features: ['Música ao Vivo'],
  upcomingEvents: [],
  reviews: [],
  contact: {}
}

export default function EstabelecimentoPage({ id }: { id: string }) {
  const venue = venuesData[id] || { ...defaultVenue, id, name: `Estabelecimento ${id}` }
  
  const [isFavorite, setIsFavorite] = useState(false)
  const { addToast } = useToast()

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    addToast({
      type: isFavorite ? 'info' : 'success',
      title: isFavorite ? 'Removido dos favoritos' : '❤️ Adicionado aos favoritos!'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${venue.name} - EventosFSA`,
        text: `Confira ${venue.name} no EventosFSA!`,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      addToast({ type: 'success', title: 'Link copiado!' })
    }
  }

  const handleDirections = () => {
    const query = encodeURIComponent(venue.address)
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank')
    addToast({ type: 'info', title: 'Abrindo Google Maps...' })
  }

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-16 relative">
        <div className="h-64 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 relative">
          <div className="absolute inset-0 bg-black/30" />
          <Link 
            href="/estabelecimentos"
            className="absolute top-20 left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          {/* Live Badge */}
          {venue.isLive && (
            <div className="absolute top-20 right-4 z-10 badge-live flex items-center gap-2">
              <div className="music-bars">
                <span></span><span></span><span></span><span></span>
              </div>
              AO VIVO
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="container-custom relative -mt-16 z-10">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-xl border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm text-amber-600 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                    {venue.type}
                  </span>
                </div>
                <h1 className="text-2xl font-bold mb-2">{venue.name}</h1>
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {venue.neighborhood}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {venue.rating.toFixed(1)} ({venue.totalReviews})
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {venue.openHours}
                  </span>
                </div>
                
                {/* Tocando Agora */}
                {venue.isLive && venue.currentArtist && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                      <Music className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-red-600 font-medium">TOCANDO AGORA</p>
                      <p className="font-semibold">{venue.currentArtist}</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handleFavorite}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isFavorite 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600"
                >
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
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
              <h2 className="font-bold text-lg mb-3">Sobre</h2>
              <p className="text-slate-600 dark:text-slate-400">{venue.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {venue.features.map((feature) => (
                  <span key={feature} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Localização */}
          <RevealOnScroll>
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <h2 className="font-bold text-lg mb-3">Localização</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">{venue.address}</p>
              <button
                onClick={handleDirections}
                className="btn-primary w-full sm:w-auto"
              >
                <Navigation className="w-5 h-5 mr-2" />
                Ver no Mapa
              </button>
            </div>
          </RevealOnScroll>

          {/* Próximos Eventos */}
          {venue.upcomingEvents.length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4">Próximos Eventos</h2>
                <div className="space-y-3">
                  {venue.upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-semibold">{event.title}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {event.artist} • {event.date} às {event.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Avaliações */}
          {venue.reviews.length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4">Avaliações</h2>
                <div className="space-y-4">
                  {venue.reviews.map((review, index) => (
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
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          )}

          {/* Contato */}
          {Object.keys(venue.contact).length > 0 && (
            <RevealOnScroll>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
                <h2 className="font-bold text-lg mb-4">Contato</h2>
                <div className="flex flex-wrap gap-3">
                  {venue.contact.phone && (
                    <a href={`tel:${venue.contact.phone}`} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl">
                      <Phone className="w-5 h-5" />
                      {venue.contact.phone}
                    </a>
                  )}
                  {venue.contact.instagram && (
                    <a href={`https://instagram.com/${venue.contact.instagram.replace('@', '')}`} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl">
                      <Instagram className="w-5 h-5" />
                      {venue.contact.instagram}
                    </a>
                  )}
                  {venue.contact.website && (
                    <a href={venue.contact.website} target="_blank" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl">
                      <Globe className="w-5 h-5" />
                      Site
                    </a>
                  )}
                </div>
              </div>
            </RevealOnScroll>
          )}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
