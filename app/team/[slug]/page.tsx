import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import TeamMemberProfileClient from '@/components/TeamMemberProfileClient';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TeamMemberPage({ params }: PageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';

  const supabase = await createClient();

  // 1. Fetch member profile
  const { data: member, error: memberError } = await supabase
    .from('members')
    .select('*')
    .eq('slug', slug)
    .single();

  if (memberError || !member) {
    console.error(`Member not found for slug: ${slug}, error:`, memberError);
    // If not found in DB, redirect to about team list
    return redirect('/about');
  }

  // 2. Fetch all available tasks and badges in system
  const [tasksRes, badgesRes] = await Promise.all([
    supabase.from('tasks').select('*').order('created_at', { ascending: true }),
    supabase.from('badges').select('*').order('xp_reward', { ascending: true })
  ]);

  if (tasksRes.error || badgesRes.error) {
    console.error('Failed to load tasks or badges catalogs:', tasksRes.error, badgesRes.error);
    return redirect('/about');
  }

  const allTasks = tasksRes.data || [];
  const allBadges = badgesRes.data || [];

  // 3. Fetch completed tasks for this member
  const { data: completedTasksData } = await supabase
    .from('member_tasks')
    .select('task_id')
    .eq('member_id', member.id);
  const completedTaskIds = completedTasksData?.map(t => t.task_id) || [];

  // 4. Fetch earned badges for this member
  const { data: earnedBadgesData } = await supabase
    .from('member_badges')
    .select('badge_id')
    .eq('member_id', member.id);
  const earnedBadgeIds = earnedBadgesData?.map(b => b.badge_id) || [];

  // 5. Verify if currently authenticated user is the Team Lead (Ahmed Azam)
  const { data: { user } } = await supabase.auth.getUser();
  let isLead = false;

  if (user) {
    const { data: viewerProfile } = await supabase
      .from('members')
      .select('slug')
      .eq('auth_user_id', user.id)
      .single();
    
    isLead = viewerProfile?.slug === 'ahmed-azam';
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <TeamMemberProfileClient
        member={member}
        allBadges={allBadges}
        allTasks={allTasks}
        initialCompletedTaskIds={completedTaskIds}
        initialEarnedBadgeIds={earnedBadgeIds}
        isLead={isLead}
        locale={locale}
      />
    </main>
  );
}
