import { createClient } from '@/lib/supabase/server';
import SettingsClient from './Client';

export const dynamic = 'force-dynamic';

export default async function AdminSettings() {
  const supabase = await createClient();
  
  // Need to handle if table doesn't exist yet so admin page doesn't crash
  let settings = null;
  let error = null;
  
  try {
    const { data, error: err } = await supabase
      .from('settings')
      .select('*')
      .eq('id', 1)
      .single();
      
    if (err && err.code !== 'PGRST116') { // PGRST116 is no rows
      // Might be that table doesn't exist
      error = err;
    } else {
      settings = data;
    }
  } catch (err: any) {
    error = err;
  }

  return <SettingsClient initialSettings={settings} error={error ? error.message : null} />;
}
