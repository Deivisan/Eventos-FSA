// EventosFSA - Página de Detalhes do Evento
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Calendar, Clock, MapPin, Music, Users, DollarSign, 
  Heart, Share2, ArrowLeft, Star, Navigation, Ticket,
  MessageCircle, Instagram, Phone
} from 'lucide-react'

// Dados emulados de eventos de Feira de Santana
const mockEvents: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Noite de MPB no Boteco Central',
    description: 'Uma noite especial dedicada à Música Popular Brasileira com os melhores artistas feirenses. Repertório que vai de Chico Buarque a Tim Maia, passando pelos clássicos de Gilberto Gil e Caetano Veloso.',
    date: '2024-11-30',
    startTime: '20:00',
    endTime: '00:00',
    coverCharge: 15,
    isFree: false,
    isLive: true,
    genres: ['MPB', 'Samba'],
    venue: {
      id: '1',
      name: 'Boteco Central',
      address: 'Av. Getúlio Vargas, 1500 - Centro',
      neighborhood: 'Centro',
      rating: 4.6,
      phone: '75 3623-4567',
      whatsapp: '5575988887777',
      instagram: '@botecocentral_fsa'
    },
    artists: [
      { id: '1', stageName: 'João Viola', rating: 4.8, genres: ['MPB', 'Samba'] },
      { id: '2', stageName: 'Maria Voz', rating: 4.9, genres: ['Forró', 'MPB'] }
    ],
    attendees: 87,
    maxCapacity: 150
  },
  '2': {
    id: '2',
    title: 'Jazz & Blues Night',
    description: 'Uma experiência sofisticada com o melhor do jazz e blues internacional. Drinks especiais e ambiente intimista. Saxofone, piano e contrabaixo ao vivo.',
    date: '2024-12-01',
    startTime: '21:00',
    endTime: '01:00',
    coverCharge: 30,
    isFree: false,
    isLive: false,
    genres: ['Jazz', 'Blues'],
    venue: {
      id: '3',
      name: 'Empório Gastronômico FSA',
      address: 'Av. Maria Quitéria, 2300 - Santa Mônica',
      neighborhood: 'Santa Mônica',
      rating: 4.9,
      phone: '75 3623-1234',
      whatsapp: '5575988885555',
      instagram: '@emporiogastrofsa'
    },
    artists: [
      { id: '3', stageName: 'Pedro Sax', rating: 4.7, genres: ['Jazz', 'Blues'] }
    ],
    attendees: 45,
    maxCapacity: 80
  },
  '3': {
    id: '3',
    title: 'Pagode Raiz - Domingo',
    description: 'O tradicional pagode de domingo em Feira de Santana! Feijoada completa a partir das 12h e roda de samba com os melhores bambas da região.',
    date: '2024-12-01',
    startTime: '12:00',
    endTime: '18:00',
    coverCharge: 0,
    isFree: true,
    isLive: false,
    genres: ['Pagode', 'Samba'],
    venue: {
      id: '4',
      name: 'Recanto do Samba',
      address: 'Rua Castro Alves, 456 - Brasília',
      neighborhood: 'Brasília',
      rating: 4.5,
      phone: '75 3623-8888',
      whatsapp: '5575988884444',
      instagram: '@recantodosamba_fsa'
    },
    artists: [
      { id: '1', stageName: 'João Viola', rating: 4.8, genres: ['MPB', 'Samba'] },
      { id: '5', stageName: 'Grupo Pagode Feirense', rating: 4.6, genres: ['Pagode', 'Samba'] }
    ],
    attendees: 120,
    maxCapacity: 200
  },
  '4': {
    id: '4',
    title: 'Rock Station Live',
    description: 'As melhores bandas de rock de Feira de Santana em uma noite épica! Classic rock, rock nacional e covers das maiores bandas.',
    date: '2024-12-02',
    startTime: '22:00',
    endTime: '03:00',
    coverCharge: 25,
    isFree: false,
    isLive: false,
    genres: ['Rock', 'Pop Rock'],
    venue: {
      id: '5',
      name: 'Rock Station Bar',
      address: 'Av. Senhor dos Passos, 789 - Centro',
      neighborhood: 'Centro',
      rating: 4.4,
      phone: '75 3623-9999',
      whatsapp: '5575988883333',
      instagram: '@rockstation_fsa'
    },
    artists: [
      { id: '5', stageName: 'Banda Feira Viva', rating: 4.5, genres: ['Rock', 'Pop Rock'] }
    ],
    attendees: 95,
    maxCapacity: 200
  },
  '5': {
    id: '5',
    title: 'Forró do Tiziu - Sexta Animada',
    description: 'O melhor forró pé de serra de Feira de Santana! Trio de forró ao vivo, comidas típicas e muito arrasta-pé. Venha dançar!',
    date: '2024-12-06',
    startTime: '20:00',
    endTime: '02:00',
    coverCharge: 20,
    isFree: false,
    isLive: false,
    genres: ['Forró', 'Xote'],
    venue: {
      id: '6',
      name: 'Forró do Tiziu',
      address: 'Rua Monsenhor Mário Pessoa, 1100 - Tomba',
      neighborhood: 'Tomba',
      rating: 4.3,
      phone: '75 3623-7777',
      whatsapp: '5575988882222',
      instagram: '@forrodotiziu'
    },
    artists: [
      { id: '6', stageName: 'Trio Nordestino FSA', rating: 4.4, genres: ['Forró', 'Xote'] }
    ],
    attendees: 180,
    maxCapacity: 300
  }
}

export default function EventoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    const eventId = params.id as string
    // Simular fetch do banco
    setTimeout(() => {
      const eventData = mockEvents[eventId] || mockEvents['1']
      setEvent(eventData)
      setLoading(false)
    }, 300)
  }, [params.id])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: event.title,
        text: `Confira esse evento: ${event.title} em ${event.venue.name}`,
        url: window.location.href
      })
    } else {
      setShowShareModal(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
        <Link href="/eventos" className="text-red-500 hover:underline">
          ← Voltar para eventos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      {/* Header com imagem */}
      <div className="relative h-64 bg-gradient-to-br from-red-600 to-red-900">
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Botões de navegação */}
        <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full backdrop-blur-sm transition ${
                isFavorite ? 'bg-red-500 text-white' : 'bg-black/50 hover:bg-black/70'
              }`}
            >
              <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Badge ao vivo */}
        {event.isLive && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <span className="px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              AO VIVO AGORA
            </span>
          </div>
        )}

        {/* Título */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950">
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          <div className="flex flex-wrap gap-2">
            {event.genres.map((genre: string) => (
              <span key={genre} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-6">
        {/* Data e Hora */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-red-500/20 flex flex-col items-center justify-center">
              <Calendar className="w-6 h-6 text-red-500 mb-1" />
              <span className="text-xs text-gray-400">
                {new Date(event.date).getDate()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold capitalize">{formatDate(event.date)}</p>
              <p className="text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {event.startTime} - {event.endTime}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Local */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800"
        >
          <Link href={`/estabelecimentos/${event.venue.id}`} className="block">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{event.venue.name}</h3>
                <p className="text-gray-400 text-sm">{event.venue.address}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">{event.venue.rating}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm">{event.venue.neighborhood}</span>
                </div>
              </div>
              <Navigation className="w-5 h-5 text-red-500" />
            </div>
          </Link>
          
          {/* Contatos do estabelecimento */}
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-800">
            <a 
              href={`https://wa.me/${event.venue.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-green-500/20 text-green-400 text-sm text-center flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
            <a 
              href={`https://instagram.com/${event.venue.instagram?.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-pink-500/20 text-pink-400 text-sm text-center flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a 
              href={`tel:${event.venue.phone?.replace(/\D/g, '')}`}
              className="flex-1 py-2 rounded-xl bg-blue-500/20 text-blue-400 text-sm text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Ligar
            </a>
          </div>
        </motion.div>

        {/* Descrição */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-3">Sobre o evento</h2>
          <p className="text-gray-300 leading-relaxed">{event.description}</p>
        </motion.div>

        {/* Artistas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Music className="w-5 h-5 text-red-500" />
            Artistas confirmados
          </h2>
          <div className="space-y-3">
            {event.artists.map((artist: any) => (
              <Link 
                key={artist.id}
                href={`/artistas/${artist.id}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                  <span className="text-xl font-bold">{artist.stageName.charAt(0)}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{artist.stageName}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span>{artist.rating}</span>
                    <span>•</span>
                    <span>{artist.genres.join(', ')}</span>
                  </div>
                </div>
                <div className="text-red-500">→</div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Info adicional */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
            <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">{event.attendees}</p>
            <p className="text-sm text-gray-400">confirmados</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
            <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold">
              {event.isFree ? 'Grátis' : `R$ ${event.coverCharge}`}
            </p>
            <p className="text-sm text-gray-400">entrada</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-950 via-gray-950">
        <div className="max-w-lg mx-auto flex gap-3">
          <button 
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-red-500/30 transition"
          >
            <Ticket className="w-5 h-5" />
            {event.isFree ? 'Confirmar Presença' : `Garantir Entrada • R$ ${event.coverCharge}`}
          </button>
        </div>
      </div>

      {/* Modal de compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowShareModal(false)}>
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold mb-4">Compartilhar evento</h3>
            <div className="grid grid-cols-4 gap-4 mb-4">
              <a href={`https://wa.me/?text=${encodeURIComponent(`${event.title} - ${window.location.href}`)}`} target="_blank" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-500/20 hover:bg-green-500/30">
                <MessageCircle className="w-6 h-6 text-green-500" />
                <span className="text-xs">WhatsApp</span>
              </a>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShowShareModal(false)
              }}
              className="w-full py-3 rounded-xl bg-gray-800 text-center"
            >
              Copiar link
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
