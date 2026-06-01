'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { 
  Trophy, 
  CheckCircle2, 
  Lock, 
  RefreshCw, 
  Loader2, 
  User, 
  Check, 
  ShieldAlert,
  Search,
  Zap,
  Award,
  Bell,
  Mail,
  Send,
  Users,
  CheckCheck,
  X,
  Plus,
  Trash2
} from 'lucide-react';
import * as FiIcons from 'react-icons/fi';
import { getLevelProgress } from '@/lib/utils';

// Helper for rendering FiIcons
function DynamicBadgeIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (FiIcons as any)[name];
  if (!IconComponent) {
    return <FiIcons.FiAward className={className} />;
  }
  return <IconComponent className={className} />;
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
  email: string | null;
  xp: number;
  level: number;
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

interface ClientProps {
  members: Member[];
  allTasks: Task[];
  allBadges: Badge[];
  completedTasks: { member_id: string; task_id: string; is_completed?: boolean }[];
  earnedBadges: { member_id: string; badge_id: string }[];
  loggedInMemberId: string;
  isLead: boolean;
}

export default function GamificationClient({
  members,
  allTasks,
  allBadges,
  completedTasks,
  earnedBadges,
  loggedInMemberId,
  isLead
}: ClientProps) {
  const router = useRouter();

  // Selected Member
  const [selectedMemberId, setSelectedMemberId] = useState<string>(
    members.some(m => m.id === loggedInMemberId) ? loggedInMemberId : members[0]?.id
  );

  // Tab View
  const [activeTab, setActiveTab] = useState<'tasks' | 'badges'>('tasks');

  // Loaders
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncResults, setSyncResults] = useState<any>(null);
  const [syncError, setSyncError] = useState('');
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  // Notification Panel State
  const [showNotifyPanel, setShowNotifyPanel] = useState(false);
  const [notifySubject, setNotifySubject] = useState('');
  const [notifyBody, setNotifyBody] = useState('');
  const [notifyTarget, setNotifyTarget] = useState<'all' | 'selected'>('all');
  const [selectedNotifyMembers, setSelectedNotifyMembers] = useState<string[]>([]);
  const [isSendingNotify, setIsSendingNotify] = useState(false);
  const [notifyResult, setNotifyResult] = useState<any>(null);
  const [notifyError, setNotifyError] = useState('');

  const [membersList, setMembersList] = useState<Member[]>(members);
  
  // Custom Task Creator State
  const [showTaskPanel, setShowTaskPanel] = useState(false);
  const [taskTitleEn, setTaskTitleEn] = useState('');
  const [taskTitleAr, setTaskTitleAr] = useState('');
  const [taskDescEn, setTaskDescEn] = useState('');
  const [taskDescAr, setTaskDescAr] = useState('');
  const [taskCategory, setTaskCategory] = useState('team_contributions');
  const [taskXpValue, setTaskXpValue] = useState(100);
  const [taskBadgeRewardId, setTaskBadgeRewardId] = useState('');
  const [taskAssignTo, setTaskAssignTo] = useState('none');
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [taskResult, setTaskResult] = useState<any>(null);
  const [taskError, setTaskError] = useState('');
  const [allTasksList, setAllTasksList] = useState<Task[]>(allTasks);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  
  // Create mapping of member ID -> tasks status
  const initialTasksMap: Record<string, { taskId: string; isCompleted: boolean }[]> = {};
  members.forEach(m => {
    initialTasksMap[m.id] = completedTasks
      .filter(ct => ct.member_id === m.id)
      .map(ct => ({ taskId: ct.task_id, isCompleted: ct.is_completed ?? true }));
  });
  const [memberTasksMap, setMemberTasksMap] = useState<Record<string, { taskId: string; isCompleted: boolean }[]>>(initialTasksMap);

  // Create mapping of member ID -> earned badge IDs
  const initialBadgesMap: Record<string, string[]> = {};
  members.forEach(m => {
    initialBadgesMap[m.id] = earnedBadges
      .filter(eb => eb.member_id === m.id)
      .map(eb => eb.badge_id);
  });
  const [memberBadgesMap, setMemberBadgesMap] = useState<Record<string, string[]>>(initialBadgesMap);

  // Selected member object
  const selectedMember = membersList.find(m => m.id === selectedMemberId) || membersList[0];
  const selectedMemberTasks = selectedMember ? (memberTasksMap[selectedMember.id] || []) : [];
  const selectedCompletedTaskIds = selectedMemberTasks
    .filter(item => item.isCompleted)
    .map(item => item.taskId);
  const selectedAssignedTaskIds = selectedMemberTasks.map(item => item.taskId);
  const selectedEarnedBadgeIds = memberBadgesMap[selectedMember?.id] || [];
  const progress = selectedMember ? getLevelProgress(selectedMember.xp) : null;

  // Toggle Manual Task Completion (Team Lead only)
  const handleToggleTask = async (taskId: string) => {
    if (!isLead || updatingTaskId || !selectedMember) return;

    const isCompleted = selectedCompletedTaskIds.includes(taskId);
    const nextAction = isCompleted ? 'uncomplete' : 'complete';

    setUpdatingTaskId(taskId);
    setSyncError('');
    setSyncResults(null);

    try {
      const res = await fetch('/api/team/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: selectedMember.id,
          taskId,
          action: nextAction
        })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update task');
      }

      const data = await res.json();

      if (data.success) {
        // 1. Update member XP and Level in the list
        setMembersList(prev => 
          prev.map(m => m.id === selectedMember.id ? { ...m, xp: data.xp, level: data.level } : m)
        );

        // 2. Update task completion mapping
        setMemberTasksMap(prev => {
          const current = prev[selectedMember.id] || [];
          const exists = current.some(item => item.taskId === taskId);
          let updated;
          if (nextAction === 'complete') {
            if (exists) {
              updated = current.map(item => 
                item.taskId === taskId ? { ...item, isCompleted: true } : item
              );
            } else {
              updated = [...current, { taskId, isCompleted: true }];
            }
          } else {
            // nextAction === 'uncomplete'
            if (taskId.startsWith('custom-')) {
              updated = current.map(item => 
                item.taskId === taskId ? { ...item, isCompleted: false } : item
              );
            } else {
              updated = current.filter(item => item.taskId !== taskId);
            }
          }
          return { ...prev, [selectedMember.id]: updated };
        });

        // 3. Update badges if task has badge reward
        const taskObj = allTasksList.find(t => t.id === taskId);
        if (taskObj?.badge_reward_id) {
          setMemberBadgesMap(prev => {
            const current = prev[selectedMember.id] || [];
            let updated = [...current];
            if (nextAction === 'complete') {
              if (!updated.includes(taskObj.badge_reward_id!)) {
                updated.push(taskObj.badge_reward_id!);
              }
            } else {
              updated = updated.filter(id => id !== taskObj.badge_reward_id);
            }
            return { ...prev, [selectedMember.id]: updated };
          });
        }

        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setSyncError(err.message || 'Error occurred while updating task');
    } finally {
      setUpdatingTaskId(null);
    }
  };

  // Sync GitHub Events for All Members
  const handleSyncGitHub = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    setSyncError('');
    setSyncResults(null);

    try {
      const res = await fetch('/api/github/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'GitHub Event Tracker failed');
      }

      const data = await res.json();
      
      if (data.success) {
        setSyncResults(data.results);
        
        // Refresh page data to fetch new XP / levels from server
        router.refresh();
      }
    } catch (err: any) {
      console.error(err);
      setSyncError(err.message || 'Failed to communicate with GitHub tracking service');
    } finally {
      setIsSyncing(false);
    }
  };

  // Send Notification Handler
  const handleSendNotification = async () => {
    if (isSendingNotify || !notifySubject.trim() || !notifyBody.trim()) return;

    setIsSendingNotify(true);
    setNotifyError('');
    setNotifyResult(null);

    try {
      const payload: any = {
        subject: notifySubject.trim(),
        body: notifyBody.trim(),
        sendToAll: notifyTarget === 'all',
      };

      if (notifyTarget === 'selected') {
        payload.memberIds = selectedNotifyMembers;
      }

      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send notifications');
      }

      setNotifyResult(data);
      // Clear form on success
      setNotifySubject('');
      setNotifyBody('');
    } catch (err: any) {
      setNotifyError(err.message || 'Failed to send notification');
    } finally {
      setIsSendingNotify(false);
    }
  };

  // Create Custom Task Handler (Team Lead only)
  const handleCreateTask = async () => {
    if (isCreatingTask || !taskTitleEn.trim() || !taskTitleAr.trim()) return;
    setIsCreatingTask(true);
    setTaskError('');
    setTaskResult(null);

    try {
      const res = await fetch('/api/team/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          titleEn: taskTitleEn.trim(),
          titleAr: taskTitleAr.trim(),
          descriptionEn: taskDescEn.trim(),
          descriptionAr: taskDescAr.trim(),
          category: taskCategory,
          xpValue: Number(taskXpValue),
          badgeRewardId: taskBadgeRewardId || null,
          assignTo: taskAssignTo,
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create custom task');
      }

      setTaskResult(data);

      // Add the new task to local tasks list
      const newTaskObj: Task = {
        id: data.taskId,
        title_en: taskTitleEn.trim(),
        title_ar: taskTitleAr.trim(),
        description_en: taskDescEn.trim(),
        description_ar: taskDescAr.trim(),
        category: taskCategory,
        xp_value: Number(taskXpValue),
        badge_reward_id: taskBadgeRewardId || null,
      };

      setAllTasksList(prev => [...prev, newTaskObj]);

      // Update completed mapping locally if assigned to some or all
      if (taskAssignTo === 'all') {
        setMemberTasksMap(prev => {
          const updated = { ...prev };
          membersList.forEach(m => {
            updated[m.id] = [...(updated[m.id] || []), { taskId: data.taskId, isCompleted: false }];
          });
          return updated;
        });
      } else if (taskAssignTo !== 'none') {
        setMemberTasksMap(prev => ({
          ...prev,
          [taskAssignTo]: [...(prev[taskAssignTo] || []), { taskId: data.taskId, isCompleted: false }]
        }));
      }

      // Reset form
      setTaskTitleEn('');
      setTaskTitleAr('');
      setTaskDescEn('');
      setTaskDescAr('');
      setTaskBadgeRewardId('');
      setTaskAssignTo('none');
      
      router.refresh();
    } catch (err: any) {
      setTaskError(err.message || 'Error occurred while creating task');
    } finally {
      setIsCreatingTask(false);
    }
  };

  // Delete Task Handler (Team Lead only)
  const handleDeleteTask = async (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering checklist toggle when clicking delete!
    if (!isLead || deletingTaskId) return;

    if (!confirm('Are you sure you want to delete this custom task? This will revoke it and any badge rewards from all members.')) {
      return;
    }

    setDeletingTaskId(taskId);
    try {
      const res = await fetch('/api/team/task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', taskId })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete task');
      }

      // Remove from local tasks list
      setAllTasksList(prev => prev.filter(t => t.id !== taskId));

      // Remove from all completions mapping
      setMemberTasksMap(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(memberId => {
          updated[memberId] = updated[memberId].filter(item => item.taskId !== taskId);
        });
        return updated;
      });

      router.refresh();
    } catch (err: any) {
      alert(err.message || 'Failed to delete task');
    } finally {
      setDeletingTaskId(null);
    }
  };

  const toggleNotifyMember = (id: string) => {
    setSelectedNotifyMembers(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            <Trophy className="w-5 h-5 text-studio-red animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Gamification & Milestones</h1>
            <p className="text-sm text-zinc-400">Award XP, track developer levels, lock/unlock badges, and sync GitHub activity.</p>
          </div>
        </div>
        
        {/* Sync Controls */}
        <div className="flex items-center gap-3">
          {isLead && (
            <>
              <button
                onClick={() => { 
                  setShowTaskPanel(!showTaskPanel); 
                  setShowNotifyPanel(false);
                  setTaskResult(null); 
                  setTaskError(''); 
                }}
                className={`flex items-center gap-2 font-medium text-sm py-2.5 px-5 rounded-xl transition-all shadow-lg ${
                  showTaskPanel
                    ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-950/10'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 shadow-none'
                }`}
              >
                <Plus className="w-4 h-4" />
                {showTaskPanel ? 'Close Creator' : 'Create Task'}
              </button>

              <button
                onClick={() => { 
                  setShowNotifyPanel(!showNotifyPanel); 
                  setShowTaskPanel(false);
                  setNotifyResult(null); 
                  setNotifyError(''); 
                }}
                className={`flex items-center gap-2 font-medium text-sm py-2.5 px-5 rounded-xl transition-all shadow-lg ${
                  showNotifyPanel
                    ? 'bg-amber-500 hover:bg-amber-600 text-black shadow-amber-900/10'
                    : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 shadow-none'
                }`}
              >
                <Bell className="w-4 h-4" />
                {showNotifyPanel ? 'Close Notifications' : 'Send Notification'}
              </button>
            </>
          )}
          <button
            onClick={handleSyncGitHub}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-[#FF1C1C] hover:bg-[#d91212] disabled:opacity-50 text-white font-medium text-sm py-2.5 px-5 rounded-xl transition-colors shadow-lg shadow-red-900/10"
          >
            {isSyncing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Syncing GitHub...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" />
                Sync GitHub Events
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sync Status Feedback Banners */}
      {syncError && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <p>{syncError}</p>
        </div>
      )}

      {syncResults && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold mb-1">
            <CheckCircle2 className="w-5 h-5" />
            GitHub Event Sync Complete! Reloading parameters...
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            {syncResults.map((r: any, idx: number) => (
              <div key={idx} className="bg-black/30 border border-white/5 p-3 rounded-lg text-xs space-y-1">
                <span className="font-bold text-white block">{r.member} (@{r.github_username})</span>
                {r.tasks_awarded.length > 0 && (
                  <span className="text-emerald-400 block">Tasks Completed: {r.tasks_awarded.join(', ')}</span>
                )}
                {r.badges_awarded.length > 0 && (
                  <span className="text-amber-400 block font-bold">Badges Unlocked: {r.badges_awarded.join(', ')}</span>
                )}
                {r.tasks_awarded.length === 0 && r.badges_awarded.length === 0 && (
                  <span className="text-zinc-500 block">No new achievements found.</span>
                )}
                {r.errors.length > 0 && (
                  <span className="text-red-400 block italic">{r.errors[0]}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notification Compose Panel */}
      {showNotifyPanel && isLead && (
        <div className="bg-gradient-to-br from-[#13131a] to-[#0f0f14] border border-amber-500/15 rounded-2xl p-6 space-y-5 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center">
                <Mail className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Compose Notification</h3>
                <p className="text-xs text-zinc-500">Send email notifications to team members via Google Apps Script</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotifyPanel(false)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </div>

          {/* Target Selector */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Recipients</label>
            <div className="flex gap-3">
              <button
                onClick={() => setNotifyTarget('all')}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all border ${
                  notifyTarget === 'all'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-black/20 border-white/5 text-zinc-500 hover:text-white hover:border-white/10'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                All Team Members
              </button>
              <button
                onClick={() => setNotifyTarget('selected')}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-sm font-semibold transition-all border ${
                  notifyTarget === 'selected'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-black/20 border-white/5 text-zinc-500 hover:text-white hover:border-white/10'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Select Members
              </button>
            </div>

            {/* Member checkboxes (visible when 'selected' is chosen) */}
            {notifyTarget === 'selected' && (
              <div className="flex flex-wrap gap-2 p-3 bg-black/30 rounded-xl border border-white/5">
                {membersList.map(m => (
                  <button
                    key={m.id}
                    onClick={() => toggleNotifyMember(m.id)}
                    className={`flex items-center gap-2 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all border ${
                      selectedNotifyMembers.includes(m.id)
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-black/30 border-white/5 text-zinc-500 hover:text-white'
                    }`}
                  >
                    {selectedNotifyMembers.includes(m.id) ? (
                      <CheckCheck className="w-3 h-3" />
                    ) : (
                      <div className="w-3 h-3 rounded border border-zinc-600" />
                    )}
                    {m.name}
                    {m.email && <span className="text-zinc-600">({m.email})</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Subject</label>
            <input
              type="text"
              value={notifySubject}
              onChange={e => setNotifySubject(e.target.value)}
              placeholder="e.g. Team Meeting Tomorrow at 3 PM"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Body */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Message Body <span className="text-zinc-600">(HTML supported)</span></label>
            <textarea
              value={notifyBody}
              onChange={e => setNotifyBody(e.target.value)}
              rows={4}
              placeholder="Write your notification message here... You can use <b>bold</b>, <i>italic</i>, <br> for line breaks."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
            />
          </div>

          {/* Send Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSendNotification}
              disabled={isSendingNotify || !notifySubject.trim() || !notifyBody.trim() || (notifyTarget === 'selected' && selectedNotifyMembers.length === 0)}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-black font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-lg shadow-amber-900/15"
            >
              {isSendingNotify ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending Emails...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Notification
                </>
              )}
            </button>
            <span className="text-xs text-zinc-600">
              {notifyTarget === 'all'
                ? `→ Will email all ${membersList.length} members`
                : `→ Will email ${selectedNotifyMembers.length} selected member(s)`}
            </span>
          </div>

          {/* Notification Error */}
          {notifyError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {notifyError}
            </div>
          )}

          {/* Notification Success Results */}
          {notifyResult && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5" />
                Sent {notifyResult.sent} / {notifyResult.total} emails successfully
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {notifyResult.results?.map((r: any, i: number) => (
                  <div key={i} className="flex items-center gap-2 bg-black/30 border border-white/5 p-2.5 rounded-lg text-xs">
                    {r.success ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    )}
                    <span className="text-white font-semibold">{r.name}</span>
                    <span className="text-zinc-600 truncate">{r.email}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Custom Task Creator Panel */}
      {showTaskPanel && isLead && (
        <div className="bg-gradient-to-br from-[#13131a] to-[#0f0f14] border border-red-500/15 rounded-2xl p-6 space-y-5 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center">
                <Plus className="w-4 h-4 text-[#FF1C1C]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Create Custom Task</h3>
                <p className="text-xs text-zinc-500">Define a custom milestone, award XP, attach badges, and assign to team members</p>
              </div>
            </div>
            <button
              onClick={() => setShowTaskPanel(false)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-zinc-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title English */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Task Title (English)</label>
              <input
                type="text"
                value={taskTitleEn}
                onChange={e => setTaskTitleEn(e.target.value)}
                placeholder="e.g. Squash Production DB Connection Leak"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-all"
              />
            </div>

            {/* Title Arabic */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Task Title (Arabic)</label>
              <input
                type="text"
                value={taskTitleAr}
                onChange={e => setTaskTitleAr(e.target.value)}
                placeholder="مثال: حل مشكلة تسريب اتصال قاعدة البيانات"
                dir="rtl"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Description English */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description (English)</label>
              <textarea
                value={taskDescEn}
                onChange={e => setTaskDescEn(e.target.value)}
                rows={3}
                placeholder="Describe the objective and requirements of this custom task..."
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-all resize-none"
              />
            </div>

            {/* Description Arabic */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Description (Arabic)</label>
              <textarea
                value={taskDescAr}
                onChange={e => setTaskDescAr(e.target.value)}
                rows={3}
                placeholder="صف أهداف ومتطلبات هذه المهمة الخاصة..."
                dir="rtl"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500/30 focus:ring-1 focus:ring-red-500/20 transition-all resize-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Category</label>
              <select
                value={taskCategory}
                onChange={e => setTaskCategory(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/30 transition-all"
              >
                <option value="team_contributions" className="bg-[#111116] text-white">Team Contributions</option>
                <option value="project_portfolio" className="bg-[#111116] text-white">Project & Portfolio</option>
                <option value="profile_completeness" className="bg-[#111116] text-white">Profile Completeness</option>
              </select>
            </div>

            {/* XP Value */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">XP Value</label>
              <input
                type="number"
                value={taskXpValue}
                onChange={e => setTaskXpValue(Math.max(10, parseInt(e.target.value) || 0))}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/30 transition-all"
              />
            </div>

            {/* Badge Reward */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Badge Reward (Optional)</label>
              <select
                value={taskBadgeRewardId}
                onChange={e => setTaskBadgeRewardId(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/30 transition-all"
              >
                <option value="" className="bg-[#111116] text-white">No Badge Reward</option>
                {allBadges.map(badge => (
                  <option key={badge.id} value={badge.id} className="bg-[#111116] text-white">
                    {badge.name_en} (+{badge.xp_reward} XP)
                  </option>
                ))}
              </select>
            </div>

            {/* Assign To */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Assign To</label>
              <select
                value={taskAssignTo}
                onChange={e => setTaskAssignTo(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500/30 transition-all"
              >
                <option value="none" className="bg-[#111116] text-white">No one yet (Listed as pending)</option>
                <option value="all" className="bg-[#111116] text-white">All Team Members</option>
                {membersList.map(m => (
                  <option key={m.id} value={m.id} className="bg-[#111116] text-white">
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={handleCreateTask}
              disabled={isCreatingTask || !taskTitleEn.trim() || !taskTitleAr.trim()}
              className="flex items-center gap-2 bg-[#FF1C1C] hover:bg-[#d91212] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-950/15"
            >
              {isCreatingTask ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating Task...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  Create &amp; Assign Task
                </>
              )}
            </button>
            <span className="text-xs text-zinc-500">
              {taskAssignTo === 'none' && '→ Custom task will not be assigned to anyone yet'}
              {taskAssignTo === 'all' && '→ Will be assigned to all team members as Pending Review'}
              {taskAssignTo !== 'none' && taskAssignTo !== 'all' && `→ Will be assigned to ${membersList.find(m => m.id === taskAssignTo)?.name} as Pending Review`}
            </span>
          </div>

          {/* Feedback Banners */}
          {taskError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              {taskError}
            </div>
          )}

          {taskResult && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              Custom task created and assigned successfully!
            </div>
          )}
        </div>
      )}

      {/* Main layout: Grid splits list and detailed panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Developer List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xs font-bold text-zinc-500 tracking-wider uppercase px-1">Team Members</h2>
          
          <div className="space-y-3">
            {membersList.map((member) => {
              const isSelected = member.id === selectedMemberId;
              const isSelf = member.id === loggedInMemberId;
              const completedCount = (memberTasksMap[member.id] || []).filter(item => item.isCompleted).length;
              const badgeCount = memberBadgesMap[member.id]?.length || 0;
              const mProgress = getLevelProgress(member.xp);

              return (
                <div
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#1c1c24] to-[#121219] border-[#FF1C1C] shadow-md shadow-red-950/10'
                      : 'bg-[#111116] border-white/5 hover:border-white/10 hover:bg-white/[0.01]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Photo */}
                    <div className={`relative w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 ${
                      isSelected ? 'border-[#FF1C1C]' : 'border-white/10 group-hover:border-white/20'
                    }`}>
                      <Image 
                        src={member.photo_url || '/placeholder.png'} 
                        alt={member.name} 
                        fill 
                        className="object-cover" 
                        sizes="48px"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-bold text-white truncate leading-tight">{member.name}</h3>
                        {isSelf && (
                          <span className="px-1.5 py-0.5 text-[8px] bg-[#FF1C1C]/10 text-[#FF1C1C] border border-[#FF1C1C]/25 rounded font-black uppercase">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 truncate mt-0.5">{member.role_en}</p>
                    </div>

                    {/* Level Pill */}
                    <div className="text-right shrink-0">
                      <span className="px-2 py-0.5 text-[10px] font-black rounded-md bg-[#FF1C1C] text-white">
                        Lvl {mProgress.level}
                      </span>
                      <span className="text-[10px] text-zinc-400 block mt-1 font-bold">{member.xp} XP</span>
                    </div>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="mt-3.5 space-y-1">
                    <div className="flex justify-between text-[9px] text-zinc-500 font-bold">
                      <span>Tasks: {completedCount} / {allTasksList.length}</span>
                      <span>Badges: {badgeCount}</span>
                    </div>
                    <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#FF1C1C] to-red-500 rounded-full transition-all duration-500" 
                        style={{ width: `${mProgress.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Detailed Progress & Tasks checklist of Selected Dev */}
        <div className="lg:col-span-2 space-y-6">
          {selectedMember ? (
            <div className="bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              
              {/* Profile Card Header */}
              <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-white/10">
                    <Image 
                      src={selectedMember.photo_url || '/placeholder.png'} 
                      alt={selectedMember.name} 
                      fill 
                      className="object-cover" 
                      sizes="64px"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white leading-tight">{selectedMember.name}</h2>
                    <p className="text-sm text-[#FF1C1C] font-semibold mt-0.5">{selectedMember.role_en}</p>
                    {selectedMember.github_username && (
                      <span className="text-xs text-zinc-500 block mt-1">GitHub Sync: @{selectedMember.github_username}</span>
                    )}
                  </div>
                </div>

                {/* Level metrics details */}
                {progress && (
                  <div className="bg-black/30 border border-white/5 rounded-xl p-4 flex items-center gap-4 min-w-[200px] justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Milestone</span>
                      <span className="text-xl font-heading font-extrabold text-white">Level {progress.level}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-black block">Total Balance</span>
                      <span className="text-xl font-bold text-[#FF1C1C]">{selectedMember.xp} XP</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Progress bar details */}
              {progress && (
                <div className="bg-black/20 border border-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-xs text-zinc-400 font-bold">
                    <span>Progress to Next Level</span>
                    <span>
                      {progress.level === 5 ? 'Max Level Reached' : `${selectedMember.xp} / ${progress.nextLevelXp} XP`}
                    </span>
                  </div>
                  <div className="w-full bg-black/40 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FF1C1C] via-[#ff8a80] to-red-500 rounded-full transition-all duration-700" 
                      style={{ width: `${progress.progressPercent}%` }}
                    />
                  </div>
                  {progress.level < 5 && (
                    <p className="text-[10px] text-zinc-500 text-right">
                      {progress.nextLevelXp - selectedMember.xp} XP remaining to Level {progress.level + 1}
                    </p>
                  )}
                </div>
              )}

              {/* Tabs selector */}
              <div className="flex border-b border-white/5 p-1 bg-black/20 rounded-xl">
                <button
                  onClick={() => setActiveTab('tasks')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'tasks'
                      ? 'bg-[#FF1C1C] text-white shadow shadow-red-950/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Tasks Checklist ({selectedCompletedTaskIds.length} completed)
                </button>
                <button
                  onClick={() => setActiveTab('badges')}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    activeTab === 'badges'
                      ? 'bg-[#FF1C1C] text-white shadow shadow-red-950/10'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Badges collection ({selectedEarnedBadgeIds.length} unlocked)
                </button>
              </div>

              {/* TAB 1: Tasks Checklist */}
              {activeTab === 'tasks' && (
                <div className="space-y-4">
                  {/* Informational Warning Banner if not team lead */}
                  {!isLead ? (
                    <div className="p-3.5 bg-black/40 border border-white/5 text-zinc-400 rounded-xl text-xs flex items-center gap-3">
                      <Lock className="w-4 h-4 text-studio-red shrink-0" />
                      <p>
                        Only the **Team Lead (Ahmed Azam)** is authorized to manually toggle task completions. 
                        Regular developers can earn XP automatically by linking and updating GitHub activities.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 shrink-0" />
                      <p className="font-semibold">
                        Team Lead access active. Click any task below to toggle completion status and award/revoke XP instantly.
                      </p>
                    </div>
                  )}

                  {/* Tasks List */}
                  <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {allTasksList
                      .filter((task) => {
                        // Standard tasks are shown to everyone
                        if (!task.id.startsWith('custom-')) return true;
                        // Custom tasks are only shown if assigned to the selected developer
                        return selectedAssignedTaskIds.includes(task.id);
                      })
                      .map((task) => {
                        const isAssigned = selectedAssignedTaskIds.includes(task.id);
                        const isCompleted = selectedCompletedTaskIds.includes(task.id);
                        const isPending = task.id.startsWith('custom-') && isAssigned && !isCompleted;
                        const isUpdating = updatingTaskId === task.id;

                        return (
                          <div
                            key={task.id}
                            onClick={() => handleToggleTask(task.id)}
                            className={`flex items-start justify-between gap-4 p-4 rounded-xl border transition-all ${
                              isLead 
                                ? 'cursor-pointer hover:bg-white/[0.02]' 
                                : ''
                            } ${
                              isCompleted
                                ? 'bg-emerald-500/[0.01] border-emerald-500/10 hover:border-emerald-500/25'
                                : isPending
                                  ? 'bg-amber-500/[0.01] border-amber-500/10 hover:border-amber-500/25'
                                  : 'bg-black/10 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Checkbox Icon */}
                              <div className="mt-0.5 shrink-0">
                                {isUpdating ? (
                                  <Loader2 className="w-5 h-5 animate-spin text-studio-red" />
                                ) : isCompleted ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                ) : isPending ? (
                                  <div className="w-5 h-5 rounded-full border-2 border-amber-500/80 bg-amber-500/5 flex items-center justify-center animate-pulse shrink-0" title="Pending Review">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                  </div>
                                ) : (
                                  <div className={`w-5 h-5 rounded-full border-2 ${
                                    isLead ? 'border-zinc-600 group-hover:border-studio-red' : 'border-zinc-800'
                                  }`} />
                                )}
                              </div>
                              
                              {/* Title & Localized Info */}
                              <div>
                                <h4 className={`font-bold text-sm leading-tight ${
                                  isCompleted ? 'text-white' : 'text-zinc-400'
                                }`}>
                                  {task.title_en}
                                </h4>
                                <p className="text-zinc-500 text-[10px] font-semibold mt-0.5" dir="rtl">
                                  {task.title_ar}
                                </p>
                                <p className="text-zinc-400 text-xs mt-1.5 leading-normal">{task.description_en}</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="px-2 py-0.5 text-[8px] bg-black/40 text-zinc-500 font-bold border border-white/5 rounded-md">
                                    {task.category}
                                  </span>
                                  {isPending && (
                                    <span className="px-2 py-0.5 text-[8px] bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30 rounded-md">
                                      Pending Review
                                    </span>
                                  )}
                                  {task.badge_reward_id && (
                                    <span className="px-2 py-0.5 text-[8px] bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 rounded-md flex items-center gap-1">
                                      <Zap className="w-2.5 h-2.5" />
                                      Unlocks Badge
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Right Column: XP Value & Delete Action */}
                            <div className="shrink-0 flex flex-col items-end gap-2">
                              <span className={`font-bold text-xs ${
                                isCompleted ? 'text-emerald-400' : isPending ? 'text-amber-400' : 'text-zinc-500'
                              }`}>
                                +{task.xp_value} XP
                              </span>
                              
                              {isLead && task.id.startsWith('custom-') && (
                                <button
                                  onClick={(e) => handleDeleteTask(task.id, e)}
                                  disabled={deletingTaskId === task.id}
                                  className="p-1 text-zinc-500 hover:text-red-500 hover:bg-white/5 rounded transition-colors disabled:opacity-50"
                                  title="Delete Custom Task"
                                >
                                  {deletingTaskId === task.id ? (
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  ) : (
                                    <Trash2 className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* TAB 2: Badges collection */}
              {activeTab === 'badges' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-1">
                  {allBadges.map((badge) => {
                    const isEarned = selectedEarnedBadgeIds.includes(badge.id);

                    return (
                      <div
                        key={badge.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 ${
                          isEarned
                            ? 'bg-[#FF1C1C]/[0.02] border-[#FF1C1C]/20 shadow-md shadow-red-950/5'
                            : 'bg-black/10 border-white/5 opacity-40 grayscale'
                        }`}
                      >
                        {/* Icon circle */}
                        <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                          isEarned
                            ? 'bg-[#FF1C1C]/10 border-[#FF1C1C]/35 text-[#FF1C1C]'
                            : 'bg-white/5 border-white/10 text-zinc-600'
                        }`}>
                          <DynamicBadgeIcon name={badge.icon_url} className="w-4 h-4" />
                        </div>

                        {/* Title & Desc */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-bold text-white text-sm leading-tight truncate">{badge.name_en}</h4>
                            <span className={`px-1.5 py-0.5 text-[7px] font-black rounded uppercase ${
                              isEarned ? 'bg-[#FF1C1C]/15 text-[#FF1C1C]' : 'bg-white/5 text-zinc-500'
                            }`}>
                              {isEarned ? 'Earned' : 'Locked'}
                            </span>
                          </div>
                          <p className="text-zinc-500 text-[10px] mt-0.5 truncate">{badge.name_ar}</p>
                          <p className="text-zinc-400 text-xs mt-1 leading-normal line-clamp-2">{badge.description_en}</p>
                          
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[9px] text-zinc-500 font-bold">
                              Trigger: <span className="text-zinc-400">{badge.trigger_type}</span>
                            </span>
                            <span className="text-[9px] text-[#FF1C1C] font-extrabold">
                              +{badge.xp_reward} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>
          ) : (
            <div className="bg-[#111116] border border-white/10 rounded-2xl p-12 text-center">
              <Trophy className="w-12 h-12 text-zinc-600 mx-auto mb-4 animate-bounce" />
              <h2 className="text-lg font-bold text-white">Select a Team Member</h2>
              <p className="text-zinc-500 text-sm mt-1">Choose a developer from the left side panel to review and manage their profile progress.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
