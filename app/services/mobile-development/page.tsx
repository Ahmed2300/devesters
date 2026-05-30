import Link from 'next/link';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ArrowRight, Smartphone, Layers, Zap, Gauge, PlaySquare, Code } from 'lucide-react';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.servicesSection.mobileTitle,
  };
}

export default async function MobileDevelopmentServicePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  const features = locale === 'ar' ? [
    { title: "بنية Flutter المعمارية", desc: "قاعدة كود موحدة وعالية التحسين تصدر إلى نظامي iOS وأندرويد في نفس الوقت.", icon: Code },
    { title: "واجهات مستخدم (UI/UX) أصلية", desc: "حركات سلسة، إيماءات أصلية، وأنماط تصميم مخصصة لكل نظام تشغيل بشكل منفرد.", icon: Smartphone },
    { title: "أداء 60 إطاراً في الثانية", desc: "مهندسة لتحقيق انسيابية تامة دون سقوط إطارات باستخدام محرك Flutter القوي.", icon: Gauge },
    { title: "النشر في المتاجر", desc: "خدمة إطلاق متكاملة من الامتثال لقواعد Apple Developer وحتى تهيئة متجر Google Play.", icon: PlaySquare },
    { title: "أنظمة التحديث الفوري", desc: "دمج WebSockets لخدمات الدردشة المباشرة، أدوات التحكم بالـ IoT، واللوحات الإخبارية الفورية.", icon: Zap },
    { title: "إدارة الحالات المعقدة", desc: "إدارة قوية وآمنة للبيانات باستخدام Riverpod أو BLoC للتعامل مع آلاف السجلات بسرعة.", icon: Layers },
  ] : [
    { title: "Flutter Architecture", desc: "A single, highly optimized codebase exporting to both iOS and Android simultaneously.", icon: Code },
    { title: "Native UI/UX", desc: "Smooth animations, native gestures, and platform-specific design patterns.", icon: Smartphone },
    { title: "60 FPS Performance", desc: "Engineered for absolute fluidity without frame drops using Flutter's high-performance engine.", icon: Gauge },
    { title: "App Store Deployment", desc: "Full-service launching from Apple Developer compliance to Google Play Store optimizations.", icon: PlaySquare },
    { title: "Real-Time Systems", desc: "WebSocket integration for live chat, IoT controls, and live-updating dashboards.", icon: Zap },
    { title: "Complex State", desc: "Robust data management using Riverpod or BLoC handling thousands of records rapidly.", icon: Layers },
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
          {locale === 'ar' ? 'هندسة تطبيقات الجوال' : 'Cross-Platform'}{' '}
          <span className="text-studio-red">{locale === 'ar' ? 'عابرة المنصات' : 'Mobile Engineering'}</span>
        </h1>
        
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12">
          {dict.servicesSection.mobileDesc}
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
