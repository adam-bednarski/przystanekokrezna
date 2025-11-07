import type { Metadata } from 'next'
import '../globals.css'
import { TranslationProvider } from '@/i18n/TranslationProvider'
import { getDictionary } from '@/i18n/dictionaries'
import ScrollToTopButton from '@/components/ScrollToTopButton'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const dict = getDictionary(locale)

  return {
    title: dict.seo.title,
    description: dict.seo.description,
    keywords: dict.seo.keywords,
    openGraph: {
      title: dict.seo.ogTitle,
      description: dict.seo.ogDescription,
      locale: locale === 'en' ? 'en_US' : 'pl_PL',
      alternateLocale: locale === 'en' ? ['pl_PL'] : ['en_US'],
      url: `https://przystanekokrezna.pl/${locale}`,
    },
    twitter: {
      title: dict.seo.ogTitle,
      description: dict.seo.ogDescription,
    },
    alternates: {
      canonical: `/${locale}`,
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Przystanek Okrężna',
    image: ['https://przystanekokrezna.pl/photos/682164891.jpg'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Okrężna 15',
      addressLocality: 'Ząbkowice Śląskie',
      postalCode: '57-200',
      addressCountry: 'PL',
    },
    priceRange: 'od 220 PLN / noc',
    telephone: '+48 000 000 000',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.9,
      reviewCount: 122,
    },
    url: `https://przystanekokrezna.pl/${locale}`,
  }

  return (
    <TranslationProvider locale={locale}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('lang', '${locale}');`,
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {children}
      <ScrollToTopButton />
    </TranslationProvider>
  )
}
