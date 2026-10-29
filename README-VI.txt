TERAVEL INDUSTRIES — CHẠY LOCAL VÀ TỰ DEPLOY

Mã nguồn: D:\Company\jumper-ai-lab-Teravel-Industries
Yêu cầu: Node.js 24.x. Giao diện dùng React + Vite; API dùng Vercel Functions; dữ liệu và tài khoản vẫn dùng Supabase.

1. Chạy local
Mở PowerShell trong thư mục mã nguồn:
  npm.cmd ci
  npm.cmd run dev
Mở URL Local mà Vite in ra. Trang chủ và cua Tera chạy không cần Supabase. Khu làm việc cần cấu hình Supabase. Vite không chạy các API trong thư mục api; kiểm tra toàn bộ API cần môi trường Vercel hoặc Vercel CLI dev.

2. Chọn đúng website trước khi deploy
Website cũ: https://jumper-ai-lab-teravel-industries.vercel.app/ — mã nguồn trong GitHub engmeo/jumper-ai-lab-Teravel-Industries. Khi dự án Vercel vẫn liên kết repository này, cập nhật main sẽ kích hoạt deploy. Giữ nguyên cấu hình Supabase và quyền truy cập của dự án đó.
Website mới: https://teravel-industries-nine.vercel.app/ — dự án teravel-industries trong team linzudyfahatamin. Thư mục local hiện liên kết website mới; chưa cấu hình Supabase.
Nếu muốn đổi đích deploy CLI:
  npx.cmd vercel login
  npx.cmd vercel link
Chọn đúng tài khoản/team và dự án có sẵn. Kiểm tra .vercel/project.json trước khi chạy deploy. Không commit thư mục .vercel.

3. Kiểm tra cấu hình trong Vercel
Mở dự án jumper-ai-lab-teravel-industries trên dashboard Vercel:
- Framework: Vite.
- Root Directory: thư mục gốc repository (nơi có package.json).
- Node.js: 24.x.
- Install Command: npm ci.
- Build Command: npm run build.
- Output Directory: dist.
Giữ nguyên các biến môi trường Production đã dùng:
  VITE_SUPABASE_URL
  VITE_SUPABASE_ANON_KEY
  SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY
Không đưa SERVICE_ROLE_KEY vào biến VITE_*, chat hoặc GitHub. Không chạy lại schema.sql hoặc tạo Supabase mới chỉ để thay giao diện. Các biến của API reset-owner hiện có cũng giữ nguyên nếu đang dùng chức năng đó.

4. Tự deploy bản mới
Chỉ chạy khi đã sẵn sàng cập nhật website thật:
  npx.cmd vercel deploy --prod
Lệnh này tải mã trong thư mục hiện tại lên đúng dự án đã liên kết, tạo một deployment Production và tính vào hạn mức. Không cần đẩy GitHub trước khi deploy qua CLI. Không chỉ upload riêng dist vì sẽ thiếu API phía máy chủ.
Chờ trạng thái Ready rồi mở URL được trả về. Kiểm tra trang chủ, đổi Sáng/Tối, đăng nhập, đọc hướng dẫn và mở nhiệm vụ. Nếu lỗi, xem Build Logs hoặc Runtime Logs trước khi thử deploy lại.

5. Tránh deploy ngoài ý muốn
vercel.json chỉ bật git.deploymentEnabled cho main và tắt các nhánh khác. Sửa và kiểm tra trên nhánh công việc; chỉ gộp vào main khi đã chốt để tạo một lượt deploy. Cấu hình này chỉ có tác dụng với dự án Vercel đã kết nối repository. CLI --prod vẫn deploy khi bạn chủ động chạy.
Nút Redeploy của một deployment cũ có thể build lại mã của chính deployment đó; không dùng nó để kỳ vọng lấy bản chỉ đang nằm trên máy.

6. Nội dung giữ nguyên và giới hạn
Các tệp docs/, schema.sql và api/ được giữ nguyên. Trang hướng dẫn hiển thị nội dung Markdown của repository; vị trí đọc lưu trên trình duyệt theo tài khoản, không phải kết quả nghiệm thu. Tin công ty trên trang chủ vẫn là nội dung minh họa có nhãn. Không bổ sung chat, kho upload hay CMS trong đợt thay giao diện này.

Tài liệu chính thức:
https://vercel.com/docs/cli/link
https://vercel.com/docs/cli/deploy
https://vercel.com/docs/project-configuration/git-configuration

Giao diện đối chiếu bản phác thảo: mặc định tối cho người dùng mới, vẫn giữ lựa chọn sáng/tối/hệ thống đã lưu. Hàng 7 ngày hiển thị hạn nhiệm vụ thật, không phải tiến độ học mẫu. Kho tải tệp và chat được ghi rõ chưa tích hợp. Cua dùng mô hình Jumper 3D thật từ STL/URDF, không phải hình minh họa mascot trong bản phác thảo.
