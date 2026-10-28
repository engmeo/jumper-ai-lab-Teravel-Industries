import { createClient } from '@supabase/supabase-js';

function send(res, status, body) { return res.status(status).json(body); }
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return send(res, 401, { error: 'Cần đăng nhập quản lý.' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return send(res, 500, { error: 'Thiếu cấu hình Supabase phía máy chủ.' });
  const adminClient = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await adminClient.auth.getUser(token);
  if (authError || !authData.user) return send(res, 401, { error: 'Phiên đăng nhập không hợp lệ.' });
  const { data: caller, error: profileError } = await adminClient.from('profiles').select('role,active').eq('id', authData.user.id).single();
  if (profileError || caller?.role !== 'admin' || caller?.active !== true) return send(res, 403, { error: 'Chỉ quản lý mới được tạo tài khoản.' });
  const { email, password, display_name, group_id } = req.body || {};
  if (!email || !/^\S+@\S+\.\S+$/.test(email) || typeof password !== 'string' || password.length < 12 || !display_name || !['A','B','C','D','E'].includes(group_id)) {
    return send(res, 400, { error: 'Cần email hợp lệ, mật khẩu từ 12 ký tự, tên hiển thị và nhóm A–E.' });
  }
  const { data: created, error: createError } = await adminClient.auth.admin.createUser({ email: email.trim().toLowerCase(), password, email_confirm: true, user_metadata: { display_name } });
  if (createError) return send(res, 400, { error: createError.message });
  const { error: upsertError } = await adminClient.from('profiles').upsert({ id: created.user.id, email: email.trim().toLowerCase(), display_name: display_name.trim(), role: 'member', group_id, active: true });
  if (upsertError) {
    await adminClient.auth.admin.deleteUser(created.user.id);
    return send(res, 500, { error: 'Tạo hồ sơ thất bại: ' + upsertError.message });
  }
  return send(res, 201, { user: { id: created.user.id, email: email.trim().toLowerCase(), display_name: display_name.trim(), role: 'member', group_id, active: true } });
}
