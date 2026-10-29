# 08. Kỹ sư học tăng cường / huấn luyện (Reinforcement Learning Engineer)

- **Nhóm:** WS2 — Mô hình căn bản và khởi tạo
- **Mục tiêu:** Xây dựng, chạy và đánh giá các thí nghiệm học tăng cường cho robot Jumper trong môi trường mô phỏng.
- **Giai đoạn:** Có thể bắt đầu trước khi robot thật về.
- **Phạm vi ưu tiên:** Xác minh tác vụ mẫu, chạy thử quy mô nhỏ, kiểm tra phần thưởng, lưu kết quả và tạo quy trình huấn luyện có thể tái lập.

## 1. Vai trò của vị trí này

Kỹ sư học tăng cường chịu trách nhiệm thử nghiệm cách robot tự học thông qua tương tác với môi trường mô phỏng.

Trong một thí nghiệm điển hình:

1. Robot nhận thông tin về trạng thái hiện tại, chẳng hạn vị trí, vận tốc hoặc góc khớp.
2. Mô hình chọn hành động, chẳng hạn thay đổi góc khớp hoặc gửi lệnh điều khiển.
3. Môi trường mô phỏng thực hiện hành động và trả về trạng thái mới.
4. Hệ thống tính điểm thưởng hoặc phạt dựa trên kết quả.
5. Thuật toán sử dụng kết quả này để cập nhật mô hình.
6. Quá trình lặp lại cho đến khi đạt điều kiện dừng hoặc hết ngân sách huấn luyện.

**Điểm quan trọng:** Robot không tự động học tốt chỉ vì đã chạy rất nhiều bước. Phần thưởng sai, môi trường không ổn định hoặc cách thiết lập thí nghiệm không phù hợp đều có thể khiến mô hình học sai mục tiêu.

## 2. Công việc cần thực hiện

### D8.1 — Khảo sát môi trường và tác vụ có sẵn

**Mục tiêu:** Xác định repo hiện tại đã hỗ trợ những gì trước khi tự phát triển thêm.

Các việc cần làm:
- Đọc hướng dẫn cài đặt và huấn luyện của Jumper.
- Liệt kê các tác vụ mô phỏng hiện có, chẳng hạn đi bộ, giữ thăng bằng hoặc thực hiện chuyển động được hỗ trợ.
- Xác định môi trường vật lý, bộ điều khiển, thuật toán học tăng cường và thư viện liên quan.
- Tìm hiểu đầu vào của mô hình, đầu ra hành động và cách môi trường trả về phần thưởng.
- Kiểm tra yêu cầu phần cứng, bộ nhớ, thời gian chạy và cách lưu kết quả.

**Đầu ra:**
- Danh sách tác vụ có thể chạy.
- Bảng mô tả đầu vào, hành động và phần thưởng của từng tác vụ.
- Hướng dẫn chạy thử một tác vụ đã chọn.
- Danh sách điểm đã xác minh và điểm chưa rõ.

Không tự kết luận một tác vụ hoạt động chỉ vì nó xuất hiện trong tài liệu. Phải chạy thử hoặc có bằng chứng kiểm tra tương ứng.

### D8.2 — Phân tích hàm thưởng (Reward Function)

**Mục tiêu:** Hiểu robot đang được thưởng vì điều gì và bị phạt vì điều gì.

Các việc cần làm:
- Tìm vị trí định nghĩa hàm thưởng trong mã nguồn.
- Liệt kê từng thành phần thưởng/phạt và ý nghĩa của chúng.
- Kiểm tra phần thưởng có khuyến khích đúng hành vi hay không.
- Xác định các điều kiện kết thúc một lượt mô phỏng.
- Kiểm tra robot có thể đạt điểm cao bằng cách khai thác một lỗi trong cách tính thưởng hay không.

Ví dụ, với tác vụ đi bộ, phần thưởng có thể xem xét:
- Tiến gần mục tiêu chuyển động.
- Duy trì thăng bằng.
- Hạn chế tiêu hao năng lượng hoặc chuyển động quá mạnh.
- Tránh ngã hoặc vi phạm giới hạn an toàn.

Đây chỉ là ví dụ về các thành phần thường gặp; nhóm phải xác minh những gì thực sự có trong tác vụ Jumper đang dùng.

**Đầu ra:**
- Bảng thành phần thưởng/phạt.
- Giải thích điều kiện kết thúc.
- Một số trường hợp thử nghiệm để kiểm tra cách tính thưởng.
- Danh sách vấn đề cần điều chỉnh, nếu có.

Không thay đổi hàm thưởng ngay từ đầu nếu chưa có kết quả cơ sở để so sánh.

### D8.3 — Xây dựng cấu hình huấn luyện cơ sở

**Mục tiêu:** Tạo một cấu hình nhỏ, ổn định và có thể chạy lại.

Các việc cần làm:
- Chọn một tác vụ đã xác minh.
- Ghi lại thuật toán, tốc độ học, số bước huấn luyện và các tham số quan trọng.
- Xác định số môi trường mô phỏng chạy song song.
- Cố định seed ngẫu nhiên khi hệ thống hỗ trợ.
- Ghi phiên bản mã nguồn, thư viện và cấu hình môi trường.
- Chạy thử để kiểm tra lỗi khởi tạo, lỗi mô phỏng và lỗi bộ nhớ.

Nếu repo Jumper hỗ trợ lệnh mẫu:

`python scripts/train.py --task jumper.tripod --backend native --device cpu --num_envs 64`

hãy kiểm tra ý nghĩa các tham số trước khi chạy. Với máy CPU i5-8250U và RAM 8 GB, nên bắt đầu bằng số môi trường thấp hơn đáng kể, chẳng hạn 1–4 nếu được hỗ trợ, rồi tăng dần dựa trên mức sử dụng RAM, tốc độ mô phỏng và độ ổn định. Không mặc định rằng 64 môi trường sẽ phù hợp với máy này.

**Đầu ra:**
- Tệp cấu hình huấn luyện.
- Lệnh chạy chính xác.
- Thông tin môi trường và phiên bản.
- Log của lần chạy cơ sở.
- Ghi nhận tài nguyên sử dụng và các lỗi gặp phải.

### D8.4 — Chạy thí nghiệm và theo dõi quá trình học

**Mục tiêu:** Xác định mô hình có thực sự tiến bộ trong quá trình huấn luyện hay không.

Các việc cần làm:
- Chạy một thí nghiệm ngắn để xác minh toàn bộ pipeline.
- Chạy thí nghiệm cơ sở với ngân sách đã xác định.
- Theo dõi phần thưởng trung bình, tỷ lệ hoàn thành nhiệm vụ và tỷ lệ thất bại nếu có.
- Theo dõi độ dài mỗi lượt mô phỏng, thời gian huấn luyện và mức sử dụng tài nguyên.
- Lưu log định kỳ và checkpoint theo cấu hình.
- Kiểm tra xem quá trình học có bị đứng, dao động mạnh hoặc suy giảm hay không.

**Đầu ra:**
- Log đầy đủ.
- Biểu đồ phần thưởng theo thời gian hoặc số bước.
- Bảng thời gian chạy và tài nguyên sử dụng.
- Các checkpoint có thông tin cấu hình đi kèm.
- Báo cáo các dấu hiệu bất thường.

Không đánh giá thành công chỉ dựa trên một video robot chuyển động trông có vẻ tốt.

### D8.5 — Đánh giá mô hình sau huấn luyện

**Mục tiêu:** Kiểm tra chính sách đã học có thực hiện được nhiệm vụ hay chỉ đạt điểm cao trong quá trình huấn luyện.

Các việc cần làm:
- Chạy mô hình đã huấn luyện trong chế độ đánh giá nếu repo hỗ trợ.
- Tách đánh giá khỏi quá trình cập nhật mô hình.
- Thử nhiều seed hoặc điều kiện khởi tạo khi phù hợp.
- Ghi tỷ lệ hoàn thành, số lần ngã, thời gian thực hiện và các chỉ số phù hợp với tác vụ.
- So sánh với chính sách cơ sở hoặc bộ điều khiển hiện có.
- Lưu video minh họa cùng log định lượng.

**Đầu ra:**
- Bảng kết quả đánh giá.
- So sánh giữa mô hình cơ sở và mô hình mới.
- Video hoặc ảnh minh họa có gắn thông tin lần chạy.
- Danh sách tình huống mô hình thất bại.

Chỉ số và ngưỡng đạt phải được xác định theo tác vụ cụ thể; không áp dụng một ngưỡng thành công chung cho mọi kỹ năng.

### D8.6 — Kiểm tra độ bền vững và khả năng tổng quát hóa

**Mục tiêu:** Kiểm tra mô hình có hoạt động khi điều kiện mô phỏng thay đổi hay không.

Sau khi đã có kết quả cơ sở ổn định, có thể thử thay đổi có kiểm soát:
- Vị trí hoặc trạng thái khởi tạo.
- Địa hình hoặc điều kiện môi trường nếu tác vụ hỗ trợ.
- Tham số vật lý như khối lượng, ma sát hoặc độ trễ.
- Nhiễu quan sát hoặc nhiễu điều khiển trong phạm vi hợp lý.

Mỗi lần chỉ nên thay đổi một nhóm yếu tố để biết nguyên nhân ảnh hưởng đến kết quả.

**Đầu ra:**
- Bảng kết quả theo từng điều kiện.
- Danh sách trường hợp mô hình hoạt động tốt và thất bại.
- Đánh giá mức độ nhạy cảm với thay đổi.
- Đề xuất thí nghiệm tiếp theo.

Không triển khai ngẫu nhiên hóa quá nhiều tham số trước khi xác minh mô hình cơ sở hoạt động đúng.

### D8.7 — Thử nghiệm các thuật toán hoặc phương pháp huấn luyện khác

**Mục tiêu:** So sánh các lựa chọn kỹ thuật dựa trên bằng chứng thay vì chạy nhiều thuật toán một cách dàn trải.

Các việc có thể thực hiện sau khi hoàn thành đường cơ sở:
- So sánh thuật toán mà repo hỗ trợ.
- Thử điều chỉnh một số siêu tham số quan trọng.
- So sánh thời gian hội tụ, độ ổn định và hiệu quả thực hiện nhiệm vụ.
- Thử sử dụng chính sách học bắt chước làm điểm khởi đầu cho học tăng cường, nếu có dữ liệu hành động chuyên gia và pipeline tương thích.
- Phối hợp với nhóm mô phỏng khi cần bổ sung điều kiện môi trường.

**Đầu ra:**
- Bảng so sánh các thí nghiệm.
- Cấu hình và lệnh chạy cho từng phương án.
- Phân tích lợi ích, chi phí và hạn chế.
- Khuyến nghị phương án phù hợp với tác vụ hiện tại.

Không cần triển khai mọi thuật toán học tăng cường. Ưu tiên phương pháp mà repo và tài nguyên hiện có hỗ trợ tốt.

### D8.8 — Đóng gói và bàn giao mô hình

**Mục tiêu:** Đảm bảo nhóm khác có thể sử dụng và kiểm tra lại kết quả.

Các việc cần làm:
- Lưu checkpoint cùng cấu hình huấn luyện tương ứng.
- Ghi rõ phiên bản mã nguồn, seed và thông số quan trọng.
- Cung cấp lệnh đánh giá mô hình đã huấn luyện.
- Ghi các phụ thuộc cần thiết để tải và chạy mô hình.
- Mô tả giới hạn đã biết và các điều kiện mô hình chưa được kiểm tra.
- Bàn giao cho nhóm kiểm thử, tích hợp hoặc mô phỏng theo định dạng thống nhất.

**Đầu ra:**
- Thư mục bàn giao có cấu trúc.
- Checkpoint và cấu hình đi kèm.
- Hướng dẫn chạy đánh giá.
- Bảng kết quả và giới hạn đã biết.
- Danh sách yêu cầu hỗ trợ từ nhóm khác.

Checkpoint không được xem là mô hình đã sẵn sàng chạy trên robot thật chỉ vì nó chạy được trong mô phỏng.

## 3. Quy trình thực hiện đề xuất

1. Khảo sát repo và chọn một tác vụ.
2. Chạy thử cấu hình nhỏ để xác minh pipeline.
3. Phân tích hàm thưởng và điều kiện dừng.
4. Thiết lập thí nghiệm cơ sở, lưu đầy đủ log và checkpoint.
5. Đánh giá bằng các chỉ số phù hợp.
6. Chỉ sau khi có kết quả cơ sở mới thử điều chỉnh hoặc tăng độ khó.
7. Bàn giao cấu hình, kết quả, lỗi và hướng tiếp tục.

Mỗi thí nghiệm phải có câu hỏi rõ ràng. Ví dụ: “Tăng số môi trường song song từ 2 lên 4 có cải thiện tốc độ thu thập kinh nghiệm mà không làm hệ thống thiếu RAM không?”

## 4. Sản phẩm bàn giao

- Tệp cấu hình huấn luyện.
- Lệnh chạy và hướng dẫn tái lập.
- Log huấn luyện và log đánh giá.
- Checkpoint kèm thông tin phiên bản.
- Biểu đồ phần thưởng và các chỉ số đánh giá.
- Bảng so sánh các lần chạy.
- Báo cáo lỗi, giới hạn và đề xuất bước tiếp theo.

## 5. Tiêu chí nghiệm thu

Nhiệm vụ được nghiệm thu khi:

- Có ít nhất một tác vụ mô phỏng đã được xác minh và chạy thành công.
- Có cấu hình, lệnh chạy và thông tin môi trường đủ để người khác tái lập.
- Có log và checkpoint gắn với lần chạy tương ứng.
- Có đánh giá bằng chỉ số phù hợp, không chỉ có video minh họa.
- Có giải thích các lỗi, giới hạn và những điểm chưa xác minh.
- Có thể so sánh kết quả giữa ít nhất hai lần chạy hoặc hai cấu hình khi phạm vi nhiệm vụ yêu cầu so sánh.
- Không tuyên bố mô hình sẵn sàng triển khai trên robot thật nếu chưa qua kiểm thử phần cứng và quy trình an toàn tương ứng.

## 6. Có thể làm trước khi robot về không?

**Có.** Phần lớn công việc huấn luyện trong mô phỏng có thể bắt đầu trước khi có phần cứng:

- Khảo sát tác vụ, thuật toán và hàm thưởng.
- Chạy cấu hình mẫu.
- Thiết lập quy trình log và lưu checkpoint.
- Xây dựng bộ đánh giá.
- So sánh các cấu hình huấn luyện.
- Kiểm tra độ bền vững trong các điều kiện mô phỏng có sẵn.

Tuy nhiên, cần phân biệt rõ:
- **Có thể xác minh trước:** mô hình học được gì trong mô phỏng, kết quả có tái lập được không, pipeline có ổn định không.
- **Chưa thể kết luận chỉ từ mô phỏng:** hiệu quả trên robot thật, độ chính xác của mô hình vật lý, sai lệch cảm biến, độ trễ phần cứng và mức độ an toàn khi vận hành thực tế.

Với máy tính RAM 8 GB, nên ưu tiên thí nghiệm nhỏ, theo dõi tài nguyên và tăng quy mô từ từ. Không mở rộng số môi trường chỉ để tạo ra nhiều log hơn.

## 7. Phối hợp với các nhóm khác

- **Nhóm mô phỏng / Digital Twin:** cung cấp môi trường và các kịch bản kiểm thử.
- **Nhóm học bắt chước:** cung cấp chính sách ban đầu hoặc dữ liệu chuyên gia khi có thể tích hợp.
- **Nhóm dữ liệu:** quản lý dữ liệu, định dạng và phiên bản dùng trong huấn luyện.
- **Nhóm kiểm thử / Benchmark:** xây dựng phép đo và đánh giá độc lập.
- **Nhóm tích hợp phần cứng:** tiếp nhận mô hình sau này để kiểm tra tương thích, độ trễ và an toàn trên thiết bị thật.

## 8. Mẫu báo cáo cuối nhiệm vụ

- **Đã hoàn thành:** …
- **Tác vụ và thuật toán đã dùng:** …
- **Cách chạy / kiểm tra:** …
- **Cấu hình và tài nguyên sử dụng:** …
- **Kết quả và bằng chứng:** …
- **Checkpoint và vị trí lưu:** …
- **Lỗi hoặc giới hạn:** …
- **Điều đã xác minh / điều còn là giả định:** …
- **Việc cần nhóm khác hỗ trợ:** …
- **Đề xuất bước tiếp theo:** …

**Nguyên tắc cốt lõi:** Chạy được chưa có nghĩa là học tốt; điểm thưởng tăng chưa chắc hành vi đúng; và kết quả tốt trong mô phỏng chưa chứng minh mô hình sẵn sàng chạy trên robot thật.
