'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    id: 1,
    name: 'Marcus Webb',
    title: 'Project Manager, NorthWest Construction',
    quote: 'Solid Ground has been our go-to for three major warehouse projects. Their scheduling is impeccable and the field crew communicates clearly. The quality control is genuinely superior to other suppliers we\'ve used.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sandra Reyes',
    title: 'Owner, Reyes Custom Homes',
    quote: 'I needed a decorative driveway that would wow my clients. The stamped concrete result was stunning — and they delivered on a tight Friday deadline. Professional from start to finish.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Tom Castellano',
    title: 'Civil Engineer, CalState Infrastructure',
    quote: 'The team understood the ACI 350 requirements for our water treatment project without me having to hand-hold. Mix submittals were thorough, break results consistently exceeded spec.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Lisa Park',
    title: 'Superintendent, Pacific Tilt-Up Group',
    quote: 'We&apos;ve done four tilt-up projects together. The flatness numbers they achieve on the casting bed are genuinely impressive. No other supplier we&apos;ve tried has been as consistent.',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-concrete-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 max-w-xl mx-auto"
        >
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Client Stories</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            What Our Clients Say
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-concrete-800">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-concrete-900 p-7 flex flex-col"
            >
              <Stars count={t.rating} />
              <p className="text-concrete-300 text-sm leading-relaxed mt-5 mb-6 flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="border-t border-concrete-800 pt-5">
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-concrete-500 text-xs mt-0.5">{t.title}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
