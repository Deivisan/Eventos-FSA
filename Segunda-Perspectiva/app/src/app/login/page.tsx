'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, Mic2, ArrowRight, User, Chrome } from 'lucide-react'
import { FadeIn } from '@/components/animations'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simular login
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Login:', { email, password, rememberMe })
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <FadeIn>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
                <Mic2 className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">EventosFSA</span>
            </Link>

            <h1 className="heading-2 mb-2">Bem-vindo de volta!</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">
              Entre na sua conta para continuar
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  E-mail
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="input-base pl-12"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="input-base pl-12 pr-12"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">Lembrar de mim</span>
                </label>
                <Link href="/recuperar-senha" className="text-sm text-red-600 hover:underline">
                  Esqueci a senha
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full justify-center py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Entrar
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </FadeIn>

          <FadeIn delay={0.2}>
            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-slate-950 text-slate-500">ou continue com</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-secondary justify-center py-3">
                <Chrome className="w-5 h-5 mr-2 text-red-500" />
                Google
              </button>
              <button className="btn-secondary justify-center py-3">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Facebook
              </button>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            {/* Register Link */}
            <p className="text-center text-slate-500 dark:text-slate-400 mt-8">
              Não tem uma conta?{' '}
              <Link href="/cadastro" className="text-red-600 font-medium hover:underline">
                Cadastre-se grátis
              </Link>
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Right Panel - Image/Gradient */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-red-500 to-amber-500" />
        <div className="absolute inset-0 bg-mesh opacity-30" />
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Mic2 className="w-24 h-24 mb-8 opacity-80" />
            <h2 className="text-4xl font-bold mb-4">
              A música ao vivo de FSA
            </h2>
            <p className="text-xl text-white/80 max-w-md">
              Conectando artistas, estabelecimentos e amantes da boa música desde 2025.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold">500+</div>
                <div className="text-white/70">Artistas</div>
              </div>
              <div>
                <div className="text-4xl font-bold">150+</div>
                <div className="text-white/70">Bares</div>
              </div>
              <div>
                <div className="text-4xl font-bold">2k+</div>
                <div className="text-white/70">Eventos/mês</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
