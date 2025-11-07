import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export async function GET(request: NextRequest) {
  try {
    const rl = checkRateLimit(request, { limit: 30, windowMs: 60 * 1000, key: 'reviews:get' })
    if (!('ok' in rl) || rl.ok === false) {
      const retryAfter = Math.ceil((rl as any).reset / 1000)
      return new NextResponse(JSON.stringify({ message: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) },
      })
    }
    const reviews = [
      { id: 1, name: 'Jan Kowalski', rating: 5, comment: 'Świetne miejsce!', date: '2025-08-31' },
      { id: 2, name: 'Anna Nowak', rating: 4, comment: 'Bardzo wygodne.', date: '2025-08-30' }
    ]
    return NextResponse.json(reviews)
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching reviews' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const rl = checkRateLimit(request, { limit: 5, windowMs: 10 * 60 * 1000, key: 'reviews:post' })
    if (!('ok' in rl) || rl.ok === false) {
      const retryAfter = Math.ceil((rl as any).reset / 1000)
      return new NextResponse(JSON.stringify({ message: 'Too many requests' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) },
      })
    }
    const review = await request.json()
    return NextResponse.json({ success: true, message: 'Recenzja dodana' })
  } catch (error) {
    return NextResponse.json({ message: 'Error adding review' }, { status: 500 })
  }
}
