'use client'

import { useTranslations } from '@/i18n/TranslationProvider'
import { Star, ShieldCheck, ArrowRight, ExternalLink, Sparkles } from 'lucide-react'

export default function Hero() {
  const { t, locale } = useTranslations()

  return (
    <section id="hero" className="hero-section relative min-h-[92vh] flex flex-col justify-center text-white px-4 pt-36 sm:pt-44 md:pt-48 pb-16 sm:pb-24">
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm text-slate-100 mb-6 shadow-xs animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{locale === 'pl' ? 'Apartament na wyłączność · Ząbkowice Śląskie' : 'Entire private apartment · Ząbkowice Śląskie'}</span>
          <span className="hidden sm:inline text-white/40">|</span>
          <span className="hidden sm:inline text-amber-300 font-medium">★ 4.94 Airbnb · 9.3 Booking</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display text-white tracking-tight leading-[1.12] mb-5 max-w-4xl mx-auto animate-fade-in [text-wrap:balance]">
          {t.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl md:text-2xl text-slate-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up [text-wrap:balance]">
          {t.hero.subtitle}
        </p>

        {/* Verified platform ratings strip (badges without duplicate links) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 text-xs sm:text-sm animate-slide-up">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/15 text-slate-100">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-white">4.94</span>
            <span className="text-slate-300">Airbnb (68 {locale === 'pl' ? 'opinii' : 'reviews'})</span>
          </div>

          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/15 text-slate-100">
            <span className="bg-blue-600 text-white font-bold text-xs px-1.5 py-0.5 rounded">9.3</span>
            <span className="text-slate-300">Booking.com (54 {locale === 'pl' ? 'opinie' : 'reviews'})</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-950/40 backdrop-blur-md border border-emerald-500/30 text-emerald-300">
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === 'pl' ? 'Superhost & Znakomita czystość' : 'Superhost & Sparkling Clean'}</span>
          </div>
        </div>

        {/* The 2 Primary Action Buttons: Red Airbnb, Blue Booking */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-lg mx-auto mb-12">
          <a
            href={t.contact.airbnbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-rose-600 hover:bg-rose-700 shadow-md transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <span>{t.hero.airbnb}</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a
            href={t.contact.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-white bg-blue-600 hover:bg-blue-700 shadow-md transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <span>{t.hero.booking}</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>{locale === 'pl' ? 'Szczegóły' : 'Details'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-white/15 text-left">
          <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              {locale === 'pl' ? 'Powierzchnia' : 'Space'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              55 m² · {locale === 'pl' ? 'całe 2. piętro' : '2nd floor'}
            </span>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              {locale === 'pl' ? 'Pojemność' : 'Capacity'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              {locale === 'pl' ? 'Do 4 gości + łóżeczko' : 'Up to 4 guests + crib'}
            </span>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              {locale === 'pl' ? 'Parking' : 'Parking'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              {locale === 'pl' ? 'Darmowy na posesji' : 'Free on premises'}
            </span>
          </div>

          <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/10">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-medium block">
              {locale === 'pl' ? 'Dojazd' : 'Access'}
            </span>
            <span className="text-base sm:text-lg font-bold text-white">
              {locale === 'pl' ? '1 min od DK8' : '1 min from DK8'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
