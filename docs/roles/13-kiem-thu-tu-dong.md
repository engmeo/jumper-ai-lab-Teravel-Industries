# 13. Kỹ sư kiểm thử tự động (Automated Testing Engineer)

- **Nhóm:** WS3 — Kiểm thử và Benchmark
- **Mục tiêu:** Xây dựng hệ thống kiểm thử nhiều tầng để phát hiện lỗi sớm, ngăn lỗi tái xuất hiện và xác minh các thay đổi của Jumper không làm hỏng chức năng đã hoạt động.
- **Ưu tiên:** Tận dụng `pytest`, Ruff và các bài kiểm tra sẵn có trong repo trước khi phát triển công cụ mới.
- **Nguyên tắc:** Không chỉ kiểm tra chương trình có chạy hay không; phải kiểm tra kết quả có đúng, giao diện có nhất quán và lỗi có bị phát hiện khi cố tình đưa vào hay không.

## D13.1 — Khảo sát và lập danh mục kiểm thử hiện có

**Mục tiêu:** Biết repo đã kiểm thử những gì và còn thiếu những gì.

Công việc:
- Đọc hướng dẫn phát triển, thư mục `tests/`, cấu hình kiểm thử và workflow CI nếu có.
- Chạy bộ test hiện tại trên môi trường được hỗ trợ.
- Ghi nhận test đạt, test lỗi, test bị bỏ qua và các phụ thuộc môi trường.
- Liệt kê các thành phần quan trọng: đăng ký task, cấu hình, hàm thưởng, mô phỏng, checkpoint, xuất mô hình và controller.
- Phân loại lỗi theo mức độ nghiêm trọng và khả năng ảnh hưởng đến huấn luyện hoặc triển khai.
- Không tự sửa lỗi trước khi lưu bằng chứng và xác định cách tái hiện.

**Bàn giao:** Báo cáo hiện trạng, lệnh chạy chuẩn và danh sách khoảng trống kiểm thử.

## D13.2 — Xây dựng kiểm thử tĩnh và kiểm tra cấu hình

**Mục tiêu:** Phát hiện lỗi cơ bản trước khi chương trình chạy.

Công việc:
- Thiết lập hoặc tái sử dụng Ruff và `pytest`.
- Kiểm tra cấu hình task, trường bắt buộc, kiểu dữ liệu, giá trị ngoài phạm vi và tham số không được hỗ trợ.
- Kiểm tra task có được đăng ký và nạp đúng không.
- Kiểm tra các tệp dữ liệu và cấu hình không bị thiếu hoặc sai định dạng.
- Bảo đảm lệnh CI trả mã lỗi khi có lỗi kiểm tra.
- Phân biệt test không được thực thi với test đã chạy và đạt.

**Bàn giao:** Các bài kiểm tra tĩnh, kiểm tra cấu hình và báo cáo lỗi mẫu.

## D13.3 — Kiểm thử đơn vị và các trường hợp biên

**Mục tiêu:** Kiểm tra tính đúng đắn của từng thành phần độc lập.

Công việc:
- Kiểm tra hàm chuyển đổi đơn vị, giới hạn khớp và xử lý trạng thái.
- Kiểm tra hàm thưởng với tình huống bình thường, biên và đầu vào bất hợp lệ.
- Kiểm tra các phép biến đổi dữ liệu và thứ tự phần tử.
- Kiểm tra hành vi khi thiếu trường, xuất hiện `NaN`, vô cực hoặc dữ liệu sai kiểu ở những giao diện có thể nhận chúng.
- Dùng kiểm thử tham số hóa để chạy nhiều trường hợp.
- Xác định kết quả mong đợi rõ ràng thay vì chỉ kiểm tra chương trình không phát sinh ngoại lệ.

**Bàn giao:** Bộ test đơn vị có đầu vào, kết quả mong đợi và thông báo lỗi dễ hiểu.

## D13.4 — Kiểm thử tích hợp toàn bộ pipeline

**Mục tiêu:** Phát hiện lỗi chỉ xuất hiện khi ghép nhiều thành phần.

Công việc:
- Chọn một tác vụ Jumper nhỏ đã được xác minh.
- Kiểm tra nạp cấu hình, khởi tạo môi trường và robot.
- Chạy một số bước mô phỏng.
- Kiểm tra trạng thái, hành động, phần thưởng và điều kiện kết thúc.
- Kiểm tra việc ghi log và lưu checkpoint.
- Nếu được hỗ trợ, kiểm tra nạp lại checkpoint và chạy phát lại.
- Tách bài kiểm thử nhanh khỏi bài huấn luyện dài cần nhiều tài nguyên.

**Bàn giao:** Bộ test tích hợp có thể chạy tự động trên môi trường được hỗ trợ.

## D13.5 — Kiểm thử hợp đồng giữa các thành phần

**Mục tiêu:** Bắt các sai lệch mà chương trình vẫn có thể chạy nhưng kết quả bị sai.

Công việc:
- Kiểm tra thứ tự và số lượng khớp.
- Kiểm tra kích thước, thứ tự và kiểu dữ liệu của vector quan sát và hành động.
- Kiểm tra đơn vị và giới hạn của các tín hiệu.
- Kiểm tra cấu trúc checkpoint, cấu hình và metadata.
- Kiểm tra tính nhất quán giữa huấn luyện, phát lại, xuất mô hình và controller.
- Kiểm tra những dữ liệu mà controller thực sự có thể đo hoặc xây dựng.
- Dùng dữ liệu tham chiếu để so sánh đầu ra giữa các thành phần khi phù hợp.

**Bàn giao:** Bộ kiểm thử hợp đồng và báo cáo tương thích.

## D13.6 — Xây dựng bộ kiểm thử hồi quy

**Mục tiêu:** Đảm bảo lỗi đã sửa không quay lại.

Công việc:
- Lưu các trường hợp lỗi đã được xác nhận.
- Viết test tái hiện lỗi trước khi sửa nếu có thể.
- Xác minh test thất bại khi lỗi còn tồn tại và đạt sau khi sửa.
- Lưu đầu vào, cấu hình và kết quả tham chiếu.
- Quy định sai số cho phép đối với phép tính số thực; không yêu cầu khớp tuyệt đối khi thuật toán có tính không xác định.
- Khi kết quả thay đổi, yêu cầu giải thích và bằng chứng thay vì tự động chấp nhận kết quả mới.

**Bàn giao:** Bộ test hồi quy, dữ liệu tham chiếu và lịch sử lỗi.

## D13.7 — Kiểm thử hành vi mô phỏng và hiệu năng

**Mục tiêu:** Phát hiện thay đổi làm suy giảm chất lượng hành vi hoặc khiến hệ thống tốn tài nguyên bất thường.

Công việc:
- Xây dựng tập kịch bản đánh giá cố định cùng các chỉ số phù hợp.
- So sánh mô hình mới với baseline.
- Kiểm tra tỷ lệ hoàn thành nhiệm vụ, số lần thất bại và các chỉ số liên quan.
- Với kết quả ngẫu nhiên, chạy nhiều seed và xác định quy tắc so sánh trước khi đánh giá.
- Đo thời gian chạy, mức dùng RAM và các tài nguyên liên quan.
- Phân biệt lỗi chức năng với biến động thống kê hoặc khác biệt do môi trường.
- Chạy nhóm test này theo lịch hoặc khi thay đổi các thành phần quan trọng.

**Bàn giao:** Bộ benchmark hồi quy, bảng so sánh và báo cáo hiệu năng.

## D13.8 — Kiểm tra khả năng phát hiện lỗi của chính bộ test

**Mục tiêu:** Xác minh bộ test có đủ mạnh để phát hiện những lỗi mà nó được thiết kế để bắt.

Công việc:
- Tạo các thay đổi sai có kiểm soát trên bản thử nghiệm riêng, ví dụ làm sai một giới hạn hoặc thay đổi thứ tự tín hiệu.
- Xác minh test liên quan có thất bại.
- Thử mutation testing trên các mô-đun Python phù hợp.
- Ghi lại các lỗi giả không bị phát hiện và bổ sung test.
- Không đưa thay đổi gây lỗi vào nhánh chính.
- Không chạy thử nghiệm phá hoại trên robot thật hoặc môi trường sản xuất.

**Bàn giao:** Báo cáo khả năng phát hiện lỗi, danh sách lỗi giả đã thử và các khoảng trống còn lại.

## D13.9 — Tích hợp CI và quản lý kết quả

**Mục tiêu:** Tự động chạy kiểm thử khi mã nguồn thay đổi.

Công việc:
- Thiết lập workflow CI bằng nền tảng repo hỗ trợ, chẳng hạn GitHub Actions nếu dự án sử dụng GitHub.
- Khi có Pull Request, chạy kiểm tra tĩnh, test đơn vị, test hợp đồng và các test tích hợp nhẹ.
- Chạy test mô phỏng nặng hơn theo lịch hoặc khi có thay đổi liên quan.
- Xuất báo cáo pass/fail, log và thông tin phiên bản.
- Cấu hình để test bắt buộc thất bại thì CI không báo thành công.
- Không che giấu lỗi bằng cách đánh dấu test lỗi là bỏ qua.
- Quản lý bí mật bằng cơ chế secrets của CI; không ghi token, mật khẩu hoặc khóa riêng vào log.
- Không tự động triển khai mô hình lên robot thật từ pipeline kiểm thử.

**Bàn giao:** Workflow CI, hướng dẫn chạy cục bộ và ví dụ báo cáo.

## Tiêu chí nghiệm thu bắt buộc

1. **Tái lập được:** Có hướng dẫn, phiên bản môi trường và lệnh chạy chính xác.
2. **Không báo đạt giả:** Test bắt buộc không được bỏ qua âm thầm; lỗi phải làm bước kiểm tra thất bại.
3. **Có phân tầng:** Kiểm thử tĩnh, đơn vị, tích hợp, hợp đồng và hồi quy phải được phân loại rõ.
4. **Bao phủ đúng trọng tâm:** Mục tiêu ban đầu là ít nhất 80% dòng mã trong phạm vi được chọn; các mô-đun quan trọng có mục tiêu cao hơn khi khả thi. Các hợp đồng quan trọng phải có danh sách trường hợp bắt buộc, không dựa riêng vào tỷ lệ bao phủ.
5. **Có kiểm tra âm:** Có test xác nhận đầu vào sai hoặc trạng thái bất hợp lệ được phát hiện đúng.
6. **Có bằng chứng phát hiện lỗi:** Thực hiện ít nhất một thử nghiệm lỗi có kiểm soát và chứng minh test bắt được lỗi đó.
7. **Có kiểm thử hồi quy:** Các lỗi nghiêm trọng đã xác nhận được lưu thành test lâu dài.
8. **Có kiểm soát hiệu năng:** Các bài kiểm thử chính có số liệu thời gian và tài nguyên để so sánh.
9. **CI có cổng chặn:** Test bắt buộc thất bại thì không được coi Pull Request đã đạt.
10. **An toàn và bảo mật:** Không để lộ bí mật; không tự động đưa mô hình mới lên robot thật.

Các ngưỡng bao phủ là mục tiêu khởi đầu. Nếu một mô-đun chưa đạt, phải ghi rõ lý do, rủi ro và kế hoạch xử lý; không được giảm ngưỡng chỉ để làm báo cáo đẹp.

## Có thể làm trước khi robot về không?

Có. Có thể hoàn thành phần lớn nhiệm vụ bằng mã nguồn, cấu hình và môi trường mô phỏng hiện có.

Các kiểm tra phụ thuộc vào bo mạch, giao tiếp motor, cảm biến thật hoặc thời gian thực phải được đánh dấu là chưa xác minh trên phần cứng. Không được coi test mô phỏng là bằng chứng thay thế cho kiểm thử phần cứng.

## Mẫu báo cáo cuối nhiệm vụ

- **Đã hoàn thành:** …
- **Các tầng kiểm thử đã triển khai:** …
- **Lệnh chạy và môi trường:** …
- **Số test đạt / lỗi / bỏ qua:** …
- **Phạm vi bao phủ và giới hạn:** …
- **Lỗi đã phát hiện và bằng chứng:** …
- **Kết quả thử nghiệm lỗi có kiểm soát:** …
- **Kết quả CI và hiệu năng:** …
- **Lỗi hoặc giới hạn chưa xử lý:** …
- **Việc cần nhóm khác hỗ trợ:** …
- **Đề xuất bước tiếp theo:** …

**Nguyên tắc cốt lõi:** Một bộ test tốt không chỉ chứng minh rằng mã hiện tại chạy được; nó còn phải chứng minh rằng những lỗi quan trọng có khả năng bị phát hiện trước khi đến tay nhóm khác hoặc robot thật.
