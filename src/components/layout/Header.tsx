'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Our Work' },
  { href: '/#about', label: 'About' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/#contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-concrete-950/95 backdrop-blur-sm border-b border-concrete-800/60 py-3'
          : 'bg-transparent py-5',
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group focus-visible:outline-none">
          <div className="w-9 h-9 bg-amber-500 flex items-center justify-center rotate-45 group-hover:rotate-0 transition-transform duration-300">
            <span className="text-concrete-950 font-display font-bold text-lg -rotate-45 group-hover:rotate-0 transition-transform duration-300">
              S
            </span>
          </div>
          <span className="font-display font-bold text-xl text-white tracking-tight leading-none">
            Solid Ground<br />
            <span className="text-amber-400 text-sm font-body font-normal tracking-widest uppercase">Concrete</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-concrete-300 hover:text-amber-400 text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/quote"
            className="bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-sm px-5 py-2.5 transition-colors duration-200 tracking-wide"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-concrete-200 p-2 focus-visible:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={cn('block h-0.5 bg-current transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
            <span className={cn('block h-0.5 bg-current transition-all duration-300', menuOpen && 'opacity-0')} />
            <span className={cn('block h-0.5 bg-current transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-concrete-950 border-t border-concrete-800 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-concrete-200 hover:text-amber-400 py-3 px-2 border-b border-concrete-800 text-base font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quote"
                className="mt-3 bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-sm px-5 py-3 text-center transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
