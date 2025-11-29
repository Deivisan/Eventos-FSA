// EventosFSA - Utilitários de Autenticação
// Modo: Demo/Estático para GitHub Pages
// Autenticação real é feita via Zustand store (lib/store.ts)

/**
 * Este arquivo fornece utilitários de autenticação para modo demo.
 * Em produção com backend real, usar API routes do Next.js ou backend separado.
 */

// Simples hash para demo (em produção usar bcrypt)
export function hashPassword(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return `hash_${Math.abs(hash).toString(16)}_${password.length}`
}

export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash
}

// Gerar token simples
export function generateToken(): string {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
}

// Criar sessão (modo demo - armazenado no Zustand/localStorage)
export async function createSession(userId: string): Promise<string> {
  const token = generateToken()
  // Em modo demo, sessão é gerenciada pelo Zustand store
  console.log('[Demo] Sessão criada para:', userId)
  return token
}

// Verificar sessão (modo demo)
export async function verifySession(token: string) {
  // Em modo demo, verificação é feita pelo Zustand store
  console.log('[Demo] Verificando sessão:', token?.substring(0, 20) + '...')
  return null // Zustand gerencia o estado
}

// Obter usuário atual (modo demo)
export async function getCurrentUser() {
  // Em modo demo, usuário é obtido do Zustand store
  console.log('[Demo] getCurrentUser - use useAuthStore() no client')
  return null
}

// Invalidar sessão (modo demo)
export async function invalidateSession(token: string) {
  console.log('[Demo] Sessão invalidada')
}

// Tipo de usuário para respostas
export type SafeUser = {
  id: string
  email: string
  name: string
  phone: string | null
  avatar: string | null
  role: string
  isActive: boolean
  createdAt: Date
}

export function sanitizeUser(user: any): SafeUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    avatar: user.avatar,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt
  }
}
