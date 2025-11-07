"use client"

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import Image from 'next/image'

export default function Photos() {
  const { t } = useTranslations()
  const photos = [
    'photos/682164878.jpg',
    'photos/682164891.jpg',
    'photos/682164893.jpg',
    'photos/682164896.jpg',
    'photos/682164897.jpg',
    'photos/682164899.jpg',
    'photos/682164902.jpg'
  ]

  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [showAll, setShowAll] = useState(false)

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setIsOpen(false), [])

  const showPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length)
  }, [photos.length])

  const showNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length)
  }, [photos.length])

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') closeLightbox()
        if (e.key === 'ArrowLeft') showPrev()
        if (e.key === 'ArrowRight') showNext()
      }
      window.addEventListener('keydown', onKey)
      return () => {
        window.removeEventListener('keydown', onKey)
        document.body.style.overflow = original
      }
    }
  }, [isOpen, closeLightbox, showPrev, showNext])

  return (
  <section id="photos" className="py-20 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 animate-fade-in">{t.photos.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showAll ? photos : photos.slice(0, 6)).map((photo, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow group cursor-zoom-in"
              onClick={() => openLightbox(index)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={`/${photo}`}
                  alt={`${t.photos.alt} ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <button
                type="button"
                aria-label={t.photos.openLabel}
                onClick={(e) => {
                  e.stopPropagation()
                  openLightbox(index)
                }}
                className="absolute top-2 right-2 z-10 p-2 rounded-md bg-black/50 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 hover:bg-black/70 focus:outline-none focus:ring-2 focus:ring-white/70"
                title={t.photos.openLabel}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M20 20l-3.5-3.5" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {photos.length > 6 && (
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              aria-label={showAll ? t.photos.showLess : t.photos.showMore}
              title={showAll ? t.photos.showLess : t.photos.showMore}
              className={`h-14 w-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600 ${showAll ? '' : 'animate-float'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`h-7 w-7 transition-transform duration-300 ${showAll ? 'rotate-180' : 'rotate-0'}`}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span className="sr-only">{showAll ? t.photos.showLess : t.photos.showMore}</span>
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <div className="relative max-w-7xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-[80vh]">
              <Image
                src={`/${photos[currentIndex]}`}
                alt={`${t.photos.alt} ${currentIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain rounded-md shadow-2xl"
                priority={false}
              />
            </div>

            <button
              type="button"
              aria-label={t.photos.closeLabel}
              onClick={closeLightbox}
              className="absolute -top-3 -right-3 md:top-2 md:right-2 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
              title={t.photos.closeLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <button
              type="button"
              aria-label={t.photos.prevLabel}
              onClick={showPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
              title={t.photos.prevLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              aria-label={t.photos.nextLabel}
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white"
              title={t.photos.nextLabel}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
