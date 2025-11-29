'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Star, Beer, Search, Filter } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { VenueCard, FilterChips } from '@/components/ui'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

// Mock data com estabelecimentos reais de Feira de Santana
const allVenues = [
  { id: '1', name: 'Cidade da Cultura', type: 'Bar Cultural', neighborhood: 'Mangabeira', rating: 4.8, isLive: true, currentArtist: 'Canindé' },
  { id: '2', name: 'Aragas Bar', type: 'Bar e Petiscaria', neighborhood: 'Fraga Maia', rating: 4.6, isLive: true, currentArtist: 'Duo Sertanejo' },
  { id: '3', name: 'Casa Parrilla', type: 'Restaurante', neighborhood: 'Cidade Nova', rating: 4.7, isLive: false },
  { id: '4', name: 'A Vendinha', type: 'Bar', neighborhood: 'Centro', rating: 4.5, isLive: false },
  { id: '5', name: 'Point do Bode', type: 'Bar e Restaurante', neighborhood: 'SIM', rating: 4.4, isLive: true, currentArtist: 'Forró Pé de Serra' },
  { id: '6', name: 'Villa Santana', type: 'Espaço de Eventos', neighborhood: 'Santa Mônica', rating: 4.9, isLive: false },
  { id: '7', name: 'Seu Zé Lounge', type: 'Lounge Bar', neighborhood: 'Ponto Central', rating: 4.6, isLive: false },
  { id: '8', name: 'Igor Espaço Verde', type: 'Espaço Ao Ar Livre', neighborhood: 'Tomba', rating: 4.3, isLive: false },
  { id: '9', name: 'Cúpula do Som', type: 'Casa de Show', neighborhood: 'Centro', rating: 4.7, isLive: false },
  { id: '10', name: 'Caspershow', type: 'Eventos', neighborhood: 'Cidade Nova', rating: 4.5, isLive: false },
  { id: '11', name: 'Deck Salvador', type: 'Bar', neighborhood: 'Centro', rating: 4.2, isLive: false },
  { id: '12', name: 'Empório Bistrô', type: 'Restaurante', neighborhood: 'Ponto Central', rating: 4.8, isLive: false },
]

const types = ['Todos', 'Bar', 'Restaurante', 'Lounge Bar', 'Casa de Show', 'Espaço de Eventos']
const neighborhoods = ['Todos', 'Centro', 'Mangabeira', 'Ponto Central', 'Santa Mônica', 'Cidade Nova', 'SIM', 'Fraga Maia', 'Tomba']

export default function EstabelecimentosPage() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('Todos')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos')
  const [showLiveOnly, setShowLiveOnly] = useState(false)

  // Filtrar estabelecimentos
  const filteredVenues = allVenues.filter(venue => {
    const matchesSearch = search === '' || 
      venue.name.toLowerCase().includes(search.toLowerCase()) ||
      venue.neighborhood.toLowerCase().includes(search.toLowerCase())
    
    const matchesType = selectedType === 'Todos' || venue.type.includes(selectedType)
    const matchesNeighborhood = selectedNeighborhood === 'Todos' || venue.neighborhood === selectedNeighborhood
    const matchesLive = !showLiveOnly || venue.isLive

    return matchesSearch && matchesType && matchesNeighborhood && matchesLive
  })

  const liveCount = allVenues.filter(v => v.isLive).length

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-amber-500 via-orange-500 to-red-600">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center text-white mb-8">
              <h1 className="heading-1 mb-4">Estabelecimentos</h1>
              <p className="text-lg text-white/80">
                Os melhores bares e restaurantes com música ao vivo
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
                  placeholder="Buscar estabelecimentos..."
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 shadow-xl focus:ring-4 focus:ring-white/30 transition-all"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Live Now Banner */}
      {liveCount > 0 && (
        <section className="bg-red-600 py-3">
          <div className="container-custom">
            <button
              onClick={() => setShowLiveOnly(!showLiveOnly)}
              className="flex items-center justify-center gap-3 w-full text-white"
            >
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-white rounded-full" />
                  <div className="absolute inset-0 w-3 h-3 bg-white rounded-full animate-ping" />
                </div>
                <span className="font-medium">{liveCount} estabelecimento{liveCount > 1 ? 's' : ''} com música ao vivo agora!</span>
              </div>
              <span className={`text-sm px-3 py-1 rounded-full transition-colors ${
                showLiveOnly ? 'bg-white text-red-600' : 'bg-white/20'
              }`}>
                {showLiveOnly ? 'Mostrando ao vivo' : 'Ver apenas ao vivo'}
              </span>
            </button>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-6 border-b border-slate-200 dark:border-slate-700">
        <div className="container-custom space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tipo
            </label>
            <FilterChips options={types} selected={selectedType} onChange={setSelectedType} />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Bairro
            </label>
            <FilterChips options={neighborhoods} selected={selectedNeighborhood} onChange={setSelectedNeighborhood} />
          </div>
        </div>
      </section>

      {/* Venues List */}
      <section className="py-12">
        <div className="container-custom">
          {/* Results count */}
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            {filteredVenues.length} estabelecimento{filteredVenues.length !== 1 ? 's' : ''} encontrado{filteredVenues.length !== 1 ? 's' : ''}
          </p>

          {/* Venues Grid */}
          {filteredVenues.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVenues.map((venue) => (
                <StaggerItem key={venue.id}>
                  <VenueCard {...venue} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Beer className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhum estabelecimento encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <button
                onClick={() => {
                  setSelectedType('Todos')
                  setSelectedNeighborhood('Todos')
                  setSearch('')
                  setShowLiveOnly(false)
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
      <section className="py-16 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="container-custom text-center text-white">
          <FadeIn>
            <Beer className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="heading-2 mb-4">Tem um estabelecimento?</h2>
            <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
              Cadastre seu bar ou restaurante, divulgue eventos e contrate os melhores artistas da região.
            </p>
            <a href="/cadastro?tipo=estabelecimento" className="btn-secondary bg-white text-amber-600 hover:bg-white/90">
              Cadastrar Estabelecimento
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
