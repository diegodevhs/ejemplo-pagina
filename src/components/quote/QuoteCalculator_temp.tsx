'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { calculateQuote, type QuoteInput, type QuoteResult } from '@/lib/pricing'
import { PRICING_CONFIG, type ConcreteType } from '@/config/pricing'
import { formatCurrency, cn } from '@/lib/utils'

// ── Default state ─────────────────────────────────────────────────────────────

const DEFAULTS: Required<QuoteInput> = {
  volumeM3: 20,
  concreteType: 'Standard',
  strengthMPa: 250,
  deliveryDistanceKm: 10,
  needsPump: false,
  pumpHours: 4,
  hasFiber: false,
  hasAccelerator: false,
  nightPour: false,
  wasteFactorPercent: PRICING_CONFIG.defaultWasteFactorPercent,
  discountPercent: 0,
  taxPercent: PRICING_CONFIG.defaultTaxPercent,
}

const CONCRETE_TYPES: ConcreteType[] = ['Standard', 'HighStrength', 'Fiber', 'SelfLeveling']
const STRENGTH_OPTIONS = [200, 250, 300, 350, 400]

// ── Helpers ───────────────────────────────────────────────────────────────────

function inputToParams(input: Required<QuoteInput>): URLSearchParams {
  const p = new URLSearchParams()
  Object.entries(input).forEach(([k, v]) => p.set(k, String(v)))
  return p
}

function paramsToInput(sp: URLSearchParams): Required<QuoteInput> {
  const get = <T>(key: string, fallback: T, cast: (v: string) => T): T => {
    const v = sp.get(key)
    return v !== null ? cast(v) : fallback
  }
  return {
    volumeM3:            get('volumeM3',            DEFAULTS.volumeM3,            Number),
    concreteType:        get('concreteType',         DEFAULTS.concreteType,        v => v as ConcreteType),
    strengthMPa:         get('strengthMPa',          DEFAULTS.strengthMPa,         Number),
    deliveryDistanceKm:  get('deliveryDistanceKm',   DEFAULTS.deliveryDistanceKm,  Number),
    needsPump:           get('needsPump',            DEFAULTS.needsPump,           v => v === 'true'),
    pumpHours:           get('pumpHours',            DEFAULTS.pumpHours,           Number),
    hasFiber:            get('hasFiber',             DEFAULTS.hasFiber,            v => v === 'true'),
    hasAccelerator:      get('hasAccelerator',        DEFAULTS.hasAccelerator,      v => v === 'true'),
    nightPour:           get('nightPour',            DEFAULTS.nightPour,           v => v === 'true'),
    wasteFactorPercent:  get('wasteFactorPercent',   DEFAULTS.wasteFactorPercent,  Number),
    discountPercent:     get('discountPercent',      DEFAULTS.discountPercent,     Number),
    taxPercent:          get('taxPercent',           DEFAULTS.taxPercent,          Number),
  }
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function InputRow({ label, children, htmlFor }: { label: string; children: React.ReactNode; htmlFor?: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-concrete-800">
      <label htmlFor={htmlFor} className="text-concrete-300 text-sm flex-shrink-0 min-w-[140px]">
        {label}
      </label>
      <div className="flex-1 flex justify-end">{children}</div>
    </div>
  )
}

function NumberInput({
  id, value, onChange, min = 0, max, step = 1,
}: {
  id?: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number
}) {
  return (
    <input
      id={id}
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={e => {
        const n = parseFloat(e.target.value)
        if (!isNaN(n)) onChange(n)
      }}
      className="w-24 bg-concrete-800 border border-concrete-700 text-white text-right text-sm px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors"
    />
  )
}

function Toggle({
  id, checked, onChange,
}: {
  id: string; checked: boolean; onChange: (v: boolean) => void
}) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-11 h-6 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400',
        checked ? 'bg-amber-500' : 'bg-concrete-700',
      )}
    >
      <span
        className={cn(
          'absolute top-1 w-4 h-4 bg-white transition-transform duration-200',
          checked ? 'left-6' : 'left-1',
        )}
      />
      <span className="sr-only">{checked ? 'On' : 'Off'}</span>
    </button>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

function QuoteCalculator() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [input, setInput] = useState<Required<QuoteInput>>(() => paramsToInput(searchParams))
  const [result, setResult] = useState<QuoteResult | null>(null)
  const [copied, setCopied] = useState(false)

  const set = useCallback(<K extends keyof QuoteInput>(key: K, value: QuoteInput[K]) => {
    setInput(prev => ({ ...prev, [key]: value }))
  }, [])

  // Recalculate whenever input changes
  useEffect(() => {
    try {
      setResult(calculateQuote(input))
    } catch {
      setResult(null)
    }
  }, [input])

  const handleReset = () => setInput(DEFAULTS)

  const handleShare = () => {
    const url = `${window.location.origin}/calculator?${inputToParams(input)}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  const quoteLink = result
    ? `/quote?volumeM3=${input.volumeM3}&concreteType=${input.concreteType}&strengthMPa=${input.strengthMPa}` +
      `&hasFiber=${input.hasFiber}&hasAccelerator=${input.hasAccelerator}&nightPour=${input.nightPour}` +
      `&notes=${encodeURIComponent(`Calculator estimate: $${result.total} total, $${result.costPerM3}/m³`)}`
    : '/quote'

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
      {/* ── LEFT: Inputs ────────────────────────────────────────────────────── */}
      <div className="bg-concrete-900 border border-concrete-800 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-white text-xl font-bold">Configure Your Pour</h2>
          <button
            onClick={handleReset}
            className="text-concrete-500 hover:text-amber-400 text-xs font-bold tracking-widest uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 px-2 py-1"
          >
            ↺ Reset
          </button>
        </div>

        {/* Volume */}
        <InputRow label="Volume (m³)" htmlFor="cal-volume">
          <NumberInput id="cal-volume" value={input.volumeM3} onChange={v => set('volumeM3', v)} min={1} step={0.5} />
        </InputRow>

        {/* Concrete type */}
        <InputRow label="Concrete type" htmlFor="cal-type">
          <select
            id="cal-type"
            value={input.concreteType}
            onChange={e => set('concreteType', e.target.value as ConcreteType)}
            className="bg-concrete-800 border border-concrete-700 text-white text-sm px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
          >
            {CONCRETE_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </InputRow>

        {/* Strength */}
        <InputRow label="Strength (MPa)" htmlFor="cal-strength">
          <select
            id="cal-strength"
            value={input.strengthMPa}
            onChange={e => set('strengthMPa', Number(e.target.value))}
            className="bg-concrete-800 border border-concrete-700 text-white text-sm px-3 py-1.5 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
          >
            {STRENGTH_OPTIONS.map(s => (
              <option key={s} value={s}>{s} MPa (~{Math.round(s * 145)} PSI)</option>
            ))}
          </select>
        </InputRow>

        {/* Delivery */}
        <InputRow label="Delivery distance (km)" htmlFor="cal-delivery">
          <NumberInput id="cal-delivery" value={input.deliveryDistanceKm} onChange={v => set('deliveryDistanceKm', v)} min={0} max={200} />
        </InputRow>

        {/* Pump */}
        <InputRow label="Needs pump?" htmlFor="cal-pump">
          <Toggle id="cal-pump" checked={input.needsPump} onChange={v => set('needsPump', v)} />
        </InputRow>

        {input.needsPump && (
          <InputRow label="Pump hours" htmlFor="cal-pump-hours">
            <NumberInput id="cal-pump-hours" value={input.pumpHours} onChange={v => set('pumpHours', v)} min={1} max={24} />
          </InputRow>
        )}

        {/* Add-ons */}
        <p className="text-concrete-500 text-xs font-bold tracking-widest uppercase mt-5 mb-1">Add-ons</p>
        <InputRow label="Fiber additive" htmlFor="cal-fiber">
          <Toggle id="cal-fiber" checked={input.hasFiber} onChange={v => set('hasFiber', v)} />
        </InputRow>
        <InputRow label="Accelerator" htmlFor="cal-acc">
          <Toggle id="cal-acc" checked={input.hasAccelerator} onChange={v => set('hasAccelerator', v)} />
        </InputRow>
        <InputRow label="Night pour" htmlFor="cal-night">
          <Toggle id="cal-night" checked={input.nightPour} onChange={v => set('nightPour', v)} />
        </InputRow>

        {/* Fine-tuning */}
        <p className="text-concrete-500 text-xs font-bold tracking-widest uppercase mt-5 mb-1">Fine-tune</p>
        <InputRow label="Waste factor (%)" htmlFor="cal-waste">
          <NumberInput id="cal-waste" value={input.wasteFactorPercent} onChange={v => set('wasteFactorPercent', v)} min={0} max={20} step={0.5} />
        </InputRow>
        <InputRow label="Discount (%)" htmlFor="cal-discount">
          <NumberInput id="cal-discount" value={input.discountPercent} onChange={v => set('discountPercent', v)} min={0} max={25} step={0.5} />
        </InputRow>
        <InputRow label="Tax (%)" htmlFor="cal-tax">
          <NumberInput id="cal-tax" value={input.taxPercent} onChange={v => set('taxPercent', v)} min={0} max={30} step={0.1} />
        </InputRow>
      </div>

      {/* ── RIGHT: Summary + Breakdown ──────────────────────────────────────── */}
      <div className="space-y-4 lg:sticky lg:top-28">
        {/* Total card */}
        <div className="bg-concrete-900 border border-concrete-800 p-6">
          <p className="text-concrete-500 text-xs font-bold tracking-widest uppercase mb-2">Estimated Total</p>
          <motion.p
            key={result?.total}
            initial={{ opacity: 0.4, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="font-display text-amber-400 text-4xl font-bold mb-1"
          >
            {result ? formatCurrency(result.total) : '—'}
          </motion.p>
          {result && (
            <p className="text-concrete-400 text-sm">
              {formatCurrency(result.costPerM3)}<span className="text-concrete-600">/m³</span>
            </p>
          )}
        </div>

        {/* Breakdown */}
        {result && (
          <div className="bg-concrete-900 border border-concrete-800 p-6">
            <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-4">Cost Breakdown</h3>
            <div className="space-y-0">
              <AnimatePresence initial={false}>
                {result.lineItems.map((item) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start justify-between py-2.5 border-b border-concrete-800 gap-4"
                  >
                    <div className="min-w-0">
                      <p className={cn('text-sm', item.amount < 0 ? 'text-green-400' : 'text-concrete-300')}>
                        {item.label}
                      </p>
                      {item.note && (
                        <p className="text-concrete-600 text-xs mt-0.5">{item.note}</p>
                      )}
                    </div>
                    <p className={cn('text-sm font-bold flex-shrink-0 tabular-nums', item.amount < 0 ? 'text-green-400' : 'text-white')}>
                      {item.amount < 0 ? '−' : ''}{formatCurrency(Math.abs(item.amount))}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Subtotal / tax / total */}
              <div className="pt-3 space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-concrete-400">Subtotal</span>
                  <span className="text-white tabular-nums">{formatCurrency(result.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-concrete-400">Tax ({input.taxPercent}%)</span>
                  <span className="text-white tabular-nums">{formatCurrency(result.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-base font-bold border-t border-concrete-700 pt-2 mt-1">
                  <span className="text-white">Total</span>
                  <span className="text-amber-400 tabular-nums">{formatCurrency(result.total)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href={quoteLink}
            className="block w-full bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-sm py-3.5 text-center transition-colors tracking-wide"
          >
            Request Official Quote →
          </Link>
          <button
            onClick={handleShare}
            className="block w-full border border-concrete-700 hover:border-amber-500 text-concrete-300 hover:text-amber-400 font-medium text-sm py-3 text-center transition-colors"
          >
            {copied ? '✓ Link copied!' : '🔗 Share this estimate'}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-concrete-600 text-xs leading-relaxed text-center px-2">
          This is an estimate only. Final pricing may vary based on mix design, site conditions, delivery distance, pump requirements, and current material costs. Contact us for an official quotation.
        </p>
      </div>
    </div>
  )
}

export default QuoteCalculator
