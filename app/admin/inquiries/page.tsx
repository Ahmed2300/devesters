import { createClient } from '@/lib/supabase/server';
import { Briefcase } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminInquiries() {
  const supabase = await createClient();
  const { data: inquiries, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">Inquiries</h1>
      </div>
      <div className="bg-[#111116] border border-white/10 rounded-xl overflow-hidden p-6">
         {error ? (
           <p className="text-red-400">Error loading: {error.message}</p>
         ) : inquiries?.length === 0 ? (
           <p className="text-zinc-500">No inquiries found.</p>
         ) : (
           <div className="space-y-4">
             {inquiries?.map(iq => (
               <div key={iq.id} className="border border-white/10 p-4 rounded-xl bg-white/5 flex flex-col gap-2">
                 <p className="font-bold">{iq.name} <span className="text-zinc-400 text-sm font-normal">({iq.email})</span></p>
                 <p className="text-sm">Budget: {iq.budget}</p>
                 <p className="text-sm">Details: {iq.project_details}</p>
               </div>
             ))}
           </div>
         )}
      </div>
    </div>
  );
}
