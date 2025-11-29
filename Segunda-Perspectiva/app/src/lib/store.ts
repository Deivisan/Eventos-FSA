// EventosFSA - Store de Autenticação
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
  id: string
  email: string
  name: string
  phone: string | null
  avatar: string | null
  role: string
  isActive: boolean
  createdAt: string
}

type AuthState = {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  
  // Actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  logout: () => void
  
  // API calls
  login: (email: string, password: string) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  checkAuth: () => Promise<void>
}

type RegisterData = {
  email: string
  password: string
  name: string
  phone?: string
  role?: string
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' })
        } catch (e) {
          console.error('Erro no logout:', e)
        }
        set({ user: null, token: null, error: null })
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          })
          
          const data = await res.json()
          
          if (!res.ok) {
            set({ error: data.error || 'Erro no login', isLoading: false })
            return false
          }
          
          set({ 
            user: data.user, 
            token: data.token, 
            isLoading: false,
            error: null 
          })
          return true
          
        } catch (error) {
          set({ error: 'Erro de conexão', isLoading: false })
          return false
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null })
        
        try {
          const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          })
          
          const result = await res.json()
          
          if (!res.ok) {
            set({ error: result.error || 'Erro no cadastro', isLoading: false })
            return false
          }
          
          set({ 
            user: result.user, 
            token: result.token, 
            isLoading: false,
            error: null 
          })
          return true
          
        } catch (error) {
          set({ error: 'Erro de conexão', isLoading: false })
          return false
        }
      },

      checkAuth: async () => {
        try {
          const res = await fetch('/api/auth/me')
          const data = await res.json()
          
          if (res.ok && data.user) {
            set({ user: data.user })
          } else {
            set({ user: null, token: null })
          }
        } catch (error) {
          console.error('Erro ao verificar auth:', error)
        }
      }
    }),
    {
      name: 'eventosfsa-auth',
      partialize: (state) => ({ token: state.token })
    }
  )
)

export default useAuthStore
