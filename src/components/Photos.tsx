'use client'

import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react'

interface PhotoItem {
  src: string
  category: 'living' | 'kitchen' | 'bedroom' | 'bathroom'
  titlePl: string
  titleEn: string
}

export default function Photos() {
  const { t, locale } = useTranslations()

  const photoList: PhotoItem[] = [
    {
      src: 'photos/682164891.jpg',
      category: 'living',
      titlePl: 'Salon ze strefą wypoczynkową i Smart TV',
      titleEn: 'Living room with lounge area and Smart TV',
    },
    {
      src: 'photos/682164878.jpg',
      category: 'kitchen',
      titlePl: 'W pełni wyposażony aneks kuchenny ze stołem',
      titleEn: 'Fully equipped kitchenette with dining table',
    },
    {
      src: 'photos/682164893.jpg',
      category: 'bedroom',
      titlePl: 'Sypialnia z wygodnym łóżkiem małżeńskim',
      titleEn: 'Bedroom with comfortable queen-size bed',
    },
    {
      src: 'photos/682164896.jpg',
      category: 'bathroom',
      titlePl: 'Nowoczesna łazienka z prysznicem i pralką',
      titleEn: 'Modern bathroom with walk-in shower and washing machine',
    },
    {
      src: 'photos/682164897.jpg',
      category: 'living',
      titlePl: 'Jasny salon z klimatyzacją i biurkiem',
      titleEn: 'Bright living space with air conditioning and workspace',
    },
    {
      src: 'photos/682164903.jpg',
      category: 'bedroom',
      titlePl: 'Spokojna sypialnia z roletami zaciemniającymi',
      titleEn: 'Peaceful bedroom with blackout blinds',
    },
    {
      src: 'photos/682164902.jpg',
      category: 'kitchen',
      titlePl: 'Kuchnia ze zmywarką, piekarnikiem i ekspresem',
      titleEn: 'Kitchen with dishwasher, oven and coffee machine',
    },
    {
      src: 'photos/682164877.jpg',
      category: 'living',
      titlePl: 'Przestronne wnętrze apartamentu (55 m²)',
      titleEn: 'Spacious apartment interior (55 m²)',
    },
  ]

  const [filter, setFilter] = useState<'all' | 'living' | 'bedroom' | 'kitchen' | 'bathroom'>('all')
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const filteredPhotos = filter === 'all' ? photoList : photoList.filter((p) => p.category === filter)

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }, [])

  const closeLightbox = useCallback(() => setIsOpen(false), [])

  const showPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + filteredPhotos.length) % filteredPhotos.length)
  }, [filteredPhotos.length])

  const showNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % filteredPhotos.length)
  }, [filteredPhotos.length])

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
    <section id="photos" className="py-16 sm:py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
            {locale === 'pl' ? 'Wnętrza apartamentu' : 'Apartment gallery'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight animate-fade-in [text-wrap:balance]">
            {t.photos.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base [text-wrap:balance]">
            {locale === 'pl'
              ? 'Zobacz rzeczywiste zdjęcia apartamentu Przystanek Okrężna w Ząbkowicach Śląskich.'
              : 'Browse real, unedited photographs of Przystanek Okrężna in Ząbkowice Śląskie.'}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs sm:text-sm font-semibold">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'pl' ? 'Wszystkie (8)' : 'All (8)'}
            </button>
            <button
              type="button"
              onClick={() => setFilter('living')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                filter === 'living' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'pl' ? 'Salon' : 'Living room'}
            </button>
            <button
              type="button"
              onClick={() => setFilter('bedroom')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                filter === 'bedroom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'pl' ? 'Sypialnia' : 'Bedroom'}
            </button>
            <button
              type="button"
              onClick={() => setFilter('kitchen')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                filter === 'kitchen' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'pl' ? 'Kuchnia' : 'Kitchen'}
            </button>
            <button
              type="button"
              onClick={() => setFilter('bathroom')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                filter === 'bathroom' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {locale === 'pl' ? 'Łazienka' : 'Bathroom'}
            </button>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.src}
              className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-100 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-4/3 w-full overflow-hidden">
                <Image
                  src={`/${photo.src}`}
                  alt={locale === 'pl' ? photo.titlePl : photo.titleEn}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="text-white text-xs font-medium flex items-center justify-between w-full">
                    <span className="truncate pr-2">
                      {locale === 'pl' ? photo.titlePl : photo.titleEn}
                    </span>
                    <Maximize2 className="w-4 h-4 shrink-0 text-white/80" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Caption Bar */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <Camera className="w-4 h-4 text-slate-400" />
          <span>
            {locale === 'pl'
              ? 'Kliknij na dowolne zdjęcie, aby otworzyć galerię w pełnym rozmiarze.'
              : 'Click any photo to view in full resolution lightbox.'}
          </span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && filteredPhotos[currentIndex] && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          {/* Top Bar: Title + Counter + Close Button */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full pt-2">
            <span className="text-sm font-medium text-slate-200 truncate pr-4">
              {locale === 'pl'
                ? filteredPhotos[currentIndex].titlePl
                : filteredPhotos[currentIndex].titleEn}
            </span>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-slate-400 font-mono tabular-nums">
                {currentIndex + 1} / {filteredPhotos.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Central Image Container */}
          <div
            className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[75vh]">
              <Image
                src={`/${filteredPhotos[currentIndex].src}`}
                alt={
                  locale === 'pl'
                    ? filteredPhotos[currentIndex].titlePl
                    : filteredPhotos[currentIndex].titleEn
                }
                fill
                sizes="100vw"
                className="object-contain rounded-lg"
                priority
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Prev button */}
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 sm:bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              aria-label="Poprzednie"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next button */}
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 sm:bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
              aria-label="Następne"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnail Strip */}
          <div
            className="flex items-center justify-center gap-2 max-w-4xl mx-auto overflow-x-auto pb-2 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredPhotos.map((thumb, idx) => (
              <button
                key={thumb.src}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`relative w-14 h-10 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  currentIndex === idx ? 'border-blue-500 scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <Image
                  src={`/${thumb.src}`}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
