'use client'

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import Reveal from '@/components/Reveal'
import {
  Info,
  Sparkles,
  MapPin,
  Car,
  FileText,
  Clock,
  Compass,
  CheckCircle,
  Moon,
  Ban,
  Key,
} from 'lucide-react'

export default function About() {
  const { t, locale } = useTranslations()
  const practical = t.practical
  const [active, setActive] = useState<'description' | 'amenities' | 'neighborhood' | 'practical' | 'rules'>('description')

  const tabs = [
    { key: 'description' as const, label: t.about.tabs.description, icon: Info },
    { key: 'amenities' as const, label: t.about.tabs.amenities, icon: Sparkles },
    { key: 'neighborhood' as const, label: t.about.tabs.neighborhood, icon: MapPin },
    { key: 'practical' as const, label: t.about.tabs.practical, icon: Car },
    { key: 'rules' as const, label: t.about.tabs.rules, icon: FileText },
  ]

  return (
    <section id="about" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
            {locale === 'pl' ? 'Poznaj apartament' : 'Discover the space'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight animate-fade-in [text-wrap:balance]">
            {t.about.title}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed [text-wrap:balance]">
            {t.about.description}
          </p>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex flex-wrap sm:flex-nowrap justify-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs max-w-full overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isSelected = active === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab 1: Description & Key Facts */}
        {active === 'description' && (
          <div className="space-y-10 animate-fade-in">
            {/* Key facts grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {t.about.keyFacts.map((fact, index) => (
                <Reveal key={fact.label} delay={index * 60}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs hover:border-blue-200 transition-colors">
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-1.5">
                      {fact.label}
                    </span>
                    <div className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                      {fact.value}
                    </div>
                    {fact.hint && (
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {fact.hint}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Core features cards */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {t.about.features.map((f, i) => (
                <Reveal key={i} delay={150 + i * 80}>
                  <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-200 transition-colors">
                    <div className="text-3xl mb-3" aria-hidden="true">
                      {f.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {f.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Amenities */}
        {active === 'amenities' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {t.about.amenities?.map((group, gi) => (
                <Reveal key={gi} delay={gi * 80}>
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      <span>{group.group}</span>
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3 text-sm text-slate-700">
                      {group.items.map((it, ii) => (
                        <li key={ii} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-100">
                          <span className="text-base shrink-0">{it.icon}</span>
                          <span className="font-medium text-slate-800">{it.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Neighborhood & Attractions */}
        {active === 'neighborhood' && (
          <div className="space-y-10 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {t.about.neighborhood.intro}
              </p>
            </div>

            {/* Local Spots (Mała Grecja, Ziarno, Biedronka/Żabka, DK8, Rynek, Krzywa Wieża) */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{locale === 'pl' ? 'W najbliższej okolicy (1–10 minut)' : 'In the immediate area (1–10 minutes)'}</span>
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.about.neighborhood.highlights.map((item, index) => (
                  <Reveal key={item.name} delay={index * 60}>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h4 className="text-base font-bold text-slate-900">
                            {item.name}
                          </h4>
                          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                            {item.distanceKm} km
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Day Trips & Attractions outside town */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 mb-6">
                <Compass className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  {t.about.neighborhood.dayTripsTitle}
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {t.about.neighborhood.dayTrips.map((trip) => (
                  <div
                    key={trip.name}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-slate-200 hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-bold text-slate-900 text-sm">{trip.name}</span>
                      <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                        {trip.distanceKm} km
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {trip.description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-xs sm:text-sm text-slate-500 text-center italic">
                {t.about.neighborhood.discoverMore}
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Practical Travel Guidance */}
        {active === 'practical' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-3">
              {practical.cards.map((card) => (
                <div key={card.mode} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100 mb-4">
                    <span className="text-3xl" aria-hidden="true">{card.icon}</span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{card.mode}</h3>
                  </div>

                  <ul className="space-y-3.5 text-sm">
                    {card.routes.map((route) => (
                      <li key={`${card.mode}-${route.origin}`} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-bold text-slate-900 text-sm">{route.origin}</span>
                          <span className="text-xs font-semibold text-blue-700 uppercase">
                            {route.distance} · {route.duration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {route.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Travel tips */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                {practical.tipsTitle}
              </h3>
              <ul className="grid gap-3 sm:grid-cols-3 text-xs sm:text-sm text-slate-600">
                {practical.tips.map((tip, i) => (
                  <li key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 5: House Rules */}
        {active === 'rules' && (
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
                {t.rules.title}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Moon className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{locale === 'pl' ? 'Cisza nocna' : 'Quiet hours'}</span>
                    <span className="text-xs sm:text-sm text-slate-600">22:00 – 06:00 ({locale === 'pl' ? 'Szanujemy spokój sąsiadów' : 'Respecting neighbours'})</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{locale === 'pl' ? 'Godziny zameldowania' : 'Check-in hours'}</span>
                    <span className="text-xs sm:text-sm text-slate-600">15:00 – 22:00 ({locale === 'pl' ? 'Wymeldowanie do 11:00' : 'Check-out by 11:00 AM'})</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Ban className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{locale === 'pl' ? 'Zakaz palenia i imprez' : 'No smoking or parties'}</span>
                    <span className="text-xs sm:text-sm text-slate-600">{locale === 'pl' ? 'Czyste powietrze i bezpieczeństwo' : 'Smoke-free environment for all guests'}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <Key className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">{locale === 'pl' ? 'Prywatność i bezpieczeństwo' : 'Privacy & safety'}</span>
                    <span className="text-xs sm:text-sm text-slate-600">{locale === 'pl' ? 'Zamykane wejście na wyłączność' : 'Lockable private access exclusively for you'}</span>
                  </div>
                </div>
              </div>

              {t.rules.note && (
                <div className="mt-6 p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs sm:text-sm text-blue-900 leading-relaxed text-center">
                  {t.rules.note}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
