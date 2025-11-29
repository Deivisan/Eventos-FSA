'use client'

import { useState } from 'react'
import { 
  Users, Calendar, DollarSign, TrendingUp, 
  CheckCircle, XCircle, AlertTriangle, Activity,
  BarChart3, Shield
} from 'lucide-react'
import { StatsCard } from '@/components/ui'
import { formatCurrency } from '@/lib/utils'

// Mock Data
const adminStats = {
  totalUsers: 1250,
  totalArtists: 320,
  totalVenues: 85,
  totalEvents: 450,
  revenue: 15420.50,
  pendingApprovals: 12
}

const pendingApprovals = [
  { id: '1', name: 'Bar do Zé', type: 'venue', date: 'Hoje', status: 'pending' },
  { id: '2', name: 'Ana Cantora', type: 'artist', date: 'Ontem', status: 'pending' },
  { id: '3', name: 'Restaurante Sabor', type: 'venue', date: '28/11', status: 'pending' },
  { id: '4', name: 'Banda Rock', type: 'artist', date: '27/11', status: 'pending' },
]

const recentActivity = [
  { id: '1', action: 'Novo cadastro', user: 'João Silva', time: 'Há 5 min' },
  { id: '2', action: 'Evento criado', user: 'Bar do Zé', time: 'Há 15 min' },
  { id: '3', action: 'Gorjeta enviada', user: 'Maria S.', amount: 50, time: 'Há 1h' },
]

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-2 flex items-center gap-2">
            <Shield className="w-8 h-8 text-red-600" />
            Painel Administrativo
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Visão geral do sistema e moderação
          </p>
        </div>
        <div className="flex gap-3">
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400 text-sm font-medium flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Sistema Online
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={<Users className="w-6 h-6" />}
          value={adminStats.totalUsers}
          label="Usuários Totais"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          icon={<Calendar className="w-6 h-6" />}
          value={adminStats.totalEvents}
          label="Eventos Criados"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          icon={<DollarSign className="w-6 h-6" />}
          value={formatCurrency(adminStats.revenue)}
          label="Receita Total"
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          icon={<AlertTriangle className="w-6 h-6" />}
          value={adminStats.pendingApprovals}
          label="Aprovações Pendentes"
          trend={{ value: 4, isPositive: false }} // Negative because pending is bad? Or just count.
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pending Approvals */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Aprovações Pendentes</h2>
              <button className="text-red-600 hover:underline text-sm">Ver todas</button>
            </div>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.type === 'artist' 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/20' 
                        : 'bg-amber-100 text-amber-600 dark:bg-amber-900/20'
                    }`}>
                      {item.type === 'artist' ? <Users className="w-5 h-5" /> : <Calendar className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {item.type === 'artist' ? 'Artista' : 'Estabelecimento'} • {item.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors">
                      <CheckCircle className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors">
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart (Mock) */}
          <div className="card-base p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="heading-3">Receita Mensal</h2>
              <BarChart3 className="w-5 h-5 text-slate-400" />
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-4">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div key={i} className="w-full bg-red-100 dark:bg-red-900/20 rounded-t-lg relative group">
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-lg transition-all duration-500 group-hover:bg-red-500"
                    style={{ height: `${h}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-slate-500">
              <span>Seg</span>
              <span>Ter</span>
              <span>Qua</span>
              <span>Qui</span>
              <span>Sex</span>
              <span>Sáb</span>
              <span>Dom</span>
            </div>
          </div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-8">
          {/* Recent Activity */}
          <div className="card-base p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Atividade Recente
            </h3>
            <div className="space-y-6 relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
              {recentActivity.map((activity) => (
                <div key={activity.id} className="relative pl-8">
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-blue-500" />
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-slate-500">
                    {activity.user} {activity.amount && `• ${formatCurrency(activity.amount)}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="card-base p-6">
            <h3 className="font-semibold mb-4">Saúde do Sistema</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">CPU Usage</span>
                  <span className="font-medium text-green-600">12%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[12%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Memory</span>
                  <span className="font-medium text-amber-600">45%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 w-[45%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Storage</span>
                  <span className="font-medium text-blue-600">28%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[28%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
