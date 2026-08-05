'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

const waitlistSchema = z.object({
  email: z.string().email({ message: 'يرجى إدخال بريد إلكتروني صحيح' }),
});

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyUyJg1RMckx4puILRKOjQCL_G037uvxnbkWK_Fpk3geUYsbU90GurUKW91EMSoNBZrsw/exec';

export async function submitWaitlist(formData: FormData) {
  const email = formData.get('email');
  const validation = waitlistSchema.safeParse({ email });

  if (!validation.success) {
    return { 
      success: false, 
      error: validation.error.issues[0]?.message || 'يرجى إدخال بريد إلكتروني صحيح' 
    };
  }

  const validEmail = validation.data.email;

  // 1. Post to Google Sheets via Google Apps Script Web App Endpoint
  try {
    await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({ email: validEmail }),
      redirect: 'follow',
      cache: 'no-store',
    });
  } catch (scriptErr) {
    console.warn('Google Apps Script submission notice:', scriptErr);
  }

  // 2. Supabase Storage Backup
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email: validEmail, created_at: new Date().toISOString() }]);

    if (error) {
      console.warn('Supabase waitlist insert notice:', error.message);
    }
  } catch (err) {
    console.warn('Database connection warning:', err);
  }

  return { 
    success: true, 
    message: 'تم انضمامك لقائمة الانتظار بنجاح.' 
  };
}
