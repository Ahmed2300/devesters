'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const navLinks = [
  { name: 'Work', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Process', href: '/process' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Apply for Project', href: '/apply' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050509]/80 backdrop-blur-lg border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-0">
          <Image src="/devesters_icon.png" alt="Devesters Logo" width={24} height={24} className="rounded-sm" referrerPolicy="no-referrer" />
          <span className="text-xl font-heading font-bold tracking-tight text-white -ml-0.5">EVesters</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-sm font-medium transition-colors hover:text-white ${
                  isActive ? 'text-white' : 'text-[#d4d4d8]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-studio-red"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <button className="px-5 py-2 text-sm font-medium text-white bg-transparent border border-studio-red rounded-full transition-colors hover:bg-studio-red">
          Get in Touch
        </button>
      </div>
    </header>
  );
}
