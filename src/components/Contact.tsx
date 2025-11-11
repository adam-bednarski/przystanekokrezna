'use client'

import { useState } from 'react'
import { useTranslations } from '@/i18n/TranslationProvider'

export default function Contact() {
  const { t } = useTranslations()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStatus('idle')
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      setStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 bg-gray-50 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-gray-800 animate-fade-in">{t.contact.title}</h2>
        <div className="text-center">
          <p className="text-gray-600 mb-5 sm:mb-6">{t.contact.reserveLead}</p>
          <div className="flex justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
            <a href={t.contact.airbnbUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-5 py-2.5 text-sm sm:text-base rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              {t.contact.airbnb}
            </a>
            <a href={t.contact.bookingUrl} target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white px-5 py-2.5 text-sm sm:text-base rounded-lg font-semibold hover:bg-green-700 transition-colors">
              {t.contact.booking}
            </a>
          </div>
          <p className="text-base sm:text-lg text-gray-600">{t.contact.lead}</p>
        </div>
        <div className="bg-white p-4 sm:p-5 rounded-lg shadow-md mb-6 sm:mb-8 mt-6 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{t.contact.hostLabel}: {t.contact.hostName}</h3>
                {typeof t.contact.hostAvg === 'number' && (
                  <span className="inline-flex items-center gap-1 text-sm text-yellow-700 bg-yellow-50 px-2 py-0.5 rounded">
                    ⭐ {t.contact.hostAvg.toFixed(1)}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-1">{t.contact.hostBio}</p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 text-xs text-gray-600">
                {Array.isArray(t.contact.hostLanguages) && t.contact.hostLanguages.length > 0 && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">🗣️ {t.contact.hostLanguages.join(', ')}</span>
                )}
                {Array.isArray(t.contact.hostPassions) && t.contact.hostPassions.length > 0 && (
                  <span className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">❤️ {t.contact.hostPassions.join(', ')}</span>
                )}
              </div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <input
              type="text"
              name="name"
              placeholder={t.contact.form.name}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              placeholder={t.contact.form.email}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="tel"
            name="phone"
              placeholder={t.contact.form.phone}
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          <textarea
            name="message"
              placeholder={t.contact.form.message}
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          ></textarea>
          {status === 'success' && (
            <p role="status" className="mb-4 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded px-4 py-2 text-center">
              {t.contact.successMessage}
            </p>
          )}
          {status === 'error' && t.contact.errorMessage && (
            <p role="alert" className="mb-4 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded px-4 py-2 text-center">
              {t.contact.errorMessage}
            </p>
          )}
          <button
            type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
