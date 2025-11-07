'use client'

import { useCallback, useEffect, useState, type MouseEvent } from 'react'
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const { locale, t } = useTranslations()
  const [active, setActive] = useState<string | null>(null)
  const navItems = SECTION_IDS.map((id) => ({ id, label: t.header.nav[id as keyof typeof t.header.nav], anchor: SECTION_ANCHORS[id] }))

  const handleNavClick = useCallback((id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    const anchorId = SECTION_ANCHORS[id]
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

    const visibility = new Map<string, number>()

    const pickNavForAnchor = (anchor: string, previous: SectionId | null): SectionId => {
      const candidates = SECTION_IDS.filter((id) => SECTION_ANCHORS[id] === anchor)
      if (previous && candidates.includes(previous)) return previous
      return candidates[0] ?? SECTION_IDS[0]
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
        entries.forEach((entry) => {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0)
        })

        const mostVisibleAnchor = Array.from(visibility.entries())
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1])[0]?.[0]

        if (mostVisibleAnchor) {
          setActive((prev) => {
            const next = pickNavForAnchor(mostVisibleAnchor, prev as SectionId | null)
            return prev === next ? prev : next
          })
          return
        }

        const fallbackAnchor = pickFallback()
        setActive((prev) => {
          const next = pickNavForAnchor(fallbackAnchor, prev as SectionId | null)
          return prev === next ? prev : next
        })
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0, 0.05, 0.15, 0.3, 0.5, 0.75],
      }
    )

    sections.forEach((section) => {
      visibility.set(section.id, 0)
      observer.observe(section)
    })

    const handleBottom = () => {
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

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 shadow-sm pt-[env(safe-area-inset-top)]">
      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center py-4">
          <div className="flex items-center gap-2 text-left">
            <Link href={`/${locale}#hero`} className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 tracking-tight">
                {t.header.brand}
              </span>
              <span className="text-sm text-gray-500">
                {t.header.tagline}
              </span>
            </Link>
          </div>
          {/* Center nav */}
          <div className="hidden md:flex justify-center text-nowrap" style={{ zIndex: '1' }}>
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

          {/* Right: language and burger */}
          <div className="flex items-center justify-end gap-3">
            <div className="relative">
              <button
                type="button"
                className="flex items-center space-x-2 px-3 py-1.5 rounded-md border border-gray-200 hover:bg-gray-50"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={langOpen}
              >
                {locale === 'pl' ? (
                  <PL title="Polski" className="h-4 w-6" />
                ) : (
                  <US title="English" className="h-4 w-6" />
                )}
                <span className="sr-only">{locale === 'pl' ? 'Polski' : 'English'}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow ring-1 ring-gray-200 py-1 z-50">
                  <a
                    href="#"
                    className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={(e) => {
                      e.preventDefault()
                      document.cookie = `NEXT_LOCALE=pl; path=/; max-age=${60 * 60 * 24 * 365}`
                      window.location.href = `/pl`
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
                      document.cookie = `NEXT_LOCALE=en; path=/; max-age=${60 * 60 * 24 * 365}`
                      window.location.href = `/en`
                    }}
                  >
                    <US title="English" className="h-4 w-6" />
                    <span>{t.header.lang.en}</span>
                  </a>
                </div>
              )}
            </div>
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              <div className={`w-6 h-0.5 bg-gray-600 transition-transform ${isOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 mt-1 transition-opacity ${isOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-600 mt-1 transition-transform ${isOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.anchor}`}
                onClick={(event) => {
                  handleNavClick(item.id)(event)
                  setIsOpen(false)
                }}
                className={`block px-3 py-3 text-lg font-semibold rounded-md hover:bg-gray-100 ${active === item.id ? 'bg-gray-200 text-gray-900' : 'text-gray-800'}`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <div className="flex items-center space-x-3 py-2">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700"
                  onClick={(e) => {
                    e.preventDefault()
                    document.cookie = `NEXT_LOCALE=pl; path=/; max-age=${60 * 60 * 24 * 365}`
                    window.location.href = `/pl`
                  }}
                  aria-label="Polski"
                >
                  <PL title="Polski" className="h-4 w-6">Polski</PL>
                </a>
              </div>
              <div className="flex items-center space-x-3 py-2">
                <a
                  href="#"
                  className="flex items-center space-x-2 text-gray-700"
                  onClick={(e) => {
                    e.preventDefault()
                    document.cookie = `NEXT_LOCALE=en; path=/; max-age=${60 * 60 * 24 * 365}`
                    window.location.href = `/en`
                  }}
                  aria-label="English"
                >
                  <US title="English" className="h-4 w-6" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
