# 05. Kỹ sư dữ liệu và quản lý tri thức

- **Nhóm:** WS1 — Dữ liệu và tri thức
- **Mục tiêu:** Xây dựng cấu trúc lưu trữ, quản lý phiên bản, truy xuất nguồn gốc và tìm kiếm dữ liệu, Skill Card, nhãn, kết quả đánh giá cùng các tài liệu liên quan đến dự án Jumper.
- **Phạm vi:** Thiết kế schema dữ liệu, tổ chức kho tri thức, chuẩn hóa định danh, quản lý phiên bản, kiểm tra tính đầy đủ và xây dựng chỉ mục tìm kiếm.
- **Nhóm sử dụng đầu ra:** WS0, WS2, WS3, WS4 và WS5.
- **Có thể thực hiện trước khi robot về:** Có. Có thể thiết kế cấu trúc dữ liệu, triển khai công cụ kiểm tra và thử nghiệm bằng dữ liệu mẫu.

## 1. Mục tiêu cụ thể

Xây dựng một hệ thống để nhân sự có thể trả lời được những câu hỏi sau:

1. Một kỹ năng có mã định danh nào và hiện đang ở phiên bản nào?
2. Kỹ năng đó được mô tả trong Skill Card nào?
3. Dữ liệu nào được sử dụng để xây dựng hoặc đánh giá kỹ năng?
4. Dữ liệu đến từ đâu, do ai tạo ra và đã qua những bước xử lý nào?
5. Nhãn dữ liệu được tạo theo quy tắc nào và thuộc phiên bản nào?
6. Kết quả đánh giá nào tương ứng với phiên bản kỹ năng, mô hình và bộ dữ liệu nào?
7. Khi một tài liệu hoặc dữ liệu thay đổi, những thành phần nào bị ảnh hưởng?
8. Làm thế nào để tìm lại một kỹ năng, bộ dữ liệu, phiên bản hoặc báo cáo cụ thể?

**Kết quả mong muốn:** Mỗi đối tượng quan trọng đều có định danh ổn định, nguồn gốc, phiên bản và mối liên hệ rõ ràng với các đối tượng liên quan.

## 2. Công việc cần thực hiện

### D5.1 — Khảo sát dữ liệu và xác định mô hình quản lý

**Mục tiêu:** Xác định những loại dữ liệu và tri thức cần quản lý trước khi thiết kế kho lưu trữ.

**Các bước thực hiện:**

1. Khảo sát đầu ra dự kiến của WS1, bao gồm video, khung hình, metadata, nhãn, Skill Card và báo cáo chất lượng dữ liệu.
2. Khảo sát đầu ra của WS2, bao gồm thông tin mô hình, checkpoint, cấu hình huấn luyện và kết quả huấn luyện khi có.
3. Khảo sát đầu ra của WS3, bao gồm benchmark, kết quả kiểm thử và báo cáo lỗi.
4. Khảo sát đầu ra của WS4, bao gồm cấu hình môi trường, kịch bản mô phỏng và phiên bản mô hình mô phỏng.
5. Khảo sát đầu ra của WS5, bao gồm gói kỹ năng, thông tin tương thích và biên bản nghiệm thu.
6. Phân biệt dữ liệu thực tế đã tồn tại với loại dữ liệu mới chỉ dự kiến sẽ có.
7. Xác định dữ liệu nào cần lưu trực tiếp, dữ liệu nào chỉ cần lưu metadata và đường dẫn tới tệp.
8. Xác định yêu cầu về quyền truy cập, thời hạn lưu trữ và quyền sử dụng dữ liệu.

**Đầu ra:**
- Danh mục loại dữ liệu cần quản lý.
- Sơ đồ quan hệ giữa các đối tượng.
- Danh sách trường dữ liệu bắt buộc và tùy chọn.
- Danh sách vấn đề cần WS0 và các nhóm xác nhận.

**Tiêu chí nghiệm thu:**
- Mỗi loại dữ liệu có mục đích và nhóm tạo ra rõ ràng.
- Không nhầm lẫn dữ liệu đã tồn tại với dữ liệu dự kiến.
- Các mối quan hệ quan trọng giữa kỹ năng, dữ liệu và kết quả đánh giá được mô tả.

### D5.2 — Thiết kế schema và quy tắc định danh

**Mục tiêu:** Chuẩn hóa cách biểu diễn các đối tượng để nhiều nhóm có thể trao đổi dữ liệu mà không phải tự suy đoán.

**Các bước thực hiện:**

1. Thiết kế schema cho các đối tượng chính:
   - `Skill`: thông tin kỹ năng.
   - `Dataset`: thông tin bộ dữ liệu.
   - `DataAsset`: video, ảnh hoặc tệp dữ liệu.
   - `LabelSet`: bộ nhãn và quy tắc gán nhãn.
   - `ModelArtifact`: mô hình hoặc checkpoint.
   - `EvaluationRun`: một lần đánh giá.
   - `Document`: tài liệu kỹ thuật.
2. Xác định định danh duy nhất cho từng đối tượng.
3. Xác định trường bắt buộc, trường tùy chọn, kiểu dữ liệu và giá trị hợp lệ.
4. Xác định cách biểu diễn trường thiếu, trường chưa xác minh và trường không áp dụng.
5. Quy định cách tham chiếu giữa các đối tượng bằng định danh thay vì sao chép thông tin không cần thiết.
6. Thiết kế quy tắc kiểm tra định danh trùng, tham chiếu không tồn tại và dữ liệu sai kiểu.
7. Viết ví dụ dữ liệu hợp lệ và không hợp lệ.
8. Thống nhất schema với WS0 trước khi áp dụng rộng rãi.

**Ví dụ schema cho một kỹ năng:**

```json
{
  "skill_id": "SKILL-0001",
  "name": "forward_walking",
  "version": "0.1.0",
  "status": "draft",
  "source_document_ids": [],
  "dataset_ids": [],
  "verification_status": "simulation_pending",
  "limitations": [
    "Chưa xác minh trên robot thật"
  ]
}
```

Đây là ví dụ minh họa, không phải thông tin xác nhận rằng kỹ năng đi bộ đã được triển khai trên Jumper.

**Đầu ra:**
- Schema phiên bản đầu tiên.
- Quy tắc định danh.
- Bộ ví dụ dữ liệu.
- Công cụ kiểm tra schema.

**Tiêu chí nghiệm thu:**
- Dữ liệu mẫu hợp lệ vượt qua kiểm tra.
- Dữ liệu thiếu trường bắt buộc hoặc sai kiểu bị phát hiện.
- Không chấp nhận định danh trùng trong phạm vi được quy định.
- Có tài liệu giải thích các trường và cách sử dụng.

### D5.3 — Quản lý phiên bản và lịch sử thay đổi

**Mục tiêu:** Đảm bảo có thể xác định phiên bản nào đang được sử dụng và truy lại lịch sử thay đổi khi cần.

**Các bước thực hiện:**

1. Xác định đối tượng cần quản lý phiên bản: Skill Card, schema, bộ nhãn, bộ dữ liệu, cấu hình và các tài liệu quan trọng.
2. Quy định khi nào cần tạo phiên bản mới.
3. Ghi lại phiên bản trước, phiên bản mới, người thay đổi, thời điểm và lý do.
4. Phân biệt thay đổi nội dung với thay đổi trạng thái xác minh.
5. Quy định cách xử lý phiên bản lỗi thời hoặc bị thay thế.
6. Xác định những thay đổi nào có thể ảnh hưởng đến các nhóm khác.
7. Với mỗi lần huấn luyện hoặc đánh giá, lưu tham chiếu tới đúng phiên bản dữ liệu, cấu hình và kỹ năng đã sử dụng.
8. Thử nghiệm khả năng truy xuất lại thông tin của một lần chạy cũ.

**Đầu ra:**
- Quy tắc phiên bản.
- Lịch sử thay đổi.
- Danh sách quan hệ phụ thuộc giữa các phiên bản.
- Ví dụ truy xuất một kết quả đánh giá cũ.

**Tiêu chí nghiệm thu:**
- Có thể xác định phiên bản được sử dụng tại một thời điểm.
- Không ghi đè lịch sử theo cách làm mất khả năng truy nguyên.
- Kết quả đánh giá có thể tham chiếu tới đúng dữ liệu và cấu hình đã dùng.
- Các thay đổi quan trọng có người thực hiện và lý do.

### D5.4 — Quản lý nguồn gốc và lịch sử xử lý dữ liệu

**Mục tiêu:** Truy ngược được dữ liệu từ nguồn ban đầu đến các sản phẩm được tạo ra trong quá trình xử lý.

**Các bước thực hiện:**

1. Ghi nhận nguồn gốc của video, ảnh, tài liệu hoặc bộ dữ liệu.
2. Lưu thông tin nguồn, quyền sử dụng và các hạn chế liên quan khi có.
3. Ghi lại công cụ, phiên bản công cụ và cấu hình đã dùng để xử lý dữ liệu.
4. Liên kết ảnh trích xuất với video nguồn thông qua định danh.
5. Liên kết nhãn với mẫu dữ liệu và phiên bản quy tắc gán nhãn.
6. Liên kết tập dữ liệu sử dụng trong huấn luyện hoặc đánh giá với các tệp nguồn tương ứng.
7. Ghi nhận dữ liệu bị loại khỏi tập sử dụng và lý do loại.
8. Xây dựng khả năng truy vấn ngược từ một kết quả đánh giá tới mô hình, bộ dữ liệu và phiên bản kỹ năng liên quan.

**Đầu ra:**
- Quy tắc lưu nguồn gốc dữ liệu.
- Các quan hệ truy xuất nguồn gốc.
- Báo cáo những bản ghi thiếu thông tin nguồn.
- Ví dụ truy ngược từ kết quả đánh giá về dữ liệu đầu vào.

**Tiêu chí nghiệm thu:**
- Các bản ghi bắt buộc có nguồn gốc hoặc trạng thái thiếu nguồn rõ ràng.
- Có thể truy ngược những quan hệ đã được định nghĩa.
- Không tự tạo nguồn hoặc thông tin xuất xứ chưa được xác minh.
- Dữ liệu bị loại khỏi tập sử dụng có lý do và lịch sử.

### D5.5 — Tổ chức kho tri thức và chỉ mục tìm kiếm

**Mục tiêu:** Cho phép nhân sự tìm được tài liệu, kỹ năng, bộ dữ liệu và báo cáo cần thiết.

**Các bước thực hiện:**

1. Xây dựng danh mục các đối tượng cần tìm kiếm.
2. Chuẩn hóa tên, mã định danh, loại đối tượng, trạng thái và từ khóa.
3. Tạo chỉ mục tìm kiếm theo tên, mã, loại, phiên bản và các trường metadata phù hợp.
4. Hỗ trợ lọc theo nhóm tạo dữ liệu, trạng thái xác minh và phiên bản.
5. Cho phép tìm theo từ khóa hoặc mã định danh.
6. Liên kết kết quả tìm kiếm tới tài liệu hoặc tệp thực tế.
7. Kiểm tra trường hợp có nhiều kết quả tương tự hoặc có phiên bản cũ.
8. Đảm bảo tìm kiếm chỉ trả về các đối tượng mà người dùng được phép truy cập.

**Đầu ra:**
- Danh mục hoặc chỉ mục tìm kiếm.
- Công cụ tìm kiếm hoặc giao diện truy vấn phù hợp với kiến trúc đã chọn.
- Hướng dẫn tìm kiếm và truy xuất.
- Bộ kiểm thử cho các trường hợp tìm kiếm.

**Tiêu chí nghiệm thu:**
- Có thể tìm theo mã định danh và từ khóa.
- Kết quả có thông tin nhận diện và phiên bản.
- Có thể mở hoặc truy xuất đối tượng được tìm thấy.
- Không hiển thị dữ liệu trái với quyền truy cập.

**Lưu ý:** Ở giai đoạn đầu, có thể sử dụng CSV/JSON và chỉ mục đơn giản. Chỉ triển khai cơ sở dữ liệu chuyên dụng hoặc tìm kiếm ngữ nghĩa khi nhu cầu thực tế chứng minh cần thiết.

### D5.6 — Kiểm tra tính đầy đủ và tính nhất quán

**Mục tiêu:** Phát hiện dữ liệu thiếu, sai cấu trúc hoặc có quan hệ không hợp lệ trước khi bàn giao.

**Các bước thực hiện:**

1. Viết bộ kiểm tra schema tự động.
2. Kiểm tra trường bắt buộc, kiểu dữ liệu và giá trị hợp lệ.
3. Kiểm tra định danh trùng.
4. Kiểm tra các tham chiếu tới đối tượng không tồn tại.
5. Kiểm tra đường dẫn tệp và trạng thái truy cập.
6. Kiểm tra các bản ghi thiếu nguồn gốc, phiên bản hoặc trạng thái xác minh.
7. Phân loại lỗi theo mức độ ảnh hưởng.
8. Tạo báo cáo tổng hợp và danh sách bản ghi cần sửa.
9. Chạy kiểm tra trước mỗi lần phát hành hoặc bàn giao bộ dữ liệu.
10. Không tự sửa hoặc loại bỏ dữ liệu quan trọng mà không ghi nhận thay đổi.

**Đầu ra:**
- Bộ kiểm tra tự động.
- Báo cáo tính đầy đủ và nhất quán.
- Danh sách lỗi cần xử lý.
- Quy trình kiểm tra trước khi bàn giao.

**Tiêu chí nghiệm thu:**
- Phát hiện được các lỗi đã thiết kế trong bộ kiểm thử.
- Báo cáo xác định được bản ghi và trường dữ liệu có vấn đề.
- Có thể chạy lại kiểm tra sau khi sửa.
- Phân biệt lỗi nghiêm trọng với cảnh báo không ngăn cản việc sử dụng.

### D5.7 — Kiểm soát quyền truy cập và an toàn dữ liệu

**Mục tiêu:** Đảm bảo kho tri thức không làm lộ dữ liệu cá nhân, bí mật kỹ thuật hoặc dữ liệu chưa được cấp quyền sử dụng.

**Các bước thực hiện:**

1. Xác định các loại dữ liệu có hạn chế truy cập.
2. Ghi lại trạng thái quyền sử dụng và phạm vi được phép chia sẻ.
3. Phân biệt dữ liệu công khai, dữ liệu nội bộ và dữ liệu hạn chế.
4. Quy định ai có quyền xem, chỉnh sửa, phát hành hoặc xóa dữ liệu.
5. Không đưa mật khẩu, khóa API, thông tin xác thực hoặc bí mật vận hành vào metadata công khai.
6. Không đưa dữ liệu cá nhân hoặc dữ liệu chưa được cấp quyền vào kho chung.
7. Xác định cách lưu trữ tệp lớn và dữ liệu hạn chế theo hạ tầng đã được phê duyệt.
8. Kiểm tra quyền truy cập trước khi chia sẻ tài liệu hoặc bộ dữ liệu cho nhóm khác.

**Đầu ra:**
- Quy tắc phân loại dữ liệu.
- Quy định quyền truy cập.
- Checklist trước khi chia sẻ.
- Danh sách vấn đề liên quan đến quyền sử dụng và bảo mật.

**Tiêu chí nghiệm thu:**
- Dữ liệu được phân loại theo quy định.
- Không phát hiện thông tin xác thực trong các trường được kiểm tra.
- Quyền truy cập phù hợp với phạm vi chia sẻ.
- Các trường hợp chưa xác định được quyền sử dụng phải được giữ lại để xác minh.

### D5.8 — Tích hợp, tài liệu hóa và bàn giao

**Mục tiêu:** Đảm bảo kho dữ liệu và tri thức có thể được các nhóm khác sử dụng đúng cách.

**Các bước thực hiện:**

1. Tổng hợp schema, quy tắc định danh và quy tắc phiên bản.
2. Tạo bộ dữ liệu mẫu gồm bản ghi hợp lệ và các trường hợp lỗi.
3. Viết hướng dẫn thêm, sửa, truy vấn và phát hành dữ liệu.
4. Cung cấp ví dụ truy xuất Skill Card, bộ dữ liệu và kết quả đánh giá.
5. Hướng dẫn các nhóm tạo tham chiếu tới đối tượng thay vì sao chép dữ liệu không cần thiết.
6. Chạy kiểm tra tổng thể trên bộ dữ liệu mẫu.
7. Ghi lại các giới hạn, lỗi đã biết và nội dung chưa được hỗ trợ.
8. Bàn giao tài liệu và xác nhận với WS0 về cấu trúc dữ liệu dùng chung.

**Đầu ra:**
- Kho tri thức mẫu.
- Schema và công cụ kiểm tra.
- Chỉ mục tìm kiếm.
- Hướng dẫn sử dụng.
- Báo cáo kiểm thử và biên bản bàn giao.

**Tiêu chí nghiệm thu:**
- Người khác có thể thêm bản ghi theo hướng dẫn.
- Dữ liệu sai bị phát hiện bởi công cụ kiểm tra.
- Có thể tìm kiếm và truy xuất các đối tượng đã lưu.
- Có thể xác định phiên bản và nguồn gốc của bản ghi.
- Các nhóm tiếp nhận hiểu cách sử dụng và giới hạn của hệ thống.

## 3. Cấu trúc dữ liệu tham khảo

```text
knowledge_base/
├── schemas/
│   ├── skill.schema.json
│   ├── dataset.schema.json
│   ├── artifact.schema.json
│   └── evaluation.schema.json
├── catalog/
│   ├── skills.json
│   ├── datasets.json
│   └── documents.json
├── manifests/
│   ├── data_assets.csv
│   └── model_artifacts.csv
├── indexes/
├── reports/
│   └── validation_report.json
├── configs/
├── tests/
└── README.md
```

Đây là cấu trúc tham khảo. Tệp video, checkpoint và dữ liệu lớn không nhất thiết phải lưu trực tiếp trong `knowledge_base`; có thể lưu ở nơi lưu trữ phù hợp rồi quản lý bằng định danh, metadata và đường dẫn.

## 4. Sản phẩm bàn giao cuối cùng

1. Schema cho các đối tượng dữ liệu và tri thức.
2. Quy tắc định danh và quản lý phiên bản.
3. Quy tắc truy xuất nguồn gốc.
4. Bộ dữ liệu mẫu hợp lệ và không hợp lệ.
5. Công cụ kiểm tra tính đầy đủ và nhất quán.
6. Chỉ mục tìm kiếm và hướng dẫn truy xuất.
7. Quy định quyền truy cập và chia sẻ.
8. Báo cáo kiểm thử.
9. Hướng dẫn sử dụng, cập nhật và bàn giao.

## 5. Tiêu chí nghiệm thu tổng thể

- [ ] Các đối tượng chính có định danh duy nhất.
- [ ] Dữ liệu hợp lệ theo schema đã thống nhất.
- [ ] Có quy tắc phiên bản và lịch sử thay đổi.
- [ ] Có nguồn gốc hoặc trạng thái nguồn gốc chưa xác minh.
- [ ] Có liên kết giữa kỹ năng, dữ liệu, nhãn, mô hình và kết quả đánh giá khi các đối tượng đó tồn tại.
- [ ] Có thể tìm kiếm theo mã định danh hoặc từ khóa.
- [ ] Phát hiện được dữ liệu thiếu trường và tham chiếu không hợp lệ.
- [ ] Có báo cáo kiểm tra tính đầy đủ.
- [ ] Có kiểm soát quyền truy cập và quyền sử dụng dữ liệu.
- [ ] Người khác có thể làm theo hướng dẫn để thêm, kiểm tra và truy xuất dữ liệu.

## 6. Có thể thực hiện trước khi robot về không?

Có thể triển khai ngay bằng dữ liệu mẫu:

- Thiết kế schema và quy tắc định danh.
- Xây dựng mẫu Skill Card, Dataset và Evaluation Run.
- Xây dựng công cụ kiểm tra dữ liệu.
- Tạo chỉ mục tìm kiếm.
- Thử nghiệm quy trình phiên bản và truy xuất nguồn gốc.
- Viết hướng dẫn tích hợp cho WS2–WS5.

Khi có robot, chỉ cần mở rộng schema và kho dữ liệu để bổ sung các thông tin thực tế như phiên bản firmware, cấu hình phần cứng, dữ liệu cảm biến và kết quả kiểm thử vật lý nếu các nhóm xác định cần lưu.

## 7. Phối hợp với các nhóm khác

- **WS0:** Thống nhất schema dùng chung, quy tắc định danh và cách phát hành phiên bản.
- **WS1 — Kỹ sư xử lý dữ liệu:** Nhận metadata, manifest và báo cáo chất lượng.
- **WS1 — Chuyên gia kỹ năng:** Nhận Skill Card và quản lý phiên bản tri thức kỹ năng.
- **WS2:** Thống nhất cách tham chiếu dữ liệu huấn luyện, cấu hình và checkpoint.
- **WS3:** Chuẩn hóa thông tin của mỗi lần đánh giá và quan hệ tới dữ liệu đầu vào.
- **WS4:** Quản lý phiên bản cấu hình môi trường và kịch bản mô phỏng.
- **WS5:** Quản lý tham chiếu tới gói kỹ năng, điều kiện tương thích và biên bản triển khai.

## 8. Mẫu báo cáo cuối nhiệm vụ

- **Mã nhiệm vụ / Tên nhiệm vụ:**
- **Người thực hiện:**
- **Các loại dữ liệu đã quản lý:**
- **Schema và phiên bản:**
- **Định danh và quy tắc phiên bản:**
- **Cách chạy / kiểm tra:**
- **Số bản ghi đã kiểm tra:**
- **Số bản ghi hợp lệ / cảnh báo / lỗi:**
- **Kết quả tìm kiếm và truy xuất nguồn gốc:**
- **Kết quả và bằng chứng:**
- **Lỗi hoặc giới hạn:**
- **Vấn đề về quyền truy cập hoặc quyền sử dụng:**
- **Việc cần nhóm khác hỗ trợ:**
- **Đề xuất bước tiếp theo:**
- **Người rà soát / xác nhận:**
