'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Years Experience' },
  { value: '800+', label: 'Projects Completed' },
  { value: '50K+', label: 'm³ Delivered' },
  { value: '100%', label: 'Licensed & Bonded' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-background.jpg"
          alt="Concrete pour in progress at an industrial site"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-concrete-950/95 via-concrete-950/75 to-concrete-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-concrete-950/60 via-transparent to-transparent" />
      </div>

      {/* Decorative amber line */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 mb-6"
          >
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Southern California&apos;s Trusted Concrete Partner</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6 text-balance"
          >
            We Pour the Foundation of{' '}
            <span className="text-amber-400">Great Projects</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-concrete-300 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl"
          >
            From industrial warehouse slabs to decorative residential finishes — Solid Ground delivers premium ready-mix concrete with precision scheduling and expert placement.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/quote"
              className="bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-base px-8 py-4 transition-colors tracking-wide text-center"
            >
              Request a Free Quote
            </Link>
            <a
              href="#work"
              className="border border-concrete-500 hover:border-amber-500 text-white hover:text-amber-400 font-semibold text-base px-8 py-4 transition-colors tracking-wide text-center"
            >
              See Our Work ↓
            </a>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-concrete-800 border border-concrete-800 max-w-2xl"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-concrete-950/80 backdrop-blur-sm px-5 py-4">
              <p className="font-display text-3xl font-bold text-amber-400">{stat.value}</p>
              <p className="text-concrete-400 text-xs font-medium tracking-wide mt-0.5">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-concrete-500 text-xs tracking-widest uppercase rotate-90 origin-center translate-y-4">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-concrete-500 to-transparent" />
      </motion.div>
    </section>
  )
}
