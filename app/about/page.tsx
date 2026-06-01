import { cookies } from 'next/headers';
import { getDictionary } from '@/lib/i18n/dictionaries';
import Image from 'next/image';
import { 
  Atom, 
  Link as LinkIcon, 
  Database, 
  Cloud, 
  Layers, 
  CheckSquare, 
  Users, 
  TrendingUp, 
  Cpu, 
  Code,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Globe
} from 'lucide-react';

import { createClient } from '@/lib/supabase/server';
import { getLevelProgress } from '@/lib/utils';
import Link from 'next/link';
import * as FiIcons from 'react-icons/fi';

// Fallback static data in case Supabase connection is down or unpopulated
const STATIC_TEAM_MEMBERS = [
  {
    "id": "a0000000-0000-0000-0000-000000000001",
    "name": "Ahmed Azam",
    "slug": "ahmed-azam",
    "role_en": "Team Lead | Lead Mobile & Web Engineer",
    "role_ar": "قائد الفريق | مهندس جوال وويب أول",
    "bio_en": "Ahmed is the mastermind behind the architectural vision at Devesters. As the Team Lead and a senior Frontend/Mobile engineer, he seamlessly blends technical strategy with flawless execution.",
    "bio_ar": "أحمد هو العقل المدبر وراء الرؤية المعمارية في Devesters. بصفته قائد الفريق ومهندس واجهات جوال وويب أول، فإنه يدمج الاستراتيجية التقنية مع التنفيذ الخالي من العيوب.",
    "skills": ["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind", "AI Tools"],
    "photo_url": "https://i.ibb.co/bMpK8X8Y/Ahmed.png",
    "github_username": "Ahmed2300",
    "linkedin_url": "https://www.linkedin.com/in/ahmed-azam-320a98200",
    "github_url": "https://github.com/Ahmed2300",
    "instagram_url": "https://www.instagram.com/ahmed_a_azam/",
    "email": "ahmed750@std.mans.edu.eg",
    "portfolio_url": "https://ahmedazamportfolio.netlify.app/",
    "xp": 0,
    "level": 1,
    "member_badges": []
  },
  {
    "id": "b0000000-0000-0000-0000-000000000002",
    "name": "Manar Elnahty",
    "slug": "manar-elnahty",
    "role_en": "Frontend & Mobile Engineer",
    "role_ar": "مهندسة واجهات أمامية وجوال",
    "bio_en": "Manar is a passionate and creative software engineer dedicated to crafting seamless digital experiences across multiple platforms.",
    "bio_ar": "منار مهندسة برمجيات شغوفة ومبدعة مكرسة لإنشاء تجارب رقمية سلسة عبر منصات متعددة.",
    "skills": ["Flutter", "Dart", "React", "Next.js", "TypeScript", "Tailwind", "AI Tools"],
    "photo_url": "https://i.ibb.co/spP6fmwN/manar.jpg",
    "github_username": "manarelnahty",
    "linkedin_url": "https://www.linkedin.com/in/manar-e-6b21bb230",
    "github_url": "https://github.com/manarelnahty",
    "instagram_url": "https://www.instagram.com/manar_elnahty?igsh=M2VxdXRnaDRtMTRm&utm_source=qr",
    "email": "manarelnahty@gmail.com",
    "portfolio_url": null,
    "xp": 0,
    "level": 1,
    "member_badges": []
  },
  {
    "id": "d0000000-0000-0000-0000-000000000004",
    "name": "Ahmed Farghly",
    "slug": "ahmed-farghly",
    "role_en": "Backend Architect & Systems Engineer",
    "role_ar": "مهندس أنظمة وخبير هيكلية باك إند",
    "bio_en": "Ahmed Farghly is the driving force behind Devesters' robust infrastructure, specializing in Django, Laravel, and server admin.",
    "bio_ar": "أحمد فرغلي هو القوة الدافعة وراء البنية التحتية القوية لـ Devesters، وهو متخصص في Django و Laravel وإدارة الخوادم.",
    "skills": ["Laravel", "Django", "Backend", "API", "Golang", "Server Administrator", "DevOps", "AI Tools"],
    "photo_url": "https://avatars.githubusercontent.com/u/95584009?v=4",
    "github_username": "Ahmedfargh",
    "linkedin_url": "https://www.linkedin.com/in/ahmed-farghly-879b09257",
    "github_url": "https://github.com/Ahmedfargh",
    "instagram_url": null,
    "email": "ahmedgits2001@gmail.com",
    "portfolio_url": null,
    "xp": 0,
    "level": 1,
    "member_badges": []
  },
  {
    "id": "c0000000-0000-0000-0000-000000000003",
    "name": "Mohamed Badr",
    "slug": "mohamed-badr",
    "role_en": "Mobile Engineer & UI/UX Specialist",
    "role_ar": "مهندس تطبيقات جوال وأخصائي UI/UX",
    "bio_en": "Mohamed is the code artist of the team, intensely focused on mobile application architecture and user experience.",
    "bio_ar": "محمد هو فنان الكود في الفريق، يركز بشكل مكثف على معمارية تطبيقات الجوال وتجربة المستخدم.",
    "skills": ["Flutter", "Dart", "React", "JavaScript", "TypeScript", "UI/UX", "AI Tools"],
    "photo_url": "https://iili.io/KWL2vG1.jpg",
    "github_username": "mohmdadl",
    "linkedin_url": "https://www.linkedin.com/in/mhmdbadr4flutter/",
    "github_url": "https://github.com/mohmdadl",
    "instagram_url": "https://www.instagram.com/mohmd_adl/",
    "email": "mohamedbadr4iti@gmail.com",
    "portfolio_url": null,
    "xp": 0,
    "level": 1,
    "member_badges": []
  },
  {
    "id": "e0000000-0000-0000-0000-000000000005",
    "name": "Ahmed Essam",
    "slug": "ahmed-essam",
    "role_en": "Backend & Database Engineer",
    "role_ar": "مهندس باك إند وقواعد بيانات",
    "bio_en": "Ahmed Essam is the engineer of logic, security, and performance behind the scenes, specializing in database architecture and Laravel.",
    "bio_ar": "أحمد عصام هو مهندس المنطق والأمان والأداء وراء الكواليس، وهو متخصص في معمارية قواعد البيانات و Laravel.",
    "skills": ["PHP", "Laravel", "Backend Development", "ASP.NET", "AI Tools"],
    "photo_url": "https://i.ibb.co/Hf5bYZns/subol-red.png",
    "github_username": "AhmedEssam88",
    "linkedin_url": "https://www.linkedin.com/in/ahmed-essam-465208232",
    "github_url": "https://github.com/AhmedEssam88",
    "instagram_url": null,
    "email": "ahmedessam1.8.14@gmail.com",
    "portfolio_url": null,
    "xp": 0,
    "level": 1,
    "member_badges": []
  }
];

function DynamicBadgeIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (FiIcons as any)[name];
  if (!IconComponent) {
    return <FiIcons.FiAward className={className} />;
  }
  return <IconComponent className={className} />;
}

export default async function AboutPage() {
  const cookieStore = await cookies();
  const locale = (cookieStore.get('locale')?.value || 'ar') as 'ar' | 'en';
  const dict = getDictionary(locale);
  const isRtl = locale === 'ar';

  let members = [...STATIC_TEAM_MEMBERS];

  try {
    const supabase = await createClient();
    const { data: dbMembers, error } = await supabase
      .from('members')
      .select(`
        *,
        member_badges (
          badge_id,
          badges (
            id,
            name_en,
            name_ar,
            description_en,
            description_ar,
            icon_url,
            xp_reward
          )
        )
      `);

    if (!error && dbMembers && dbMembers.length > 0) {
      members = dbMembers.map((m: any) => ({
        ...m,
        member_badges: m.member_badges || []
      }));
    }
  } catch (err) {
    console.error('Failed to query Supabase members, falling back to static data:', err);
  }

  // Ensure exact sequence regardless of XP or database creation order:
  // 1. Ahmed Azam (ahmed-azam)
  // 2. Manar Elnahty (manar-elnahty)
  // 3. Ahmed Farghly (ahmed-farghly)
  // 4. Mohamed Badr (mohamed-badr)
  // 5. Ahmed Essam (ahmed-essam)
  const ORDERED_SLUGS = [
    'ahmed-azam',
    'manar-elnahty',
    'ahmed-farghly',
    'mohamed-badr',
    'ahmed-essam'
  ];
  members.sort((a, b) => {
    const idxA = ORDERED_SLUGS.indexOf(a.slug);
    const idxB = ORDERED_SLUGS.indexOf(b.slug);
    return (idxA !== -1 ? idxA : 999) - (idxB !== -1 ? idxB : 999);
  });

  return (
    <main className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 md:mb-32 mt-12">
        <p className="text-[#ff8a80] font-bold tracking-widest text-xs uppercase mb-6">
          {dict.aboutPage.badge}
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-bold tracking-tight text-[#d4d4d8] mb-8 leading-[1.1]">
          {dict.aboutPage.titlePrefix}<br />
          <span className="text-[#ff8a80]">{dict.aboutPage.titleSuffix}</span>
        </h1>
        <p className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed max-w-2xl">
          {dict.aboutPage.description}
        </p>
      </section>

      {/* Who We Are & Stats container */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-6">{dict.aboutPage.whoWeAre}</h2>
              <p className="text-[#d4d4d8] leading-relaxed text-sm md:text-base">
                {dict.aboutPage.whoWeAreDesc}
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-6">{dict.aboutPage.whatSetsUsApart}</h2>
              <p className="text-[#d4d4d8] leading-relaxed text-sm md:text-base">
                {dict.aboutPage.whatSetsUsApartDesc}
              </p>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/5 rounded-3xl p-10 md:p-14">
            <div className="flex flex-col space-y-10">
              <div className="flex items-center gap-6">
                <span className="text-5xl md:text-6xl font-heading font-light text-[#e5e5e5]">3+</span>
                <span className="text-xs tracking-widest uppercase text-[#a1a1aa] font-medium leading-relaxed">
                  {dict.aboutPage.shippedProducts}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-5xl md:text-6xl font-heading font-light text-[#e5e5e5]">1</span>
                <span className="text-xs tracking-widest uppercase text-[#a1a1aa] font-medium leading-relaxed">
                  {dict.aboutPage.launchpadAward}
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-5xl md:text-6xl font-heading font-light text-[#e5e5e5]">5</span>
                <span className="text-xs tracking-widest uppercase text-[#a1a1aa] font-medium leading-relaxed">
                  {dict.aboutPage.coreEngineers}
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Core Engineering Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-16 text-center">{dict.aboutPage.coreTeamTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {members.map((member) => {
            const progress = getLevelProgress(member.xp);
            return (
              <div key={member.name} className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                {/* Visual glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-studio-red/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-5">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 border-2 border-white/10 group-hover:border-studio-red/50 transition-colors">
                      <Image 
                        src={member.photo_url || '/placeholder.png'} 
                        alt={member.name} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 640px) 64px, 80px"
                        referrerPolicy="no-referrer" 
                      />
                    </div>
                    <div>
                      <Link href={`/team/${member.slug}`}>
                        <h3 className="text-2xl font-heading font-bold text-white mb-2 group-hover:text-studio-red transition-colors cursor-pointer">
                          {member.name}
                        </h3>
                      </Link>
                      <span 
                        className="inline-block px-3 py-1 text-[10px] sm:text-xs font-bold tracking-wider text-[#d4d4d8] uppercase border border-white/10 rounded-full bg-white/5"
                        dir={locale === 'ar' && member.role_ar ? 'rtl' : 'ltr'}
                      >
                        {locale === 'ar' ? (member.role_ar || member.role_en) : member.role_en}
                      </span>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="flex flex-col items-end shrink-0">
                    <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-studio-red to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-studio-red/20">
                      {isRtl ? `المستوى ${progress.level}` : `Level ${progress.level}`}
                    </div>
                    <span className="text-[10px] text-[#a1a1aa] mt-1 tracking-wider uppercase font-semibold">
                      {member.xp} XP
                    </span>
                  </div>
                </div>

                {/* XP Progress Bar */}
                <div className="mb-6 bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <div className="flex justify-between text-xs text-[#a1a1aa] mb-2 font-medium">
                    <span>{isRtl ? 'التقدم للمستوى التالي' : 'XP Progress'}</span>
                    <span className="font-bold text-[#e5e5e5]">
                      {progress.level === 5 ? (isRtl ? 'المستوى الأقصى' : 'Max Level') : `${member.xp} / ${progress.nextLevelXp}`}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-studio-red via-[#ff8a80] to-red-600 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progress.progressPercent}%` }}
                    />
                  </div>
                  {progress.level < 5 && (
                    <p className="text-[10px] text-[#a1a1aa] mt-2 text-right">
                      {isRtl 
                        ? `متبقي ${progress.nextLevelXp - member.xp} نقطة للترقية` 
                        : `${progress.nextLevelXp - member.xp} XP remaining to Level ${progress.level + 1}`}
                    </p>
                  )}
                </div>
                
                <p 
                  className={`text-[#a1a1aa] text-sm leading-relaxed mb-6 flex-grow ${
                    locale === 'ar' && (member.bio_ar || dict.team.bios[member.name]) ? 'text-right' : 'text-left'
                  }`}
                  dir={locale === 'ar' && (member.bio_ar || dict.team.bios[member.name]) ? 'rtl' : 'ltr'}
                >
                  {locale === 'ar' ? (member.bio_ar || dict.team.bios[member.name] || member.bio_en) : member.bio_en}
                </p>
                
                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Array.isArray(member.skills) ? member.skills : JSON.parse(member.skills || '[]')).map((skill: string) => (
                    <span key={skill} className="px-2.5 py-1 text-[10px] font-bold tracking-wider text-studio-red border border-studio-red/20 rounded-md bg-studio-red/5 hover:bg-studio-red/10 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Earned Badges Section */}
                {member.member_badges && member.member_badges.length > 0 && (
                  <div className="border-t border-white/5 pt-5 mb-5">
                    <h4 className="text-xs font-bold text-white tracking-widest uppercase mb-3">
                      {isRtl ? `الأوسمة (${member.member_badges.length})` : `Earned Badges (${member.member_badges.length})`}
                    </h4>
                    <div className="flex flex-wrap gap-2.5">
                      {member.member_badges.map((mb: any) => {
                        const badge = mb.badges;
                        if (!badge) return null;
                        const badgeName = locale === 'ar' ? badge.name_ar : badge.name_en;
                        const badgeDesc = locale === 'ar' ? badge.description_ar : badge.description_en;
                        return (
                          <div 
                            key={badge.id}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-studio-red hover:bg-studio-red hover:text-white hover:scale-110 hover:border-studio-red transition-all duration-300 cursor-pointer group/badge relative"
                          >
                            <DynamicBadgeIcon name={badge.icon_url} className="w-4 h-4" />
                            {/* Simple dynamic tooltip */}
                            <div className={`absolute bottom-10 ${isRtl ? 'right-0' : 'left-0'} hidden group-hover/badge:block bg-zinc-950 border border-white/10 text-white rounded-lg p-2.5 w-48 text-xs z-50 shadow-2xl`}>
                              <p className="font-bold text-studio-red mb-1">{badgeName}</p>
                              <p className="text-[10px] text-zinc-400 leading-normal">{badgeDesc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Social Links & View Profile */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/5">
                  <div className="flex items-center gap-3">
                    {member.github_url && (
                      <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="GitHub">
                        <FiIcons.FiGithub className="w-4 h-4" />
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="LinkedIn">
                        <FiIcons.FiLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.instagram_url && (
                      <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Instagram">
                        <FiIcons.FiInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {member.portfolio_url && (
                      <a href={member.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors" title="Portfolio">
                        <FiIcons.FiGlobe className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-zinc-400 hover:text-white transition-colors" title="Email">
                        <FiIcons.FiMail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  
                  <Link href={`/team/${member.slug}`} className="text-xs font-bold text-studio-red hover:text-white hover:underline transition-colors shrink-0">
                    {isRtl ? 'عرض الملف الكامل ←' : 'View Full Profile →'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Where We're Headed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-12">{dict.aboutPage.whereWeAreHeaded}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-studio-red mb-6">
              <FiIcons.FiTrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">{dict.aboutPage.goals[0].title}</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {dict.aboutPage.goals[0].desc}
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-studio-red mb-6">
              <FiIcons.FiCpu className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">{dict.aboutPage.goals[1].title}</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {dict.aboutPage.goals[1].desc}
            </p>
          </div>

          <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.05] transition-colors">
            <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-studio-red mb-6">
              <FiIcons.FiCode className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-4">{dict.aboutPage.goals[2].title}</h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {dict.aboutPage.goals[2].desc}
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
