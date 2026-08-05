'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const dict = getDictionary(locale);

  if (pathname.startsWith('/admin') || pathname.startsWith('/posat')) {
    return null;
  }

  const navLinks = [
    { name: dict.navbar.work, href: '/' },
    { name: dict.navbar.services, href: '/services' },
    { name: dict.navbar.process, href: '/process' },
    { name: dict.navbar.about, href: '/about' },
    { name: dict.navbar.projects, href: '/projects' },
    { name: dict.navbar.contact, href: '/contact' },
  ];

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto pointer-events-none">
      <div className="pointer-events-auto nav-container px-6 h-16 sm:h-18 flex items-center justify-between transition-all duration-300">
        <Link href="/" className="flex items-center gap-0 z-50 shrink-0" style={{ direction: 'ltr' }}>
          <Image src="/devesters_icon.png" alt="Devesters Logo" width={26} height={26} className="rounded-sm" />
          <span className="text-xl font-heading font-bold tracking-tight text-white -ml-0.5">EVesters</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-white font-semibold' : 'text-[#d4d4d8]/80'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#FF3B30] rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button 
            onClick={toggleLocale}
            className="secondary-btn inline-flex items-center justify-center h-9 px-3.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:text-white rounded-full leading-none cursor-pointer"
          >
            {locale === 'ar' ? 'EN' : 'العربية'}
          </button>
          <Link 
            href="/contact" 
            className="primary-btn inline-flex items-center justify-center h-9 px-5 text-sm font-medium text-white rounded-full leading-none cursor-pointer"
          >
            {dict.navbar.getInTouch}
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden z-50 p-2 text-white hover:text-studio-red transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="pointer-events-auto mt-3 nav-container p-6 lg:hidden flex flex-col gap-5 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium transition-colors ${
                      isActive ? 'text-[#FF3B30] font-semibold' : 'text-[#d4d4d8] hover:text-white'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="pt-2 flex flex-col gap-3">
                <button 
                  onClick={() => { toggleLocale(); setIsMobileMenuOpen(false); }}
                  className="secondary-btn w-full inline-flex items-center justify-center h-10 text-xs font-semibold uppercase tracking-wider text-zinc-200 hover:text-white rounded-full leading-none cursor-pointer"
                >
                  {locale === 'ar' ? 'English' : 'العربية'}
                </button>
                <Link 
                  href="/contact" 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="primary-btn w-full inline-flex items-center justify-center h-10 text-sm font-medium text-white rounded-full leading-none cursor-pointer text-center"
                >
                  {dict.navbar.getInTouch}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
