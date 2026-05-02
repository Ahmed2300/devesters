import { createClient } from '@/lib/supabase/server';
import ProjectsClient from '@/components/ProjectsClient';

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projectsData, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  const mappedProjects = (projectsData || []).map((p: any) => ({
    ...p,
    customIcon: p.custom_icon,
    coverImage: p.cover_image,
    previewUrl: p.preview_url
  }));

  return <ProjectsClient projectsData={mappedProjects} />;
}
