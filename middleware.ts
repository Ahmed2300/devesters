import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

// In-memory store for rate limiting (per edge isolate)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function middleware(request: NextRequest) {
  // Basic Rate Limiter for Admin Login
  if (request.nextUrl.pathname.startsWith('/admin/login') && request.method === 'POST') {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 5; // Max 5 login attempts per minute

    const rateData = rateLimitMap.get(ip);
    if (!rateData) {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    } else {
      if (now - rateData.timestamp < windowMs) {
        if (rateData.count >= maxRequests) {
          // Too many requests
          return new NextResponse('Too many login attempts. Please try again later.', {
            status: 429,
            headers: { 'Retry-After': '60' },
          });
        }
        rateData.count++;
      } else {
        // Reset window
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    }
  }

  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
