'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown } from 'lucide-react';
import BentoCard, { IBentoProject } from '@/components/BentoCard';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

const categoriesEN = ['All', 'SaaS', 'AI', 'Open Source', 'Mobile', 'E-commerce'];
const categoriesAR = ['الكل', 'SaaS', 'ذكاء اصطناعي', 'مصدر مفتوح', 'تطبيقات جوال', 'تجارة إلكترونية'];

type DefaultProject = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  icon: string | any;
  customIcon?: string;
  featured: boolean;
  coverImage?: boolean;
  cover_image?: string;
  covers?: any;
  link?: string;
  previewUrl?: string;
  preview_url?: string;
  github_url?: string;
};

export default function ProjectsClient({ projectsData }: { projectsData: DefaultProject[] }) {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  const categories = locale === 'ar' ? categoriesAR : categoriesEN;
  const [activeCategory, setActiveCategory] = useState(locale === 'ar' ? 'الكل' : 'All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredProjects = projectsData.filter((project) => {
    const isAll = activeCategory === 'All' || activeCategory === 'الكل';
    
    // Substring matching to support both languages
    const matchesCategory = isAll || 
      project.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === 'ذكاء اصطناعي' && (project.category.includes('ذكاء') || project.category.toLowerCase().includes('ai'))) ||
      (activeCategory === 'تطبيقات جوال' && (project.category.includes('جوال') || project.category.toLowerCase().includes('mobile'))) ||
      (activeCategory === 'تجارة إلكترونية' && (project.category.includes('تجارة') || project.category.toLowerCase().includes('commerce'))) ||
      (activeCategory === 'مصدر مفتوح' && (project.category.includes('مصدر') || project.category.toLowerCase().includes('source'))) ||
      (activeCategory === 'SaaS' && (project.category.includes('SaaS') || project.category.includes('إدارة تعلم')));

    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#09090b] text-white pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="text-studio-red text-[11px] font-bold uppercase tracking-widest mb-4">
            {dict.projectsPage.badge}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6">
            {dict.projectsPage.title}
          </h1>
          <p className="text-[#a1a1aa] text-lg max-w-2xl leading-relaxed">
            {dict.projectsPage.description}
          </p>
        </div>

        {/* Controls: Search, Filters, Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          {/* Search */}
          <div className="relative w-full lg:w-[320px]">
            <Search className={`absolute ${locale === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]`} />
            <input 
              type="text"
              placeholder={dict.projectsPage.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 ${locale === 'ar' ? 'pr-11 pl-4' : 'pl-11 pr-4'} text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-studio-red/50 transition-colors`}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? 'bg-studio-red text-white' 
                    : 'bg-white/[0.04] text-[#a1a1aa] border border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <button className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors ${locale === 'ar' ? 'mr-auto' : 'ml-auto'} lg:ml-0 lg:mr-0`}>
            {dict.projectsPage.newestFirst} <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(350px,auto)]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              
              let spanClass = "col-span-1";
              if (i % 5 === 0 || i % 5 === 3) {
                spanClass = "col-span-1 lg:col-span-2 md:col-span-2";
              }

              const isUrl = (s?: string) => s && (s.startsWith('http') || s.startsWith('/'));
              const bentoProject: IBentoProject = {
                id: String(project.id),
                title: project.title,
                tag: project.category,
                description: project.description,
                techStack: project.tech || [],
                gridSpan: spanClass,
                imageUrl: project.covers?.landscape || project.covers?.square || project.covers?.portrait || (typeof project.cover_image === 'string' ? project.cover_image : undefined) || (typeof project.coverImage === 'string' ? project.coverImage : undefined),
                iconUrl: (typeof project.customIcon === 'string' && isUrl(project.customIcon)) ? project.customIcon : ((typeof project.icon === 'string' && isUrl(project.icon)) ? project.icon : undefined),
                actionLink: project.previewUrl || project.preview_url || project.github_url || project.link || '#',
              };

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className={spanClass}
                >
                   <BentoCard project={bentoProject} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#a1a1aa] text-lg">{dict.projectsPage.emptyState}</p>
            <button 
              onClick={() => { setActiveCategory(locale === 'ar' ? 'الكل' : 'All'); setSearchQuery(''); }}
              className="mt-4 text-studio-red hover:underline"
            >
              {dict.projectsPage.clearFilters}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
