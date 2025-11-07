import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Photos from '@/components/Photos'
import Footer from '@/components/Footer'
import Location from '@/components/Location'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'

export default function HomeLocale() {
  return (
    <div>
      <Header />
      <Hero />
      <Location />
      <About />
      <Photos />
      <Contact />
      <Reviews />
      <Footer />
    </div>
  )
}
