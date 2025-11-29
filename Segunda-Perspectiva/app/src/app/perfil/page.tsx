'use client'

import { useEffect } from 'react'
import { User, Bell, Settings } from 'lucide-react'
import { Header, BottomNav, Footer } from '@/components/layout'
import { FadeIn } from '@/components/animations'
import Link from 'next/link'
import useAuthStore from '@/lib/store'
import { useRouter } from 'next/navigation'
import { ArtistDashboard } from '@/components/dashboard/ArtistDashboard'
import { VenueDashboard } from '@/components/dashboard/VenueDashboard'
import { UserDashboard } from '@/components/dashboard/UserDashboard'
import { AdminDashboard } from '@/components/dashboard/AdminDashboard'

export default function PerfilPage() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && !user) {
      // router.push('/login') // Comentado para permitir visualização sem login durante dev
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    )
  }

  if (!user) {
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
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold bg-gradient-to-br ${
                user.role === 'artist' ? 'from-red-600 to-red-500' :
                user.role === 'venue' ? 'from-amber-600 to-amber-500' :
                user.role === 'admin' ? 'from-purple-600 to-purple-500' :
                'from-blue-600 to-blue-500'
              }`}>
                {user.name.charAt(0)}
              </div>

              {/* Info */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl font-bold text-white mb-1">{user.name}</h1>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${
                    user.role === 'artist' ? 'border-red-500 text-red-400' :
                    user.role === 'venue' ? 'border-amber-500 text-amber-400' :
                    user.role === 'admin' ? 'border-purple-500 text-purple-400' :
                    'border-blue-500 text-blue-400'
                  }`}>
                    {user.role === 'artist' ? 'Artista' :
                     user.role === 'venue' ? 'Estabelecimento' :
                     user.role === 'admin' ? 'Administrador' :
                     'Usuário'}
                  </span>
                </div>
                <p className="text-slate-400 mb-4">{user.email}</p>
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

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container-custom">
          {user.role === 'artist' && <ArtistDashboard />}
          {user.role === 'venue' && <VenueDashboard />}
          {user.role === 'user' && <UserDashboard />}
          {user.role === 'admin' && <AdminDashboard />}
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  )
}
