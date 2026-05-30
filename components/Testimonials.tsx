'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function Testimonials({ testimonials }: { testimonials: any[] }) {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  // Duplicating the array to allow for a seamless infinite loop
  const rawItems = [...testimonials, ...testimonials];
  
  if (!testimonials || testimonials.length === 0) return null;

  const items = rawItems.map((item) => {
    const translation = dict.testimonialsData[item.client_name];
    if (translation) {
      return {
        ...item,
        review: translation.review,
        client_role: translation.role
      };
    }
    return item;
  });

  return (
    <section className="py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="text-xs font-bold tracking-widest text-studio-red uppercase mb-4">{dict.testimonials.badge}</div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">{dict.testimonials.title}</h2>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Soft gradient masks on edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050509] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050509] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: locale === 'ar' ? ["-50%", "0%"] : ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-max gap-6 px-3 lg:px-6"
        >
          {items.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-[320px] md:w-[420px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col shrink-0"
              dir="auto"
            >
              {/* Rating Section */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-red-500 fill-red-500" />
                ))}
              </div>
              
              {/* Review Quote */}
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-10 flex-grow font-medium">
                &quot;{item.review}&quot;
              </p>
              
              {/* Client Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                  {item.avatar_fallback}
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm flex items-center gap-2">
                    {item.client_name}
                  </h3>
                  <p className="text-xs text-[#a1a1aa] mt-1">{item.client_role}</p>
                  <p className="text-[10px] text-red-500 font-bold tracking-wider uppercase mt-2 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full inline-block">
                    {item.project_reference}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
