'use client'

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import { MapPin, Navigation, Copy, Check, Footprints, Car } from 'lucide-react'

export default function Location() {
  const { t, locale } = useTranslations()
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    navigator.clipboard.writeText('Okrężna 15, 57-200 Ząbkowice Śląskie')
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const spots = [
    {
      name: locale === 'pl' ? 'Droga krajowa nr 8 (DK8)' : 'National Road DK8',
      distance: '400 m',
      time: locale === 'pl' ? '1 min samochodem' : '1 min by car',
      icon: Car,
    },
    {
      name: locale === 'pl' ? 'Restauracja Mała Grecja' : 'Mała Grecja Restaurant',
      distance: '800 m',
      time: locale === 'pl' ? '10 min spacerem' : '10 min walk',
      icon: Footprints,
    },
    {
      name: locale === 'pl' ? 'Piekarnia Ziarno' : 'Ziarno Bakery',
      distance: '500 m',
      time: locale === 'pl' ? '6 min spacerem' : '6 min walk',
      icon: Footprints,
    },
    {
      name: locale === 'pl' ? 'Biedronka & Żabka' : 'Biedronka & Żabka shops',
      distance: '600 m',
      time: locale === 'pl' ? '7 min spacerem' : '7 min walk',
      icon: Footprints,
    },
    {
      name: locale === 'pl' ? 'Rynek miejski & Ratusz' : 'Market Square & Town Hall',
      distance: '900 m',
      time: locale === 'pl' ? '10 min spacerem' : '10 min walk',
      icon: Footprints,
    },
    {
      name: locale === 'pl' ? 'Słynna Krzywa Wieża' : 'Famous Leaning Tower',
      distance: '1.1 km',
      time: locale === 'pl' ? '12 min spacerem' : '12 min walk',
      icon: Footprints,
    },
  ]

  return (
    <section id="location" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
            {locale === 'pl' ? 'Doskonała lokalizacja' : 'Convenient Location'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight animate-fade-in [text-wrap:balance]">
            {t.location.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base [text-wrap:balance]">
            {locale === 'pl'
              ? 'Spokojna, zielona okolica w Ząbkowicach Śląskich – zaledwie 10 minut spacerem od zabytkowego rynku.'
              : 'Quiet residential neighborhood in Ząbkowice Śląskie – only a 10-minute walk to the historic market square.'}
          </p>
        </div>

        {/* Address & Quick Actions Bar */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 mb-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {locale === 'pl' ? 'Adres apartamentu' : 'Apartment Address'}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 font-display">
                Okrężna 15, 57-200 Ząbkowice Śląskie
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              type="button"
              onClick={copyAddress}
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? (locale === 'pl' ? 'Skopiowano!' : 'Copied!') : (locale === 'pl' ? 'Kopiuj adres' : 'Copy address')}</span>
            </button>

            <a
              href="https://maps.google.com/?q=Przystanek+Okr%C4%99%C5%BCna+Z%C4%85bkowice+%C5%9Al%C4%85skie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              <Navigation className="w-4 h-4" />
              <span>{locale === 'pl' ? 'Nawiguj w Google Maps' : 'Open in Google Maps'}</span>
            </a>
          </div>
        </div>

        {/* Nearby attractions strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {spots.map((spot, i) => {
            const Icon = spot.icon
            return (
              <div
                key={i}
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white shadow-2xs hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono font-bold">{spot.distance}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate mb-0.5">
                  {spot.name}
                </h4>
                <p className="text-[11px] text-slate-500">
                  {spot.time}
                </p>
              </div>
            )
          })}
        </div>

        {/* Map iframe */}
        <div className="rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm bg-white">
          <iframe
            title={t.location.mapTitle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.016437105737!2d16.8004771!3d50.589647799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e255bda197f7f%3A0xd7fcf18826975804!2zUHJ6eXN0YW5layBPa3LEmcW8bmE!5e0!3m2!1spl!2spl!4v1757773493986!5m2!1spl!2spl"
            className="w-full h-[360px] sm:h-[440px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
