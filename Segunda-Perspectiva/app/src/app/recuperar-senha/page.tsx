'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/animations'
import { useToast } from '@/components/toast'

type Step = 'email' | 'sent'

export default function RecuperarSenhaPage() {
  const [step, setStep] = useState<Step>('email')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      addToast({ type: 'error', title: 'Email obrigatório', message: 'Digite seu email para recuperar a senha.' })
      return
    }

    setLoading(true)
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    setStep('sent')
    addToast({ type: 'success', title: 'Email enviado!', message: 'Verifique sua caixa de entrada.' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <FadeIn>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-red-600">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              EventosFSA
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 border border-slate-100 dark:border-slate-700">
            {step === 'email' ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-amber-600" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Recuperar Senha</h1>
                  <p className="text-slate-500 dark:text-slate-400">
                    Digite seu email e enviaremos instruções para criar uma nova senha.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      className="input-base"
                      disabled={loading}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary w-full justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Enviar Link de Recuperação
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-4">Email Enviado!</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-6">
                  Enviamos um link de recuperação para <strong className="text-slate-700 dark:text-slate-300">{email}</strong>.
                  <br /><br />
                  Verifique sua caixa de entrada e spam.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => setStep('email')}
                    className="btn-secondary w-full justify-center"
                  >
                    Usar outro email
                  </button>
                </div>
              </div>
            )}

            {/* Back to Login */}
            <div className="mt-6 text-center">
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </Link>
            </div>
          </div>

          {/* Demo Note */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            🎭 <strong>Versão Demo:</strong> Nenhum email será realmente enviado.
          </p>
        </motion.div>
      </FadeIn>
    </div>
  )
}
