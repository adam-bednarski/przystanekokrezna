'use client'

import { useMemo } from 'react'
import FAQ from '@/components/FAQ'
import { useTranslations } from '@/i18n/TranslationProvider'
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function Reviews() {
  const { t, locale } = useTranslations()
  const reviews = Array.isArray(t.reviews.items) ? t.reviews.items : []
  const external = t.reviews.external

  const aggregate = useMemo(() => {
    if (!Array.isArray(external) || !external.length) return null

    const stats = external.reduce(
      (acc, platform) => {
        if (!platform.scale || platform.scale <= 0 || platform.reviews <= 0) return acc
        const normalized = (platform.rating / platform.scale) * 5
        acc.weightedSum += normalized * platform.reviews
        acc.totalReviews += platform.reviews
        return acc
      },
      { weightedSum: 0, totalReviews: 0 }
    )

    if (!stats.totalReviews) return null

    return {
      value: Math.min(5, stats.weightedSum / stats.totalReviews),
      totalReviews: stats.totalReviews,
    }
  }, [external])

  const aggregateValue = aggregate?.value ?? 4.94

  return (
    <section id="insights" className="bg-white py-16 sm:py-24 scroll-mt-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-12">
          {/* Column 1: FAQ Section (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
                {locale === 'pl' ? 'Wszystko co musisz wiedzieć' : 'Frequently Asked Questions'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight [text-wrap:balance]">
                {t.faq.title}
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base [text-wrap:balance]">
                {locale === 'pl'
                  ? 'Odpowiedzi na najczęściej zadawane pytania dotyczące pobytu i rezerwacji.'
                  : 'Common questions and answers regarding your stay and booking process.'}
              </p>
            </div>

            <FAQ variant="embedded" className="space-y-3" listClassName="space-y-3" showHeading={false} />
          </div>

          {/* Column 2: Guest Reviews & Scores (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
                {locale === 'pl' ? 'Doświadczenia gości' : 'Guest experiences'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight [text-wrap:balance]">
                {t.reviews.title}
              </h2>
            </div>

            {/* Verified Platform Summary Cards (informational, without duplicate links) */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">Airbnb</span>
                  <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">Superhost</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold font-mono text-slate-900">4.94</span>
                  <span className="text-xs text-slate-500">/ 5.0</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {locale === 'pl' ? '68 zweryfikowanych opinii gości' : '68 verified guest reviews'}
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 shadow-2xs">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-900 text-sm uppercase tracking-wider">Booking.com</span>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{locale === 'pl' ? 'Znakomity' : 'Superb'}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold font-mono text-slate-900">9.3</span>
                  <span className="text-xs text-slate-500">/ 10</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {locale === 'pl' ? '54 zweryfikowane opinie gości' : '54 verified guest reviews'}
                </p>
              </div>
            </div>

            {/* Individual Reviews Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {reviews.map((review, index) => (
                <article
                  key={`${review.name}-${index}`}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {review.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm leading-tight">{review.name}</p>
                          <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{locale === 'pl' ? 'Zweryfikowany gość' : 'Verified stay'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex text-amber-400">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {review.nights && (
                    <div className="text-[11px] text-slate-400 border-t border-slate-100 pt-2 flex items-center justify-between">
                      <span>{review.nights} {locale === 'pl' ? (review.nights === 1 ? 'noc' : review.nights < 5 ? 'noce' : 'nocy') : 'nights'}</span>
                      {review.date && <span>{review.date}</span>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
