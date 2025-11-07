"use client"

import { useTranslations } from '@/i18n/TranslationProvider'

export default function Rules() {
  const { t } = useTranslations()
  return (
    <section id="rules" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.rules.title}</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          {t.rules.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
