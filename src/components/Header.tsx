'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import { PL, US } from 'country-flag-icons/react/3x2'
import Link from 'next/link'
import { Menu, X, Globe, CalendarCheck } from 'lucide-react'

const SECTION_IDS = ['about', 'photos', 'location', 'insights', 'contact'] as const
type SectionId = typeof SECTION_IDS[number]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { locale, t } = useTranslations()
  const [active, setActive] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const manualOverrideRef = useRef<{ id: SectionId | null; until: number }>({ id: null, until: 0 })

  const navItems = [
    { id: 'about' as SectionId, label: t.header.nav.about, anchor: 'about' },
    { id: 'photos' as SectionId, label: t.header.nav.photos, anchor: 'photos' },
    { id: 'location' as SectionId, label: t.header.nav.location, anchor: 'location' },
    { id: 'insights' as SectionId, label: t.header.nav.insights, anchor: 'insights' },
    { id: 'contact' as SectionId, label: t.header.nav.contact, anchor: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = useCallback((id: SectionId, anchorId: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    manualOverrideRef.current = { id, until: Date.now() + 800 }
    setActive(id)
    setIsOpen(false)
    setLangOpen(false)
    const el = document.getElementById(anchorId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const switchLocale = (targetLocale: 'pl' | 'en') => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
    window.location.href = `/${targetLocale}`
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 pt-3 pb-3'
          : 'bg-white/95 backdrop-blur-sm pt-4 pb-4 border-b border-slate-200/50'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <Link
            href={`/${locale}`}
            className="flex flex-col group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md shrink-0"
          >
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
              Przystanek Okrężna
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Ząbkowice Śląskie · Kotlina Kłodzka
            </span>
          </Link>

          {/* Zone 2: Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.anchor}`}
                onClick={handleNavClick(item.id, item.anchor)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                  active === item.id
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Zone 3: Actions (Language Switch + Book CTA) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Language dropdown */}
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                onClick={() => setLangOpen((v) => !v)}
                aria-expanded={langOpen}
                aria-label="Change language"
              >
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span className="uppercase">{locale}</span>
                {locale === 'pl' ? <PL className="h-3 w-4.5 rounded-xs" /> : <US className="h-3 w-4.5 rounded-xs" />}
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50 animate-fade-in">
                  <button
                    type="button"
                    onClick={() => {
                      setLangOpen(false)
                      switchLocale('pl')
                    }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-xs text-left transition-colors ${
                      locale === 'pl' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <PL className="h-3.5 w-5 rounded-xs" />
                    <span>Polski (PL)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLangOpen(false)
                      switchLocale('en')
                    }}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 text-xs text-left transition-colors ${
                      locale === 'en' ? 'bg-blue-50 text-blue-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <US className="h-3.5 w-5 rounded-xs" />
                    <span>English (EN)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Book Now Primary Button */}
            <a
              href={`#contact`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 whitespace-nowrap"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>{locale === 'pl' ? 'Rezerwacja' : 'Book Stay'}</span>
            </a>

            {/* Mobile menu hamburger */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-100 pb-2 space-y-1 animate-fade-in">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.anchor}`}
                onClick={handleNavClick(item.id, item.anchor)}
                className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active === item.id ? 'bg-slate-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
