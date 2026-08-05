'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { DevestersBrand } from './BrandLogos';

export default function AgencyBanner() {
  return (
    <section id="devesters" className="w-full relative my-8" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="cta-banner-container cta-banner-glass relative overflow-hidden"
      >
        {/* Ambient lighting radial gradient (brand red hue ~5% opacity) behind CTA button */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-[radial-gradient(circle,_rgba(255,42,85,0.05)_0%,_transparent_70%)] blur-2xl pointer-events-none z-0" />

        {/* Text Block (Strict Flush-Right Axis) */}
        <div className="cta-text-group max-w-2xl relative z-10">
          {/* Top Badge: Frosted fill without outline */}
          <span className="agency-badge" style={{ marginBottom: '12px' }}>
            Software Agency <DevestersBrand size="xs" />
          </span>

          {/* Main Headline */}
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading leading-tight" style={{ marginBottom: '16px' }}>
            تريد بناء مشروع برمجي أو أداة ذكاء اصطناعي؟
          </h2>

          {/* Subheadline (Muted Hierarchy: rgba(255, 255, 255, 0.6)) */}
          <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
            في <DevestersBrand size="sm" />، نحول الأفكار إلى منتجات برمجية متكاملة وقابلة للتوسع.
          </p>
        </div>

        {/* CTA Action Button (Balanced spatial offset & soft ambient glow) */}
        <div className="shrink-0 w-full md:w-auto relative z-10" style={{ marginLeft: '32px' }}>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center w-full md:w-auto px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#FF2A55] to-[#E52E2E] border border-white/10 shadow-[0_0_24px_rgba(255,42,85,0.4),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_32px_rgba(255,42,85,0.6),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:scale-[1.04] transition-all duration-200 cursor-pointer text-center"
          >
            تواصل معنا لبناء مشروعك
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
