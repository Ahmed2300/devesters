import Link from 'next/link';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ArrowRight, Bot, Search, Cpu, MessageSquare, Network, BrainCircuit } from 'lucide-react';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.servicesSection.aiTitle,
  };
}

export default async function AIIntegrationServicePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  const features = locale === 'ar' ? [
    { title: "أنظمة RAG مخصصة", desc: "ربط سياقات وبيانات المؤسسات بالنماذج اللغوية الكبيرة (LLMs) بشكل آمن ودون ثغرات.", icon: Network },
    { title: "وكلاء أذكياء مستقلون", desc: "وكلاء متعددو المهام والخطوات مدعومون بـ LangChain لتنفيذ تسلسلات منطقية ومهام فعلية.", icon: Bot },
    { title: "بحث دلالي (Semantic)", desc: "دمج قواعد البيانات المتجهية (Vector DB) مثل Pinecone أو Weaviate لحل الاستعلامات بوعي كامل بالسياق.", icon: Search },
    { title: "هندسة الأوامر (Prompt)", desc: "تصاميم إرشادية وتوجيهية متطورة تضمن استجابة وسلوكيات محددة وثابتة من النماذج اللغوية الكبيرة.", icon: MessageSquare },
    { title: "ربط واجهات الـ API", desc: "توصيل مباشر عالي الأداء مع OpenAI و Anthropic و Gemini والموديلات مفتوحة المصدر.", icon: Cpu },
    { title: "سير عمل مخصص", desc: "عمليات إدراكية مدمجة بعمق لأتمتة مئات الساعات اليدوية الروتينية لفرق العمل والشركات.", icon: BrainCircuit },
  ] : [
    { title: "RAG Systems", desc: "Retrieval-Augmented Generation linking enterprise context with large language models seamlessly.", icon: Network },
    { title: "Autonomous Agents", desc: "LangChain-powered multi-step agents that execute actual code and functions logic sequences.", icon: Bot },
    { title: "Semantic Search", desc: "Vector database integration (Pinecone/Weaviate) for deep, context-aware query resolution.", icon: Search },
    { title: "Prompt Engineering", desc: "Robust, deterministic system instructional designs ensuring consistent LLM behavior models.", icon: MessageSquare },
    { title: "API Integration", desc: "Direct, high-performance piping with OpenAI, Anthropic, Gemini, and open-source models.", icon: Cpu },
    { title: "Custom Workflows", desc: "Deeply embedded cognitive processes automating hundreds of manual company hours.", icon: BrainCircuit },
  ];

  return (
    <main className="min-h-screen pt-32 pb-20">
      <section className="max-w-4xl mx-auto px-6 mb-20 md:mb-32 mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-studio-red"></span>
          <span className="text-[10px] font-bold tracking-widest text-[#a1a1aa] uppercase">
            {locale === 'ar' ? 'تفاصيل الخدمة' : 'Service Details'}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1]">
          {locale === 'ar' ? 'دمج الذكاء الاصطناعي' : 'AI Integration'}{' '}
          <span className="text-studio-red">{locale === 'ar' ? 'وأدوات نماذج اللغة (LLM)' : '& LLM Tooling'}</span>
        </h1>
        
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12">
          {dict.servicesSection.aiDesc}
        </p>

        <Link href="/contact" className="inline-flex items-center gap-1.5 bg-studio-red text-white px-6 py-3.5 rounded-lg text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-px">
          {locale === 'ar' ? 'ابدأ مشروعك معنا' : 'Start Your Project'}{' '}
          <ArrowRight className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
        </Link>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[16px] hover:border-studio-red/30 transition-colors group cursor-default">
              <feature.icon className="w-8 h-8 text-studio-red mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-heading font-medium text-white mb-3">{feature.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
