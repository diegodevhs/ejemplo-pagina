'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

interface EstimateModuleProps {
  projectName: string
  defaultVolumeM3: number
  pricePerM3: number
}

export default function EstimateModule({ projectName, defaultVolumeM3, pricePerM3 }: EstimateModuleProps) {
  const [volume, setVolume] = useState(defaultVolumeM3)

  const total = volume * pricePerM3

  const adjustVolume = (delta: number) => {
    setVolume((prev) => Math.max(1, Math.round((prev + delta) * 10) / 10))
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    if (!isNaN(val) && val > 0) setVolume(Math.round(val * 10) / 10)
  }

  return (
    <div className="bg-concrete-900 border border-concrete-800 p-6">
      <h3 className="font-display text-white text-xl font-bold mb-1">Cost Estimate</h3>
      <p className="text-concrete-400 text-sm mb-6">Adjust volume to recalculate. Contact us for a firm quote.</p>

      {/* Price per m³ */}
      <div className="flex items-center justify-between border-b border-concrete-800 pb-4 mb-4">
        <span className="text-concrete-400 text-sm">Price per m³</span>
        <span className="text-white font-bold">{formatCurrency(pricePerM3)}</span>
      </div>

      {/* Volume input */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-concrete-400 text-sm">Volume (m³)</span>
        <div className="flex items-center gap-0">
          <button
            onClick={() => adjustVolume(-1)}
            className="w-9 h-9 bg-concrete-800 hover:bg-concrete-700 text-white font-bold flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Decrease volume by 1"
          >
            −
          </button>
          <input
            type="number"
            value={volume}
            onChange={handleInput}
            min={1}
            step={0.5}
            className="w-20 h-9 bg-concrete-800 border-x border-concrete-700 text-white text-center text-sm font-bold focus:outline-none focus:border-amber-500"
            aria-label="Volume in cubic meters"
          />
          <button
            onClick={() => adjustVolume(1)}
            className="w-9 h-9 bg-concrete-800 hover:bg-concrete-700 text-white font-bold flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Increase volume by 1"
          >
            +
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="bg-amber-500/10 border border-amber-500/30 px-4 py-4 flex items-center justify-between mb-6">
        <span className="text-amber-400 font-bold text-sm tracking-wide uppercase">Estimated Total</span>
        <span className="font-display text-amber-400 text-2xl font-bold">{formatCurrency(total)}</span>
      </div>

      <p className="text-concrete-600 text-xs mb-4">
        * Estimate only. Final price depends on mix design, delivery distance, pump requirements, and project conditions.
      </p>

      {/* CTA */}
      <Link
        href={`/quote?project=${encodeURIComponent(projectName)}&volume=${volume}`}
        className="block w-full bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold text-sm py-3.5 text-center transition-colors tracking-wide"
      >
        Get a Firm Quote per m³ →
      </Link>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href="https://wa.me/13235550188?text=Hi%2C+I%27m+interested+in+a+quote+for+the+project: "
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 border border-concrete-700 hover:border-green-500 text-concrete-300 hover:text-green-400 text-xs font-medium py-2.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp
        </a>
        <a
          href="mailto:info@solidgroundconcrete.com"
          className="flex items-center justify-center gap-1.5 border border-concrete-700 hover:border-amber-500 text-concrete-300 hover:text-amber-400 text-xs font-medium py-2.5 transition-colors"
        >
          <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          Email
        </a>
      </div>
    </div>
  )
}
