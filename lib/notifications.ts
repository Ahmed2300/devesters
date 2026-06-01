import { SupabaseClient } from '@supabase/supabase-js';

// Resolve URL supporting both full URL and raw deployment ID
export function getGoogleScriptUrl(): string {
  const rawUrl = process.env.GOOGLE_SCRIPT_NOTIFY_URL || '';
  if (!rawUrl) return '';
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl;
  }
  return `https://script.google.com/macros/s/${rawUrl}/exec`;
}

interface SendEmailParams {
  to: string;
  subject: string;
  body: string;
  memberName?: string;
}

export async function sendEmail({
  to,
  subject,
  body,
  memberName,
}: SendEmailParams) {
  const url = getGoogleScriptUrl();
  const secret = process.env.GOOGLE_SCRIPT_SECRET || 'devesters-notify-2026';

  if (!url) {
    console.warn('[Notification Service] Google Script URL is not configured. Skipping email.');
    return { success: false, error: 'Google Script URL not configured' };
  }

  try {
    console.log(`[Notification Service] Sending email to ${to} via Google Script URL: ${url}`);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        to,
        subject,
        body,
        memberName,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[Notification Service] Google Script returned status ${response.status}: ${errText}`);
      return { success: false, error: `HTTP ${response.status}: ${errText}` };
    }

    const data = await response.json();
    console.log(`[Notification Service] Google Script response for ${to}:`, data);
    return data;
  } catch (err: any) {
    console.error(`[Notification Service] Error sending to ${to}:`, err);
    return { success: false, error: err.message || err };
  }
}

export async function notifyTaskCompletion(
  supabase: SupabaseClient,
  memberId: string,
  taskId: string
) {
  try {
    // 1. Fetch member details
    const { data: member, error: memberErr } = await supabase
      .from('members')
      .select('name, email')
      .eq('id', memberId)
      .single();

    if (memberErr || !member || !member.email) {
      console.log(`[Notification Service] Skipped: Member ${memberId} not found or email is empty.`);
      return;
    }

    // 2. Fetch task details
    const { data: task, error: taskErr } = await supabase
      .from('tasks')
      .select('title_en, xp_value, badge_reward_id')
      .eq('id', taskId)
      .single();

    if (taskErr || !task) {
      console.log(`[Notification Service] Skipped: Task ${taskId} not found.`);
      return;
    }

    // 3. Fetch badge details if rewarded
    let badge = null;
    if (task.badge_reward_id) {
      const { data: badgeData } = await supabase
        .from('badges')
        .select('name_en, description_en, xp_reward')
        .eq('id', task.badge_reward_id)
        .single();
      badge = badgeData;
    }

    // 4. Construct email body
    const subject = badge 
      ? `🏆 Badge Unlocked: ${badge.name_en}!` 
      : `✅ Task Completed: ${task.title_en}`;

    let body = `
      <p style="margin: 0 0 16px 0; font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.6;">
        Great job! You have successfully completed the task: <b>${task.title_en}</b> and earned <b>+${task.xp_value} XP</b>!
      </p>
    `;

    if (badge) {
      body += `
        <div style="margin: 24px 0 0 0; padding: 20px; background-color: rgba(255, 28, 28, 0.05); border: 1px solid rgba(255, 28, 28, 0.15); border-radius: 12px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size: 18px; font-weight: bold; color: #FF1C1C; padding-bottom: 8px;">
                ✨ Badge Unlocked: ${badge.name_en}
              </td>
            </tr>
            <tr>
              <td style="font-size: 13px; color: rgba(255,255,255,0.65); padding-bottom: 12px; line-height: 1.5;">
                ${badge.description_en}
              </td>
            </tr>
            <tr>
              <td style="font-size: 14px; font-weight: bold; color: #FF1C1C;">
                +${badge.xp_reward} XP Bonus!
              </td>
            </tr>
          </table>
        </div>
      `;
    }

    // 5. Send the email
    await sendEmail({
      to: member.email,
      subject,
      body,
      memberName: member.name,
    });
  } catch (err) {
    console.error('[Notification Service] Unexpected error in notifyTaskCompletion:', err);
  }
}

export async function notifyTaskAssignment(
  supabase: SupabaseClient,
  memberId: string,
  taskId: string
) {
  try {
    // 1. Fetch member details
    const { data: member, error: memberErr } = await supabase
      .from('members')
      .select('name, email')
      .eq('id', memberId)
      .single();

    if (memberErr || !member || !member.email) {
      console.log(`[Notification Service] Assignment skipped: Member ${memberId} not found or email is empty.`);
      return;
    }

    // 2. Fetch task details
    const { data: task, error: taskErr } = await supabase
      .from('tasks')
      .select('title_en, description_en, xp_value')
      .eq('id', taskId)
      .single();

    if (taskErr || !task) {
      console.log(`[Notification Service] Assignment skipped: Task ${taskId} not found.`);
      return;
    }

    const subject = `📅 New Task Assigned: ${task.title_en}`;
    const body = `
      <p style="margin: 0 0 16px 0; font-size: 15px; color: rgba(255,255,255,0.85); line-height: 1.6;">
        You have been assigned a new task: <b>${task.title_en}</b>.
      </p>
      <p style="margin: 0 0 20px 0; font-size: 14px; color: rgba(255,255,255,0.6); line-height: 1.5;">
        ${task.description_en}
      </p>
      <div style="margin: 20px 0 0 0; padding: 15px; background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px;">
        <span style="font-size: 12px; color: rgba(255,255,255,0.4); text-transform: uppercase; font-weight: bold; display: block; margin-bottom: 4px;">Milestone Value</span>
        <span style="font-size: 18px; font-weight: bold; color: #FF1C1C;">+${task.xp_value} XP</span>
      </div>
      <p style="margin: 20px 0 0 0; font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic;">
        Please report to the Team Lead once you achieve or complete this task. They will review it and check it off.
      </p>
    `;

    await sendEmail({
      to: member.email,
      subject,
      body,
      memberName: member.name,
    });
  } catch (err) {
    console.error('[Notification Service] Unexpected error in notifyTaskAssignment:', err);
  }
}
