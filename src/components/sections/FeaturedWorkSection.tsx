'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Project } from '@/types'
import { cn } from '@/lib/utils'

interface FeaturedWorkProps {
  projects: Project[]
}

const AUTOPLAY_INTERVAL = 5000

export default function FeaturedWorkSection({ projects }: FeaturedWorkProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number, dir: 'next' | 'prev' = 'next') => {
      setDirection(dir)
      setCurrent((index + projects.length) % projects.length)
    },
    [projects.length],
  )

  const goNext = useCallback(() => goTo(current + 1, 'next'), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1, 'prev'), [current, goTo])

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setInterval(goNext, AUTOPLAY_INTERVAL)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [goNext, isPaused])

  // Touch/swipe
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) { diff > 0 ? goNext() : goPrev() }
    touchStartX.current = null
  }

  const project = projects[current]

  const slideVariants = {
    enterNext: { x: '100%', opacity: 0 },
    enterPrev: { x: '-100%', opacity: 0 },
    center: { x: 0, opacity: 1 },
    exitNext: { x: '-100%', opacity: 0 },
    exitPrev: { x: '100%', opacity: 0 },
  }

  return (
    <section id="work" className="py-24 bg-concrete-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Featured Work</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Projects We&apos;re Proud Of
            </h2>
          </div>
          <Link
            href="/"
            className="text-concrete-400 hover:text-amber-400 text-sm font-medium transition-colors flex items-center gap-2 self-start sm:self-auto"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Main slide */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden bg-concrete-900">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial={direction === 'next' ? 'enterNext' : 'enterPrev'}
                animate="center"
                exit={direction === 'next' ? 'exitNext' : 'exitPrev'}
                transition={{ type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.65 }}
                className="absolute inset-0"
              >
                {/* Image with zoom on hover */}
                <div className="relative w-full h-full overflow-hidden group">
                  <motion.div
                    className="w-full h-full"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover"
                      priority={current === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    />
                  </motion.div>

                  {/* Gradient overlay (always visible) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-concrete-950/90 via-concrete-950/20 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-concrete-950/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />

                  {/* Hover content */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  >
                    <div className="text-center p-6">
                      <p className="text-concrete-300 text-sm sm:text-base max-w-md leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>
                      <span className="inline-flex items-center gap-2 border border-amber-400/60 text-amber-400 text-xs font-bold tracking-widest uppercase px-4 py-2">
                        View Details
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Bottom info bar (always visible) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-1.5">
                          {project.location} · {new Date(project.date).getFullYear()}
                        </p>
                        <h3 className="font-display text-white text-xl sm:text-3xl font-bold leading-tight text-balance">
                          {project.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs text-concrete-400 bg-concrete-900/70 border border-concrete-700 px-2.5 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        href={`/projects/${project.slug}`}
                        className="flex-shrink-0 bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-sm px-5 py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        aria-label={`View details for ${project.title}`}
                      >
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Prev/Next arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-concrete-950/70 hover:bg-amber-500 border border-concrete-700 hover:border-amber-500 text-white hover:text-concrete-950 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Previous project"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-concrete-950/70 hover:bg-amber-500 border border-concrete-700 hover:border-amber-500 text-white hover:text-concrete-950 flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Next project"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots + progress */}
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2" role="tablist" aria-label="Project slides">
              {projects.map((p, i) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to project: ${p.title}`}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  className={cn(
                    'transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                    i === current
                      ? 'w-8 h-2 bg-amber-400'
                      : 'w-2 h-2 bg-concrete-700 hover:bg-concrete-500',
                  )}
                />
              ))}
            </div>

            <p className="text-concrete-500 text-xs tabular-nums">
              {String(current + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </p>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 grid grid-cols-4 sm:grid-cols-8 gap-1.5 overflow-hidden">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                className={cn(
                  'relative aspect-video overflow-hidden transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
                  i === current ? 'ring-2 ring-amber-500' : 'opacity-50 hover:opacity-80',
                )}
                aria-label={p.title}
              >
                <Image src={p.coverImage} alt={p.title} fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
