# WS0 — Điều phối dự án & Kiến trúc hệ thống

## 1. Thông tin chung

- **Nhóm:** WS0 — Project Coordination & System Architecture
- **Mục tiêu:** Xây dựng và duy trì kiến trúc tổng thể, kế hoạch triển khai, cơ chế phối hợp và tiêu chuẩn nghiệm thu chung cho dự án Jumper.
- **Phạm vi:** Điều phối WS1–WS5; quản lý phụ thuộc giữa các nhóm; thống nhất cấu trúc dữ liệu, giao diện tích hợp, quy trình kiểm thử và bàn giao.
- **Có thể bắt đầu trước khi robot về:** Có. Phần lớn công việc ban đầu thực hiện trên tài liệu, mã nguồn, cấu hình mẫu và môi trường mô phỏng.
- **Nguyên tắc:** Không coi giả định là sự thật đã xác minh; không đánh dấu hoàn thành chỉ dựa trên việc đã viết mã hoặc viết tài liệu; không tuyên bố đã kiểm thử phần cứng khi chưa có phần cứng.

## 2. Mục tiêu cụ thể

WS0 cần bảo đảm sáu điều kiện:

1. Mọi người hiểu dự án đang xây dựng hệ thống gì và giới hạn của giai đoạn hiện tại.
2. Mỗi nhóm có nhiệm vụ, người phụ trách, đầu vào, đầu ra và tiêu chí nghiệm thu rõ ràng.
3. Các nhóm sử dụng cấu trúc thư mục, định dạng dữ liệu và quy tắc đặt phiên bản thống nhất.
4. Các phụ thuộc được xác định trước để hạn chế việc một nhóm phải chờ nhóm khác mà không có phương án thay thế.
5. Kết quả kỹ thuật phải có bằng chứng kiểm tra được: lệnh chạy, cấu hình, log, báo cáo hoặc kết quả thử nghiệm.
6. Những vấn đề chưa giải quyết được, rủi ro và quyết định kỹ thuật đều có người chịu trách nhiệm theo dõi.

## 3. Kiến trúc tổng thể của dự án

### 3.1. Các nhóm và trách nhiệm

| Nhóm | Phạm vi phụ trách | Đầu ra chính | Bên tiếp nhận chính |
|---|---|---|---|
| WS0 | Điều phối, kiến trúc, tiêu chuẩn và tích hợp | Sơ đồ kiến trúc, backlog, ma trận phụ thuộc, quyết định kỹ thuật | Tất cả nhóm |
| WS1 | Dữ liệu và pipeline dữ liệu đầu vào | Dữ liệu có cấu trúc, công cụ xử lý, báo cáo chất lượng | WS2, WS3, WS4 |
| WS2 | Xây dựng mô hình và kỹ năng nền tảng | Mã huấn luyện, checkpoint, cấu hình, kết quả đánh giá ban đầu | WS3, WS5 |
| WS3 | Kiểm thử, benchmark và phân tích lỗi | Bộ kiểm thử, chỉ số đánh giá, báo cáo độ tin cậy | WS2, WS4, WS5 |
| WS4 | Mô phỏng, sandbox và nghiên cứu Digital Twin | Môi trường mô phỏng, API, bộ sinh kịch bản, báo cáo hiệu chỉnh | WS2, WS3, WS5 |
| WS5 | Tích hợp, an toàn và chuẩn bị triển khai | Gói kỹ năng, giao diện điều khiển, kiểm tra an toàn, quy trình phát hành | Hệ thống tích hợp và robot thật khi sẵn sàng |

Bảng trên là phân công trách nhiệm ở cấp hệ thống. Chi tiết từng nhiệm vụ thuộc tài liệu của nhóm tương ứng.

### 3.2. Luồng công việc giữa các nhóm

Luồng cơ bản:

**WS1 (dữ liệu) → WS2 (mô hình/kỹ năng) → WS3 (đánh giá) → WS5 (đóng gói/tích hợp).**

WS4 cung cấp môi trường mô phỏng, kịch bản và công cụ đánh giá cho WS2, WS3 và WS5. WS0 quản lý giao diện, phụ thuộc và quyết định liên quan đến toàn bộ luồng.

Cần lưu ý:

- WS2 có thể bắt đầu bằng dữ liệu mẫu hoặc dữ liệu mô phỏng khi WS1 chưa hoàn thành.
- WS3 có thể xây dựng khung benchmark và bộ kiểm thử trước, nhưng chỉ công bố kết quả khi đã có mô hình, dữ liệu và điều kiện thử nghiệm phù hợp.
- WS4 có thể triển khai sandbox tối thiểu trước; các phần Digital Twin, Real-is-Sim, Gaussian Splatting và PBD là các nhánh nâng cao, không mặc nhiên là điều kiện bắt buộc để mọi nhóm bắt đầu.
- WS5 có thể chuẩn hóa định dạng gói kỹ năng và xây dựng kiểm thử tự động trước khi có robot. Kiểm thử phần cứng, cảm biến, động cơ và an toàn vật lý phải được đánh dấu chờ đến khi có điều kiện thực hiện.
- Kết quả mô phỏng không được ghi nhận thành kết quả trên robot thật.

## 4. Danh sách nhiệm vụ của WS0

### D0.1 — Khảo sát hiện trạng và xác minh cơ sở dự án

**Mục tiêu:** Xác định chính xác những gì đã có trong repository, tài liệu và môi trường hiện tại trước khi lập kế hoạch chi tiết.

**Công việc thực hiện:**
1. Đọc tài liệu hướng dẫn, README, cấu trúc thư mục, mã nguồn và các lệnh chạy mẫu của Jumper.
2. Kiểm tra các thành phần hiện có: mô hình robot, môi trường mô phỏng, script huấn luyện, cấu hình, ví dụ và công cụ đánh giá.
3. Chạy các bài kiểm tra tối thiểu có thể thực hiện trong điều kiện máy hiện tại.
4. Ghi lại yêu cầu cài đặt, lệnh chạy, phiên bản phần mềm, kết quả, lỗi và giới hạn tài nguyên.
5. Phân loại từng thông tin thành:
   - **Đã xác minh:** Có bằng chứng trực tiếp.
   - **Giả định:** Chưa được kiểm tra đầy đủ.
   - **Chưa biết:** Thiếu tài liệu hoặc chưa có điều kiện kiểm chứng.
   - **Bị chặn:** Chưa thể thực hiện vì thiếu dữ liệu, phần cứng, quyền truy cập hoặc phụ thuộc.
6. Tạo danh sách câu hỏi cần xác minh với người phụ trách kỹ thuật.

**Đầu ra:**
- Báo cáo khảo sát hiện trạng.
- Danh sách thành phần đã xác minh và chưa xác minh.
- Hướng dẫn chạy thử tối thiểu.
- Danh sách rủi ro và vấn đề tồn đọng.

**Tiêu chí nghiệm thu:**
- Mỗi kết luận quan trọng có nguồn hoặc bằng chứng đi kèm.
- Các lệnh đã chạy và kết quả thực tế được ghi rõ.
- Không tuyên bố tính năng tồn tại chỉ dựa trên tên thư mục hoặc mô tả chưa được kiểm tra.
- Các vấn đề chưa xác minh có người phụ trách hoặc bước kiểm tra tiếp theo.

### D0.2 — Xây dựng bản đồ kiến trúc hệ thống

**Mục tiêu:** Thống nhất các thành phần của hệ thống và cách chúng trao đổi dữ liệu.

**Công việc thực hiện:**
1. Xác định các thành phần chính: dữ liệu, huấn luyện, mô hình/kỹ năng, sandbox, benchmark, đóng gói, giao diện điều khiển và phần cứng.
2. Vẽ sơ đồ thể hiện luồng dữ liệu, luồng điều khiển và các điểm tích hợp.
3. Ghi rõ thành phần nào đã tồn tại, thành phần nào cần phát triển và thành phần nào mới là đề xuất.
4. Xác định giao diện đầu vào/đầu ra giữa các thành phần.
5. Đánh dấu các giao diện chưa thống nhất và giao nhiệm vụ chốt cho nhóm liên quan.
6. Duy trì một bản kiến trúc tối thiểu có thể triển khai trước, cùng danh sách các phần mở rộng.

**Đầu ra:**
- Sơ đồ kiến trúc tổng thể.
- Mô tả trách nhiệm của từng thành phần.
- Sơ đồ luồng dữ liệu và luồng điều khiển.
- Danh sách giao diện đã chốt và giao diện còn chờ.

**Tiêu chí nghiệm thu:**
- Mỗi thành phần có trách nhiệm và ranh giới rõ ràng.
- Các luồng dữ liệu chính có đầu vào, đầu ra và bên sử dụng.
- Các phần nghiên cứu nâng cao được phân biệt với chức năng tối thiểu cần có.
- WS1–WS5 xác nhận các giao diện thuộc phạm vi của mình hoặc nêu rõ điểm chưa thống nhất.

### D0.3 — Quản lý backlog và phân công nhiệm vụ

**Mục tiêu:** Biến kế hoạch dự án thành các nhiệm vụ có thể thực hiện, kiểm tra và bàn giao.

**Công việc thực hiện:**
1. Tách mỗi workstream thành các nhiệm vụ nhỏ.
2. Mỗi nhiệm vụ phải có mã định danh duy nhất, người phụ trách chính, người phối hợp, mức ưu tiên và trạng thái.
3. Ghi rõ mục tiêu, đầu vào, các bước thực hiện, đầu ra và tiêu chí nghiệm thu.
4. Xác định nhiệm vụ nào có thể làm ngay, nhiệm vụ nào cần kết quả từ nhóm khác và nhiệm vụ nào cần robot thật.
5. Đặt thứ tự thực hiện dựa trên phụ thuộc, không chỉ dựa trên mức độ hấp dẫn của đề tài.
6. Cập nhật trạng thái, trở ngại và ngày dự kiến hoàn thành.
7. Khi nhiệm vụ bị chặn, ghi nguyên nhân, người cần hỗ trợ và phương án thay thế nếu có.

**Đầu ra:**
- Backlog tổng của dự án.
- Danh sách người phụ trách và người phối hợp.
- Bảng trạng thái và mức ưu tiên.
- Danh sách nhiệm vụ bị chặn cùng phương án xử lý.

**Tiêu chí nghiệm thu:**
- Không có nhiệm vụ đang triển khai mà không có người chịu trách nhiệm chính.
- Nhiệm vụ quan trọng có tiêu chí hoàn thành kiểm chứng được.
- Các nhiệm vụ bị chặn có nguyên nhân và hành động tiếp theo.
- Trạng thái backlog phản ánh kết quả thực tế, không chỉ phản ánh mức độ bận rộn.

### D0.4 — Quản lý phụ thuộc và điều kiện bắt đầu

**Mục tiêu:** Giúp các nhóm biết cần chờ đầu ra nào và có thể bắt đầu phần nào ngay.

**Công việc thực hiện:**
1. Lập ma trận phụ thuộc giữa các nhiệm vụ WS1–WS5.
2. Phân biệt phụ thuộc bắt buộc với phụ thuộc có thể thay thế bằng dữ liệu hoặc cấu hình mẫu.
3. Với mỗi phụ thuộc, ghi rõ đầu ra cần nhận, nhóm cung cấp, nhóm tiếp nhận và cách xác nhận đầu ra hợp lệ.
4. Xác định các điểm có nguy cơ gây tắc nghẽn.
5. Đề xuất thứ tự triển khai và phương án làm song song.
6. Khi một phụ thuộc thay đổi, cập nhật các nhiệm vụ bị ảnh hưởng và thông báo cho người liên quan.

**Đầu ra:**
- Ma trận phụ thuộc.
- Danh sách điều kiện bắt đầu của từng nhiệm vụ.
- Danh sách điểm nghẽn và phương án thay thế.
- Nhật ký thay đổi phụ thuộc.

**Tiêu chí nghiệm thu:**
- Mỗi phụ thuộc quan trọng có bên cung cấp và bên tiếp nhận.
- Đầu ra cần nhận được mô tả cụ thể.
- Nhiệm vụ chưa đủ điều kiện bắt đầu được đánh dấu rõ.
- Không để một nhóm tiếp tục xây dựng dựa trên giao diện chưa được xác nhận mà không ghi nhận rủi ro.

### D0.5 — Chuẩn hóa cấu trúc thư mục và quản lý phiên bản

**Mục tiêu:** Đảm bảo các nhóm lưu mã nguồn, dữ liệu, cấu hình và bằng chứng theo cách thống nhất.

**Công việc thực hiện:**
1. Thống nhất vị trí lưu tài liệu cấp dự án và tài liệu riêng của từng workstream.
2. Thống nhất cách đặt tên cho nhiệm vụ, báo cáo, cấu hình, checkpoint và kết quả benchmark.
3. Phân biệt mã nguồn, dữ liệu đầu vào, kết quả sinh ra, mô hình đã huấn luyện và tài liệu.
4. Xác định nội dung được phép đưa lên Git và nội dung cần loại trừ, chẳng hạn dữ liệu lớn, thông tin xác thực hoặc file riêng tư.
5. Thống nhất cách ghi phiên bản mã nguồn, cấu hình huấn luyện, dữ liệu và gói kỹ năng.
6. Đảm bảo một kết quả quan trọng có thể truy ngược về phiên bản mã nguồn, cấu hình và dữ liệu đã tạo ra nó.

**Cấu trúc tham khảo:**

```text
jumper-ai-lab/
├── docs/
│   ├── architecture/
│   ├── decisions/
│   ├── integration/
│   └── workstreams/
├── configs/
├── data/
│   ├── samples/
│   └── manifests/
├── scripts/
├── tests/
├── benchmarks/
├── artifacts/
│   ├── reports/
│   └── manifests/
└── workstreams/
    ├── WS1/
    ├── WS2/
    ├── WS3/
    ├── WS4/
    └── WS5/
```

Đây là cấu trúc đề xuất, không phải yêu cầu phải di chuyển toàn bộ repository hiện có vào đúng cấu trúc này. Trước khi thay đổi thư mục, cần kiểm tra cách tổ chức hiện tại và thống nhất phương án ít gây ảnh hưởng nhất.

**Đầu ra:**
- Quy ước tổ chức thư mục.
- Quy tắc đặt tên và phiên bản.
- Quy tắc lưu log, cấu hình và báo cáo.
- Hướng dẫn quản lý dữ liệu và thông tin nhạy cảm.

**Tiêu chí nghiệm thu:**
- Một thành viên mới có thể tìm được tài liệu, mã nguồn, cấu hình và kết quả theo hướng dẫn.
- Không đưa khóa bí mật, mật khẩu hoặc dữ liệu không được phép công khai vào repository.
- Kết quả huấn luyện và benchmark có thông tin truy xuất nguồn gốc phù hợp.

### D0.6 — Chuẩn hóa giao diện dữ liệu giữa các nhóm

**Mục tiêu:** Giảm lỗi tích hợp do các nhóm dùng định dạng dữ liệu hoặc cách gọi khác nhau.

**Công việc thực hiện:**
1. Liệt kê các loại dữ liệu cần trao đổi, ví dụ dữ liệu minh họa, quỹ đạo, trạng thái khớp, lệnh điều khiển, checkpoint, kết quả đánh giá và gói kỹ năng.
2. Với mỗi loại, thống nhất các trường bắt buộc, kiểu dữ liệu, đơn vị, quy ước thời gian và hệ tọa độ nếu có.
3. Ghi rõ trường nào bắt buộc, trường nào tùy chọn và cách biểu diễn dữ liệu bị thiếu.
4. Tạo dữ liệu mẫu hợp lệ và dữ liệu mẫu không hợp lệ để kiểm tra.
5. Yêu cầu bên cung cấp và bên tiếp nhận cùng xác nhận khả năng đọc/ghi hoặc trao đổi dữ liệu.
6. Quản lý thay đổi định dạng bằng phiên bản và ghi rõ ảnh hưởng đến các nhóm liên quan.

**Ví dụ thông tin cần thống nhất:**

| Đối tượng | Thông tin cần chốt |
|---|---|
| Dữ liệu mẫu | Định dạng, nhãn, nguồn, giấy phép và cách xác định phiên bản |
| Quỹ đạo thao tác | Trục thời gian, trạng thái khớp, vị trí, đơn vị và cách biểu diễn lỗi |
| Mô hình | Kiến trúc, checkpoint, cấu hình, phiên bản mã nguồn và dữ liệu |
| Kết quả benchmark | Tên bài kiểm tra, số lượt chạy, chỉ số, điều kiện thử và phiên bản mô hình |
| Sandbox | Cách khởi tạo môi trường, đặt trạng thái, chạy policy và lấy kết quả |
| Gói kỹ năng | Tệp mô hình, metadata, điều kiện tương thích và trạng thái kiểm tra an toàn |

Các trường cụ thể phải được chốt dựa trên mã nguồn Jumper và nhu cầu thực tế của từng nhóm. Không áp đặt một định dạng chung khi chưa kiểm tra các thành phần hiện có.

**Đầu ra:**
- Tài liệu giao diện dữ liệu.
- Bộ dữ liệu mẫu và kiểm tra định dạng.
- Quy tắc quản lý phiên bản giao diện.
- Danh sách giao diện còn chờ xác nhận.

**Tiêu chí nghiệm thu:**
- Các bên liên quan xác nhận có thể sử dụng dữ liệu mẫu.
- Có kiểm tra tự động hoặc hướng dẫn kiểm tra định dạng.
- Các trường quan trọng có đơn vị và quy ước rõ ràng.
- Thay đổi không tương thích có quy trình thông báo và xử lý.

### D0.7 — Thiết lập quy trình nghiệm thu và quản lý bằng chứng

**Mục tiêu:** Đảm bảo trạng thái “hoàn thành” có nghĩa thống nhất giữa các nhóm.

**Công việc thực hiện:**
1. Chuẩn hóa mẫu báo cáo và checklist nghiệm thu.
2. Yêu cầu mỗi nhiệm vụ có bằng chứng tương ứng với loại công việc.
3. Phân biệt hoàn thành tài liệu, hoàn thành mã nguồn, kiểm thử trong mô phỏng và kiểm thử trên robot thật.
4. Xác định người thực hiện, người rà soát và người chấp thuận.
5. Quy định cách xử lý khi kết quả không đạt tiêu chí.
6. Lưu lỗi, giới hạn, điều kiện tái hiện và hướng xử lý tiếp theo.
7. Không cho phép dùng kết quả của một môi trường thử nghiệm để thay thế bằng chứng của môi trường khác.

**Đầu ra:**
- Mẫu báo cáo cuối nhiệm vụ.
- Checklist nghiệm thu.
- Quy định lưu bằng chứng.
- Quy trình xử lý kết quả không đạt.

**Tiêu chí nghiệm thu:**
- Mọi nhiệm vụ đóng đều có đầu ra và bằng chứng phù hợp.
- Người rà soát có thể tái hiện hoặc kiểm tra kết quả theo hướng dẫn.
- Các giới hạn chưa giải quyết được được ghi lại.
- Các tuyên bố về an toàn và khả năng chạy trên robot phải có bằng chứng tương ứng; không suy ra từ việc mô hình chạy được trong mô phỏng.

### D0.8 — Quản lý quyết định kỹ thuật và thay đổi kiến trúc

**Mục tiêu:** Lưu lại lý do của các quyết định để tránh tranh luận lặp lại hoặc thay đổi không kiểm soát.

**Công việc thực hiện:**
1. Ghi lại các quyết định ảnh hưởng đến nhiều nhóm, chẳng hạn chọn simulator, định dạng gói kỹ năng, cấu trúc dữ liệu hoặc cách tích hợp.
2. Với mỗi quyết định, ghi vấn đề cần giải quyết, các phương án đã cân nhắc, tiêu chí so sánh và phương án được chọn.
3. Phân biệt quyết định đã chốt với đề xuất đang thử nghiệm.
4. Ghi rõ tác động đến nhiệm vụ, mã nguồn, dữ liệu, hiệu năng và khả năng tích hợp.
5. Khi có bằng chứng mới khiến quyết định cũ không còn phù hợp, mở lại quyết định và ghi lịch sử thay đổi.

**Đầu ra:**
- Nhật ký quyết định kỹ thuật.
- Danh sách vấn đề kiến trúc đang mở.
- Nhật ký thay đổi và ảnh hưởng liên quan.

**Tiêu chí nghiệm thu:**
- Quyết định quan trọng có lý do và người phê duyệt.
- Các nhóm biết quyết định nào đang có hiệu lực.
- Không âm thầm thay đổi giao diện chung mà không cập nhật tài liệu và kiểm tra ảnh hưởng.

### D0.9 — Theo dõi rủi ro, tiến độ và các điểm nghẽn

**Mục tiêu:** Phát hiện sớm các vấn đề có thể khiến dự án chậm hoặc tạo ra kết quả không đáng tin cậy.

**Công việc thực hiện:**
1. Duy trì danh sách rủi ro: mô tả, khả năng xảy ra, mức ảnh hưởng, dấu hiệu cảnh báo và phương án giảm thiểu.
2. Theo dõi nhiệm vụ bị chặn do thiếu dữ liệu, môi trường, tài nguyên máy tính hoặc phần cứng.
3. Đánh giá tác động của thay đổi tại một nhóm lên các nhóm khác.
4. Xác định việc nào có thể tiếp tục bằng dữ liệu mẫu và việc nào bắt buộc chờ điều kiện thực tế.
5. Tổng hợp tiến độ dựa trên đầu ra và tiêu chí đã đạt, không chỉ dựa trên báo cáo phần trăm.
6. Đề xuất điều chỉnh ưu tiên khi phát hiện điểm nghẽn.

**Đầu ra:**
- Sổ theo dõi rủi ro.
- Danh sách nhiệm vụ bị chặn.
- Báo cáo tiến độ theo bằng chứng.
- Đề xuất điều chỉnh kế hoạch.

**Tiêu chí nghiệm thu:**
- Rủi ro quan trọng có người theo dõi và hành động tiếp theo.
- Nhiệm vụ bị chặn được nhận diện rõ.
- Các thay đổi kế hoạch có lý do và được thông báo.
- Báo cáo tiến độ phân biệt rõ hoàn thành, đang làm, chờ phụ thuộc và chưa bắt đầu.

## 5. Ma trận phụ thuộc giữa các workstream

| Đầu ra cần có | Nhóm cung cấp | Nhóm sử dụng | Có thể làm trước không? | Điều kiện |
|---|---|---|---|---|
| Hướng dẫn cài đặt và chạy mẫu | WS1 hoặc nhóm quản lý môi trường được phân công | WS2, WS4, WS5 | Có thể làm song song một phần | Cần xác minh môi trường và lệnh chạy |
| Dữ liệu có cấu trúc và báo cáo chất lượng | WS1 | WS2, WS3 | Có thể dùng dữ liệu mẫu tạm thời | Kết quả cuối phụ thuộc dữ liệu phù hợp |
| Mô hình hoặc skill baseline | WS2 | WS3, WS5 | Có thể bắt đầu bằng mô hình mẫu | Cần ghi rõ nguồn và cấu hình |
| Sandbox và giao diện chạy policy | WS4 | WS2, WS3, WS5 | Có | Có thể bắt đầu bằng môi trường tối thiểu |
| Bộ benchmark và báo cáo kiểm thử | WS3 | WS2, WS4, WS5 | Có thể xây dựng khung trước | Kết quả chỉ có giá trị khi có đối tượng thử phù hợp |
| Định dạng gói kỹ năng | WS5 phối hợp WS2 | WS5 và các nhóm tích hợp | Có | Cần thống nhất metadata và giao diện |
| Kiểm thử an toàn trên phần cứng | WS5 phối hợp nhóm phần cứng | Nhóm triển khai | Không hoàn tất trước khi có phần cứng | Cần robot, quy trình an toàn và người có thẩm quyền |
| Hiệu chỉnh Digital Twin với robot thật | WS4 phối hợp nhóm phần cứng | WS2, WS3, WS5 | Chỉ chuẩn bị được một phần | Cần dữ liệu đo hoặc robot thật phù hợp |

Ma trận này là kế hoạch ban đầu. WS0 phải cập nhật khi khảo sát repository hoặc các nhóm xác nhận phụ thuộc thực tế khác.

## 6. Quy tắc quản lý trạng thái nhiệm vụ

Mỗi nhiệm vụ sử dụng một trong các trạng thái sau:

- **Backlog:** Đã xác định nhưng chưa bắt đầu.
- **Ready:** Đã đủ điều kiện đầu vào để bắt đầu.
- **In Progress:** Đang thực hiện.
- **Blocked:** Bị chặn bởi phụ thuộc hoặc vấn đề chưa giải quyết.
- **In Review:** Đã có đầu ra, đang được rà soát.
- **Done:** Đạt tiêu chí nghiệm thu và có bằng chứng.
- **Deferred:** Chủ động hoãn, có lý do và điều kiện xem xét lại.

Không chuyển trực tiếp sang `Done` chỉ vì đã hoàn thành viết mã hoặc tài liệu. Nhiệm vụ phải đạt tiêu chí nghiệm thu đã thống nhất.

## 7. Mẫu chuẩn cho một nhiệm vụ trong backlog

Mỗi nhiệm vụ WS0 quản lý nên có các trường:

- **Mã nhiệm vụ:** Ví dụ `D4.3`.
- **Tên nhiệm vụ:**
- **Workstream:**
- **Người phụ trách chính:**
- **Người phối hợp:**
- **Mục tiêu:**
- **Lý do / giá trị sử dụng:**
- **Đầu vào bắt buộc:**
- **Đầu vào thay thế (nếu có):**
- **Các bước thực hiện:**
- **Đầu ra bắt buộc:**
- **Tiêu chí nghiệm thu:**
- **Bằng chứng cần lưu:**
- **Phụ thuộc:**
- **Rủi ro / giới hạn:**
- **Trạng thái:**
- **Mức ưu tiên:**
- **Ngày dự kiến:**
- **Điều kiện để đóng nhiệm vụ:**
- **Việc cần làm tiếp theo:**

## 8. Kế hoạch triển khai WS0 theo giai đoạn

### Giai đoạn 1 — Khảo sát và chuẩn hóa ban đầu

- Khảo sát repository và tài liệu.
- Xác định phần nào đã tồn tại, phần nào cần phát triển.
- Vẽ kiến trúc phiên bản đầu.
- Chốt phạm vi tối thiểu của WS1–WS5.
- Tạo backlog, ma trận phụ thuộc và sổ rủi ro.
- Chuẩn hóa mẫu báo cáo và tiêu chí nghiệm thu.

**Điều kiện hoàn thành:** Có thể giao việc cho từng nhóm mà không phải giải thích lại toàn bộ bối cảnh dự án.

### Giai đoạn 2 — Xác nhận giao diện và triển khai song song

- Phối hợp WS1–WS5 xác nhận đầu vào/đầu ra.
- Chốt định dạng dữ liệu và gói kỹ năng ở mức tối thiểu.
- Theo dõi các nhóm phát triển độc lập trên dữ liệu mẫu hoặc sandbox.
- Kiểm tra các điểm tích hợp sớm để phát hiện xung đột.
- Cập nhật kiến trúc khi xuất hiện bằng chứng mới.

**Điều kiện hoàn thành:** Các nhóm có thể tạo và kiểm tra đầu ra theo giao diện đã thống nhất.

### Giai đoạn 3 — Tích hợp và kiểm chứng

- Theo dõi việc ghép dữ liệu, mô hình, sandbox, benchmark và gói kỹ năng.
- Tổ chức kiểm tra đầu-cuối theo các điều kiện thử đã thống nhất.
- Theo dõi lỗi giao diện, sai khác phiên bản và vấn đề tái hiện kết quả.
- Yêu cầu ghi nhận rõ những gì đã kiểm chứng trong mô phỏng và những gì còn chờ phần cứng.

**Điều kiện hoàn thành:** Luồng tích hợp được kiểm tra trong phạm vi khả thi, lỗi còn lại có hồ sơ và người phụ trách.

### Giai đoạn 4 — Chuẩn bị triển khai thực tế

- Rà soát khả năng tương thích với robot và hệ điều khiển thực tế.
- Cập nhật checklist an toàn và quy trình phê duyệt.
- Lập danh sách kiểm tra cần thực hiện khi robot đến.
- Tổ chức kiểm thử phần cứng chỉ khi đủ điều kiện an toàn.

**Điều kiện hoàn thành:** Có kế hoạch kiểm chứng trên phần cứng, không tuyên bố triển khai thực tế thành công khi chưa có bằng chứng.

## 9. Nhịp điều phối và báo cáo

### Họp điều phối định kỳ

WS0 tổ chức buổi cập nhật ngắn với các nhóm để làm rõ:

1. Đầu ra nào đã hoàn thành và có bằng chứng?
2. Công việc tiếp theo là gì?
3. Đang bị chặn bởi điều gì?
4. Có thay đổi giao diện hoặc phụ thuộc không?
5. Cần quyết định kỹ thuật nào từ cấp dự án?

### Báo cáo tiến độ

Báo cáo cần tập trung vào:
- Đầu ra đã được nghiệm thu.
- Đầu ra đang chờ rà soát.
- Nhiệm vụ bị chặn và nguyên nhân.
- Rủi ro mới phát sinh.
- Quyết định cần đưa ra.
- Tác động đến kế hoạch chung.

Không dùng phần trăm hoàn thành làm chỉ số duy nhất. Một nhiệm vụ chỉ được coi là hoàn thành khi đầu ra đạt tiêu chí đã thống nhất.

## 10. Mẫu báo cáo cuối nhiệm vụ

- **Mã nhiệm vụ / Tên nhiệm vụ:**
- **Người thực hiện:**
- **Trạng thái cuối:**
- **Đã hoàn thành:**
- **Đầu vào và phiên bản sử dụng:**
- **Cách chạy / kiểm tra:**
- **Kết quả và bằng chứng:**
- **Mức độ xác minh:** Tài liệu / chạy thử / mô phỏng / phần cứng.
- **Lỗi hoặc giới hạn:**
- **Giả định chưa được kiểm chứng:**
- **Việc cần nhóm khác hỗ trợ:**
- **Ảnh hưởng đến các nhóm khác:**
- **Đề xuất bước tiếp theo:**
- **Người rà soát / xác nhận:**

## 11. Tiêu chí nghiệm thu tổng thể của WS0

WS0 được nghiệm thu khi:

- [ ] Có bản đồ kiến trúc tổng thể và mô tả các thành phần.
- [ ] Có backlog với người phụ trách, trạng thái, đầu vào, đầu ra và tiêu chí nghiệm thu.
- [ ] Có ma trận phụ thuộc và điều kiện bắt đầu.
- [ ] Có quy ước thư mục, phiên bản, log và bằng chứng.
- [ ] Có tài liệu giao diện dữ liệu ở mức tối thiểu.
- [ ] Có mẫu báo cáo và quy trình nghiệm thu thống nhất.
- [ ] Có nhật ký quyết định kỹ thuật và sổ rủi ro.
- [ ] Có danh sách rõ ràng những gì đã xác minh, còn giả định và đang bị chặn.
- [ ] Các nhóm biết phải bàn giao gì, cho ai và bằng cách nào.
- [ ] Các hạng mục yêu cầu robot thật được tách riêng khỏi công việc có thể hoàn thành trên máy tính.

## 12. Ranh giới trách nhiệm

WS0 **chịu trách nhiệm về sự rõ ràng và khả năng phối hợp**, không chịu trách nhiệm thay các nhóm về kết quả kỹ thuật chuyên môn.

- WS0 không tự kết luận mô hình tốt nếu WS3 chưa đánh giá.
- WS0 không tự kết luận sandbox đủ chính xác nếu WS4 chưa kiểm chứng.
- WS0 không tự xác nhận an toàn phần cứng nếu WS5 và người phụ trách phần cứng chưa thực hiện kiểm tra cần thiết.
- WS0 có trách nhiệm yêu cầu bổ sung bằng chứng, làm rõ phụ thuộc và điều phối xử lý khi các nhóm có kết quả mâu thuẫn.

**Kết quả cuối cùng của WS0:** Một dự án có thể được điều phối dựa trên nhiệm vụ, giao diện, bằng chứng và tiêu chí nghiệm thu rõ ràng — thay vì dựa trên các mô tả chung hoặc giả định chưa được kiểm tra.
