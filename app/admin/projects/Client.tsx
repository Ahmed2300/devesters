'use client';

import { useState } from 'react';
import { PlusCircle, Link as LinkIcon, Star, X, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [projectToDelete, setProjectToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const supabase = createClient();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    tech: '',
    icon: '',
    custom_icon: '',
    featured: false,
    cover_image: true,
    covers: {
      landscape: '',
      portrait: '',
      square: ''
    },
    link: '',
    preview_url: ''
  });

  const handleOpenModal = (project?: any) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        tech: project.tech ? project.tech.join(', ') : '',
        icon: project.icon || '',
        custom_icon: project.custom_icon || '',
        featured: project.featured || false,
        cover_image: project.cover_image ?? true,
        covers: project.covers || { landscape: '', portrait: '', square: '' },
        link: project.link || '',
        preview_url: project.preview_url || ''
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        tech: '',
        icon: '',
        custom_icon: '',
        featured: false,
        cover_image: true,
        covers: { landscape: '', portrait: '', square: '' },
        link: '',
        preview_url: ''
      });
    }
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleDeleteClick = (project: any) => {
    setProjectToDelete(project);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('projects').delete().eq('id', projectToDelete.id);
      if (error) throw error;
      setProjects(projects.filter(p => p.id !== projectToDelete.id));
      setProjectToDelete(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formattedData = {
      ...formData,
      tech: formData.tech.split(',').map((t) => t.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        const { data, error } = await supabase
          .from('projects')
          .update(formattedData)
          .eq('id', editingProject.id)
          .select()
          .single();
        if (error) throw error;
        setProjects(projects.map(p => p.id === editingProject.id ? data : p));
      } else {
        const { data, error } = await supabase
          .from('projects')
          .insert(formattedData)
          .select()
          .single();
        if (error) throw error;
        setProjects([data, ...projects]);
      }
      handleCloseModal();
      router.refresh(); // Refresh the main layout if necessary
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 relative">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Projects</h1>
        <button 
          onClick={() => handleOpenModal()} 
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors"
        >
          <PlusCircle className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="bg-[#111116] border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#1a1a24] border-b border-white/10 text-xs uppercase tracking-wider text-zinc-400">
              <tr>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Tech Stack</th>
                <th className="px-6 py-4 font-medium">Featured</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No projects found. Add your first one to get started.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">
                      {project.title}
                      {project.preview_url && (
                        <a href={project.preview_url} target="_blank" rel="noopener noreferrer" className="ml-2 text-zinc-500 hover:text-white inline-flex items-center">
                          <LinkIcon className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{project.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tech?.slice(0, 3).map((t: string) => (
                          <span key={t} className="text-[10px] uppercase font-bold bg-white/10 px-2 py-0.5 rounded text-zinc-300">
                            {t}
                          </span>
                        ))}
                        {(project.tech?.length || 0) > 3 && <span className="text-[10px] text-zinc-500">+{project.tech.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {project.featured ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> : <Star className="w-4 h-4" />}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleOpenModal(project)} className="text-sm text-zinc-400 hover:text-white mr-4">Edit</button>
                      <button onClick={() => handleDeleteClick(project)} className="text-sm text-[#FF1C1C] hover:text-red-400">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#111116] border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-[#111116] z-10">
              <h2 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={handleCloseModal} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {error && <div className="p-4 bg-red-500/10 text-red-400 rounded-lg text-sm">{error}</div>}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Category</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors h-24 resize-none" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-400">Tech Stack (comma separated)</label>
                <input type="text" value={formData.tech} onChange={e => setFormData({...formData, tech: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" placeholder="Next.js, Tailwind CSS, TypeScript" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Cover Image URL</label>
                  <input type="text" value={formData.covers.landscape} onChange={e => setFormData({...formData, covers: { ...formData.covers, landscape: e.target.value, portrait: e.target.value, square: e.target.value }})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Custom Icon URL</label>
                  <input type="text" value={formData.custom_icon} onChange={e => setFormData({...formData, custom_icon: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Project Link</label>
                  <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Preview URL</label>
                  <input type="text" value={formData.preview_url} onChange={e => setFormData({...formData, preview_url: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-studio-red transition-colors" />
                </div>
              </div>

              <div className="pt-2 flex items-center">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="sr-only" />
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.featured ? 'bg-studio-red border-studio-red' : 'border-zinc-500'}`}>
                      {formData.featured && <Check className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  <span className="text-sm font-medium text-zinc-300">Featured Project</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#111116] border border-white/10 rounded-xl w-full max-w-sm overflow-hidden text-center p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Project</h3>
              <p className="text-zinc-400 text-sm">
                Are you sure you want to delete <span className="font-semibold text-white">{projectToDelete.title}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setProjectToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium bg-[#FF1C1C] text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
