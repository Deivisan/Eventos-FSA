'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, Monitor } from 'lucide-react'
import { useTheme } from 'next-themes'

const themes = [
  { id: 'light', name: 'Claro', icon: Sun, description: 'Tema claro' },
  { id: 'dark', name: 'Escuro', icon: Moon, description: 'Tema escuro' },
  { id: 'system', name: 'Sistema', icon: Monitor, description: 'Seguir sistema' },
]

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 w-9 h-9" />
    )
  }

  // Ícone atual baseado no tema resolvido
  const CurrentIcon = resolvedTheme === 'dark' ? Moon : Sun

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Mudar tema"
        title={`Tema atual: ${theme === 'system' ? 'Sistema' : theme === 'dark' ? 'Escuro' : 'Claro'}`}
      >
        <CurrentIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-44 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Tema
            </div>
            {themes.map((t) => {
              const Icon = t.icon
              const isActive = theme === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id)
                    setIsOpen(false)
                  }}
                  className={`w-full px-3 py-2 text-left flex items-center gap-3 transition-colors ${
                    isActive 
                      ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="flex-1 text-sm">{t.name}</span>
                  {isActive && (
                    <div className="w-2 h-2 rounded-full bg-red-600 dark:bg-red-400" />
                  )}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
