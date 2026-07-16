'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiX } from 'react-icons/fi';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export interface IBentoProject {
  id: string;
  title: string;
  tag: string;
  description: string;
  techStack: string[];
  gridSpan: string;
  imageUrl?: string;
  iconUrl?: string;
  actionLink: string;
}

export default function BentoCard({ project }: { project: IBentoProject }) {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasCaseStudy = project.title.toLowerCase() === 'soubul';
  const isExternal = project.actionLink.startsWith('http') || project.actionLink.includes('.') || project.actionLink.startsWith('//');
  const CardWrapper = isExternal ? 'a' : Link;

  const handleClick = (e: React.MouseEvent) => {
    if (hasCaseStudy) {
      e.preventDefault();
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <CardWrapper 
        href={project.actionLink} 
        onClick={handleClick}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : { prefetch: false })}
        className={`block group ${project.gridSpan}`}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-glass rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ease-out hover:bg-white/10 hover:border-studio-red/30 h-full w-full"
        >
          {/* Inner gradient for extra depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
              <div className="flex items-center gap-3">
                {project.iconUrl && (
                  <Image src={project.iconUrl} alt={`${project.title} icon`} width={32} height={32} className="rounded-md object-contain" referrerPolicy="no-referrer" />
                )}
                <h3 className="text-2xl font-heading font-bold text-white">{project.title}</h3>
              </div>
              <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-soft-aqua uppercase border border-soft-aqua/20 rounded-full bg-soft-aqua/5 whitespace-nowrap">
                {project.tag}
              </span>
            </div>

            <p className="text-sm text-[#d4d4d8] mb-6 max-w-md">
              {project.description}
            </p>

            <div className="flex gap-2 mb-6 flex-wrap">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 text-xs text-[#d4d4d8] bg-white/5 border border-white/10 rounded-md">
                  {tech}
                </span>
              ))}
            </div>

            {project.imageUrl && (
              <div className="relative w-full flex-grow min-h-[200px] mt-auto rounded-xl overflow-hidden border border-white/5">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  referrerPolicy="no-referrer"
                />
                
                {hasCaseStudy ? (
                  <div className={`absolute top-3 ${locale === 'ar' ? 'left-3' : 'right-3'} bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-studio-red/40 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(220,38,38,0.25)]`}>
                    <span className="text-[10px] font-bold tracking-widest text-[#FF1C1C] uppercase">{dict.bentoGrid.viewCaseStudy}</span>
                    <span className="text-[#FF1C1C] text-[12px] -translate-y-[0.5px] font-sans font-bold">→</span>
                  </div>
                ) : (
                  isExternal && (
                    <div className={`absolute top-3 ${locale === 'ar' ? 'left-3' : 'right-3'} bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <span className="text-[10px] font-bold tracking-widest text-[#FF1C1C] uppercase">{dict.bentoGrid.livePreview}</span>
                      <span className="text-[#FF1C1C] text-[12px] -translate-y-[1px] rotate-45">↗</span>
                    </div>
                  )
                )}
              </div>
            )}

            {!project.imageUrl && (
              <div className="mt-auto pt-6 flex items-center text-xs font-bold tracking-widest text-[#d4d4d8] uppercase group-hover:text-[#FF1C1C] transition-colors cursor-pointer">
                {isExternal ? dict.bentoGrid.livePreview : dict.bentoGrid.viewCaseStudy}
                <FiArrowRight className={`w-4 h-4 transform transition-transform ${locale === 'ar' ? 'rotate-180 group-hover:-translate-x-1 group-hover:-translate-y-1 mr-2' : 'ml-2 group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
              </div>
            )}
          </div>
        </motion.div>
      </CardWrapper>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-4xl bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-10 relative shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 my-8 max-h-[90vh] overflow-y-auto"
              dir={locale === 'ar' ? 'rtl' : 'ltr'}
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)} 
                className={`absolute top-6 ${locale === 'ar' ? 'left-6' : 'right-6'} text-zinc-400 hover:text-white cursor-pointer transition-colors p-2 hover:bg-white/5 rounded-full z-20`}
                aria-label="Close case study"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="mb-8 text-start">
                <span className="px-3 py-1 text-[10px] font-bold tracking-widest text-soft-aqua uppercase border border-soft-aqua/20 rounded-full bg-soft-aqua/5 select-none">
                  {project.tag}
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mt-4 tracking-tight">
                  {project.title}
                </h2>
                <p className="text-sm md:text-base text-zinc-400 mt-2 font-medium">
                  {locale === 'ar' ? 'منصة تعليمية متكاملة مصممة للعمل بكفاءة في الشبكات الضعيفة' : 'Enterprise LMS Architected for Low-Bandwidth Scaling'}
                </p>
              </div>

              {/* Project Screenshot */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-10 bg-zinc-900 shadow-2xl">
                <Image 
                  src="/Soubul%20welocome%20page%20.png" 
                  alt="Soubul LMS Welcome Page"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 800px"
                />
              </div>

              {/* Problem / Build / Outcome Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-start border-t border-white/5 pt-8 mb-10">
                {/* Problem Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase">
                    {locale === 'ar' ? 'المشكلة (The Challenge)' : 'The Challenge'}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {locale === 'ar' 
                      ? 'كانت مبادرة مسارات بحاجة إلى منصة قابلة للتوسع لاستضافة مسارات تعليمية ديناميكية، واستضافة فيديو آمنة، وتتبع دقيق لتقدم المستخدمين لآلاف الطلاب المتزامنين في مناطق النزاع التي تعاني من اتصال إنترنت ضعيف وغير مستقر.'
                      : 'Masarat Initiative needed a scalable platform to host dynamic educational tracks, secure video hosting, and robust user progress tracking for thousands of concurrent students in post-conflict zones with highly unstable internet and low bandwidth.'}
                  </p>
                </div>

                {/* Build Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase">
                    {locale === 'ar' ? 'التنفيذ (The Build)' : 'The Build'}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {locale === 'ar'
                      ? 'قمنا ببناء واجهة أمامية عالية الأداء باستخدام Next.js متكاملة مع واجهة خلفية Laravel API قوية. لضمان الموثوقية الكاملة، قمنا بتحسين التوليد الثابت (Static Generation) للمسارات التعليمية الأساسية وهندسة خوارزمية مخصصة لتقسيم مقاطع الفيديو، مما يتيح تجربة تعلم سلسة حتى على شبكات الجيل الثالث (3G).'
                      : 'We architected a high-performance Next.js frontend integrated with a robust Laravel API. To ensure absolute reliability, we optimized static generation for core educational paths and engineered a custom video segment chunking algorithm, allowing seamless learning experiences even on 3G connections.'}
                  </p>
                </div>

                {/* Outcome Section */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase">
                    {locale === 'ar' ? 'النتائج (The Outcome)' : 'The Outcome'}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                    {locale === 'ar'
                      ? 'توسعت المنصة بنجاح لتستوعب أكثر من 15,000 طالب نشط في المنطقة. حققنا تقليلاً في تكاليف البنية التحتية بنسبة 40% وحافظنا على سجل تشغيل بنسبة 99.98% خلال فترات الاختبارات القصوى.'
                      : 'Successfully scaled to 15,000+ active students across regional zones. Achieved a 40% reduction in infrastructure costs and maintained a 99.98% uptime track record during peak examination cycles.'}
                  </p>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-4 border-t border-white/5 pt-8">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-xs font-bold tracking-wider text-zinc-400 hover:text-white uppercase transition-colors cursor-pointer w-full sm:w-auto"
                >
                  {locale === 'ar' ? 'إغلاق' : 'Close'}
                </button>
                <a 
                  href={project.actionLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 text-xs font-bold tracking-wider text-white bg-studio-red rounded-full hover:bg-red-700 transition-colors uppercase cursor-pointer flex items-center justify-center gap-1.5 w-full sm:w-auto shadow-[0_0_15px_rgba(220,38,38,0.25)]"
                >
                  {locale === 'ar' ? 'زيارة الموقع المباشر' : 'Visit Live Site'} ↗
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
