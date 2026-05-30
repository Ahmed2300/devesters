import { createClient } from '@/lib/supabase/server';
import TestimonialsClient from './Client';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonials() {
  const supabase = await createClient();
  const { data: testimonials, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });

  if (error) {
    return <div className="p-8"><div className="bg-red-500/10 text-red-500 p-4 rounded-lg">Error loading testimonials: {error.message}</div></div>;
  }

  return <TestimonialsClient initialTestimonials={testimonials || []} />;
}
