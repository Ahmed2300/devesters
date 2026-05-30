import Link from 'next/link';
import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { ArrowRight, Code2, Layers, Zap, ShieldCheck, Database, LayoutTemplate } from 'lucide-react';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);
  return {
    title: dict.servicesSection.webTitle,
  };
}

export default async function WebDevelopmentServicePage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);

  const features = locale === 'ar' ? [
    { title: "بنية Next.js المعمارية", desc: "تطوير جانب الخادم (SSR)، توليد المواقع الثابتة (SSG)، وتوصيل مثالي عبر الحافة (Edge).", icon: LayoutTemplate },
    { title: "لوحات تحكم SaaS", desc: "إدارة معقدة للحالة، تكامل تحليلات عميقة، وأنظمة واجهات مستخدم مخصصة.", icon: Layers },
    { title: "الأداء أولاً", desc: "تحسين درجات Lighthouse إلى الكمال. أوقات تحميل سريعة كالبرق.", icon: Zap },
    { title: "دمج واجهات برمجة التطبيقات (API)", desc: "اتصالات سلسة بـ Stripe و SendGrid وأنظمة إدارة علاقات العملاء (CRM) والأدوات الخارجية.", icon: Code2 },
    { title: "أمان المؤسسات", desc: "مصادقة بمستوى البنوك، تحكم في الوصول قائم على الأدوار (RBAC)، ومعالجة آمنة للبيانات.", icon: ShieldCheck },
    { title: "تصميم قواعد البيانات", desc: "تصميم مخططات قواعد بيانات قابلة للتوسع باستخدام PostgreSQL و Prisma وقواعد بيانات بدون خوادم (Serverless).", icon: Database },
  ] : [
    { title: "Next.js Architecture", desc: "Server-side rendering, static site generation, and optimized Edge delivery.", icon: LayoutTemplate },
    { title: "SaaS Dashboards", desc: "Complex state management, deep analytics integration, and bespoke UI systems.", icon: Layers },
    { title: "Performance First", desc: "Lighthouse scores optimized to perfection. Lightning-fast load times.", icon: Zap },
    { title: "API Integration", desc: "Seamless connections to Stripe, SendGrid, CRMs, and third-party tools.", icon: Code2 },
    { title: "Enterprise Security", desc: "Bank-grade authentication, RBAC, and secure data handling out of the box.", icon: ShieldCheck },
    { title: "Database Design", desc: "Scalable schema design using PostgreSQL, Prisma, and serverless databases.", icon: Database },
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
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1] whitespace-pre-line">
          {locale === 'ar' ? 'تطوير الويب' : 'Web & SaaS'}{' '}
          <span className="text-studio-red">{locale === 'ar' ? 'ومنصات الـ SaaS' : 'Development'}</span>
        </h1>
        
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12">
          {dict.servicesSection.webDesc}
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
