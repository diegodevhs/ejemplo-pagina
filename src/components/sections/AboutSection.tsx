'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const values = [
  { title: 'Precision', desc: 'Every batch is engineered to spec. We test, track, and deliver mix designs that meet or exceed project requirements.' },
  { title: 'Reliability', desc: 'On-time delivery is non-negotiable. We schedule pours with your GC and maintain clear communication throughout.' },
  { title: 'Safety', desc: 'OSHA-compliant operations, safety-trained crews, and rigorous jobsite protocols on every project.' },
  { title: 'Expertise', desc: 'Over two decades of experience with the full range of concrete applications — from decorative to structural to specialty mixes.' },
]

const certs = ['ACI-Certified Finishers', 'OSHA 30', 'CalTrans Approved', 'LEED-Eligible Mixes', 'DOT Certified Plant']

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-concrete-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/about/about-main.jpg"
                alt="Concrete crew at work on an industrial slab pour"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Inset image */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 sm:w-52 sm:h-52 border-4 border-concrete-900 overflow-hidden">
              <Image
                src="/images/about/about-inset.jpg"
                alt="Close-up of fresh concrete pour"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
            {/* Badge */}
            <div className="absolute -top-4 -left-4 bg-amber-500 p-4 text-center">
              <p className="font-display text-concrete-950 text-3xl font-bold leading-none">20+</p>
              <p className="text-concrete-950 text-xs font-bold tracking-wide mt-1">Years</p>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">About Us</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Built on a Reputation for Getting It Right
            </h2>
            <p className="text-concrete-400 text-base leading-relaxed mb-4">
              Solid Ground Concrete was founded in 2001 with a simple philosophy: do the work right the first time, every time. What started as a two-truck operation now serves the full spectrum of Southern California&apos;s construction industry — from custom homes to civic infrastructure.
            </p>
            <p className="text-concrete-400 text-base leading-relaxed mb-8">
              Our in-house batching plants operate to ISO 9001 quality standards, and our field crews include ACI-certified concrete finishers and foremen with decades of on-the-job experience.
            </p>

            {/* Values grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {values.map((v) => (
                <div key={v.title} className="border-l-2 border-amber-500 pl-4">
                  <h4 className="text-white font-bold text-sm mb-1">{v.title}</h4>
                  <p className="text-concrete-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {certs.map((c) => (
                <span key={c} className="text-xs text-concrete-300 bg-concrete-800 border border-concrete-700 px-3 py-1.5 font-medium">
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
