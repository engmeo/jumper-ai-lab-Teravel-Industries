# 11. Kỹ sư tạo môi trường và kịch bản kiểm thử (Simulation Environment Engineer)

- **Nhóm:** WS4 — Mô phỏng và Digital Twin
- **Mục tiêu:** Tạo các môi trường và biến thể có kiểm soát để huấn luyện, kiểm thử và đánh giá kỹ năng robot Jumper.
- **Giai đoạn:** Bắt đầu trước khi có robot thật.
- **Định hướng:** Tận dụng MuJoCo và hệ thống tạo cảnh hiện có của Jumper; không xây dựng một bộ mô phỏng độc lập hoặc trình chỉnh sửa 3D lớn khi chưa có nhu cầu được chứng minh.

## D11.1 — Khảo sát khả năng tạo môi trường hiện có

**Mục tiêu:** Biết hệ thống hiện tại đã làm được gì trước khi bổ sung chức năng.

Các việc cần làm:
- Khảo sát repo Jumper và repo jumper-design.
- Tìm các cảnh mẫu, định dạng cảnh, công cụ tạo cảnh và cách kiểm tra gói môi trường.
- Xác định cảnh nào dùng được để hiển thị, cảnh nào dùng được để phát lại mô phỏng và cảnh nào thực sự dùng được trong huấn luyện.
- Kiểm tra simulator hỗ trợ những loại địa hình, vật thể, va chạm và tham số vật lý nào.
- Xác định phần nào đã có công cụ, phần nào phải lập trình bổ sung.
- Chạy thử ít nhất một cảnh mẫu và ghi lại các bước thực hiện.

**Đầu ra:**
- Bảng khả năng hiện có.
- Danh sách cảnh mẫu và định dạng đầu vào/đầu ra.
- Hướng dẫn tạo, kiểm tra và sử dụng một cảnh.
- Danh sách giới hạn và chức năng chưa xác minh.

## D11.2 — Xây dựng bộ môi trường kiểm thử cơ sở

**Mục tiêu:** Tạo một bộ cảnh nhỏ phục vụ những vấn đề cụ thể của robot.

Các việc cần làm:
- Chọn các cảnh cơ sở có thể sử dụng với tác vụ Jumper.
- Ưu tiên sàn phẳng, dốc, địa hình gồ ghề và vật cản đơn giản nếu simulator hỗ trợ.
- Giữ một cảnh cơ sở cố định để làm mốc so sánh.
- Tạo các biến thể riêng biệt, mỗi biến thể thay đổi một yếu tố chính.
- Xác minh robot có xuất hiện đúng vị trí, môi trường tải được và va chạm hoạt động như dự kiến.
- Không đưa vào các vật thể chỉ có hình ảnh mà không có chức năng vật lý khi mục đích là kiểm thử chuyển động.

**Đầu ra:**
- Bộ cảnh cơ sở và biến thể.
- Mô tả mục đích kiểm thử của từng cảnh.
- Kết quả xác minh cảnh có thể tải và chạy.

## D11.3 — Xây dựng bộ tạo biến thể môi trường

**Mục tiêu:** Sinh nhiều trường hợp kiểm thử mà không phải tạo từng cảnh bằng tay.

Các việc cần làm:
- Xác định những tham số có thể thay đổi bằng cấu hình hoặc mã nguồn.
- Bắt đầu với một số yếu tố phù hợp, chẳng hạn độ dốc, vị trí vật cản, ma sát hoặc tham số vật lý được simulator hỗ trợ.
- Định nghĩa phạm vi giá trị có căn cứ; không tự đặt phạm vi vật lý rồi coi là tương đương thực tế.
- Cho phép cố định seed để tái tạo cùng một môi trường.
- Lưu cấu hình của từng biến thể.
- Kiểm tra không sinh ra cảnh lỗi, vật thể chồng lấn bất hợp lý hoặc vị trí xuất phát không hợp lệ.

**Đầu ra:**
- Công cụ hoặc tập lệnh tạo biến thể.
- Danh sách tham số, phạm vi và nguồn tham chiếu.
- Seed và cấu hình của các trường hợp đã sinh.
- Báo cáo các trường hợp không hợp lệ.

## D11.4 — Tạo kịch bản kiểm thử có mục tiêu

**Mục tiêu:** Biến môi trường thành bài kiểm thử có kết quả đo được.

Các việc cần làm:
- Làm việc với nhóm học tăng cường và nhóm kiểm thử để xác định câu hỏi cần trả lời.
- Mỗi kịch bản phải có điều kiện ban đầu, mục tiêu, yếu tố thay đổi và tiêu chí đánh giá.
- Tạo các kịch bản kiểm tra khả năng giữ thăng bằng, di chuyển trên địa hình hoặc vượt vật cản nếu tác vụ hiện tại hỗ trợ.
- Phân biệt kịch bản dùng để huấn luyện với kịch bản chỉ dùng để đánh giá.
- Giữ riêng một tập kịch bản đánh giá không dùng để điều chỉnh mô hình trong quá trình huấn luyện.

**Đầu ra:**
- Danh sách kịch bản có mục tiêu.
- Cấu hình đầu vào và tiêu chí thành công.
- Hướng dẫn chạy và lưu kết quả.

## D11.5 — Kiểm tra khả năng tái lập và chất lượng môi trường

**Mục tiêu:** Đảm bảo kết quả khác nhau do mô hình hoặc điều kiện thử nghiệm, không phải do lỗi tạo cảnh.

Các việc cần làm:
- Chạy lại cùng một kịch bản với cùng cấu hình và seed.
- Kiểm tra tính nhất quán của vị trí xuất phát, thông số môi trường và vật thể.
- Kiểm tra cảnh có tải đúng và các tham số thay đổi có thực sự được áp dụng.
- Theo dõi thời gian tải cảnh, thời gian mô phỏng và mức tiêu thụ tài nguyên.
- Ghi lại lỗi, cách tái hiện và điều kiện gây lỗi.
- Kiểm tra tương thích với quy trình huấn luyện và đánh giá hiện có.

**Đầu ra:**
- Báo cáo tái lập.
- Log kiểm tra.
- Danh sách lỗi và giới hạn.
- Hướng dẫn khắc phục hoặc tái hiện.

## D11.6 — Đánh giá nhu cầu mở rộng môi trường

**Mục tiêu:** Xác định khi nào cần đầu tư vào hệ thống tạo cảnh phong phú hơn.

Chỉ nghiên cứu hoặc đề xuất mở rộng khi các bài toán hiện tại có nhu cầu rõ ràng, chẳng hạn:
- Cần nhận diện vật thể qua camera và ánh sáng phức tạp.
- Cần tương tác với vật thể có hình dạng hoặc động lực học đa dạng.
- Cần đối tượng chuyển động để kiểm tra điều hướng hoặc phản ứng.
- Cần tạo cảnh từ dữ liệu thực tế để xây dựng Digital Twin.
- Khả năng hiện tại không thể biểu diễn được kịch bản cần kiểm tra.

Trước khi đề xuất Unity, Unreal hoặc một công cụ khác, phải so sánh chi phí tích hợp, khả năng mô phỏng vật lý, khả năng kết nối chính sách AI, hiệu năng và mức độ cần thiết đối với mục tiêu của công ty.

**Đầu ra:**
- Danh sách nhu cầu chưa được đáp ứng.
- Bản đề xuất mở rộng có lý do và phạm vi.
- Bằng chứng về giới hạn của hệ thống hiện tại.
- Ước lượng chi phí kỹ thuật và tài nguyên cần thiết.

Không bắt buộc phải triển khai một trình chỉnh sửa 3D mới trong nhiệm vụ này.

## Sản phẩm bàn giao

- Báo cáo khảo sát công cụ và định dạng môi trường.
- Bộ cảnh cơ sở và biến thể.
- Công cụ hoặc tập lệnh tạo biến thể có seed.
- Bộ kịch bản kiểm thử có mục tiêu.
- Log, kết quả xác minh và hướng dẫn tái lập.
- Đề xuất mở rộng nếu có nhu cầu chưa được đáp ứng.

## Tiêu chí nghiệm thu

- Có ít nhất một cảnh mẫu được tạo hoặc cấu hình lại, kiểm tra và chạy được trong đúng quy trình đã xác minh.
- Mỗi biến thể có cấu hình, seed và phạm vi tham số rõ ràng.
- Có bằng chứng các tham số được áp dụng thật, không chỉ được ghi vào tệp.
- Có thể tái tạo một kịch bản từ thông tin bàn giao.
- Có ít nhất một kịch bản kiểm thử với kết quả có thể đo lường.
- Không làm thay đổi cảnh cơ sở ngoài ý muốn; các thay đổi đều có log.
- Không tuyên bố môi trường mô phỏng tương đương môi trường thật khi chưa có dữ liệu xác minh.

## Có thể làm trước khi robot về không?

Có. Có thể khảo sát công cụ, tạo cảnh, xây bộ biến thể, kiểm tra khả năng tái lập và chạy các kịch bản với mô hình robot hiện có.

Tuy nhiên, cần ghi rõ những đặc tính nào là giả định của mô phỏng và chưa được đối chiếu với phần cứng hoặc môi trường thật.

## Mẫu báo cáo cuối nhiệm vụ

- **Đã hoàn thành:** …
- **Công cụ và định dạng đã dùng:** …
- **Cảnh và kịch bản đã tạo:** …
- **Cách chạy / kiểm tra:** …
- **Seed và phạm vi tham số:** …
- **Kết quả và bằng chứng:** …
- **Lỗi hoặc giới hạn:** …
- **Chức năng cần bổ sung và lý do:** …
- **Việc cần nhóm khác hỗ trợ:** …
- **Đề xuất bước tiếp theo:** …

**Nguyên tắc cốt lõi:** Mỗi môi trường phải phục vụ một câu hỏi huấn luyện hoặc kiểm thử cụ thể. Chỉ mở rộng độ phức tạp khi có thể chỉ ra lợi ích và cách đo lường.
