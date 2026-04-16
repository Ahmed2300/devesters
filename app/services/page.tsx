import { Monitor, Smartphone, Cpu, Server, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { 
  SiNextdotjs, 
  SiNodedotjs, 
  SiFirebase, 
  SiPostgresql, 
  SiFlutter, 
  SiDart, 
  SiPython, 
  SiOpenai, 
  SiLaravel, 
  SiSupabase,
  SiAmazonaws,
  SiTailwindcss
} from 'react-icons/si';
import { FaCode, FaBrain, FaDatabase } from 'react-icons/fa';

const techIcons: Record<string, React.ElementType> = {
  'Next.js': SiNextdotjs,
  'Node.js': SiNodedotjs,
  'Firebase': SiFirebase,
  'PostgreSQL': SiPostgresql,
  'Flutter': SiFlutter,
  'Dart': SiDart,
  'REST APIs': FaCode,
  'Python': SiPython,
  'LangChain': FaBrain,
  'OpenAI API': SiOpenai,
  'RAG': FaDatabase,
  'Laravel': SiLaravel,
  'Supabase': SiSupabase,
  'AWS': SiAmazonaws,
  'Tailwind': SiTailwindcss,
  'React.js': SiNextdotjs, // Using Next.js icon for React.js as well or SiReact if I import it
};

export default function ServicesPage() {
  const renderTechPill = (tech: string) => {
    const Icon = techIcons[tech];
    return (
      <span key={tech} className="px-3 py-1 text-xs font-medium border border-red-500/30 text-red-400 rounded-full bg-red-500/5 hover:border-red-500/60 hover:text-red-300 transition-colors flex items-center gap-1.5">
        {Icon && <Icon className="w-3 h-3" />}
        {tech}
      </span>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-20">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="max-w-3xl">
          <p className="text-studio-red font-bold tracking-wider text-sm uppercase mb-4">What We Do</p>
          <h1 className="text-5xl md:text-6xl font-mono font-bold tracking-tighter leading-tight text-white mb-6">
            End-to-End Engineering,<br />From Idea to Deployment.
          </h1>
          <p className="text-lg text-[#d4d4d8] leading-relaxed">
            We don&apos;t hand off. We architect, build, and ship complete digital products. Precision engineering for teams that demand performance.
          </p>
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Web & SaaS */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:bg-white/10 hover:border-studio-red/30 group">
            <div className="bg-red-900/20 text-red-500 p-3 rounded-lg w-fit mb-6">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Web & SaaS Development</h3>
            <p className="text-[#d4d4d8] mb-8 flex-grow">
              We architect and deploy heavy-duty platforms using Next.js — from complex payment gateways to custom LMS infrastructure.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Next.js', 'Node.js', 'Firebase', 'PostgreSQL'].map(tech => renderTechPill(tech))}
            </div>
            <Link href="/work/soubul" className="text-sm text-[#d4d4d8] hover:text-white transition-colors flex items-center gap-2 mt-auto">
              <span className="text-studio-red">↳</span> View Soubul LMS
            </Link>
          </div>

          {/* Cross-Platform Mobile */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:bg-white/10 hover:border-studio-red/30 group">
            <div className="bg-red-900/20 text-red-500 p-3 rounded-lg w-fit mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Cross-Platform Mobile (Flutter)</h3>
            <p className="text-[#d4d4d8] mb-8 flex-grow">
              Natively compiled iOS & Android apps with a single codebase, delivering pixel-perfect UX on every device.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {['Flutter', 'Dart', 'REST APIs'].map(tech => renderTechPill(tech))}
            </div>
          </div>

          {/* AI Integration */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:bg-white/10 hover:border-studio-red/30 group">
            <div className="bg-red-900/20 text-red-500 p-3 rounded-lg w-fit mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">AI Integration & LLM Tooling</h3>
            <p className="text-[#d4d4d8] mb-8 flex-grow">
              We integrate practical large language models to solve real industry problems — not wrappers, actual products.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {['Python', 'LangChain', 'OpenAI API', 'RAG'].map(tech => renderTechPill(tech))}
            </div>
            <Link href="/work/naptah" className="text-sm text-[#d4d4d8] hover:text-white transition-colors flex items-center gap-2 mt-auto">
              <span className="text-studio-red">↳</span> View Naptah Ecosystem
            </Link>
          </div>

          {/* Backend & Infrastructure */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col h-full transition-all duration-300 hover:bg-white/10 hover:border-studio-red/30 group">
            <div className="bg-red-900/20 text-red-500 p-3 rounded-lg w-fit mb-6">
              <Server className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Backend & Infrastructure</h3>
            <p className="text-[#d4d4d8] mb-8 flex-grow">
              Scalable, battle-tested backends. We&apos;ve built for load — databases, queues, auth, and server-side architecture.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {['Laravel', 'Firebase', 'Node.js', 'Supabase'].map(tech => renderTechPill(tech))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Timeline */}
      <section className="mb-32">
        <h2 className="text-3xl font-heading font-bold text-white mb-16 text-center">How We Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[1px] bg-white/10 -z-10" />
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#050509] border border-studio-red text-studio-red flex items-center justify-center font-bold mb-6 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              1
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Discovery & Architecture</h4>
            <p className="text-[#d4d4d8] text-sm leading-relaxed max-w-xs">Mapping the business logic, defining the tech stack, and planning the architecture before writing a single line of code.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#050509] border border-studio-red text-studio-red flex items-center justify-center font-bold mb-6 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              2
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Agile Engineering</h4>
            <p className="text-[#d4d4d8] text-sm leading-relaxed max-w-xs">Iterative sprints, transparent communication, and continuous delivery. You see the product taking shape every week.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#050509] border border-studio-red text-studio-red flex items-center justify-center font-bold mb-6 shadow-[0_0_15px_rgba(220,38,38,0.2)]">
              3
            </div>
            <h4 className="text-xl font-bold text-white mb-3">Deployment & Scale</h4>
            <p className="text-[#d4d4d8] text-sm leading-relaxed max-w-xs">Shipping the product to production, setting up CI/CD pipelines, and ensuring the infrastructure is ready to scale.</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-24 rounded-3xl overflow-hidden border border-white/5">
        <div className="absolute inset-0 bg-gradient-to-t from-red-950/40 to-transparent -z-10" />
        <div className="flex flex-col items-center text-center px-6">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Ready to Build?</h2>
          <p className="text-lg text-[#d4d4d8] mb-10 max-w-2xl">
            Tell us what you&apos;re making. We&apos;ll tell you how we&apos;d build it.
          </p>
          <Link 
            href="/contact" 
            className="group px-8 py-4 text-sm font-medium text-white bg-studio-red rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] transition-all flex items-center gap-2"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
}
