import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import QuoteCalculator from '../../components/quote/QuoteCalculator'

export const metadata: Metadata = {
  title: 'Concrete Cost Calculator',
  description:
    'Estimate your concrete project cost instantly. Adjust volume, mix type, strength, delivery, pump, and add-ons to get a live price breakdown.',
}

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="bg-concrete-950 pt-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Page header */}
          <div className="mb-12">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">Budget Simulator</p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Concrete Cost Calculator
            </h1>
            <p className="text-concrete-400 text-lg max-w-xl leading-relaxed">
              Configure your pour parameters and get an instant itemised estimate. Adjust any value and the total updates live.
            </p>
          </div>

          <Suspense fallback={
            <div className="text-concrete-500 text-sm py-8">Loading calculator…</div>
          }>
            <QuoteCalculator />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  )
}
