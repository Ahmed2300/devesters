'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { SiNextdotjs, SiReact, SiFlutter, SiNodedotjs, SiPython, SiPhp, SiLaravel, SiDart, SiGo } from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

const techStack = [
  { name: "Next.js", icon: SiNextdotjs },
  { name: "React", icon: SiReact },
  { name: "Flutter", icon: SiFlutter },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Python", icon: SiPython },
  { name: "PHP", icon: SiPhp },
  { name: "Laravel", icon: SiLaravel },
  { name: "Java", icon: FaJava },
  { name: "Dart", icon: SiDart },
  { name: "Golang", icon: SiGo }
];

function TypewriterText() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);
  const phrases = dict.hero.typewriterPhrases;

  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const delayBetween = 2500;

    const i = loopNum % phrases.length;
    // Strip trailing period for a cleaner command-line argument look
    const wordToType = (phrases[i].highlight + ' ' + phrases[i].rest).replace(/\.$/, '');

    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setText(wordToType.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setLoopNum(loopNum + 1);
        }
      }, deletingSpeed);
    } else {
      if (text.length === wordToType.length) {
        timer = setTimeout(() => setIsDeleting(true), delayBetween);
      } else {
        timer = setTimeout(() => {
          setText(wordToType.substring(0, text.length + 1));
        }, typingSpeed);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases]);

  return (
    <div 
      dir="ltr"
      className="font-mono text-base sm:text-lg md:text-xl lg:text-2xl bg-black/45 border border-white/5 rounded-xl px-4 py-2 mt-4 inline-flex items-center gap-2 max-w-full overflow-x-auto whitespace-nowrap shadow-inner backdrop-blur-md select-none"
    >
      <span className="text-studio-red font-bold">$</span>
      <span className="text-white/90">devesters</span>
      <span className="text-studio-red font-semibold">build</span>
      <span className="text-zinc-500">--for</span>
      <span 
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        className="inline-block text-white bg-white/5 px-2 py-0.5 rounded border border-white/5 font-semibold tracking-wide"
      >
        {text}
      </span>
      <span className="animate-pulse text-studio-red font-sans font-black">█</span>
    </div>
  );
}

export default function Hero() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-studio-red/15 via-transparent to-transparent -z-10" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <div
          className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-studio-red uppercase border border-studio-red/20 rounded-full bg-studio-red/5"
        >
          {dict.hero.badge}
        </div>

        <h1
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-white mb-6 leading-tight flex flex-col items-center"
        >
          <span className="whitespace-normal sm:whitespace-nowrap text-center">{dict.hero.title1}</span>
          <TypewriterText />
        </h1>

        <p
          className="text-lg md:text-xl text-[#d4d4d8] mb-10 max-w-2xl mx-auto"
        >
          {dict.hero.description}
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 text-sm font-medium text-center text-white bg-studio-red rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            {dict.hero.contactBtn}
          </Link>
          <Link 
            href="/projects" 
            className="inline-block px-8 py-3.5 text-sm font-medium text-center text-white bg-transparent rounded-full border border-white/10 hover:border-white/30 transition-colors w-full sm:w-auto group relative overflow-hidden"
          >
            <span className="relative z-10">{dict.hero.projectsBtn}</span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 overflow-hidden w-full relative"
        >
          {/* Gradient masks for smooth fade on edges */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#050509] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#050509] to-transparent z-10 pointer-events-none" />
          
          <motion.div
            animate={{ x: locale === 'ar' ? ["-50%", "0%"] : ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 50,
            }}
            className="flex w-max gap-12 sm:gap-24 text-xs font-bold tracking-widest text-[#d4d4d8]/50 uppercase"
          >
            {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, i) => (
              <span key={i} className="flex items-center gap-2">
                <tech.icon className="w-4 h-4" />
                {tech.name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
