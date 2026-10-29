# Workstream 1: Dữ liệu và Tri thức Chuyên gia
**Tên tiếng Anh:** Data & Expert Knowledge

## 1. Mục tiêu

Xây dựng quy trình thu thập, xử lý và chuẩn hóa dữ liệu thao tác của chuyên gia, để dữ liệu có thể được sử dụng cho học bắt chước (Imitation Learning), huấn luyện kỹ năng robot và đánh giá chính sách điều khiển trong các giai đoạn tiếp theo.

Phạm vi công việc được chia thành hai giai đoạn:
- **Trước khi có robot:** chuẩn bị quy trình, schema, pipeline và dữ liệu video mẫu; không giả định đã có dữ liệu cảm biến từ robot.
- **Sau khi có robot và cảm biến:** bổ sung dữ liệu cảm biến thực tế, kiểm chứng đồng bộ thời gian và hoàn thiện bộ dữ liệu đa phương thức.

## 2. Nhiệm vụ cụ thể

### 2.1. Xác định quy trình thao tác
- Chọn các thao tác cần ghi nhận và mô tả mục tiêu của từng thao tác.
- Xác định điều kiện bắt đầu, điều kiện hoàn thành, điều kiện thành công và các trường hợp thất bại.
- Viết quy trình thao tác thống nhất để các lần thu thập có thể so sánh với nhau.

### 2.2. Thu thập dữ liệu trình diễn
- Thu thập video RGB hoặc RGB-D của thao tác chuyên gia khi có nguồn dữ liệu phù hợp.
- Ghi metadata cho mỗi phiên: mã phiên, người thực hiện hoặc mã người thực hiện, ngày thu thập, môi trường, vật thể, mục tiêu và ghi chú.
- Khi có phần cứng phù hợp, ghi đồng thời dữ liệu cảm biến như vị trí khớp, tư thế và lực/mômen.
- Lưu giữ dữ liệu gốc, không ghi đè lên bản gốc trong quá trình xử lý.

### 2.3. Phân đoạn và gắn nhãn thao tác
Chia mỗi phiên trình diễn thành các giai đoạn theo quy ước của dự án:
1. **Tiếp cận (Approach):** robot hoặc người thực hiện di chuyển đến vị trí thao tác.
2. **Tiếp xúc (Contact):** bắt đầu tương tác với vật thể hoặc môi trường.
3. **Thao tác (Manipulation):** thực hiện hành động chính.
4. **Hoàn thành (Completion):** đạt hoặc không đạt mục tiêu đã định.
5. **Rút lui (Retreat):** rời khỏi vùng thao tác hoặc trở về trạng thái an toàn.

Mỗi nhãn cần có mốc thời gian bắt đầu/kết thúc, tên bước, mục tiêu liên quan và trạng thái thành công/thất bại. Nếu không thể xác định chắc chắn một nhãn, đánh dấu là chưa rõ để kiểm tra lại thay vì tự suy đoán.

### 2.4. Xây dựng pipeline xử lý
- Kiểm tra định dạng, khả năng đọc và tính toàn vẹn của tệp đầu vào.
- Chuẩn hóa tên tệp, mã phiên và cấu trúc thư mục.
- Trích xuất thông tin có thể quan sát từ video và dữ liệu cảm biến nếu nguồn đó tồn tại.
- Đồng bộ timestamps khi có nhiều nguồn dữ liệu; ghi rõ cách đồng bộ và sai số nếu đo được.
- Chuẩn hóa đơn vị, kiểu dữ liệu và định dạng đầu ra.
- Đảm bảo pipeline có thể chạy lại trên dữ liệu gốc và tạo ra kết quả nhất quán.

### 2.5. Thiết kế schema dữ liệu
Schema tối thiểu cần mô tả:
- Mã phiên trình diễn.
- Nguồn dữ liệu và đường dẫn tệp.
- Thời gian bắt đầu/kết thúc và tần số lấy mẫu nếu biết.
- Mục tiêu thao tác và các nhãn giai đoạn.
- Người thực hiện hoặc mã định danh đã được thống nhất.
- Thông tin môi trường và vật thể liên quan.
- Các trường cảm biến, đơn vị đo và trạng thái có/không có dữ liệu.
- Lỗi chất lượng, ghi chú và phiên bản pipeline.

Có thể dùng JSON làm định dạng trao đổi ban đầu. Nếu nhóm cần MATLAB hoặc định dạng khác, phải ghi rõ lý do và cách chuyển đổi. Không bắt buộc phải dùng đồng thời nhiều định dạng nếu chưa có nhu cầu cụ thể.

### 2.6. Kiểm tra chất lượng dữ liệu
Xây dựng các kiểm tra tự động hoặc checklist để phát hiện:
- Tệp thiếu, rỗng, hỏng hoặc không đọc được.
- Video có khung hình bị thiếu hoặc thời lượng bất thường.
- Timestamp không tăng hợp lý, trùng lặp hoặc lệch giữa các nguồn.
- Nhãn thiếu mốc thời gian, chồng lấn không hợp lệ hoặc không có trạng thái kết quả.
- Trường metadata bắt buộc bị thiếu.
- Đơn vị đo không rõ hoặc dữ liệu cảm biến ngoài phạm vi dự kiến.

Báo cáo cần ghi rõ số mẫu đã kiểm tra, số lỗi theo loại, ví dụ lỗi tiêu biểu và hướng xử lý. Không âm thầm loại bỏ dữ liệu lỗi.

### 2.7. Đóng gói và bàn giao
- Đóng gói dataset mẫu có cấu trúc thư mục rõ ràng.
- Bàn giao schema và ví dụ dữ liệu hợp lệ.
- Bàn giao mã nguồn pipeline, hướng dẫn cài đặt và cách chạy.
- Bàn giao báo cáo chất lượng, danh sách lỗi đã biết và giới hạn sử dụng.
- Ghi phiên bản dataset và pipeline để có thể truy vết kết quả.

## 3. Vai trò và trách nhiệm

| Vai trò | Trách nhiệm chính |
|---|---|
| Kỹ sư dữ liệu (Data Engineer) | Thiết kế schema, xây pipeline xử lý, kiểm tra chất lượng và quản lý phiên bản dữ liệu. |
| Chuyên gia lĩnh vực (Subject Matter Expert) | Xác định quy trình thao tác, phân đoạn, nhãn mục tiêu và điều kiện thành công/thất bại. |
| Kỹ sư hệ thống (Systems Engineer) | Thiết kế cấu trúc lưu trữ, quy ước mã phiên và tích hợp dữ liệu từ nhiều nguồn. |

Một người có thể đảm nhiệm nhiều vai trò trong giai đoạn đầu nếu quy mô nhóm nhỏ; trách nhiệm bàn giao vẫn phải được xác định rõ.

## 4. Đầu vào

- Video thao tác chuyên gia hoặc video mẫu được phép sử dụng.
- Mô tả quy trình và danh sách thao tác cần ghi nhận.
- Thông tin về camera RGB/RGB-D và cảm biến liên quan nếu có.
- Quy ước lưu trữ, đặt tên tệp và công cụ xử lý.
- Khi triển khai với robot: dữ liệu vị trí khớp, tư thế, lực/mômen và thông tin thời gian tương ứng.

## 5. Sản phẩm bàn giao

1. **Dataset trình diễn mẫu:** video, nhãn, metadata và dữ liệu cảm biến nếu có.
2. **Schema dữ liệu:** mô tả trường, kiểu dữ liệu, đơn vị, trường bắt buộc và cách biểu diễn dữ liệu thiếu.
3. **Pipeline xử lý:** mã nguồn có thể chạy lại trên dữ liệu đầu vào.
4. **Công cụ kiểm tra chất lượng:** script hoặc checklist phát hiện dữ liệu thiếu, lỗi định dạng, timestamp bất thường và nhãn không hợp lệ.
5. **Báo cáo chất lượng:** thống kê mẫu, tỷ lệ lỗi, lỗi tiêu biểu và biện pháp xử lý.
6. **Hướng dẫn sử dụng:** cách cài đặt, chạy pipeline, đọc schema và tạo dataset mới.

## 6. Tiêu chí nghiệm thu

- [ ] Mỗi phiên có mã định danh duy nhất và metadata theo schema.
- [ ] Các giai đoạn thao tác được gắn nhãn theo quy ước thống nhất.
- [ ] Mốc thời gian và trạng thái thành công/thất bại được ghi rõ khi xác định được.
- [ ] Pipeline chạy được trên bộ dữ liệu mẫu theo hướng dẫn.
- [ ] Chạy lại pipeline tạo ra kết quả nhất quán; các khác biệt được giải thích.
- [ ] Báo cáo chất lượng thống kê lỗi và không che giấu dữ liệu thiếu.
- [ ] Tài liệu giải thích các trường dữ liệu, kiểu dữ liệu, đơn vị và giá trị có thể thiếu.
- [ ] Với các phiên có cả video và cảm biến, có kiểm tra đồng bộ thời gian và ghi nhận giới hạn/sai số nếu xác định được.

**Lưu ý nghiệm thu:** không yêu cầu dữ liệu cảm biến thực tế trước khi có phần cứng phù hợp. Trong giai đoạn chuẩn bị, có thể nghiệm thu schema, pipeline và bộ video mẫu độc lập.

## 7. Effort, phụ thuộc và rủi ro

- **Effort:** M (vừa) — ước lượng ban đầu; cần điều chỉnh theo số lượng thao tác, số phiên trình diễn và nguồn dữ liệu thực tế.
- **Phụ thuộc:** quy trình thao tác, video mẫu, thiết bị quay; dữ liệu cảm biến thực tế phụ thuộc vào robot và cảm biến tương thích.
- **Rủi ro:** video hoặc cảm biến nhiễu; lệch thời gian; nhãn mơ hồ; metadata thiếu; thay đổi schema; không thể tái tạo kết quả xử lý.
- **Biện pháp giảm thiểu:** lưu dữ liệu gốc, thống nhất schema và quy tắc gắn nhãn, kiểm tra tự động, quản lý phiên bản và ghi rõ các giới hạn của dữ liệu.

## 8. Kế hoạch thực hiện đề xuất

### Giai đoạn A — Trước khi có robot
1. Chọn một số thao tác mẫu và viết quy trình.
2. Xác định schema và quy ước thư mục.
3. Thu thập video mẫu có thể sử dụng hợp pháp.
4. Viết pipeline kiểm tra tệp, metadata và phân đoạn video.
5. Tạo bộ dữ liệu mẫu và báo cáo chất lượng ban đầu.

### Giai đoạn B — Khi có robot và cảm biến
1. Xác minh cách ghi dữ liệu từ robot và cảm biến.
2. Ghi thử video và dữ liệu cảm biến đồng thời.
3. Đo/kiểm tra độ lệch thời gian và chuẩn hóa đơn vị.
4. Cập nhật schema và pipeline theo dữ liệu thực tế.
5. Thu thập tập trình diễn thử nghiệm, đánh giá chất lượng và bàn giao.

## 9. Ví dụ cấu trúc thư mục

```text
ws1-data-expert-knowledge/
├── README.md
├── schema/
│   └── demo.schema.json
├── data/
│   ├── raw/
│   │   └── demo_0001/
│   │       ├── video.mp4
│   │       ├── metadata.json
│   │       └── sensors.csv
│   └── processed/
│       └── demo_0001/
│           ├── segments.json
│           └── quality_report.json
├── pipeline/
│   └── README.md
└── reports/
    └── data_quality_report.md
```

`sensors.csv` chỉ xuất hiện khi có dữ liệu cảm biến. Không tạo dữ liệu cảm biến giả để lấp chỗ trống.

## 10. Mẫu metadata JSON

```json
{
  "demo_id": "demo_0001",
  "task_name": "sample_task",
  "performer_id": "performer_001",
  "environment": "environment_001",
  "start_time": null,
  "video": {
    "path": "data/raw/demo_0001/video.mp4",
    "format": "mp4",
    "available": true
  },
  "sensors": {
    "available": false,
    "files": [],
    "reason_unavailable": "Chưa có phần cứng cảm biến"
  },
  "segments": [
    {
      "label": "approach",
      "start_timestamp_s": 0.0,
      "end_timestamp_s": 1.2,
      "outcome": null
    }
  ],
  "schema_version": "1.0",
  "notes": ""
}
```

Đây là ví dụ minh họa schema; các mốc thời gian và thông tin trong dataset thật phải được lấy từ dữ liệu thu thập, không được coi ví dụ này là dữ liệu thực nghiệm.

## 11. Bàn giao cho Workstream khác

- **WS2 — Baseline AI/ML:** nhận dữ liệu đã chuẩn hóa, nhãn và metadata để xây dựng thử nghiệm mô hình ban đầu.
- **WS3 — Benchmark và đánh giá:** nhận định nghĩa thao tác, quy tắc phân đoạn và dữ liệu đánh giá phù hợp.
- **WS4 — Sandbox mô phỏng:** nhận mô tả thao tác và các điều kiện môi trường có liên quan để thiết kế tình huống mô phỏng.
- **WS5 — Đóng gói kỹ năng và CI:** nhận schema, phiên bản dữ liệu và các kiểm tra chất lượng có thể tự động hóa.

Các nhóm cần thống nhất định dạng và phiên bản trước khi coi dữ liệu là đầu vào chính thức.
