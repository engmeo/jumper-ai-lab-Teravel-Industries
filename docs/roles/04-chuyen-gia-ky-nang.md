# 04. Chuyên gia kỹ năng và tri thức chuyên gia

- **Nhóm:** WS1 — Dữ liệu và tri thức chuyên gia
- **Mục tiêu:** Phân tích, chuẩn hóa và mô tả các kỹ năng của robot thành những quy trình có cấu trúc, có thể quan sát, đánh giá, lưu trữ và sử dụng làm cơ sở cho việc thu thập dữ liệu, huấn luyện mô hình và kiểm thử kỹ năng.
- **Phạm vi:** Xây dựng danh mục kỹ năng, phân rã kỹ năng thành các bước, xác định điều kiện thực hiện, tiêu chí thành công/thất bại, lỗi thường gặp, giới hạn an toàn và tài liệu Skill Card.
- **Đối tượng phối hợp:** WS0 — Điều phối và kiến trúc; WS2 — Mô hình và kỹ năng; WS3 — Kiểm thử và Benchmark; WS4 — Mô phỏng và Digital Twin; WS5 — Tích hợp và triển khai.
- **Có thể thực hiện trước khi robot về:** Có thể phân tích tài liệu, xác định cấu trúc kỹ năng và xây dựng tiêu chí đánh giá dự kiến. Các thông số thực tế, giới hạn an toàn và khả năng thực hiện của robot phải được xác minh sau.

## 1. Mục tiêu cụ thể

Nhân sự cần xây dựng được một bộ tài liệu kỹ năng sao cho mỗi kỹ năng đều trả lời được các câu hỏi:

1. Robot cần thực hiện việc gì?
2. Kỹ năng được sử dụng trong tình huống nào?
3. Điều kiện nào phải đáp ứng trước khi bắt đầu?
4. Kỹ năng gồm những bước quan sát được nào?
5. Cần quan sát trạng thái hoặc tín hiệu nào để biết robot đang thực hiện đúng?
6. Khi nào được coi là thành công, thất bại hoặc cần thử lại?
7. Những lỗi nào thường gặp và có thể nhận biết bằng dấu hiệu nào?
8. Khi nào cần dừng kỹ năng hoặc chuyển sang trạng thái an toàn?
9. Cần dữ liệu gì để huấn luyện hoặc đánh giá kỹ năng?
10. Làm thế nào để một người khác có thể thực hiện hoặc đánh giá kỹ năng theo cùng một tiêu chuẩn?

**Kết quả mong muốn:** Mỗi kỹ năng được mô tả bằng một Skill Card có cấu trúc thống nhất, có tiêu chí đánh giá rõ ràng và ghi riêng những nội dung đã xác minh với những nội dung còn là giả định.

## 2. Công việc cần thực hiện

### D4.1 — Xây dựng danh mục kỹ năng

**Mục tiêu:** Xác định các kỹ năng cần mô tả và sắp xếp chúng thành danh mục có thể quản lý.

**Các bước thực hiện:**

1. Đọc tài liệu chính thức, mã nguồn, ví dụ mô phỏng và các mô tả thao tác có liên quan đến Jumper.
2. Thu thập danh sách kỹ năng đã được đề cập hoặc có bằng chứng trong tài liệu.
3. Phân biệt kỹ năng đã tồn tại trong mã nguồn với kỹ năng mới đề xuất.
4. Phân loại kỹ năng theo mục đích, độ phức tạp, điều kiện thực hiện và yêu cầu dữ liệu.
5. Xác định kỹ năng cơ bản có thể làm thành thành phần của kỹ năng phức tạp hơn.
6. Ghi rõ những kỹ năng chưa thể mô tả đầy đủ do thiếu thông tin hoặc chưa có robot.
7. Phối hợp với WS0 để thống nhất mã định danh và cách quản lý phiên bản Skill Card.

**Đầu ra:**
- Danh mục kỹ năng.
- Mã định danh và phân loại cho từng kỹ năng.
- Nguồn tham khảo và trạng thái xác minh.
- Danh sách kỹ năng cần bổ sung thông tin.

**Tiêu chí nghiệm thu:**
- Mỗi kỹ năng có tên, mục đích và phạm vi sử dụng rõ ràng.
- Không nhầm kỹ năng đề xuất với kỹ năng đã được triển khai hoặc kiểm chứng.
- Có thứ tự ưu tiên và lý do lựa chọn.
- Các kỹ năng phụ thuộc lẫn nhau được ghi nhận.

### D4.2 — Phân rã kỹ năng thành các bước quan sát được

**Mục tiêu:** Chuyển một mô tả chung thành quy trình gồm các bước cụ thể, có thể quan sát và đánh giá.

**Các bước thực hiện:**

1. Chọn một kỹ năng từ danh mục ưu tiên.
2. Xác định trạng thái ban đầu và điều kiện môi trường cần có.
3. Chia kỹ năng thành các bước theo trình tự thực hiện.
4. Với mỗi bước, mô tả:
   - Mục tiêu của bước.
   - Điều kiện bắt đầu.
   - Hành động hoặc thay đổi trạng thái mong đợi.
   - Dấu hiệu có thể quan sát để đánh giá.
   - Điều kiện chuyển sang bước tiếp theo.
   - Các lỗi có thể khiến bước thất bại.
5. Xác định các nhánh xử lý khi trạng thái thực tế khác với dự kiến.
6. Phân biệt các bước bắt buộc với các bước chỉ cần thiết trong tình huống đặc biệt.
7. Kiểm tra xem người khác có thể hiểu và đánh giá từng bước mà không phải tự suy đoán hay không.

**Đầu ra:**
- Quy trình thực hiện kỹ năng.
- Sơ đồ trình tự hoặc sơ đồ trạng thái nếu cần.
- Danh sách điều kiện chuyển bước.
- Danh sách các nhánh lỗi và cách xử lý dự kiến.

**Tiêu chí nghiệm thu:**
- Mỗi bước có mục tiêu và điều kiện kết thúc.
- Các bước không phụ thuộc vào cách hiểu chủ quan của người viết.
- Các nhánh lỗi quan trọng được mô tả.
- Các hành động chưa được xác minh trên robot được ghi là quy trình dự kiến.

### D4.3 — Xác định điều kiện đầu vào và đầu ra của kỹ năng

**Mục tiêu:** Làm rõ kỹ năng cần gì để bắt đầu và phải tạo ra trạng thái nào để được coi là hoàn thành.

**Các bước thực hiện:**

1. Xác định điều kiện ban đầu: trạng thái robot, đối tượng, môi trường và các điều kiện liên quan.
2. Xác định thông tin cần có trước khi thực hiện, chẳng hạn vị trí đối tượng hoặc trạng thái khớp nếu kỹ năng yêu cầu.
3. Xác định trạng thái kết thúc mong đợi.
4. Phân biệt trạng thái hoàn thành, hoàn thành một phần, thất bại và không đủ thông tin để kết luận.
5. Ghi rõ điều kiện khiến kỹ năng không được phép bắt đầu.
6. Xác định thông tin cần ghi lại để đánh giá đầu ra.
7. Phối hợp với WS2 và WS4 để xác nhận điều kiện nào có thể biểu diễn trong dữ liệu huấn luyện hoặc môi trường mô phỏng.

**Đầu ra:**
- Mô tả điều kiện đầu vào.
- Mô tả trạng thái kết thúc.
- Danh sách điều kiện không được bắt đầu.
- Quy tắc xác định trạng thái kết quả.

**Tiêu chí nghiệm thu:**
- Có thể xác định kỹ năng đã đạt mục tiêu hay chưa dựa trên các điều kiện được mô tả.
- Điều kiện thiếu thông tin không bị tự động coi là thành công.
- Các điều kiện phụ thuộc phần cứng được đánh dấu chờ xác minh.

### D4.4 — Xây dựng tiêu chí thành công, thất bại và thử lại

**Mục tiêu:** Tạo tiêu chuẩn đánh giá nhất quán để WS2, WS3 và WS5 có thể sử dụng.

**Các bước thực hiện:**

1. Xác định kết quả cuối cùng cần đạt.
2. Chuyển mục tiêu thành các tiêu chí quan sát hoặc đo lường được.
3. Với mỗi tiêu chí, ghi rõ cách kiểm tra, dữ liệu cần thiết và điều kiện kết luận.
4. Phân loại kết quả:
   - Thành công.
   - Thất bại.
   - Thành công một phần.
   - Bị gián đoạn.
   - Không đủ dữ liệu để đánh giá.
5. Xác định trường hợp được phép thử lại và điều kiện trước khi thử lại.
6. Phân biệt lỗi có thể khắc phục bằng thử lại với lỗi yêu cầu dừng ngay.
7. Phối hợp với WS3 để chuyển tiêu chí kỹ năng thành các bài kiểm thử và chỉ số benchmark.

**Đầu ra:**
- Bộ tiêu chí thành công/thất bại cho từng kỹ năng.
- Quy tắc phân loại kết quả.
- Quy tắc thử lại và điều kiện dừng.
- Đề xuất chỉ số cần thu thập.

**Tiêu chí nghiệm thu:**
- Hai người đánh giá độc lập có thể áp dụng tiêu chí và đưa ra kết luận nhất quán.
- Mỗi tiêu chí có cách xác minh cụ thể.
- Các ngưỡng số được ghi rõ nguồn hoặc lý do lựa chọn.
- Ngưỡng chưa được kiểm chứng được đánh dấu là giá trị dự kiến, không phải tiêu chuẩn an toàn đã được phê duyệt.

### D4.5 — Phân tích lỗi và điều kiện dừng

**Mục tiêu:** Nhận diện các tình huống kỹ năng có thể thất bại hoặc gây ra rủi ro.

**Các bước thực hiện:**

1. Liệt kê các lỗi có thể xảy ra trong từng bước.
2. Mô tả dấu hiệu nhận biết lỗi bằng quan sát, trạng thái hệ thống hoặc dữ liệu đo được.
3. Xác định ảnh hưởng của từng lỗi đến kết quả kỹ năng.
4. Phân loại mức độ: lỗi chất lượng, lỗi cần thử lại, lỗi cần dừng và lỗi có khả năng gây mất an toàn.
5. Xác định điều kiện dừng hoặc chuyển sang trạng thái an toàn.
6. Ghi rõ hành động xử lý dự kiến và người có thẩm quyền quyết định việc tiếp tục.
7. Đối chiếu với tài liệu nhà sản xuất và quy trình an toàn đã được phê duyệt.
8. Đánh dấu các điều kiện chưa thể xác minh nếu chưa có robot hoặc dữ liệu thực tế.

**Đầu ra:**
- Danh sách lỗi theo từng kỹ năng.
- Bảng phân loại mức độ rủi ro.
- Điều kiện dừng và xử lý dự kiến.
- Danh sách giới hạn cần kiểm chứng trên phần cứng.

**Tiêu chí nghiệm thu:**
- Lỗi quan trọng có dấu hiệu nhận biết và cách xử lý dự kiến.
- Điều kiện dừng không phụ thuộc vào phán đoán mơ hồ.
- Không tự đặt giới hạn lực, vận tốc hoặc giới hạn khớp khi chưa có căn cứ kỹ thuật.
- Các quyết định an toàn thực tế phải được người phụ trách kỹ thuật có thẩm quyền xác nhận.

### D4.6 — Xác định yêu cầu dữ liệu cho từng kỹ năng

**Mục tiêu:** Làm rõ dữ liệu nào cần được thu thập để mô tả, huấn luyện và đánh giá kỹ năng.

**Các bước thực hiện:**

1. Xác định kỹ năng cần dữ liệu hình ảnh, trạng thái robot, hành động, thông tin môi trường hoặc các loại dữ liệu khác.
2. Ghi rõ mỗi loại dữ liệu được sử dụng để làm gì.
3. Xác định mức độ đồng bộ thời gian cần thiết nếu kỹ năng sử dụng nhiều nguồn dữ liệu.
4. Xác định thông tin tối thiểu cần lưu cho một lần thực hiện kỹ năng.
5. Phân biệt dữ liệu bắt buộc với dữ liệu hữu ích nhưng không bắt buộc.
6. Xác định các trường hợp cần đánh dấu nhãn, ví dụ bắt đầu, kết thúc, thành công, thất bại hoặc gián đoạn.
7. Phối hợp với kỹ sư xử lý dữ liệu WS1 để xác định cách lưu và chuẩn hóa.
8. Phối hợp với WS2 để xác nhận dữ liệu có đáp ứng yêu cầu của phương pháp huấn luyện hay không.

**Đầu ra:**
- Danh sách yêu cầu dữ liệu theo kỹ năng.
- Danh sách trường metadata cần có.
- Quy tắc phân đoạn một lần thực hiện kỹ năng.
- Danh sách dữ liệu còn thiếu và phương án thu thập.

**Tiêu chí nghiệm thu:**
- Mỗi loại dữ liệu có mục đích sử dụng cụ thể.
- Các trường bắt buộc được phân biệt rõ.
- Có thể xác định dữ liệu nào cần bổ sung trước khi huấn luyện hoặc đánh giá.
- Không giả định video đơn thuần đã chứa đầy đủ thông tin hành động và trạng thái robot.

### D4.7 — Xây dựng và quản lý Skill Card

**Mục tiêu:** Chuẩn hóa toàn bộ thông tin kỹ năng thành một tài liệu thống nhất.

Mỗi Skill Card cần có tối thiểu các trường:

| Trường | Nội dung |
|---|---|
| `skill_id` | Mã định danh kỹ năng |
| `skill_name` | Tên kỹ năng |
| `purpose` | Mục đích |
| `scope` | Phạm vi và tình huống sử dụng |
| `source` | Tài liệu hoặc nguồn thông tin |
| `verification_status` | Trạng thái xác minh |
| `preconditions` | Điều kiện trước khi bắt đầu |
| `initial_state` | Trạng thái ban đầu |
| `steps` | Các bước thực hiện |
| `success_criteria` | Tiêu chí thành công |
| `failure_criteria` | Tiêu chí thất bại |
| `retry_conditions` | Điều kiện được thử lại |
| `stop_conditions` | Điều kiện dừng |
| `safety_constraints` | Các giới hạn an toàn đã có căn cứ |
| `required_data` | Dữ liệu cần thu thập |
| `known_failure_modes` | Các dạng lỗi đã biết hoặc dự kiến |
| `evaluation_method` | Cách đánh giá |
| `dependencies` | Các kỹ năng hoặc thành phần phụ thuộc |
| `limitations` | Giới hạn và thông tin chưa xác minh |
| `version` | Phiên bản tài liệu |

**Các bước thực hiện:**

1. Tạo mẫu Skill Card thống nhất.
2. Điền thông tin dựa trên tài liệu và bằng chứng hiện có.
3. Đánh dấu rõ thông tin đã xác minh, thông tin suy luận và thông tin chưa biết.
4. Yêu cầu một người khác đọc và thử áp dụng tiêu chí đánh giá.
5. Cập nhật tài liệu khi có kết quả mô phỏng hoặc thử nghiệm thực tế mới.
6. Quản lý phiên bản để tránh dùng nhầm tiêu chí cũ.

**Đầu ra:**
- Bộ Skill Card theo danh mục ưu tiên.
- Quy ước phiên bản.
- Hướng dẫn tạo và cập nhật Skill Card.
- Danh sách nội dung còn chờ xác minh.

**Tiêu chí nghiệm thu:**
- Mỗi Skill Card có đủ trường bắt buộc.
- Các bước và tiêu chí có thể hiểu mà không cần người viết giải thích thêm.
- Nguồn gốc của thông tin quan trọng được ghi lại.
- Các thông tin an toàn chưa được xác minh không được trình bày như thông số chính thức.

### D4.8 — Rà soát và bàn giao tri thức chuyên gia

**Mục tiêu:** Đảm bảo tài liệu kỹ năng có thể được sử dụng bởi những người không trực tiếp viết tài liệu.

**Các bước thực hiện:**

1. Chọn một số Skill Card đã hoàn thành để rà soát.
2. Nhờ người khác đọc tài liệu và xác định điều kiện đầu vào, trình tự thực hiện và tiêu chí kết quả.
3. Ghi nhận điểm mơ hồ, thuật ngữ chưa thống nhất và điều kiện thiếu.
4. Sửa tài liệu và bổ sung ví dụ khi cần.
5. Xác nhận những phần đã được rà soát và những phần vẫn chỉ là giả thuyết.
6. Bàn giao tài liệu cho WS2, WS3, WS4 và WS5 theo nhu cầu sử dụng.
7. Ghi lại câu hỏi còn mở và người chịu trách nhiệm giải quyết.

**Đầu ra:**
- Bộ Skill Card đã rà soát.
- Biên bản phản hồi.
- Danh sách vấn đề còn mở.
- Hướng dẫn sử dụng và cập nhật tài liệu.

**Tiêu chí nghiệm thu:**
- Người tiếp nhận có thể hiểu kỹ năng và cách đánh giá từ tài liệu.
- Các điểm chưa rõ được ghi nhận thay vì tự suy đoán.
- Các nhóm sử dụng xác nhận những trường dữ liệu và tiêu chí cần thiết cho công việc của họ.

## 3. Sản phẩm bàn giao cuối cùng

1. Danh mục kỹ năng và thứ tự ưu tiên.
2. Bộ Skill Card có phiên bản.
3. Quy trình phân rã kỹ năng thành các bước quan sát được.
4. Bộ tiêu chí thành công, thất bại, thử lại và dừng.
5. Danh sách lỗi thường gặp và rủi ro.
6. Đặc tả dữ liệu cần thiết cho từng kỹ năng.
7. Tài liệu hướng dẫn đánh giá kỹ năng.
8. Biên bản rà soát và danh sách nội dung chưa xác minh.

## 4. Tiêu chí nghiệm thu tổng thể

- [ ] Có danh mục kỹ năng và mã định danh.
- [ ] Mỗi kỹ năng ưu tiên có Skill Card.
- [ ] Có điều kiện đầu vào và trạng thái kết thúc.
- [ ] Các bước thực hiện có dấu hiệu quan sát được.
- [ ] Có tiêu chí thành công và thất bại.
- [ ] Có quy tắc xử lý lỗi, thử lại và dừng.
- [ ] Có danh sách dữ liệu cần thiết.
- [ ] Có nguồn tham khảo và trạng thái xác minh.
- [ ] Có giới hạn và rủi ro đã được ghi nhận.
- [ ] Người khác có thể đọc và áp dụng tài liệu mà không phải đoán ý.
- [ ] Các thông số an toàn chưa được xác minh không được dùng làm giới hạn vận hành chính thức.

## 5. Có thể làm trước khi robot về không?

Có thể thực hiện các công việc sau:

- Phân tích tài liệu và mã nguồn Jumper.
- Xây dựng danh mục kỹ năng.
- Thiết kế mẫu Skill Card.
- Mô tả quy trình dự kiến và các điều kiện thành công/thất bại có căn cứ.
- Xác định dữ liệu cần thu thập cho từng kỹ năng.
- Xây dựng phương pháp đánh giá và danh sách lỗi cần kiểm tra.
- Rà soát tài liệu với các nhóm liên quan.

Các nội dung sau phải chờ dữ liệu hoặc thử nghiệm phù hợp:

- Xác nhận một kỹ năng thực sự thực hiện được trên robot.
- Xác định giới hạn lực, vận tốc và vùng hoạt động thực tế.
- Xác nhận các lỗi thực tế và hành vi phục hồi.
- Xác nhận tiêu chí an toàn trên phần cứng.
- Khẳng định một Skill Card đã được kiểm chứng ngoài đời.

## 6. Phối hợp với các nhóm khác

- **WS0:** Thống nhất mã kỹ năng, cấu trúc tài liệu, phiên bản và tiêu chí nghiệm thu.
- **WS1 — Kỹ sư xử lý dữ liệu:** Thống nhất cách phân đoạn dữ liệu, lưu metadata và gắn thông tin kỹ năng.
- **WS2 — Mô hình và kỹ năng:** Cung cấp yêu cầu dữ liệu và điều kiện để xây dựng các phương pháp học phù hợp.
- **WS3 — Kiểm thử và Benchmark:** Chuyển tiêu chí kỹ năng thành bài kiểm tra, chỉ số và quy tắc phân loại kết quả.
- **WS4 — Mô phỏng và Digital Twin:** Xác định cách biểu diễn điều kiện ban đầu, trạng thái kết thúc và các tình huống mô phỏng.
- **WS5 — Tích hợp và triển khai:** Cung cấp yêu cầu về điều kiện vận hành, lỗi, giới hạn và thông tin cần thiết trong gói kỹ năng.

## 7. Mẫu báo cáo cuối nhiệm vụ

- **Mã nhiệm vụ / Tên kỹ năng:**
- **Người thực hiện:**
- **Nguồn tài liệu đã sử dụng:**
- **Trạng thái xác minh:** Tài liệu / mã nguồn / mô phỏng / robot thật.
- **Đã hoàn thành:**
- **Điều kiện đầu vào và đầu ra:**
- **Các bước thực hiện đã mô tả:**
- **Tiêu chí thành công/thất bại:**
- **Lỗi và điều kiện dừng đã xác định:**
- **Dữ liệu cần thu thập:**
- **Kết quả rà soát:**
- **Giả định và giới hạn:**
- **Việc cần nhóm khác hỗ trợ:**
- **Đề xuất bước tiếp theo:**
- **Người rà soát / xác nhận:**
