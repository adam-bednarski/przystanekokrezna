"use client"

import { useTranslations } from '@/i18n/TranslationProvider'
import Reveal from '@/components/Reveal'

export default function Rules() {
  const { t } = useTranslations()
  const icons = ['🌙', '🕒', '🔑', '🚭', '🛠️']

  return (
    <section id="rules" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.rules.title}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.rules.items.map((item, index) => (
            <Reveal key={index} delay={index * 80}>
              <article className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-3xl border border-white/60 bg-gradient-to-br from-rose-50/80 via-white to-sky-50/70 p-6 text-center shadow-sm ring-1 ring-white/40 transition-shadow hover:shadow-lg">
                <span className="text-4xl" aria-hidden="true">
                  {icons[index] ?? '✅'}
                </span>
                <p className="text-sm leading-relaxed text-slate-700">{item}</p>
              </article>
            </Reveal>
          ))}
        </div>
        {t.rules.note && (
          <Reveal delay={t.rules.items.length * 80}>
            <p className="mt-6 rounded-3xl border border-blue-100/60 bg-blue-50/40 px-6 py-4 text-sm text-blue-900/80 leading-relaxed text-center">
              {t.rules.note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  )
}
