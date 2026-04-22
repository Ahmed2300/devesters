'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { 
  Search, 
  ChevronDown, 
  Rocket, 
  Bot, 
  Code2, 
  Smartphone, 
  ShoppingBag, 
  ShieldCheck, 
  Activity, 
  TerminalSquare, 
  Building 
} from 'lucide-react';

const categories = ['All', 'SaaS', 'AI', 'Open Source', 'Mobile', 'E-commerce'];

type Project = {
  id: number;
  title: string;
  description: string;
  category: string;
  tech: string[];
  icon: any; // Fallback lucide icon
  customIcon?: string;
  featured: boolean;
  coverImage?: boolean;
  covers?: {
    landscape: string;
    portrait: string;
    square: string;
  };
  link: string;
  previewUrl?: string;
};

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Soubul',
    description: 'A comprehensive LMS platform with complex architecture and integrated payments. Designed for enterprise-level scaling.',
    category: 'SAAS / LMS',
    tech: ['React.ts', 'Flutter', 'Dart', 'PHP', 'Laravel'],
    icon: Rocket,
    customIcon: 'https://i.ibb.co/0p49X1DR/subol-red.png',
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/mrVK72YC/Screenshot-20260416-230419.png',
      portrait: 'https://i.ibb.co/mVTk9mFC/Gemini-Generated-Image-ict7k1ict7k1ict7.png',
      square: 'https://i.ibb.co/Ldfp9LpY/Gemini-Generated-Image-xozhl7xozhl7xozh.png'
    },
    link: '/projects/soubul',
    previewUrl: 'https://www.soubul.net/'
  },
  {
    id: 2,
    title: 'Naptah',
    description: 'Comprehensive agricultural ecosystem and e-commerce platform empowering local farmers and buyers.',
    category: 'E-commerce',
    tech: ['Next.js', 'PostgreSQL', 'Stripe'],
    icon: Bot,
    customIcon: 'https://i.ibb.co/7xMRqxcR/Nabtah-logo.png',
    featured: true, // Make Naptah featured as well to show off the landscape cover
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/7tNm1JQM/Gemini-Generated-Image-eqan4veqan4veqan.png',
      portrait: 'https://i.ibb.co/xtGX7VFm/Gemini-Generated-Image-bprpw7bprpw7bprp.png',
      square: 'https://i.ibb.co/LDKxt53p/Gemini-Generated-Image-e2upore2upore2up.png'
    },
    link: '/projects/naptah',
    previewUrl: 'https://naptah.netlify.app/'
  },
  {
    id: 3,
    title: 'BlackWater',
    description: 'A custom auto-healing container orchestrator. Integrates C-based eBPF kernel monitoring with Go to autonomously manage Docker resources and prevent server crashes.',
    category: 'System',
    tech: ['Go', 'C', 'eBPF', 'Docker'],
    icon: Code2,
    customIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='55' font-family='system-ui, sans-serif' font-weight='900' font-size='80' fill='white' text-anchor='middle' dominant-baseline='middle'%3EB%3C/text%3E%3C/svg%3E",
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/bMLtcwzH/Gemini-Generated-Image-zgxgxizgxgxizgxg.png',
      portrait: 'https://i.ibb.co/G3s4xmBx/Gemini-Generated-Image-ksm9erksm9erksm9.png',
      square: 'https://i.ibb.co/23DJRjbm/Gemini-Generated-Image-3kadtr3kadtr3kad.png'
    },
    link: '/projects/blackwater'
  },
  {
    id: 10,
    title: 'Royal Village',
    description: 'Full-featured football club platform offering pitch booking, event hall reservations, and academy registrations powered by Angular Signals.',
    category: 'Sports Platform',
    tech: ['Angular', 'JavaScript', 'Tailwind CSS'],
    icon: Activity,
    customIcon: 'https://royal-prime-league.netlify.app/assets/images/logo2.png',
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/Xf041W6v/Gemini-Generated-Image-xd050dxd050dxd05.png',
      portrait: 'https://i.ibb.co/fY9yY80x/Gemini-Generated-Image-dxfudddxfudddxfu.png',
      square: 'https://i.ibb.co/fY9yY80x/Gemini-Generated-Image-dxfudddxfudddxfu.png'
    },
    link: '/projects/royal-village',
    previewUrl: 'https://royal-prime-league.netlify.app/'
  },
  {
    id: 4,
    title: 'HireWire',
    description: 'An intelligent agent that filters and ranks freelance opportunities using AI, automating the lead-gen pipeline for agencies.',
    category: 'AI Tooling',
    tech: ['OpenAI', 'Next.js', 'TypeScript', 'LangChain'],
    icon: Bot,
    featured: false,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/5X3Np302/image.png',
      portrait: 'https://i.ibb.co/5X3Np302/image.png',
      square: 'https://i.ibb.co/5X3Np302/image.png'
    },
    link: '/projects/hirewire'
  },
  {
    id: 5,
    title: 'Luxe Direct',
    description: 'Headless luxury marketplace with atomic inventory sync across 40 countries.',
    category: 'E-commerce',
    tech: ['REMIX', 'SHOPIFY'],
    icon: ShoppingBag,
    featured: false,
    link: '/projects/luxe-direct'
  },
  {
    id: 6,
    title: 'Sentinel AI',
    description: 'Autonomous threat detection for cloud-native infrastructure monitoring.',
    category: 'AI',
    tech: ['GO', 'TENSORFLOW'],
    icon: ShieldCheck,
    featured: false,
    link: '/projects/sentinel-ai'
  },
  {
    id: 7,
    title: 'Orbit Analytics',
    description: 'Post-cookie attribution modeling for high-scale marketing teams.',
    category: 'SaaS',
    tech: ['ELIXIR'],
    icon: Activity,
    featured: false,
    link: '/projects/orbit-analytics'
  },
  {
    id: 8,
    title: 'Dev Terminal',
    description: 'Mobile native terminal emulator with full SSH and container support.',
    category: 'Mobile',
    tech: ['SWIFT'],
    icon: TerminalSquare,
    featured: false,
    link: '/projects/dev-terminal'
  },
  {
    id: 9,
    title: 'Neo Ledger',
    description: 'Frictionless checkout system for digital asset trading platforms.',
    category: 'E-commerce',
    tech: ['REACT'],
    icon: Building,
    featured: false,
    link: '/projects/neo-ledger'
  }
];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#09090b] text-white pt-[120px] pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-16">
          <div className="text-[#FF1C1C] text-[11px] font-bold uppercase tracking-widest mb-4">
            OUR WORK
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-6">
            What We&apos;ve Built.
          </h1>
          <p className="text-[#a1a1aa] text-lg max-w-2xl leading-relaxed">
            Every project is a product we&apos;d be proud to ship. We combine technical precision with high-performance engineering to create digital monoliths.
          </p>
        </div>

        {/* Controls: Search, Filters, Sort */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          {/* Search */}
          <div className="relative w-full lg:w-[320px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a1a1aa]" />
            <input 
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white placeholder:text-[#52525b] focus:outline-none focus:border-[#FF1C1C]/50 transition-colors"
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
                    ? 'bg-[#FF1C1C] text-white' 
                    : 'bg-white/[0.04] text-[#a1a1aa] border border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors ml-auto lg:ml-0">
            Newest First <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(0, 6).map((project, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className={`group relative rounded-[20px] bg-[#121214] overflow-hidden flex flex-col justify-between transition-all duration-300 min-h-[380px] ${
                  project.featured 
                    ? 'md:col-span-2 border border-[#FF1C1C]/30 shadow-[0_0_15px_rgba(255,28,28,0.05)]' 
                    : 'col-span-1 border border-white/[0.05] hover:border-[#FF1C1C]/35'
                }`}
              >
                {/* Abstract Backgrounds mimicking the UI screenshots */}
                {!project.featured && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-50 group-hover:opacity-100 transition-opacity mix-blend-overlay pointer-events-none" />
                )}
                
                {project.featured ? (
                  <div className="relative z-10 flex flex-col h-full p-6 md:p-10">
                    {/* Top Header: Logo + Title vs Tag */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        {project.customIcon ? (
                          <div className="w-8 h-8 shrink-0 flex items-center justify-center overflow-hidden">
                            <Image 
                              src={project.customIcon} 
                              alt={project.title} 
                              width={32} 
                              height={32} 
                              className="object-contain" 
                              unoptimized={true} 
                            />
                          </div>
                        ) : (
                          <div className="w-8 h-8 text-[#FF1C1C] shrink-0 mt-1">
                            <svg viewBox="0 0 40 40" fill="currentColor">
                              <path d="M4 22 C 4 22, 12 18, 16 26 C 22 36, 30 18, 36 12" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                              <path d="M8 12 L 14 16" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
                            </svg>
                          </div>
                        )}
                        <h3 className="text-2xl md:text-[28px] font-bold font-heading text-white">{project.title}</h3>
                      </div>
                      <div className="text-[10px] md:text-xs font-bold tracking-[0.15em] px-4 py-2 rounded-full border border-[#0ea5e9]/30 text-[#38bdf8] bg-transparent whitespace-nowrap">
                        {project.category}
                      </div>
                    </div>

                    {/* Desc */}
                    <p className="text-[#a1a1aa] text-sm md:text-[15px] leading-relaxed max-w-2xl mb-8">
                      {project.description}
                    </p>

                    {/* New Tech Pills */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-10">
                      {project.tech.map((t) => (
                        <span key={t} className="px-4 py-2.5 rounded-[10px] bg-white/[0.04] border border-white/[0.08] text-[11px] md:text-xs font-semibold text-[#a1a1aa] transition-colors hover:text-white hover:border-white/20">
                          {t}
                        </span>
                      ))}
                      
                      {project.previewUrl && (
                         <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#FF1C1C]/10 border border-[#FF1C1C]/30 text-[#FF1C1C] text-[11px] md:text-xs font-bold hover:bg-[#FF1C1C]/20 transition-colors">
                           Live Preview <span className="text-[14px]">↗</span>
                         </a>
                      )}
                    </div>

                    {/* Full Width Hero Graphic */}
                    {project.covers ? (
                      <Link href={project.link} className="block mt-auto w-full aspect-[3/4] sm:aspect-square lg:aspect-[21/9] rounded-[16px] overflow-hidden relative group/cover border border-white/5 bg-[#09090b]">
                        {/* Landscape (1024px and up) */}
                        <Image 
                          src={project.covers.landscape} 
                          alt={`${project.title} Landscape`} 
                          fill
                          priority={true}
                          sizes="(min-width: 1024px) 100vw, 1vw"
                          className="hidden lg:block object-cover transition-transform duration-700 group-hover/cover:scale-[1.03]" 
                        />
                        {/* Square (640px to 1024px) */}
                        <Image 
                          src={project.covers.square} 
                          alt={`${project.title} Square`} 
                          fill
                          priority={true}
                          sizes="(min-width: 640px) and (max-width: 1023px) 100vw, 1vw"
                          className="hidden sm:block lg:hidden object-cover transition-transform duration-700 group-hover/cover:scale-[1.03]" 
                        />
                        {/* Portrait (Less than 640px) */}
                        <Image 
                          src={project.covers.portrait} 
                          alt={`${project.title} Portrait`} 
                          fill
                          priority={true}
                          sizes="(max-width: 639px) 100vw, 1vw"
                          className="block sm:hidden object-cover transition-transform duration-700 group-hover/cover:scale-[1.03]" 
                        />
                      </Link>
                    ) : (
                      <Link href={project.link} className="block mt-auto w-full aspect-[21/9] sm:aspect-[24/7] lg:aspect-[32/10] rounded-[16px] overflow-hidden bg-gradient-to-br from-[#d9192c] to-[#990a18] relative group/cover">
                        <div className="absolute inset-0 bg-[#09090b]/10 mix-blend-overlay pointer-events-none" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-80 transition-transform duration-700 group-hover/cover:scale-105">
                          <Image 
                            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop" 
                            alt="Fallback Hero" 
                            fill
                            sizes="100vw"
                            priority={true}
                            className="object-cover mix-blend-luminosity opacity-[0.25]" 
                          />
                        </div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                           <div className="text-white text-7xl md:text-9xl font-black italic tracking-tighter" style={{ textShadow: '0 10px 40px rgba(0,0,0,0.4)', fontFamily: 'system-ui' }}>اس</div>
                        </div>
                      </Link>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="relative z-10 flex justify-between items-start p-8">
                      <div className="w-12 h-12 rounded-[12px] bg-transparent border border-white/10 flex items-center justify-center backdrop-blur-md overflow-hidden">
                        {project.customIcon ? (
                          <Image 
                            src={project.customIcon} 
                            alt={project.title} 
                            width={24} 
                            height={24} 
                            className="object-contain" 
                            unoptimized={true} 
                          />
                        ) : (
                          <project.icon className="w-5 h-5 text-white/70" />
                        )}
                      </div>
                      <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-md ${
                        project.category.toLowerCase().includes('saas') ? 'bg-transparent text-[#FF1C1C] border border-[#FF1C1C]/30' :
                        project.category.toLowerCase().includes('ai') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        project.category.toLowerCase().includes('open source') ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        project.category.toLowerCase().includes('mobile') ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {project.category}
                      </div>
                    </div>

                    <div className="relative z-10 p-8 pt-12 flex flex-col gap-4 mt-auto">
                      <h3 className="text-2xl font-bold font-heading text-white group-hover:text-[#FF1C1C] transition-colors">{project.title}</h3>
                      <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-[90%]">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-2 w-full">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2.5 py-1.5 rounded bg-transparent border border-white/10 text-[10px] font-medium tracking-wide text-zinc-400">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mt-4">
                        <Link href={project.link} className="inline-flex items-center gap-2 text-sm font-bold text-white hover:opacity-80 transition-opacity">
                          View Project <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                        {project.previewUrl && (
                          <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF1C1C] hover:opacity-80 transition-opacity">
                            Live Preview <span className="text-[14px] -translate-y-[1px]">↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* CTA Banner Mid-Grid */}
          {filteredProjects.length >= 6 && activeCategory === 'All' && !searchQuery && (
            <motion.div 
              layout
              className="col-span-1 md:col-span-2 lg:col-span-3 rounded-[20px] bg-gradient-to-r from-[#121214] to-[#1a1a1d] border border-white/10 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden my-4"
            >
              {/* Decorative faint glow */}
              <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent pointer-events-none select-none"></div>

              <div className="relative z-10 max-w-xl text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Want to build something legendary?</h2>
                <p className="text-[#a1a1aa] text-lg">Our studio is currently accepting 2 more projects for Q4.</p>
              </div>
              <Link href="/contact" className="relative z-10 bg-[#fca5a5] hover:bg-[#fca5a5]/90 text-[#09090b] font-bold px-8 py-4 rounded-[8px] transition-colors whitespace-nowrap text-sm tracking-wide">
                START A CONSULTATION
              </Link>
            </motion.div>
          )}

          {/* Remaining Projects */}
          <AnimatePresence mode="popLayout">
            {filteredProjects.slice(6).map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative rounded-[20px] bg-[#121214] border border-white/[0.05] overflow-hidden flex flex-col justify-between hover:border-[#FF1C1C]/35 transition-all duration-300 min-h-[380px] col-span-1"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-50 group-hover:opacity-100 transition-opacity mix-blend-overlay pointer-events-none" />
                
                <div className="relative z-10 flex justify-between items-start p-8">
                  <div className="w-12 h-12 rounded-[12px] bg-white/[0.04] border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <project.icon className="w-5 h-5 text-white/80" />
                  </div>
                  <div className={`text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-md ${
                    project.category === 'SaaS' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                    project.category === 'AI' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    project.category === 'Open Source' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                    project.category === 'Mobile' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {project.category}
                  </div>
                </div>

                <div className="relative z-10 p-8 pt-12 flex flex-col gap-4 mt-auto">
                  <h3 className="text-2xl font-bold font-heading text-white group-hover:text-[#FF1C1C] transition-colors">{project.title}</h3>
                  <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-[90%]">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-400">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link href={project.link} className="inline-flex items-center gap-2 text-sm font-semibold text-white mt-4 hover:opacity-80 transition-opacity w-fit">
                    View Project <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#a1a1aa] text-lg">No projects found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-4 text-[#FF1C1C] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Load More */}
        {filteredProjects.length > 0 && activeCategory === 'All' && !searchQuery && (
          <button className="w-full mt-12 py-5 rounded-[12px] bg-white/[0.02] border border-white/5 text-[#a1a1aa] hover:bg-white/[0.05] hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium">
            Load more projects (2 remaining) <ChevronDown className="w-4 h-4" />
          </button>
        )}

      </div>
    </main>
  );
}
