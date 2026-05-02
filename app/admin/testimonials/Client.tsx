'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Plus, Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const supabase = createClient();
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [testimonialToDelete, setTestimonialToDelete] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    client_name: '',
    client_role: '',
    review: ''
  });

  const handleOpenModal = (testimonial?: any) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData({
        client_name: testimonial.client_name || '',
        client_role: testimonial.client_role || '',
        review: testimonial.review || ''
      });
    } else {
      setEditingTestimonial(null);
      setFormData({
        client_name: '',
        client_role: '',
        review: ''
      });
    }
    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTestimonial(null);
  };

  const handleDeleteClick = (testimonial: any) => {
    setTestimonialToDelete(testimonial);
  };

  const confirmDelete = async () => {
    if (!testimonialToDelete) return;
    setIsDeleting(true);
    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', testimonialToDelete.id);
      if (error) throw error;
      setTestimonials(testimonials.filter(t => t.id !== testimonialToDelete.id));
      setTestimonialToDelete(null);
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

    try {
      if (editingTestimonial) {
        const { data, error } = await supabase
          .from('testimonials')
          .update(formData)
          .eq('id', editingTestimonial.id)
          .select()
          .single();

        if (error) throw error;
        setTestimonials(testimonials.map(t => t.id === editingTestimonial.id ? data : t));
      } else {
        const { data, error } = await supabase
          .from('testimonials')
          .insert([formData])
          .select()
          .single();

        if (error) throw error;
        setTestimonials([data, ...testimonials]);
      }
      handleCloseModal();
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Testimonials</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-white text-black hover:bg-zinc-200 transition-colors py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="bg-[#111116] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search testimonials..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/50 text-zinc-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">CLIENT NAME</th>
                <th className="px-6 py-4 font-medium">ROLE</th>
                <th className="px-6 py-4 font-medium">REVIEW</th>
                <th className="px-6 py-4 font-medium">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                    No testimonials found. Click &quot;Add Testimonial&quot; to create one.
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-medium text-white">
                      {testimonial.client_name}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {testimonial.client_role}
                    </td>
                    <td className="px-6 py-4 text-zinc-400 max-w-xs truncate">
                      {testimonial.review}
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleOpenModal(testimonial)} className="text-sm text-zinc-400 hover:text-white mr-4">Edit</button>
                      <button onClick={() => handleDeleteClick(testimonial)} className="text-sm text-[#FF1C1C] hover:text-red-400">Delete</button>
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
          <div className="bg-[#111116] border border-white/10 rounded-xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="mb-6 p-4 text-sm text-[#FF1C1C] bg-[#FF1C1C]/10 border border-[#FF1C1C]/20 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Client Name</label>
                    <input
                      type="text"
                      required
                      value={formData.client_name}
                      onChange={e => setFormData({...formData, client_name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-400">Client Role</label>
                    <input
                      type="text"
                      required
                      value={formData.client_role}
                      onChange={e => setFormData({...formData, client_role: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="e.g. CEO, Example Corp"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-400">Review</label>
                  <textarea
                    required
                    value={formData.review}
                    onChange={e => setFormData({...formData, review: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/30 transition-colors h-32 resize-none"
                    placeholder="Describe their experience..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {testimonialToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#111116] border border-white/10 rounded-xl w-full max-w-sm overflow-hidden text-center p-6 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Testimonial</h3>
              <p className="text-zinc-400 text-sm">
                Are you sure you want to delete the testimonial from <span className="font-semibold text-white">{testimonialToDelete.client_name}</span>? This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setTestimonialToDelete(null)}
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
                {isDeleting ? 'Deleting...' : 'Delete Testimonial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
