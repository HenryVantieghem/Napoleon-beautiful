import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Performance optimization headers
  response.headers.set('X-DNS-Prefetch-Control', 'on')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // Cache optimization for static assets
  if (request.nextUrl.pathname.startsWith('/icons/') || 
      request.nextUrl.pathname.startsWith('/og-images/') ||
      request.nextUrl.pathname.endsWith('.svg') ||
      request.nextUrl.pathname.endsWith('.png') ||
      request.nextUrl.pathname.endsWith('.jpg') ||
      request.nextUrl.pathname.endsWith('.jpeg') ||
      request.nextUrl.pathname.endsWith('.webp')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  }

  // Executive API rate limiting for production
  if (request.nextUrl.pathname.startsWith('/api/waitlist')) {
    const userAgent = request.headers.get('user-agent') || ''
    const isBot = /bot|crawler|spider/i.test(userAgent)
    
    if (isBot) {
      return new NextResponse('Executive access only', { status: 403 })
    }
    
    // Executive-grade security headers for API
    response.headers.set('X-RateLimit-Limit', '10')
    response.headers.set('X-RateLimit-Remaining', '9')
    response.headers.set('X-RateLimit-Reset', new Date(Date.now() + 60000).toISOString())
  }

  // Progressive Web App headers
  if (request.nextUrl.pathname === '/manifest.json') {
    response.headers.set('Content-Type', 'application/manifest+json')
    response.headers.set('Cache-Control', 'public, max-age=604800') // 1 week
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}