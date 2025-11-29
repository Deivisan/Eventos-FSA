'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, 
  Calendar, 
  Mic2, 
  Beer, 
  User,
  Search,
  Menu,
  X,
  Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher'

// Header Component
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200 dark:border-slate-700">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              EventosFSA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Início</NavLink>
            <NavLink href="/eventos">Eventos</NavLink>
            <NavLink href="/artistas">Artistas</NavLink>
            <NavLink href="/estabelecimentos">Bares</NavLink>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Search className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            </button>
            <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/login" className="btn-primary text-sm py-2 hidden sm:inline-flex">
              Entrar
            </Link>
            <button 
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-200 dark:border-slate-700 glass"
        >
          <nav className="container-custom py-4 flex flex-col gap-2">
            <MobileNavLink href="/" onClick={() => setIsMenuOpen(false)}>
              <Home className="w-5 h-5" /> Início
            </MobileNavLink>
            <MobileNavLink href="/eventos" onClick={() => setIsMenuOpen(false)}>
              <Calendar className="w-5 h-5" /> Eventos
            </MobileNavLink>
            <MobileNavLink href="/artistas" onClick={() => setIsMenuOpen(false)}>
              <Mic2 className="w-5 h-5" /> Artistas
            </MobileNavLink>
            <MobileNavLink href="/estabelecimentos" onClick={() => setIsMenuOpen(false)}>
              <Beer className="w-5 h-5" /> Bares
            </MobileNavLink>
            <Link 
              href="/login" 
              className="btn-primary mt-2 w-full justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Entrar
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium transition-colors",
        isActive 
          ? "text-red-600 dark:text-red-500" 
          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
      )}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
        />
      )}
    </Link>
  )
}

function MobileNavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode
  onClick?: () => void 
}) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
        isActive 
          ? "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500" 
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      )}
    >
      {children}
    </Link>
  )
}

// Bottom Navigation (Mobile)
export function BottomNav() {
  const pathname = usePathname()
  
  const navItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/eventos', icon: Calendar, label: 'Eventos' },
    { href: '/artistas', icon: Mic2, label: 'Artistas' },
    { href: '/estabelecimentos', icon: Beer, label: 'Bares' },
    { href: '/perfil', icon: User, label: 'Perfil' },
  ]
  
  return (
    <nav className="bottom-nav md:hidden safe-bottom">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn('bottom-nav-item', isActive && 'active')}
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <Icon className="w-6 h-6" />
              {isActive && (
                <motion.div
                  layoutId="activeBottomNav"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"
                />
              )}
            </motion.div>
            <span className="text-xs">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

// Footer
export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 hidden md:block">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
                <Mic2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">EventosFSA</span>
            </Link>
            <p className="text-slate-400 mb-4">
              A maior plataforma de eventos e música ao vivo de Feira de Santana, Bahia.
              Conectando artistas, estabelecimentos e você.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" label="Instagram" />
              <SocialLink href="#" label="Facebook" />
              <SocialLink href="#" label="WhatsApp" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <FooterLink href="/eventos">Eventos</FooterLink>
              <FooterLink href="/artistas">Artistas</FooterLink>
              <FooterLink href="/estabelecimentos">Bares</FooterLink>
              <FooterLink href="/sobre">Sobre</FooterLink>
            </ul>
          </div>

          {/* Cadastro */}
          <div>
            <h4 className="font-semibold mb-4">Cadastre-se</h4>
            <ul className="space-y-2">
              <FooterLink href="/cadastro?tipo=artista">Sou Artista</FooterLink>
              <FooterLink href="/cadastro?tipo=estabelecimento">Sou Bar/Restaurante</FooterLink>
              <FooterLink href="/login">Fazer Login</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © 2025 EventosFSA. Feito com ❤️ em Feira de Santana.
          </p>
          <div className="flex gap-4 text-sm text-slate-400">
            <Link href="/termos" className="hover:text-white transition-colors">Termos</Link>
            <Link href="/privacidade" className="hover:text-white transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link 
        href={href}
        className="text-slate-400 hover:text-white transition-colors"
      >
        {children}
      </Link>
    </li>
  )
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
      <div className="w-5 h-5 bg-slate-400 rounded-sm" />
    </a>
  )
}
