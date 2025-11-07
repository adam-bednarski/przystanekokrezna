"use client"

import { useTranslations } from '@/i18n/TranslationProvider'

export default function Footer() {
  const { t } = useTranslations()
  return (
    <footer className="bg-gray-900 text-white py-6">
        <div className="text-center text-sm text-gray-500">
          {t.footer.copyright}
        </div>
    </footer>
  )
}
