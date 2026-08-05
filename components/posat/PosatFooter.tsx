'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Flame } from 'lucide-react';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { FaTiktok } from 'react-icons/fa';

export default function PosatFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#0A0A0A] py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-start">
        
        {/* Left/Right Branding */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-0 shrink-0" style={{ direction: 'ltr' }}>
            <Image src="/devesters_icon.png" alt="Devesters Logo" width={24} height={24} className="rounded-sm" />
            <span className="text-lg font-heading font-bold tracking-tight text-white -ml-0.5">EVesters</span>
          </Link>
          <span className="text-gray-500">•</span>
          <span className="text-xs text-gray-400">
            © 2026 Devesters. All rights reserved.
          </span>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-5 text-gray-400">
          <a
            href="https://tiktok.com/@devesters"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="TikTok"
          >
            <FaTiktok className="w-4 h-4" />
          </a>
          <a
            href="https://x.com/devesters"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="X (Twitter)"
          >
            <FiTwitter className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/devesters"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <FiGithub className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/company/113089086/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <FiLinkedin className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
