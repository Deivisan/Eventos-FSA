'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Filter, Search, Sliders } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { EventCard, SearchInput, FilterChips } from '@/components/ui'
import { FadeIn, RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/animations'

// Mock data expandido
const allEvents = [
  { id: '1', title: 'Noite de MPB', artist: 'Canindé', venue: 'Cidade da Cultura', neighborhood: 'Mangabeira', date: '30/11', time: '20h', style: 'MPB', isLive: true },
  { id: '2', title: 'Sertanejo Universitário', artist: 'Banda Mesa de Bar', venue: 'Seu Zé Lounge', neighborhood: 'Ponto Central', date: '30/11', time: '21h', style: 'Sertanejo' },
  { id: '3', title: 'Rock Night', artist: 'Cúpula Sessions', venue: 'Cúpula do Som', neighborhood: 'Centro', date: '01/12', time: '22h', style: 'Rock' },
  { id: '4', title: 'Pagode na Praça', artist: 'Grupo Revelação FSA', venue: 'Villa Santana', neighborhood: 'Santa Mônica', date: '01/12', time: '19h', style: 'Pagode' },
  { id: '5', title: 'Forró Pé de Serra', artist: 'Trio Nordestino', venue: 'Point do Bode', neighborhood: 'SIM', date: '02/12', time: '20h', style: 'Forró' },
  { id: '6', title: 'Jazz & Blues Night', artist: 'Victoria Alencar', venue: 'Casa Parrilla', neighborhood: 'Cidade Nova', date: '02/12', time: '21h', style: 'Jazz' },
  { id: '7', title: 'Acústico Sunset', artist: 'Fábio Fanal', venue: 'Aragas Bar', neighborhood: 'Fraga Maia', date: '03/12', time: '18h', style: 'MPB' },
  { id: '8', title: 'Eletrônica Experience', artist: 'DJ Lucas Beat', venue: 'A Vendinha', neighborhood: 'Centro', date: '03/12', time: '23h', style: 'Eletrônica' },
  { id: '9', title: 'Reggae Roots', artist: 'Banda Raízes', venue: 'Igor Espaço Verde', neighborhood: 'Tomba', date: '04/12', time: '20h', style: 'Reggae' },
]

const styles = ['Todos', 'MPB', 'Sertanejo', 'Forró', 'Rock', 'Pagode', 'Jazz', 'Eletrônica', 'Reggae']
const neighborhoods = ['Todos', 'Centro', 'Mangabeira', 'Ponto Central', 'Santa Mônica', 'Cidade Nova', 'SIM', 'Fraga Maia', 'Tomba']

export default function EventosPage() {
  const [search, setSearch] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('Todos')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('Todos')
  const [showFilters, setShowFilters] = useState(false)

  // Filtrar eventos
  const filteredEvents = allEvents.filter(event => {
    const matchesSearch = search === '' || 
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.artist.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase())
    
    const matchesStyle = selectedStyle === 'Todos' || event.style === selectedStyle
    const matchesNeighborhood = selectedNeighborhood === 'Todos' || event.neighborhood === selectedNeighborhood

    return matchesSearch && matchesStyle && matchesNeighborhood
  })

  const activeFiltersCount = [
    selectedStyle !== 'Todos',
    selectedNeighborhood !== 'Todos',
    search !== ''
  ].filter(Boolean).length

  return (
    <div className="page-container">
      <Header />
      
      {/* Hero */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-red-600 via-red-500 to-amber-500">
        <div className="container-custom">
          <FadeIn>
            <div className="text-center text-white mb-8">
              <h1 className="heading-1 mb-4">Eventos</h1>
              <p className="text-lg text-white/80">
                Descubra os melhores shows de Feira de Santana
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
                  placeholder="Buscar eventos, artistas, locais..."
                  className="w-full px-6 py-4 pl-14 rounded-2xl bg-white/95 backdrop-blur-sm text-slate-900 placeholder:text-slate-400 shadow-xl focus:ring-4 focus:ring-white/30 transition-all"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-colors ${
                    activeFiltersCount > 0 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Sliders className="w-5 h-5" />
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Filters Panel */}
      {showFilters && (
        <motion.section 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 py-6"
        >
          <div className="container-custom space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Estilo Musical
              </label>
              <FilterChips options={styles} selected={selectedStyle} onChange={setSelectedStyle} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Bairro
              </label>
              <FilterChips options={neighborhoods} selected={selectedNeighborhood} onChange={setSelectedNeighborhood} />
            </div>
            {activeFiltersCount > 0 && (
              <button
                onClick={() => {
                  setSelectedStyle('Todos')
                  setSelectedNeighborhood('Todos')
                  setSearch('')
                }}
                className="text-sm text-red-600 hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </motion.section>
      )}

      {/* Events List */}
      <section className="py-12">
        <div className="container-custom">
          {/* Results count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-500 dark:text-slate-400">
              {filteredEvents.length} evento{filteredEvents.length !== 1 ? 's' : ''} encontrado{filteredEvents.length !== 1 ? 's' : ''}
            </p>
            
            {/* Quick filters */}
            <div className="hidden sm:flex items-center gap-2">
              <button className="px-4 py-2 text-sm bg-red-50 dark:bg-red-900/20 text-red-600 rounded-full font-medium">
                Esta semana
              </button>
              <button className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                Ao vivo agora
              </button>
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard {...event} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhum evento encontrado</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Tente ajustar os filtros ou fazer uma nova busca
              </p>
              <button
                onClick={() => {
                  setSelectedStyle('Todos')
                  setSelectedNeighborhood('Todos')
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

      <Footer />
      <BottomNav />
    </div>
  )
}
