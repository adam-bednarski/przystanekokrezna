import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PropertyHighlights from '@/components/PropertyHighlights'
import About from '@/components/About'
import Photos from '@/components/Photos'
import Location from '@/components/Location'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function HomeLocale() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main className="flex-1">
        <Hero />
        <PropertyHighlights />
        <About />
        <Photos />
        <Location />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
