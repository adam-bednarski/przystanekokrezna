"use client"

import { useMemo } from 'react'
import FAQ from '@/components/FAQ'
import { useTranslations } from '@/i18n/TranslationProvider'

export default function Reviews() {
  const { t } = useTranslations()
  const reviews = Array.isArray(t.reviews.items) ? t.reviews.items : []
  const external = Array.isArray(t.reviews.external) ? t.reviews.external : []

  const aggregate = useMemo(() => {
    if (!external.length) return null

    const stats = external.reduce(
      (acc, platform) => {
        if (!platform.scale || platform.scale <= 0 || platform.reviews <= 0) return acc
        // Convert each platform rating to a 5-point scale so we can compute a consistent weighted average.
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
      totalReviews: stats.totalReviews
    }
  }, [external])

  const aggregateValue = aggregate?.value ?? null

  return (
    <section id="insights" className="bg-gray-50 py-16 sm:py-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr),minmax(0,1.35fr)] lg:items-start lg:gap-x-14">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">{t.faq.title}</h2>
              <p className="max-w-lg text-sm text-gray-600 lg:text-base">{t.contact.lead}</p>
            </div>
            <FAQ variant="embedded" className="space-y-5" listClassName="space-y-4" showHeading={false} />
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-gray-900">{t.reviews.title}</h2>
              {aggregateValue && (
                <div className="flex flex-col gap-3 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                      {t.reviews.aggregateLabel}
                    </p>
                    <p className="text-5xl font-bold text-blue-900">{aggregateValue.toFixed(2)}</p>
                  </div>
                </div>
              )}
              {external.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">{t.reviews.externalSummaryTitle}</h3>
                  <div className="space-y-3">
                    {external.map((platform) => (
                      <a
                        key={platform.source}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 text-gray-800 shadow-sm transition hover:border-blue-200 hover:bg-blue-50"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">{platform.source}</p>
                          <p className="truncate text-sm text-gray-600">
                            {t.reviews.updatedLabel}: {platform.updated}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-700">{platform.rating.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">
                            {t.reviews.rating} {t.reviews.outOf} {platform.scale}
                            <span className="ml-1">
                              ({platform.reviews} {t.reviews.reviewsCountLabel})
                            </span>
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {reviews.map((review, index) => (
                <article
                  key={`${review.name}-${index}`}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <header className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                        {review.name?.slice(0, 1)?.toUpperCase() ?? '?'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        {(review.date || review.nights) && (
                          <p className="text-xs text-gray-500">
                            {review.date ? new Date(review.date).toLocaleDateString() : ''}
                            {review.date && review.nights ? ' · ' : ''}
                            {review.nights ? `${review.nights} ${review.nights === 1 ? 'night' : 'nights'}` : ''}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-yellow-500" aria-label={`${t.reviews.rating} ${review.rating} ${t.reviews.outOf} 5`}>
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <span key={starIndex}>{starIndex < Math.round(review.rating) ? '★' : '☆'}</span>
                      ))}
                    </div>
                  </header>
                  <p className="text-sm leading-relaxed text-gray-700">{review.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
