import { createClient } from '@/lib/supabase/server';
import ProjectsClient from './Client';

export default async function AdminProjects() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8"><div className="bg-red-500/10 text-red-500 p-4 rounded-lg">Error loading projects: {error.message}</div></div>;
  }

  return <ProjectsClient initialProjects={projects || []} />;
}
