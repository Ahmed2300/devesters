'use client';

import { FiGlobe, FiSmartphone, FiCpu } from 'react-icons/fi';
import { motion } from 'motion/react';

const capabilities = [
  {
    title: 'Web & SaaS',
    description: 'High-performance web applications built with the most modern tech stacks. Focused on speed, SEO, and seamless user experiences.',
    icon: FiGlobe,
  },
  {
    title: 'Mobile',
    description: 'Cross-platform development without compromise. Using Flutter and React Native to deliver native-feel apps from a single codebase.',
    icon: FiSmartphone,
  },
  {
    title: 'AI Integration',
    description: 'Leveraging LLMs and machine learning to build intelligent features that actually solve business problems, from agents to computer vision.',
    icon: FiCpu,
  }
];

export default function Capabilities() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="text-center mb-16">
        <h3 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-4">Capabilities</h3>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">How We Build</h2>
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
