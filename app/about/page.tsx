import Image from 'next/image';
import { 
  Atom, 
  Link as LinkIcon, 
  Database, 
  Cloud, 
  Layers, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  Cpu, 
  Code,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Globe
} from 'lucide-react';

const TEAM_MEMBERS = [
  {
    "name": "Ahmed Azam",
    "role": "Team Lead | Lead Mobile & Web Engineer",
    "bio": "Ahmed is the mastermind behind the architectural vision at Devesters. As the Team Lead and a senior Frontend/Mobile engineer, he seamlessly blends technical strategy with flawless execution. He specializes in transforming complex requirements into comprehensive, scalable SaaS platforms and high-performance applications. With deep expertise spanning cross-platform mobile development (Flutter) to modern web ecosystems (React, Next.js), his obsession with detail and AI integration makes him the cornerstone of our engineering delivery.",
    "skills": ["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind", "AI Tools"],
    "profile_url": "/team/ahmed-azam",
    "photo_url": "https://i.ibb.co/bMpK8X8Y/Ahmed.png",
    "social_media": {
      "github": "https://github.com/Ahmed2300",
      "linkedin": "https://www.linkedin.com/in/ahmed-azam-320a98200",
      "instagram": "https://www.instagram.com/ahmed_a_azam/",
      "email": "mailto:ahmed750@std.mans.edu.eg",
      "portfolio": "https://ahmedazamportfolio.netlify.app/"
    }
  },
  {
    "name": "Manar Elnahty",
    "role": "Frontend & Mobile Engineer",
    "bio": "Manar is a passionate and creative software engineer dedicated to crafting seamless digital experiences across multiple platforms. Backed by rigorous training at the Information Technology Institute (ITI), she possesses a unique hybrid skill set—bridging natively compiled mobile apps via Flutter with advanced frontend web architectures. Her ability to write clean, highly scalable code using modern stacks like React and TypeScript ensures that every interface Devesters ships is responsive, fast, and enterprise-ready.",
    "skills": ["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind", "AI Tools"],
    "profile_url": "/team/manar-elnahty",
    "photo_url": "https://i.ibb.co/spP6fmwN/manar.jpg",
    "social_media": {
      "github": "https://github.com/manarelnahty",
      "linkedin": "https://www.linkedin.com/in/manar-e-6b21bb230",
      "instagram": "https://www.instagram.com/manar_elnahty?igsh=M2VxdXRnaDRtMTRm&utm_source=qr",
      "email": "mailto:manarelnahty@gmail.com"
    }
  },
  {
    "name": "Mohamed Badr",
    "role": "Mobile Engineer & UI/UX Specialist",
    "bio": "Mohamed is the code artist of the team, intensely focused on mobile application architecture and user experience. Leveraging his specialized ITI background and deep understanding of UI/UX principles, he brings an elite level of polish to every interface he builds. He is dedicated to translating intricate design systems into high-performance Flutter applications, ensuring that every micro-interaction and 60fps animation feels fluid and native across both iOS and Android platforms.",
    "skills": ["Flutter", "Dart", "React", "JavaScript", "TypeScript", "UI/UX", "AI Tools"],
    "profile_url": "/team/mohamed-badr",
    "photo_url": "https://iili.io/KWL2vG1.jpg",
    "social_media": {
      "github": "https://github.com/mohmdadl",
      "linkedin": "https://www.linkedin.com/in/mhmdbadr4flutter/",
      "instagram": "https://www.instagram.com/mohmd_adl/",
      "email": "mailto:mohamedbadr4iti@gmail.com"
    }
  },
  {
    "name": "Ahmed Farghly",
    "role": "Backend Architect & Systems Engineer",
    "bio": "Ahmed Farghly is the driving force behind Devesters' robust infrastructure. He brings exceptional expertise to architecting large-scale backend systems using enterprise-grade frameworks like Laravel and Django. Ahmed's capabilities extend far beyond writing code; he is deeply involved in server administration, database design, and DevOps pipelines. His meticulous approach ensures that the servers and platforms we build remain highly available, secure, and performant under extreme load.",
    "skills": ["Laravel", "Django", "Backend", "API", "Golang", "Server Administrator", "DevOps", "AI Tools"],
    "profile_url": "/team/ahmed-farghly",
    "photo_url": "https://avatars.githubusercontent.com/u/95584009?v=4",
    "social_media": {
      "github": "https://github.com/Ahmedfargh",
      "linkedin": "https://www.linkedin.com/in/ahmed-farghly-879b09257",
      "email": "mailto:ahmedgits2001@gmail.com"
    }
  },
  {
    "name": "Ahmed Essam",
    "role": "Backend & Database Engineer",
    "bio": "Ahmed Essam is the engineer of logic, security, and performance behind the scenes. Specializing in complex database architecture and API development using PHP and Laravel, he focuses relentlessly on writing clean, testable, and highly maintainable backend code. His technical contributions are critical to ensuring secure, lightning-fast data flow between complex databases and frontend clients, providing the stable foundation required for our most advanced digital products.",
    "skills": ["PHP", "Laravel", "Backend Development", "ASP.NET", "AI Tools"],
    "profile_url": "/team/ahmed-essam",
    "photo_url": "https://i.ibb.co/Hf5bYZns/subol-red.png",
    "social_media": {
      "github": "https://github.com/AhmedEssam88",
      "linkedin": "https://www.linkedin.com/in/ahmed-essam-465208232",
      "email": "mailto:ahmedessam1.8.14@gmail.com"
    }
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32 mt-12">
        <p className="text-studio-red font-bold tracking-widest text-xs uppercase mb-6">
          The Squad
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-white mb-8 leading-[1.1]">
          Built by Engineers<br />
          Who <span className="text-studio-red">Ship.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#d4d4d8] leading-relaxed max-w-2xl">
          We are a premium software engineering collective — not a marketplace, not a cheap agency. A focused team of specialists that thinks about your business logic, UX, and architecture at the same time.
        </p>
      </section>

      {/* Who We Are & Stats container */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-6">Who We Are</h2>
              <p className="text-[#d4d4d8] leading-relaxed text-sm md:text-base">
                Devesters was founded on the principle of engineering excellence. Led by <span className="text-white font-bold">Ahmed Azam, Mohamed Badr, Ahmed Farghly, Ahmed Essam, and Manar Elnahty</span>, our studio focuses on creating robust digital infrastructure that scales. We aren&apos;t just developers; we are product partners who live in the intersection of efficiency and innovation.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-6">What Sets Us Apart</h2>
              <p className="text-[#d4d4d8] leading-relaxed text-sm md:text-base">
                We don&apos;t juggle fifty clients. We operate as dedicated product teams, embedding ourselves into your vision to ensure the software we build doesn&apos;t just work—it dominates. Our focus is on longevity, performance, and maintainable codebases.
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-14">
            <div className="flex flex-col space-y-10">
              <div className="flex items-center gap-6">
                <span className="text-5xl md:text-6xl font-heading font-light text-[#e5e5e5]">3+</span>
                <span className="text-xs tracking-widest uppercase text-[#a1a1aa] font-medium leading-relaxed">Shipped<br className="hidden sm:block" />Products</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-5xl md:text-6xl font-heading font-light text-[#e5e5e5]">1</span>
                <span className="text-xs tracking-widest uppercase text-[#a1a1aa] font-medium leading-relaxed">Launchpad<br className="hidden sm:block" />Award</span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-5xl md:text-6xl font-heading font-light text-[#e5e5e5]">5</span>
                <span className="text-xs tracking-widest uppercase text-[#a1a1aa] font-medium leading-relaxed">Core<br className="hidden sm:block" />Engineers</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Engineering Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-16 text-center">Core Engineering Team</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors group flex flex-col h-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-6">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-white/10 group-hover:border-studio-red/50 transition-colors">
                  <Image src={member.photo_url} alt={member.name} fill className="object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{member.name}</h3>
                  <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-[#d4d4d8] uppercase border border-white/10 rounded-full bg-white/5">
                    {member.role}
                  </span>
                </div>
              </div>
              
              <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8 flex-grow">
                {member.bio}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-6">
                {member.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1 text-[10px] font-medium tracking-wider text-studio-red border border-studio-red/20 rounded-md bg-studio-red/5">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-white/5">
                {member.social_media.github && (
                  <a href={member.social_media.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="GitHub">
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {member.social_media.linkedin && (
                  <a href={member.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.social_media.instagram && (
                  <a href={member.social_media.instagram} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Instagram">
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {member.social_media.portfolio && (
                  <a href={member.social_media.portfolio} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Portfolio">
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {member.social_media.email && (
                  <a href={member.social_media.email} className="text-zinc-400 hover:text-white transition-colors" title="Email">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Where We're Headed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12">Where We&apos;re Headed</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-studio-red mb-6">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Scaling Our Products</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Transitioning from engineering excellence to building our own proprietary SaaS ecosystem and dev tools.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-studio-red mb-6">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Leading MENA&apos;s AI Integration</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Democratizing access to high-performance LLMs and specialized AI agents for local enterprise ecosystems.
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-studio-red mb-6">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">Open Source & Community</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              Giving back by releasing our internal design-to-code pipelines and performance testing suites to the world.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
