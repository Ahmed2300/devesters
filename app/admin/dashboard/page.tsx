import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Basic stats fetch mapping across tables
  const [{ count: projectsCount }, { count: testimonialsCount }, { count: inquiriesCount }] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('testimonials').select('*', { count: 'exact', head: true }),
    supabase.from('inquiries').select('*', { count: 'exact', head: true }),
  ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-heading font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2">Total Projects</h3>
          <p className="text-4xl font-bold">{projectsCount || 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2">Testimonials</h3>
          <p className="text-4xl font-bold">{testimonialsCount || 0}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-zinc-400 text-sm font-medium uppercase tracking-wider mb-2">Total Inquiries</h3>
          <p className="text-4xl font-bold">{inquiriesCount || 0}</p>
        </div>
      </div>
      
      <div className="bg-[#111116] border border-white/10 rounded-xl p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Welcome to Devesters Admin</h2>
        <p className="text-zinc-400 mb-6">
          This system is backed by Supabase. You can manage your projects, testimonials, and view incoming leads through the sidebar.
        </p>
      </div>
    </div>
  );
}
