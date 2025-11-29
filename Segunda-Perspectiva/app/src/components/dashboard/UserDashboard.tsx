'use client'

import { useState } from 'react'
import { Calendar, Heart, Settings, LogOut, Bell, Star, Mic2 } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import Link from 'next/link'
import useAuthStore from '@/lib/store'

// Mock data
const recentEvents = [
  { id: '1', title: 'Noite de MPB', artist: 'Canindé', venue: 'Cidade da Cultura', date: '28/11' },
  { id: '2', title: 'Sertanejo Sunset', artist: 'Victoria Alencar', venue: 'Aragas Bar', date: '25/11' },
  { id: '3', title: 'Rock Night', artist: 'Cúpula Sessions', venue: 'Cúpula do Som', date: '20/11' },
]

const favoriteArtists = [
  { id: '1', name: 'Canindé', style: 'MPB', rating: 4.9 },
  { id: '2', name: 'Victoria Alencar', style: 'Sertanejo', rating: 4.7 },
  { id: '3', name: 'Oz Pretus', style: 'Regional', rating: 4.8 },
]

export function UserDashboard() {
  const { logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'eventos' | 'favoritos' | 'config'>('eventos')

  return (
    <div className="space-y-8">
      {/* Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-16 z-40 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-xl">
        <div className="flex gap-6 overflow-x-auto no-scrollbar">
          {[
            { id: 'eventos', icon: Calendar, label: 'Eventos' },
            { id: 'favoritos', icon: Heart, label: 'Favoritos' },
            { id: 'config', icon: Settings, label: 'Configurações' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {/* Eventos */}
        {activeTab === 'eventos' && (
          <FadeIn>
            <h2 className="heading-3 mb-6">Eventos Recentes</h2>
            <StaggerContainer className="space-y-4">
              {recentEvents.map(event => (
                <StaggerItem key={event.id}>
                  <Link
                    href={`/eventos/${event.id}`}
                    className="card-interactive p-4 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-slate-500">{event.artist} • {event.venue}</p>
                    </div>
                    <div className="text-sm text-slate-400">{event.date}</div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {recentEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhum evento recente</p>
              </div>
            )}
          </FadeIn>
        )}

        {/* Favoritos */}
        {activeTab === 'favoritos' && (
          <FadeIn>
            <h2 className="heading-3 mb-6">Artistas Favoritos</h2>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favoriteArtists.map(artist => (
                <StaggerItem key={artist.id}>
                  <Link
                    href={`/artistas/${artist.id}`}
                    className="card-interactive p-4 flex items-center gap-4"
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-amber-500 rounded-full flex items-center justify-center">
                      <Mic2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{artist.name}</h3>
                      <p className="text-sm text-slate-500">{artist.style}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{artist.rating}</span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {favoriteArtists.length === 0 && (
              <div className="text-center py-12">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">Nenhum artista favorito</p>
              </div>
            )}
          </FadeIn>
        )}

        {/* Configurações */}
        {activeTab === 'config' && (
          <FadeIn>
            <h2 className="heading-3 mb-6">Configurações</h2>
            <div className="space-y-4 max-w-2xl">
              <div className="card-base p-4">
                <h3 className="font-semibold mb-4">Conta</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between py-2 text-left hover:text-red-600 transition-colors">
                    <span>Editar perfil</span>
                    <span className="text-slate-400">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between py-2 text-left hover:text-red-600 transition-colors">
                    <span>Alterar senha</span>
                    <span className="text-slate-400">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between py-2 text-left hover:text-red-600 transition-colors">
                    <span>Notificações</span>
                    <span className="text-slate-400">→</span>
                  </button>
                </div>
              </div>

              <div className="card-base p-4">
                <h3 className="font-semibold mb-4">Preferências</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between py-2 text-left hover:text-red-600 transition-colors">
                    <span>Estilos musicais favoritos</span>
                    <span className="text-slate-400">→</span>
                  </button>
                  <button className="w-full flex items-center justify-between py-2 text-left hover:text-red-600 transition-colors">
                    <span>Bairros preferidos</span>
                    <span className="text-slate-400">→</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => logout()}
                className="w-full flex items-center justify-center gap-2 py-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sair da conta
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}
