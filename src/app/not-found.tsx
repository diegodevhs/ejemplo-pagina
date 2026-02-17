import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-concrete-950 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-display text-8xl font-bold text-amber-500 mb-4">404</p>
          <h1 className="font-display text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-concrete-400 text-base mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="bg-amber-500 hover:bg-amber-400 text-concrete-950 font-bold px-8 py-3 transition-colors tracking-wide inline-block"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
