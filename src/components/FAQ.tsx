"use client"

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'

type FAQProps = {
  variant?: 'section' | 'embedded'
  className?: string
  showHeading?: boolean
  listClassName?: string
}

export default function FAQ({ variant = 'section', className, showHeading = true, listClassName }: FAQProps = {}) {
  const { t } = useTranslations()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const isSection = variant === 'section'
  const Wrapper = isSection ? 'section' : 'div'
  const containerClass =
    variant === 'section'
      ? 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'
      : className ?? 'space-y-6'
  const listClasses = listClassName ?? 'space-y-4'

  const headingClass = isSection
    ? 'text-4xl font-bold text-gray-900 text-center'
    : 'text-2xl font-semibold text-gray-900'

  const introClass = isSection
    ? 'mt-3 text-lg text-gray-600 text-center'
    : 'mt-2 text-sm text-gray-500'

  return (
    <Wrapper
      {...(isSection ? { id: 'faq', className: 'bg-gray-50 py-20 scroll-mt-24', 'aria-labelledby': 'faq-heading' } : {})}
    >
      <div className={containerClass}>
        {showHeading && (
          <div className={isSection ? 'text-center mb-12' : 'space-y-2 mb-6'}>
            {isSection ? (
              <h2 id="faq-heading" className={headingClass}>
                {t.faq.title}
              </h2>
            ) : (
              <h3 className={headingClass}>{t.faq.title}</h3>
            )}
            <p className={introClass}>{t.contact.lead}</p>
          </div>
        )}
        <div className={listClasses}>
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div key={item.question} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 text-lg font-semibold text-gray-900">{item.question}</span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-300 text-gray-600 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-4 w-4"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Wrapper>
  )
}
