'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-concrete-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Contact</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Let&apos;s Talk About Your Project
            </h2>
            <p className="text-concrete-400 text-base leading-relaxed mb-10">
              Whether you need a quick volume estimate, a full project quote, or just have a technical question about mix design — our team is ready to help.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { label: 'Phone', value: '(323) 555-0188', href: 'tel:+13235550188' },
                { label: 'Email', value: 'info@solidgroundconcrete.com', href: 'mailto:info@solidgroundconcrete.com' },
                { label: 'Address', value: '1842 Industrial Blvd, Los Angeles, CA 90021', href: '#' },
                { label: 'Hours', value: 'Mon–Fri 6am–5pm · Sat 7am–2pm PST', href: null },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <span className="text-amber-500 text-xs font-bold tracking-widest uppercase w-16 flex-shrink-0 mt-0.5">{item.label}</span>
                  {item.href && item.href !== '#' ? (
                    <a href={item.href} className="text-concrete-300 hover:text-amber-400 transition-colors text-sm">{item.value}</a>
                  ) : (
                    <span className="text-concrete-300 text-sm">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/13235550188?text=Hi%2C+I%27m+interested+in+a+concrete+quote"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold text-sm px-6 py-3.5 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                WhatsApp Us
              </a>
              <Link
                href="/quote"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-sm px-6 py-3.5 transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>

          {/* Right: Quick info cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {[
              { label: 'Service Area', value: 'All of Los Angeles County and surrounding areas' },
              { label: 'Min. Order', value: '1 m³ (residential) / 3 m³ (commercial)' },
              { label: 'Lead Time', value: 'Same-day possible with 6am notice; 24h standard' },
              { label: 'Payment', value: 'Net 30 for GCs / COD for residential' },
              { label: 'Mix Designs', value: '2500–8000 PSI; specialty mixes on request' },
              { label: 'Certifications', value: 'ACI, OSHA, CalTrans, DOT plant-approved' },
            ].map((item) => (
              <div key={item.label} className="bg-concrete-800 border border-concrete-700 p-5">
                <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">{item.label}</p>
                <p className="text-concrete-300 text-sm leading-snug">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
