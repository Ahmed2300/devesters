import { createClient } from '@/lib/supabase/server';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';

const BentoGrid = dynamic(() => import('@/components/BentoGrid'));
const Capabilities = dynamic(() => import('@/components/Capabilities'));
const Testimonials = dynamic(() => import('@/components/Testimonials'));

export default async function Home() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  const supabase = await createClient();

  const [{ data: projectsData }, { data: testimonialsData }] = await Promise.all([
    supabase.from('projects').select('*').eq('featured', true).order('created_at', { ascending: false }).limit(4),
    supabase.from('testimonials').select('*')
  ]);

  // Map database projects to IBentoProject with translations and dynamic covers selection
  const bentoProjects = projectsData?.map((p: any, index) => {
    const translation = dict.projects[p.title] || {};
    const gridSpan = index === 0 ? 'col-span-1 lg:col-span-2' : (index === 1 ? 'col-span-1 row-span-2' : 'col-span-1');
    const isTall = gridSpan.includes('row-span-2');
    const isWide = gridSpan.includes('col-span-2');

    const imageUrl = isTall
      ? (p.covers?.portrait || p.covers?.square || p.covers?.landscape || p.cover_image || '')
      : (isWide
          ? (p.covers?.landscape || p.covers?.square || p.covers?.portrait || p.cover_image || '')
          : (p.covers?.square || p.covers?.landscape || p.covers?.portrait || p.cover_image || ''));

    return {
      id: p.id.toString(),
      title: translation.title || p.title,
      tag: translation.category || p.category,
      description: translation.description || p.description,
      techStack: p.tech || [],
      gridSpan,
      imageUrl,
      covers: p.covers,
      iconUrl: p.custom_icon || '',
      actionLink: p.preview_url || p.previewUrl || p.github_url || p.link || '#'
    };
  }) || [];

  return (
    <main className="min-h-screen">
      <Hero />
      <ServicesSection />
      <BentoGrid projects={bentoProjects} />
      <Capabilities />
      <Testimonials testimonials={testimonialsData || []} />
    </main>
  );
}
