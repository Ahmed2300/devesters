'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsClient({ initialSettings, error: initialError }: { initialSettings: any, error: string | null }) {
  const supabase = createClient();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError || '');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    site_title: initialSettings?.site_title || 'Devesters',
    site_description: initialSettings?.site_description || '',
    contact_email: initialSettings?.contact_email || '',
    contact_phone: initialSettings?.contact_phone || '',
    github_url: initialSettings?.github_url || '',
    linkedin_url: initialSettings?.linkedin_url || '',
    twitter_url: initialSettings?.twitter_url || '',
    hero_title: initialSettings?.hero_title || '',
    hero_subtitle: initialSettings?.hero_subtitle || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');
    
    try {
      if (initialSettings) {
        // Update existing
        const { error: err } = await supabase
          .from('settings')
          .update(formData)
          .eq('id', 1);
          
        if (err) throw err;
      } else {
        // Create new
        const { error: err } = await supabase
          .from('settings')
          .insert([{ id: 1, ...formData }]);
          
        if (err) throw err;
      }
      
      setSuccessMessage('Settings updated successfully!');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving settings');
    } finally {
      setLoading(false);
    }
  };

  if (initialError?.includes('relation "public.settings" does not exist')) {
    return (
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">General Settings</h1>
        <div className="bg-[#FF1C1C]/10 border border-[#FF1C1C]/20 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <AlertCircle className="w-12 h-12 text-[#FF1C1C] mb-4" />
          <h2 className="text-xl font-bold text-white mb-2">Settings Table Missing</h2>
          <p className="text-zinc-400 max-w-md">
            The settings table does not exist in your Supabase database yet. 
            Please run the updated SQL commands from <code className="bg-black/50 px-2 py-1 rounded">supabase/schema.sql</code> in your Supabase SQL Editor.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">General Settings</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-white text-black hover:bg-zinc-200 transition-colors py-2 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </div>

      {error && !error.includes('relation "public.settings" does not exist') && (
        <div className="mb-8 p-4 text-sm text-[#FF1C1C] bg-[#FF1C1C]/10 border border-[#FF1C1C]/20 rounded-lg">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-8 p-4 text-sm text-green-500 bg-green-500/10 border border-green-500/20 rounded-lg">
          {successMessage}
        </div>
      )}

      <div className="space-y-8">
        <section className="bg-[#111116] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Site Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Site Title</label>
              <input
                type="text"
                value={formData.site_title}
                onChange={e => setFormData({...formData, site_title: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Site Description</label>
              <textarea
                value={formData.site_description}
                onChange={e => setFormData({...formData, site_description: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#111116] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Hero Section</h2>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Hero Title (leave blank for default)</label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={e => setFormData({...formData, hero_title: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                placeholder="e.g. Building the Future of Web"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Hero Subtitle</label>
              <textarea
                value={formData.hero_subtitle}
                onChange={e => setFormData({...formData, hero_subtitle: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors h-24 resize-none"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#111116] border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Contact & Social Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Contact Email</label>
              <input
                type="email"
                value={formData.contact_email}
                onChange={e => setFormData({...formData, contact_email: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Contact Phone</label>
              <input
                type="text"
                value={formData.contact_phone}
                onChange={e => setFormData({...formData, contact_phone: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={e => setFormData({...formData, linkedin_url: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">GitHub URL</label>
              <input
                type="url"
                value={formData.github_url}
                onChange={e => setFormData({...formData, github_url: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-400">Twitter/X URL</label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={e => setFormData({...formData, twitter_url: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
