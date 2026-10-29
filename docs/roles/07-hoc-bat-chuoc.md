# 07. Kỹ sư học bắt chước (Imitation Learning Engineer)

- **Nhóm:** WS2 — Mô hình và khởi tạo kỹ năng
- **Mục tiêu:** Nghiên cứu, xây dựng và đánh giá các phương pháp học bắt chước để giúp robot Jumper học hành vi từ dữ liệu trình diễn của con người, chuyên gia hoặc các chính sách có sẵn.
- **Phạm vi:** Đánh giá khả năng sử dụng dữ liệu; xác định bài toán học; xây dựng baseline; thử nghiệm Behavior Cloning và các phương pháp phù hợp; đánh giá khả năng tổng quát hóa; phân tích lỗi và chuẩn bị tích hợp với môi trường mô phỏng.
- **Điều kiện tiên quyết:** Có thể bắt đầu bằng việc khảo sát dữ liệu và xây dựng pipeline mẫu. Huấn luyện chính sách điều khiển robot chỉ khả thi khi dữ liệu có đầu vào và mục tiêu hành động phù hợp với bài toán.
- **Nhóm phối hợp:** WS0 — Điều phối; WS1 — Dữ liệu và tri thức; WS3 — Kiểm thử và Benchmark; WS4 — Mô phỏng và Digital Twin; WS5 — Tích hợp và triển khai.

## 1. Mục tiêu nghiệp vụ

Nhân sự phụ trách phải trả lời được các câu hỏi:

1. Dữ liệu hiện có chứa thông tin gì và có đủ để học hành vi hay không?
2. Mô hình cần dự đoán hành động nào từ thông tin quan sát nào?
3. Nên sử dụng Behavior Cloning, mô hình chuỗi thời gian hay phương pháp khác?
4. Dữ liệu cần được chuẩn hóa và chia tập như thế nào để tránh đánh giá sai?
5. Mô hình có thực sự học được hành vi hay chỉ ghi nhớ dữ liệu huấn luyện?
6. Mô hình hoạt động ra sao khi trạng thái hoặc môi trường khác với dữ liệu trình diễn?
7. Cần kiểm thử gì trước khi chuyển mô hình sang mô phỏng hoặc robot thật?

**Đầu ra cuối cùng:** Một pipeline học bắt chước có thể chạy lại, có bằng chứng định lượng, giới hạn được mô tả rõ ràng và có kết luận về mức độ sẵn sàng cho bước tiếp theo.

## 2. Phân biệt các loại bài toán học bắt chước

Trước khi viết mô hình, nhân sự phải xác định bài toán thuộc loại nào. Không được mặc định mọi video đều có thể dùng để huấn luyện chính sách điều khiển.

| Loại dữ liệu đầu vào | Mục tiêu có thể nghiên cứu | Giới hạn chính |
|---|---|---|
| Video đơn thuần | Nhận diện giai đoạn thao tác, phát hiện sự kiện, học đặc trưng thị giác hoặc dự đoán nhãn quan sát được | Không tự cung cấp đầy đủ lệnh điều khiển và trạng thái bên trong robot |
| Video có nhãn thao tác | Phân loại hành động hoặc dự đoán bước tiếp theo nếu nhãn đủ rõ | Nhãn phân loại không nhất thiết tương đương lệnh điều khiển liên tục |
| Quan sát đồng bộ với hành động | Học ánh xạ từ quan sát sang hành động bằng Behavior Cloning | Cần kiểm tra chất lượng, đồng bộ và độ bao phủ của dữ liệu |
| Chuỗi quan sát, trạng thái và hành động theo thời gian | Học chính sách có xét lịch sử, thử nghiệm mô hình chuỗi thời gian | Cần định nghĩa rõ cửa sổ thời gian, trạng thái ẩn và cách suy luận |
| Dữ liệu trình diễn có thông tin mục tiêu hoặc ngữ cảnh | Nghiên cứu chính sách có điều kiện theo mục tiêu hoặc tác vụ | Phải có dữ liệu đủ đa dạng cho từng mục tiêu |
| Dữ liệu trình diễn kết hợp môi trường mô phỏng | Huấn luyện và đánh giá chính sách trong mô phỏng | Kết quả mô phỏng chưa chứng minh được khả năng chạy trên robot thật |

Các phương pháp như Behavior Cloning, mô hình chuỗi thời gian, DAgger hoặc Inverse Reinforcement Learning có yêu cầu dữ liệu và quy trình khác nhau. Không bắt buộc triển khai tất cả; lựa chọn phải dựa trên bằng chứng về dữ liệu, mục tiêu và nguồn lực.

## 3. Công việc cần thực hiện

### D7.1 — Khảo sát dữ liệu và đánh giá tính khả thi

**Mục tiêu:** Xác định dữ liệu có thể dùng cho bài toán nào trước khi chọn mô hình.

**Các bước thực hiện:**

1. Thu thập danh mục video, dữ liệu trình diễn, metadata, trạng thái robot, nhãn hành động và các bộ dữ liệu hiện có.
2. Ghi rõ nguồn, quyền sử dụng, định dạng, thời lượng, tần suất lấy mẫu và các trường dữ liệu có sẵn.
3. Kiểm tra dữ liệu có đồng bộ giữa quan sát và hành động hay không.
4. Xác định hành động được biểu diễn bằng dạng nào, chẳng hạn:
   - Nhãn hành động rời rạc.
   - Vị trí hoặc vận tốc khớp mục tiêu.
   - Lệnh vận tốc cho bộ phận chấp hành.
   - Lệnh điều khiển ở cấp cao.
5. Xác định quan sát đầu vào, chẳng hạn ảnh, trạng thái khớp, trạng thái thân robot hoặc thông tin mục tiêu.
6. Kiểm tra dữ liệu thiếu, trùng, sai thời gian, bất thường và các đoạn trình diễn thất bại.
7. Kiểm tra độ đa dạng của người trình diễn, trạng thái ban đầu, đối tượng và môi trường.
8. Xác định dữ liệu có chứa đủ biến mục tiêu để huấn luyện hay chỉ hỗ trợ một bài toán phụ.
9. Lập báo cáo khả thi, ghi rõ điều đã xác minh, giả định và dữ liệu còn thiếu.

**Đầu ra:**
- Báo cáo khảo sát dữ liệu.
- Danh sách trường dữ liệu và ý nghĩa.
- Bảng chất lượng dữ liệu.
- Kết luận về các bài toán có thể thử nghiệm.
- Danh sách dữ liệu cần bổ sung.

**Tiêu chí nghiệm thu:**
- Xác định rõ đầu vào và mục tiêu dự đoán có sẵn.
- Không tuyên bố huấn luyện điều khiển đầy đủ nếu không có mục tiêu hành động phù hợp.
- Mọi giới hạn quan trọng của dữ liệu đều được ghi nhận.

### D7.2 — Xác định bài toán học và thiết kế pipeline

**Mục tiêu:** Chuyển nhu cầu học kỹ năng thành một bài toán học máy cụ thể, có thể kiểm tra.

**Các bước thực hiện:**

1. Chọn một kỹ năng có phạm vi rõ ràng.
2. Xác định đầu vào \(o_t\), chẳng hạn quan sát tại thời điểm \(t\).
3. Xác định mục tiêu dự đoán \(a_t\), chẳng hạn hành động được ghi lại tại thời điểm tương ứng.
4. Nếu cần lịch sử, xác định cửa sổ quan sát \(o_{t-k:t}\).
5. Xác định mô hình dự đoán một hành động, một chuỗi hành động hay một phân phối hành động.
6. Xác định cách biểu diễn đầu ra, đơn vị đo và miền giá trị hợp lệ.
7. Xác định tần suất dữ liệu và cách đồng bộ quan sát với hành động.
8. Thiết kế các bước tiền xử lý, huấn luyện, suy luận và đánh giá.
9. Xác định chỉ số đánh giá phù hợp với loại đầu ra.
10. Viết đặc tả bài toán trước khi huấn luyện.

Ví dụ, nếu dữ liệu chứa ảnh và nhãn hành động rời rạc, có thể xây dựng bài toán phân loại. Nếu dữ liệu chứa trạng thái robot và lệnh vận tốc mục tiêu, có thể nghiên cứu hồi quy hành động. Hai bài toán này không nên dùng chung tiêu chí đánh giá một cách máy móc.

**Đầu ra:**
- Đặc tả bài toán.
- Sơ đồ pipeline.
- Quy định đầu vào, đầu ra và tiền xử lý.
- Bộ chỉ số đánh giá.
- Danh sách giả định và điều kiện áp dụng.

**Tiêu chí nghiệm thu:**
- Bài toán có đầu vào và mục tiêu dự đoán cụ thể.
- Có thể tạo tập dữ liệu huấn luyện từ dữ liệu đã xác minh.
- Chỉ số được chọn phù hợp với mục tiêu dự đoán.
- Có thể giải thích rõ mô hình được phép kết luận điều gì và không thể kết luận điều gì.

### D7.3 — Xây dựng baseline Behavior Cloning

**Mục tiêu:** Tạo mô hình tham chiếu đơn giản để xác định dữ liệu có tín hiệu học được hay không.

Behavior Cloning là phương pháp học ánh xạ từ quan sát sang hành động bằng cách dùng dữ liệu trình diễn làm ví dụ huấn luyện.

Với dữ liệu quan sát và hành động đồng bộ, bài toán cơ bản có thể viết là:

\[
\hat a_t = \pi_\theta(o_t)
\]

Trong đó \(o_t\) là quan sát, \(a_t\) là hành động trình diễn và \(\pi_\theta\) là chính sách được học.

**Các bước thực hiện:**

1. Xây dựng bộ nạp dữ liệu và kiểm tra tính tương thích giữa đầu vào với nhãn.
2. Thiết lập baseline đơn giản phù hợp với loại dữ liệu, chẳng hạn mô hình phân loại hoặc hồi quy.
3. Chọn hàm mất mát tương ứng với mục tiêu dự đoán.
4. Xây dựng vòng lặp huấn luyện và lưu cấu hình.
5. Ghi nhận loss huấn luyện và loss validation theo từng giai đoạn.
6. Lưu checkpoint tốt nhất theo tiêu chí validation đã định trước.
7. So sánh với baseline đơn giản hơn, chẳng hạn dự đoán giá trị trung bình hoặc lớp phổ biến nhất nếu phù hợp.
8. Đánh giá khả năng học bằng cách so sánh kết quả mô hình với baseline.
9. Kiểm tra đầu ra có nằm trong miền giá trị hợp lệ hay không.
10. Lưu lệnh chạy, môi trường phần mềm, seed và log.

**Đầu ra:**
- Mã nguồn baseline.
- Cấu hình huấn luyện.
- Checkpoint và log.
- Báo cáo so sánh với baseline đơn giản.
- Hướng dẫn chạy lại.

**Tiêu chí nghiệm thu:**
- Pipeline chạy được trên dữ liệu mẫu.
- Có thể tái tạo kết quả theo cấu hình đã lưu.
- Có chỉ số trên tập validation độc lập với dữ liệu huấn luyện.
- Không coi loss thấp là bằng chứng đủ để kết luận robot thực hiện tốt kỹ năng.

### D7.4 — Chia tập dữ liệu và ngăn rò rỉ dữ liệu

**Mục tiêu:** Đảm bảo kết quả đánh giá phản ánh khả năng dự đoán trên dữ liệu chưa được sử dụng để huấn luyện.

**Các bước thực hiện:**

1. Xác định đơn vị độc lập để chia tập, chẳng hạn lần trình diễn, phiên ghi hình, người trình diễn hoặc môi trường.
2. Tránh chia ngẫu nhiên các khung hình gần nhau của cùng một video vào cả tập huấn luyện và validation nếu việc đó gây rò rỉ thông tin.
3. Tách train, validation và test theo quy tắc được ghi lại.
4. Chỉ dùng train để cập nhật tham số mô hình.
5. Dùng validation để lựa chọn mô hình và siêu tham số.
6. Giữ test làm tập đánh giá cuối cùng theo quy trình đã thống nhất.
7. Nếu dữ liệu ít, cân nhắc đánh giá theo nhóm hoặc cross-validation khi phù hợp.
8. Kiểm tra trùng lặp hoặc tương đồng cao giữa các tập.
9. Lưu danh sách định danh mẫu của từng tập.
10. Báo cáo giới hạn khi dữ liệu quá ít hoặc không đủ đa dạng.

**Đầu ra:**
- Quy tắc chia tập.
- Danh sách mẫu theo từng tập.
- Báo cáo kiểm tra rò rỉ.
- Cấu hình hoặc seed giúp tái tạo việc chia tập.

**Tiêu chí nghiệm thu:**
- Có thể tái tạo các tập dữ liệu.
- Không có trùng lặp trái với quy tắc đã định.
- Phương pháp chia tập phản ánh mục tiêu tổng quát hóa cần kiểm tra.
- Không dùng kết quả test để lựa chọn mô hình trong quá trình phát triển.

### D7.5 — Thử nghiệm mô hình chuỗi thời gian

**Mục tiêu:** Xác định liệu việc sử dụng lịch sử quan sát có giúp dự đoán hành động tốt hơn mô hình chỉ dùng quan sát hiện tại hay không.

**Các bước thực hiện:**

1. Chỉ thực hiện khi dữ liệu có thứ tự thời gian đáng tin cậy và đủ thông tin cho mục tiêu dự đoán.
2. Xây dựng cửa sổ quan sát gồm nhiều thời điểm liên tiếp.
3. Xác định độ dài cửa sổ và cách xử lý đoạn đầu hoặc dữ liệu thiếu.
4. So sánh mô hình chỉ dùng quan sát hiện tại với mô hình dùng lịch sử.
5. Có thể thử RNN, LSTM hoặc kiến trúc chuỗi khác nếu có cơ sở.
6. Đánh giá ảnh hưởng của độ dài lịch sử đến chất lượng dự đoán và chi phí tính toán.
7. Kiểm tra hiện tượng dự đoán trễ, dao động hoặc nhạy cảm với dữ liệu nhiễu.
8. Ghi lại trường hợp mô hình chuỗi thời gian không cải thiện kết quả.

**Đầu ra:**
- Baseline theo chuỗi thời gian.
- Cấu hình và checkpoint.
- Báo cáo so sánh với mô hình không dùng lịch sử.
- Phân tích ưu điểm, hạn chế và chi phí.

**Tiêu chí nghiệm thu:**
- Có phép so sánh công bằng với baseline.
- Có chỉ số phù hợp trên cùng quy tắc chia tập.
- Có phân tích khi mô hình phức tạp không đem lại lợi ích rõ ràng.

### D7.6 — Đánh giá chất lượng hành động dự đoán

**Mục tiêu:** Xác định mô hình dự đoán hành động trình diễn chính xác đến đâu và sai ở trường hợp nào.

**Các bước thực hiện:**

1. Chọn chỉ số phù hợp với loại hành động:
   - Phân loại: accuracy, precision, recall hoặc F1 khi phù hợp.
   - Hồi quy: MAE, RMSE hoặc sai số theo từng chiều.
   - Chuỗi hành động: sai số theo thời gian, độ trễ hoặc mức độ nhất quán.
2. Phân tích kết quả theo từng kỹ năng, trạng thái hoặc điều kiện dữ liệu.
3. Kiểm tra sai số trung bình và các trường hợp sai số lớn.
4. Đánh giá mức độ mất cân bằng giữa các lớp hành động nếu có.
5. Kiểm tra đầu ra bất thường và giá trị ngoài miền hợp lệ.
6. So sánh mô hình với baseline.
7. Ghi rõ chỉ số nào có ý nghĩa đối với mục tiêu thực tế và chỉ số nào chỉ phản ánh chất lượng dự đoán trên dữ liệu.
8. Nếu có môi trường mô phỏng tương thích, chuyển sang đánh giá hành vi thực thi thay vì chỉ đánh giá dự đoán.

**Đầu ra:**
- Báo cáo chỉ số.
- Biểu đồ hoặc bảng sai số.
- Danh sách trường hợp dự đoán sai.
- Kết luận về chất lượng dự đoán và giới hạn.

**Tiêu chí nghiệm thu:**
- Các chỉ số được tính trên tập đánh giá phù hợp.
- Có so sánh với baseline.
- Có phân tích lỗi chứ không chỉ đưa ra một con số tổng hợp.
- Phân biệt rõ độ chính xác dự đoán với tỷ lệ hoàn thành kỹ năng của robot.

### D7.7 — Phân tích khả năng tổng quát hóa và lỗi phân phối dữ liệu

**Mục tiêu:** Kiểm tra mô hình có còn hoạt động khi gặp dữ liệu khác với dữ liệu huấn luyện hay không.

**Các bước thực hiện:**

1. Xác định các yếu tố có thể thay đổi, chẳng hạn góc nhìn, ánh sáng, trạng thái ban đầu hoặc cấu hình môi trường.
2. Chọn các nhóm dữ liệu đánh giá theo yếu tố cần kiểm tra.
3. So sánh kết quả trên điều kiện quen thuộc và điều kiện khác biệt.
4. Xác định trường hợp mô hình dự đoán sai hoặc không ổn định.
5. Phân biệt lỗi do dữ liệu, nhãn, mô hình và cách đánh giá.
6. Đề xuất dữ liệu bổ sung hoặc thay đổi pipeline dựa trên bằng chứng.
7. Ghi rõ các tình huống chưa được đánh giá.
8. Phối hợp với WS3 để xây dựng benchmark tổng quát hóa phù hợp.

**Đầu ra:**
- Báo cáo tổng quát hóa.
- Danh sách điều kiện mô hình hoạt động kém.
- Đề xuất dữ liệu bổ sung.
- Danh sách bài kiểm thử cần thực hiện tiếp.

**Tiêu chí nghiệm thu:**
- Có ít nhất một phép đánh giá ngoài điều kiện huấn luyện khi dữ liệu cho phép.
- Nêu rõ phạm vi mà kết quả có thể đại diện.
- Không tuyên bố tổng quát hóa tốt chỉ dựa trên một tập dữ liệu ngẫu nhiên từ cùng nguồn.

### D7.8 — Đánh giá trong mô phỏng và kiểm tra khả năng tích hợp

**Mục tiêu:** Kiểm tra mô hình có thể được chuyển từ pipeline huấn luyện sang môi trường thực thi hay không.

**Các bước thực hiện:**

1. Xác minh môi trường mô phỏng và giao diện robot có thể sử dụng.
2. Xác định cách chuyển đầu vào của mô hình thành định dạng quan sát mà môi trường cung cấp.
3. Xác định cách chuyển đầu ra của mô hình thành hành động hợp lệ trong môi trường.
4. Kiểm tra kích thước, kiểu dữ liệu, đơn vị và giới hạn đầu ra.
5. Chạy thử trên môi trường mô phỏng nếu đã có mô hình robot và giao diện phù hợp.
6. Đánh giá tỷ lệ hoàn thành kỹ năng, lỗi, thời gian thực hiện và độ ổn định.
7. Lưu log theo từng lần thử.
8. Ghi rõ những khác biệt giữa dữ liệu huấn luyện và môi trường mô phỏng.
9. Bàn giao giao diện và yêu cầu tích hợp cho WS4, WS3 và WS5.
10. Không kết nối robot thật hoặc cho phép chuyển động thực tế nếu chưa qua quy trình an toàn và phê duyệt của WS5.

**Đầu ra:**
- Báo cáo khả năng tích hợp.
- Bộ kiểm tra đầu vào/đầu ra.
- Kết quả đánh giá mô phỏng nếu thực hiện được.
- Danh sách vấn đề cần xử lý trước khi triển khai.

**Tiêu chí nghiệm thu:**
- Giao diện đầu vào/đầu ra được mô tả rõ.
- Các kiểm tra định dạng và giới hạn đầu ra có thể chạy lại.
- Kết quả mô phỏng được phân biệt với kết quả robot thật.
- Nếu chưa có môi trường phù hợp, báo cáo rõ điều kiện còn thiếu thay vì ghi nhận là đã hoàn thành.

### D7.9 — Nghiên cứu phương pháp nâng cao khi có căn cứ

**Mục tiêu:** Chỉ mở rộng phương pháp khi baseline đã được xây dựng và có bằng chứng về điểm yếu cần giải quyết.

Các hướng có thể nghiên cứu:

- **DAgger:** Phương pháp thu thập thêm hành động chuyên gia tại những trạng thái mà chính sách hiện tại dễ mắc lỗi. Chỉ phù hợp khi có cơ chế lấy nhãn hành động chuyên gia hoặc nguồn hành động tham chiếu.
- **Inverse Reinforcement Learning (IRL):** Suy ra hàm thưởng từ dữ liệu trình diễn. Cần xác định bài toán, giả định và cách đánh giá; không mặc định IRL sẽ tốt hơn Behavior Cloning.
- **Học biểu diễn từ video:** Học đặc trưng hoặc nhận biết giai đoạn thao tác khi dữ liệu chưa có hành động robot đầy đủ. Đây không tự động tạo ra chính sách điều khiển.
- **Mô hình hành động có điều kiện:** Học hành vi theo mục tiêu hoặc ngữ cảnh khi dữ liệu có đủ biến điều kiện.
- **Data augmentation:** Tạo biến thể dữ liệu phù hợp để cải thiện độ bền vững; phải kiểm tra rằng biến đổi không làm sai nhãn hoặc thay đổi ý nghĩa hành động.

**Đầu ra:**
- Đề xuất phương pháp nâng cao.
- Giả thuyết cần kiểm tra.
- Kết quả so sánh với baseline nếu đủ điều kiện.
- Khuyến nghị tiếp tục hoặc dừng nghiên cứu.

**Tiêu chí nghiệm thu:**
- Có lý do rõ ràng để sử dụng phương pháp nâng cao.
- Có phép so sánh với baseline.
- Ghi nhận chi phí, giới hạn và điều kiện dữ liệu.
- Không triển khai phương pháp phức tạp chỉ để tăng số lượng mô hình.

## 4. Quy trình làm việc bắt buộc

Mỗi thử nghiệm phải tuân theo quy trình:

1. **Đặt câu hỏi nghiên cứu:** Muốn kiểm tra điều gì?
2. **Xác minh dữ liệu:** Đầu vào và mục tiêu dự đoán có thật sự tồn tại không?
3. **Chốt thiết kế:** Chia tập, baseline, chỉ số và điều kiện dừng thử nghiệm.
4. **Chạy thử nhỏ:** Kiểm tra pipeline trên một phần dữ liệu.
5. **Huấn luyện:** Lưu cấu hình, phiên bản mã và log.
6. **Đánh giá:** Dùng quy trình đã xác định trước.
7. **Phân tích lỗi:** Ghi lại các trường hợp điển hình và nguyên nhân có bằng chứng.
8. **Tái lập:** Chạy lại để xác minh kết quả trong phạm vi khả thi.
9. **Bàn giao:** Cung cấp mã, cấu hình, checkpoint, dữ liệu tham chiếu và báo cáo.
10. **Đề xuất bước tiếp theo:** Chỉ ra cần bổ sung dữ liệu, sửa pipeline hay chuyển sang benchmark mô phỏng.

## 5. Sản phẩm bàn giao cuối cùng

1. Báo cáo khả thi về dữ liệu.
2. Đặc tả bài toán học bắt chước.
3. Pipeline tiền xử lý và chia tập.
4. Mã nguồn baseline Behavior Cloning.
5. Mô hình chuỗi thời gian nếu có căn cứ.
6. Cấu hình, checkpoint và log.
7. Báo cáo chỉ số và phân tích lỗi.
8. Báo cáo tổng quát hóa.
9. Kết quả đánh giá mô phỏng nếu điều kiện cho phép.
10. Hướng dẫn chạy lại và danh sách vấn đề còn mở.

## 6. Tiêu chí nghiệm thu tổng thể

- [ ] Đã xác minh loại dữ liệu và mục tiêu dự đoán.
- [ ] Đã mô tả đầu vào và đầu ra của mô hình.
- [ ] Có quy tắc chia tập và kiểm tra rò rỉ dữ liệu.
- [ ] Có baseline phù hợp với dữ liệu.
- [ ] Có cấu hình và log để tái lập.
- [ ] Có kết quả validation và đánh giá cuối cùng theo quy trình đã định.
- [ ] Có so sánh với baseline đơn giản.
- [ ] Có phân tích lỗi và giới hạn.
- [ ] Đã phân biệt độ chính xác dự đoán với hiệu quả thực thi kỹ năng.
- [ ] Có kết luận về mức độ sẵn sàng chuyển sang mô phỏng hoặc tích hợp.
- [ ] Không tuyên bố đã huấn luyện chính sách điều khiển nếu dữ liệu không hỗ trợ mục tiêu đó.

## 7. Có thể làm trước khi robot về không?

**Có thể làm ngay:**
- Khảo sát tài liệu và dữ liệu hiện có.
- Kiểm tra tính khả thi của dữ liệu.
- Xây dựng schema và pipeline thử nghiệm.
- Huấn luyện mô hình phân loại hoặc dự đoán trên nhãn phù hợp.
- Xây dựng baseline Behavior Cloning nếu có dữ liệu quan sát–hành động thích hợp.
- Chuẩn bị bộ kiểm thử và hướng dẫn chạy lại.

**Cần chờ dữ liệu hoặc môi trường phù hợp:**
- Huấn luyện chính sách điều khiển từ hành động robot nếu chưa có dữ liệu hành động.
- Đánh giá hoàn thành kỹ năng trong mô phỏng nếu chưa có mô hình robot và giao diện điều khiển.
- Xác minh hiệu quả điều khiển trên phần cứng.
- Khẳng định khả năng chuyển giao từ mô phỏng sang robot thật.

## 8. Phối hợp với các nhóm khác

- **WS0:** Thống nhất phạm vi, ưu tiên và tiêu chí nghiệm thu.
- **WS1 — Kỹ sư xử lý dữ liệu:** Cung cấp dữ liệu chuẩn hóa và metadata.
- **WS1 — Chuyên gia kỹ năng:** Cung cấp mô tả kỹ năng, điều kiện thành công và các trường hợp lỗi.
- **WS1 — Quản lý tri thức:** Quản lý định danh, phiên bản dữ liệu và checkpoint.
- **WS3:** Thiết kế benchmark, kiểm tra tổng quát hóa và đánh giá tỷ lệ hoàn thành kỹ năng.
- **WS4:** Cung cấp môi trường mô phỏng và giao diện quan sát–hành động khi sẵn sàng.
- **WS5:** Xác nhận yêu cầu đóng gói, giao diện và quy trình an toàn trước khi triển khai.

## 9. Mẫu báo cáo cuối nhiệm vụ

- **Mã nhiệm vụ / Tên kỹ năng:**
- **Người thực hiện:**
- **Câu hỏi nghiên cứu:**
- **Nguồn dữ liệu và quyền sử dụng:**
- **Đầu vào / mục tiêu dự đoán:**
- **Tình trạng đồng bộ quan sát–hành động:**
- **Quy tắc chia train / validation / test:**
- **Mô hình và baseline:**
- **Cấu hình huấn luyện:**
- **Lệnh chạy / môi trường phần mềm:**
- **Chỉ số và kết quả:**
- **So sánh với baseline:**
- **Phân tích lỗi:**
- **Kết quả tổng quát hóa:**
- **Kết quả mô phỏng hoặc robot thật (nếu có):**
- **Bằng chứng và đường dẫn checkpoint/log:**
- **Giới hạn và giả định:**
- **Dữ liệu hoặc công cụ còn thiếu:**
- **Việc cần nhóm khác hỗ trợ:**
- **Đề xuất bước tiếp theo:**
- **Người rà soát / xác nhận:**
