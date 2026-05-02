import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const TESTIMONIALS = [
  {
    client_name: "Abdullah Elshorbagy",
    client_role: "Operations Manager, Masarat Initiative",
    project_reference: "Soubul LMS",
    review: "بصراحة الشغل مع تيم Devesters كان نقطة تحول كبيرة لمبادرة مسارات. منصة سُبُل مكانتش مجرد بروجيكت تقني عادي، دي كانت حل ذكي بيستوعب كل تعقيدات قطاع التعليم. احترافية الشباب في بناء السيستم وتأمين الداتا بتعكس مستوى هندسي عالمي مفيش زيه.",
    rating: 5,
    avatar_fallback: "AE"
  },
  {
    client_name: "Dr. Tariq Al-Mansour",
    client_role: "Executive Director",
    project_reference: "Enterprise Platforms",
    review: "ما كنا ندور على مجرد شركة تسوي لنا موقع، كنا نبي شريك هندسي يبني لنا نظام متكامل. شباب Devesters قدموا لنا بنية تحتية قوية تتحمل آلاف للمستخدمين بنفس الوقت بدون ما يطيح الأداء. اهتمامهم بهندسة الباك إند وتأمين بوابات الدفع صراحة كان شيء استثنائي.",
    rating: 5,
    avatar_fallback: "TA"
  },
  {
    client_name: "Eng. Abdulrahman Al-Suwaidi",
    client_role: "Founder, AgTech Startup",
    project_reference: "Naptah Ecosystem",
    review: "Working with Devesters is entirely different from any other software agency. They have a profound understanding of how to integrate AI architectures into real-world products. Thanks to their advanced engineering, our startup scaled effortlessly and won multiple accelerator awards.",
    rating: 5,
    avatar_fallback: "AS"
  },
  {
    client_name: "Sarah Al-Ghamdi",
    client_role: "Digital Product Manager",
    project_reference: "Cross-Platform Mobile Apps",
    review: "جودة الكود وتجربة المستخدم (UI/UX) التي تخرج من هذا الاستوديو تنافس كبرى الشركات العالمية. تطبيقنا، والذي تم بناؤه باستخدام Flutter، يعمل بسلاسة مذهلة وبأداء يضاهي التطبيقات الأصيلة (Native). فريق محترف وملتزم بالمواعيد بدقة متناهية.",
    rating: 5,
    avatar_fallback: "SG"
  },
  {
    client_name: "Khalid Al-Hashimi",
    client_role: "CTO, Regional Agency",
    project_reference: "HireWire AI Tooling",
    review: "كثير أوقات بنوكل المهام البرمجية المعقدة اللي بدها أداء عالي لفريق Devesters. قدرتهم على بناء أدوات الـ AI وأتمتة العمليات وفرت علينا مئات الساعات. هدول مش مجرد مبرمجين، هدول مهندسين حلول بيمتلكوا رؤية استراتيجية ودايماً بيعطونا الأفضل.",
    rating: 5,
    avatar_fallback: "KH"
  }
];

const PROJECTS = [
  {
    title: 'Soubul',
    description: 'A comprehensive LMS platform with complex architecture and integrated payments. Designed for enterprise-level scaling.',
    category: 'SaaS / LMS',
    tech: ['React.ts', 'Flutter', 'Dart', 'PHP', 'Laravel'],
    icon: 'Rocket',
    customIcon: 'https://i.ibb.co/0p49X1DR/subol-red.png',
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/mrVK72YC/Screenshot-20260416-230419.png',
      portrait: 'https://i.ibb.co/mVTk9mFC/Gemini-Generated-Image-ict7k1ict7k1ict7.png',
      square: 'https://i.ibb.co/Ldfp9LpY/Gemini-Generated-Image-xozhl7xozhl7xozh.png'
    },
    link: '/projects/soubul',
    previewUrl: 'https://www.soubul.net/'
  },
  {
    title: 'Naptah',
    description: 'Comprehensive agricultural ecosystem and e-commerce platform empowering local farmers and buyers.',
    category: 'E-commerce',
    tech: ['Next.js', 'PostgreSQL', 'Stripe'],
    icon: 'Bot',
    customIcon: 'https://i.ibb.co/7xMRqxcR/Nabtah-logo.png',
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/7tNm1JQM/Gemini-Generated-Image-eqan4veqan4veqan.png',
      portrait: 'https://i.ibb.co/xtGX7VFm/Gemini-Generated-Image-bprpw7bprpw7bprp.png',
      square: 'https://i.ibb.co/LDKxt53p/Gemini-Generated-Image-e2upore2upore2up.png'
    },
    link: '/projects/naptah',
    previewUrl: 'https://naptah.netlify.app/'
  },
  {
    title: 'BlackWater',
    description: 'A custom auto-healing container orchestrator. Integrates C-based eBPF kernel monitoring with Go to autonomously manage Docker resources and prevent server crashes.',
    category: 'System',
    tech: ['Go', 'C', 'eBPF', 'Docker'],
    icon: 'Code2',
    customIcon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='55' font-family='system-ui, sans-serif' font-weight='900' font-size='80' fill='white' text-anchor='middle' dominant-baseline='middle'%3EB%3C/text%3E%3C/svg%3E",
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/bMLtcwzH/Gemini-Generated-Image-zgxgxizgxgxizgxg.png',
      portrait: 'https://i.ibb.co/G3s4xmBx/Gemini-Generated-Image-ksm9erksm9erksm9.png',
      square: 'https://i.ibb.co/23DJRjbm/Gemini-Generated-Image-3kadtr3kadtr3kad.png'
    },
    link: '/projects/blackwater'
  },
  {
    title: 'Royal Village',
    description: 'Full-featured football club platform offering pitch booking, event hall reservations, and academy registrations powered by Angular Signals.',
    category: 'Sports Platform',
    tech: ['Angular', 'JavaScript', 'Tailwind CSS'],
    icon: 'Activity',
    customIcon: 'https://royal-prime-league.netlify.app/assets/images/logo2.png',
    featured: true,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/Xf041W6v/Gemini-Generated-Image-xd050dxd050dxd05.png',
      portrait: 'https://i.ibb.co/fY9yY80x/Gemini-Generated-Image-dxfudddxfudddxfu.png',
      square: 'https://i.ibb.co/fY9yY80x/Gemini-Generated-Image-dxfudddxfudddxfu.png'
    },
    link: '/projects/royal-village',
    previewUrl: 'https://royal-prime-league.netlify.app/'
  },
  {
    title: 'HireWire',
    description: 'An intelligent agent that filters and ranks freelance opportunities using AI, automating the lead-gen pipeline for agencies.',
    category: 'AI Tooling',
    tech: ['OpenAI', 'Next.js', 'TypeScript', 'LangChain'],
    icon: 'Bot',
    featured: false,
    coverImage: true,
    covers: {
      landscape: 'https://i.ibb.co/5X3Np302/image.png',
      portrait: 'https://i.ibb.co/5X3Np302/image.png',
      square: 'https://i.ibb.co/5X3Np302/image.png'
    },
    link: '/projects/hirewire'
  },
  {
    title: 'Luxe Direct',
    description: 'Headless luxury marketplace with atomic inventory sync across 40 countries.',
    category: 'E-commerce',
    tech: ['REMIX', 'SHOPIFY'],
    icon: 'ShoppingBag',
    featured: false,
    link: '/projects/luxe-direct'
  },
  {
    title: 'Sentinel AI',
    description: 'Autonomous threat detection for cloud-native infrastructure monitoring.',
    category: 'AI',
    tech: ['GO', 'TENSORFLOW'],
    icon: 'ShieldCheck',
    featured: false,
    link: '/projects/sentinel-ai'
  },
  {
    title: 'Orbit Analytics',
    description: 'Post-cookie attribution modeling for high-scale marketing teams.',
    category: 'SaaS',
    tech: ['ELIXIR'],
    icon: 'Activity',
    featured: false,
    link: '/projects/orbit-analytics'
  },
  {
    title: 'Dev Terminal',
    description: 'Mobile native terminal emulator with full SSH and container support.',
    category: 'Mobile',
    tech: ['SWIFT'],
    icon: 'TerminalSquare',
    featured: false,
    link: '/projects/dev-terminal'
  },
  {
    title: 'Neo Ledger',
    description: 'Frictionless checkout system for digital asset trading platforms.',
    category: 'E-commerce',
    tech: ['REACT'],
    icon: 'Building',
    featured: false,
    link: '/projects/neo-ledger'
  }
];

export async function GET(request: Request) {
  try {
    const supabase = await createClient();

    // 1. Clear existing data
    await supabase.from('projects').delete().neq('id', 0);
    await supabase.from('testimonials').delete().neq('id', 0);

    // 2. Insert new data
    const snakeCaseProjects = PROJECTS.map(p => ({
      title: p.title,
      description: p.description,
      category: p.category,
      tech: p.tech,
      icon: p.icon,
      custom_icon: p.customIcon,
      featured: p.featured,
      cover_image: p.coverImage,
      covers: p.covers,
      link: p.link,
      preview_url: p.previewUrl
    }));

    const { error: projectsError } = await supabase.from('projects').insert(snakeCaseProjects);
    if (projectsError) throw new Error(`Projects Seed Error: ${projectsError.message}`);

    const { error: testimonialsError } = await supabase.from('testimonials').insert(TESTIMONIALS);
    if (testimonialsError) throw new Error(`Testimonials Seed Error: ${testimonialsError.message}`);

    return NextResponse.json({ success: true, message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
