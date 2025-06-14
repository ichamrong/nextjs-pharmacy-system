import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// List of supported locales
const locales = ['en', 'km']

export function middleware(request: NextRequest) {
  // Get the preferred language from the request
  const acceptLanguage = request.headers.get('accept-language') || ''
  const preferredLanguage = acceptLanguage.split(',')[0].split('-')[0]
  
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = preferredLanguage === 'km' ? 'km' : 'en'
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
} 