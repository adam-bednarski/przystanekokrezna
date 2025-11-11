"use client"

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import Reveal from '@/components/Reveal'

export default function About() {
  const { t } = useTranslations()
  const practical = t.practical
  const ruleIcons = ['🌙', '🕒', '🔑', '🚭', '🛠️']
  const tabs = [
    { key: 'description', label: t.about.tabs.description, content: (
      <>
        <p className="text-base sm:text-lg text-gray-600 text-center mb-8 sm:mb-12 max-w-3xl mx-auto">{t.about.description}</p>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8 sm:mb-12">
          {t.about.keyFacts.map((fact, index) => (
            <Reveal key={fact.label} delay={index * 90} className="h-full">
              <div className="rounded-3xl border border-white/70 bg-gradient-to-br from-sky-50/90 via-white to-rose-50/80 p-4 sm:p-6 text-center shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-blue-700/80">
                  {fact.label}
                </div>
                <div className="mt-2 sm:mt-3 text-lg sm:text-xl font-semibold text-slate-900 font-display">{fact.value}</div>
                {fact.hint && <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">{fact.hint}</p>}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.about.features.map((f, i) => (
            <Reveal key={i} delay={200 + i * 90} className="h-full">
              <div className="text-center p-5 sm:p-6 rounded-3xl border border-white/70 bg-gradient-to-br from-white via-amber-50/60 to-sky-50/70 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{f.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 font-display">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </>
    )},
    { key: 'amenities', label: t.about.tabs.amenities, content: (
      <div className="space-y-8">
        {t.about.amenities?.map((group, gi) => (
          <Reveal key={gi} delay={gi * 100}>
            <div className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-900 font-display">{group.group}</h3>
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-slate-700">
                {group.items.map((it, ii) => (
                  <li key={ii} className="flex items-center gap-2 rounded-2xl bg-slate-50/70 px-3 py-2">
                    <span className="text-lg">{it.icon}</span>
                    <span>{it.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    ) },
    { key: 'practical', label: t.about.tabs.practical, content: (
      <div className="space-y-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {practical.cards.map((card, idx) => (
            <Reveal key={card.mode} delay={idx * 110} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/95 p-6 shadow-sm">
                <header className="flex items-center gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {card.icon}
                  </span>
                  <h3 className="text-xl font-semibold text-slate-900 font-display">
                    {card.mode}
                  </h3>
                </header>
                <ul className="mt-6 space-y-4 text-sm text-slate-700">
                  {card.routes.map((route) => (
                    <li
                      key={`${card.mode}-${route.origin}`}
                      className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-semibold text-slate-900">{route.origin}</span>
                        <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                          {route.distance} · {route.duration}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{route.description}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={practical.cards.length * 110}>
          <aside className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 font-display">{practical.tipsTitle}</h3>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-slate-600">
              {practical.tips.map((tip, index) => (
                <li key={index} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  {tip}
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>
      </div>
    ) },
    { key: 'rules', label: t.about.tabs.rules, content: (
      <div className="bg-white rounded-2xl shadow p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.rules.items.map((rule: string, idx: number) => (
            <Reveal key={idx} delay={idx * 90}>
              <article className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/60 bg-gradient-to-br from-rose-50/80 via-white to-sky-50/70 p-6 text-center shadow-sm ring-1 ring-white/40 transition-shadow hover:shadow-lg">
                <span className="text-4xl" aria-hidden="true">
                  {ruleIcons[idx] ?? '✅'}
                </span>
                <p className="text-sm leading-relaxed text-slate-700">{rule}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {t.rules.note && (
          <Reveal delay={t.rules.items.length * 90}>
            <p className="mt-6 rounded-3xl border border-blue-100/60 bg-blue-50/40 px-6 py-4 text-sm text-blue-900/80 text-center">
              {t.rules.note}
            </p>
          </Reveal>
        )}
      </div>
    ) },
    {
      key: 'neighborhood',
      label: t.about.tabs.neighborhood,
      content: (
        <div className="space-y-10">
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            {t.about.neighborhood.intro}
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {t.about.neighborhood.highlights.map((item, index) => (
              <Reveal key={item.name} delay={index * 90}>
                <article className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-slate-900 font-display">{item.name}</h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100/60 px-3 py-1 text-sm font-medium text-blue-800">
                      {item.distanceKm} km
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={(t.about.neighborhood.highlights.length + 1) * 90}>
            <div className="rounded-3xl border border-white/70 bg-white/95 p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.about.neighborhood.dayTripsTitle}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                {t.about.neighborhood.dayTrips.map((trip) => (
                  <Reveal key={trip.name}>
                    <div className="rounded-3xl border border-blue-100/70 bg-gradient-to-br from-blue-50/80 via-white to-rose-50/70 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-base font-semibold text-blue-900 font-display">{trip.name}</span>
                        <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">{trip.distanceKm} km</span>
                      </div>
                      <p className="mt-2 text-sm text-blue-900/90 leading-relaxed">{trip.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-600">{t.about.neighborhood.discoverMore}</p>
            </div>
          </Reveal>
        </div>
      ),
    },
  ]

  const [active, setActive] = useState(tabs[0].key)

  return (
    <section id="about" className="py-16 sm:py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800 animate-fade-in">{t.about.title}</h2>
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-2 sm:gap-2.5 rounded-2xl sm:rounded-full bg-white px-2 py-2 sm:px-1.5 sm:py-1.5 shadow ring-1 ring-gray-200">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`px-3 py-2 text-sm sm:text-xs md:text-sm font-medium rounded-xl sm:rounded-full transition-colors whitespace-nowrap min-w-[6rem] sm:min-w-0 ${
                  active === t.key ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        {tabs.find((t) => t.key === active)?.content}
      </div>
    </section>
  )
}
