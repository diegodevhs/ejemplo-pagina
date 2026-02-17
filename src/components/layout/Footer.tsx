import Link from 'next/link'

const services = [
  'Ready-Mix Delivery',
  'Industrial Slabs',
  'Foundations & Footings',
  'Decorative Concrete',
  'Structural Concrete',
  'Tilt-Up Construction',
]

const quickLinks = [
  { href: '/#services', label: 'Services' },
  { href: '/#work', label: 'Our Work' },
  { href: '/#about', label: 'About Us' },
  { href: '/#testimonials', label: 'Testimonials' },
  { href: '/quote', label: 'Request a Quote' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-concrete-950 border-t border-concrete-800">
      {/* CTA Strip */}
      <div className="bg-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-concrete-950 text-lg font-bold text-balance text-center sm:text-left">
            Ready to start your project? Let&apos;s talk.
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+13235550188"
              className="bg-concrete-950 text-amber-400 font-bold text-sm px-5 py-2.5 hover:bg-concrete-900 transition-colors tracking-wide"
            >
              (323) 555-0188
            </a>
            <Link
              href="/quote"
              className="bg-white text-concrete-950 font-bold text-sm px-5 py-2.5 hover:bg-concrete-100 transition-colors tracking-wide"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rotate-45">
              <span className="text-concrete-950 font-display font-bold -rotate-45 text-base">S</span>
            </div>
            <span className="font-display font-bold text-white text-lg leading-tight">
              Solid Ground<br />
              <span className="text-amber-400 text-xs font-body tracking-widest uppercase">Concrete</span>
            </span>
          </div>
          <p className="text-concrete-400 text-sm leading-relaxed mb-6">
            Serving Southern California with premium ready-mix and construction concrete since 2001. Licensed, bonded, and trusted on hundreds of projects.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/13235550188?text=Hi%2C+I%27m+interested+in+a+concrete+quote" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 bg-concrete-800 hover:bg-green-600 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            </a>
            <a href="mailto:info@solidgroundconcrete.com" aria-label="Email" className="w-9 h-9 bg-concrete-800 hover:bg-amber-500 flex items-center justify-center transition-colors">
              <svg className="w-4 h-4 stroke-current fill-none" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Services</h3>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s}>
                <span className="text-concrete-400 text-sm hover:text-amber-400 cursor-default transition-colors">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Company</h3>
          <ul className="space-y-3">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-concrete-400 text-sm hover:text-amber-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-5">Contact</h3>
          <address className="not-italic space-y-4 text-sm text-concrete-400">
            <p>1842 Industrial Blvd<br />Los Angeles, CA 90021</p>
            <p>
              <a href="tel:+13235550188" className="hover:text-amber-400 transition-colors">(323) 555-0188</a>
            </p>
            <p>
              <a href="mailto:info@solidgroundconcrete.com" className="hover:text-amber-400 transition-colors">info@solidgroundconcrete.com</a>
            </p>
            <p className="text-concrete-500 text-xs">Mon–Fri 6am–5pm PST<br />Sat 7am–2pm PST</p>
          </address>
        </div>
      </div>

      <div className="border-t border-concrete-800 px-4 sm:px-6 lg:px-8 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-concrete-600 text-xs">
        <p>© {year} Solid Ground Concrete, Inc. All rights reserved.</p>
        <p>Licensed Contractor #C8-847291 · Bonded &amp; Insured</p>
      </div>
    </footer>
  )
}
