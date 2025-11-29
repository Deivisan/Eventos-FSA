// EventosFSA - Página de Perfil do Artista
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Star, Heart, Share2, Music, Calendar, MapPin,
  Instagram, Youtube, DollarSign, MessageCircle, Award,
  Play, Users, TrendingUp, Gift, X
} from 'lucide-react'

// Dados emulados de artistas de Feira de Santana
const mockArtists: Record<string, any> = {
  '1': {
    id: '1',
    stageName: 'João Viola',
    realName: 'João Carlos Silva',
    bio: 'Cantor e violonista feirense com 15 anos de estrada. Especialista em MPB, samba e pagode. Já animou mais de 500 eventos em Feira de Santana e região. Começou tocando nas feiras livres do Centro e hoje é um dos artistas mais requisitados da cidade.',
    genres: ['MPB', 'Samba', 'Pagode'],
    rating: 4.8,
    totalTips: 15420.50,
    totalShows: 523,
    followers: 12500,
    pixKey: 'joaoviola@pix.com',
    instagram: '@joaoviola_fsa',
    youtube: 'JoaoViolaOficial',
    isVerified: true,
    nextEvents: [
      { id: '1', title: 'Noite de MPB', venue: 'Boteco Central', date: '2024-11-30', time: '20:00' },
      { id: '3', title: 'Pagode Raiz', venue: 'Recanto do Samba', date: '2024-12-01', time: '12:00' }
    ],
    recentVenues: ['Boteco Central', 'Vila do Malte', 'Recanto do Samba'],
    highlights: [
      '🎸 15 anos de carreira',
      '🏆 Artista do Ano FSA 2023',
      '🎵 +500 shows realizados',
      '💰 +15k em gorjetas recebidas'
    ]
  },
  '2': {
    id: '2',
    stageName: 'Maria Voz',
    realName: 'Maria Aparecida Santos',
    bio: 'Voz marcante do interior baiano. Canto desde criança nas feiras e festas de São João. Repertório variado de forró, axé e música popular. Conhecida pela potência vocal e carisma no palco.',
    genres: ['Forró', 'Axé', 'MPB'],
    rating: 4.9,
    totalTips: 22350.00,
    totalShows: 412,
    followers: 18700,
    pixKey: 'mariavoz@pix.com',
    instagram: '@mariavoz_oficial',
    youtube: 'MariaVozCanal',
    isVerified: true,
    nextEvents: [
      { id: '1', title: 'Noite de MPB', venue: 'Boteco Central', date: '2024-11-30', time: '20:00' },
      { id: '5', title: 'Forró do Tiziu', venue: 'Forró do Tiziu', date: '2024-12-06', time: '20:00' }
    ],
    recentVenues: ['Boteco Central', 'Forró do Tiziu', 'Empório FSA'],
    highlights: [
      '🎤 Voz mais potente de FSA',
      '🎪 Rainha do São João 2022',
      '❤️ 18.7k seguidores',
      '💰 +22k em gorjetas'
    ]
  },
  '3': {
    id: '3',
    stageName: 'Pedro Sax',
    realName: 'Pedro Henrique Oliveira',
    bio: 'Saxofonista profissional com formação no Conservatório de Música de Salvador. Jazz, blues e bossa nova são minhas especialidades. Atuo em Feira de Santana e Salvador, com apresentações em bares, restaurantes e eventos corporativos.',
    genres: ['Jazz', 'Blues', 'Bossa Nova'],
    rating: 4.7,
    totalTips: 8920.00,
    totalShows: 287,
    followers: 6800,
    pixKey: 'pedrosax@pix.com',
    instagram: '@pedro_sax',
    youtube: 'PedroSaxMusic',
    isVerified: true,
    nextEvents: [
      { id: '2', title: 'Jazz & Blues Night', venue: 'Empório FSA', date: '2024-12-01', time: '21:00' }
    ],
    recentVenues: ['Empório FSA', 'Vila do Malte', 'Lounge 44'],
    highlights: [
      '🎷 Formação clássica',
      '🎼 Conservatório SSA',
      '🍷 Especialista em jazz',
      '🌙 O som da noite feirense'
    ]
  },
  '4': {
    id: '4',
    stageName: 'Ana Acoustic',
    realName: 'Ana Paula Costa',
    bio: 'Violonista e cantora. Faço covers acústicos de pop, rock e sertanejo. Perfeito para ambientes intimistas e happy hours. Formada em música pela UEFS, com especialização em violão clássico.',
    genres: ['Pop', 'Rock Acústico', 'Sertanejo'],
    rating: 4.6,
    totalTips: 5640.00,
    totalShows: 198,
    followers: 4200,
    pixKey: 'anaacoustic@pix.com',
    instagram: '@ana_acoustic',
    youtube: null,
    isVerified: false,
    nextEvents: [
      { id: '6', title: 'Happy Hour Acústico', venue: 'Vila do Malte', date: '2024-12-05', time: '18:00' }
    ],
    recentVenues: ['Vila do Malte', 'Sabor & Arte', 'Lounge 44'],
    highlights: [
      '🎸 UEFS - Música',
      '🎵 Covers acústicos',
      '☕ Happy hour perfeito',
      '💫 Voz suave e marcante'
    ]
  },
  '5': {
    id: '5',
    stageName: 'Banda Feira Viva',
    realName: 'Banda (5 integrantes)',
    bio: 'Banda completa com 5 integrantes. Rock, pop-rock e clássicos nacionais. Ideal para festas, eventos corporativos e casamentos. Formada em 2015, já tocamos em mais de 300 eventos na Bahia.',
    genres: ['Rock', 'Pop Rock', 'MPB'],
    rating: 4.5,
    totalTips: 12800.00,
    totalShows: 324,
    followers: 8900,
    pixKey: 'feiraviva@pix.com',
    instagram: '@bandafeiraviva',
    youtube: 'BandaFeiraViva',
    isVerified: true,
    nextEvents: [
      { id: '4', title: 'Rock Station Live', venue: 'Rock Station Bar', date: '2024-12-02', time: '22:00' }
    ],
    recentVenues: ['Rock Station Bar', 'Boteco Central', 'Lounge 44'],
    highlights: [
      '🎸 5 integrantes',
      '🎤 +300 shows',
      '💒 Casamentos & corporativos',
      '🔥 Energia máxima!'
    ]
  },
  '6': {
    id: '6',
    stageName: 'Trio Nordestino FSA',
    realName: 'Trio de Forró',
    bio: 'Trio de forró pé de serra autêntico! Sanfona, zabumba e triângulo. Tocamos forró tradicional, xote e baião. O verdadeiro som do nordeste vivo em Feira de Santana.',
    genres: ['Forró', 'Xote', 'Baião'],
    rating: 4.4,
    totalTips: 7650.00,
    totalShows: 256,
    followers: 5400,
    pixKey: 'trionordestinofsa@pix.com',
    instagram: '@trio_nordestino_fsa',
    youtube: null,
    isVerified: true,
    nextEvents: [
      { id: '5', title: 'Forró do Tiziu', venue: 'Forró do Tiziu', date: '2024-12-06', time: '20:00' }
    ],
    recentVenues: ['Forró do Tiziu', 'Recanto do Samba', 'Boteco Central'],
    highlights: [
      '🪗 Forró autêntico',
      '🥁 Sanfona + Zabumba + Triângulo',
      '👢 Arrasta-pé garantido',
      '🔥 Som do nordeste!'
    ]
  }
}

export default function ArtistaPerfilPage() {
  const params = useParams()
  const router = useRouter()
  const [artist, setArtist] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showTipModal, setShowTipModal] = useState(false)
  const [tipAmount, setTipAmount] = useState('')
  const [tipMessage, setTipMessage] = useState('')

  useEffect(() => {
    const artistId = params.id as string
    setTimeout(() => {
      const artistData = mockArtists[artistId] || mockArtists['1']
      setArtist(artistData)
      setLoading(false)
    }, 300)
  }, [params.id])

  const handleSendTip = () => {
    const amount = parseFloat(tipAmount)
    if (amount > 0) {
      // Em produção, enviar para API de pagamento PIX
      alert(`Gorjeta de R$ ${amount.toFixed(2)} enviada para ${artist.stageName}! 🎉\n\nChave PIX: ${artist.pixKey}`)
      setShowTipModal(false)
      setTipAmount('')
      setTipMessage('')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Artista não encontrado</h1>
        <Link href="/artistas" className="text-red-500 hover:underline">
          ← Voltar para artistas
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-24">
      {/* Header com foto */}
      <div className="relative h-72 bg-gradient-to-br from-red-600 via-red-700 to-red-900">
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
            <button 
              className="p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition"
            >
              <Share2 className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Avatar e info principal */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-4 border-gray-950 flex items-center justify-center shadow-xl">
            <span className="text-5xl font-bold">{artist.stageName.charAt(0)}</span>
          </div>
          {artist.isVerified && (
            <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-2 border-gray-950">
              <Award className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="pt-20 px-6 space-y-6">
        {/* Nome e rating */}
        <div className="text-center">
          <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
            {artist.stageName}
            {artist.isVerified && <Award className="w-5 h-5 text-blue-500" />}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2 text-gray-400">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-lg font-semibold text-white">{artist.rating}</span>
            <span>• {artist.totalShows} shows</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {artist.genres.map((genre: string) => (
              <span key={genre} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
            <Users className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{(artist.followers / 1000).toFixed(1)}k</p>
            <p className="text-xs text-gray-400">seguidores</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
            <Music className="w-5 h-5 text-red-500 mx-auto mb-1" />
            <p className="text-lg font-bold">{artist.totalShows}</p>
            <p className="text-xs text-gray-400">shows</p>
          </div>
          <div className="bg-gray-900/50 rounded-xl p-4 text-center border border-gray-800">
            <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <p className="text-lg font-bold">R$ {(artist.totalTips / 1000).toFixed(1)}k</p>
            <p className="text-xs text-gray-400">gorjetas</p>
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-2"
        >
          {artist.highlights.map((highlight: string, i: number) => (
            <div key={i} className="bg-gray-900/30 rounded-lg p-3 text-sm text-gray-300">
              {highlight}
            </div>
          ))}
        </motion.div>

        {/* Bio */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold mb-3">Sobre</h2>
          <p className="text-gray-300 leading-relaxed">{artist.bio}</p>
        </motion.div>

        {/* Redes sociais */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          {artist.instagram && (
            <a 
              href={`https://instagram.com/${artist.instagram.replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center flex items-center justify-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
          )}
          {artist.youtube && (
            <a 
              href={`https://youtube.com/${artist.youtube}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-xl bg-red-600 text-white text-center flex items-center justify-center gap-2"
            >
              <Youtube className="w-5 h-5" />
              YouTube
            </a>
          )}
        </motion.div>

        {/* Próximos eventos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-red-500" />
            Próximos Shows
          </h2>
          <div className="space-y-3">
            {artist.nextEvents.map((event: any) => (
              <Link 
                key={event.id}
                href={`/eventos/${event.id}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-red-500/50 transition"
              >
                <div className="w-12 h-12 rounded-lg bg-red-500/20 flex flex-col items-center justify-center">
                  <span className="text-xs text-gray-400">
                    {new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.venue} • {event.time}
                  </p>
                </div>
                <Play className="w-5 h-5 text-red-500" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Onde toca */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-semibold mb-3">Onde toca frequentemente</h2>
          <div className="flex flex-wrap gap-2">
            {artist.recentVenues.map((venue: string) => (
              <span 
                key={venue}
                className="px-4 py-2 rounded-full bg-gray-800 text-gray-300 text-sm"
              >
                {venue}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-950 via-gray-950">
        <div className="max-w-lg mx-auto flex gap-3">
          <a
            href={`https://wa.me/55${artist.pixKey?.includes('@') ? '75988881111' : artist.pixKey}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-4 rounded-xl bg-gray-800 text-white font-bold flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Contratar
          </a>
          <button 
            onClick={() => setShowTipModal(true)}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-green-500/30 transition"
          >
            <Gift className="w-5 h-5" />
            Enviar Gorjeta
          </button>
        </div>
      </div>

      {/* Modal de Gorjeta */}
      {showTipModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setShowTipModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-sm"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Enviar Gorjeta 💰</h3>
              <button onClick={() => setShowTipModal(false)} className="p-2 rounded-full hover:bg-gray-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 mx-auto flex items-center justify-center mb-3">
                <span className="text-2xl font-bold">{artist.stageName.charAt(0)}</span>
              </div>
              <p className="text-gray-400">Enviar para {artist.stageName}</p>
            </div>

            {/* Valores rápidos */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[5, 10, 20, 50].map(value => (
                <button
                  key={value}
                  onClick={() => setTipAmount(value.toString())}
                  className={`py-3 rounded-xl text-center font-semibold transition ${
                    tipAmount === value.toString() 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  R$ {value}
                </button>
              ))}
            </div>

            {/* Input customizado */}
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Outro valor</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                <input
                  type="number"
                  value={tipAmount}
                  onChange={e => setTipAmount(e.target.value)}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 outline-none"
                />
              </div>
            </div>

            {/* Mensagem */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-2 block">Mensagem (opcional)</label>
              <input
                type="text"
                value={tipMessage}
                onChange={e => setTipMessage(e.target.value)}
                placeholder="Manda mais uma!"
                className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-green-500 outline-none"
              />
            </div>

            {/* Chave PIX */}
            <div className="mb-6 p-3 rounded-xl bg-gray-800/50 text-center">
              <p className="text-xs text-gray-400 mb-1">Chave PIX</p>
              <p className="text-sm text-green-400 font-mono">{artist.pixKey}</p>
            </div>

            <button 
              onClick={handleSendTip}
              disabled={!tipAmount || parseFloat(tipAmount) <= 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-600 to-green-500 text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Gift className="w-5 h-5" />
              Enviar R$ {tipAmount || '0'}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
