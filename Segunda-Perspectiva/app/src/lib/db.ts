// EventosFSA - Módulo de Dados
// Modo: Demo/Estático para GitHub Pages
// Para produção com banco real, usar a branch 'production' com Prisma

/**
 * Este arquivo é um placeholder para compatibilidade.
 * Em modo demo/estático (GitHub Pages), usamos dados mockados via Zustand.
 * Para backend real, veja: /backend/src/database/index.js
 */

// Mock do cliente para compatibilidade de imports
const mockPrisma = {
  $connect: async () => console.log('[Demo] Prisma connect simulado'),
  $disconnect: async () => console.log('[Demo] Prisma disconnect simulado'),
  user: { findMany: async () => [], findUnique: async () => null },
  artist: { findMany: async () => [], findUnique: async () => null },
  venue: { findMany: async () => [], findUnique: async () => null },
  event: { findMany: async () => [], findUnique: async () => null },
  session: { create: async () => null, findUnique: async () => null, delete: async () => null, deleteMany: async () => null },
}

export const prisma = mockPrisma
export default prisma
