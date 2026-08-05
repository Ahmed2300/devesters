'use client';

import { useRef, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import WaitlistForm from './WaitlistForm';
import { DevestersBrand } from './BrandLogos';

export default function PosatHero() {
  const [isPlaying1, setIsPlaying1] = useState(true);
  const [isPlaying2, setIsPlaying2] = useState(true);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  const togglePlay1 = () => {
    if (videoRef1.current) {
      if (isPlaying1) {
        videoRef1.current.pause();
      } else {
        videoRef1.current.play();
      }
      setIsPlaying1(!isPlaying1);
    }
  };

  const togglePlay2 = () => {
    if (videoRef2.current) {
      if (isPlaying2) {
        videoRef2.current.pause();
      } else {
        videoRef2.current.play();
      }
      setIsPlaying2(!isPlaying2);
    }
  };

  // Generate 20 glowing red & cyan particle dots drifting upwards (deterministic for SSR hydration)
  const particles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: `${(i * 17) % 95 + 2}%`,
      size: ((i * 7) % 3) + 2.5,
      duration: ((i * 3) % 8) + 8,
      delay: (i * 1.3) % 5,
    }));
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] bg-[radial-gradient(circle_at_center,rgba(255,68,51,0.06)_0%,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] flex flex-col items-center pt-24 pb-32 px-4 sm:px-6 max-w-7xl mx-auto text-center" dir="rtl">
      
      {/* Red Flame & Electric Cyan Curved Horizon Line */}
      <div className="absolute top-[65%] sm:top-[70%] left-1/2 -translate-x-1/2 w-[200vw] sm:w-[150vw] h-[100vh] rounded-[100%] bg-gradient-to-t from-[#FF2A55]/15 via-[#00F0FF]/10 to-transparent border-t-[2px] border-t-[#00F0FF]/40 shadow-[0_-60px_200px_rgba(0,240,255,0.25)] backdrop-blur-3xl z-0 pointer-events-none" />

      {/* Ambient Glow Orbs */}
      <motion.div
        animate={{
          x: [-40, 40, -40],
          y: [-25, 25, -25],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#FF2A55]/25 via-[#FF5E3A]/15 to-[#00F0FF]/25 blur-[150px] rounded-full pointer-events-none z-0"
      />

      {/* Upward Drifting Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '105vh', opacity: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.7, 0.7, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'linear',
            }}
            style={{
              left: p.x,
              width: p.size,
              height: p.size,
              backgroundColor: p.id % 2 === 0 ? '#FF2A55' : '#00F0FF',
              borderRadius: '50%',
              boxShadow: `0 0 10px ${p.id % 2 === 0 ? '#FF2A55' : '#00F0FF'}`,
              position: 'absolute',
            }}
          />
        ))}
      </div>

      {/* Floating Category Kicker Badge Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/[0.05] backdrop-blur-xl border border-white/10 shadow-lg hover:border-[#00F0FF]/40 hover:-translate-y-0.5 transition-all duration-300 mb-8 z-10 relative cursor-pointer group"
        dir="rtl"
      >
        <div className="flex items-center text-xs font-medium text-white">
          <span>قائمة الانتظار</span>
          <span className="text-white/50 font-sans font-normal text-[11px] mr-1.5">| Waitlist</span>
        </div>
      </motion.div>

      {/* Tech Blueprint Hero Box with Dual Corner Crosshairs */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative p-6 sm:p-12 border border-white/10 rounded-3xl bg-[#0a0a0e]/70 backdrop-blur-2xl max-w-4xl mx-auto mb-12 shadow-2xl z-10 w-full"
      >
        {/* Giant Main Headline with Bigger Brand Icon Beside It */}
        <div className="flex flex-row items-center justify-center gap-3 sm:gap-6 mb-4 sm:mb-6" dir="ltr">
          <div className="w-16 h-16 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 relative shrink-0">
            <Image 
              src="/posat-symbol-transparent.png" 
              alt="Posat AI Logo" 
              fill 
              sizes="(max-width: 768px) 160px, 200px"
              className="object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.65)]" 
            />
          </div>
          <h1 className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white font-heading leading-tight">
            Posat{' '}
            <span className="bg-gradient-to-r from-[#FF2A55] via-[#FF5E3A] to-[#00F0FF] bg-clip-text text-transparent">
              AI
            </span>
          </h1>
        </div>

        {/* Sub-heading */}
        <p className="text-gray-300 text-sm sm:text-lg md:text-xl max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-sans px-2">
          كن أول من يخوض تجربة الذكاء الاصطناعي القادمة في عالم المؤثرات البصرية وسحر المونتاج مع أداة <strong className="text-white">بساط</strong> من تطوير <DevestersBrand size="md" />.
        </p>

        {/* Inline Waitlist Form */}
        <WaitlistForm />
      </motion.div>

      {/* Side-by-Side Dual Video Showcase (Seamless Full-Bleed Glassmorphic Cards) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ y: [0, -10, 0], opacity: 1 }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.8, delay: 0.4 },
        }}
        className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl z-20 relative grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mx-auto"
      >
        {/* Video Card 1 */}
        <div 
          onClick={togglePlay1}
          className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0A0A0A] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)] group transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_30px_60px_rgba(229,46,46,0.1)] cursor-pointer"
        >
          {/* Full-Bleed Video Element */}
          <video
            ref={videoRef1}
            src="/posat-vfx-example-1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Gradient Overlay (Top) */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Minimalist Floating Header (The Prompt Bar) */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20" dir="rtl">
            {/* Monochrome OS Dots (Top-Right in RTL) */}
            <div className="flex gap-1.5" dir="ltr">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>

            <div className="flex-1 mx-2 sm:mx-4 flex justify-center overflow-hidden" dir="ltr">
              <span className="font-mono text-[10px] sm:text-xs text-white/70 tracking-wider truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
                &gt; prompt: &quot;Cinematic fire aura&quot;
              </span>
            </div>

            {/* Sub-label */}
            <span className="text-[10px] font-mono text-white/40 uppercase" dir="ltr">EX 01</span>
          </div>

          {/* Ultra-Clean Floating Badge (VFX Directive) */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10" dir="rtl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4500] shadow-[0_0_8px_#FF4500]" />
            <span className="text-[10px] sm:text-xs font-medium text-white/90">VFX Timing Directive</span>
          </div>

          {/* Play Button Overlay */}
          {!isPlaying1 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-14 h-14 rounded-full bg-[#E52E2E]/90 flex items-center justify-center text-white shadow-2xl scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        {/* Video Card 2 */}
        <div 
          onClick={togglePlay2}
          className="relative w-full aspect-[4/5] rounded-[24px] overflow-hidden bg-[#0A0A0A] border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)] group transition-all duration-500 hover:border-white/[0.15] hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)] cursor-pointer"
        >
          {/* Full-Bleed Video Element */}
          <video
            ref={videoRef2}
            src="/posat-vfx-example-2.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Floating Gradient Overlay (Top) */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10 pointer-events-none" />

          {/* Minimalist Floating Header (The Prompt Bar) */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20" dir="rtl">
            {/* Monochrome OS Dots (Top-Right in RTL) */}
            <div className="flex gap-1.5" dir="ltr">
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
              <div className="w-2 h-2 rounded-full bg-white/20" />
            </div>

            <div className="flex-1 mx-2 sm:mx-4 flex justify-center overflow-hidden" dir="ltr">
              <span className="font-mono text-[10px] sm:text-xs text-white/70 tracking-wider truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none">
                &gt; prompt: &quot;Energy shockwave&quot;
              </span>
            </div>

            {/* Sub-label */}
            <span className="text-[10px] font-mono text-white/40 uppercase" dir="ltr">EX 02</span>
          </div>

          {/* Ultra-Clean Floating Badge (VFX Directive) */}
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10" dir="rtl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <span className="text-[10px] sm:text-xs font-medium text-white/90">VFX Energy Sequence</span>
          </div>

          {/* Play Button Overlay */}
          {!isPlaying2 && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs">
              <div className="w-14 h-14 rounded-full bg-[#E52E2E]/90 flex items-center justify-center text-white shadow-2xl scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white translate-x-0.5" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
