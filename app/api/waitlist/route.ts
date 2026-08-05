import { NextResponse } from 'next/server';
import { z } from 'zod';

const waitlistSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
});

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyUyJg1RMckx4puILRKOjQCL_G037uvxnbkWK_Fpk3geUYsbU90GurUKW91EMSoNBZrsw/exec';

export async function POST(request: Request) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch (parseErr) {
      console.warn('Waitlist body parse notice:', parseErr);
    }

    const validation = waitlistSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.issues[0]?.message || 'يرجى إدخال بريد إلكتروني صحيح' },
        { status: 400 }
      );
    }

    const validEmail = validation.data.email;

    // 1. Post to Google Sheets (Bulletproof handling for Google Apps Script 302 redirects)
    try {
      const scriptUrlWithParam = `${GOOGLE_APPS_SCRIPT_URL}?email=${encodeURIComponent(validEmail)}`;
      const res = await fetch(scriptUrlWithParam, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ email: validEmail }),
        redirect: 'follow',
        cache: 'no-store',
      });
      const scriptText = await res.text();
      console.log('Google Apps Script response status:', res.status, 'Body:', scriptText);
    } catch (scriptErr) {
      console.warn('Google Apps Script notice:', scriptErr);
    }

    // 2. Backup to Supabase (Safe dynamic import preventing SSR/middleware header crashes)
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      if (supabase && typeof supabase.from === 'function') {
        await supabase
          .from('waitlist')
          .insert([{ email: validEmail, created_at: new Date().toISOString() }]);
      }
    } catch (err) {
      console.warn('Supabase notice:', err);
    }

    return NextResponse.json({ success: true, message: 'تم انضمامك لقائمة الانتظار بنجاح.' });
  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ success: false, error: 'حدث خطأ غير متوقع، يرجى المحاولة لاحقاً' }, { status: 500 });
  }
}
