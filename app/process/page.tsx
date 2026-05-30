import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { Clock, PenTool, Eye, User } from 'lucide-react';

const STANDARD_ICONS = [PenTool, Eye, User];

export default async function ProcessPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  const steps = dict.processPage.steps;
  const standards = dict.processPage.standards.map((std, i) => ({
    ...std,
    icon: STANDARD_ICONS[i]
  }));

  return (
    <main className="min-h-screen pt-32 pb-20">
      
      {/* Hero Section */}
      <section className="relative max-w-4xl mx-auto px-6 text-center mb-24 md:mb-32 mt-12">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-studio-red"></span>
            <span className="text-[10px] font-bold tracking-widest text-[#a1a1aa] uppercase">{dict.processPage.badge}</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="text-zinc-400">{dict.processPage.titlePrefix}</span><br />
            <span className="text-white">{dict.processPage.titleSuffix}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            {dict.processPage.description}
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="flex items-center gap-4 mb-14">
          <span className="text-xs text-zinc-500 font-mono">01</span>
          <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">{dict.processPage.theProcess}</h2>
        </div>

        <div className="relative">
          {/* Vertical line connecting the dots - Mirrored for RTL */}
          <div className={`absolute ${locale === 'ar' ? 'right-[31px]' : 'left-[31px]'} top-8 bottom-8 w-px border-l border-dashed border-white/10 hidden sm:block`}></div>

          <div className="space-y-12 sm:space-y-16">
            {steps.map((step, idx) => (
              <div key={step.num} className="relative z-10 flex flex-col sm:flex-row gap-6 sm:gap-10">
                {/* Number Circle */}
                <div className="w-16 h-16 shrink-0 rounded-full border border-studio-red/20 bg-black/60 backdrop-blur-md flex items-center justify-center text-studio-red text-xl font-heading font-bold shadow-[0_0_15px_rgba(229,57,53,0.1)]">
                  {step.num}
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-10 relative overflow-hidden group hover:border-white/10 transition-colors">
                  {/* Badge with conditional rounding for LTR/RTL */}
                  {idx === 3 && (
                    <div className={`absolute top-0 ${locale === 'ar' ? 'left-0 rounded-br-xl rounded-tl-xl' : 'right-0 rounded-bl-xl rounded-tr-xl'} bg-studio-red text-white text-[10px] font-bold px-3 py-1 tracking-widest uppercase shadow-md`}>
                      {dict.processPage.badgeLongest}
                    </div>
                  )}

                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-zinc-400 text-sm mb-6 font-medium">
                    <Clock className="w-4 h-4" />
                    <span>{step.time}</span>
                  </div>
                  
                  <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                    {step.desc}
                  </p>

                  <div className="mt-8 bg-black/30 border border-white/5 rounded-xl p-5 sm:p-6">
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-4">{dict.processPage.outputs}</p>
                    <div className="flex flex-wrap gap-2.5">
                      {step.outputs.map(out => (
                        <span key={out} className="px-3 py-1.5 text-xs font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-md">
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Section */}
      <section className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-xs text-zinc-500 font-mono">02</span>
          <h2 className="text-2xl font-heading font-bold text-white uppercase tracking-wider">{dict.processPage.ourStandards}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {standards.map((std) => (
            <div key={std.title} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col group hover:bg-white/[0.04] transition-colors">
              <div className="mb-6 text-studio-red">
                <std.icon className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-4">
                {std.title}
              </h3>
              <p className="text-[#a1a1aa] text-sm leading-relaxed">
                {std.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
