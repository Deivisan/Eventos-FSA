'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Mic2, 
  ArrowRight, 
  User,
  Phone,
  MapPin,
  Music,
  Beer,
  Check
} from 'lucide-react'
import { FadeIn } from '@/components/animations'

type UserType = 'artista' | 'estabelecimento' | 'publico'

export default function CadastroPage() {
  const searchParams = useSearchParams()
  const tipoParam = searchParams.get('tipo') as UserType | null

  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<UserType>(tipoParam || 'publico')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Artista specific
    artistName: '',
    musicStyle: '',
    // Estabelecimento specific
    venueName: '',
    venueType: '',
    neighborhood: '',
    address: '',
  })

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('Cadastro:', { userType, ...formData })
    setIsLoading(false)
    setStep(3) // Success step
  }

  const userTypes = [
    { 
      id: 'publico' as UserType, 
      icon: User, 
      title: 'Público', 
      description: 'Descobrir eventos e apoiar artistas',
      color: 'from-blue-600 to-blue-500'
    },
    { 
      id: 'artista' as UserType, 
      icon: Mic2, 
      title: 'Artista', 
      description: 'Receber propostas e gorjetas',
      color: 'from-red-600 to-red-500'
    },
    { 
      id: 'estabelecimento' as UserType, 
      icon: Beer, 
      title: 'Estabelecimento', 
      description: 'Contratar artistas e divulgar eventos',
      color: 'from-amber-600 to-amber-500'
    },
  ]

  const musicStyles = ['MPB', 'Sertanejo', 'Forró', 'Rock', 'Pagode', 'Jazz', 'Reggae', 'Pop', 'Samba', 'Eletrônica']
  const venueTypes = ['Bar', 'Restaurante', 'Pub', 'Casa de Show', 'Lounge', 'Espaço de Eventos']
  const neighborhoods = ['Centro', 'Ponto Central', 'Cidade Nova', 'Santa Mônica', 'Mangabeira', 'SIM', 'Tomba', 'Capuchinhos']

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <FadeIn>
          <Link href="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
              <Mic2 className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">EventosFSA</span>
          </Link>
        </FadeIn>

        {/* Progress */}
        {step < 3 && (
          <FadeIn delay={0.1}>
            <div className="flex items-center justify-center gap-4 mb-8">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 2 && (
                    <div className={`w-16 h-1 rounded-full transition-colors ${
                      step > s ? 'bg-red-600' : 'bg-slate-200 dark:bg-slate-800'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {/* Step 1: Choose Type */}
        {step === 1 && (
          <FadeIn>
            <div className="card-base p-8">
              <h1 className="heading-2 text-center mb-2">Criar conta</h1>
              <p className="text-slate-500 dark:text-slate-400 text-center mb-8">
                Escolha seu perfil para continuar
              </p>

              <div className="grid gap-4 mb-8">
                {userTypes.map((type) => {
                  const Icon = type.icon
                  const isSelected = userType === type.id
                  
                  return (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setUserType(type.id)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected 
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{type.title}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{type.description}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-red-500 bg-red-500' : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full justify-center py-4"
              >
                Continuar
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>

              <p className="text-center text-slate-500 dark:text-slate-400 mt-6">
                Já tem uma conta?{' '}
                <Link href="/login" className="text-red-600 font-medium hover:underline">
                  Fazer login
                </Link>
              </p>
            </div>
          </FadeIn>
        )}

        {/* Step 2: Form */}
        {step === 2 && (
          <FadeIn>
            <div className="card-base p-8">
              <button
                onClick={() => setStep(1)}
                className="text-slate-500 hover:text-slate-700 mb-4 text-sm flex items-center gap-1"
              >
                ← Voltar
              </button>

              <h1 className="heading-2 mb-2">
                {userType === 'artista' && 'Cadastro de Artista'}
                {userType === 'estabelecimento' && 'Cadastro de Estabelecimento'}
                {userType === 'publico' && 'Criar sua conta'}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Preencha seus dados para continuar
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Common fields */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateForm('name', e.target.value)}
                      placeholder="Seu nome"
                      required
                      className="input-base pl-12"
                    />
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      E-mail
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className="input-base pl-12"
                      />
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Telefone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        placeholder="(75) 99999-9999"
                        required
                        className="input-base pl-12"
                      />
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Artista specific */}
                {userType === 'artista' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Nome artístico
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.artistName}
                          onChange={(e) => updateForm('artistName', e.target.value)}
                          placeholder="Como você quer ser conhecido"
                          required
                          className="input-base pl-12"
                        />
                        <Mic2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Estilo musical principal
                      </label>
                      <div className="relative">
                        <select
                          value={formData.musicStyle}
                          onChange={(e) => updateForm('musicStyle', e.target.value)}
                          required
                          className="input-base pl-12 appearance-none"
                        >
                          <option value="">Selecione...</option>
                          {musicStyles.map(style => (
                            <option key={style} value={style}>{style}</option>
                          ))}
                        </select>
                        <Music className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </>
                )}

                {/* Estabelecimento specific */}
                {userType === 'estabelecimento' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Nome do estabelecimento
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.venueName}
                          onChange={(e) => updateForm('venueName', e.target.value)}
                          placeholder="Nome do seu bar/restaurante"
                          required
                          className="input-base pl-12"
                        />
                        <Beer className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Tipo
                        </label>
                        <select
                          value={formData.venueType}
                          onChange={(e) => updateForm('venueType', e.target.value)}
                          required
                          className="input-base appearance-none"
                        >
                          <option value="">Selecione...</option>
                          {venueTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Bairro
                        </label>
                        <select
                          value={formData.neighborhood}
                          onChange={(e) => updateForm('neighborhood', e.target.value)}
                          required
                          className="input-base appearance-none"
                        >
                          <option value="">Selecione...</option>
                          {neighborhoods.map(n => (
                            <option key={n} value={n}>{n}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Endereço
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => updateForm('address', e.target.value)}
                          placeholder="Rua, número, complemento"
                          required
                          className="input-base pl-12"
                        />
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                  </>
                )}

                {/* Password fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={(e) => updateForm('password', e.target.value)}
                        placeholder="••••••••"
                        required
                        minLength={6}
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
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Confirmar senha
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={(e) => updateForm('confirmPassword', e.target.value)}
                        placeholder="••••••••"
                        required
                        className="input-base pl-12"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Li e aceito os{' '}
                    <Link href="/termos" className="text-red-600 hover:underline">Termos de Uso</Link>
                    {' '}e a{' '}
                    <Link href="/privacidade" className="text-red-600 hover:underline">Política de Privacidade</Link>
                  </span>
                </label>

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
                      Criar conta
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </FadeIn>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <FadeIn>
            <div className="card-base p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Check className="w-10 h-10 text-green-600" />
              </motion.div>

              <h1 className="heading-2 mb-2">Conta criada!</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                {userType === 'artista' && 'Seu perfil de artista foi criado. Comece a receber propostas!'}
                {userType === 'estabelecimento' && 'Seu estabelecimento foi cadastrado. Contrate artistas agora!'}
                {userType === 'publico' && 'Sua conta foi criada. Descubra eventos incríveis!'}
              </p>

              <div className="space-y-3">
                <Link href="/" className="btn-primary w-full justify-center py-4">
                  Ir para o início
                </Link>
                <Link href={
                  userType === 'artista' ? '/artista/dashboard' :
                  userType === 'estabelecimento' ? '/estabelecimento/dashboard' :
                  '/eventos'
                } className="btn-secondary w-full justify-center py-4">
                  Acessar painel
                </Link>
              </div>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  )
}
