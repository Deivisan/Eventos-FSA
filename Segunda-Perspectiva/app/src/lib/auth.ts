// EventosFSA - Utilitários de Autenticação
import { cookies } from 'next/headers'
import prisma from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'eventosfsa-secret-2024'

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

// Criar sessão
export async function createSession(userId: string): Promise<string> {
  const token = generateToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
  
  await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  })
  
  return token
}

// Verificar sessão
export async function verifySession(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  })
  
  if (!session) return null
  if (session.expiresAt < new Date()) {
    await prisma.session.delete({ where: { id: session.id } })
    return null
  }
  
  return session.user
}

// Obter usuário atual
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  
  if (!token) return null
  return verifySession(token)
}

// Invalidar sessão
export async function invalidateSession(token: string) {
  await prisma.session.deleteMany({
    where: { token }
  })
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
