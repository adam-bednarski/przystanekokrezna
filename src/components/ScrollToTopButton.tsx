"use client"

import { useEffect, useState } from "react"
import { useTranslations } from '@/i18n/TranslationProvider'

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)
  const { t } = useTranslations()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop
      setVisible(y > 300)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const onClick = () => {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t.ui.scrollTop}
      className={`fixed bottom-[calc(env(safe-area-inset-bottom,0)+1rem)] right-[calc(env(safe-area-inset-right,0)+1rem)] z-[60] rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 m-4"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 4.5a.75.75 0 0 1 .53.22l6.5 6.5a.75.75 0 1 1-1.06 1.06L12.75 6.31V19.5a.75.75 0 0 1-1.5 0V6.31l-5.22 5.97a.75.75 0 0 1-1.06-1.06l6.5-6.5A.75.75 0 0 1 12 4.5z"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">{t.ui.scrollTop}</span>
    </button>
  )
}
