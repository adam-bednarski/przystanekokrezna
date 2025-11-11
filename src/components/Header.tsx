'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import { PL, US } from 'country-flag-icons/react/3x2'
import Link from 'next/link'

const SECTION_IDS = ['location', 'about', 'photos', 'contact', 'insights'] as const
const SECTION_ANCHORS: Record<SectionId, string> = {
  location: 'location',
  about: 'about',
  photos: 'photos',
  contact: 'contact',
  insights: 'insights',
}
type SectionId = typeof SECTION_IDS[number]
const MANUAL_LOCK_DURATION = 900

const getNow = () =>
  (typeof performance !== 'undefined' && typeof performance.now === 'function'
    ? performance.now()
    : Date.now())

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { locale, t } = useTranslations()
  const [active, setActive] = useState<string | null>(null)
  const manualOverrideRef = useRef<{ id: SectionId | null; until: number }>({ id: null, until: 0 })
  const navItems = SECTION_IDS.map((id) => ({ id, label: t.header.nav[id as keyof typeof t.header.nav], anchor: SECTION_ANCHORS[id] }))

  const handleNavClick = useCallback((id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const anchorId = SECTION_ANCHORS[id]
    manualOverrideRef.current = { id, until: getNow() + MANUAL_LOCK_DURATION }
    setActive(id)
    const el = document.getElementById(anchorId)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  // Scroll-spy: respect each section's scroll-margin-top so highlighting matches anchor behavior
  useEffect(() => {
    const anchorIds = Array.from(new Set(SECTION_IDS.map((id) => SECTION_ANCHORS[id])))
    const sections = anchorIds
      .map((anchor) => document.getElementById(anchor))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return

    const pickNavForAnchor = (anchor: string, previous: SectionId | null): SectionId => {
      const candidates = SECTION_IDS.filter((id) => SECTION_ANCHORS[id] === anchor)
      if (previous && candidates.includes(previous)) return previous
      return candidates[0] ?? SECTION_IDS[0]
    }

    const computeCurrentAnchor = (): string => {
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0
      const targetLine = headerHeight + (viewportHeight - headerHeight) * 0.35
      let selected = anchorIds[0]

      for (const anchor of anchorIds) {
        const element = document.getElementById(anchor)
        if (!element) continue
        const rect = element.getBoundingClientRect()

        if (rect.top <= targetLine + 1) {
          selected = anchor
          if (rect.bottom >= targetLine - 1) {
            break
          }
          continue
        }

        if (rect.top > targetLine + 1) {
          break
        }
      }

      return selected
    }

    const pickFallback = () => {
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 0
      const threshold = window.scrollY + headerHeight + 8
      let current: string | null = null
      for (const anchor of anchorIds) {
        const el = document.getElementById(anchor)
        if (!el) continue
        if (el.offsetTop <= threshold) {
          current = anchor
        }
      }
      return current ?? anchorIds[0]
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const now = getNow()
        if (manualOverrideRef.current.until > now) {
          if (manualOverrideRef.current.id) {
            setActive((prev) => (prev === manualOverrideRef.current.id ? prev : manualOverrideRef.current.id))
          }
          return
        }

        if (manualOverrideRef.current.id) {
          manualOverrideRef.current.id = null
          manualOverrideRef.current.until = 0
        }
        if (!entries.length) return

        const bestAnchor = computeCurrentAnchor()
        const fallbackAnchor = pickFallback()
        setActive((prev) => {
          const candidate = bestAnchor ?? fallbackAnchor
          const next = pickNavForAnchor(candidate, prev as SectionId | null)
          return prev === next ? prev : next
        })
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75],
      }
    )

    sections.forEach((section) => observer.observe(section))

    const handleBottom = () => {
      if (manualOverrideRef.current.until > getNow()) return
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      if (!nearBottom) return
      setActive((prev) => (prev === 'insights' ? prev : 'insights'))
    }

    window.addEventListener('scroll', handleBottom, { passive: true })
    handleBottom()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleBottom)
    }
  }, [])

  const switchLocale = (targetLocale: 'pl' | 'en') => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=${60 * 60 * 24 * 365}`
    window.location.href = `/${targetLocale}`
  }

  const renderLanguageMenu = () => (
    <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow ring-1 ring-gray-200 py-1 z-50">
      <a
        href="#"
        className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        onClick={(e) => {
          e.preventDefault()
          setLangOpen(false)
          switchLocale('pl')
        }}
      >
        <PL title="Polski" className="h-4 w-6" />
        <span>{t.header.lang.pl}</span>
      </a>
      <a
        href="#"
        className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
        onClick={(e) => {
          e.preventDefault()
          setLangOpen(false)
          switchLocale('en')
        }}
      >
        <US title="English" className="h-4 w-6" />
        <span>{t.header.lang.en}</span>
      </a>
    </div>
  )

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm pt-[env(safe-area-inset-top)]">
      <nav className="max-w-8xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between md:hidden py-3 sm:py-4">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => {
              setIsOpen((prev) => !prev)
              setLangOpen(false)
            }}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
          <Link href={`/${locale}#hero`} className="flex flex-col items-center text-center">
            <span className="text-base font-bold text-gray-900 tracking-tight">
              {t.header.brand}
            </span>
            <span className="text-xs text-gray-500">
              {t.header.tagline}
            </span>
          </Link>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              <span>{locale === 'pl' ? 'PL' : 'EN'}</span>
              {locale === 'pl' ? <PL title="Polski" className="h-4 w-6" /> : <US title="English" className="h-4 w-6" />}
              <span className="sr-only">{locale === 'pl' ? 'Polski' : 'English'}</span>
            </button>
            {langOpen && renderLanguageMenu()}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-[1fr,auto,1fr] md:items-center py-4">
          <div className="flex items-center gap-2 text-left md:justify-self-start">
            <Link href={`/${locale}#hero`} className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                {t.header.brand}
              </span>
              <span className="text-sm text-gray-500">
                {t.header.tagline}
              </span>
            </Link>
          </div>
          <div className="flex justify-center text-nowrap md:justify-self-center" style={{ zIndex: '1' }}>
            <div className="flex items-center gap-3 rounded-full bg-white/80 p-1.5 ring-1 ring-gray-200 shadow-md">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.anchor}`}
                  onClick={handleNavClick(item.id)}
                  className={`px-5 py-2.5 rounded-full text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active === item.id
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 md:justify-self-end">
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                <span>{locale === 'pl' ? 'Język:' : 'Language:'}</span>
                {locale === 'pl' ? <PL title="Polski" className="h-4 w-6" /> : <US title="English" className="h-4 w-6" />}
                <span className="sr-only">{locale === 'pl' ? 'Polski' : 'English'}</span>
              </button>
              {langOpen && renderLanguageMenu()}
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.anchor}`}
                onClick={(event) => {
                  handleNavClick(item.id)(event)
                  setIsOpen(false)
                  setLangOpen(false)
                }}
                className={`block rounded-md px-3 py-2 text-base font-semibold hover:bg-gray-100 ${
                  active === item.id ? 'bg-gray-200 text-gray-900' : 'text-gray-800'
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
