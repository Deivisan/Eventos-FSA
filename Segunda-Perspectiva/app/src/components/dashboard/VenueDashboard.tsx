'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Beer, Calendar, Users, TrendingUp, Search, 
  Plus, Settings, Edit, Star, MapPin, Clock, Mic2 
} from 'lucide-react'
import { StatsCard } from '@/components/ui'
import { FadeIn } from '@/components/animations'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

// Mock Data
const venueStats = {
  totalEvents: 45,
  totalArtists: 28,
  avgAttendance: 120,
  rating: 4.8,
  views: 12500
}

const upcomingEvents = [
  { id: '1', title: 'Sexta do Rock', artist: 'Banda Feira Viva', date: '01/12', time: '21h', status: 'confirmed' },
  { id: '2', title: 'Sábado Sertanejo', artist: 'Victoria Alencar', date: '02/12', time: '20h', status: 'confirmed' },
  { id: '3', title: 'Domingo no Deck', artist: 'Pendente', date: '03/12', time: '16h', status: 'open' },
]

const recommendedArtists = [
  { id: '1', name: 'Canindé', style: 'MPB', rating: 4.9, price: 1500 },
  { id: '2', name: 'Oz Pretus', style: 'Regional', rating: 4.8, price: 1200 },
  { id: '3', name: 'Trio Nordestino', style: 'Forró', rating: 4.7, price: 1000 },
]

export function VenueDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="heading-2">Painel do Estabelecimento</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gerencie seus eventos e contrate artistas
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/eventos/novo" className="btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Criar Evento
          </Link>
          <button className="btn-secondary">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Calendar className="w-6 h-6" />}
          value={venueStats.totalEvents}
          label="Eventos Realizados"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          value={venueStats.avgAttendance}
          label="Média de Público"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          icon={<Mic2 className="w-6 h-6" />}
          value={venueStats.totalArtists}
          label="Artistas Contratados"
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard
          icon={<Star className="w-6 h-6" />}
          value={venueStats.rating}
          label="Avaliação Média"
          trend={{ value: 0.1, isPositive: true }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Events */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Próximos Eventos</h2>
              <Link href="/eventos" className="text-red-600 hover:underline text-sm">Ver todos</Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex flex-col items-center justify-center text-amber-600 dark:text-amber-500">
                      <span className="text-xs font-bold">{event.date.split('/')[0]}</span>
                      <span className="text-[10px] uppercase">{event.date.split('/')[1] === '11' ? 'NOV' : 'DEZ'}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Mic2 className="w-3 h-3" />
                          {event.artist}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  {event.status === 'open' ? (
                    <button className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors">
                      Contratar Artista
                    </button>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400">
                      Confirmado
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Find Artists */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Artistas Recomendados</h2>
              <Link href="/artistas" className="text-red-600 hover:underline text-sm">Buscar mais</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedArtists.map((artist) => (
                <div key={artist.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-500 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      <Mic2 className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold group-hover:text-red-600 transition-colors">{artist.name}</h4>
                      <p className="text-xs text-slate-500">{artist.style}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{artist.rating}</span>
                    </div>
                    <div className="font-medium text-green-600">
                      ~{formatCurrency(artist.price)}
                    </div>
                  </div>
                  <button className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-red-600 hover:text-white text-sm font-medium transition-colors">
                    Ver Perfil
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="card-base p-6">
            <h3 className="font-semibold mb-4">Ações Rápidas</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="font-medium">Novo Evento</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Search className="w-4 h-4" />
                </div>
                <span className="font-medium">Buscar Artistas</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                  <Edit className="w-4 h-4" />
                </div>
                <span className="font-medium">Editar Cardápio</span>
              </button>
            </div>
          </div>

          {/* Profile Status */}
          <div className="card-base p-6">
            <h3 className="font-semibold mb-4">Visibilidade</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-medium text-green-700 dark:text-green-400">Perfil Ativo</span>
                </div>
                <span className="text-xs text-green-600 dark:text-green-500">Visível</span>
              </div>
              
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Seu estabelecimento apareceu em <strong className="text-slate-900 dark:text-white">12.5k</strong> buscas este mês.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
