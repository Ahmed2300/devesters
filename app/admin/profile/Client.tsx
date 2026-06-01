'use client';

import { useState } from 'react';
import { User, Mail, Globe, Github, Linkedin, Instagram, Camera, Loader2, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { uploadToImgBB } from '@/lib/storage/imgbb';
import { useRouter } from 'next/navigation';

interface ProfileClientProps {
  initialProfile: any;
}

export default function ProfileClient({ initialProfile }: ProfileClientProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Form State
  const [formData, setFormData] = useState({
    name: profile.name || '',
    role_en: profile.role_en || '',
    role_ar: profile.role_ar || '',
    bio_en: profile.bio_en || '',
    bio_ar: profile.bio_ar || '',
    photo_url: profile.photo_url || '',
    github_username: profile.github_username || '',
    linkedin_url: profile.linkedin_url || '',
    github_url: profile.github_url || '',
    instagram_url: profile.instagram_url || '',
    email: profile.email || '',
    portfolio_url: profile.portfolio_url || '',
    skills: profile.skills ? profile.skills.join(', ') : ''
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    setSuccess(false);

    try {
      // 1. Upload file using our secure ImgBB helper
      const directUrl = await uploadToImgBB(file);
      
      // 2. Set the uploaded photo URL in state
      setFormData(prev => ({ ...prev, photo_url: directUrl }));
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to upload profile photo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSuccess(false);

    // Format skills tags back into array of strings
    const formattedSkills = formData.skills
      .split(',')
      .map((skill: string) => skill.trim())
      .filter(Boolean);

    const updatePayload = {
      name: formData.name,
      role_en: formData.role_en,
      role_ar: formData.role_ar,
      bio_en: formData.bio_en,
      bio_ar: formData.bio_ar,
      photo_url: formData.photo_url,
      github_username: formData.github_username,
      linkedin_url: formData.linkedin_url,
      github_url: formData.github_url,
      instagram_url: formData.instagram_url,
      email: formData.email,
      portfolio_url: formData.portfolio_url,
      skills: formattedSkills,
      updated_at: new Date().toISOString()
    };

    try {
      // Update DB row matching our member profile id
      const { data, error: updateError } = await supabase
        .from('members')
        .update(updatePayload)
        .eq('id', profile.id)
        .select()
        .single();

      if (updateError) throw updateError;

      setProfile(data);
      setSuccess(true);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Failed to save profile information');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
          <User className="w-5 h-5 text-studio-red" />
        </div>
        <div>
          <h1 className="text-3xl font-heading font-bold text-white">My Profile</h1>
          <p className="text-sm text-zinc-400">Manage your developer profile info, skills, bio, and social links.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-[#111116] border border-white/10 rounded-2xl p-6 md:p-8">
        {/* Status Banners */}
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            Profile saved successfully!
          </div>
        )}

        {/* Profile Header & Photo Upload */}
        <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-white/5">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 bg-black/50 group shrink-0">
            {formData.photo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={formData.photo_url} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-500">
                <User className="w-10 h-10" />
              </div>
            )}
            
            <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              {isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-white" />
              ) : (
                <Camera className="w-5 h-5 text-white" />
              )}
              <input type="file" accept="image/*" onChange={handleImageUpload} disabled={isUploading} className="hidden" />
            </label>
          </div>
          
          <div className="text-center md:text-left space-y-1.5">
            <h3 className="text-lg font-bold text-white">Profile Photo</h3>
            <p className="text-xs text-zinc-500 leading-normal max-w-sm">
              Hover over the circle to upload a new avatar. JPG or PNG formats supported. Automatically uploaded to ImgBB CDN.
            </p>
          </div>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors text-left"
              dir="ltr"
              placeholder="e.g. Ahmed Azam"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Role (English)</label>
            <input
              required
              type="text"
              value={formData.role_en}
              onChange={e => setFormData({ ...formData, role_en: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors text-left"
              dir="ltr"
              placeholder="e.g. Lead Frontend Engineer"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Role (Arabic)</label>
            <input
              required
              type="text"
              value={formData.role_ar}
              onChange={e => setFormData({ ...formData, role_ar: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors text-right font-cairo"
              dir="rtl"
              placeholder="e.g. مهندس واجهات أمامية أول"
            />
          </div>
        </div>

        {/* Biographies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Bio (English)</label>
            <textarea
              required
              rows={4}
              value={formData.bio_en}
              onChange={e => setFormData({ ...formData, bio_en: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors resize-none text-left"
              dir="ltr"
              placeholder="Write a short summary of your background and expertise in English..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Bio (Arabic)</label>
            <textarea
              required
              rows={4}
              value={formData.bio_ar}
              onChange={e => setFormData({ ...formData, bio_ar: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors resize-none text-right font-cairo"
              dir="rtl"
              placeholder="اكتب نبذة مختصرة عن خلفيتك وخبراتك باللغة العربية..."
            />
          </div>
        </div>

        {/* Skills & Portfolio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Skills Tags (comma separated)</label>
            <input
              type="text"
              value={formData.skills}
              onChange={e => setFormData({ ...formData, skills: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors text-left"
              dir="ltr"
              placeholder="e.g. Flutter, React, Next.js, TypeScript, AI Tools"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Contact Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors text-left"
                dir="ltr"
                placeholder="developer@devesters.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Portfolio Link</label>
            <div className="relative">
              <Globe className="absolute left-4 top-3.5 w-4 h-4 text-zinc-500" />
              <input
                type="url"
                value={formData.portfolio_url}
                onChange={e => setFormData({ ...formData, portfolio_url: e.target.value })}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:border-studio-red transition-colors text-left"
                dir="ltr"
                placeholder="https://myportfolio.com"
              />
            </div>
          </div>
        </div>

        {/* Social Accounts */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">Social & Git Accounts</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">GitHub Profile URL</label>
              <div className="relative">
                <Github className="absolute left-4 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-studio-red transition-colors text-sm text-left"
                  dir="ltr"
                  placeholder="https://github.com/myusername"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">GitHub Username (for Auto-Tracker)</label>
              <div className="relative">
                <Github className="absolute left-4 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={formData.github_username}
                  onChange={e => setFormData({ ...formData, github_username: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-studio-red transition-colors text-sm text-left"
                  dir="ltr"
                  placeholder="myusername"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">LinkedIn URL</label>
              <div className="relative">
                <Linkedin className="absolute left-4 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="url"
                  value={formData.linkedin_url}
                  onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-studio-red transition-colors text-sm text-left"
                  dir="ltr"
                  placeholder="https://linkedin.com/in/myprofile"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-zinc-500">Instagram URL</label>
              <div className="relative">
                <Instagram className="absolute left-4 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="url"
                  value={formData.instagram_url}
                  onChange={e => setFormData({ ...formData, instagram_url: e.target.value })}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-studio-red transition-colors text-sm text-left"
                  dir="ltr"
                  placeholder="https://instagram.com/myusername"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Form Action */}
        <div className="flex justify-end pt-4 border-t border-white/5">
          <button
            type="submit"
            disabled={isSaving || isUploading}
            className="bg-white text-black hover:bg-zinc-200 transition-colors py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving Profile...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
