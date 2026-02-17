import type { Metadata } from 'next'
import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import QuotePageContent from './QuotePageContent'

export const metadata: Metadata = {
  title: 'Request a Quote',
  description:
    'Get a concrete quote from Solid Ground. Tell us about your project and we\'ll get back to you within one business day with a detailed, competitive quote.',
}

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="bg-concrete-950 pt-24 min-h-screen">
        <Suspense>
          <QuotePageContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
