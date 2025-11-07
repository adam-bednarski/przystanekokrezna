import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export const runtime = 'nodejs'

let mongoClientPromise: Promise<any> | null = null

async function getMongoClient() {
  const dbUrl = process.env.MONGODB_URI
  if (!dbUrl) throw new Error('No MongoDB URI provided')
  if (!mongoClientPromise) {
    const { MongoClient } = await import('mongodb')
    const client = new MongoClient(dbUrl)
    mongoClientPromise = client.connect()
  }
  return mongoClientPromise
}

export async function POST(request: NextRequest) {
  try {
    const rl = checkRateLimit(request, { limit: 5, windowMs: 10 * 60 * 1000, key: 'contact' })
    if (!('ok' in rl) || rl.ok === false) {
      const retryAfter = Math.ceil((rl as any).reset / 1000)
      return new NextResponse(JSON.stringify({ success: false, message: 'Too many requests' }), {
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

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Missing required fields' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, message: 'Invalid email' }, { status: 400 })
    }

    const client = await getMongoClient()
    const db = client.db()
    const collection = db.collection('contacts')
    await collection.insertOne({ name, email, phone: phone || null, message, date: new Date() })

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env
    if (SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_EMAIL) {
      let resolvable = true
      try {
        const dns = await import('node:dns').then((m) => m.promises)
        await dns.lookup(SMTP_HOST)
      } catch (e) {
        resolvable = false
        console.warn('SMTP host not resolvable, skipping email:', SMTP_HOST)
      }

      if (resolvable) {
        try {
          // @ts-ignore: dynamic import, types resolved at runtime
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
            subject: 'Nowa wiadomość z formularza kontaktowego',
            text: `Imię: ${name}\nEmail: ${email}\nTelefon: ${phone || '-'}\nWiadomość: ${message}`,
          })
          // Confirmation to sender
          try {
            await transporter.sendMail({
              from: `"Przystanek Okrężna" <${SMTP_USER}>`,
              to: email,
              subject: 'Potwierdzenie otrzymania wiadomości',
              text: `Dziękujemy za kontakt, ${name}!

Otrzymaliśmy Twoją wiadomość i odezwiemy się wkrótce.

Treść:
${message}

Pozdrawiamy,
Przystanek Okrężna`,
            })
          } catch (ee) {
            console.warn('Failed sending confirmation email to sender (non-fatal):', ee)
          }
        } catch (e) {
          console.error('SMTP send error (continuing without failing request):', e)
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Contact API endpoint' })
}
