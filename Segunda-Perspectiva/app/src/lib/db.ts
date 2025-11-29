// EventosFSA - Conexão com Banco de Dados
// Prisma 7 com adapter para SQLite
import { PrismaClient } from '@prisma/client'

// Singleton pattern para evitar múltiplas instâncias em dev
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// Criar cliente Prisma com adapter
function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
