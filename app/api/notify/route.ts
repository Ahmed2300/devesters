import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getGoogleScriptUrl } from '@/lib/notifications';

const GOOGLE_SCRIPT_SECRET = process.env.GOOGLE_SCRIPT_SECRET || 'devesters-notify-2026';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Verify authenticated session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Verify the caller is the Team Lead
    const { data: callerProfile } = await supabase
      .from('members')
      .select('id, slug, name')
      .eq('auth_user_id', user.id)
      .single();

    if (!callerProfile || callerProfile.slug !== 'ahmed-azam') {
      return NextResponse.json(
        { error: 'Forbidden: Only the Team Lead can send notifications.' },
        { status: 403 }
      );
    }

    // 3. Parse request body
    const { memberIds, subject, body, sendToAll } = await request.json();

    if (!subject || !body) {
      return NextResponse.json({ error: 'Missing subject or body' }, { status: 400 });
    }

    const googleScriptUrl = getGoogleScriptUrl();
    if (!googleScriptUrl) {
      return NextResponse.json(
        { error: 'Google Script URL is not configured. Add GOOGLE_SCRIPT_NOTIFY_URL to your .env file.' },
        { status: 500 }
      );
    }

    // 4. Fetch target member emails
    let query = supabase.from('members').select('id, name, email');
    if (!sendToAll && memberIds && memberIds.length > 0) {
      query = query.in('id', memberIds);
    }

    const { data: targetMembers, error: fetchError } = await query;

    if (fetchError || !targetMembers || targetMembers.length === 0) {
      return NextResponse.json({ error: 'No members found to notify' }, { status: 404 });
    }

    // 5. Send email to each member via Google Apps Script
    const results: { name: string; email: string; success: boolean; error?: string }[] = [];

    for (const member of targetMembers) {
      if (!member.email) {
        results.push({ name: member.name, email: '(no email)', success: false, error: 'No email configured' });
        continue;
      }

      try {
        const response = await fetch(googleScriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            secret: GOOGLE_SCRIPT_SECRET,
            to: member.email,
            subject: subject,
            body: body,
            memberName: member.name
          })
        });

        const result = await response.json();

        if (result.success) {
          results.push({ name: member.name, email: member.email, success: true });
        } else {
          results.push({ name: member.name, email: member.email, success: false, error: result.error });
        }
      } catch (err: any) {
        results.push({ name: member.name, email: member.email, success: false, error: err.message });
      }
    }

    const successCount = results.filter(r => r.success).length;

    return NextResponse.json({
      success: true,
      sent: successCount,
      total: results.length,
      results
    });

  } catch (error: any) {
    console.error('Error in notify API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
