'use client';

import { FiGlobe, FiSmartphone, FiCpu } from 'react-icons/fi';
import { motion } from 'motion/react';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function Capabilities() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  const capabilities = [
    {
      title: dict.capabilities.webTitle,
      description: dict.capabilities.webDesc,
      icon: FiGlobe,
    },
    {
      title: dict.capabilities.mobileTitle,
      description: dict.capabilities.mobileDesc,
      icon: FiSmartphone,
    },
    {
      title: dict.capabilities.aiTitle,
      description: dict.capabilities.aiDesc,
      icon: FiCpu,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h3 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-4">{dict.capabilities.badge}</h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">{dict.capabilities.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {capabilities.map((cap, index) => (
          <motion.div
            key={cap.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col"
          >
            <div className="w-12 h-12 rounded-full bg-studio-red/10 flex items-center justify-center mb-6">
              <cap.icon className="w-6 h-6 text-studio-red" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">{cap.title}</h3>
            <p className="text-[#d4d4d8] text-sm leading-relaxed">{cap.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
