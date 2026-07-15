'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiGithub, FiLinkedin, FiFacebook, FiInstagram, FiMail } from 'react-icons/fi';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function Footer() {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-white/5 bg-[#050509] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2 flex flex-col items-start justify-start">
          <Link href="/" className="flex flex-row items-center gap-0 mb-6" style={{ direction: 'ltr', display: 'flex', flexDirection: 'row' }}>
            <Image src="/devesters_icon.png" alt="Devesters Logo" width={24} height={24} className="rounded-sm" />
            <span className="text-xl font-heading font-bold tracking-tight text-white -ml-0.5">EVesters</span>
          </Link>
          <p className="text-xs text-[#d4d4d8]/60 max-w-xs uppercase tracking-wider leading-relaxed text-start">
            {dict.footer.tagline}
          </p>
        </div>

        <div className="flex flex-col items-start justify-start">
          <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-6 text-start">{dict.footer.sitemap}</h4>
          <ul className="space-y-4 text-start">
            <li><Link href="/" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">{dict.navbar.work}</Link></li>
            <li><Link href="/services" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">{dict.navbar.services}</Link></li>
            <li><Link href="/process" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">{dict.navbar.process}</Link></li>
            <li><Link href="/admin/login" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">Admin</Link></li>
          </ul>
        </div>

        <div className="flex flex-col items-start justify-start">
          <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-6 text-start">{dict.footer.social}</h4>
          <div className="flex gap-4 mb-10 justify-start">
            <a href="https://github.com/devesters" target="_blank" rel="noopener noreferrer" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="GitHub">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/113089086/" target="_blank" rel="noopener noreferrer" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="LinkedIn">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61568971049547" target="_blank" rel="noopener noreferrer" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="Facebook">
              <FiFacebook className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/devesters.eg/" target="_blank" rel="noopener noreferrer" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="Instagram">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="mailto:hello@devesters.com" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="Email">
              <FiMail className="w-5 h-5" />
            </a>
          </div>
          <div className="text-[10px] font-bold tracking-wider text-[#d4d4d8]/60 uppercase leading-relaxed mb-4 whitespace-pre-line text-start">
            {dict.footer.address}
          </div>
          <div className="text-[10px] font-bold tracking-wider text-[#d4d4d8] uppercase leading-relaxed text-start">
            <a href="tel:+201036178703" className="hover:text-white transition-colors" dir="ltr" style={{ display: 'inline-block', direction: 'ltr' }}>
              +20 103 617 8703
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
