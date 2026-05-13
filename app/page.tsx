import { createClient } from '@/lib/supabase/server';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import InfinityCodeSection from '@/components/InfinityCodeSection';
import BentoGrid from '@/components/BentoGrid';
import Capabilities from '@/components/Capabilities';
import Testimonials from '@/components/Testimonials';

export default async function Home() {
  const supabase = await createClient();

  const [{ data: projectsData }, { data: testimonialsData }] = await Promise.all([
    supabase.from('projects').select('*').eq('featured', true).limit(4),
    supabase.from('testimonials').select('*')
  ]);

  // Map database projects to IBentoProject
  const bentoProjects = projectsData?.map((p: any, index) => ({
    id: p.id.toString(),
    title: p.title,
    tag: p.category,
    description: p.description,
    techStack: p.tech || [],
    gridSpan: index === 0 ? 'col-span-1 lg:col-span-2' : (index === 1 ? 'col-span-1 row-span-2' : 'col-span-1'),
    imageUrl: p.covers?.landscape || p.covers?.square || p.covers?.portrait || '',
    iconUrl: p.custom_icon || '',
    actionLink: p.preview_url || p.previewUrl || p.github_url || p.link || '#'
  })) || [];

  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <InfinityCodeSection />
      <BentoGrid projects={bentoProjects} />
      <Capabilities />
      <Testimonials testimonials={testimonialsData || []} />
    </main>
  );
}
