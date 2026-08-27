'use server'

import { Resend } from 'resend'
import { prisma } from '@/lib/db'
import { escapeHtml } from '@/lib/cms/mappers'
import { SITE } from '@/lib/site'

export interface ContactFormState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = String(formData.get('name') || '').trim()
  const email = String(formData.get('email') || '').trim()
  const company = String(formData.get('company') || '').trim()
  const subject = String(formData.get('subject') || '').trim()
  const message = String(formData.get('message') || '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'Please fill in all required fields.' }
  }
  if (name.length > 120 || email.length > 160 || message.length > 5000) {
    return { status: 'error', message: 'One or more fields are too long.' }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: 'error', message: 'Please enter a valid email address.' }
  }

  // Persist lead even if email provider fails
  try {
    await prisma.contactMessage.create({
      data: { name, email, company, subject, message, status: 'new' },
    })
  } catch (err) {
    console.error('Contact DB save error:', err)
  }

  const toEmail = process.env.CONTACT_TO_EMAIL || SITE.email
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    return {
      status: 'success',
      message: 'Your message was received. We will be in touch soon.',
    }
  }

  try {
    const resend = new Resend(apiKey)
    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      company: escapeHtml(company),
      subject: escapeHtml(subject),
      message: escapeHtml(message),
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || `Al Kalthoum Website <onboarding@resend.dev>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Website] ${subject || 'New contact enquiry'} — ${name}`.slice(0, 200),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 32px; color: #173b2b;">
          <h2 style="margin: 0 0 24px; font-size: 22px;">New contact from ${escapeHtml(SITE.name)}</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #718073; width: 110px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #718073;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${safe.email}">${safe.email}</a></td></tr>
            ${company ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #718073;">Company</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.company}</td></tr>` : ''}
            ${subject ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #718073;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${safe.subject}</td></tr>` : ''}
          </table>
          <div style="margin-top: 24px;">
            <p style="color: #718073; margin: 0 0 8px; font-size: 13px;">MESSAGE</p>
            <p style="line-height: 1.65; white-space: pre-line;">${safe.message}</p>
          </div>
        </div>
      `,
    })

    return {
      status: 'success',
      message: 'Your message was sent successfully. We will be in touch soon.',
    }
  } catch (err) {
    console.error('Email send error:', err)
    return {
      status: 'success',
      message: 'Your message was received. We will be in touch soon.',
    }
  }
}
