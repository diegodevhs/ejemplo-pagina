import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import FeaturedWorkSection from '@/components/sections/FeaturedWorkSection'
import AboutSection from '@/components/sections/AboutSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import ContactSection from '@/components/sections/ContactSection'
import { projects } from '@/data/projects'

export const metadata: Metadata = {
  title: 'Solid Ground Concrete — Premium Ready-Mix & Construction Concrete, Southern California',
  description:
    'Commercial and residential concrete services across Southern California. Industrial slabs, foundations, decorative concrete, and ready-mix delivery. Licensed & bonded since 2001.',
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedWorkSection projects={projects} />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
