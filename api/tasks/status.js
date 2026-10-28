import { createClient } from '@supabase/supabase-js';
function send(res, status, body) { return res.status(status).json(body); }
export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' });
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!token) return send(res, 401, { error: 'Cần đăng nhập.' });
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return send(res, 500, { error: 'Thiếu cấu hình máy chủ.' });
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data: authData, error: authError } = await db.auth.getUser(token);
  if (authError || !authData.user) return send(res, 401, { error: 'Phiên đăng nhập không hợp lệ.' });
  const { data: profile } = await db.from('profiles').select('role,active,group_id').eq('id', authData.user.id).single();
  if (!profile?.active) return send(res, 403, { error: 'Tài khoản đã bị khóa.' });
  const { task_id, status } = req.body || {};
  if (!task_id || !['Chưa bắt đầu','Đang làm','Chờ review','Hoàn thành'].includes(status)) return send(res, 400, { error: 'Dữ liệu không hợp lệ.' });
  const { data: task, error: taskError } = await db.from('tasks').select('id,group_id,assignee_id').eq('id', task_id).single();
  if (taskError || !task) return send(res, 404, { error: 'Không tìm thấy nhiệm vụ.' });
  if (profile.role !== 'admin' && task.assignee_id !== authData.user.id && task.group_id !== profile.group_id) return send(res, 403, { error: 'Không có quyền cập nhật nhiệm vụ này.' });
  const { error } = await db.from('tasks').update({ status, updated_at: new Date().toISOString() }).eq('id', task_id);
  if (error) return send(res, 500, { error: error.message });
  return send(res, 200, { ok: true });
}
