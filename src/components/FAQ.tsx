'use client'

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import { ChevronDown } from 'lucide-react'

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
      ? 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'
      : className ?? 'space-y-4'
  const listClasses = listClassName ?? 'space-y-3'

  return (
    <Wrapper
      {...(isSection ? { id: 'faq', className: 'bg-slate-50 py-16 sm:py-20 scroll-mt-24', 'aria-labelledby': 'faq-heading' } : {})}
    >
      <div className={containerClass}>
        {showHeading && (
          <div className="text-center mb-10">
            <h2 id="faq-heading" className="text-3xl font-bold font-display text-slate-900 tracking-tight">
              {t.faq.title}
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">{t.contact.lead}</p>
          </div>
        )}

        <div className={listClasses}>
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.question}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'border-blue-200 bg-white shadow-xs' : 'border-slate-200/90 bg-white/80 hover:bg-white'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left font-semibold text-slate-900 text-sm sm:text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1 leading-snug">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
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
