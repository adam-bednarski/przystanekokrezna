'use client'

import { useTranslations } from '@/i18n/TranslationProvider'
import { Home, Car, Wind, Wifi, UtensilsCrossed, Compass, ShieldCheck, Clock, Baby } from 'lucide-react'

export default function PropertyHighlights() {
  const { locale } = useTranslations()

  const highlights = [
    {
      icon: Home,
      title: locale === 'pl' ? 'Cały apartament 55 m²' : 'Entire 55 m² apartment',
      description:
        locale === 'pl'
          ? 'Zajmuje całe drugie piętro domu z osobnym wejściem. Pełna prywatność, przestronny salon, sypialnia i łazienka.'
          : 'Occupies the entire second floor of a private house with its own entrance. Full privacy, large living room, bedroom, and bathroom.',
    },
    {
      icon: Car,
      title: locale === 'pl' ? 'Prywatny parking & 1 min od DK8' : 'Free private parking & 1 min from DK8',
      description:
        locale === 'pl'
          ? 'Bezpieczne miejsce postojowe bezpośrednio na ogrodzonej posesji. Bardzo szybki dojazd z trasy krajowej nr 8.'
          : 'Secure parking spot directly on the gated property. Fast, easy access just 1 minute from the DK8 highway.',
    },
    {
      icon: Baby,
      title: locale === 'pl' ? 'Przyjazny rodzinom & łóżeczko' : 'Family friendly & baby crib',
      description:
        locale === 'pl'
          ? 'Dla najmłodszych gości dostępne jest wygodne łóżeczko dziecięce. Zapewniamy także zamykany schowek na wózek.'
          : 'A comfortable travel cot / crib is provided for little ones, plus locked storage for strollers.',
    },
    {
      icon: Wind,
      title: locale === 'pl' ? 'Klimatyzacja i ogrzewanie' : 'Air conditioning & heating',
      description:
        locale === 'pl'
          ? 'Nowoczesny system klimatyzacji zapewnia optymalną temperaturę w upalne letnie dni oraz przytulne ciepło zimą.'
          : 'Modern air conditioning provides refreshing cool in summer and cozy warmth during the winter months.',
    },
    {
      icon: Wifi,
      title: locale === 'pl' ? 'Rowery, narty & szybkie Wi-Fi' : 'Bike/Ski storage & fast Wi-Fi',
      description:
        locale === 'pl'
          ? 'Zamykane miejsce na rowery i narty. Niezależny prywatny router z szybkim łączem idealny do pracy zdalnej.'
          : 'Safe locked storage for bikes and skis. Private high-speed router perfect for work and streaming.',
    },
    {
      icon: Compass,
      title: locale === 'pl' ? 'Baza w Góry Sowie i Kłodzko' : 'Base for Owl Mountains & Valley',
      description:
        locale === 'pl'
          ? '10 min spacerem na Rynek, 12 min do Pałacu w Kamieńcu, 15 min do Twierdzy Srebrna Góra i 25 min do Kłodzka.'
          : '10 min walk to Town Square, 12 min to Kamieniec Palace, 15 min to Srebrna Góra, and 25 min to Kłodzko.',
    },
  ]

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
            {locale === 'pl' ? 'Komfort i wygoda' : 'Comfort & Convenience'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight [text-wrap:balance]">
            {locale === 'pl' ? 'Dlaczego goście wybierają Przystanek Okrężna' : 'Why guests choose Przystanek Okrężna'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed [text-wrap:balance]">
            {locale === 'pl'
              ? 'Wszystko, czego potrzebujesz na udany urlop z rodziną, weekendowy wypad lub aktywny wyjazd w góry.'
              : 'Everything you need for a relaxing family vacation, weekend retreat, or active mountain excursion.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {highlights.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-700 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Reassurance strip */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-slate-100/70 border border-slate-200 flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm text-slate-700 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{locale === 'pl' ? 'Zamykane miejsce na rowery, narty i wózek' : 'Locked storage for bikes, skis & strollers'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>{locale === 'pl' ? 'Zameldowanie od 15:00 do 22:00' : 'Check-in from 3:00 PM to 10:00 PM'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-amber-600" />
            <span>{locale === 'pl' ? 'Łóżeczko dziecięce na wyposażeniu' : 'Baby crib included'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
