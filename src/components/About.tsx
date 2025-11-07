"use client"

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'

export default function About() {
  const { t } = useTranslations()
  const practical = t.practical
  const tabs = [
    { key: 'description', label: t.about.tabs.description, content: (
      <>
        <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">{t.about.description}</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
          {t.about.keyFacts.map((fact, index) => (
            <div
              key={fact.label}
              className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow-md transition-transform duration-200 hover:-translate-y-1"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                {fact.label}
              </div>
              <div className="mt-3 text-xl font-semibold text-gray-900">{fact.value}</div>
              {fact.hint && <p className="mt-2 text-sm text-gray-600 leading-relaxed">{fact.hint}</p>}
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {t.about.features.map((f, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl border border-gray-200 bg-white transition-transform duration-200 hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-4xl text-blue-600 mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </>
    )},
    { key: 'amenities', label: t.about.tabs.amenities, content: (
      <div className="space-y-8">
        {t.about.amenities?.map((group, gi) => (
          <div key={gi} className="bg-white rounded-lg shadow p-6 animate-slide-up" style={{ animationDelay: `${gi * 60}ms` }}>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{group.group}</h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-gray-700">
              {group.items.map((it, ii) => (
                <li key={ii} className="flex items-center gap-2">
                  <span className="text-lg">{it.icon}</span>
                  <span>{it.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ) },
    { key: 'practical', label: t.about.tabs.practical, content: (
      <div className="space-y-12 animate-slide-up">
        <div className="grid gap-8 lg:grid-cols-3">
          {practical.cards.map((card) => (
            <article key={card.mode} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6">
              <header className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {card.icon}
                </span>
                <h3 className="text-xl font-semibold text-gray-900">
                  {card.mode}
                </h3>
              </header>
              <ul className="mt-6 space-y-4 text-sm text-gray-700">
                {card.routes.map((route) => (
                  <li
                    key={`${card.mode}-${route.origin}`}
                    className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold text-gray-900">{route.origin}</span>
                      <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                        {route.distance} · {route.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{route.description}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <aside className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">{practical.tipsTitle}</h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3 text-sm text-gray-600">
            {practical.tips.map((tip, index) => (
              <li key={index} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                {tip}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    ) },
    { key: 'rules', label: t.about.tabs.rules, content: (
      <div className="bg-white rounded-2xl shadow p-6 sm:p-8 animate-slide-up">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">{t.rules.title}</h3>
        <ol className="space-y-4 text-left max-w-3xl mx-auto">
          {t.rules.items.map((rule: string, idx: number) => (
            <li key={idx} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                {idx + 1}
              </span>
              <p className="text-gray-700 leading-relaxed">{rule}</p>
            </li>
          ))}
        </ol>
        {t.rules.note && (
          <p className="mt-6 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-900">
            {t.rules.note}
          </p>
        )}
      </div>
    ) },
    {
      key: 'neighborhood',
      label: t.about.tabs.neighborhood,
      content: (
        <div className="space-y-10 animate-slide-up">
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
            {t.about.neighborhood.intro}
          </p>

          <div className="grid gap-6 lg:grid-cols-2">
            {t.about.neighborhood.highlights.map((item, index) => (
              <article key={item.name} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {item.distanceKm} km
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.about.neighborhood.dayTripsTitle}</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {t.about.neighborhood.dayTrips.map((trip) => (
                <div key={trip.name} className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-base font-semibold text-blue-900">{trip.name}</span>
                    <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">{trip.distanceKm} km</span>
                  </div>
                  <p className="mt-2 text-sm text-blue-900/90 leading-relaxed">{trip.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-600">{t.about.neighborhood.discoverMore}</p>
          </div>
        </div>
      ),
    },
  ]

  const [active, setActive] = useState(tabs[0].key)

  return (
  <section id="about" className="py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 animate-fade-in">{t.about.title}</h2>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md bg-white p-1 shadow ring-1 ring-gray-200 max-w-full overflow-x-auto scrollbar-none -mx-4 px-4 sm:m-0 sm:p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={`px-4 py-2 text-base sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap min-w-[7rem] sm:min-w-0 ${active === t.key ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
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
