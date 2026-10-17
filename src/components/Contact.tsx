'use client'

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'
import Image from 'next/image'
import { Send, CheckCircle2, AlertCircle, ExternalLink, Mail, Phone, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react'

export default function Contact() {
  const { t, locale } = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus('idle')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.message || (locale === 'pl' ? 'Wystąpił błąd przy wysyłaniu.' : 'Failed to send message.'))
      }

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error: any) {
      setStatus('error')
      setErrorMessage(error.message || (locale === 'pl' ? 'Wystąpił błąd. Spróbuj ponownie.' : 'An error occurred. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600 block mb-2">
            {locale === 'pl' ? 'Rezerwacja i kontakt' : 'Booking & Inquiries'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight animate-fade-in [text-wrap:balance]">
            {t.contact.title}
          </h2>
          <p className="mt-2 text-slate-600 text-sm sm:text-base [text-wrap:balance]">
            {t.contact.lead}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Links & Host Profile (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Booking Portals Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                  {locale === 'pl' ? 'Szybka rezerwacja online' : 'Instant Online Booking'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {t.contact.reserveLead}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={t.contact.airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 hover:shadow-xs transition-all text-rose-900 font-semibold text-xs sm:text-sm group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>{t.contact.airbnb}</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <a
                  href={t.contact.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:shadow-xs transition-all text-blue-900 font-semibold text-xs sm:text-sm group"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>{t.contact.booking}</span>
                  </span>
                  <ExternalLink className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Host Card with Avatar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                  <Image
                    src="/photos/avatar.jpg"
                    alt={t.contact.hostName}
                    fill
                    sizes="56px"
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">
                      {t.contact.hostLabel}: {t.contact.hostName}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full">
                      ★ 4.94 Superhost
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{locale === 'pl' ? 'Odpowiada zazwyczaj w ciągu 1 godziny' : 'Usually responds within 1 hour'}</span>
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {t.contact.hostBio}
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2 text-xs text-slate-600">
                {Array.isArray(t.contact.hostLanguages) && t.contact.hostLanguages.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    🗣️ {t.contact.hostLanguages.join(', ')}
                  </span>
                )}
                {Array.isArray(t.contact.hostPassions) && t.contact.hostPassions.length > 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                    <Heart className="w-3 h-3 text-rose-500" />
                    <span>{t.contact.hostPassions.join(', ')}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Direct contact info */}
            <div className="bg-slate-100/70 rounded-2xl p-4 sm:p-5 border border-slate-200 text-xs sm:text-sm text-slate-600 space-y-2">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                <span>kontakt@przystanekokrezna.pl</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{locale === 'pl' ? 'Zapewniamy pełną dyskrecję i ochronę danych' : 'We guarantee full privacy & data protection'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span>{locale === 'pl' ? 'Napisz bezpośrednio do nas' : 'Send a direct message'}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500">
                  {locale === 'pl'
                    ? 'Masz pytania dotyczące pobytu lub wolnych terminów? Chętnie odpowiemy!'
                    : 'Have questions about dates or amenities? We are here to help!'}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contact.form.name} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={locale === 'pl' ? 'np. Anna Kowalska' : 'e.g. John Smith'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.contact.form.email} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="twoj@email.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.contact.form.phone} <span className="text-slate-400 text-[11px]">({locale === 'pl' ? 'opcjonalnie' : 'optional'})</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+48 000 000 000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.contact.form.message} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={
                    locale === 'pl'
                      ? 'Wpisz treść wiadomości, planowaną liczbę gości lub interesujące Cię terminy...'
                      : 'Enter your inquiry, planned number of guests, or preferred dates...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                ></textarea>
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{t.contact.successMessage}</span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-2.5 animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{errorMessage || t.contact.errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>{t.contact.form.sending}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t.contact.form.submit}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
