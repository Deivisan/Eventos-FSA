'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Clock, Heart, DollarSign, Mic2, Music } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { ScaleOnHover } from './animations'

// Event Card
interface EventCardProps {
  id: string
  title: string
  artist: string
  venue: string
  neighborhood: string
  date: string
  time: string
  imageUrl?: string
  style: string
  isLive?: boolean
}

export function EventCard({
  id,
  title,
  artist,
  venue,
  neighborhood,
  date,
  time,
  imageUrl,
  style,
  isLive = false
}: EventCardProps) {
  return (
    <Link href={`/eventos/${id}`}>
      <ScaleOnHover>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-interactive overflow-hidden group"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-purple-600/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <Music className="w-12 h-12 text-white/50" />
              </div>
            )}
            
            {/* Live Badge */}
            {isLive && (
              <div className="absolute top-3 left-3 badge-live flex items-center gap-1.5">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                AO VIVO
              </div>
            )}
            
            {/* Style Badge */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {style}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">
              {title}
            </h3>
            <p className="text-red-600 dark:text-red-500 font-medium mb-2 flex items-center gap-1.5">
              <Mic2 className="w-4 h-4" />
              {artist}
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {venue}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {time}
              </span>
            </div>
          </div>
        </motion.div>
      </ScaleOnHover>
    </Link>
  )
}

// Artist Card
interface ArtistCardProps {
  id: string
  name: string
  style: string
  rating: number
  totalShows: number
  imageUrl?: string
  isFavorite?: boolean
  ranking?: number
  onTip?: () => void
}

export function ArtistCard({
  id,
  name,
  style,
  rating,
  totalShows,
  imageUrl,
  isFavorite = false,
  ranking,
  onTip
}: ArtistCardProps) {
  return (
    <Link href={`/artistas/${id}`}>
      <ScaleOnHover>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-interactive overflow-hidden group relative"
        >
          {/* Ranking Badge */}
          {ranking && ranking <= 3 && (
            <div className={cn(
              "absolute top-3 left-3 z-10 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg",
              ranking === 1 && "bg-amber-500",
              ranking === 2 && "bg-slate-400",
              ranking === 3 && "bg-amber-700"
            )}>
              {ranking}º
            </div>
          )}

          {/* Favorite Button */}
          <button 
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 flex items-center justify-center shadow-lg"
            onClick={(e) => {
              e.preventDefault()
            }}
          >
            <Heart className={cn(
              "w-4 h-4 transition-colors",
              isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"
            )} />
          </button>

          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <Mic2 className="w-16 h-16 text-slate-400" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors">
              {name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              {style}
            </p>
            
            <div className="flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
                <span className="text-sm text-slate-400">({totalShows} shows)</span>
              </div>
              
              {/* Tip Button */}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onTip?.()
                }}
                className="btn-primary text-sm py-2 px-3 flex items-center gap-1"
              >
                <DollarSign className="w-4 h-4" />
                Gorjeta
              </button>
            </div>
          </div>
        </motion.div>
      </ScaleOnHover>
    </Link>
  )
}

// Venue Card
interface VenueCardProps {
  id: string
  name: string
  type: string
  neighborhood: string
  rating: number
  imageUrl?: string
  isLive?: boolean
  currentArtist?: string
}

export function VenueCard({
  id,
  name,
  type,
  neighborhood,
  rating,
  imageUrl,
  isLive = false,
  currentArtist
}: VenueCardProps) {
  return (
    <Link href={`/estabelecimentos/${id}`}>
      <ScaleOnHover>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-interactive overflow-hidden group"
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-red-600/20" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            
            {/* Live Indicator */}
            {isLive && (
              <div className="absolute top-3 left-3">
                <div className="badge-live flex items-center gap-1.5">
                  <div className="music-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  AO VIVO
                </div>
              </div>
            )}
            
            {/* Type Badge */}
            <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {type}
            </div>

            {/* Current Artist */}
            {isLive && currentArtist && (
              <div className="absolute bottom-3 left-3 right-3">
                <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2">
                  <Mic2 className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium truncate">{currentArtist}</span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {neighborhood}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </ScaleOnHover>
    </Link>
  )
}

// Tip Modal
interface TipModalProps {
  isOpen: boolean
  onClose: () => void
  artistName: string
  onConfirm: (amount: number) => void
}

export function TipModal({ isOpen, onClose, artistName, onConfirm }: TipModalProps) {
  const amounts = [10, 20, 50, 100]
  
  if (!isOpen) return null
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-6 sm:hidden" />
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="heading-3 mb-2">Enviar Gorjeta</h3>
          <p className="text-slate-500 dark:text-slate-400">
            Apoie <span className="font-semibold text-red-600">{artistName}</span>
          </p>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => onConfirm(amount)}
              className="py-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 font-semibold transition-colors"
            >
              {formatCurrency(amount)}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full btn-secondary"
        >
          Cancelar
        </button>
      </motion.div>
    </motion.div>
  )
}

// Stats Card
interface StatsCardProps {
  icon: React.ReactNode
  value: string | number
  label: string
  trend?: { value: number; isPositive: boolean }
}

export function StatsCard({ icon, value, label, trend }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-base p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-500">
          {icon}
        </div>
        {trend && (
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive 
              ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-500"
              : "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500"
          )}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </span>
        )}
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-slate-500 dark:text-slate-400">{label}</div>
    </motion.div>
  )
}

// Search Input
interface SearchInputProps {
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchInput({ 
  placeholder = "Buscar...", 
  value, 
  onChange,
  className 
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base pl-12"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </div>
  )
}

// Filter Chips
interface FilterChipsProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
}

export function FilterChips({ options, selected, onChange }: FilterChipsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
            selected === option
              ? "bg-red-600 text-white"
              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
