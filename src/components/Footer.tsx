'use client'

import { useTranslations } from '@/i18n/TranslationProvider'
import Link from 'next/link'
import { MapPin, Mail, Clock, Heart } from 'lucide-react'

export default function Footer() {
  const { t, locale } = useTranslations()

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800/80">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href={`/${locale}`} className="inline-block">
              <span className="text-xl font-bold font-display text-white tracking-tight">
                Przystanek Okrężna
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {locale === 'pl'
                ? 'Przytulny apartament 55 m² na wyłączność z prywatnym parkingiem i klimatyzacją w Ząbkowicach Śląskich. Twoja baza w Góry Sowie i Kotlinę Kłodzką.'
                : 'Cozy private 55 m² apartment with free dedicated parking and air conditioning in Ząbkowice Śląskie. Your base for the Owl Mountains and Kłodzko Valley.'}
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="text-amber-400">★</span>
              <span>4.94 Airbnb · 9.3 Booking.com · Superhost</span>
            </div>
          </div>

          {/* Quick Nav Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {locale === 'pl' ? 'Nawigacja' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {t.header.nav.about}
                </a>
              </li>
              <li>
                <a href="#photos" className="hover:text-white transition-colors">
                  {t.header.nav.photos}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  {t.header.nav.location}
                </a>
              </li>
              <li>
                <a href="#insights" className="hover:text-white transition-colors">
                  {t.header.nav.insights}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  {t.header.nav.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Stay Info & Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              {locale === 'pl' ? 'Informacje o obiekcie' : 'Stay Information'}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Okrężna 15, 57-200 Ząbkowice Śląskie</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  {locale === 'pl'
                    ? 'Zameldowanie: 15:00–22:00 · Wymeldowanie: do 11:00'
                    : 'Check-in: 3:00 PM–10:00 PM · Check-out: by 11:00 AM'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>kontakt@przystanekokrezna.pl</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
              {t.footer.registerInfo}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {t.footer.company}. {locale === 'pl' ? 'Wszystkie prawa zastrzeżone.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{locale === 'pl' ? 'Stworzone z dbałością o gości' : 'Crafted with care for guests'}</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </div>
        </div>
      </div>
    </footer>
  )
}
