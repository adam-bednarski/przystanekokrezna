'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setVisible(y > 350)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.ui.scrollTop}
      className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-xl backdrop-blur-sm border border-slate-700/60 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
        visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
      <span className="sr-only">{t.ui.scrollTop}</span>
    </button>
  )
}
