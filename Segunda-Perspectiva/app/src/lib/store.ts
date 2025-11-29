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
  isAuthenticated: boolean
  
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

// Dados de demo para login offline
const demoUsers: Record<string, { password: string; user: User }> = {
  'admin@eventosfsa.com': {
    password: 'admin123',
    user: { id: '1', email: 'admin@eventosfsa.com', name: 'Admin EventosFSA', phone: null, avatar: null, role: 'admin', isActive: true, createdAt: new Date().toISOString() }
  },
  'joao.musico@email.com': {
    password: 'artista123',
    user: { id: '2', email: 'joao.musico@email.com', name: 'João Viola', phone: '75988881111', avatar: null, role: 'artist', isActive: true, createdAt: new Date().toISOString() }
  },
  'maria.cantora@email.com': {
    password: 'artista123',
    user: { id: '3', email: 'maria.cantora@email.com', name: 'Maria Voz', phone: '75988882222', avatar: null, role: 'artist', isActive: true, createdAt: new Date().toISOString() }
  },
  'contato@botecocentral.com': {
    password: 'venue123',
    user: { id: '4', email: 'contato@botecocentral.com', name: 'Boteco Central', phone: '7536234567', avatar: null, role: 'venue', isActive: true, createdAt: new Date().toISOString() }
  },
  'user@email.com': {
    password: 'user123',
    user: { id: '5', email: 'user@email.com', name: 'Usuário Teste', phone: '75988889999', avatar: null, role: 'user', isActive: true, createdAt: new Date().toISOString() }
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      get isAuthenticated() {
        const state = get()
        return !!(state.user && state.token)
      },

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      logout: () => {
        set({ user: null, token: null, error: null })
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null })
        
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Para Beta Público, usar apenas login offline
        const demoUser = demoUsers[email.toLowerCase()]
        
        if (!demoUser) {
          set({ error: 'Email não encontrado. Use uma conta de demo.', isLoading: false })
          return false
        }
        
        if (demoUser.password !== password) {
          set({ error: 'Senha incorreta', isLoading: false })
          return false
        }
        
        const token = `demo_${Date.now()}_${Math.random().toString(36).substring(2)}`
        
        set({ 
          user: demoUser.user, 
          token, 
          isLoading: false,
          error: null 
        })
        return true
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null })
        
        // Simular delay de rede
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Verificar se email já existe nos demos
        if (demoUsers[data.email.toLowerCase()]) {
          set({ error: 'Este email já está cadastrado', isLoading: false })
          return false
        }
        
        // Criar novo usuário (simulado)
        const newUser: User = {
          id: `new_${Date.now()}`,
          email: data.email,
          name: data.name,
          phone: data.phone || null,
          avatar: null,
          role: data.role || 'user',
          isActive: true,
          createdAt: new Date().toISOString()
        }
        
        const token = `new_${Date.now()}_${Math.random().toString(36).substring(2)}`
        
        set({ 
          user: newUser, 
          token, 
          isLoading: false,
          error: null 
        })
        return true
      },

      checkAuth: async () => {
        const { token, user } = get()
        if (!token || !user) {
          set({ user: null, token: null })
        }
        // Em modo demo, manter usuário logado
      }
    }),
    {
      name: 'eventosfsa-auth',
      partialize: (state) => ({ 
        token: state.token,
        user: state.user 
      })
    }
  )
)

export default useAuthStore
