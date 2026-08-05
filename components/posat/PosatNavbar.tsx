'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function PosatNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById('waitlist-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 max-w-6xl mx-auto pointer-events-none" dir="rtl">
      <div className="pointer-events-auto bg-[#0d0d12]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 h-16 flex items-center justify-between shadow-2xl transition-all duration-300">
        
        {/* Far Right: Branding */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-0 shrink-0" style={{ direction: 'ltr' }}>
            <Image src="/devesters_icon.png" alt="Devesters Logo" width={24} height={24} className="rounded-sm" />
            <span className="text-lg font-heading font-bold tracking-tight text-white -ml-0.5">EVesters</span>
          </Link>

          <span className="h-3.5 w-px bg-white/15" />

          {/* Posat Product Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <div className="w-4 h-4 relative shrink-0">
              <Image 
                src="/posat-symbol-transparent.png" 
                alt="Posat AI" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-xs font-bold text-white tracking-wide">
              Posat <span className="bg-gradient-to-r from-[#FF2A55] to-[#00F0FF] bg-clip-text text-transparent">AI</span>
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
          <a 
            href="#tool" 
            className="hover:text-white transition-colors duration-200"
          >
            الأداة
          </a>
          <a 
            href="#devesters" 
            className="hover:text-white transition-colors duration-200"
          >
            عن ديفسترز
          </a>
          <Link 
            href="/contact" 
            className="hover:text-white transition-colors duration-200"
          >
            تواصل معنا
          </Link>
        </nav>

        {/* Far Left: CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={scrollToWaitlist}
            className="bg-gradient-to-r from-[#FF2A55] to-[#E52E2E] text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-[0_4px_20px_rgba(255,42,85,0.35)] hover:shadow-[0_6px_25px_rgba(0,240,255,0.45)] hover:scale-[1.03] active:scale-95 transition-all duration-300 cursor-pointer border border-white/10"
          >
            انضم لقائمة الانتظار
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="pointer-events-auto mt-2 bg-[#0d0d12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 md:hidden flex flex-col gap-3 shadow-2xl"
          >
            <a
              href="#tool"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              الأداة
            </a>
            <a
              href="#devesters"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              عن ديفسترز
            </a>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              تواصل معنا
            </Link>

            <button
              onClick={scrollToWaitlist}
              className="bg-gradient-to-r from-[#FF2A55] to-[#E52E2E] text-white font-bold text-xs py-3 rounded-full shadow-[0_4px_20px_rgba(255,42,85,0.35)] transition-all cursor-pointer mt-1 text-center"
            >
              انضم لقائمة الانتظار
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
