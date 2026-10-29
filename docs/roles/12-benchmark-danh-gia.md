# Workstream 3 — Kiểm thử & Đánh giá (Testing & Benchmark)

## 1. Mục tiêu

Xây dựng bộ kiểm thử và benchmark có khả năng tự động đánh giá chất lượng các mô hình và kỹ năng robot được phát triển tại Workstream 2.

Bộ benchmark tập trung vào ba khía cạnh:

1. **Tái tạo (Reproduction):** Đánh giá khả năng thực hiện lại nhiệm vụ trong điều kiện tương tự dữ liệu trình diễn.
2. **Khái quát hóa (Generalization):** Đánh giá khả năng thực hiện nhiệm vụ khi vị trí, hướng hoặc điều kiện đầu vào thay đổi so với dữ liệu huấn luyện.
3. **Ứng biến lực (Force-adaptation):** Đánh giá khả năng phản ứng khi điều kiện tiếp xúc thay đổi, xuất hiện lực bất thường hoặc robot gặp trở ngại trong quá trình thực hiện.

Mục tiêu không chỉ là xác định mô hình có thực hiện được nhiệm vụ hay không, mà còn đo mức độ ổn định, khả năng xử lý tình huống thất bại và mức độ an toàn trong phạm vi thử nghiệm.

**Phạm vi hiện tại:** Ưu tiên xây dựng kịch bản, mã kiểm thử và quy trình đánh giá trên dữ liệu hoặc môi trường mô phỏng. Khi chưa có robot vật lý, các kết quả chỉ phản ánh hiệu suất trong điều kiện thử nghiệm tương ứng, chưa chứng minh được hiệu suất trên robot thật.

## 2. Các nhiệm vụ chính

### D3.1 — Đánh giá khả năng tái tạo (Reproduction Benchmark)

**Mục tiêu:** Xác định mô hình có thể thực hiện ổn định nhiệm vụ đã được trình diễn trong điều kiện gần với điều kiện huấn luyện hay không.

**Công việc:**
- Lựa chọn các nhiệm vụ mẫu có dữ liệu trình diễn và mô hình tương ứng từ WS2.
- Xác định trạng thái ban đầu, vị trí vật thể, mục tiêu, điều kiện môi trường và trạng thái kết thúc hợp lệ.
- Xây dựng kịch bản kiểm thử có thể chạy lại với cùng cấu hình.
- Tự động ghi nhận kết quả thành công, thất bại, thời gian thực hiện và sai số so với mục tiêu.
- Lặp lại mỗi cấu hình tối thiểu 20 lần khi điều kiện mô phỏng cho phép.
- Tổng hợp kết quả theo từng mô hình và từng nhiệm vụ.

**Chỉ số đánh giá:**
- **Success Rate:** Tỷ lệ số lần hoàn thành nhiệm vụ trên tổng số lần thử.
- **Position Error:** Sai số vị trí giữa kết quả thực hiện và mục tiêu hoặc quỹ đạo tham chiếu.
- **Trajectory Error:** Sai số giữa quỹ đạo thực hiện và quỹ đạo tham chiếu, nếu hai quỹ đạo có thể so sánh hợp lệ.
- **Completion Time:** Thời gian hoàn thành nhiệm vụ.
- **Failure Rate:** Tỷ lệ các lần thử thất bại.

**Sản phẩm bàn giao:**
- Bộ kịch bản tái tạo.
- Mã kiểm thử tự động.
- Log từng lần thử và bảng tổng hợp chỉ số.
- Báo cáo so sánh giữa các mô hình hoặc phiên bản mô hình.

**Tiêu chí nghiệm thu:**
- Có thể chạy lại kịch bản bằng cấu hình đã lưu.
- Mỗi kịch bản có tối thiểu 20 lần thử hoặc ghi rõ lý do chưa đáp ứng.
- Có báo cáo success rate, sai số và thời gian thực hiện.
- Mục tiêu tham khảo ban đầu là success rate từ 90% trở lên trong điều kiện tái tạo chuẩn; ngưỡng chính thức cần được xác nhận theo từng nhiệm vụ.

### D3.2 — Đánh giá khả năng khái quát hóa (Generalization Benchmark)

**Mục tiêu:** Đánh giá mức độ duy trì hiệu suất khi các điều kiện thực hiện khác với dữ liệu đã dùng để huấn luyện.

**Công việc:**
- Xây dựng tập kịch bản biến đổi từ kịch bản tái tạo chuẩn.
- Thay đổi vị trí, hướng hoặc tư thế của vật thể và mục tiêu trong phạm vi xác định.
- Thiết kế các trường hợp như lỗ cắm bị dịch chuyển, vật thể xoay khác hướng hoặc mục tiêu xuất hiện ở vị trí chưa gặp trong dữ liệu huấn luyện.
- Chia rõ các điều kiện chuẩn và điều kiện biến đổi để tránh nhầm lẫn giữa đánh giá tái tạo và đánh giá khái quát hóa.
- Kiểm tra mô hình trên các biến thể chưa dùng để huấn luyện hoặc lựa chọn tham số.
- Đo mức suy giảm hiệu suất so với điều kiện chuẩn.
- Phân loại các lỗi thường gặp, chẳng hạn tiếp cận sai vị trí, sai hướng hoặc không hoàn thành thao tác.

**Chỉ số đánh giá:**
- **Generalization Success Rate:** Tỷ lệ hoàn thành trong các điều kiện biến đổi.
- **Performance Drop:** Mức giảm success rate so với điều kiện chuẩn.
- **Position/Orientation Error:** Sai số vị trí và hướng khi có thể đo được.
- **Recovery Rate:** Tỷ lệ phục hồi thành công sau khi gặp sai lệch, nếu kịch bản có kiểm tra phục hồi.

**Sản phẩm bàn giao:**
- Bộ kịch bản khái quát hóa và các biến thể đầu vào.
- Mã tạo hoặc cấu hình các biến thể.
- Bảng so sánh hiệu suất giữa điều kiện chuẩn và điều kiện biến đổi.
- Báo cáo phân tích các trường hợp thất bại.

**Tiêu chí nghiệm thu:**
- Có ít nhất một nhóm kịch bản chuẩn và một nhóm kịch bản biến đổi.
- Các biến thể được mô tả rõ về loại thay đổi và mức độ thay đổi.
- Có báo cáo mức suy giảm hiệu suất so với điều kiện chuẩn.
- Mục tiêu tham khảo ban đầu có thể là success rate trên 70% trong tập biến đổi; ngưỡng thực tế phải được xác định theo độ khó và phạm vi biến đổi của từng nhiệm vụ.

### D3.3 — Đánh giá ứng biến lực (Force-adaptation Benchmark)

**Mục tiêu:** Đánh giá khả năng phản ứng của mô hình hoặc bộ điều khiển khi xuất hiện thay đổi trong quá trình tiếp xúc, thao tác hoặc tác động lực.

**Công việc:**
- Xác định các tình huống cần kiểm thử, chẳng hạn tăng ma sát, vật thể dịch chuyển nhẹ khi tiếp xúc hoặc thao tác gặp lực cản.
- Thiết lập mức độ biến đổi của từng tình huống trong phạm vi mà mô phỏng có thể biểu diễn.
- Xây dựng kịch bản ghi nhận trạng thái robot, lực tiếp xúc nếu khả dụng, hành động điều khiển và trạng thái kết thúc.
- Đánh giá khả năng tiếp tục thao tác, điều chỉnh hành vi, dừng hoặc chuyển sang trạng thái an toàn theo thiết kế của hệ thống.
- Đếm số lần robot mắc kẹt, thất bại hoặc cần khởi động lại.
- Kiểm tra khả năng phục hồi sau nhiễu hoặc trở ngại.
- Đối chiếu kết quả với giới hạn lực và quy tắc dừng an toàn đã được xác định cho bài toán.

**Chỉ số đánh giá:**
- **Peak Force:** Lực cực đại trong quá trình thử nghiệm, nếu môi trường cung cấp phép đo phù hợp.
- **Stall Count:** Số lần robot mắc kẹt hoặc không thể tiếp tục tiến triển.
- **Safe Stop Rate:** Tỷ lệ tình huống yêu cầu dừng mà hệ thống dừng theo đúng tiêu chí.
- **Recovery Rate:** Tỷ lệ tình huống phục hồi thành công sau nhiễu.
- **Task Success Rate:** Tỷ lệ hoàn thành nhiệm vụ trong điều kiện có lực cản hoặc sai lệch.
- **Response Time:** Thời gian từ khi phát hiện hoặc ghi nhận sự kiện bất thường đến khi phản ứng.

**Sản phẩm bàn giao:**
- Bộ kịch bản kiểm thử ứng biến lực.
- Cấu hình lực cản hoặc nhiễu tiếp xúc trong mô phỏng.
- Mã ghi log và phân tích kết quả.
- Báo cáo các trường hợp mắc kẹt, dừng an toàn và phục hồi.

**Tiêu chí nghiệm thu:**
- Mỗi tình huống có mô tả điều kiện kích hoạt, kết quả mong đợi và cách xác định thất bại.
- Các chỉ số được ghi lại nhất quán trong những lần chạy.
- Có báo cáo về lực cực đại, số lần mắc kẹt và khả năng dừng hoặc phục hồi khi các chỉ số tương ứng khả dụng.
- Không tuyên bố đã kiểm chứng an toàn trên robot thật chỉ dựa vào kết quả mô phỏng.

### D3.4 — Xây dựng hệ thống kiểm thử tự động (Automated Testing Pipeline)

**Mục tiêu:** Tạo quy trình tự động để chạy kịch bản, thu thập kết quả, tính toán chỉ số và tạo báo cáo có thể so sánh giữa các mô hình.

**Công việc:**
- Xây dựng định dạng cấu hình chung cho kịch bản, mô hình, điều kiện đầu vào và số lần lặp.
- Tạo công cụ chạy thử nghiệm theo danh sách kịch bản.
- Ghi lại mã định danh lần chạy, phiên bản mô hình, cấu hình, kết quả, lỗi và trạng thái kết thúc.
- Tự động tính các chỉ số đã định nghĩa cho từng nhóm kiểm thử.
- Tổng hợp kết quả thành bảng và biểu đồ so sánh.
- Xử lý trường hợp mô phỏng lỗi, tiến trình bị gián đoạn hoặc dữ liệu kết quả không hợp lệ.
- Kiểm tra để bảo đảm các lần thử có thể được truy xuất và chạy lại.

**Sản phẩm bàn giao:**
- Bộ chạy kiểm thử tự động.
- Công cụ tính metrics và tổng hợp báo cáo.
- Mẫu cấu hình kịch bản.
- Mẫu log và báo cáo benchmark.
- Hướng dẫn thêm kịch bản mới và so sánh các phiên bản mô hình.

**Tiêu chí nghiệm thu:**
- Có thể chạy nhiều kịch bản theo cấu hình mà không phải thao tác thủ công từng lần.
- Kết quả của mỗi lần thử được lưu riêng và có thể truy xuất.
- Chỉ số tổng hợp được tính nhất quán từ log.
- Có thể so sánh ít nhất hai cấu hình hoặc phiên bản mô hình trên cùng bộ kịch bản.

### D3.5 — Phân tích lỗi và độ tin cậy (Failure Analysis & Reliability)

**Mục tiêu:** Xác định các điều kiện khiến mô hình thất bại, đánh giá độ ổn định và cung cấp thông tin phản hồi cho WS2 và WS4.

**Công việc:**
- Phân loại lỗi theo nhóm: không tiếp cận được mục tiêu, sai quỹ đạo, sai hướng, mắc kẹt, vượt thời gian hoặc không dừng theo yêu cầu.
- Tính tỷ lệ xuất hiện của từng loại lỗi.
- So sánh hiệu suất giữa các điều kiện đầu vào và các phiên bản mô hình.
- Kiểm tra độ biến thiên kết quả qua nhiều lần thử.
- Xác định các tình huống cần bổ sung dữ liệu, cải tiến mô hình hoặc điều chỉnh sandbox.
- Ghi lại các trường hợp không đủ dữ liệu để kết luận, tránh đánh đồng thiếu log với thành công.

**Sản phẩm bàn giao:**
- Danh mục lỗi và quy tắc phân loại.
- Báo cáo độ ổn định và các trường hợp thất bại điển hình.
- Danh sách vấn đề cần WS2 hoặc WS4 xử lý.
- Đề xuất kịch bản bổ sung dựa trên lỗi đã quan sát.

**Tiêu chí nghiệm thu:**
- Báo cáo chỉ ra được các nhóm lỗi chính và điều kiện xuất hiện.
- Có dẫn chứng từ log hoặc lần chạy cụ thể.
- Các khuyến nghị cải tiến gắn với lỗi quan sát được, không chỉ là nhận xét chung.

## 3. Vai trò và nhân sự

- **Kỹ sư Kiểm thử:** Xây dựng kịch bản, quy trình chạy thử và kiểm tra tính hợp lệ của kết quả.
- **Nghiên cứu viên Đánh giá:** Xác định chỉ số, phân tích kết quả và so sánh các mô hình.
- **Kỹ sư Tự động hóa kiểm thử:** Xây dựng bộ chạy thử tự động, ghi log, tính metrics và tạo báo cáo.
- **Chuyên gia Điều khiển hoặc phụ trách an toàn:** Xác định các giới hạn liên quan đến lực, điều kiện dừng và trạng thái an toàn khi cần.

Mỗi nhóm kiểm thử cần có người chịu trách nhiệm chính, người kiểm tra kết quả và tài liệu mô tả tiêu chí thành công/thất bại.

## 4. Đầu vào và điều kiện thực hiện

**Đầu vào chính:**
- Mô hình, checkpoint và cấu hình suy luận từ WS2.
- Định nghĩa nhiệm vụ, trạng thái ban đầu, mục tiêu và điều kiện kết thúc.
- Môi trường sandbox từ WS4.
- Dữ liệu hoặc công cụ ghi nhận trạng thái, vị trí, thời gian và lực nếu khả dụng.

**Điều kiện tối thiểu để bắt đầu:**
- Có ít nhất một mô hình hoặc bộ điều khiển có thể chạy thử.
- Có một nhiệm vụ mẫu với tiêu chí thành công/thất bại rõ ràng.
- Có cách ghi lại kết quả từng lần thử.
- Có cấu hình môi trường đủ ổn định để so sánh các lần chạy.

Trong khi WS4 chưa hoàn thiện sandbox, nhóm vẫn có thể xây dựng định nghĩa kịch bản, bộ tính metrics, cấu trúc log và công cụ tổng hợp báo cáo bằng dữ liệu mẫu. Các thử nghiệm phụ thuộc vào mô phỏng cần được đánh dấu chờ môi trường.

## 5. Đầu ra chung của WS3

1. **Benchmark scenarios:** Bộ kịch bản cho tái tạo, khái quát hóa và ứng biến lực.
2. **Automated test code:** Mã chạy thử, ghi log, xử lý kết quả và tính toán chỉ số.
3. **Metrics library:** Các hàm tính success rate, sai số, thời gian, performance drop và các chỉ số phù hợp khác.
4. **Benchmark reports:** Bảng kết quả, biểu đồ so sánh và báo cáo lỗi.
5. **Reproducibility package:** Cấu hình, phiên bản mô hình, thông tin môi trường và hướng dẫn chạy lại.
6. **Failure analysis:** Danh sách lỗi quan sát được và khuyến nghị cải tiến cho WS2/WS4.

## 6. Tiêu chí nghiệm thu tổng thể

- [ ] Có đủ ba nhóm đánh giá: Reproduction, Generalization và Force-adaptation.
- [ ] Mỗi kịch bản có mô tả đầu vào, điều kiện thử, kết quả mong đợi và tiêu chí thất bại.
- [ ] Mỗi cấu hình kiểm thử được chạy tối thiểu 20 lần khi điều kiện cho phép; nếu chưa đạt, phải nêu rõ giới hạn.
- [ ] Log của từng lần chạy được lưu và có thể truy xuất.
- [ ] Báo cáo có bảng tổng hợp success rate và các chỉ số phù hợp với từng nhóm thử nghiệm.
- [ ] Kết quả khái quát hóa được so sánh với điều kiện chuẩn.
- [ ] Kết quả ứng biến lực có ghi nhận các chỉ số lực, mắc kẹt, dừng hoặc phục hồi khi có dữ liệu tương ứng.
- [ ] Có phân loại lỗi và báo cáo các trường hợp thất bại.
- [ ] Có thể chạy lại benchmark bằng tài liệu và cấu hình đã bàn giao.

**Lưu ý về ngưỡng nghiệm thu:** Success rate từ 90% trong điều kiện tái tạo và trên 70% trong điều kiện biến đổi là các mục tiêu tham khảo ban đầu. Chúng cần được xác nhận theo độ khó của nhiệm vụ và mức biến đổi đầu vào. Không được thay đổi ngưỡng sau khi xem kết quả chỉ để làm cho mô hình đạt yêu cầu.

Với chỉ số an toàn, chẳng hạn lực cực đại hoặc khả năng dừng an toàn, giới hạn cụ thể phải được xác định theo nhiệm vụ và hệ thống được kiểm thử. Không sử dụng một ngưỡng lực chung cho mọi loại robot và thao tác.

## 7. Kế hoạch triển khai đề xuất

**Giai đoạn 1 — Thiết kế benchmark**
- Chốt nhiệm vụ mẫu và định nghĩa thành công/thất bại.
- Thống nhất cấu trúc cấu hình và log.
- Xây dựng bộ tính chỉ số cơ bản.

**Giai đoạn 2 — Kiểm thử tái tạo**
- Chạy mô hình WS2 trong điều kiện chuẩn.
- Kiểm tra độ ổn định qua nhiều lần thử.
- Hoàn thiện bảng kết quả và báo cáo baseline.

**Giai đoạn 3 — Kiểm thử khái quát hóa và ứng biến lực**
- Tạo biến thể vị trí, hướng hoặc điều kiện môi trường.
- Xây dựng các tình huống lực cản và tiếp xúc bất thường nếu sandbox hỗ trợ.
- Đo mức suy giảm hiệu suất và phân tích lỗi.

**Giai đoạn 4 — Tự động hóa và bàn giao**
- Tự động hóa việc chạy thử và tổng hợp kết quả.
- Kiểm tra khả năng tái tạo báo cáo.
- Bàn giao benchmark cùng hướng dẫn tích hợp cho WS2, WS4 và WS5.

## 8. Effort, phụ thuộc và rủi ro

**Effort:** M (trung bình). Khối lượng công việc chủ yếu nằm ở thiết kế kịch bản, xây dựng công cụ đánh giá, chạy lặp và phân tích lỗi. Các thử nghiệm lực có thể nặng hơn nếu cần bổ sung mô hình tiếp xúc hoặc công cụ đo lực trong mô phỏng.

**Phụ thuộc:**
- **WS2 — Baseline Models:** Cung cấp mô hình, checkpoint và cấu hình suy luận cần đánh giá.
- **WS4 — Sandbox Development:** Cung cấp môi trường mô phỏng, khả năng thay đổi điều kiện và cơ chế ghi nhận trạng thái.

**Rủi ro và biện pháp xử lý:**

| Rủi ro | Biện pháp |
|---|---|
| Kịch bản không bao phủ đủ trường hợp | Xây dựng ma trận kịch bản và bổ sung trường hợp dựa trên lỗi quan sát được |
| Kết quả thay đổi do môi trường không ổn định | Khóa cấu hình, lưu thông tin môi trường và chạy lặp |
| Metrics không phản ánh đúng chất lượng | Kết hợp chỉ số định lượng với phân tích log và trường hợp thất bại |
| Mô phỏng khác robot thật | Ghi rõ giới hạn mô phỏng và không suy diễn kết quả thành bảo đảm thực tế |
| Thiếu dữ liệu lực hoặc cảm biến | Hoàn thiện phần thiết kế trước, đánh dấu thử nghiệm cần dữ liệu bổ sung |
| Quá ít lần thử để kết luận | Báo cáo số lần thử và độ biến thiên; tăng số lần thử khi cần |
| Thay đổi tiêu chí sau khi có kết quả | Chốt trước tiêu chí và lưu phiên bản cấu hình benchmark |

## 9. Cấu trúc thư mục đề xuất

```text
WS3-Testing-Benchmark/
├── README.md
├── configs/
│   ├── reproduction/
│   ├── generalization/
│   └── force_adaptation/
├── scenarios/
│   ├── reproduction/
│   ├── generalization/
│   └── force_adaptation/
├── src/
│   ├── test_runner/
│   ├── metrics/
│   ├── logging/
│   └── reporting/
├── scripts/
│   ├── run_benchmark.py
│   ├── evaluate_results.py
│   └── generate_report.py
├── logs/
├── results/
│   ├── tables/
│   ├── plots/
│   └── failure_cases/
└── docs/
    ├── setup.md
    ├── scenario_design.md
    ├── metrics.md
    └── limitations.md
```

Cấu trúc này là đề xuất ban đầu. Nhóm có thể điều chỉnh theo cách tổ chức mã nguồn chung của dự án, nhưng cần giữ rõ ràng phần kịch bản, cấu hình, log, kết quả và tài liệu.

## 10. Bàn giao cho các Workstream tiếp theo

- **WS2 — Baseline Models:** Cung cấp kết quả benchmark, các trường hợp mô hình thất bại và những điều kiện cần bổ sung dữ liệu hoặc cải tiến thuật toán.
- **WS4 — Sandbox Development:** Cung cấp danh sách kịch bản, yêu cầu thay đổi điều kiện môi trường, các trạng thái cần ghi nhận và lỗi mô phỏng phát hiện trong quá trình thử nghiệm.
- **WS5 — Deployment Preparation:** Cung cấp các chỉ số và tình huống cần kiểm tra thêm trước triển khai, đặc biệt là độ ổn định, giới hạn lực và điều kiện dừng an toàn.

**Nguyên tắc bàn giao:** Mỗi kết luận về chất lượng mô hình phải gắn với kịch bản, cấu hình, số lần thử và dữ liệu kết quả cụ thể. Benchmark là công cụ đo lường và phát hiện vấn đề; nó không tự chứng minh rằng mô hình đã an toàn hoặc sẵn sàng vận hành trên robot thật.
