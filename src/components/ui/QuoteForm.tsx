'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const projectTypes = [
  'Residential Driveway / Patio',
  'Foundation & Footings',
  'Industrial Floor Slab',
  'Structural Concrete',
  'Decorative / Stamped',
  'Tilt-Up Construction',
  'Bridge / Civil Infrastructure',
  'Other',
]

interface FormState {
  name: string
  phone: string
  email: string
  projectType: string
  desiredM3: string
  address: string
  notes: string
}

interface Errors {
  [key: string]: string
}

interface QuoteFormProps {
  prefillProject?: string
  prefillVolume?: string
  prefillNotes?: string
}

export default function QuoteForm({ prefillProject = '', prefillVolume = '', prefillNotes = '' }: QuoteFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    projectType: projectTypes[0],
    desiredM3: prefillVolume,
    address: '',
    notes: prefillNotes || (prefillProject ? `Project reference: ${prefillProject}` : ''),
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const validate = (): boolean => {
    const errs: Errors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.phone.trim()) errs.phone = 'Phone number is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = 'Valid email required'
    if (!form.desiredM3 || Number(form.desiredM3) <= 0) errs.desiredM3 = 'Enter a volume greater than 0'
    if (!form.address.trim()) errs.address = 'Project address or location required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, desiredM3: Number(form.desiredM3) }),
      })
      if (!res.ok) throw new Error('Server error')
      setSuccess(true)
    } catch {
      setErrors({ submit: 'Something went wrong. Please call us or try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-16 h-16 bg-amber-500 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-concrete-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-white text-2xl font-bold mb-3">Quote Request Received!</h3>
        <p className="text-concrete-400 text-base leading-relaxed max-w-sm mx-auto mb-8">
          We&apos;ll review your project details and get back to you within one business day with a detailed quote.
        </p>
        <p className="text-concrete-500 text-sm">
          Urgent?{' '}
          <a href="tel:+13235550188" className="text-amber-400 hover:underline">(323) 555-0188</a>
          {' '}or{' '}
          <a href="https://wa.me/13235550188" className="text-amber-400 hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </p>
      </div>
    )
  }

  const inputCls = (field: string) =>
    cn(
      'w-full bg-concrete-800 border text-white text-sm px-4 py-3 placeholder:text-concrete-600 focus:outline-none focus:border-amber-500 transition-colors',
      errors[field] ? 'border-red-500' : 'border-concrete-700',
    )

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Name + Phone */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-name" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
            Full Name *
          </label>
          <input id="quote-name" type="text" value={form.name} onChange={set('name')} placeholder="John Smith" className={inputCls('name')} />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="quote-phone" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
            Phone *
          </label>
          <input id="quote-phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="(323) 555-0000" className={inputCls('phone')} />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="quote-email" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
          Email *
        </label>
        <input id="quote-email" type="email" value={form.email} onChange={set('email')} placeholder="john@company.com" className={inputCls('email')} />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Project type + Volume */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-type" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
            Project Type *
          </label>
          <select id="quote-type" value={form.projectType} onChange={set('projectType')} className={cn(inputCls('projectType'), 'cursor-pointer')}>
            {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="quote-volume" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
            Desired Volume (m³) *
          </label>
          <input id="quote-volume" type="number" min={1} step={0.5} value={form.desiredM3} onChange={set('desiredM3')} placeholder="e.g. 50" className={inputCls('desiredM3')} />
          {errors.desiredM3 && <p className="text-red-400 text-xs mt-1">{errors.desiredM3}</p>}
        </div>
      </div>

      {/* Address */}
      <div>
        <label htmlFor="quote-address" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
          Project Address / Location *
        </label>
        <input id="quote-address" type="text" value={form.address} onChange={set('address')} placeholder="123 Main St, Los Angeles, CA" className={inputCls('address')} />
        {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="quote-notes" className="block text-concrete-300 text-xs font-bold tracking-widest uppercase mb-2">
          Notes / Specifications
        </label>
        <textarea
          id="quote-notes"
          value={form.notes}
          onChange={set('notes')}
          rows={4}
          placeholder="Concrete strength required, special mix, access constraints, preferred pour date…"
          className={inputCls('notes')}
        />
      </div>

      {errors.submit && (
        <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/30 px-4 py-3">{errors.submit}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-concrete-950 font-bold text-base py-4 transition-colors tracking-wide"
      >
        {submitting ? 'Submitting…' : 'Submit Quote Request'}
      </button>

      <p className="text-concrete-600 text-xs text-center">
        We&apos;ll respond within one business day. Urgent? Call{' '}
        <a href="tel:+13235550188" className="text-amber-500 hover:underline">(323) 555-0188</a>
      </p>
    </form>
  )
}
