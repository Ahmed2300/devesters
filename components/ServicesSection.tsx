import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section className="py-[80px] bg-[#09090b] text-white">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header content */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="px-3 py-1 rounded-full border border-[#FF1C1C]/20 bg-[#FF1C1C]/10 text-[#FF1C1C] text-[11px] font-bold uppercase tracking-[0.12em]">
            what we build
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Our Services.
          </h2>
          <p className="text-[#a1a1aa] max-w-[480px] mx-auto leading-relaxed">
            End-to-end engineering across web, mobile, and AI —
            every stack we touch, we ship to production.
          </p>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch mb-12">
          
          {/* Card 1: Web Development */}
          <Link href="/services/web-development" className="group rounded-[16px] bg-white/[0.04] border border-white/[0.09] backdrop-blur-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#FF1C1C]/35 cursor-pointer flex flex-col">
            <div className="relative h-[180px] md:h-[220px] bg-gradient-to-br from-indigo-900/20 to-[#09090b] rounded-t-[12px] group-hover:brightness-105 transition-all overflow-hidden flex items-center justify-center">
              <div className="absolute top-3 left-3 bg-black/60 rounded-[6px] px-2 py-1 text-white text-[12px] font-medium z-10 backdrop-blur-sm">
                Web Development
              </div>
              
              {/* Web Dashboard Illustration */}
              <div className="w-[80%] h-[60%] bg-[#121214] border border-white/10 rounded-lg shadow-xl overflow-hidden flex flex-col">
                <div className="flex-1 flex">
                  {/* Sidebar */}
                  <div className="w-1/4 border-r border-white/5 p-2 space-y-2">
                    <div className="w-full h-2 rounded bg-white/10 mb-4"></div>
                    <div className="w-3/4 h-1.5 rounded bg-white/5"></div>
                    <div className="w-full h-1.5 rounded bg-white/5"></div>
                    <div className="w-2/3 h-1.5 rounded bg-[#FF1C1C]/50"></div>
                  </div>
                  {/* Main Content */}
                  <div className="w-3/4 p-3 flex flex-col gap-3">
                    {/* Topbar */}
                    <div className="flex justify-between items-center mb-2">
                      <div className="w-1/2 h-2 rounded bg-white/5"></div>
                      <div className="w-4 h-4 rounded-full bg-white/10"></div>
                    </div>
                    {/* Data Table */}
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="h-1.5 w-1/4 bg-white/10 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-white/10 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-white/10 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-[#FF1C1C]/60 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-1.5 w-1/4 bg-white/5 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-white/5 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-white/5 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-[#FF1C1C]/30 rounded"></div>
                      </div>
                      <div className="flex gap-2">
                        <div className="h-1.5 w-1/4 bg-white/5 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-white/5 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-white/5 rounded"></div>
                        <div className="h-1.5 w-1/4 bg-[#FF1C1C]/30 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-heading font-medium text-white mb-2">Web & SaaS Development</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-[1.7] mb-5 font-sans">
                  We architect and deploy full-scale web platforms using Next.js — from complex SaaS dashboards to enterprise portals with integrated payment systems and authentication.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 bg-[#dc2626] text-white px-5 py-3 rounded-lg text-[13px] font-bold transition-all group-hover:opacity-90 group-hover:-translate-y-px mt-auto">
                Explore Service <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Mobile Apps */}
          <Link href="/services/mobile-development" className="group rounded-[16px] bg-white/[0.04] border border-white/[0.09] backdrop-blur-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#FF1C1C]/35 cursor-pointer lg:h-[calc(100%+20px)] lg:-mt-[10px] flex flex-col relative z-10 shadow-2xl">
            <div className="relative h-[180px] lg:h-[240px] bg-emerald-500/[0.06] rounded-t-[12px] group-hover:brightness-105 transition-all overflow-hidden flex items-center justify-center">
              <div className="absolute top-3 left-3 bg-black/60 rounded-[6px] px-2 py-1 text-white text-[12px] font-medium z-10 backdrop-blur-sm">
                Mobile App Development
              </div>
              
              {/* Overlapping Phones Illustration */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left Phone */}
                <div className="absolute w-[60px] md:w-[70px] h-[130px] rounded-[12px] bg-[#121214] border border-white/5 right-[55%] transform -rotate-12 translate-y-4 opacity-80 overflow-hidden p-2 flex flex-col gap-2">
                  <div className="text-[8px] text-zinc-300 font-medium">Weekly</div>
                  <div className="text-[10px] text-emerald-400 font-bold">+2.1%</div>
                  <div className="flex-1 flex items-end gap-1">
                    <div className="w-1/4 h-full bg-emerald-500/20 rounded-t-sm relative"><div className="absolute bottom-0 w-full h-[40%] bg-emerald-500/60 rounded-t-sm"></div></div>
                    <div className="w-1/4 h-full bg-emerald-500/20 rounded-t-sm relative"><div className="absolute bottom-0 w-full h-[60%] bg-emerald-500/60 rounded-t-sm"></div></div>
                    <div className="w-1/4 h-full bg-emerald-500/20 rounded-t-sm relative"><div className="absolute bottom-0 w-full h-[80%] bg-emerald-500/80 rounded-t-sm"></div></div>
                  </div>
                </div>

                {/* Right Phone */}
                <div className="absolute w-[60px] md:w-[70px] h-[130px] rounded-[12px] bg-[#121214] border border-white/5 left-[55%] transform rotate-12 translate-y-4 opacity-80 overflow-hidden p-2 flex flex-col gap-2">
                  <div className="text-[8px] text-zinc-300 font-medium">Recent</div>
                  <div className="flex gap-2 items-center bg-white/5 p-1 rounded-sm"><div className="w-3 h-3 rounded-full bg-white/20"></div><div className="h-1 w-full bg-emerald-400/80 rounded"></div></div>
                  <div className="flex gap-2 items-center bg-white/5 p-1 rounded-sm"><div className="w-3 h-3 rounded-full bg-white/20"></div><div className="h-1 w-full bg-emerald-400/60 rounded"></div></div>
                  <div className="flex gap-2 items-center bg-white/5 p-1 rounded-sm"><div className="w-3 h-3 rounded-full bg-white/20"></div><div className="h-1 w-full bg-emerald-400/40 rounded"></div></div>
                </div>

                {/* Center Phone */}
                <div className="relative w-[75px] md:w-[90px] h-[160px] rounded-[16px] bg-[#0c0c0e] border border-white/15 z-10 shadow-2xl overflow-hidden p-2 flex flex-col items-center">
                  <div className="w-[30%] h-[4px] bg-white/10 rounded-full mx-auto mb-2 mt-1"></div>
                  {/* Circular Donut mock */}
                  <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border-[4px] border-emerald-500/30 border-t-emerald-400 flex items-center justify-center mb-3">
                    <div className="text-[10px] md:text-[11px] font-bold text-white">$94k</div>
                  </div>
                  <div className="w-full flex justify-between px-1">
                    <div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-emerald-400 mb-1"></div><span className="text-[7px] text-zinc-400">60%</span></div>
                    <div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-emerald-500/50 mb-1"></div><span className="text-[7px] text-zinc-400">21%</span></div>
                    <div className="flex flex-col items-center"><div className="w-2 h-2 rounded-full bg-white/20 mb-1"></div><span className="text-[7px] text-zinc-400">19%</span></div>
                  </div>
                </div>

              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-heading font-medium text-white mb-2">Cross-Platform Mobile Engineering</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-[1.7] mb-5 font-sans">
                  Native-performance iOS and Android apps from a single Flutter codebase. We build apps that feel native on every device — from MVP to App Store launch.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 bg-[#dc2626] text-white px-5 py-3 rounded-lg text-[13px] font-bold transition-all group-hover:opacity-90 group-hover:-translate-y-px mt-auto">
                Explore Service <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 3: AI Integration */}
          <Link href="/services/ai-integration" className="group rounded-[16px] bg-white/[0.04] border border-white/[0.09] backdrop-blur-md overflow-hidden transition-all duration-200 ease-in-out hover:-translate-y-1 hover:border-[#FF1C1C]/35 cursor-pointer lg:col-span-1 md:col-span-2 col-span-1 flex flex-col">
            <div className="relative h-[180px] md:h-[220px] bg-violet-500/[0.08] rounded-t-[12px] group-hover:brightness-105 transition-all overflow-hidden flex items-center justify-center">
              <div className="absolute top-3 left-3 bg-black/60 rounded-[6px] px-2 py-1 text-white text-[12px] font-medium z-10 backdrop-blur-sm">
                AI Integration
              </div>
              
              {/* Floating Pills */}
              <div className="absolute top-6 right-6 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-500/30 text-[8px] transform rotate-3">LangChain</div>
              <div className="absolute bottom-8 left-6 px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-500/30 text-[8px] transform -rotate-6">OpenAI</div>
              <div className="absolute top-1/2 right-[10%] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-200 border border-violet-500/30 text-[8px] transform -rotate-3">RAG</div>

              {/* AI Interaction Diagram */}
              <div className="flex items-center gap-6 z-10">
                {/* Chat Panel */}
                <div className="w-[110px] h-[130px] rounded-[10px] bg-[#121214] border border-white/5 flex flex-col p-2 space-y-2">
                  <div className="self-end bg-[#FF1C1C]/20 border border-[#FF1C1C]/30 rounded-lg p-1.5 w-[75%] rounded-br-none">
                    <div className="h-1 bg-[#FF1C1C]/50 rounded w-full line-clamp-1 mb-0.5"></div>
                    <div className="h-1 bg-[#FF1C1C]/50 rounded w-2/3"></div>
                  </div>
                  <div className="self-start bg-white/[0.05] border border-white/10 rounded-lg p-1.5 w-[85%] rounded-bl-none">
                    <div className="h-1 bg-white/40 rounded w-full mb-1"></div>
                    <div className="h-4 w-full bg-violet-500/20 rounded-[2px] flex items-end gap-0.5 pt-0.5 p-0.5">
                      <div className="w-1/3 bg-violet-400 h-[60%] rounded-t-[1px]"></div>
                      <div className="w-1/3 bg-violet-400 h-[100%] rounded-t-[1px]"></div>
                      <div className="w-1/3 bg-violet-400 h-[40%] rounded-t-[1px]"></div>
                    </div>
                  </div>
                  <div className="mt-auto h-4 border border-white/10 rounded bg-[#1c1c1f] flex items-center justify-end px-1">
                    <div className="w-2 h-2 rounded-sm bg-white/20"></div>
                  </div>
                </div>

                {/* Pipeline Logic */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="px-2 py-1 bg-white/5 rounded-md border border-white/10 text-[7px] text-zinc-400 uppercase">Input</div>
                  <div className="h-4 border-l border-dashed border-white/20"></div>
                  <div className="px-2 py-1.5 bg-violet-500/10 rounded-md border border-violet-500/30 shadow-[0_0_10px_rgba(139,92,246,0.2)] text-[8px] text-violet-300 font-bold tracking-widest text-center leading-tight">
                    LLM<br />RAG
                  </div>
                  <div className="h-4 border-l border-dashed border-white/20"></div>
                  <div className="px-2 py-1 bg-white/5 rounded-md border border-white/10 text-[7px] text-zinc-400 uppercase">Output</div>
                </div>
              </div>

            </div>
            
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-[20px] font-heading font-medium text-white mb-2">AI Integration & LLM Tooling</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-[1.7] mb-5 font-sans">
                  We integrate practical large language models into your product — custom RAG pipelines, AI agents, and LLM-powered features that solve real business problems, not just demos.
                </p>
              </div>
              <div className="inline-flex w-fit items-center gap-1.5 bg-[#dc2626] text-white px-5 py-3 rounded-lg text-[13px] font-bold transition-all group-hover:opacity-90 group-hover:-translate-y-px mt-auto">
                Explore Service <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>

        {/* Section Footer */}
        <div className="text-center">
          <Link href="/services" className="inline-flex items-center text-[14px] text-[#a1a1aa] hover:text-[#FF1C1C] transition-colors gap-1 group">
            View all services <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
