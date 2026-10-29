# Workstream 2 — Mô hình Căn bản & Khởi tạo (Baseline Models)

## 1. Mục tiêu

Xây dựng thư viện mô hình học từ trình diễn (Learning from Demonstration — LfD) nhằm tái tạo và học các hành vi robot từ dữ liệu đã thu thập, chuẩn hóa tại Workstream 1.

Workstream này tập trung vào việc xây dựng các mô hình nền tảng, thiết lập phương pháp huấn luyện và đánh giá có thể lặp lại, đồng thời tạo cơ sở để so sánh các hướng tiếp cận trước khi triển khai trên robot thật.

**Phạm vi hiện tại:** Ưu tiên các thử nghiệm có thể thực hiện bằng dữ liệu sẵn có và môi trường mô phỏng. Không yêu cầu phải có robot vật lý mới bắt đầu công việc. Các mô hình sử dụng hình ảnh, cảm biến lực hoặc trạng thái khớp chỉ được triển khai khi dữ liệu tương ứng đã có và đủ chất lượng.

## 2. Các nhiệm vụ chính

### D2.1 — Tái tạo quỹ đạo (Trajectory Reproduction)

**Mục tiêu:** Xây dựng mô hình có khả năng tái tạo quỹ đạo chuyển động của robot từ các chuỗi điểm thu được trong dữ liệu trình diễn.

**Công việc:**
- Kiểm tra dữ liệu quỹ đạo đầu vào từ Workstream 1, bao gồm thứ tự thời gian, tư thế robot, đơn vị đo và các giá trị bị thiếu.
- Xây dựng phương pháp nội suy quỹ đạo cơ bản để làm đường chuẩn so sánh.
- Nghiên cứu và thử nghiệm GMM/GMR hoặc GPR để mô hình hóa và tái tạo quỹ đạo từ dữ liệu trình diễn.
- So sánh quỹ đạo được tái tạo với quỹ đạo gốc trên các mẫu dữ liệu chưa dùng trong quá trình xây dựng mô hình.
- Đánh giá sai số vị trí, sai số tư thế nếu có, độ mượt và khả năng xử lý các quỹ đạo có độ dài khác nhau.
- Lưu kết quả tái tạo dưới định dạng thống nhất để Workstream 4 có thể sử dụng khi đánh giá trong sandbox.

**Sản phẩm bàn giao:**
- Mã nguồn tiền xử lý, huấn luyện và tái tạo quỹ đạo.
- Cấu hình mô hình và các tham số có thể điều chỉnh.
- Biểu đồ so sánh quỹ đạo gốc và quỹ đạo tái tạo.
- Báo cáo sai số và độ mượt trên tập kiểm thử.

**Tiêu chí nghiệm thu:**
- Có thể chạy lại thử nghiệm bằng hướng dẫn và cấu hình được cung cấp.
- Kết quả có số liệu sai số rõ ràng, tối thiểu gồm MSE trên các đại lượng được so sánh.
- Có phương pháp đường chuẩn để xác định mô hình thống kê có cải thiện so với nội suy cơ bản hay không.

### D2.2 — Học chuỗi hành động bằng Behavior Cloning (RNN/LSTM)

**Mục tiêu:** Huấn luyện mô hình học cách ánh xạ chuỗi trạng thái quan sát được thành hành động, có xét đến thông tin theo thời gian.

**Công việc:**
- Xây dựng dữ liệu huấn luyện theo cấu trúc chuỗi đầu vào → hành động mục tiêu.
- Xác định rõ đầu vào, đầu ra, độ dài chuỗi, cách chia dữ liệu và phương pháp chuẩn hóa.
- Xây dựng mô hình Behavior Cloning cơ bản; sau đó thử nghiệm RNN hoặc LSTM nếu phù hợp với dữ liệu.
- Huấn luyện mô hình dự đoán hành động từ các trạng thái trước đó và so sánh với phương pháp tái tạo quỹ đạo tại D2.1.
- Theo dõi sai số huấn luyện, sai số kiểm thử và dấu hiệu quá khớp.
- Đánh giá lỗi tích lũy khi ghép các hành động dự đoán thành chuỗi nhiều bước, thay vì chỉ đánh giá từng bước riêng lẻ.
- Nếu có môi trường mô phỏng tương thích, chạy thử chuỗi hành động và ghi nhận tỷ lệ hoàn thành nhiệm vụ.

**Sản phẩm bàn giao:**
- Bộ mã nguồn tạo chuỗi dữ liệu, huấn luyện và suy luận.
- Mô hình đã huấn luyện và checkpoint.
- Log huấn luyện, biểu đồ loss và kết quả đánh giá.
- Báo cáo so sánh với đường chuẩn tại D2.1.

**Tiêu chí nghiệm thu:**
- Mô hình có thể huấn luyện và suy luận theo hướng dẫn.
- Có kết quả đánh giá trên dữ liệu chưa dùng để huấn luyện.
- Báo cáo riêng sai số dự đoán từng bước và sai số tích lũy khi chạy nhiều bước.
- Nếu có mô phỏng phù hợp, báo cáo tỷ lệ thành công và các trường hợp thất bại.

### D2.3 — Điều kiện tiếp cận đa phương thức (Multimodal Conditioning)

**Mục tiêu:** Nghiên cứu khả năng kết hợp nhiều nguồn quan sát để mô hình học hành vi trong bối cảnh có nhiều loại cảm biến.

**Công việc:**
- Kiểm kê các nguồn dữ liệu hiện có: hình ảnh camera, trạng thái khớp, tư thế robot và cảm biến lực nếu có.
- Xác định mốc thời gian, tần số lấy mẫu, đơn vị đo và cách đồng bộ giữa các nguồn dữ liệu.
- Xây dựng phương pháp ghép dữ liệu theo thời gian để mỗi mẫu đầu vào tương ứng với hành động mục tiêu.
- Thiết kế thử nghiệm so sánh mô hình chỉ sử dụng một nguồn dữ liệu với mô hình kết hợp nhiều nguồn.
- Kiểm tra ảnh hưởng của dữ liệu thiếu, dữ liệu nhiễu hoặc nguồn cảm biến không đồng bộ.
- Chỉ triển khai mô hình đa phương thức khi dữ liệu và tài nguyên tính toán đáp ứng yêu cầu.

**Sản phẩm bàn giao:**
- Tài liệu mô tả cấu trúc dữ liệu đa phương thức.
- Công cụ đồng bộ và ghép dữ liệu.
- Mã nguồn thử nghiệm mô hình kết hợp nhiều nguồn đầu vào.
- Báo cáo so sánh kết quả giữa các cấu hình.

**Tiêu chí nghiệm thu:**
- Xác định rõ nguồn dữ liệu nào thực sự có sẵn và nguồn nào còn thiếu.
- Có thể tái tạo quy trình ghép dữ liệu trên tập mẫu.
- Kết quả so sánh được báo cáo bằng cùng một bộ chỉ số và cùng cách chia dữ liệu.

### D2.4 — Học ngược hàm thưởng (Inverse Reinforcement Learning — IRL)

**Mục tiêu:** Khảo sát khả năng suy ra hàm thưởng hoặc mục tiêu hành vi từ dữ liệu trình diễn, thay vì chỉ bắt chước trực tiếp các hành động đã quan sát.

**Công việc:**
- Nghiên cứu nguyên lý IRL và xác định điều kiện cần có để triển khai thử nghiệm.
- Chọn một bài toán đơn giản trong môi trường mô phỏng, có trạng thái, hành động và mục tiêu xác định.
- Xây dựng đường chuẩn Behavior Cloning trên cùng dữ liệu trình diễn.
- Thử nghiệm một phương pháp IRL phù hợp với quy mô bài toán.
- Đánh giá hành vi được tạo ra bằng các tiêu chí của nhiệm vụ, chẳng hạn mức độ hoàn thành mục tiêu, số bước thực hiện và mức độ vi phạm ràng buộc.
- So sánh kết quả với Behavior Cloning và ghi nhận chi phí huấn luyện, hạn chế cùng các trường hợp thất bại.

**Sản phẩm bàn giao:**
- Tài liệu khảo sát phương pháp IRL đã lựa chọn.
- Mã nguồn thử nghiệm và cấu hình.
- Kết quả chạy thử trong bài toán mô phỏng.
- Báo cáo so sánh IRL với Behavior Cloning.

**Tiêu chí nghiệm thu:**
- Có một thử nghiệm IRL cụ thể, có thể chạy lại và đánh giá.
- Nêu rõ dữ liệu, giả định, hàm thưởng được suy ra và cách đánh giá.
- Có kết quả so sánh công bằng với Behavior Cloning trên cùng bài toán.
- Nếu IRL không cải thiện kết quả, phải ghi nhận nguyên nhân hoặc giới hạn quan sát được; không yêu cầu IRL mặc nhiên phải tốt hơn.

### D2.5 — Mở rộng dữ liệu (Data Augmentation / GAN)

**Mục tiêu:** Khảo sát khả năng tăng độ đa dạng của dữ liệu trình diễn nhằm cải thiện khả năng tổng quát hóa của mô hình.

**Công việc:**
- Xác định các biến đổi dữ liệu phù hợp với từng loại đầu vào, chẳng hạn thêm nhiễu nhỏ vào trạng thái hoặc thay đổi hình ảnh trong giới hạn hợp lý.
- Xây dựng thử nghiệm tăng cường dữ liệu bằng các phương pháp đơn giản trước.
- So sánh mô hình huấn luyện trên dữ liệu gốc với mô hình huấn luyện trên dữ liệu đã tăng cường.
- Đánh giá kết quả trên tập kiểm thử độc lập hoặc các điều kiện mô phỏng chưa xuất hiện trong tập huấn luyện.
- Chỉ nghiên cứu GAN khi có đủ dữ liệu, tài nguyên và lý do kỹ thuật rõ ràng; không xem GAN là yêu cầu bắt buộc của giai đoạn đầu.
- Kiểm tra xem dữ liệu tổng hợp có làm sai lệch quỹ đạo, hành động hoặc quan hệ giữa trạng thái và hành động hay không.

**Sản phẩm bàn giao:**
- Công cụ tăng cường dữ liệu và cấu hình biến đổi.
- Bộ dữ liệu thử nghiệm có ghi rõ nguồn gốc và phương pháp tạo.
- Báo cáo so sánh kết quả trước và sau tăng cường dữ liệu.
- Tài liệu nêu các trường hợp tăng cường dữ liệu có ích hoặc gây giảm hiệu quả.

**Tiêu chí nghiệm thu:**
- Có thể tái tạo dữ liệu tăng cường từ dữ liệu đầu vào.
- Không sử dụng dữ liệu kiểm thử để tạo hoặc lựa chọn dữ liệu huấn luyện theo cách gây rò rỉ thông tin.
- Có so sánh định lượng trên cùng bộ chỉ số.
- GAN được xem là hướng nghiên cứu mở rộng, không phải điều kiện bắt buộc để hoàn thành WS2.

## 3. Vai trò và nhân sự

- **Nghiên cứu viên AI/ML:** Khảo sát phương pháp, thiết kế thử nghiệm, phân tích kết quả.
- **Kỹ sư Machine Learning:** Xây dựng pipeline dữ liệu, mã huấn luyện, lưu checkpoint và triển khai đánh giá.
- **Chuyên gia Điều khiển:** Kiểm tra tính hợp lý của quỹ đạo, trạng thái, hành động và các giới hạn chuyển động.
- **Người phụ trách WS2:** Quản lý cấu hình thử nghiệm, thống nhất chỉ số, kiểm tra chất lượng sản phẩm bàn giao và phối hợp với WS1/WS4.

Một người có thể đảm nhiệm nhiều vai trò tùy quy mô nhóm. Mỗi nhiệm vụ cần có người chịu trách nhiệm chính và người kiểm tra kết quả.

## 4. Đầu vào và điều kiện thực hiện

**Đầu vào chính:**
- Dữ liệu trình diễn đã được chuẩn hóa tại WS1.
- Tài liệu mô tả cấu trúc dữ liệu, đơn vị đo, mốc thời gian và cách ánh xạ trạng thái → hành động.
- Một bài toán mẫu đủ đơn giản để kiểm tra quy trình huấn luyện và đánh giá.
- Môi trường mô phỏng từ WS4 khi cần chạy thử hành vi hoặc đánh giá mức độ hoàn thành nhiệm vụ.

**Điều kiện tối thiểu để bắt đầu:**
- Có một tập dữ liệu mẫu hợp lệ để kiểm tra pipeline.
- Có định nghĩa rõ đầu vào và đầu ra của từng mô hình.
- Có cách chia dữ liệu huấn luyện, xác thực và kiểm thử.
- Có ít nhất một đường chuẩn đơn giản để đối chiếu kết quả.

Nếu chưa có hình ảnh, cảm biến lực hoặc môi trường mô phỏng, nhóm vẫn có thể hoàn thành các thử nghiệm ban đầu bằng dữ liệu quỹ đạo và trạng thái sẵn có. Các phần phụ thuộc vào dữ liệu hoặc mô phỏng còn thiếu phải được đánh dấu là chờ điều kiện, không được báo cáo như đã hoàn thành.

## 5. Đầu ra chung của WS2

1. **Thư viện mã nguồn:** Mã tiền xử lý, huấn luyện, suy luận và đánh giá cho các mô hình đã triển khai.
2. **Checkpoint:** Các mô hình đã huấn luyện cùng cấu hình tương ứng.
3. **Logs và metrics:** Log huấn luyện, loss, MSE hoặc sai số phù hợp với bài toán, độ mượt quỹ đạo và success rate khi có mô phỏng.
4. **Bộ benchmark:** Tập thử nghiệm, phương pháp đánh giá, kết quả của từng mô hình và đường chuẩn.
5. **Hướng dẫn chạy:** Môi trường phần mềm, thư viện cần cài, lệnh chạy, tham số, cấu trúc thư mục và cách đọc kết quả.
6. **Báo cáo hạn chế:** Các vấn đề về dữ liệu, quá khớp, lỗi tích lũy, khả năng tổng quát hóa và các điều kiện chưa đáp ứng.

## 6. Tiêu chí nghiệm thu tổng thể

WS2 được nghiệm thu dựa trên khả năng tái tạo kết quả, chất lượng đánh giá và tính hữu dụng của các mô hình, không chỉ dựa vào việc đã viết xong mã nguồn.

- [ ] Mỗi nhiệm vụ đã triển khai có mã nguồn, cấu hình và hướng dẫn chạy.
- [ ] Có đường chuẩn để so sánh, không chỉ báo cáo kết quả của một mô hình riêng lẻ.
- [ ] Có kết quả trên tập kiểm thử tách biệt với dữ liệu huấn luyện.
- [ ] Chỉ số được định nghĩa rõ, có đơn vị khi phù hợp và có cách tính nhất quán.
- [ ] Quỹ đạo được đánh giá về sai số và độ mượt; chuỗi hành động được đánh giá về sai số tích lũy.
- [ ] Khi có mô phỏng phù hợp, có báo cáo tỷ lệ thành công và các trường hợp thất bại.
- [ ] Người khác có thể chạy lại thử nghiệm theo tài liệu bàn giao.
- [ ] Các kết quả không cải thiện hoặc chưa đủ điều kiện thực hiện được ghi nhận minh bạch.

**Lưu ý:** Không đặt một ngưỡng MSE chung cho tất cả mô hình nếu chưa xác định đơn vị, thang đo và độ khó của nhiệm vụ. Ngưỡng nghiệm thu cụ thể cần được thiết lập sau khi có đường chuẩn và bộ dữ liệu mẫu.

## 7. Kế hoạch triển khai đề xuất

**Giai đoạn 1 — Thiết lập đường chuẩn**
- Kiểm tra dữ liệu đầu vào từ WS1.
- Xây dựng pipeline đánh giá chung.
- Hoàn thành phương pháp nội suy quỹ đạo cơ bản.

**Giai đoạn 2 — Xây dựng mô hình nền tảng**
- Thử nghiệm GMM/GMR hoặc GPR cho tái tạo quỹ đạo.
- Huấn luyện Behavior Cloning bằng RNN/LSTM khi dữ liệu phù hợp.
- Ghi nhận kết quả và các lỗi thường gặp.

**Giai đoạn 3 — Đánh giá và mở rộng**
- Thử nghiệm đầu vào đa phương thức nếu dữ liệu khả dụng.
- Chạy nghiên cứu IRL trên bài toán mô phỏng nhỏ.
- Đánh giá Data Augmentation; chỉ mở rộng sang GAN nếu có cơ sở.

**Giai đoạn 4 — Đóng gói và bàn giao**
- Chuẩn hóa cấu hình, checkpoint, log và cách chạy lại.
- Tổng hợp benchmark.
- Bàn giao các mô hình phù hợp cho WS4 đánh giá trong sandbox.

Các giai đoạn có thể chạy song song khi đủ nhân sự và dữ liệu, nhưng các thử nghiệm mở rộng không được làm chậm việc hoàn thành đường chuẩn.

## 8. Effort, phụ thuộc và rủi ro

**Effort:** M–L (trung bình đến nặng). Khối lượng thực tế phụ thuộc vào chất lượng dữ liệu, số lượng cấu hình thử nghiệm, tài nguyên tính toán và mức độ tích hợp với mô phỏng.

**Phụ thuộc:**
- **WS1 — Data & Expert Knowledge:** Cung cấp dữ liệu trình diễn đã chuẩn hóa.
- **WS4 — Sandbox Development:** Cung cấp môi trường đánh giá hành vi khi mô hình cần được chạy trong mô phỏng.

**Rủi ro và biện pháp xử lý:**

| Rủi ro | Biện pháp |
|---|---|
| Dữ liệu thiếu, nhiễu hoặc không đồng bộ | Kiểm tra chất lượng và ghi rõ giới hạn trước khi huấn luyện |
| Mô hình quá khớp dữ liệu trình diễn | Tách tập dữ liệu, theo dõi kết quả xác thực và kiểm thử |
| Sai số tích lũy khi chạy chuỗi hành động | Đánh giá nhiều bước, không chỉ đánh giá dự đoán đơn lẻ |
| Mô hình phức tạp không tốt hơn đường chuẩn | Giữ lại đường chuẩn và yêu cầu có kết quả so sánh |
| Thiếu dữ liệu đa phương thức hoặc mô phỏng | Chia nhiệm vụ thành phần có thể làm ngay và phần chờ điều kiện |
| GAN/IRL tốn nhiều công sức nhưng ít giá trị thực tế | Xem là hướng nghiên cứu mở rộng, triển khai trên bài toán nhỏ trước |

## 9. Cấu trúc thư mục đề xuất

```text
WS2-Baseline-Models/
├── README.md
├── configs/
├── data/
│   └── README.md
├── src/
│   ├── trajectory_reproduction/
│   ├── behavior_cloning/
│   ├── multimodal/
│   ├── irl/
│   └── augmentation/
├── scripts/
│   ├── train.py
│   ├── evaluate.py
│   └── reproduce.py
├── checkpoints/
├── logs/
├── results/
│   ├── metrics/
│   ├── plots/
│   └── benchmark/
└── docs/
    ├── setup.md
    ├── methodology.md
    └── limitations.md
```

Cấu trúc trên là đề xuất ban đầu; nhóm có thể điều chỉnh theo công nghệ sử dụng, nhưng phải giữ rõ ràng phần mã nguồn, cấu hình, checkpoint, kết quả và tài liệu.

## 10. Bàn giao cho các Workstream tiếp theo

- **WS1:** Phản hồi các yêu cầu bổ sung về chất lượng dữ liệu, cấu trúc chuỗi và thông tin cảm biến.
- **WS4:** Cung cấp mô hình, cấu hình suy luận, định dạng đầu vào/đầu ra và hướng dẫn chạy để tích hợp vào sandbox.
- **WS5 — Chuẩn bị triển khai:** Cung cấp thông tin về môi trường phụ thuộc, định dạng mô hình, giới hạn suy luận và các điều kiện cần kiểm tra trước khi đưa mô hình đến hệ thống robot thật.

**Nguyên tắc bàn giao:** Chỉ tuyên bố mô hình đã sẵn sàng cho một bước tiếp theo khi có bằng chứng kiểm thử tương ứng. Mô hình chạy được trên dữ liệu ngoại tuyến chưa đồng nghĩa với việc đã hoạt động an toàn hoặc thành công trên robot thật.
