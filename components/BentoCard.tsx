'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { FiArrowRight } from 'react-icons/fi';

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
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-glass rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ease-out hover:bg-white/10 hover:border-studio-red/30 group ${project.gridSpan}`}
    >
      {/* Inner gradient for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            {project.iconUrl && (
              <Image src={project.iconUrl} alt={`${project.title} icon`} width={32} height={32} className="rounded-md object-contain" referrerPolicy="no-referrer" />
            )}
            <h3 className="text-2xl font-heading font-bold text-white">{project.title}</h3>
          </div>
          <span className="px-3 py-1 text-[10px] font-bold tracking-wider text-soft-aqua uppercase border border-soft-aqua/20 rounded-full bg-soft-aqua/5">
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
              className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {!project.imageUrl && (
          <div className="mt-auto pt-6 flex items-center text-xs font-bold tracking-widest text-[#d4d4d8] uppercase group-hover:text-white transition-colors cursor-pointer">
            View Case Study
            <FiArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
