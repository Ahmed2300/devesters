'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Code2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SiTypescript, SiReact, SiNextdotjs, SiPython, SiFlutter, SiDart, SiOpenai } from 'react-icons/si';
import { VscFolder, VscFolderOpened, VscFileCode } from 'react-icons/vsc';
import { Highlight, themes } from 'prism-react-renderer';
import { useLanguage } from '@/components/LanguageProvider';
import { getDictionary } from '@/lib/i18n/dictionaries';

// Types
type UIVariant = {
  themeColor: string;
  element: React.ReactNode;
};

type ProjectFile = {
  name: string;
  isFolder: boolean;
  open: boolean;
  icon?: React.ReactNode;
  children?: ProjectFile[];
};

type Scenario = {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  projectFiles: ProjectFile[];
  activeFileName: string;
  activeFileIcon: React.ReactNode;
  code: string;
  language: string;
  uiVariants: UIVariant[];
};

const SCENARIOS: Scenario[] = [
  {
    id: 'web',
    title: 'Web Platform (Next.js)',
    icon: <SiReact className="w-5 h-5 text-sky-400" />,
    color: 'text-sky-400',
    bgColor: 'bg-sky-400',
    borderColor: 'border-sky-400/30',
    language: 'tsx',
    activeFileName: 'dashboard.tsx',
    activeFileIcon: <SiNextdotjs className="text-white w-4 h-4" />,
    projectFiles: [
      {
        name: 'app', isFolder: true, open: true, children: [
          { name: 'dashboard.tsx', isFolder: false, open: false, icon: <SiNextdotjs className="w-3.5 h-3.5 text-white" /> },
          { name: 'layout.tsx', isFolder: false, open: false, icon: <SiNextdotjs className="w-3.5 h-3.5 text-white" /> },
          { name: 'api', isFolder: true, open: false, children: [] },
        ]
      },
      { name: 'components', isFolder: true, open: false, children: [] },
      { name: 'lib', isFolder: true, open: false, children: [] },
      { name: 'package.json', isFolder: false, open: false, icon: <VscFileCode className="w-3.5 h-3.5 text-yellow-400" /> },
      { name: 'tsconfig.json', isFolder: false, open: false, icon: <SiTypescript className="w-3.5 h-3.5 text-blue-400" /> },
    ],
    code: `import { Suspense } from 'react';
import { Metrics, AIConfig } from '@/components';
import { connectDevestersCore } from '@devesters/sdk';

export default async function DashboardPage() {
  const core = await connectDevestersCore({
    mode: 'fluid',
    maxPerformance: true
  });
  
  const initialData = await core.fetchInitialState();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <Suspense fallback={<LoadingPulse />}>
         <Metrics config={initialData.kpis} />
         <AIConfig settings={initialData.aiSettings} />
      </Suspense>
    </main>
  );
}`,
    uiVariants: [
      {
        themeColor: 'cyan',
        element: (
          <div className="flex flex-col h-full w-full bg-[#050505] rounded-xl overflow-hidden backdrop-blur-sm p-4 relative">
             <div className="absolute top-0 inset-x-0 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />
             <div className="flex justify-between items-center mb-6">
               <div className="h-4 w-24 bg-white/10 rounded" />
               <div className="h-6 w-6 rounded-full bg-cyan-500/20 border border-cyan-500/40" />
             </div>
             <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3 h-20 flex flex-col justify-end relative overflow-hidden">
                   <div className="absolute top-2 left-2 text-[10px] text-white/40">Users</div>
                   <div className="text-xl font-bold text-cyan-400">12.4k</div>
                </div>
                <div className="bg-white/[0.03] border border-white/5 rounded-lg p-3 h-20 flex flex-col justify-end relative overflow-hidden">
                   <div className="absolute top-2 left-2 text-[10px] text-white/40">Revenue</div>
                   <div className="text-xl font-bold text-white">$84k</div>
                </div>
             </div>
             <div className="flex-1 bg-white/[0.03] border border-white/5 rounded-lg p-3 flex items-end justify-between gap-1">
                {[30, 45, 60, 40, 80, 50, 95, 65, 85].map((h, i) => (
                  <motion.div key={i} className="w-full bg-cyan-500/40 rounded-t-sm" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.1 * i, type: "spring" }} />
                ))}
             </div>
          </div>
        )
      },
      {
        themeColor: 'purple',
        element: (
          <div className="flex flex-col h-full w-full bg-[#0a0510] rounded-xl overflow-hidden backdrop-blur-sm p-4 relative">
             <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-purple-500/20 blur-[50px] rounded-full" />
             <div className="flex justify-between items-center mb-6">
               <div className="flex gap-2">
                 <div className="h-4 w-4 rounded bg-purple-500/40" />
                 <div className="h-4 w-20 bg-white/10 rounded" />
               </div>
               <div className="h-4 w-12 bg-white/10 rounded-full" />
             </div>
             <div className="flex-1 rounded-xl border border-purple-500/20 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent p-4 flex flex-col gap-3">
                   <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="h-10 bg-white/5 rounded-md border border-white/5 w-full" />
                   <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="h-10 bg-white/5 rounded-md border border-white/5 w-4/5" />
                   <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="h-10 bg-purple-500/20 rounded-md border border-purple-500/30 w-11/12" />
                </div>
             </div>
          </div>
        )
      }
    ]
  },
  {
    id: 'mobile',
    title: 'Mobile App (Flutter)',
    icon: <SiFlutter className="w-5 h-5 text-blue-400" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400',
    borderColor: 'border-blue-400/30',
    language: 'dart',
    activeFileName: 'main.dart',
    activeFileIcon: <SiDart className="w-3.5 h-3.5 text-blue-300" />,
    projectFiles: [
      {
        name: 'lib', isFolder: true, open: true, children: [
          { name: 'main.dart', isFolder: false, open: false, icon: <SiDart className="w-3.5 h-3.5 text-blue-300" /> },
          { name: 'screens', isFolder: true, open: false, children: [] },
          { name: 'widgets', isFolder: true, open: false, children: [] },
        ]
      },
      { name: 'android', isFolder: true, open: false, children: [] },
      { name: 'ios', isFolder: true, open: false, children: [] },
      { name: 'pubspec.yaml', isFolder: false, open: false, icon: <VscFileCode className="w-3.5 h-3.5 text-gray-400" /> },
    ],
    code: `import 'package:flutter/material.dart';
import 'package:devesters_ui/devesters_ui.dart';

void main() {
  runApp(const DevestersApp());
}

class DevestersApp extends StatelessWidget {
  const DevestersApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: DevestersTheme.fluidTheme(),
      home: Scaffold(
        body: TweenAnimationBuilder(
           tween: Tween<double>(begin: 0, end: 1),
           duration: const Duration(seconds: 1),
           builder: (context, val, child) {
              return Transform.scale(
                scale: val,
                child: const AppUI(),
              );
           }
        )
      ),
    );
  }
}`,
    uiVariants: [
      {
        themeColor: 'orange',
        element: (
          <div className="flex items-center justify-center h-full w-full relative">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-[180px] h-[320px] rounded-[24px] border-[6px] border-[#1a1a1a] bg-black shadow-[0_0_20px_rgba(249,115,22,0.15)] relative overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-10"><div className="w-12 h-3.5 bg-[#1a1a1a] rounded-b-lg" /></div>
                <div className="flex-1 bg-gradient-to-b from-orange-500/20 to-black p-3 pt-8 flex flex-col gap-3 relative">
                   <div className="absolute top-10 right-0 w-24 h-24 bg-orange-500/30 blur-[20px] rounded-full" />
                   <div className="h-10 w-10 rounded-full bg-orange-500/40 border border-orange-500/50 backdrop-blur-md mb-2" />
                   <div className="h-5 w-24 bg-white/20 rounded" />
                   <div className="h-3 w-16 bg-white/10 rounded mb-2" />
                   <div className="flex gap-2">
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="h-16 flex-1 rounded-xl bg-white/10 border border-white/5" />
                      <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.1 }} className="h-16 flex-1 rounded-xl bg-orange-500/20 border border-orange-500/30" />
                   </div>
                </div>
             </motion.div>
          </div>
        )
      },
      {
        themeColor: 'emerald',
        element: (
          <div className="flex items-center justify-center h-full w-full relative">
             <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-[180px] h-[320px] rounded-[24px] border-[6px] border-[#1a1a1a] bg-black shadow-[0_0_20px_rgba(16,185,129,0.15)] relative overflow-hidden flex flex-col">
                <div className="absolute top-0 inset-x-0 h-5 flex justify-center z-10"><div className="w-12 h-3.5 bg-[#1a1a1a] rounded-b-lg" /></div>
                <div className="flex-1 bg-black p-3 pt-8 flex flex-col items-center gap-3 relative">
                   <div className="absolute top-1/4 w-32 h-32 bg-emerald-500/20 blur-[30px] rounded-full" />
                   {/* Activity Ring Mock */}
                   <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 border-r-emerald-500 rotate-45 my-4" />
                   
                   <div className="w-full space-y-2 mt-auto">
                     <div className="h-10 bg-white/5 rounded-xl border border-white/5 w-full flex items-center px-3">
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50 mr-2" />
                        <div className="h-2 w-12 bg-white/20 rounded" />
                     </div>
                     <div className="h-10 bg-white/5 rounded-xl border border-white/5 w-full flex items-center px-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500/50 mr-2" />
                        <div className="h-2 w-16 bg-white/20 rounded" />
                     </div>
                   </div>
                </div>
             </motion.div>
          </div>
        )
      }
    ]
  },
  {
    id: 'ai',
    title: 'AI Native (Python)',
    icon: <SiPython className="w-5 h-5 text-yellow-400" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400',
    borderColor: 'border-yellow-400/30',
    language: 'python',
    activeFileName: 'agent.py',
    activeFileIcon: <SiPython className="w-3.5 h-3.5 text-yellow-400" />,
    projectFiles: [
      {
        name: 'agents', isFolder: true, open: true, children: [
          { name: 'agent.py', isFolder: false, open: false, icon: <SiPython className="w-3.5 h-3.5 text-yellow-400" /> },
          { name: 'prompts.py', isFolder: false, open: false, icon: <SiPython className="w-3.5 h-3.5 text-yellow-400" /> },
        ]
      },
      { name: 'tools', isFolder: true, open: false, children: [] },
      { name: 'main.py', isFolder: false, open: false, icon: <SiPython className="w-3.5 h-3.5 text-yellow-400" /> },
      { name: 'requirements.txt', isFolder: false, open: false, icon: <VscFileCode className="w-3.5 h-3.5 text-gray-400" /> },
    ],
    code: `import asyncio
from devesters.ai import VectorStore, AgentOrchestrator
from langchain.llms import AdvancedLLM

async def process_infinity_stream(query: str):
    llm = AdvancedLLM(
        model="devesters-70b-instruct",
        temperature=0.8,
        quantization="4-bit"
    )
    
    orchestrator = AgentOrchestrator(llm=llm, memory=True)
    
    @orchestrator.on_thought
    def log_thought(node):
        print(f"Weight Activation: {node.weights}")

    result = await orchestrator.synthesize(
        query, 
        creative_factor="infinity"
    )
    return result`,
    uiVariants: [
      {
        themeColor: 'red',
        element: (
          <div className="flex flex-col h-full w-full bg-[#0a0202] rounded-xl overflow-hidden backdrop-blur-sm p-4 relative">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-red-500/10 blur-[40px] rounded-full" />
             <div className="flex items-center gap-2 mb-4 bg-red-500/10 border border-red-500/20 p-2 rounded-lg text-xs font-mono text-red-400 w-fit">
                <SiOpenai className="w-3 h-3 animate-spin duration-3000" />
                <span>agent_active</span>
             </div>
             
             <div className="flex-1 right-0 flex items-center justify-center relative">
                {/* Node Graph Mock */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute w-24 h-24 border border-red-500/20 rounded-full" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="absolute w-16 h-16 border border-red-500/30 rounded-full" />
                <div className="w-8 h-8 bg-red-500/50 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] z-10 backdrop-blur-sm" />
                
                {/* Connections */}
                <div className="absolute top-1/2 left-4 w-12 h-px bg-red-500/30 -rotate-45 origin-right" />
                <div className="absolute top-1/2 right-4 w-12 h-px bg-red-500/30 rotate-45 origin-left" />
             </div>
             
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4 text-[10px] font-mono text-red-400/60 break-all text-center">
                0x8e...f1 synthesizing infinity logic...
             </motion.div>
          </div>
        )
      },
      {
        themeColor: 'green',
        element: (
          <div className="flex flex-col h-full w-full bg-[#020a05] rounded-xl overflow-hidden backdrop-blur-sm p-4 relative font-mono text-xs shadow-inner shadow-green-500/5">
             <div className="text-green-500 mb-2 font-bold">devesters@ai:~$ ./run_agent</div>
             <div className="space-y-1.5 flex-1 overflow-hidden relative">
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="text-green-400/80">[INFO] Loading 70B model...</motion.div>
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="text-green-400/80">[INFO] Context window initialized.</motion.div>
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="text-yellow-400/80">[WARN] High temperature detected.</motion.div>
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }} className="text-green-400/80">[DATA] Analyzing constraints...</motion.div>
               <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }} className="text-green-400 mt-2 flex items-center gap-2 font-bold">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Generating solution...
               </motion.div>
             </div>
          </div>
        )
      }
    ]
  }
];

// Typing effect component with syntax highlighting
const TypewriterCode = ({ code, language }: { code: string, language: string }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    
    // Smooth fast typing effect
    const interval = setInterval(() => {
      setDisplayedText(code.substring(0, i));
      i += 2; // Speed up the typing
      if (i > code.length) {
        clearInterval(interval);
        setDisplayedText(code); // Ensure full text is set
      }
    }, 15);
    
    return () => clearInterval(interval);
  }, [code]);

  return (
    <div className="font-mono text-[13px] leading-relaxed relative" style={{ direction: 'ltr', textAlign: 'left' }}>
       <Highlight theme={themes.vsDark} code={displayedText} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={{ ...style, backgroundColor: 'transparent', margin: 0 }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      {displayedText.length < code.length && (
         <span className="absolute inline-block w-2.5 h-4 bg-white/80 animate-pulse -mt-[18px] ml-[2px]" style={{ left: 'auto', top: 'auto'}} />
      )}
    </div>
  );
};

// Recursive file tree component
const FileTree = ({ files, depth = 0 }: { files: ProjectFile[], depth?: number }) => {
  return (
    <div className="flex flex-col w-full">
      {files.map((file, idx) => (
        <div key={idx} className="flex flex-col w-full">
          <div 
            className={cn(
              "flex items-center gap-1.5 py-1 px-2 text-[11px] font-mono rounded cursor-default hover:bg-white/5 transition-colors",
            )}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {file.isFolder ? (
              file.open ? <VscFolderOpened className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" /> : <VscFolder className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
            ) : (
              <span className="flex-shrink-0">{file.icon || <VscFileCode className="w-3.5 h-3.5 text-gray-400" />}</span>
            )}
            <span className={cn("truncate", !file.isFolder && depth > 0 ? "text-gray-300" : "text-gray-400", file.open && file.isFolder ? 'font-medium text-gray-300' : '')}>
              {file.name}
            </span>
          </div>
          {file.isFolder && file.open && file.children && (
            <FileTree files={file.children} depth={depth + 1} />
          )}
        </div>
      ))}
    </div>
  );
};

export default function InfinityCodeSection() {
  const { locale } = useLanguage();
  const dict = getDictionary(locale);

  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [variantIndices, setVariantIndices] = useState<number[]>(SCENARIOS.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setScenarioIndex((prev) => {
        const nextIndex = (prev + 1) % SCENARIOS.length;
        
        // Randomly pick a new variant for the next scenario to ensure it's different each loop
        setVariantIndices((variants) => {
           const newVariants = [...variants];
           const variantsCount = SCENARIOS[nextIndex].uiVariants.length;
           // Pick next variant, loop back if at end
           newVariants[nextIndex] = (newVariants[nextIndex] + 1) % variantsCount;
           return newVariants;
        });
        
        return nextIndex;
      });
    }, 10000); // Changed to 10s to give more time to read and watch animation
    return () => clearInterval(interval);
  }, []);

  const activeScenario = SCENARIOS[scenarioIndex];
  const activeVariant = activeScenario.uiVariants[variantIndices[scenarioIndex]];

  // Localized Scenario Titles
  const scenarioTitles: Record<string, string> = {
    web: locale === 'ar' ? 'منصة ويب (Next.js)' : 'Web Platform (Next.js)',
    mobile: locale === 'ar' ? 'تطبيق جوال (Flutter)' : 'Mobile App (Flutter)',
    ai: locale === 'ar' ? 'ذكاء اصطناعي (Python)' : 'AI Native (Python)',
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-background border-y border-white/5">
      {/* Background glow effects based on active scenario */}
      <div className={cn("absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000", activeScenario.bgColor, "opacity-10")} />
      <div className={cn("absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000", activeScenario.bgColor, "opacity-10")} />

      <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <Code2 className="w-5 h-5 text-studio-red" />
            <span className="text-sm font-mono text-studio-red uppercase tracking-wider">
              {locale === 'ar' ? 'من الفكرة إلى الواقع' : 'Concept to Reality'}
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-medium tracking-tight mb-4"
          >
            {locale === 'ar' ? 'كود ' : 'The Infinity '}<span className="text-transparent bg-clip-text bg-gradient-to-r from-studio-red to-orange-500 italic">{locale === 'ar' ? 'اللانهاية' : 'Code'}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed"
          >
            {locale === 'ar' 
              ? 'شاهد كيف يترجم المنطق فورياً إلى أهداف رقمية متنوعة. واجهات تفاعلية. تحويل سلس. تجارب مستخدم قوية.' 
              : 'Watch as logic translates instantly into various digital targets. Dynamic interfaces. Seamless conversion. Powerful experiences.'}
          </motion.p>
        </div>

        {/* IDE Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_400px] gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: The IDE (Sidebar + Editor) - Forced LTR */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[480px] w-full bg-[#1e1e1e] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col group"
            style={{ direction: 'ltr' }}
          >
             {/* IDE Header (Title Bar) */}
             <div className="h-10 bg-[#252526] border-b border-[#303030] flex items-center px-4 gap-4 select-none">
                <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors" />
                   <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors" />
                   <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors" />
                </div>
                <div className="flex-1 flex justify-center">
                   <div className="text-xs font-mono text-gray-400">
                      devesters-workspace - {activeScenario.activeFileName}
                   </div>
                </div>
             </div>
             
             {/* IDE Body Container */}
             <div className="flex-1 flex overflow-hidden">
                {/* File Explorer Sidebar */}
                <div className="w-52 bg-[#252526] border-r border-[#303030] flex flex-col select-none overflow-y-auto">
                   <div className="px-4 py-3 text-[10px] uppercase tracking-widest text-[#cccccc] font-semibold font-mono">
                     {locale === 'ar' ? 'المستكشف' : 'Explorer'}
                   </div>
                   <div className="pb-2">
                     <AnimatePresence mode="wait">
                       <motion.div
                          key={activeScenario.id + "-tree"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                       >
                          <FileTree files={activeScenario.projectFiles} />
                       </motion.div>
                     </AnimatePresence>
                   </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 flex flex-col bg-[#1e1e1e] relative min-w-0">
                  {/* Editor Tabs */}
                  <div className="h-9 flex bg-[#252526] overflow-x-auto border-b border-[#1e1e1e]">
                     <div className="flex items-center gap-2 px-4 bg-[#1e1e1e] border-t-[3px] border-t-blue-500 text-xs font-mono text-white min-w-fit">
                       {activeScenario.activeFileIcon}
                       {activeScenario.activeFileName}
                     </div>
                  </div>
                  
                  {/* Code Content */}
                  <div className="flex-1 overflow-auto relative font-mono text-sm flex">
                    {/* Line numbers fake col */}
                    <div className="w-12 shrink-0 bg-[#1e1e1e] flex flex-col py-4 text-[#858585] select-none text-xs border-r border-[#2a2a2a] pl-2 items-end pr-3">
                      {Array.from({ length: 24 }).map((_, i) => (
                          <div key={i} className="leading-[1.6] opacity-60 font-mono">{i + 1}</div>
                      ))}
                    </div>
                    
                    <div className="flex-1 py-4 px-4 min-h-full">
                      <AnimatePresence mode="wait">
                        <motion.div
                            key={activeScenario.id + activeScenario.code}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                          <TypewriterCode code={activeScenario.code} language={activeScenario.language} />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
             </div>
          </motion.div>

          {/* Center Connector (Arrow) - RTL Mirrored flow */}
          <div className="flex flex-col items-center justify-center py-4 lg:py-0">
             <div className="hidden lg:block w-px h-16 bg-gradient-to-b from-transparent to-white/20 mb-4" />
             <div className="relative group flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden">
                <motion.div 
                   animate={{ x: locale === 'ar' ? [30, -30] : [-30, 30], opacity: [0, 1, 0] }}
                   transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                   className={cn("absolute", activeScenario.color)}
                >
                   <ArrowRight className={cn("w-6 h-6 rotate-90", locale === 'ar' ? "lg:rotate-180" : "lg:rotate-0")} />
                </motion.div>
                <ArrowRight className={cn("w-6 h-6 text-gray-600 rotate-90 -z-10 absolute", locale === 'ar' ? "lg:rotate-180" : "lg:rotate-0")} />
             </div>
             <div className="hidden lg:block w-px h-16 bg-gradient-to-t from-transparent to-white/20 mt-4" />
          </div>

          {/* Right Column: The Outcome */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col h-[480px]"
          >
             {/* Target Context header */}
             <div className="flex items-center gap-3 mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScenario.id + '-icon'}
                    initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                    className={cn("p-2 rounded-lg border", activeScenario.bgColor + '/20', activeScenario.borderColor)}
                  >
                    {activeScenario.icon}
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">
                    {locale === 'ar' ? 'معاينة المخرجات' : 'Output Render'}
                  </span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeScenario.id + '-title'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn("font-medium text-sm", activeScenario.color)}
                    >
                      {scenarioTitles[activeScenario.id] || activeScenario.title}
                    </motion.div>
                  </AnimatePresence>
                </div>
             </div>
             
             {/* The Dynamic Canvas - Forced LTR for graphic content */}
             <div className="flex-1 relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-4" style={{ direction: 'ltr' }}>
                {/* Background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none" />
                
                <AnimatePresence mode="wait">
                   <motion.div
                      key={activeScenario.id + activeVariant.themeColor}
                      initial={{ filter: 'blur(10px)', opacity: 0, scale: 0.95 }}
                      animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
                      exit={{ filter: 'blur(10px)', opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full h-full relative z-10"
                   >
                      {activeVariant.element}
                   </motion.div>
                </AnimatePresence>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
