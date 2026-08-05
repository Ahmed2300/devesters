'use client';

import { motion } from 'framer-motion';

const features = [
  {
    titleAr: 'أوامر نصية بسيطة',
    titleEn: '(Prompt to VFX)',
    description: 'اكتب الوصف أو المؤثر الذي تتخيله فقط، ليقوم الذكاء الاصطناعي بتحويل النص المكتوب إلى مؤثرات بصرية معقدة في ثوانٍ معدودة.',
    badge: 'معالجة لغوية ذكية',
  },
  {
    titleAr: 'أداء وريندر فائق السرعة',
    titleEn: '(Instant Render)',
    description: 'توليد ومزامنة المؤثرات عبر سيرفرات سحابية ذكية دون الحاجة إلى امتلاك أجهزة مونتاج ثقيلة أو كروت شاشة مكلفة.',
    badge: 'خوادم GPU فائقة',
  },
  {
    titleAr: 'جودة سينمائية جاهزة للنشر',
    titleEn: '(Cinema Quality)',
    description: 'نتائج احترافية بدقة عالية 4K ومؤثرات مصممة للانتشار السريع مباشرة على المنصات الرقمية.',
    badge: 'دقة 4K احترافية',
  },
];

export default function PosatFeatures() {
  return (
    <section id="tool" className="relative w-full max-w-[1200px] mx-auto text-right" style={{ padding: '96px 24px' }} dir="rtl">
      
      {/* Signature Logo Ambient Light Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] sm:h-[350px] bg-gradient-to-r from-[#FF2A55]/10 to-[#00F0FF]/10 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto flex flex-col items-center" style={{ marginBottom: '56px' }}>
        <span className="inline-block px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-medium text-gray-300" style={{ marginBottom: '12px' }}>
          إمكانيات غير محدودة
        </span>
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading leading-tight" style={{ marginBottom: '40px' }}>
          لماذا تعد أداة{' '}
          <span className="bg-gradient-to-r from-[#FF2A55] via-[#FF5E3A] to-[#00F0FF] bg-clip-text text-transparent font-serif italic" style={{ textShadow: '0 0 24px rgba(0, 240, 255, 0.4)' }}>
            بساط
          </span>{' '}
          خيارك الأقوى؟
        </h2>
        <p className="text-xs sm:text-base text-gray-400">
          صُممت خصيصاً لصنّاع المحتوى والمخرجين لتجاوز حدود المونتاج التقليدي وتوفير مئات الساعات.
        </p>
      </div>

      {/* Grid of 3 Glassmorphic Feature Cards (Flush-Right RTL Axis) */}
      <div className="features-grid">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.titleAr}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="feature-card feature-card-glass hover:-translate-y-1 hover:border-[#00F0FF]/30 hover:shadow-[0_16px_40px_rgba(0,240,255,0.12)] transition-all duration-300"
          >
            {/* Card Badge */}
            <span className="inline-block text-[10px] sm:text-[11px] font-medium text-gray-300 bg-white/[0.06] px-3 py-1 rounded-full border-none shadow-inner" style={{ marginBottom: '24px' }}>
              {feature.badge}
            </span>

            {/* Title with Isolated LTR English Direction */}
            <h3 dir="rtl" className="text-base sm:text-lg font-bold text-white font-heading leading-snug w-full text-right" style={{ marginBottom: '14px' }}>
              {feature.titleAr}{' '}
              <span dir="ltr" style={{ display: 'inline-block' }}>
                {feature.titleEn}
              </span>
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300/80 leading-relaxed text-right">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
