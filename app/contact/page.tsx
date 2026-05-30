import ContactForm from '@/components/ContactForm';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default async function ContactPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen pt-32 pb-20">
      <section className="max-w-4xl mx-auto px-6 mb-20 md:mb-32 mt-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-studio-red"></span>
          <span className="text-[10px] font-bold tracking-widest text-[#a1a1aa] uppercase">{dict.contactPage.badge}</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1]">
          {dict.contactPage.titlePrefix} <span className="text-studio-red">{dict.contactPage.titleSuffix}</span>
        </h1>
        
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mb-12">
          {dict.contactPage.description}
        </p>

        <div className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-3xl">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
