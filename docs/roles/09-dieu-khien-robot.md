# 09. Kỹ sư điều khiển robot (Robot Control Engineer)

- **Nhóm:** WS2 — Mô hình căn bản và khởi tạo
- **Mục tiêu:** Hiểu, kiểm tra và đánh giá hệ thống điều khiển hiện có của Jumper; xác định các giới hạn vận động, sai lệch và vấn đề cần giải quyết trước khi nghiên cứu phương pháp điều khiển mới.
- **Giai đoạn:** Bắt đầu trước khi robot thật về; kiểm thử phần cứng thực hiện sau khi có robot và quy trình an toàn được phê duyệt.

## 1. Phạm vi công việc

Nhiệm vụ này không yêu cầu nhân sự triển khai hàng loạt thuật toán điều khiển.

Thứ tự ưu tiên là:

1. Hiểu cách hệ thống hiện tại nhận trạng thái và tạo lệnh điều khiển.
2. Kiểm tra giới hạn khớp, đơn vị đo, thứ tự khớp và cách chuyển đổi hành động của mô hình thành lệnh.
3. Xác định các vấn đề cụ thể trong mô phỏng.
4. Thử một phương án cải thiện nếu có vấn đề được chứng minh.
5. Chỉ nghiên cứu điều khiển thích nghi, logic mờ, MPC hoặc phương pháp nâng cao khi có lý do kỹ thuật và phép đo để đánh giá.

## 2. Công việc cần thực hiện

### D9.1 — Lập bản đồ hệ thống điều khiển hiện tại

**Mục tiêu:** Biết chính xác tín hiệu đi từ đâu đến đâu.

Các việc cần làm:
- Đọc cấu trúc điều khiển và các tác vụ có sẵn trong repo Jumper.
- Xác định dữ liệu quan sát đưa vào chính sách AI.
- Xác định đầu ra của chính sách là gì và được chuyển thành lệnh khớp như thế nào.
- Tìm hiểu các hệ số khuếch đại, hệ số tỷ lệ, giới hạn lệnh và quy tắc chuyển chế độ nếu có.
- Phân biệt phần thuộc mô hình AI, phần thuộc bộ điều khiển và phần thuộc mô phỏng.
- Vẽ sơ đồ luồng dữ liệu từ trạng thái robot đến lệnh điều khiển.

**Đầu ra:** Sơ đồ luồng tín hiệu và tài liệu giải thích từng thành phần.

### D9.2 — Kiểm tra khớp và giới hạn vận động

**Mục tiêu:** Đảm bảo các con số mô tả robot có nguồn gốc rõ ràng và không bị nhầm lẫn.

Các việc cần làm:
- Lập danh sách khớp theo tên, chức năng và thứ tự.
- Ghi giới hạn vị trí khớp, đơn vị, hệ số tỷ lệ và các thông số liên quan theo nguồn tài liệu hoặc cấu hình.
- Phân biệt giới hạn cơ khí, giới hạn cấu hình phần mềm và phạm vi hành động mà chính sách đã được huấn luyện.
- Kiểm tra thứ tự khớp giữa mô hình mô phỏng, đầu ra chính sách và giao diện điều khiển.
- Đánh dấu thông số chưa xác minh; không tự đặt giá trị thay thế.
- Viết các kiểm tra tự động nếu có thể, nhằm phát hiện tên khớp thiếu, thứ tự không khớp hoặc giới hạn không hợp lệ.

**Đầu ra:** Bảng giới hạn có nguồn tham chiếu và báo cáo kiểm tra tính nhất quán.

### D9.3 — Kiểm tra vòng điều khiển và tín hiệu phản hồi

**Mục tiêu:** Hiểu hệ thống đang sử dụng phản hồi nào, không mặc định rằng phải bổ sung một bộ điều khiển mới.

Các việc cần làm:
- Xác định trạng thái nào được đo, trạng thái nào được ước lượng và trạng thái nào chỉ có trong mô phỏng.
- Tìm hiểu bộ điều khiển hiện tại sử dụng vị trí, vận tốc, góc nghiêng hay tín hiệu nào khác.
- Kiểm tra cách xử lý khi trạng thái thay đổi, lệnh bị giới hạn hoặc chế độ điều khiển được chuyển đổi.
- Xác định tần số cập nhật của trạng thái, chính sách và lệnh điều khiển theo cấu hình hiện có.
- Kiểm tra log để tìm hiện tượng dao động, lệnh thay đổi quá mạnh, phản hồi chậm hoặc sai lệch giữa mục tiêu và kết quả.
- Phân biệt lỗi của chính sách AI với lỗi của bộ điều khiển, mô hình vật lý hoặc dữ liệu quan sát.

**Đầu ra:** Bản mô tả vòng điều khiển, bảng tín hiệu và danh sách vấn đề có bằng chứng.

### D9.4 — Thiết lập bộ kiểm thử điều khiển cơ sở

**Mục tiêu:** Có cách đo để biết một thay đổi có thực sự cải thiện hệ thống hay không.

Các việc cần làm:
- Chọn một tác vụ mô phỏng đã chạy được.
- Xác định các chỉ số phù hợp, chẳng hạn sai số bám mục tiêu, độ ổn định, mức thay đổi lệnh, tỷ lệ hoàn thành hoặc số lần mất thăng bằng.
- Lưu cấu hình ban đầu và kết quả cơ sở.
- Chạy lại với cùng điều kiện để đánh giá độ ổn định của kết quả.
- Tạo tình huống kiểm thử có kiểm soát, chẳng hạn thay đổi trạng thái khởi tạo hoặc lệnh mục tiêu trong phạm vi được hỗ trợ.
- Lưu log, lệnh chạy và cấu hình để nhân sự khác tái lập được.

**Đầu ra:** Bộ kiểm thử cơ sở, bảng chỉ số và kết quả có thể tái lập.

### D9.5 — Đánh giá các phương pháp điều khiển có liên quan

**Mục tiêu:** Chọn đúng phương pháp cho đúng vấn đề.

Nhân sự lập bảng đánh giá ngắn cho các hướng sau:

- **Điều khiển phản hồi:** Kiểm tra hệ thống hiện tại đã có cơ chế phản hồi nào và có thiếu sót gì.
- **PID:** Chỉ xem xét cho một vòng điều khiển có mục tiêu và tín hiệu sai số rõ ràng.
- **Điều khiển thích nghi:** Xem xét khi hiệu năng thay đổi đáng kể theo tải hoặc tham số vật lý và có thể đo được sự thay đổi đó.
- **Logic mờ:** Xem xét khi có các quy tắc ra quyết định phù hợp mà cách điều khiển hiện tại chưa xử lý tốt.
- **Điều khiển dự đoán (MPC):** Xem xét khi cần dự đoán trạng thái tương lai và xử lý các ràng buộc một cách tường minh.
- **Điều khiển lai:** Xem xét cách phối hợp chính sách AI với các giới hạn, điều kiện chuyển chế độ và cơ chế xử lý lỗi.

Với mỗi phương pháp, phải trả lời:
1. Vấn đề cụ thể nào của Jumper khiến phương pháp này đáng thử?
2. Hệ thống hiện tại đã giải quyết vấn đề đó chưa?
3. Cần dữ liệu, mô hình hoặc tín hiệu nào?
4. Có thể thử trong mô phỏng bằng cách nào?
5. Chỉ số nào sẽ chứng minh phương pháp có ích?
6. Chi phí tính toán, độ phức tạp và rủi ro mới là gì?

**Đầu ra:** Bảng đánh giá phương pháp và đề xuất có căn cứ. Không bắt buộc viết mã cho tất cả các phương pháp.

### D9.6 — Thử nghiệm cải tiến có kiểm soát

Chỉ thực hiện sau khi xác định được vấn đề và có phương án thử nghiệm hợp lý.

Các việc cần làm:
- Chọn một vấn đề và một phương pháp cải tiến.
- Giữ nguyên cấu hình cơ sở để có thể so sánh.
- Thay đổi một yếu tố chính trong mỗi lần thử.
- Đo cùng một nhóm chỉ số trước và sau thay đổi.
- Chạy lại thí nghiệm khi cần để phân biệt cải thiện thực sự với biến động ngẫu nhiên.
- Ghi cả trường hợp không cải thiện hoặc gây ra tác dụng phụ.

**Đầu ra:** Bản so sánh trước và sau, mã nguồn thay đổi nếu có, log và kết luận.

Nếu chưa tìm thấy vấn đề có ý nghĩa hoặc chưa đủ dữ liệu để thử nghiệm, được phép kết thúc bằng báo cáo đánh giá mà không thêm thuật toán mới.

### D9.7 — Bàn giao kết quả và xác định bước tiếp theo

**Mục tiêu:** Đảm bảo nhóm huấn luyện, mô phỏng và tích hợp có thể sử dụng kết quả.

Các việc cần làm:
- Ghi rõ phần nào đã xác minh và phần nào vẫn là giả định.
- Lưu cấu hình, lệnh chạy, log và kết quả.
- Mô tả các thay đổi đối với bộ điều khiển hoặc giao diện tín hiệu.
- Ghi điều kiện mà kết quả đã được kiểm tra.
- Nêu các bước cần thực hiện sau khi có phần cứng thật.
- Không tuyên bố hệ thống an toàn trên robot thật chỉ từ kết quả mô phỏng.

**Đầu ra:** Tài liệu bàn giao kỹ thuật và danh sách kiểm thử còn thiếu.

## 3. Sản phẩm bàn giao

- Sơ đồ luồng tín hiệu và bản đồ giao diện điều khiển.
- Bảng khớp, đơn vị, giới hạn và nguồn tham chiếu.
- Báo cáo về cơ chế phản hồi và cách chuyển đổi lệnh.
- Bộ kiểm thử điều khiển cơ sở và log.
- Bảng đánh giá các phương pháp điều khiển liên quan.
- Kết quả cải tiến nếu đã thực hiện được thử nghiệm có ý nghĩa.
- Báo cáo giới hạn, giả định và kế hoạch kiểm thử sau khi có robot.

## 4. Tiêu chí nghiệm thu

- Các tín hiệu chính và đường đi của lệnh điều khiển được mô tả rõ.
- Các giới hạn và đơn vị có nguồn tham chiếu; thông số chưa xác minh được đánh dấu.
- Có ít nhất một tác vụ mô phỏng được kiểm tra bằng chỉ số định lượng.
- Kết quả có thể tái lập từ cấu hình và lệnh chạy được bàn giao.
- Các phương pháp nâng cao được đề xuất dựa trên vấn đề cụ thể, không phải danh sách thuật toán chung chung.
- Nếu có cải tiến, phải có so sánh với cấu hình cơ sở.
- Không có thử nghiệm chuyển động trên phần cứng thật khi chưa được phê duyệt theo quy trình an toàn.

## 5. Phạm vi trước và sau khi có robot

**Trước khi có robot:**
- Đọc mã nguồn, kiểm tra cấu hình và giới hạn.
- Vẽ sơ đồ tín hiệu.
- Kiểm thử bộ điều khiển trong mô phỏng.
- Đo sai số, độ ổn định và độ nhạy với thay đổi điều kiện mô phỏng.
- Đánh giá phương pháp cải tiến và chuẩn bị kế hoạch kiểm thử phần cứng.

**Sau khi có robot:**
- Xác minh giới hạn thực tế và cách đo trạng thái.
- Kiểm tra tần số cập nhật, độ trễ và sai lệch giữa mô phỏng với phần cứng.
- Thực hiện kiểm thử chuyển động có giám sát, theo giới hạn và quy trình được phê duyệt.
- Đánh giá lại các phương pháp điều khiển dựa trên dữ liệu thực tế.
- Chỉ mở rộng phạm vi thử nghiệm sau khi các bước an toàn trước đó đạt yêu cầu.

## 6. Mẫu báo cáo cuối nhiệm vụ

- **Đã hoàn thành:** …
- **Thành phần điều khiển đã khảo sát:** …
- **Nguồn tham chiếu cho giới hạn và đơn vị:** …
- **Cách chạy / kiểm tra:** …
- **Kết quả và bằng chứng:** …
- **Vấn đề đã xác định:** …
- **Phương pháp cải tiến đã thử (nếu có):** …
- **Lý do chưa triển khai phương pháp khác:** …
- **Lỗi hoặc giới hạn:** …
- **Việc cần nhóm khác hỗ trợ:** …
- **Đề xuất bước tiếp theo:** …

**Nguyên tắc cốt lõi:** Không nghiên cứu một thuật toán chỉ vì nó nổi tiếng. Hãy xác định vấn đề, đo đường cơ sở, chọn phương pháp phù hợp và chứng minh nó có ích trước khi đưa vào hệ thống.
