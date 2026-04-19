import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050509] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-0 mb-6">
            <Image src="https://i.ibb.co/3Y0bCFgM/devesters-icon.png" alt="Devesters Logo" width={24} height={24} className="rounded-sm" referrerPolicy="no-referrer" />
            <span className="text-xl font-heading font-bold tracking-tight text-white -ml-0.5">EVesters</span>
          </Link>
          <p className="text-xs text-[#d4d4d8]/60 max-w-xs uppercase tracking-wider leading-relaxed">
            © 2026 DEVESTERS STUDIO. ENGINEERED FOR PERFORMANCE.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-6">Sitemap</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">Work</Link></li>
            <li><Link href="/services" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">Services</Link></li>
            <li><Link href="/process" className="text-sm text-[#d4d4d8] hover:text-white transition-colors uppercase tracking-wider text-[10px] font-bold">Process</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-6">Social</h4>
          <div className="flex gap-4 mb-10">
            <a href="https://github.com/devesters" target="_blank" rel="noopener noreferrer" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="GitHub">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/113089086/" target="_blank" rel="noopener noreferrer" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="LinkedIn">
              <FiLinkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="Twitter">
              <FiTwitter className="w-5 h-5" />
            </a>
            <a href="mailto:hello@devesters.com" className="text-[#d4d4d8] hover:text-white transition-colors" aria-label="Email Us">
              <FiMail className="w-5 h-5" />
            </a>
          </div>
          <div className="text-[10px] font-bold tracking-wider text-[#d4d4d8]/60 uppercase leading-relaxed">
            Located in Cairo, Egypt<br />
            Operating Globally
          </div>
        </div>
      </div>
    </footer>
  );
}
