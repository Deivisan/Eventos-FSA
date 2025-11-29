'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic2, Calendar, DollarSign, TrendingUp, Users, 
  Settings, Edit, MessageCircle, Star, Clock, MapPin 
} from 'lucide-react'
import { StatsCard } from '@/components/ui'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { formatCurrency } from '@/lib/utils'

// Mock Data
const artistStats = {
  totalShows: 156,
  totalTips: 15420.50,
  followers: 12500,
  ranking: 1,
  rating: 4.9,
  views: 45000
}

const upcomingShows = [
  { id: '1', title: 'Noite de MPB', venue: 'Boteco Central', date: '30/11', time: '20h', status: 'confirmed' },
  { id: '2', title: 'Samba Raiz', venue: 'Recanto do Samba', date: '01/12', time: '16h', status: 'confirmed' },
  { id: '3', title: 'Happy Hour', venue: 'Vila do Malte', date: '05/12', time: '18h', status: 'pending' },
]

const recentTips = [
  { id: '1', amount: 50, message: 'Manda muito!', sender: 'Carlos A.', time: 'Há 2h' },
  { id: '2', amount: 20, message: 'Toca Raul!', sender: 'Ana P.', time: 'Há 3h' },
  { id: '3', amount: 100, message: 'Parabéns pelo show', sender: 'Marcos S.', time: 'Ontem' },
]

const proposals = [
  { id: '1', venue: 'Seu Zé Lounge', date: '10/12', offer: 800, status: 'new' },
  { id: '2', venue: 'Caspershow', date: '15/12', offer: 1200, status: 'new' },
]

export function ArtistDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'agenda' | 'tips' | 'proposals'>('overview')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="heading-2">Painel do Artista</h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gerencie sua carreira e acompanhe seus resultados
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">
            <Settings className="w-5 h-5 mr-2" />
            Configurações
          </button>
          <button className="btn-primary">
            <Edit className="w-5 h-5 mr-2" />
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Mic2 className="w-6 h-6" />}
          value={artistStats.totalShows}
          label="Shows Realizados"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          value={formatCurrency(artistStats.totalTips)}
          label="Total em Gorjetas"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          value={(artistStats.followers / 1000).toFixed(1) + 'k'}
          label="Seguidores"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          icon={<TrendingUp className="w-6 h-6" />}
          value={`#${artistStats.ranking}`}
          label="Ranking Geral"
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Shows */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Próximos Shows</h2>
              <button className="text-red-600 hover:underline text-sm">Ver agenda completa</button>
            </div>
            <div className="space-y-4">
              {upcomingShows.map((show) => (
                <div key={show.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex flex-col items-center justify-center text-red-600 dark:text-red-500">
                      <span className="text-xs font-bold">{show.date.split('/')[0]}</span>
                      <span className="text-[10px] uppercase">{show.date.split('/')[1] === '11' ? 'NOV' : 'DEZ'}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{show.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {show.venue}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {show.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    show.status === 'confirmed' 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400'
                  }`}>
                    {show.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Tips */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Últimas Gorjetas</h2>
              <button className="text-red-600 hover:underline text-sm">Ver extrato</button>
            </div>
            <div className="space-y-4">
              {recentTips.map((tip) => (
                <div key={tip.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-500">
                      <DollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-600 dark:text-green-400">
                        {formatCurrency(tip.amount)}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        de {tip.sender} • {tip.time}
                      </div>
                    </div>
                  </div>
                  {tip.message && (
                    <div className="hidden sm:block px-4 py-2 rounded-lg bg-white dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-300 italic">
                      "{tip.message}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-8">
          {/* Proposals */}
          <div className="card-base p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white border-none">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-amber-400" />
                Propostas
              </h2>
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                {proposals.length} novas
              </span>
            </div>
            <div className="space-y-4">
              {proposals.map((proposal) => (
                <div key={proposal.id} className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{proposal.venue}</h3>
                    <span className="text-amber-400 font-bold">{formatCurrency(proposal.offer)}</span>
                  </div>
                  <div className="text-sm text-slate-300 mb-4">
                    Data: {proposal.date}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="py-2 rounded-lg bg-green-600 hover:bg-green-500 text-sm font-medium transition-colors">
                      Aceitar
                    </button>
                    <button className="py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">
                      Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Status */}
          <div className="card-base p-6">
            <h3 className="font-semibold mb-4">Status do Perfil</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Completude</span>
                  <span className="font-medium text-green-600">95%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[95%]" />
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Star className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">Avaliação Média</div>
                  <div>4.9 (150 avaliações)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
