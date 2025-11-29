'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Calendar, Mic2, Heart, Settings, LogOut, Bell, Star, MapPin, Clock } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import Link from 'next/link'

// Mock data
const mockUser = {
  name: 'João Silva',
  email: 'joao@email.com',
  avatar: null,
  memberSince: '2025-01-15',
  favoriteArtists: 8,
  eventsAttended: 23,
  tipsGiven: 15,
}

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

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState<'eventos' | 'favoritos' | 'config'>('eventos')
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <Header />
        <div className="min-h-[80vh] flex items-center justify-center">
          <FadeIn>
            <div className="text-center">
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-slate-400" />
              </div>
              <h1 className="heading-2 mb-4">Faça login para continuar</h1>
              <p className="text-slate-500 mb-8">Acesse sua conta para ver seu perfil</p>
              <div className="flex gap-4 justify-center">
                <Link href="/login" className="btn-primary">
                  Fazer login
                </Link>
                <Link href="/cadastro" className="btn-secondary">
                  Criar conta
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
        <BottomNav />
      </div>
    )
  }

  return (
    <div className="page-container">
      <Header />

      {/* Profile Header */}
      <section className="pt-24 pb-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container-custom">
          <FadeIn>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white text-3xl font-bold">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-white mb-1">{mockUser.name}</h1>
                <p className="text-slate-400 mb-4">{mockUser.email}</p>
                <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{mockUser.eventsAttended}</div>
                    <div className="text-slate-400">Eventos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{mockUser.favoriteArtists}</div>
                    <div className="text-slate-400">Favoritos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{mockUser.tipsGiven}</div>
                    <div className="text-slate-400">Gorjetas</div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="sm:ml-auto flex gap-2">
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <Bell className="w-5 h-5 text-white" />
                </button>
                <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                  <Settings className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex gap-6">
            {[
              { id: 'eventos', icon: Calendar, label: 'Eventos' },
              { id: 'favoritos', icon: Heart, label: 'Favoritos' },
              { id: 'config', icon: Settings, label: 'Configurações' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 transition-colors ${
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
      </section>

      {/* Tab Content */}
      <section className="py-8">
        <div className="container-custom">
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
              <div className="space-y-4">
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
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sair da conta
                </button>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
