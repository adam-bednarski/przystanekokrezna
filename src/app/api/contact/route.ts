import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  date: string
}

// In-memory store for contact inquiries (no MongoDB)
const contactSubmissions: ContactMessage[] = []

export async function POST(request: NextRequest) {
  try {
    const rl = checkRateLimit(request, { limit: 5, windowMs: 10 * 60 * 1000, key: 'contact' })
    if (!('ok' in rl) || rl.ok === false) {
      const retryAfter = Math.ceil((rl as any).reset / 1000)
      return new NextResponse(JSON.stringify({ success: false, message: 'Too many requests. Please wait a moment.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) },
      })
    }

    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ success: false, message: 'Invalid content type' }, { status: 415 })
    }

    const { name, email, phone, message } = (await request.json()) as {
      name?: string
      email?: string
      phone?: string
      message?: string
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ success: false, message: 'Wypełnij wszystkie wymagane pola (imię, email, treść).' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ success: false, message: 'Podaj poprawny adres e-mail.' }, { status: 400 })
    }

    const newContact: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      message: message.trim(),
      date: new Date().toISOString(),
    }

    contactSubmissions.unshift(newContact)
    if (contactSubmissions.length > 100) {
      contactSubmissions.pop()
    }

    // Optional SMTP dispatch if credentials provided
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_EMAIL) {
      try {
        // @ts-ignore: dynamic import
        const nodemailer = await import('nodemailer')
        const port = Number(SMTP_PORT) || 587
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port,
          secure: port === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })

        // Notify host
        await transporter.sendMail({
          from: `"Przystanek Okrężna" <${SMTP_USER}>`,
          to: CONTACT_EMAIL,
          subject: `Nowe zapytanie od ${newContact.name}`,
          text: `Imię: ${newContact.name}\nEmail: ${newContact.email}\nTelefon: ${newContact.phone || '-'}\nData: ${newContact.date}\n\nWiadomość:\n${newContact.message}`,
        })

        // Confirmation to guest
        try {
          await transporter.sendMail({
            from: `"Przystanek Okrężna" <${SMTP_USER}>`,
            to: newContact.email,
            subject: 'Dziękujemy za kontakt – Przystanek Okrężna',
            text: `Dzień dobry ${newContact.name},\n\nDziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.\n\nTwoja wiadomość:\n${newContact.message}\n\nPozdrawiamy,\nPrzystanek Okrężna\nul. Okrężna 15, Ząbkowice Śląskie`,
          })
        } catch (e) {
          console.warn('Non-fatal: guest confirmation email skipped', e)
        }
      } catch (smtpErr) {
        console.warn('SMTP delivery notice (message saved locally):', smtpErr)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Wiadomość została wysłana pomyślnie!',
      id: newContact.id,
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ success: false, message: 'Wystąpił błąd podczas wysyłania wiadomości.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'Przystanek Okrężna Contact API',
    totalMessages: contactSubmissions.length,
  })
}
