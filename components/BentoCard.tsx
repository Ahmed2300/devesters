'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
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

  const isExternal = project.actionLink.startsWith('http') || project.actionLink.includes('.') || project.actionLink.startsWith('//');
  const CardWrapper = isExternal ? 'a' : Link;

  return (
    <CardWrapper 
      href={project.actionLink} 
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
              {isExternal && (
                <div className={`absolute top-3 ${locale === 'ar' ? 'left-3' : 'right-3'} bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                  <span className="text-[10px] font-bold tracking-widest text-[#FF1C1C] uppercase">{dict.bentoGrid.livePreview}</span>
                  <span className="text-[#FF1C1C] text-[12px] -translate-y-[1px] rotate-45">↗</span>
                </div>
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
  );
}
