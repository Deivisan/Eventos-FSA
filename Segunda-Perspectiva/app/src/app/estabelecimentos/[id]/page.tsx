// EventosFSA - Página de Detalhes do Estabelecimento
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Star, Heart, Share2, MapPin, Clock, Phone,
  Instagram, MessageCircle, Navigation, Calendar, Music,
  Users, Car, Snowflake, Wifi, CreditCard, Award, ExternalLink
} from 'lucide-react'

// Dados emulados de estabelecimentos de Feira de Santana
const mockVenues: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Boteco Central',
    description: 'O point da galera jovem de Feira! Ambiente descontraído, petiscos deliciosos e música ao vivo toda semana. Venha curtir o melhor do happy hour feirense. O Boteco Central é conhecido por sua energia contagiante e por reunir os melhores artistas da cidade.',
    address: 'Av. Getúlio Vargas, 1500',
    neighborhood: 'Centro',
    city: 'Feira de Santana',
    state: 'BA',
    category: 'bar',
    phone: '75 3623-4567',
    whatsapp: '5575988887777',
    instagram: '@botecocentral_fsa',
    capacity: 150,
    rating: 4.6,
    totalReviews: 342,
    hasParking: false,
    hasAC: true,
    hasWifi: true,
    acceptsCard: true,
    isVerified: true,
    latitude: -12.2660,
    longitude: -38.9663,
    openHours: {
      seg: 'Fechado',
      ter: '17:00 - 23:00',
      qua: '17:00 - 23:00',
      qui: '17:00 - 00:00',
      sex: '17:00 - 02:00',
      sab: '16:00 - 02:00',
      dom: '12:00 - 20:00'
    },
    upcomingEvents: [
      { id: '1', title: 'Noite de MPB', date: '2024-11-30', time: '20:00', artist: 'João Viola' },
      { id: '6', title: 'Samba na Quinta', date: '2024-12-05', time: '19:00', artist: 'Grupo Pagode FSA' }
    ],
    photos: ['/venue1.jpg', '/venue2.jpg', '/venue3.jpg'],
    specialties: ['Petiscos', 'Cervejas Artesanais', 'Caipirinhas', 'Música ao Vivo']
  },
  '2': {
    id: '2',
    name: 'Vila do Malte',
    description: 'Cervejaria artesanal com mais de 50 rótulos de cervejas especiais. Ambiente rústico e aconchegante. Música ao vivo às sextas e sábados. O lugar perfeito para quem aprecia uma boa cerveja e boa música.',
    address: 'Rua Marechal Deodoro, 890',
    neighborhood: 'Kalilândia',
    city: 'Feira de Santana',
    state: 'BA',
    category: 'bar',
    phone: '75 3623-7890',
    whatsapp: '5575988886666',
    instagram: '@viladomalte',
    capacity: 80,
    rating: 4.8,
    totalReviews: 256,
    hasParking: true,
    hasAC: true,
    hasWifi: true,
    acceptsCard: true,
    isVerified: true,
    latitude: -12.2580,
    longitude: -38.9580,
    openHours: {
      seg: 'Fechado',
      ter: '18:00 - 23:00',
      qua: '18:00 - 23:00',
      qui: '18:00 - 00:00',
      sex: '18:00 - 01:00',
      sab: '17:00 - 01:00',
      dom: 'Fechado'
    },
    upcomingEvents: [
      { id: '6', title: 'Happy Hour Acústico', date: '2024-12-05', time: '18:00', artist: 'Ana Acoustic' }
    ],
    photos: ['/venue1.jpg', '/venue2.jpg'],
    specialties: ['Cervejas Artesanais', 'Chopes Especiais', 'Tábuas de Frios', 'Hambúrgueres']
  },
  '3': {
    id: '3',
    name: 'Empório Gastronômico FSA',
    description: 'Gastronomia refinada em ambiente elegante. Vinhos selecionados, pratos autorais e jazz ao vivo. O melhor da culinária contemporânea em Feira de Santana. Perfeito para jantares especiais e comemorações.',
    address: 'Av. Maria Quitéria, 2300',
    neighborhood: 'Santa Mônica',
    city: 'Feira de Santana',
    state: 'BA',
    category: 'restaurant',
    phone: '75 3623-1234',
    whatsapp: '5575988885555',
    instagram: '@emporiogastrofsa',
    capacity: 120,
    rating: 4.9,
    totalReviews: 189,
    hasParking: true,
    hasAC: true,
    hasWifi: true,
    acceptsCard: true,
    isVerified: true,
    latitude: -12.2450,
    longitude: -38.9420,
    openHours: {
      seg: 'Fechado',
      ter: '19:00 - 23:00',
      qua: '19:00 - 23:00',
      qui: '19:00 - 23:00',
      sex: '19:00 - 00:00',
      sab: '19:00 - 00:00',
      dom: '12:00 - 16:00'
    },
    upcomingEvents: [
      { id: '2', title: 'Jazz & Blues Night', date: '2024-12-01', time: '21:00', artist: 'Pedro Sax' }
    ],
    photos: ['/venue1.jpg', '/venue2.jpg', '/venue3.jpg'],
    specialties: ['Gastronomia Contemporânea', 'Carta de Vinhos', 'Jazz ao Vivo', 'Pratos Autorais']
  },
  '4': {
    id: '4',
    name: 'Recanto do Samba',
    description: 'Roda de samba autêntica todo domingo! Feijoada completa e samba de raiz com os melhores pagodeiros da região. Tradição feirense desde 2010.',
    address: 'Rua Castro Alves, 456',
    neighborhood: 'Brasília',
    city: 'Feira de Santana',
    state: 'BA',
    category: 'bar',
    phone: '75 3623-8888',
    whatsapp: '5575988884444',
    instagram: '@recantodosamba_fsa',
    capacity: 100,
    rating: 4.5,
    totalReviews: 278,
    hasParking: false,
    hasAC: false,
    hasWifi: true,
    acceptsCard: true,
    isVerified: true,
    latitude: -12.2700,
    longitude: -38.9700,
    openHours: {
      seg: 'Fechado',
      ter: 'Fechado',
      qua: 'Fechado',
      qui: '18:00 - 23:00',
      sex: '18:00 - 00:00',
      sab: '18:00 - 00:00',
      dom: '12:00 - 20:00'
    },
    upcomingEvents: [
      { id: '3', title: 'Pagode Raiz', date: '2024-12-01', time: '12:00', artist: 'João Viola' }
    ],
    photos: ['/venue1.jpg'],
    specialties: ['Samba de Raiz', 'Feijoada', 'Cerveja Gelada', 'Petiscos Nordestinos']
  },
  '5': {
    id: '5',
    name: 'Rock Station Bar',
    description: 'O templo do rock em Feira de Santana! Shows de bandas locais e nacionais. Cervejas geladas e o melhor som. Desde 2015 mantendo a chama do rock acesa.',
    address: 'Av. Senhor dos Passos, 789',
    neighborhood: 'Centro',
    city: 'Feira de Santana',
    state: 'BA',
    category: 'bar',
    phone: '75 3623-9999',
    whatsapp: '5575988883333',
    instagram: '@rockstation_fsa',
    capacity: 200,
    rating: 4.4,
    totalReviews: 312,
    hasParking: true,
    hasAC: true,
    hasWifi: true,
    acceptsCard: true,
    isVerified: true,
    latitude: -12.2620,
    longitude: -38.9650,
    openHours: {
      seg: 'Fechado',
      ter: 'Fechado',
      qua: '20:00 - 00:00',
      qui: '20:00 - 01:00',
      sex: '21:00 - 03:00',
      sab: '21:00 - 03:00',
      dom: 'Fechado'
    },
    upcomingEvents: [
      { id: '4', title: 'Rock Station Live', date: '2024-12-02', time: '22:00', artist: 'Banda Feira Viva' }
    ],
    photos: ['/venue1.jpg', '/venue2.jpg'],
    specialties: ['Shows de Rock', 'Cervejas Importadas', 'Hamburgueria', 'Ambiente Underground']
  },
  '6': {
    id: '6',
    name: 'Forró do Tiziu',
    description: 'Forró pé de serra de verdade! Trio elétrico nos finais de semana. A tradição junina o ano inteiro. O melhor forró de Feira de Santana desde 2008.',
    address: 'Rua Monsenhor Mário Pessoa, 1100',
    neighborhood: 'Tomba',
    city: 'Feira de Santana',
    state: 'BA',
    category: 'club',
    phone: '75 3623-7777',
    whatsapp: '5575988882222',
    instagram: '@forrodotiziu',
    capacity: 300,
    rating: 4.3,
    totalReviews: 425,
    hasParking: true,
    hasAC: false,
    hasWifi: false,
    acceptsCard: true,
    isVerified: true,
    latitude: -12.2800,
    longitude: -38.9750,
    openHours: {
      seg: 'Fechado',
      ter: 'Fechado',
      qua: 'Fechado',
      qui: 'Fechado',
      sex: '20:00 - 03:00',
      sab: '20:00 - 03:00',
      dom: 'Fechado'
    },
    upcomingEvents: [
      { id: '5', title: 'Forró do Tiziu - Sexta', date: '2024-12-06', time: '20:00', artist: 'Trio Nordestino FSA' }
    ],
    photos: ['/venue1.jpg'],
    specialties: ['Forró Pé de Serra', 'Comidas Típicas', 'Drinks Nordestinos', 'Pista Ampla']
  }
}

const categoryLabels: Record<string, string> = {
  bar: 'Bar',
  restaurant: 'Restaurante',
  club: 'Casa de Shows'
}

const dayLabels: Record<string, string> = {
  seg: 'Segunda',
  ter: 'Terça',
  qua: 'Quarta',
  qui: 'Quinta',
  sex: 'Sexta',
  sab: 'Sábado',
  dom: 'Domingo'
}

export default function EstabelecimentoDetalhePage() {
  const params = useParams()
  const router = useRouter()
  const [venue, setVenue] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState<'info' | 'events' | 'hours'>('info')

  useEffect(() => {
    const venueId = params.id as string
    setTimeout(() => {
      const venueData = mockVenues[venueId] || mockVenues['1']
      setVenue(venueData)
      setLoading(false)
    }, 300)
  }, [params.id])

  const isOpenNow = () => {
    const now = new Date()
    const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
    const today = days[now.getDay()]
    const hours = venue?.openHours[today]
    if (!hours || hours === 'Fechado') return false
    // Simplificação - em produção, verificar horário atual
    return true
  }

  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`
    window.open(url, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Estabelecimento não encontrado</h1>
        <Link href="/estabelecimentos" className="text-red-500 hover:underline">
          ← Voltar para estabelecimentos
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      {/* Header com imagem */}
      <div className="relative h-64 bg-gradient-to-br from-red-600 via-red-700 to-red-900">
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Navegação */}
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
            <button className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition">
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Status aberto/fechado */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
          <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
            isOpenNow() ? 'bg-green-500/90 text-white' : 'bg-gray-800/90 text-gray-300'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isOpenNow() ? 'bg-white' : 'bg-gray-500'}`}></span>
            {isOpenNow() ? 'Aberto agora' : 'Fechado'}
          </span>
        </div>

        {/* Info principal */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-950">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs">
              {categoryLabels[venue.category]}
            </span>
            {venue.isVerified && (
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs flex items-center gap-1">
                <Award className="w-3 h-3" /> Verificado
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold">{venue.name}</h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {venue.rating} ({venue.totalReviews})
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {venue.neighborhood}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 sticky top-0 bg-gray-950 z-20">
        {[
          { key: 'info', label: 'Info' },
          { key: 'events', label: 'Eventos' },
          { key: 'hours', label: 'Horários' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 py-4 text-sm font-medium transition ${
              activeTab === tab.key
                ? 'text-red-500 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-6">
        {activeTab === 'info' && (
          <>
            {/* Descrição */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-lg font-semibold mb-3">Sobre</h2>
              <p className="text-gray-300 leading-relaxed">{venue.description}</p>
            </motion.div>

            {/* Endereço */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 rounded-2xl p-4 border border-gray-800"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{venue.address}</h3>
                  <p className="text-sm text-gray-400">{venue.neighborhood}, {venue.city} - {venue.state}</p>
                </div>
                <button 
                  onClick={openMaps}
                  className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition"
                >
                  <Navigation className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </motion.div>

            {/* Facilidades */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-lg font-semibold mb-3">Facilidades</h2>
              <div className="grid grid-cols-4 gap-3">
                <div className={`p-3 rounded-xl text-center ${venue.hasParking ? 'bg-green-500/20' : 'bg-gray-800/50'}`}>
                  <Car className={`w-5 h-5 mx-auto mb-1 ${venue.hasParking ? 'text-green-500' : 'text-gray-500'}`} />
                  <span className="text-xs">Estacionamento</span>
                </div>
                <div className={`p-3 rounded-xl text-center ${venue.hasAC ? 'bg-green-500/20' : 'bg-gray-800/50'}`}>
                  <Snowflake className={`w-5 h-5 mx-auto mb-1 ${venue.hasAC ? 'text-green-500' : 'text-gray-500'}`} />
                  <span className="text-xs">Ar Condicionado</span>
                </div>
                <div className={`p-3 rounded-xl text-center ${venue.hasWifi ? 'bg-green-500/20' : 'bg-gray-800/50'}`}>
                  <Wifi className={`w-5 h-5 mx-auto mb-1 ${venue.hasWifi ? 'text-green-500' : 'text-gray-500'}`} />
                  <span className="text-xs">Wi-Fi</span>
                </div>
                <div className={`p-3 rounded-xl text-center ${venue.acceptsCard ? 'bg-green-500/20' : 'bg-gray-800/50'}`}>
                  <CreditCard className={`w-5 h-5 mx-auto mb-1 ${venue.acceptsCard ? 'text-green-500' : 'text-gray-500'}`} />
                  <span className="text-xs">Cartão</span>
                </div>
              </div>
            </motion.div>

            {/* Capacidade e especialidades */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
                <Users className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{venue.capacity}</p>
                <p className="text-sm text-gray-400">capacidade</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 text-center">
                <Music className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-2xl font-bold">{venue.upcomingEvents.length}</p>
                <p className="text-sm text-gray-400">eventos</p>
              </div>
            </motion.div>

            {/* Especialidades */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-lg font-semibold mb-3">Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {venue.specialties.map((spec: string) => (
                  <span key={spec} className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm">
                    {spec}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {activeTab === 'events' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-500" />
              Próximos Eventos
            </h2>
            {venue.upcomingEvents.length > 0 ? (
              <div className="space-y-3">
                {venue.upcomingEvents.map((event: any) => (
                  <Link 
                    key={event.id}
                    href={`/eventos/${event.id}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">
                        {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit' })}
                      </span>
                      <span className="text-xs text-red-200">
                        {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event.time}
                        <span className="mx-1">•</span>
                        <Music className="w-3 h-3" />
                        {event.artist}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-red-500" />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum evento programado</p>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'hours' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Horário de Funcionamento
            </h2>
            <div className="space-y-2">
              {Object.entries(venue.openHours).map(([day, hours]) => {
                const days = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
                const today = days[new Date().getDay()]
                const isToday = day === today
                
                return (
                  <div 
                    key={day}
                    className={`flex justify-between p-3 rounded-xl ${
                      isToday ? 'bg-red-500/20 border border-red-500/50' : 'bg-gray-900/50'
                    }`}
                  >
                    <span className={`font-medium ${isToday ? 'text-red-400' : 'text-gray-300'}`}>
                      {dayLabels[day]}
                      {isToday && <span className="ml-2 text-xs">(hoje)</span>}
                    </span>
                    <span className={hours === 'Fechado' ? 'text-gray-500' : 'text-white'}>
                      {hours as string}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-950 via-gray-950">
        <div className="max-w-lg mx-auto flex gap-3">
          <a
            href={`tel:${venue.phone?.replace(/\D/g, '')}`}
            className="flex-1 py-4 rounded-xl bg-gray-800 text-white font-medium flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Ligar
          </a>
          <a
            href={`https://wa.me/${venue.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 rounded-xl bg-green-600 text-white font-medium flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
          <a
            href={`https://instagram.com/${venue.instagram?.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center justify-center gap-2"
          >
            <Instagram className="w-5 h-5" />
            Instagram
          </a>
        </div>
      </div>
    </div>
  )
}
