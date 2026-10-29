# Jumper AI Lab — Vercel + Supabase

Website giao nhiệm vụ cho 5 nhóm A–E, đăng nhập bằng email/mật khẩu, quản lý tài khoản theo vai trò Admin/Member, cập nhật trạng thái và đồng bộ giữa các máy qua Supabase. Frontend deploy trên Vercel; Supabase cung cấp Auth + PostgreSQL. Không cần máy tính của quản lý bật 24/7.

> Đây là bộ mã nguồn để triển khai vào tài khoản của bạn; ChatGPT không thể tự tạo project trong Vercel/Supabase thay bạn. Cần cấu hình các bước dưới đây. Đừng gửi Service Role Key cho nhân viên hoặc commit lên GitHub.

## 1. Tạo cơ sở dữ liệu/Auth trên Supabase (gói miễn phí để thử nghiệm)

1. Mở https://supabase.com và tạo project.
2. Trong **SQL Editor**, mở `schema.sql` trong ZIP, dán toàn bộ nội dung và chạy.
3. Vào **Project Settings → API** (hoặc **Data API/Keys**, tùy giao diện) lấy Project URL và anon/publishable key. Lấy thêm `service_role`/secret key để cấu hình server-side trên Vercel בלבד.
4. Vào **Authentication → Users → Add user**, tạo tài khoản quản lý đầu tiên bằng email và mật khẩu mạnh, đánh dấu email confirmed nếu được hỏi.
5. Vào SQL Editor chạy câu lệnh sau, thay email bằng email quản lý vừa tạo:

```sql
update public.profiles
set role = 'admin', group_id = null, active = true
where email = 'email-quan-ly-cua-ban@example.com';
```

Nếu kết quả báo `UPDATE 0`, đăng nhập user đã được tạo chưa hoặc kiểm tra trigger/schema đã chạy thành công chưa.

## 2. Đẩy mã nguồn lên GitHub

1. Giải nén ZIP.
2. Tạo repository **Private** tại https://github.com/new.
3. Tải toàn bộ nội dung thư mục dự án lên repository. Không tải file `.env` thật, `service_role` key, mật khẩu hoặc dữ liệu riêng.

## 3. Deploy trên Vercel

1. Mở https://vercel.com/new và import repository GitHub.
2. Framework preset chọn **Vite** (hoặc để Vercel tự nhận), Build Command `npm run build`, Output Directory `dist`.
3. Trong **Environment Variables**, thêm các biến:

- `VITE_SUPABASE_URL` = Project URL Supabase
- `VITE_SUPABASE_ANON_KEY` = anon/publishable key Supabase
- `SUPABASE_URL` = cùng Project URL
- `SUPABASE_SERVICE_ROLE_KEY` = service role/secret key (chỉ server-side, tuyệt đối không đặt tên bắt đầu bằng `VITE_`)

4. Deploy. Sau khi thêm/sửa biến môi trường, redeploy để biến được áp dụng.
5. Mở URL `https://ten-du-an.vercel.app`, đăng nhập bằng tài khoản quản lý.

## 4. Cấp tài khoản cho nhân viên

1. Vào menu **Tài khoản**.
2. Điền tên, email, mật khẩu tạm ít nhất 12 ký tự và chọn nhóm A–E.
3. Gửi thông tin đăng nhập riêng cho nhân viên. Nhân viên mở cùng URL Vercel và đăng nhập bằng email/mật khẩu.
4. Nhân viên chỉ xem nhiệm vụ trong nhóm của họ; quản lý xem tất cả. Dữ liệu được đồng bộ qua database cloud và vẫn còn sau khi app hoặc máy quản lý tắt.

## 5. Các nhóm được khởi tạo trong schema

- A — Làm chủ Jumper và pipeline huấn luyện → Hướng dẫn cài đặt, task chạy mẫu, checkpoint.
- B — Thu thập và xử lý video môi trường → Dataset có cấu trúc, công cụ trích xuất, báo cáo chất lượng.
- C — Phát triển sandbox → Bộ sinh môi trường, bộ đánh giá tự động.
- D — Phát triển và kiểm thử kỹ năng → Skill Library, kết quả benchmark, báo cáo lỗi.
- E — Chuẩn bị triển khai → Định dạng đóng gói, kiểm tra tương thích, checklist an toàn.

## Notes / security
Test automatic deployment

- Dữ liệu không nằm trong RAM của Vercel: tài khoản và nhiệm vụ được lưu ở Supabase. Vì vậy vẫn còn sau khi deploy lại, miễn là project/database còn tồn tại.
- Gói miễn phí có giới hạn và chính sách ngủ/tạm dừng có thể thay đổi; kiểm tra trang giá hiện hành của Supabase/Vercel.
- `SUPABASE_SERVICE_ROLE_KEY` chỉ ở Environment Variables phía server Vercel. Không đặt nó trong biến `VITE_*`, không commit `.env`.
- Đây là bản starter; trước khi dùng dữ liệu nhạy cảm, kiểm thử RLS/quyền truy cập và thiết lập sao lưu. Không dùng mật khẩu dùng chung giữa các thành viên.
- Website tự làm mới danh sách mỗi 12 giây; không cần giữ máy tính quản lý bật.
