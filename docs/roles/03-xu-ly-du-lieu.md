# 03. Kỹ sư xử lý dữ liệu video và chuẩn hóa dữ liệu

- **Nhóm:** WS1 — Dữ liệu và Pipeline dữ liệu
- **Mục tiêu:** Xây dựng công cụ tự động xử lý video đầu vào, trích xuất khung hình, đồng bộ thông tin thời gian, phát hiện lỗi dữ liệu và chuẩn hóa cấu trúc lưu trữ để tạo ra bộ dữ liệu có thể kiểm tra, tái sử dụng và bàn giao cho các nhóm phát triển AI.
- **Phạm vi công việc:** Xử lý video, hình ảnh trích xuất, metadata, kiểm tra chất lượng và quản lý nguồn gốc dữ liệu.
- **Đối tượng sử dụng đầu ra:** WS2 — Mô hình và kỹ năng; WS3 — Kiểm thử và Benchmark; WS4 — Mô phỏng và Digital Twin.
- **Có thể bắt đầu trước khi robot về:** Có. Có thể phát triển và kiểm thử công cụ bằng video mẫu, dữ liệu công khai được phép sử dụng hoặc dữ liệu giả lập.

## 1. Mục tiêu cụ thể

Nhân sự cần xây dựng được một pipeline có khả năng:

1. Tiếp nhận video từ một hoặc nhiều thư mục đầu vào.
2. Kiểm tra thông tin cơ bản và khả năng đọc của từng video.
3. Trích xuất khung hình theo cấu hình xác định.
4. Ghi nhận timestamp và thông tin nguồn gốc của từng khung hình.
5. Phát hiện video lỗi, ảnh lỗi, tệp trùng và các trường hợp dữ liệu bất thường.
6. Chuẩn hóa tên tệp, cấu trúc thư mục và metadata.
7. Tạo báo cáo tổng hợp về số lượng, chất lượng và các lỗi phát hiện được.
8. Cho phép chạy lại quy trình với cùng cấu hình để tạo kết quả có thể đối chiếu.
9. Lưu đầy đủ log và không âm thầm bỏ qua dữ liệu không xử lý được.

**Kết quả mong muốn:** Từ một thư mục chứa video thô, người khác có thể chạy công cụ theo hướng dẫn và nhận được bộ dữ liệu đã chuẩn hóa cùng báo cáo chất lượng, mà không cần xử lý thủ công từng tệp.

## 2. Công việc cần thực hiện

### D3.1 — Khảo sát nguồn dữ liệu và xác định yêu cầu đầu vào

**Mục tiêu:** Xác định dữ liệu thực tế mà công cụ cần xử lý trước khi viết chương trình.

**Các bước thực hiện:**

1. Khảo sát các nguồn video có thể sử dụng: video ghi lại thao tác, video quan sát môi trường, video công khai được cấp phép hoặc dữ liệu mô phỏng.
2. Ghi lại định dạng tệp thường gặp, ví dụ MP4, MOV hoặc AVI; không mặc định tất cả định dạng đều được hỗ trợ trước khi kiểm tra.
3. Thu thập thông tin về độ phân giải, tốc độ khung hình, thời lượng, dung lượng và codec nếu công cụ đọc được.
4. Xác định các trường hợp cần xử lý:
   - Video bình thường.
   - Video không mở được.
   - Video không có khung hình đọc được.
   - Video có thông tin thời gian bất thường.
   - Video có cùng nội dung nhưng khác tên tệp.
   - Video bị thiếu hoặc có metadata không đầy đủ.
5. Xác định quy mô dữ liệu dự kiến để lựa chọn cách xử lý theo từng tệp hoặc theo lô.
6. Kiểm tra quyền sử dụng, nguồn gốc và điều kiện lưu trữ dữ liệu.
7. Phân biệt thông tin đã xác minh với giả định và các thông tin chưa có.

**Đầu ra:**
- Tài liệu mô tả dữ liệu đầu vào.
- Danh sách định dạng và trường hợp cần hỗ trợ.
- Bộ video mẫu đại diện cho các trường hợp bình thường và lỗi.
- Danh sách yêu cầu xử lý và giới hạn đã biết.

**Tiêu chí nghiệm thu:**
- Có bộ dữ liệu mẫu đủ để kiểm tra các tình huống chính.
- Mỗi tệp mẫu có thông tin nguồn gốc.
- Các trường hợp chưa thể kiểm tra được ghi rõ.
- Không tuyên bố hỗ trợ một định dạng hoặc codec khi chưa có bằng chứng thử nghiệm.

### D3.2 — Xây dựng công cụ kiểm tra video đầu vào

**Mục tiêu:** Kiểm tra video trước khi đưa vào bước trích xuất khung hình.

**Các bước thực hiện:**

1. Viết công cụ quét thư mục đầu vào và lập danh sách video cần xử lý.
2. Kiểm tra sự tồn tại, kích thước và khả năng truy cập của từng tệp.
3. Đọc các thông tin có thể lấy được: thời lượng, độ phân giải, tốc độ khung hình, tổng số khung hình do metadata khai báo và codec.
4. Thử đọc một số khung hình để xác định video có thực sự giải mã được hay không.
5. Phân loại kết quả thành các trạng thái, chẳng hạn:
   - `VALID`: Đọc được và đáp ứng điều kiện đầu vào.
   - `WARNING`: Đọc được nhưng có thông tin bất thường.
   - `INVALID`: Không thể xử lý theo yêu cầu hiện tại.
   - `UNSUPPORTED`: Định dạng hoặc codec chưa được công cụ hỗ trợ.
6. Ghi lại lý do cụ thể khi một tệp bị cảnh báo hoặc từ chối xử lý.
7. Cho phép xuất kết quả kiểm tra thành CSV hoặc JSON để các bước sau sử dụng.

**Đầu ra:**
- Mã nguồn kiểm tra video.
- Danh sách video đã kiểm tra.
- Báo cáo trạng thái từng tệp.
- Log lỗi và cảnh báo.

**Tiêu chí nghiệm thu:**
- Công cụ xử lý được danh sách có cả video hợp lệ và video lỗi mà không dừng toàn bộ chương trình vì một tệp lỗi.
- Các tệp không xử lý được có lý do và trạng thái rõ ràng.
- Các thông tin không đọc được phải được ghi nhận là thiếu hoặc không xác định, không tự điền giá trị giả.
- Có thể chạy lại trên bộ dữ liệu mẫu và đối chiếu kết quả.

### D3.3 — Xây dựng công cụ trích xuất khung hình

**Mục tiêu:** Chuyển video thành tập ảnh có quy tắc lấy mẫu rõ ràng và có thể tái tạo.

**Các bước thực hiện:**

1. Xây dựng chương trình đọc video bằng Python và OpenCV hoặc công cụ giải mã phù hợp.
2. Hỗ trợ ít nhất một phương pháp trích xuất được xác định rõ:
   - Lấy một khung hình sau mỗi khoảng thời gian.
   - Hoặc lấy khung hình theo chỉ số.
3. Cho phép cấu hình khoảng lấy mẫu, ví dụ một khung hình mỗi 0,5 giây hoặc mỗi 1 giây. Đây là ví dụ cấu hình, không phải giá trị bắt buộc cho mọi loại dữ liệu.
4. Quy định cách đặt tên ảnh theo mã video và số thứ tự khung hình.
5. Lưu timestamp của từng khung hình theo thời gian video.
6. Ghi lại những khung hình không đọc được hoặc không thể trích xuất.
7. Hỗ trợ xử lý nhiều video theo lô.
8. Tránh nạp toàn bộ video hoặc toàn bộ ảnh vào RAM nếu không cần thiết; ưu tiên xử lý tuần tự khi phù hợp.
9. Cho phép chạy lại mà không ghi đè dữ liệu cũ ngoài ý muốn.
10. Ghi lại cấu hình sử dụng trong mỗi lần chạy để có thể tái hiện kết quả.

**Đầu ra:**
- Công cụ trích xuất khung hình.
- Bộ ảnh được tạo từ video mẫu.
- Metadata liên kết mỗi ảnh với video gốc.
- Cấu hình trích xuất và log của lần chạy.

**Tiêu chí nghiệm thu:**
- Số lượng ảnh và cách lấy mẫu phù hợp với cấu hình đã chọn, trong phạm vi sai số do thời gian và khả năng giải mã của video.
- Ảnh có thể mở lại được và có kích thước hợp lệ.
- Timestamp không bị tự ý tạo nếu không thể xác định đáng tin cậy.
- Có thể truy ngược từng ảnh về video nguồn.
- Nếu một video gặp lỗi, công cụ ghi nhận lỗi và tiếp tục các tệp khác khi có thể.

### D3.4 — Chuẩn hóa timestamp và metadata

**Mục tiêu:** Đảm bảo mỗi ảnh hoặc mẫu dữ liệu có đủ thông tin để các nhóm khác hiểu nó được tạo ra từ đâu và tương ứng với thời điểm nào trong video.

**Các bước thực hiện:**

1. Xác định bộ trường metadata tối thiểu cần lưu.
2. Thống nhất tên trường, kiểu dữ liệu, đơn vị và cách biểu diễn giá trị thiếu.
3. Lưu timestamp theo giây tính từ đầu video, nếu nguồn thời gian của video cho phép xác định.
4. Phân biệt thời gian tương đối trong video với thời gian thực khi ghi hình; không coi hai loại này là một.
5. Ghi nhận chỉ số khung hình và phương pháp trích xuất.
6. Ghi đường dẫn tương đối tới ảnh và định danh video gốc.
7. Lưu thông tin nguồn dữ liệu, phiên bản công cụ và cấu hình xử lý.
8. Kiểm tra metadata để phát hiện trường bắt buộc bị thiếu, sai kiểu hoặc trùng định danh.
9. Tạo hướng dẫn mở rộng metadata khi sau này cần bổ sung nhãn, trạng thái khớp, lệnh điều khiển hoặc thông tin cảm biến.

**Bộ trường metadata đề xuất:**

| Trường | Ý nghĩa |
|---|---|
| `dataset_id` | Mã bộ dữ liệu |
| `video_id` | Mã định danh video nguồn |
| `frame_id` | Mã hoặc số thứ tự khung hình |
| `timestamp_sec` | Thời gian tương đối tính bằng giây |
| `image_path` | Đường dẫn tới ảnh đã trích xuất |
| `source_path` | Đường dẫn hoặc mã tham chiếu video nguồn |
| `width` | Chiều rộng ảnh |
| `height` | Chiều cao ảnh |
| `extraction_method` | Phương pháp lấy khung hình |
| `processing_version` | Phiên bản công cụ xử lý |
| `status` | Trạng thái xử lý |
| `error_code` | Mã lỗi nếu có |
| `source_hash` | Giá trị kiểm tra nội dung tệp nguồn, nếu được triển khai |

**Đầu ra:**
- Quy định metadata.
- Tệp CSV hoặc JSON chứa metadata.
- Công cụ kiểm tra tính hợp lệ của metadata.
- Tài liệu giải thích các trường dữ liệu.

**Tiêu chí nghiệm thu:**
- Mỗi ảnh có định danh và đường dẫn nguồn rõ ràng.
- Timestamp có đơn vị và quy ước xác định.
- Dữ liệu thiếu được biểu diễn nhất quán.
- Metadata không tham chiếu tới các ảnh không tồn tại mà không có cảnh báo.
- Có thể kiểm tra tự động các trường bắt buộc.

### D3.5 — Phát hiện tệp trùng và dữ liệu bất thường

**Mục tiêu:** Phát hiện các trường hợp trùng lặp hoặc bất thường để tránh làm sai lệch số liệu và gây lãng phí tài nguyên.

**Các bước thực hiện:**

1. Phát hiện tệp trùng hoàn toàn bằng mã băm nội dung tệp.
2. Phát hiện các tệp có tên khác nhau nhưng nội dung giống hệt nhau.
3. Kiểm tra ảnh trích xuất bị hỏng hoặc không thể mở.
4. Kiểm tra ảnh có kích thước bằng không hoặc kích thước không hợp lệ.
5. Phát hiện metadata trùng định danh hoặc tham chiếu sai đường dẫn.
6. Có thể bổ sung phát hiện ảnh gần giống nhau bằng phương pháp so sánh hình ảnh, nhưng phải phân biệt với việc trùng hoàn toàn.
7. Báo cáo các nhóm tệp nghi trùng để người phụ trách quyết định xử lý.
8. Không tự động xóa dữ liệu nguồn. Nếu cần loại trùng, phải lưu lại quy tắc và danh sách các tệp bị loại khỏi tập sử dụng.

**Đầu ra:**
- Công cụ kiểm tra trùng và bất thường.
- Danh sách tệp trùng hoặc nghi trùng.
- Báo cáo ảnh lỗi và metadata lỗi.
- Quy tắc xử lý dữ liệu trùng.

**Tiêu chí nghiệm thu:**
- Phân biệt được trùng hoàn toàn và nghi trùng.
- Không xóa dữ liệu gốc một cách tự động.
- Mọi tệp bị loại khỏi tập sử dụng đều có lý do và dấu vết.
- Có dữ liệu mẫu chứng minh công cụ phát hiện được các trường hợp đã thiết kế.

### D3.6 — Chuẩn hóa cấu trúc thư mục và quản lý bộ dữ liệu

**Mục tiêu:** Tạo cấu trúc lưu trữ thống nhất để người khác dễ tìm, kiểm tra và sử dụng dữ liệu.

**Cấu trúc tham khảo:**

```text
dataset/
├── raw/
│   └── videos/
├── processed/
│   ├── frames/
│   │   └── video_001/
│   └── metadata/
├── manifests/
│   ├── video_manifest.csv
│   └── frame_manifest.csv
├── reports/
│   ├── data_quality.json
│   └── processing_summary.csv
├── logs/
├── configs/
└── README.md
```

**Các bước thực hiện:**

1. Tách dữ liệu gốc và dữ liệu đã xử lý.
2. Không chỉnh sửa hoặc ghi đè dữ liệu gốc trong quá trình trích xuất.
3. Thống nhất cách đặt tên video, ảnh, manifest và báo cáo.
4. Dùng đường dẫn tương đối trong manifest khi phù hợp để thuận tiện di chuyển bộ dữ liệu.
5. Ghi lại phiên bản dữ liệu và cấu hình đã dùng để tạo ra nó.
6. Viết README mô tả cấu trúc thư mục, quy trình xử lý và cách kiểm tra.
7. Xác định các loại tệp cần loại trừ khỏi Git, đặc biệt là video dung lượng lớn hoặc dữ liệu không được phép công khai.

**Đầu ra:**
- Cấu trúc thư mục dữ liệu.
- Quy ước đặt tên.
- README hướng dẫn sử dụng.
- Manifest liệt kê video và khung hình.

**Tiêu chí nghiệm thu:**
- Người khác có thể tìm được dữ liệu gốc, dữ liệu đã xử lý và báo cáo.
- Đường dẫn trong manifest có thể kiểm tra.
- Không nhầm dữ liệu gốc với dữ liệu sinh ra.
- Có hướng dẫn quản lý dung lượng và lưu trữ dữ liệu.

### D3.7 — Tạo báo cáo chất lượng dữ liệu

**Mục tiêu:** Cung cấp số liệu rõ ràng về trạng thái bộ dữ liệu sau xử lý.

**Các bước thực hiện:**

1. Tổng hợp số video đầu vào.
2. Thống kê số video hợp lệ, có cảnh báo, không hợp lệ và không được hỗ trợ.
3. Tổng hợp số ảnh đã trích xuất và số ảnh lỗi.
4. Thống kê số tệp trùng hoàn toàn và số tệp nghi trùng.
5. Thống kê metadata thiếu trường, sai định dạng hoặc có đường dẫn không hợp lệ.
6. Ghi lại cấu hình xử lý, phiên bản công cụ và thời điểm chạy.
7. Báo cáo những vấn đề có thể ảnh hưởng đến các bước huấn luyện hoặc đánh giá tiếp theo.
8. Không tự kết luận dữ liệu phù hợp để huấn luyện robot chỉ dựa vào việc video đọc được.

**Đầu ra:**
- Báo cáo chất lượng dữ liệu dạng JSON hoặc CSV.
- Bảng tổng hợp kết quả xử lý.
- Danh sách lỗi và cảnh báo cần xử lý.
- Khuyến nghị các bước làm sạch tiếp theo.

**Tiêu chí nghiệm thu:**
- Số liệu báo cáo có thể đối chiếu với manifest và log.
- Phân biệt rõ số lượng đầu vào, số lượng xử lý thành công và số lượng lỗi.
- Có thể xác định những tệp nào cần xử lý lại.
- Báo cáo không che giấu lỗi hoặc tự bỏ qua các trường hợp thất bại.

### D3.8 — Kiểm thử, tài liệu hóa và bàn giao pipeline

**Mục tiêu:** Đảm bảo công cụ có thể được người khác sử dụng lại mà không phụ thuộc vào người viết ban đầu.

**Các bước thực hiện:**

1. Chuẩn bị bộ kiểm thử bao gồm video hợp lệ, video lỗi, tệp trùng và metadata không hợp lệ.
2. Viết kiểm thử cho các chức năng quan trọng: đọc video, trích xuất ảnh, tạo timestamp, ghi metadata và tạo báo cáo.
3. Kiểm tra khả năng xử lý khi một tệp lỗi xuất hiện giữa một lô video.
4. Kiểm tra việc chạy lại với cùng cấu hình.
5. Ghi lại yêu cầu môi trường, phiên bản thư viện và cách cài đặt.
6. Viết hướng dẫn chạy trên dữ liệu mẫu.
7. Ghi lại các lỗi đã biết, giới hạn tài nguyên và cách khắc phục.
8. Bàn giao mã nguồn, cấu hình, dữ liệu mẫu hợp lệ và không hợp lệ, log và báo cáo.
9. Hướng dẫn người tiếp nhận chạy thử và xác nhận kết quả.

**Đầu ra:**
- Mã nguồn pipeline.
- Bộ kiểm thử và dữ liệu kiểm thử.
- Hướng dẫn cài đặt, chạy và xử lý lỗi.
- Log mẫu và báo cáo chất lượng.
- Biên bản bàn giao.

**Tiêu chí nghiệm thu:**
- Người khác có thể làm theo hướng dẫn và chạy lại thành công trên bộ dữ liệu mẫu.
- Các lỗi đã thiết kế trong bộ kiểm thử được phát hiện và ghi nhận.
- Có thể truy nguyên đầu ra về tệp nguồn và cấu hình xử lý.
- Không yêu cầu thao tác thủ công không được ghi trong hướng dẫn.

## 3. Sản phẩm bàn giao cuối cùng

1. Mã nguồn công cụ kiểm tra video.
2. Mã nguồn trích xuất khung hình.
3. Mã nguồn tạo và kiểm tra metadata.
4. Công cụ phát hiện tệp trùng và dữ liệu bất thường.
5. Cấu trúc bộ dữ liệu mẫu đã chuẩn hóa.
6. Manifest video và khung hình.
7. Báo cáo chất lượng dữ liệu.
8. Bộ kiểm thử tự động và dữ liệu kiểm thử.
9. Cấu hình mẫu, log và hướng dẫn chạy.
10. Tài liệu giới hạn, lỗi đã biết và các vấn đề cần nhóm khác hỗ trợ.

## 4. Điều kiện nghiệm thu tổng thể

- [ ] Có thể quét thư mục và lập danh sách video đầu vào.
- [ ] Có thể kiểm tra và phân loại video lỗi.
- [ ] Có thể trích xuất khung hình theo cấu hình.
- [ ] Có timestamp và liên kết tới video nguồn.
- [ ] Có metadata theo định dạng thống nhất.
- [ ] Có phát hiện tệp trùng và ảnh lỗi.
- [ ] Có manifest và báo cáo chất lượng.
- [ ] Không âm thầm bỏ qua tệp lỗi hoặc tự xóa dữ liệu nguồn.
- [ ] Có log đủ để xác định lỗi và tái hiện lần chạy.
- [ ] Có kiểm thử và hướng dẫn để người khác chạy lại.
- [ ] Có tài liệu nêu rõ các loại dữ liệu chưa được hỗ trợ.

## 5. Có thể làm trước khi robot về không?

Có. Nhân sự có thể phát triển phần lớn pipeline bằng Python và OpenCV hoặc công cụ giải mã phù hợp, sử dụng dữ liệu mẫu có quyền sử dụng hợp lệ.

Trước khi robot về, cần ưu tiên:
- Xây dựng pipeline tổng quát.
- Chuẩn hóa metadata và cấu trúc thư mục.
- Kiểm tra lỗi, trùng lặp và khả năng chạy lại.
- Tạo bộ kiểm thử và báo cáo chất lượng.

Các dữ liệu đặc thù như video đồng bộ với trạng thái khớp, lệnh điều khiển, lực hoặc cảm biến của robot chỉ được bổ sung khi xác định được nguồn và định dạng thực tế. Không giả định rằng video đơn thuần đã chứa đủ thông tin để huấn luyện kỹ năng điều khiển robot.

## 6. Phối hợp với các nhóm khác

- **WS0:** Thống nhất cấu trúc dữ liệu, quy tắc đặt tên, giao diện metadata và tiêu chí nghiệm thu.
- **WS2:** Xác nhận dữ liệu nào thực sự cần cho từng phương pháp huấn luyện; tránh trích xuất quá nhiều dữ liệu không sử dụng.
- **WS3:** Cung cấp manifest và thông tin nguồn gốc để hỗ trợ xây dựng tập kiểm thử có thể truy xuất.
- **WS4:** Phối hợp khi cần chuyển dữ liệu hình ảnh thành đầu vào cho môi trường mô phỏng hoặc nghiên cứu Digital Twin.
- **WS5:** Bàn giao dữ liệu và tài liệu cần thiết cho quy trình đóng gói, tích hợp khi có yêu cầu.

## 7. Mẫu báo cáo cuối nhiệm vụ

- **Mã nhiệm vụ / Tên nhiệm vụ:**
- **Người thực hiện:**
- **Nguồn dữ liệu và quyền sử dụng:**
- **Môi trường và phiên bản công cụ:**
- **Đã hoàn thành:**
- **Cách chạy / kiểm tra:**
- **Số lượng video đầu vào:**
- **Số video xử lý thành công / cảnh báo / thất bại:**
- **Số khung hình được trích xuất:**
- **Số tệp trùng hoặc dữ liệu bất thường:**
- **Kết quả và bằng chứng:**
- **Lỗi hoặc giới hạn:**
- **Giả định chưa xác minh:**
- **Việc cần nhóm khác hỗ trợ:**
- **Đề xuất bước tiếp theo:**
- **Người rà soát / xác nhận:**
