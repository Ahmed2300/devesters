import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileClient from './Client';

export const dynamic = 'force-dynamic';

export default async function AdminProfilePage() {
  const supabase = await createClient();

  // 1. Get currently authenticated user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return redirect('/admin/login');
  }

  // 2. Fetch the member profile connected to this auth user
  const { data: member, error } = await supabase
    .from('members')
    .select('*')
    .eq('auth_user_id', user.id)
    .single();

  if (error || !member) {
    console.error('Failed to fetch profile for user:', user.id, error);
    return (
      <div className="p-8">
        <div className="bg-red-500/10 text-red-500 border border-red-500/20 p-6 rounded-xl max-w-xl">
          <h2 className="text-lg font-bold mb-2">Profile Error</h2>
          <p className="text-sm">
            Your login account ({user.email}) is not linked to any team profile in the database. Please contact the administrator to seed your profile details.
          </p>
        </div>
      </div>
    );
  }

  return <ProfileClient initialProfile={member} />;
}
