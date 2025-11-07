"use client"

import { useTranslations } from '@/i18n/TranslationProvider'

export default function Location() {
  const { t } = useTranslations()
  return (
    <section id="location" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl font-bold text-center mb-8 text-gray-800 animate-fade-in">{t.location.title}</h2>
        <div className="flex flex-col items-center text-gray-700 mb-8">
          <div className="flex items-center space-x-3 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-4.35-6-9a6 6 0 1 1 12 0c0 4.65-6 9-6 9Z" />
              <circle cx="12" cy="12" r="2.5" />
            </svg>
            <span>{t.location.address}</span>
          </div>
        </div>
        <div className="rounded-lg overflow-hidden shadow-md">
          <iframe
            title={t.location.mapTitle}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.016437105737!2d16.8004771!3d50.589647799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470e255bda197f7f%3A0xd7fcf18826975804!2zUHJ6eXN0YW5layBPa3LEmcW8bmE!5e0!3m2!1spl!2spl!4v1757773493986!5m2!1spl!2spl"
            className="w-full h-[320px] sm:h-[380px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
