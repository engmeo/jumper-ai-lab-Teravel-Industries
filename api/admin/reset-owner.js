
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secret = process.env.OWNER_RESET_SECRET;
  if (!secret || req.headers['x-reset-secret'] !== secret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { password } = req.body || {};
  if (typeof password !== 'string' || password.length < 12) {
    return res.status(400).json({ error: 'Password must be at least 12 characters' });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );

  const { error } = await supabase.auth.admin.updateUserById(
    '50dd5b31-6f06-49ad-bdfa-50ee72124088',
    { password }
  );

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ success: true });
}
