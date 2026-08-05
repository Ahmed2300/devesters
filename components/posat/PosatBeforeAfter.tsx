'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

export default function PosatBeforeAfter() {
  const videoRefBefore = useRef<HTMLVideoElement>(null);
  const videoRefAfter = useRef<HTMLVideoElement>(null);

  const [isPlayingBefore, setIsPlayingBefore] = useState(true);
  const [isPlayingAfter, setIsPlayingAfter] = useState(true);

  const togglePlayBefore = () => {
    if (videoRefBefore.current) {
      if (isPlayingBefore) {
        videoRefBefore.current.pause();
      } else {
        videoRefBefore.current.play();
      }
      setIsPlayingBefore(!isPlayingBefore);
    }
  };

  const togglePlayAfter = () => {
    if (videoRefAfter.current) {
      if (isPlayingAfter) {
        videoRefAfter.current.pause();
      } else {
        videoRefAfter.current.play();
      }
      setIsPlayingAfter(!isPlayingAfter);
    }
  };

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto relative z-20" dir="rtl">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[700px] h-[350px] bg-gradient-to-r from-[#FF2A55]/10 via-[#FF5E3A]/05 to-[#00F0FF]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
        {/* Order 2: Top Badge - Isolated bilingual text flow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 text-[11px] sm:text-xs font-medium text-gray-300" dir="rtl">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF] animate-pulse shrink-0" />
          <span>تحول ذكي خارق</span>
          <span className="text-white/30 font-mono">|</span>
          <span dir="ltr" className="font-sans text-white/80" style={{ unicodeBidi: 'isolate' }}>Before &amp; After</span>
        </div>

        {/* Order 1: Headline Bidi Isolation */}
        <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading leading-tight" dir="rtl">
          شاهد قدرة بساط في تحويل الملمس والقوام{' '}
          <span dir="ltr" className="inline-block font-sans text-white/90" style={{ unicodeBidi: 'isolate' }}>
            (Laptop to Sponge)
          </span>
        </h2>

        {/* Order 4: Subheadline - Softened visual hierarchy (opacity 0.6) */}
        <p className="text-xs sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed">
          تغيير المواد والأسطح في مقاطع الفيديو دون إعادة تصوير أو تعديل جرافيك معقد.
        </p>
      </div>

      {/* Order 6: Grid Spacing (24px gap = gap-6) & Edge-to-Edge Frosted Glass Shell (Order 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto" dir="rtl">
        
        {/* BEFORE CARD (Right side in RTL) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={togglePlayBefore}
          className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden bg-[#0A0A0A] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)] group transition-all duration-500 hover:border-white/[0.18] hover:shadow-[0_20px_50px_rgba(255,42,85,0.15)] cursor-pointer"
        >
          {/* Full-Bleed Edge-to-Edge Video Element */}
          <video
            ref={videoRefBefore}
            src="/videos/laptop-before.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Top Gradient Overlay */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Top Prompt Header */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20" dir="rtl">
            <div className="flex gap-1.5" dir="ltr">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>

            <div className="flex-1 mx-2 sm:mx-4 flex justify-center overflow-hidden" dir="ltr">
              <span className="font-mono text-[10px] sm:text-xs text-white/70 tracking-wider truncate max-w-[150px] sm:max-w-none">
                &gt; input: &quot;Original raw laptop video&quot;
              </span>
            </div>

            {/* Order 3: Frosted Glass chip tag (BEFORE) */}
            <span className="text-[11px] font-mono text-white/70 px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.08]" dir="ltr">
              BEFORE
            </span>
          </div>

          {/* Bottom Floating Badge */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10" dir="rtl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2A55] shadow-[0_0_8px_#FF2A55]" />
            <span className="text-[11px] sm:text-xs font-medium text-white/90">الفيديو الأصلي (قبل التعديل)</span>
          </div>

          {/* Play Overlay */}
          {!isPlayingBefore && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-14 h-14 rounded-full bg-[#FF2A55]/90 flex items-center justify-center text-white shadow-2xl scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              </div>
            </div>
          )}
        </motion.div>

        {/* AFTER CARD (Left side in RTL) */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={togglePlayAfter}
          className="relative w-full aspect-[4/5] rounded-[20px] overflow-hidden bg-[#0A0A0A] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)] group transition-all duration-500 hover:border-[#00F0FF]/40 hover:shadow-[0_25px_60px_rgba(0,240,255,0.2)] cursor-pointer"
        >
          {/* Full-Bleed Edge-to-Edge Video Element */}
          <video
            ref={videoRefAfter}
            src="/videos/laptop-spongie-after.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Top Gradient Overlay */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Top Prompt Header */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20" dir="rtl">
            <div className="flex gap-1.5" dir="ltr">
              <div className="w-2 h-2 rounded-full bg-[#00F0FF]" />
              <div className="w-2 h-2 rounded-full bg-[#00F0FF]/50" />
              <div className="w-2 h-2 rounded-full bg-[#00F0FF]/20" />
            </div>

            <div className="flex-1 mx-2 sm:mx-4 flex justify-center overflow-hidden" dir="ltr">
              <span className="font-mono text-[10px] sm:text-xs text-white/90 tracking-wider truncate max-w-[150px] sm:max-w-none">
                &gt; prompt: &quot;Squishy sponge material&quot;
              </span>
            </div>

            {/* Order 3: Frosted Glass chip tag (AFTER) */}
            <span className="text-[11px] font-mono text-white/80 font-medium px-3 py-1 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/[0.1]" dir="ltr">
              AFTER (POSAT AI)
            </span>
          </div>

          {/* Bottom Floating Badge */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10" dir="rtl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium text-white">بعد التعديل (تحول إسفنجي)</span>
          </div>

          {/* Play Overlay */}
          {!isPlayingAfter && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[#FF2A55] to-[#00F0FF] flex items-center justify-center text-white shadow-2xl scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
