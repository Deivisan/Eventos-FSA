import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatar moeda brasileira
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// Formatar data
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(d)
}

// Formatar horário
export function formatTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(d)
}

// Gerar iniciais do nome
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Truncar texto
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Gerar URL do WhatsApp
export function generateWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, '')
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/55${cleanPhone}?text=${encodedMessage}`
}

// Gerar link do PIX (mock)
export function generatePixUrl(artistName: string, amount: number): string {
  return `pix://pagamento?nome=${encodeURIComponent(artistName)}&valor=${amount}`
}

// Array de estilos musicais
export const musicStyles = [
  'MPB',
  'Sertanejo',
  'Forró',
  'Pagode',
  'Rock',
  'Pop',
  'Jazz',
  'Bossa Nova',
  'Axé',
  'Reggae',
  'Samba',
  'Blues',
  'Eletrônica',
  'Hip Hop'
]

// Array de bairros de Feira de Santana
export const neighborhoods = [
  'Centro',
  'Ponto Central',
  'Cidade Nova',
  'Santa Mônica',
  'Mangabeira',
  'Capuchinhos',
  'São João',
  'Parque Ipê',
  'SIM',
  'Tomba',
  'Sobradinho',
  'Queimadinha',
  'Campo Limpo',
  'Gabriela',
  'Brasília'
]

// Tipos de estabelecimento
export const establishmentTypes = [
  'Bar',
  'Restaurante',
  'Pub',
  'Casa de Show',
  'Choperia',
  'Hamburgueria',
  'Pizzaria',
  'Lounge',
  'Café',
  'Espaço de Eventos'
]
