'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as FiIcons from 'react-icons/fi';
import { getLevelProgress } from '@/lib/utils';

interface Badge {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  icon_url: string;
  xp_reward: number;
  trigger_type: string;
}

interface Task {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  xp_value: number;
  badge_reward_id: string | null;
}

interface Member {
  id: string;
  name: string;
  slug: string;
  role_en: string;
  role_ar: string;
  bio_en: string;
  bio_ar: string;
  skills: string | string[];
  photo_url: string | null;
  github_username: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  instagram_url: string | null;
  email: string | null;
  portfolio_url: string | null;
  xp: number;
  level: number;
}

interface ProfileProps {
  member: Member;
  allBadges: Badge[];
  allTasks: Task[];
  initialEarnedBadgeIds: string[];
  initialCompletedTaskIds: string[];
  isLead: boolean;
  locale: 'ar' | 'en';
}

function DynamicBadgeIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (FiIcons as any)[name];
  if (!IconComponent) {
    return <FiIcons.FiAward className={className} />;
  }
  return <IconComponent className={className} />;
}

export default function TeamMemberProfileClient({
  member,
  allBadges,
  allTasks,
  initialEarnedBadgeIds,
  initialCompletedTaskIds,
  isLead,
  locale
}: ProfileProps) {
  const isRtl = locale === 'ar';
  const skillsArray = typeof member.skills === 'string' 
    ? JSON.parse(member.skills || '[]') 
    : member.skills || [];

  // Local state for interactive client features
  const [activeTab, setActiveTab] = useState<'tasks' | 'badges'>('tasks');
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>(initialCompletedTaskIds);
  const [earnedBadgeIds, setEarnedBadgeIds] = useState<string[]>(initialEarnedBadgeIds);
  const [xp, setXp] = useState<number>(member.xp);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const progress = getLevelProgress(xp);

  // Toggle task completion (Team Lead only)
  const handleToggleTask = async (taskId: string) => {
    if (!isLead || isUpdating) return;

    const isCurrentlyCompleted = completedTaskIds.includes(taskId);
    const nextAction = isCurrentlyCompleted ? 'uncomplete' : 'complete';

    setIsUpdating(taskId);

    try {
      const res = await fetch('/api/team/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          memberId: member.id,
          taskId,
          action: nextAction,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Failed to update task');
        setIsUpdating(null);
        return;
      }

      const data = await res.json();

      if (data.success) {
        // Update local state
        let nextCompleted = [...completedTaskIds];
        if (nextAction === 'complete') {
          nextCompleted.push(taskId);
        } else {
          nextCompleted = nextCompleted.filter(id => id !== taskId);
        }
        setCompletedTaskIds(nextCompleted);

        // Update badges state
        const taskObj = allTasks.find(t => t.id === taskId);
        if (taskObj?.badge_reward_id) {
          let nextBadges = [...earnedBadgeIds];
          if (nextAction === 'complete') {
            if (!nextBadges.includes(taskObj.badge_reward_id)) {
              nextBadges.push(taskObj.badge_reward_id);
            }
          } else {
            nextBadges = nextBadges.filter(id => id !== taskObj.badge_reward_id);
          }
          setEarnedBadgeIds(nextBadges);
        }

        // Trigger XP update animation
        setXp(data.xp);
      }
    } catch (e) {
      console.error(e);
      alert('Network error while saving task state');
    } finally {
      setIsUpdating(null);
    }
  };

  // Translations object helper
  const t = {
    back: isRtl ? '← العودة للفريق' : '← Back to Team',
    level: isRtl ? `المستوى ${progress.level}` : `Level ${progress.level}`,
    xpProgress: isRtl ? 'التقدم للمستوى التالي' : 'XP Progress to Next Level',
    maxLevel: isRtl ? 'المستوى الأقصى' : 'Max Level Reached',
    remaining: (pts: number, lvl: number) => isRtl 
      ? `متبقي ${pts} نقطة للترقية إلى مستوى ${lvl}` 
      : `${pts} XP remaining to Level ${lvl}`,
    skillsTitle: isRtl ? 'المهارات التقنية' : 'Technical Skills',
    tasksTab: isRtl ? 'قائمة المهام' : 'Tasks System',
    badgesTab: isRtl ? 'مجموعة الأوسمة' : 'Badges & Medals',
    completedHeader: isRtl ? 'المهام المنجزة' : 'Completed Tasks',
    pendingHeader: isRtl ? 'المهام المعلقة' : 'Pending Tasks',
    lockedBadge: isRtl ? 'وسام مغلق' : 'Locked Badge',
    earnedBadge: isRtl ? 'وسام محقق' : 'Earned Badge',
    assignAlert: isRtl ? 'إسناد وتعديل المهام متاح فقط لقائد الفريق' : 'Only the Team Lead can assign or toggle tasks.',
    categoryLabel: (cat: string) => {
      if (cat === 'profile_completeness') return isRtl ? 'كمال الملف الشخصي' : 'Profile Completeness';
      if (cat === 'project_portfolio') return isRtl ? 'المشاريع والمعرض' : 'Projects & Portfolio';
      return isRtl ? 'المساهمات البرمجية' : 'Team Contributions';
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ${isRtl ? 'font-cairo' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Back Button */}
      <Link href="/about" className="inline-flex items-center gap-2 text-zinc-400 hover:text-studio-red font-bold text-sm mb-12 transition-colors">
        {t.back}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* Left Column - Member Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:border-white/10 transition-all duration-300 relative overflow-hidden group">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-studio-red/5 rounded-full blur-3xl opacity-50 pointer-events-none" />
            
            {/* Avatar Header */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/10 group-hover:border-studio-red/50 transition-colors mb-6">
                <Image 
                  src={member.photo_url || '/placeholder.png'} 
                  alt={member.name} 
                  fill 
                  className="object-cover" 
                  sizes="128px"
                  referrerPolicy="no-referrer"
                />
              </div>

              <h1 className="text-3xl font-heading font-bold text-white mb-2">{member.name}</h1>
              
              <span 
                className="px-3.5 py-1 text-xs font-bold tracking-wider text-zinc-400 border border-white/10 rounded-full bg-white/5 mb-6"
                dir={isRtl && member.role_ar ? 'rtl' : 'ltr'}
              >
                {isRtl ? (member.role_ar || member.role_en) : member.role_en}
              </span>

              {/* Level Pill */}
              <div className="w-full bg-gradient-to-r from-studio-red to-red-600 rounded-2xl p-4 text-white shadow-lg shadow-studio-red/10 mb-6">
                <div className="text-xl font-extrabold uppercase tracking-wide">{t.level}</div>
                <div className="text-xs font-semibold text-white/80 mt-0.5">{xp} Total XP</div>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 mb-8">
              <div className="flex justify-between text-xs text-[#a1a1aa] mb-2.5 font-bold">
                <span>{t.xpProgress}</span>
                <span>{progress.level === 5 ? t.maxLevel : `${xp} / ${progress.nextLevelXp}`}</span>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-studio-red via-[#ff8a80] to-red-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress.progressPercent}%` }}
                />
              </div>
              {progress.level < 5 && (
                <p className="text-[10px] text-zinc-400 mt-2 text-right">
                  {t.remaining(progress.nextLevelXp - xp, progress.level + 1)}
                </p>
              )}
            </div>

            {/* Localized bio */}
            <p 
              className={`text-zinc-400 text-sm leading-relaxed mb-8 border-t border-white/5 pt-6 text-justify ${
                isRtl && member.bio_ar ? 'text-right' : 'text-left'
              }`}
              dir={isRtl && member.bio_ar ? 'rtl' : 'ltr'}
            >
              {isRtl ? (member.bio_ar || member.bio_en) : member.bio_en}
            </p>

            {/* Skills */}
            <div className="border-t border-white/5 pt-6">
              <h3 className="text-xs font-bold text-white tracking-widest uppercase mb-4">{t.skillsTitle}</h3>
              <div className="flex flex-wrap gap-2">
                {skillsArray.map((skill: string) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1.5 text-xs font-bold tracking-wider text-studio-red border border-studio-red/20 rounded-lg bg-studio-red/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social details */}
            <div className="flex items-center justify-center gap-5 border-t border-white/5 mt-8 pt-6">
              {member.github_url && (
                <a href={member.github_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-red transition-all duration-300" title="GitHub">
                  <FiIcons.FiGithub className="w-5 h-5" />
                </a>
              )}
              {member.linkedin_url && (
                <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-red transition-all duration-300" title="LinkedIn">
                  <FiIcons.FiLinkedin className="w-5 h-5" />
                </a>
              )}
              {member.instagram_url && (
                <a href={member.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-red transition-all duration-300" title="Instagram">
                  <FiIcons.FiInstagram className="w-5 h-5" />
                </a>
              )}
              {member.portfolio_url && (
                <a href={member.portfolio_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-red transition-all duration-300" title="Portfolio">
                  <FiIcons.FiGlobe className="w-5 h-5" />
                </a>
              )}
              {member.email && (
                <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-studio-red transition-all duration-300" title="Email">
                  <FiIcons.FiMail className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Navigation & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tabs header */}
          <div className="flex border-b border-white/5 p-1 bg-white/[0.02] rounded-2xl">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 py-4 text-sm font-bold tracking-wider rounded-xl transition-all duration-300 ${
                activeTab === 'tasks'
                  ? 'bg-gradient-to-r from-studio-red to-red-600 text-white shadow-lg shadow-studio-red/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.tasksTab}
            </button>
            <button
              onClick={() => setActiveTab('badges')}
              className={`flex-1 py-4 text-sm font-bold tracking-wider rounded-xl transition-all duration-300 ${
                activeTab === 'badges'
                  ? 'bg-gradient-to-r from-studio-red to-red-600 text-white shadow-lg shadow-studio-red/10'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {t.badgesTab}
            </button>
          </div>

          {/* Tab 1: Tasks Checklist */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              {/* Security info alert for Team Lead */}
              {isLead ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl p-4 flex items-center gap-3 text-xs">
                  <FiIcons.FiCheckCircle className="w-5 h-5 shrink-0" />
                  <p className="font-semibold">
                    {isRtl 
                      ? 'أنت تسجل الدخول بصفتك قائد الفريق. يمكنك النقر لتحديد المهام المنجزة أو إلغاء إنجازها.'
                      : 'You are signed in as the Team Lead. Click on any task to toggle its completion and award XP.'}
                  </p>
                </div>
              ) : (
                <div className="bg-white/[0.02] border border-white/5 text-zinc-400 rounded-2xl p-4 flex items-center gap-3 text-xs">
                  <FiIcons.FiLock className="w-5 h-5 shrink-0 text-studio-red" />
                  <p className="font-semibold">{t.assignAlert}</p>
                </div>
              )}

              {/* Tasks List */}
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
                
                {/* Completed Tasks section */}
                <div>
                  <h3 className="text-sm font-heading font-extrabold text-white mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    {t.completedHeader} ({completedTaskIds.length})
                  </h3>
                  
                  <div className="space-y-3.5">
                    {allTasks.filter(t => completedTaskIds.includes(t.id)).map(task => {
                      const taskTitle = isRtl ? task.title_ar : task.title_en;
                      const taskDesc = isRtl ? task.description_ar : task.description_en;
                      
                      return (
                        <div 
                          key={task.id}
                          onClick={() => handleToggleTask(task.id)}
                          className={`flex items-start justify-between gap-4 p-4 rounded-2xl bg-emerald-500/[0.02] border border-emerald-500/10 transition-all ${
                            isLead ? 'cursor-pointer hover:border-emerald-500/30' : ''
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 shrink-0 text-emerald-500">
                              {isUpdating === task.id ? (
                                <FiIcons.FiLoader className="w-5 h-5 animate-spin" />
                              ) : (
                                <FiIcons.FiCheckCircle className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-white text-sm md:text-base leading-tight mb-1">{taskTitle}</h4>
                              <p className="text-zinc-400 text-xs md:text-sm leading-normal mb-2">{taskDesc}</p>
                              <span className="inline-block px-2 py-0.5 text-[9px] font-bold text-zinc-400 border border-white/10 rounded-md bg-white/5">
                                {t.categoryLabel(task.category)}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="text-xs font-bold text-emerald-400">+{task.xp_value} XP</div>
                          </div>
                        </div>
                      );
                    })}

                    {completedTaskIds.length === 0 && (
                      <div className="text-center text-zinc-500 text-sm py-6">
                        {isRtl ? 'لا يوجد مهام مكتملة بعد' : 'No completed tasks yet.'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pending Tasks section */}
                <div className="border-t border-white/5 pt-6">
                  <h3 className="text-sm font-heading font-extrabold text-white mb-4 tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-600" />
                    {t.pendingHeader} ({allTasks.length - completedTaskIds.length})
                  </h3>

                  <div className="space-y-3.5">
                    {allTasks.filter(t => !completedTaskIds.includes(t.id)).map(task => {
                      const taskTitle = isRtl ? task.title_ar : task.title_en;
                      const taskDesc = isRtl ? task.description_ar : task.description_en;
                      
                      return (
                        <div 
                          key={task.id}
                          onClick={() => handleToggleTask(task.id)}
                          className={`flex items-start justify-between gap-4 p-4 rounded-2xl bg-white/[0.01] border border-white/5 transition-all ${
                            isLead ? 'cursor-pointer hover:border-studio-red/30 hover:bg-studio-red/[0.01]' : ''
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="mt-0.5 shrink-0 text-zinc-600 group-hover:text-studio-red">
                              {isUpdating === task.id ? (
                                <FiIcons.FiLoader className="w-5 h-5 animate-spin" />
                              ) : (
                                <FiIcons.FiCircle className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <h4 className="font-bold text-zinc-300 text-sm md:text-base leading-tight mb-1">{taskTitle}</h4>
                              <p className="text-zinc-500 text-xs md:text-sm leading-normal mb-2">{taskDesc}</p>
                              <span className="inline-block px-2 py-0.5 text-[9px] font-bold text-zinc-500 border border-white/5 rounded-md bg-white/[0.02]">
                                {t.categoryLabel(task.category)}
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0 text-right">
                            <div className="text-xs font-bold text-zinc-400">+{task.xp_value} XP</div>
                          </div>
                        </div>
                      );
                    })}

                    {completedTaskIds.length === allTasks.length && (
                      <div className="text-center text-zinc-500 text-sm py-6">
                        {isRtl ? 'تهانينا! تم إنجاز جميع المهام بنجاح.' : 'All tasks completed successfully!'}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Tab 2: Badges Collection */}
          {activeTab === 'badges' && (
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allBadges.map(badge => {
                  const isEarned = earnedBadgeIds.includes(badge.id);
                  const badgeName = isRtl ? badge.name_ar : badge.name_en;
                  const badgeDesc = isRtl ? badge.description_ar : badge.description_en;

                  return (
                    <div 
                      key={badge.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                        isEarned 
                          ? 'bg-studio-red/[0.02] border-studio-red/20 shadow-lg shadow-studio-red/5' 
                          : 'bg-white/[0.01] border-white/5 opacity-50 grayscale'
                      }`}
                    >
                      {/* Badge Icon circle */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border ${
                        isEarned 
                          ? 'bg-studio-red/10 border-studio-red/30 text-studio-red' 
                          : 'bg-white/5 border-white/10 text-zinc-600'
                      }`}>
                        <DynamicBadgeIcon name={badge.icon_url} className="w-5 h-5" />
                      </div>

                      {/* Badge descriptions */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-sm md:text-base leading-tight truncate">{badgeName}</h4>
                          <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded ${
                            isEarned ? 'bg-studio-red/10 text-studio-red' : 'bg-white/5 text-zinc-500'
                          }`}>
                            {isEarned ? t.earnedBadge : t.lockedBadge}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-normal text-justify">{badgeDesc}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] text-zinc-500 font-medium">
                            {isRtl ? `نوع الإسناد: ` : `Trigger: `}
                            <span className="font-bold text-zinc-400">{badge.trigger_type}</span>
                          </span>
                          <span className="text-[10px] text-studio-red font-bold">
                            +{badge.xp_reward} XP
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
