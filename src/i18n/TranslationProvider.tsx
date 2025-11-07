'use client'

import React, { createContext, useContext, useMemo } from 'react'
import { getDictionary, type Dictionary } from './dictionaries'

export type I18nContextType = { locale: string; t: Dictionary }

const I18nContext = createContext<I18nContextType | null>(null)

export function TranslationProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  const value = useMemo<I18nContextType>(() => ({ locale, t: getDictionary(locale) }), [locale])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslations() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useTranslations must be used within TranslationProvider')
  return ctx
}
