import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['pl', 'en'] as const
const defaultLocale = 'pl'
const COOKIE = 'NEXT_LOCALE'

function getLocale(pathname: string) {
  const first = pathname.split('/')[1]
  return locales.includes(first as any) ? first : null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon') || pathname.startsWith('/icon') || pathname.startsWith('/images') || pathname.startsWith('/photos')) {
    return NextResponse.next()
  }
  const localeInPath = getLocale(pathname)
  if (!localeInPath) {
    const saved = request.cookies.get(COOKIE)?.value
    const preferred = saved && locales.includes(saved as any) ? saved : defaultLocale
    const url = request.nextUrl.clone()
    url.pathname = `/${preferred}${pathname}`
    const res = NextResponse.redirect(url)
    if (!saved) {
      res.cookies.set(COOKIE, preferred, { path: '/', maxAge: 60 * 60 * 24 * 365 })
    }
    return res
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}
