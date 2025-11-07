import type { NextRequest } from 'next/server'

type RateLimitOptions = {
  limit: number
  windowMs: number
  key?: string
}

type Result = { ok: true } | { ok: false; reset: number }

const store = new Map<string, number[]>()

export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

export function checkRateLimit(req: NextRequest, opts: RateLimitOptions): Result {
  const now = Date.now()
  const ip = getClientIp(req)
  const key = `${opts.key || 'global'}:${ip}`
  const windowStart = now - opts.windowMs

  const arr = store.get(key) || []
  const recent = arr.filter((t) => t > windowStart)
  if (recent.length >= opts.limit) {
    const oldest = Math.min(...recent)
    const reset = opts.windowMs - (now - oldest)
    store.set(key, recent)
    return { ok: false, reset }
  }
  recent.push(now)
  store.set(key, recent)
  return { ok: true }
}
