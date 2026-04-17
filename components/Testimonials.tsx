'use client';

import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    "id": 1,
    "client_name": "Abdullah Elshorbagy",
    "client_role": "Operations Manager, Masarat Initiative",
    "project_reference": "Soubul LMS",
    "review": "بصراحة الشغل مع تيم Devesters كان نقطة تحول كبيرة لمبادرة مسارات. منصة سُبُل مكانتش مجرد بروجيكت تقني عادي، دي كانت حل ذكي بيستوعب كل تعقيدات قطاع التعليم. احترافية الشباب في بناء السيستم وتأمين الداتا بتعكس مستوى هندسي عالمي مفيش زيه.",
    "rating": 5,
    "avatar_fallback": "AE"
  },
  {
    "id": 2,
    "client_name": "Dr. Tariq Al-Mansour",
    "client_role": "Executive Director",
    "project_reference": "Enterprise Platforms",
    "review": "ما كنا ندور على مجرد شركة تسوي لنا موقع، كنا نبي شريك هندسي يبني لنا نظام متكامل. شباب Devesters قدموا لنا بنية تحتية قوية تتحمل آلاف للمستخدمين بنفس الوقت بدون ما يطيح الأداء. اهتمامهم بهندسة الباك إند وتأمين بوابات الدفع صراحة كان شيء استثنائي.",
    "rating": 5,
    "avatar_fallback": "TA"
  },
  {
    "id": 3,
    "client_name": "Eng. Abdulrahman Al-Suwaidi",
    "client_role": "Founder, AgTech Startup",
    "project_reference": "Naptah Ecosystem",
    "review": "Working with Devesters is entirely different from any other software agency. They have a profound understanding of how to integrate AI architectures into real-world products. Thanks to their advanced engineering, our startup scaled effortlessly and won multiple accelerator awards.",
    "rating": 5,
    "avatar_fallback": "AS"
  },
  {
    "id": 4,
    "client_name": "Sarah Al-Ghamdi",
    "client_role": "Digital Product Manager",
    "project_reference": "Cross-Platform Mobile Apps",
    "review": "جودة الكود وتجربة المستخدم (UI/UX) التي تخرج من هذا الاستوديو تنافس كبرى الشركات العالمية. تطبيقنا، والذي تم بناؤه باستخدام Flutter، يعمل بسلاسة مذهلة وبأداء يضاهي التطبيقات الأصيلة (Native). فريق محترف وملتزم بالمواعيد بدقة متناهية.",
    "rating": 5,
    "avatar_fallback": "SG"
  },
  {
    "id": 5,
    "client_name": "Khalid Al-Hashimi",
    "client_role": "CTO, Regional Agency",
    "project_reference": "HireWire AI Tooling",
    "review": "كثير أوقات بنوكل المهام البرمجية المعقدة اللي بدها أداء عالي لفريق Devesters. قدرتهم على بناء أدوات الـ AI وأتمتة العمليات وفرت علينا مئات الساعات. هدول مش مجرد مبرمجين، هدول مهندسين حلول بيمتلكوا رؤية استراتيجية ودايماً بيعطونا الأفضل.",
    "rating": 5,
    "avatar_fallback": "KH"
  }
];

export default function Testimonials() {
  // Duplicating the array to allow for a seamless infinite loop
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="py-24 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h3 className="text-xs font-bold tracking-widest text-studio-red uppercase mb-4">Client Feedback</h3>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">Trusted by Partners</h2>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Soft gradient masks on edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050509] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050509] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
          className="flex w-max gap-6 px-3 lg:px-6"
        >
          {items.map((item, index) => (
            <div 
              key={`${item.id}-${index}`} 
              className="w-[320px] md:w-[420px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col shrink-0"
              dir="auto"
            >
              {/* Rating Section */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-red-500 fill-red-500" />
                ))}
              </div>
              
              {/* Review Quote */}
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-10 flex-grow font-medium">
                &quot;{item.review}&quot;
              </p>
              
              {/* Client Info */}
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold shrink-0 shadow-lg">
                  {item.avatar_fallback}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center gap-2">
                    {item.client_name}
                  </h4>
                  <p className="text-xs text-[#a1a1aa] mt-1">{item.client_role}</p>
                  <p className="text-[10px] text-red-500 font-bold tracking-wider uppercase mt-2 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full inline-block">
                    {item.project_reference}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
