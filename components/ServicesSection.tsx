'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function ServicesSection() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  return (
    <section className="py-[80px] bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header content */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-3 py-1 rounded-full border border-[#FF1C1C]/20 bg-[#FF1C1C]/10 text-[#FF1C1C] text-[11px] font-bold uppercase tracking-[0.12em]">
            {dict.servicesSection.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            {dict.servicesSection.title}
          </h2>
          <p className="text-[#a1a1aa] max-w-[480px] mx-auto leading-relaxed">
            {dict.servicesSection.description}
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch mb-12">
          
          {/* Card 1: Web Development */}
          <Link href="/services/web-development" className="group rounded-[16px] bg-white/[0.04] border border-white/[0.09] backdrop-blur-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#FF1C1C]/35 cursor-pointer flex flex-col">
            <div className="relative h-[180px] md:h-[220px] bg-gradient-to-br from-indigo-900/20 to-[#09090b] rounded-t-[12px] group-hover:brightness-105 transition-all overflow-hidden flex items-center justify-center">
              <div className={`absolute top-3 ${locale === 'ar' ? 'right-3' : 'left-3'} bg-black/60 rounded-[6px] px-2 py-1 text-white text-[12px] font-medium z-10 backdrop-blur-sm`}>
                {locale === 'ar' ? 'تطوير الويب' : 'Web Development'}
              </div>
              
              <Image 
                src="https://i.ibb.co/tMWmNTFH/89ddb762e6f4.jpg" 
                alt="Web & SaaS Development" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-heading font-medium text-white mb-2">{dict.servicesSection.webTitle}</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-[1.7] mb-5 font-sans">
                  {dict.servicesSection.webDesc}
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 bg-[#E50000] text-white px-5 py-3 rounded-lg text-[13px] font-medium transition-all group-hover:opacity-90 group-hover:-translate-y-px mt-auto">
                {dict.servicesSection.explore} <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </Link>

          {/* Card 2: Mobile Apps */}
          <Link href="/services/mobile-development" className="group rounded-[16px] bg-white/[0.04] border border-white/[0.09] backdrop-blur-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#FF1C1C]/35 cursor-pointer lg:h-[calc(100%+20px)] lg:-mt-[10px] flex flex-col relative z-10 shadow-2xl">
            <div className="relative h-[180px] lg:h-[240px] bg-emerald-500/[0.06] rounded-t-[12px] group-hover:brightness-105 transition-all overflow-hidden flex items-center justify-center">
              <div className={`absolute top-3 ${locale === 'ar' ? 'right-3' : 'left-3'} bg-black/60 rounded-[6px] px-2 py-1 text-white text-[12px] font-medium z-10 backdrop-blur-sm`}>
                {locale === 'ar' ? 'تطبيقات الجوال' : 'Mobile App Development'}
              </div>
              
              <Image 
                src="https://i.ibb.co/ynGS48HJ/e69cc6a9e314.jpg" 
                alt="Cross-Platform Mobile Engineering" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-heading font-medium text-white mb-2">{dict.servicesSection.mobileTitle}</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-[1.7] mb-5 font-sans">
                  {dict.servicesSection.mobileDesc}
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 bg-[#E50000] text-white px-5 py-3 rounded-lg text-[13px] font-medium transition-all group-hover:opacity-90 group-hover:-translate-y-px mt-auto">
                {dict.servicesSection.explore} <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </Link>

          {/* Card 3: AI Integration */}
          <Link href="/services/ai-integration" className="group rounded-[16px] bg-white/[0.04] border border-white/[0.09] backdrop-blur-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#FF1C1C]/35 cursor-pointer lg:col-span-1 md:col-span-2 col-span-1 flex flex-col">
            <div className="relative h-[180px] md:h-[220px] bg-violet-500/[0.08] rounded-t-[12px] group-hover:brightness-105 transition-all overflow-hidden flex items-center justify-center">
              <div className={`absolute top-3 ${locale === 'ar' ? 'right-3' : 'left-3'} bg-black/60 rounded-[6px] px-2 py-1 text-white text-[12px] font-medium z-10 backdrop-blur-sm`}>
                {locale === 'ar' ? 'الذكاء الاصطناعي' : 'AI Integration'}
              </div>
              
              <Image 
                src="https://i.ibb.co/JXqn8VN/8e4854b9ddc0.jpg" 
                alt="AI Integration & LLM Tooling" 
                fill 
                className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-heading font-medium text-white mb-2">{dict.servicesSection.aiTitle}</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-[1.7] mb-5 font-sans">
                  {dict.servicesSection.aiDesc}
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 bg-[#E50000] text-white px-5 py-3 rounded-lg text-[13px] font-medium transition-all group-hover:opacity-90 group-hover:-translate-y-px mt-auto">
                {dict.servicesSection.explore} <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </Link>
        </div>

        {/* Section Footer */}
        <div className="text-center">
          <Link href="/services" className="inline-flex items-center text-[14px] text-[#a1a1aa] hover:text-[#FF1C1C] transition-colors gap-1 group">
            {dict.servicesSection.viewAll} <ArrowRight className={`w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </Link>
        </div>

      </div>
    </section>
  );
}
