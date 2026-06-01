import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import GamificationClient from './Client';

export const dynamic = 'force-dynamic';

export default async function GamificationPage() {
  const supabase = await createClient();

  // 1. Get authenticated user session
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return redirect('/admin/login');
  }

  // 2. Fetch all members with their tags
  const { data: dbMembers, error: membersError } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: true });

  if (membersError || !dbMembers) {
    console.error('Failed to fetch members for gamification:', membersError);
    return redirect('/admin/dashboard');
  }

  // Find the profile of the current logged-in user
  const loggedInProfile = dbMembers.find(m => m.auth_user_id === user.id);
  if (!loggedInProfile) {
    console.error('Logged in user has no member profile mapping');
    return redirect('/admin/login');
  }

  // Verify if they are the Team Lead
  const isLead = loggedInProfile.slug === 'ahmed-azam';

  // 3. Fetch catalogs of tasks and badges
  const [tasksRes, badgesRes] = await Promise.all([
    supabase.from('tasks').select('*').order('created_at', { ascending: true }),
    supabase.from('badges').select('*').order('xp_reward', { ascending: true })
  ]);

  if (tasksRes.error || badgesRes.error) {
    console.error('Failed to load tasks/badges catalog:', tasksRes.error, badgesRes.error);
    return redirect('/admin/dashboard');
  }

  const allTasks = tasksRes.data || [];
  const allBadges = badgesRes.data || [];

  // 4. Fetch all completed/assigned tasks for all members
  const { data: dbCompletedTasks } = await supabase
    .from('member_tasks')
    .select('member_id, task_id, is_completed');

  // 5. Fetch all earned badges for all members
  const { data: dbEarnedBadges } = await supabase
    .from('member_badges')
    .select('member_id, badge_id');

  // Sort members in the strict design sequence:
  // Ahmed Azam -> Manar Elnahty -> Ahmed Farghly -> Mohamed Badr -> Ahmed Essam
  const ORDERED_SLUGS = [
    'ahmed-azam',
    'manar-elnahty',
    'ahmed-farghly',
    'mohamed-badr',
    'ahmed-essam'
  ];

  const sortedMembers = [...dbMembers].sort((a, b) => {
    const idxA = ORDERED_SLUGS.indexOf(a.slug);
    const idxB = ORDERED_SLUGS.indexOf(b.slug);
    return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
  });

  return (
    <GamificationClient
      members={sortedMembers}
      allTasks={allTasks}
      allBadges={allBadges}
      completedTasks={dbCompletedTasks || []}
      earnedBadges={dbEarnedBadges || []}
      loggedInMemberId={loggedInProfile.id}
      isLead={isLead}
    />
  );
}
