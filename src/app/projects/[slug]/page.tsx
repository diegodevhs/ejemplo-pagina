import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EstimateModule from '@/components/ui/EstimateModule'
import { projects, getProjectBySlug } from '@/data/projects'
import { formatDate, formatCurrency } from '@/lib/utils'
import { concreteTypeFromProject, strengthMPaFromProject } from '@/lib/projectPricingBridge'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      images: [{ url: project.coverImage }],
    },
  }
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  // Build calculator prefill URL from project data
  const calcParams = new URLSearchParams({
    volumeM3:     String(project.volumeM3),
    concreteType: concreteTypeFromProject(project.concreteType),
    strengthMPa:  String(strengthMPaFromProject(project.strength)),
    project:      project.slug,
  })
  const calculatorHref = `/calculator?${calcParams}`

  const specs = [
    { label: 'Location', value: project.location },
    { label: 'Date', value: formatDate(project.date) },
    { label: 'Concrete Type', value: project.concreteType },
    { label: 'Strength', value: project.strength },
    { label: 'Volume', value: `${project.volumeM3} m³` },
    { label: 'Price per m³', value: formatCurrency(project.pricePerM3) },
  ]

  return (
    <>
      <Header />
      <main className="bg-concrete-950 pt-24">
        {/* Hero image */}
        <div className="relative h-72 sm:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-concrete-950 via-concrete-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-concrete-500 mb-3">
              <Link href="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <span>›</span>
              <Link href="/#work" className="hover:text-amber-400 transition-colors">Projects</Link>
              <span>›</span>
              <span className="text-concrete-400">{project.title}</span>
            </nav>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-4">Project Overview</h2>
                <p className="text-concrete-400 text-base leading-relaxed">{project.description}</p>
              </div>

              {/* Specs table */}
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">Project Specifications</h2>
                <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-concrete-800">
                  {specs.map((spec) => (
                    <div key={spec.label} className="bg-concrete-900 px-5 py-4">
                      <dt className="text-concrete-500 text-xs font-bold tracking-widest uppercase mb-1">{spec.label}</dt>
                      <dd className="text-white font-semibold text-sm">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Gallery */}
              <div>
                <h2 className="font-display text-2xl font-bold text-white mb-6">Project Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {project.images.map((img, i) => (
                    <div key={i} className="relative aspect-[4/3] overflow-hidden group">
                      <Image
                        src={img}
                        alt={`${project.title} — image ${i + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Estimate + CTA */}
            <div className="space-y-6">
              {/* Quote per m³ — links to calculator prefilled with project data */}
              <Link
                href={calculatorHref}
                className="flex items-center justify-center gap-2 w-full bg-concrete-800 hover:bg-amber-500 border border-concrete-700 hover:border-amber-500 text-concrete-200 hover:text-concrete-950 font-bold text-sm px-5 py-3.5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm2.25-4.5h.008v.008H10.5v-.008zm0 2.25h.008v.008H10.5V13.5zm0 2.25h.008v.008H10.5v-.008zm2.25-4.5h.008v.008H12.75v-.008zm0 2.25h.008v.008H12.75V13.5zm0 2.25h.008v.008H12.75v-.008zM6.75 6.75h10.5v4.5H6.75v-4.5z" />
                </svg>
                Quote per m³ — Open Calculator
              </Link>

              <EstimateModule
                projectName={project.title}
                defaultVolumeM3={project.volumeM3}
                pricePerM3={project.pricePerM3}
              />

              {/* Back to projects */}
              <Link
                href="/#work"
                className="flex items-center gap-2 text-concrete-400 hover:text-amber-400 text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to featured work
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
