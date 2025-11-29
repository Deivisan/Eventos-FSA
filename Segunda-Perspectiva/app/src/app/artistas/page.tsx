'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mic2, Star, TrendingUp, Filter, Search } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { ArtistCard, FilterChips } from '@/components/ui'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

// Mock data expandido
const allArtists = [
  { id: '1', name: 'Canindé', style: 'MPB', rating: 4.9, totalShows: 156, ranking: 1 },
  { id: '2', name: 'Oz Pretus', style: 'Regional', rating: 4.8, totalShows: 98, ranking: 2 },
  { id: '3', name: 'Victoria Alencar', style: 'Sertanejo', rating: 4.7, totalShows: 67, ranking: 3 },
  { id: '4', name: 'Fábio Fanal', style: 'Voz e Violão', rating: 4.6, totalShows: 203 },
  { id: '5', name: 'Banda Mesa de Bar', style: 'Sertanejo', rating: 4.5, totalShows: 145 },
  { id: '6', name: 'Grupo Revelação FSA', style: 'Pagode', rating: 4.7, totalShows: 89 },
  { id: '7', name: 'Trio Nordestino', style: 'Forró', rating: 4.4, totalShows: 112 },
  { id: '8', name: 'DJ Lucas Beat', style: 'Eletrônica', rating: 4.3, totalShows: 78 },
  { id: '9', name: 'Cúpula Sessions', style: 'Rock', rating: 4.6, totalShows: 56 },
  { id: '10', name: 'Banda Raízes', style: 'Reggae', rating: 4.5, totalShows: 67 },
  { id: '11', name: 'Duo Acústico', style: 'Pop', rating: 4.2, totalShows: 134 },
  { id: '12', name: 'Samba Prime', style: 'Samba', rating: 4.6, totalShows: 91 },
]

const styles = ['Todos', 'MPB', 'Sertanejo', 'Forró', 'Rock', 'Pagode', 'Eletrônica', 'Reggae', 'Pop', 'Samba', 'Regional']

export default function ArtistasPage() {
  const [search, setSearch] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Todos')
  const [sortBy, setSortBy] = useState<'rating' | 'shows'>('rating')

  // Filtrar artistas
  const filteredArtists = allArtists
    .filter(artist => {
      const matchesSearch = search === '' || 
        artist.name.toLowerCase().includes(search.toLowerCase()) ||
        artist.style.toLowerCase().includes(search.toLowerCase())
      
      const matchesStyle = selectedStyle === 'Todos' || artist.style === selectedStyle

      return matchesSearch && matchesStyle
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      return b.totalShows - a.totalShows
    })

  const handleTip = (artistId: string) => {
    console.log('Tip artist:', artistId)
    // TODO: Implementar modal de gorjeta
  }

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-purple-600 via-red-500 to-amber-500">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center text-white mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6" />
                <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">Ranking Semanal</span>
              </div>
              <h1 className="heading-1 mb-4">Artistas</h1>
              <p className="text-lg text-white/80">
                Conheça os talentos de Feira de Santana
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar artistas por nome ou estilo..."
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 shadow-xl focus:ring-4 focus:ring-white/30 transition-all"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-slate-200 dark:border-slate-700">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <FilterChips 
              options={styles} 
              selected={selectedStyle} 
              onChange={setSelectedStyle} 
            />
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500">Ordenar por:</span>
              <button
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  sortBy === 'rating' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Star className="w-4 h-4 inline-block mr-1" />
                Avaliação
              </button>
              <button
                onClick={() => setSortBy('shows')}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  sortBy === 'shows' 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                <Mic2 className="w-4 h-4 inline-block mr-1" />
                Shows
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Artists List */}
      <section className="py-12">
        <div className="container-custom">
          {/* Results count */}
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            {filteredArtists.length} artista{filteredArtists.length !== 1 ? 's' : ''} encontrado{filteredArtists.length !== 1 ? 's' : ''}
          </p>

          {/* Artists Grid */}
          {filteredArtists.length > 0 ? (
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredArtists.map((artist, index) => (
                <StaggerItem key={artist.id}>
                  <ArtistCard 
                    {...artist} 
                    ranking={index < 3 ? index + 1 : undefined}
                    onTip={() => handleTip(artist.id)}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic2 className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhum artista encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <button
                onClick={() => {
                  setSelectedStyle('Todos')
                  setSearch('')
                }}
                className="btn-primary"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-red-600 to-amber-500">
        <div className="container-custom text-center text-white">
          <FadeIn>
            <Mic2 className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="heading-2 mb-4">É artista? Cadastre-se!</h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Receba propostas de shows, ganhe gorjetas via PIX e entre no ranking dos melhores artistas de FSA.
            </p>
            <a href="/cadastro?tipo=artista" className="btn-secondary bg-white text-red-600 hover:bg-white/90">
              Cadastrar como Artista
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
