"use client"

import { useMemo } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'

export default function Hero() {
  const { t, locale } = useTranslations()

  const ratingsSummary = useMemo(() => {
    const sources = t.reviews.external
    const lookup = (needle: string) =>
      sources.find((item) => item.source.toLowerCase().includes(needle))
    const format = (entry?: (typeof sources)[number]) =>
      entry ? `${entry.rating.toFixed(2)}${entry.scale !== 5 ? `/${entry.scale}` : ''}` : '—'
    return {
      airbnb: format(lookup('airbnb')),
      booking: format(lookup('booking')),
    }
  }, [t.reviews.external])

  const capacityLabel = locale === 'pl' ? '55 m² · 4 gości' : '55 m² · 4 guests'

  return (
    <section id="hero" className="hero-section relative min-h-[85vh] flex items-center justify-center text-white px-4 pt-24 sm:pt-0">
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-4 animate-fade-in">{t.hero.title}</h1>
        <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 animate-slide-up">{t.hero.subtitle}</p>
        <div className="mb-8 sm:mb-10 flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 sm:px-4 backdrop-blur-sm">
            <span aria-hidden="true">⭐</span>
            <span>
              Airbnb {ratingsSummary.airbnb} · Booking {ratingsSummary.booking}
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 sm:px-4 backdrop-blur-sm">
            <span aria-hidden="true">🏠</span>
            <span>{capacityLabel}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
          <a
            href={t.contact.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-5 py-2 text-sm sm:text-base sm:px-7 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors animate-bounce min-w-[150px]"
            style={{ animationDelay: '0ms' }}
          >
            {t.hero.airbnb}
          </a>
          <a
            href={t.contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-blue-600 px-5 py-2 text-sm sm:text-base sm:px-7 sm:py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors animate-bounce min-w-[150px]"
            style={{ animationDelay: '300ms' }}
          >
            {t.hero.booking}
          </a>
        </div>
      </div>
    </section>
  )
}
