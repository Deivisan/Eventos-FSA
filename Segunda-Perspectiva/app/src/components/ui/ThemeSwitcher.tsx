'use client'

import { useState, useEffect } from 'react'
import { Palette, Moon, Sun, PartyPopper, Flame, CloudMoon, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

const themes = [
  { id: 'light', name: 'Padrão', icon: Sun, color: 'bg-red-600' },
  { id: 'dark', name: 'Escuro', icon: Moon, color: 'bg-slate-900' },
  { id: 'carnaval', name: 'Carnaval', icon: PartyPopper, color: 'bg-purple-600' },
  { id: 'saojoao', name: 'São João', icon: Flame, color: 'bg-orange-600' },
  { id: 'night', name: 'Noturno', icon: CloudMoon, color: 'bg-blue-600' },
  { id: 'minimal', name: 'Minimal', icon: Monitor, color: 'bg-slate-600' },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Mudar tema"
      >
        <Palette className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Escolha um tema
          </div>
          {themes.map((t) => {
            const Icon = t.icon
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${
                  theme === t.id ? 'text-primary-600 font-medium' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full ${t.color}`} />
                <span className="flex-1">{t.name}</span>
                {theme === t.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />}
              </button>
            )
          })}
        </div>
      )}
      
      {/* Backdrop to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
