import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import ProjectsClient from '@/components/ProjectsClient';

export default async function ProjectsPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  const supabase = await createClient();

  const { data: projectsData, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  const mappedProjects = (projectsData || []).map((p: any) => {
    const translation = dict.projects[p.title] || {};
    return {
      ...p,
      title: translation.title || p.title,
      category: translation.category || p.category,
      description: translation.description || p.description,
      customIcon: p.custom_icon,
      coverImage: p.cover_image,
      previewUrl: p.preview_url
    };
  });

  return <ProjectsClient projectsData={mappedProjects} />;
}
