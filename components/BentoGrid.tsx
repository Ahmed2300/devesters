import BentoCard, { IBentoProject } from './BentoCard';
import { SiNextdotjs, SiReact, SiFlutter, SiNodedotjs, SiPython, SiPhp, SiLaravel, SiDart, SiGo } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const projects: IBentoProject[] = [
  {
    id: 'soubul',
    title: 'Soubul',
    tag: 'SaaS / LMS',
    description: 'A comprehensive LMS platform with complex architecture and integrated payments. Designed for enterprise-level scaling.',
    techStack: ['React.ts', 'Flutter', 'Dart', 'PHP', 'Laravel'],
    gridSpan: 'col-span-1 lg:col-span-2',
    imageUrl: '/soubul-welcome-page.png',
    iconUrl: '/soubul-red.png',
    actionLink: 'https://www.soubul.net/',
  },
  {
    id: 'naptah',
    title: 'Naptah',
    tag: 'AI & AgTech',
    description: 'Award-winning AI-powered agricultural ecosystem with advanced LLM integration for precision farming.',
    techStack: ['React.js', 'Tailwind', 'Flutter', 'Dart', 'Node.js', 'Firebase', 'AWS'],
    gridSpan: 'col-span-1 row-span-2',
    imageUrl: 'https://i.ibb.co/G4HmKHTz/naptah-snapshoot.png',
    iconUrl: 'https://i.ibb.co/hRLR9Rf5/Nabtah-logo.png',
    actionLink: '/work/naptah',
  },
  {
    id: 'hirewire',
    title: 'HireWire',
    tag: 'AI Tooling',
    description: 'An intelligent agent that filters and ranks freelance opportunities using AI, automating the lead-gen pipeline for agencies.',
    techStack: [],
    gridSpan: 'col-span-1',
    actionLink: '/work/hirewire',
  }
];

export default function BentoGrid() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-20">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-studio-red/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <h2 className="text-3xl font-heading font-bold text-white mb-10 tracking-tight uppercase">Selected Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
        {projects.map((project) => (
          <BentoCard key={project.id} project={project} />
        ))}
        
        {/* Tech Stack Card */}
        <div className="bg-glass rounded-2xl p-6 relative overflow-hidden transition-all duration-300 ease-out hover:bg-white/10 hover:border-studio-red/30 col-span-1 lg:col-span-2 group hover:scale-[1.02] transform">
          {/* Inner gradient for extra depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between h-full">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-heading font-bold text-white mb-2">Our Stack</h3>
              <p className="text-sm text-[#d4d4d8]">Engineered for absolute performance.</p>
            </div>
            <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiNextdotjs className="w-4 h-4 text-studio-red" /> Next.js
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiReact className="w-4 h-4 text-studio-red" /> React
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiFlutter className="w-4 h-4 text-studio-red" /> Flutter
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiNodedotjs className="w-4 h-4 text-studio-red" /> Node.js
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiPython className="w-4 h-4 text-studio-red" /> Python
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiPhp className="w-4 h-4 text-studio-red" /> PHP
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiLaravel className="w-4 h-4 text-studio-red" /> Laravel
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <FaJava className="w-4 h-4 text-studio-red" /> Java
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiDart className="w-4 h-4 text-studio-red" /> Dart
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white">
              <SiGo className="w-4 h-4 text-studio-red" /> Golang
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
