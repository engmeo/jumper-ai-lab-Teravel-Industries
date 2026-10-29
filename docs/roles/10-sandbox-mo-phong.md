# Workstream 4 — Môi trường Mô phỏng & Digital Twin (Sandbox & Sim2Real)

## 1. Mục tiêu

Xây dựng môi trường mô phỏng có khả năng tái tạo các nhiệm vụ robot, kiểm thử mô hình và kỹ năng từ Workstream 2, đồng thời cung cấp nền tảng để đánh giá khả năng khái quát hóa thông qua Workstream 3.

Workstream này gồm ba hướng công việc chính:

1. **Mô phỏng vật lý:** Khởi tạo robot, vật thể và môi trường tương tác trong simulator.
2. **Sandbox và bộ sinh tình huống:** Tạo, cấu hình, chạy và reset các kịch bản thử nghiệm một cách tự động.
3. **Digital Twin và Sim2Real:** Nghiên cứu cơ chế đồng bộ trạng thái giữa mô hình mô phỏng và robot thật, tiến tới hiệu chỉnh mô phỏng dựa trên quan sát thực tế.

**Phạm vi hiện tại:** Ưu tiên xây dựng sandbox có thể chạy ổn định khi chưa có robot vật lý. Digital Twin đồng bộ với robot thật là giai đoạn mở rộng, chỉ triển khai đầy đủ khi đã có robot, cảm biến và dữ liệu thực tế phù hợp.

Không xem việc dựng được cảnh 3D đẹp là bằng chứng rằng mô phỏng đã chính xác về vật lý hoặc sẵn sàng chuyển chính sách điều khiển sang robot thật.

## 2. Các nhiệm vụ chính

### D4.1 — Xây dựng mô hình vật lý (Physics Simulation)

**Mục tiêu:** Tạo môi trường mô phỏng cho robot Jumper và các đối tượng tương tác, phục vụ việc chạy thử các kỹ năng và thu thập kết quả đánh giá.

**Công việc:**
- Kiểm tra mô hình robot, thông số khớp và các tài nguyên sẵn có từ WS1 và tài liệu Jumper.
- Ưu tiên sử dụng MuJoCo theo cấu hình phù hợp với Jumper; chỉ dùng PyBullet khi có lý do kỹ thuật rõ ràng hoặc cần một môi trường so sánh.
- Khởi tạo mô hình robot với cấu trúc khớp, giới hạn chuyển động, hình học va chạm và các tham số vật lý cần thiết.
- Tạo các đối tượng tương tác cơ bản như mặt sàn, khối hộp, vật thể có thể đẩy và mục tiêu thao tác.
- Thiết lập các tham số như khối lượng, ma sát, trọng lực và đặc tính tiếp xúc.
- Kiểm tra hành vi cơ bản: robot đứng, di chuyển, tiếp xúc với vật thể và đẩy vật theo kịch bản.
- So sánh kết quả mô phỏng với các kỳ vọng vật lý hoặc dữ liệu tham chiếu hiện có.
- Lưu cấu hình để các nhóm khác có thể tái tạo cùng một môi trường.

**Sản phẩm bàn giao:**
- Mô hình robot và các đối tượng tương tác.
- Scene hoặc cấu hình mô phỏng có thể chỉnh sửa.
- Bộ tham số vật lý và tài liệu giải thích các tham số chính.
- Kịch bản kiểm tra chuyển động, va chạm và tương tác.
- Báo cáo các giới hạn của mô hình mô phỏng.

**Tiêu chí nghiệm thu:**
- Có thể khởi tạo robot và môi trường bằng cấu hình đã lưu.
- Các kịch bản mẫu chạy ổn định và có thể lặp lại.
- Các giới hạn chuyển động, va chạm và tham số vật lý chính được kiểm tra.
- Có ghi nhận lỗi mô phỏng, hiện tượng không hợp lý và các giả định đang sử dụng.

### D4.2 — Xây dựng Sandbox và API mô phỏng (Simulation Sandbox & API)

**Mục tiêu:** Đóng gói môi trường mô phỏng thành một hệ thống có thể được các nhóm WS2, WS3 và WS5 sử dụng mà không cần tự xây dựng lại toàn bộ môi trường.

**Công việc:**
- Xây dựng giao diện thống nhất để khởi tạo, cấu hình, chạy, reset và đóng một phiên mô phỏng.
- Xác định cách gửi lệnh điều khiển hoặc hành động từ mô hình vào simulator.
- Chuẩn hóa dữ liệu trạng thái trả về, chẳng hạn vị trí, tư thế, trạng thái khớp và thông tin tiếp xúc khi khả dụng.
- Cho phép tải cấu hình cảnh và tham số vật lý từ tệp cấu hình.
- Hỗ trợ chạy một hoặc nhiều lượt thử theo cấu hình xác định.
- Lưu thông tin lần chạy, seed ngẫu nhiên, cấu hình môi trường và trạng thái kết thúc.
- Xử lý các trường hợp mô phỏng bị treo, lỗi khởi tạo hoặc không thể reset đúng trạng thái.
- Cung cấp ví dụ sử dụng API và kịch bản mẫu để các nhóm khác tích hợp.

**Sản phẩm bàn giao:**
- Mã nguồn sandbox.
- API hoặc lớp giao tiếp với simulator.
- Bộ scene descriptor và cấu hình môi trường mẫu.
- Công cụ khởi tạo, chạy, reset và thu thập trạng thái.
- Tài liệu hướng dẫn cài đặt và sử dụng.

**Tiêu chí nghiệm thu:**
- Người khác có thể khởi tạo và chạy một kịch bản mẫu theo tài liệu.
- Có thể reset môi trường về trạng thái xác định.
- Dữ liệu đầu vào và đầu ra của API được mô tả rõ.
- Có thể lưu lại cấu hình để tái tạo một lần chạy.
- Các lỗi quan trọng được ghi log thay vì bị bỏ qua.

### D4.3 — Bộ sinh tình huống (Scenario Generator)

**Mục tiêu:** Tự động tạo các biến thể môi trường để đánh giá độ bền vững và khả năng khái quát hóa của mô hình robot.

**Công việc:**
- Xác định các tham số có thể thay đổi, bao gồm vị trí và hướng ban đầu của robot, vị trí vật thể, vật cản và các tham số vật lý.
- Xây dựng bộ sinh tình huống theo các miền giá trị có thể cấu hình.
- Hỗ trợ tạo cả tình huống cố định để kiểm thử hồi quy và tình huống ngẫu nhiên để đánh giá khái quát hóa.
- Lưu seed ngẫu nhiên cùng cấu hình của từng tình huống.
- Phân loại độ khó của tình huống theo số lượng biến đổi hoặc phạm vi thay đổi.
- Kiểm tra tính hợp lệ của tình huống trước khi chạy, tránh các cấu hình không thể thực hiện hoặc khiến mô phỏng mất ổn định.
- Cung cấp tập tình huống cho WS3 sử dụng trong benchmark.
- Tổng hợp các trường hợp khiến mô hình thất bại để bổ sung vào các đợt đánh giá tiếp theo.

**Sản phẩm bàn giao:**
- Công cụ sinh tình huống.
- Bộ tham số và miền giá trị có thể cấu hình.
- Tập kịch bản cố định và tập kịch bản ngẫu nhiên.
- Báo cáo kiểm tra tính hợp lệ và độ đa dạng của tình huống.

**Tiêu chí nghiệm thu:**
- Có thể tạo nhiều tình huống từ một cấu hình chung.
- Có thể tái tạo tình huống bằng seed và thông tin cấu hình đã lưu.
- Các tình huống nằm trong giới hạn hợp lệ đã xác định.
- WS3 có thể sử dụng các tình huống được sinh mà không phải sửa thủ công từng kịch bản.

### D4.4 — Hiệu chỉnh tham số mô phỏng (Simulation Calibration)

**Mục tiêu:** Cải thiện mức độ phù hợp giữa mô phỏng và hệ thống được mô hình hóa bằng cách kiểm tra, đo lường và hiệu chỉnh các tham số quan trọng.

**Công việc:**
- Xác định các tham số ảnh hưởng lớn đến hành vi mô phỏng, chẳng hạn khối lượng, ma sát, đặc tính tiếp xúc và phản ứng của khớp.
- Xây dựng các thử nghiệm đơn giản có kết quả tham chiếu hoặc kỳ vọng vật lý rõ ràng.
- So sánh kết quả mô phỏng với dữ liệu tham chiếu nếu có.
- Đánh giá độ nhạy của kết quả khi thay đổi từng tham số.
- Ghi nhận sai lệch, nguyên nhân có thể và phạm vi mà mô phỏng còn đáng tin cậy.
- Khi chưa có robot thật, sử dụng kiểm tra tính nhất quán vật lý và các trường hợp thử nghiệm có thể xác định kết quả kỳ vọng.
- Khi có dữ liệu robot thật, mở rộng sang hiệu chỉnh tham số dựa trên chuyển động và tương tác đã đo được.

**Sản phẩm bàn giao:**
- Bộ kịch bản hiệu chỉnh.
- Tài liệu mô tả tham số và phương pháp đo sai lệch.
- Cấu hình mô phỏng trước và sau hiệu chỉnh.
- Báo cáo sai số, độ nhạy và các giới hạn còn tồn tại.

**Tiêu chí nghiệm thu:**
- Các tham số quan trọng có định nghĩa và đơn vị rõ ràng.
- Có phương pháp đánh giá sai lệch nhất quán.
- Các thay đổi cấu hình được lưu lại để tái tạo.
- Phân biệt rõ kết quả kiểm tra dựa trên lý thuyết với kết quả đã được xác nhận bằng dữ liệu robot thật.

### D4.5 — Digital Twin đồng bộ với robot thật (Real-is-Sim / Digital Twin)

**Mục tiêu:** Nghiên cứu và phát triển cơ chế cập nhật trạng thái mô phỏng dựa trên quan sát từ robot thật, nhằm duy trì sự tương ứng giữa trạng thái thực tế và trạng thái trong mô hình số.

**Công việc:**
- Xác định các nguồn dữ liệu cần đồng bộ, bao gồm hình ảnh camera, trạng thái khớp và các cảm biến khả dụng.
- Xây dựng quy trình tiếp nhận dữ liệu, đồng bộ thời gian và ước lượng trạng thái robot hoặc vật thể.
- So sánh trạng thái quan sát được với trạng thái tương ứng trong mô phỏng.
- Xác định sai lệch cần hiệu chỉnh, chẳng hạn sai lệch vị trí, hướng hoặc hình dạng quan sát.
- Thiết kế vòng lặp quan sát → ước lượng sai lệch → hiệu chỉnh trạng thái mô phỏng.
- Đo độ trễ, tần số cập nhật và độ ổn định của quá trình hiệu chỉnh.
- Nghiên cứu khả năng duy trì tốc độ cập nhật khoảng 30–60 Hz khi phần cứng, thuật toán và đường truyền cho phép.
- Kiểm tra ảnh hưởng của nhiễu camera, sai số ước lượng và độ trễ cảm biến.
- Chỉ tích hợp với robot thật sau khi đã có nguồn dữ liệu thực tế và giao diện kết nối phù hợp.

**Sản phẩm bàn giao:**
- Thiết kế kiến trúc Digital Twin.
- Module tiếp nhận và đồng bộ dữ liệu cảm biến.
- Module ước lượng trạng thái và tính sai lệch.
- Cơ chế hiệu chỉnh trạng thái mô phỏng.
- Báo cáo độ trễ, tần số cập nhật và sai lệch trước/sau hiệu chỉnh.

**Tiêu chí nghiệm thu:**
- Có thể đo được sai lệch giữa trạng thái tham chiếu và trạng thái mô phỏng.
- Vòng lặp hiệu chỉnh được kiểm thử trên dữ liệu hoặc môi trường đã xác định.
- Có báo cáo tần số cập nhật, độ trễ và các trường hợp hiệu chỉnh không ổn định.
- Mục tiêu dưới 5 cm sai lệch vị trí chỉ áp dụng cho các bài thử đã xác định rõ cách đo, điều kiện và nguồn dữ liệu; không mặc nhiên áp dụng cho mọi tình huống.
- Khi chưa có robot thật, chỉ nghiệm thu phần nguyên mẫu hoặc kiểm thử bằng dữ liệu ghi lại; không tuyên bố đã hoàn thành đồng bộ thực–ảo.

### D4.6 — Nghiên cứu PBD và Gaussian Splatting cho mô phỏng nâng cao

**Mục tiêu:** Khảo sát các phương pháp mô phỏng và biểu diễn môi trường nâng cao có thể hỗ trợ định hướng Real-is-Sim, thay vì đưa các thành phần nghiên cứu phức tạp vào sandbox cơ bản ngay từ đầu.

**Công việc:**
- Tìm hiểu vai trò của Position-Based Dynamics (PBD) trong mô phỏng biến dạng hoặc tương tác phù hợp với bài toán được lựa chọn.
- Xác định liệu PBD có thực sự cần thiết cho nhiệm vụ robot Jumper hay không; không thay thế bộ giải vật lý chính chỉ vì đây là một phương pháp mới.
- Nghiên cứu Gaussian Splatting như một phương pháp biểu diễn hoặc tái dựng cảnh từ hình ảnh.
- Xác định cách kết hợp dữ liệu hình ảnh với hình học và trạng thái vật lý của môi trường.
- Khảo sát các phương pháp hiệu chỉnh cảnh mô phỏng dựa trên sai lệch quan sát.
- Nếu có cơ sở kỹ thuật, xây dựng một nguyên mẫu nhỏ và so sánh với pipeline mô phỏng cơ bản.
- Đánh giá độ chính xác, chi phí tính toán, độ trễ và mức độ hữu ích đối với các nhiệm vụ đang triển khai.

**Sản phẩm bàn giao:**
- Báo cáo khảo sát kỹ thuật PBD và Gaussian Splatting.
- Đề xuất kiến trúc tích hợp hoặc lý do chưa nên tích hợp.
- Nguyên mẫu thử nghiệm nếu đủ điều kiện.
- Kết quả so sánh với phương pháp cơ bản và danh sách giới hạn.

**Tiêu chí nghiệm thu:**
- Có câu hỏi nghiên cứu và tiêu chí đánh giá rõ ràng.
- Phân biệt được biểu diễn hình ảnh của cảnh với mô hình vật lý dùng để tính toán tương tác.
- Chỉ đề xuất tích hợp vào sandbox chính khi có bằng chứng về lợi ích thực tế.
- Không yêu cầu phải triển khai hoàn chỉnh PBD hoặc Gaussian Splatting để nghiệm thu sandbox cơ bản.

## 3. Vai trò và nhân sự

- **Kỹ sư Mô phỏng (Simulation Engineer):** Xây dựng scene, mô hình vật lý, cấu hình simulator và API.
- **Kỹ sư Robotics:** Kiểm tra mô hình robot, giới hạn khớp, hành vi chuyển động và khả năng tương thích với hệ thống điều khiển.
- **Nhà khoa học Robotics:** Nghiên cứu hiệu chỉnh mô phỏng, Digital Twin, Sim2Real và các phương pháp mô phỏng nâng cao.
- **Người phụ trách tích hợp:** Quản lý giao diện giữa sandbox, mô hình WS2, benchmark WS3 và các thành phần triển khai.

Có thể phân công một người phụ trách nhiều vai trò tùy quy mô đội ngũ. Các nhiệm vụ nghiên cứu nâng cao cần có người chịu trách nhiệm và tiêu chí đánh giá riêng, tránh ảnh hưởng đến tiến độ hoàn thiện sandbox cơ bản.

## 4. Đầu vào và điều kiện thực hiện

**Đầu vào chính:**
- Mô hình robot, thông số khớp và tài liệu kỹ thuật Jumper.
- Thông tin về vật thể, môi trường và nhiệm vụ từ WS1.
- Mô hình hoặc checkpoint cần kiểm thử từ WS2.
- Các yêu cầu kịch bản và chỉ số đánh giá từ WS3.
- Dữ liệu camera, trạng thái khớp và dữ liệu cảm biến thực tế khi khả dụng.

**Điều kiện tối thiểu để bắt đầu:**
- Có mô hình robot hoặc mô hình thay thế đủ để xây dựng scene thử nghiệm.
- Có simulator được lựa chọn và môi trường phần mềm có thể cài đặt.
- Có ít nhất một nhiệm vụ mẫu để xác minh chuyển động hoặc tương tác.
- Có định nghĩa rõ các trạng thái cần ghi nhận và cách reset mô phỏng.

Trong giai đoạn chưa có robot thật, nhóm vẫn có thể xây dựng mô hình vật lý cơ bản, sandbox, API, bộ sinh tình huống và quy trình benchmark. Phần Digital Twin đồng bộ thực–ảo chỉ được mở rộng khi có dữ liệu cảm biến hoặc thiết bị thực phù hợp.

## 5. Đầu ra chung của WS4

1. **Physics Model:** Mô hình robot, vật thể, va chạm và tham số vật lý.
2. **Simulation Sandbox:** Môi trường mô phỏng có thể khởi tạo, chạy, reset và cấu hình.
3. **Simulation API:** Giao diện cho các nhóm khác gửi hành động, đọc trạng thái và quản lý phiên thử nghiệm.
4. **Scenario Generator:** Công cụ sinh các biến thể tình huống có thể tái tạo.
5. **Calibration Package:** Kịch bản và báo cáo kiểm tra độ phù hợp của mô phỏng.
6. **Digital Twin Prototype:** Nguyên mẫu đồng bộ trạng thái khi có dữ liệu phù hợp.
7. **Advanced Research Report:** Báo cáo đánh giá PBD, Gaussian Splatting và các hướng Real-is-Sim.
8. **Documentation:** Hướng dẫn cài đặt, chạy kịch bản, cấu hình API, sinh tình huống và hiểu các giới hạn của mô phỏng.

## 6. Tiêu chí nghiệm thu tổng thể

- [ ] Có mô hình robot và môi trường mô phỏng cơ bản.
- [ ] Các kịch bản mẫu có thể khởi tạo, chạy và reset.
- [ ] Có thể thực hiện ít nhất một tác vụ tương tác mẫu, chẳng hạn robot di chuyển hoặc đẩy vật.
- [ ] Các tham số môi trường và vật lý có thể cấu hình.
- [ ] Có API hoặc giao diện thống nhất để WS2 và WS3 sử dụng.
- [ ] Bộ sinh tình huống hỗ trợ tạo và tái tạo các biến thể.
- [ ] Có log và báo cáo kiểm tra độ ổn định, sai lệch hoặc lỗi mô phỏng.
- [ ] Phần Digital Twin có thiết kế và nguyên mẫu được kiểm thử trên dữ liệu phù hợp.
- [ ] Các kết quả sử dụng dữ liệu thực được phân biệt với kết quả mô phỏng hoặc dữ liệu giả lập.
- [ ] Có tài liệu hướng dẫn và danh sách giới hạn kỹ thuật.

**Lưu ý về chỉ số:** Sai lệch vị trí dưới 5 cm và tốc độ cập nhật 30–60 Hz là các mục tiêu tham khảo cho một số cấu hình cụ thể, không phải ngưỡng phù hợp với mọi nhiệm vụ. Cần xác định rõ vị trí nào được đo, phương pháp ước lượng, độ trễ cho phép và điều kiện môi trường trước khi dùng làm tiêu chí nghiệm thu chính thức.

## 7. Kế hoạch triển khai đề xuất

**Giai đoạn 1 — Sandbox cơ bản**
- Xác nhận mô hình robot và simulator.
- Khởi tạo robot, vật thể, mặt sàn và va chạm.
- Chạy các kịch bản chuyển động và tương tác đơn giản.

**Giai đoạn 2 — API và scenario generator**
- Chuẩn hóa giao diện khởi tạo, điều khiển, đọc trạng thái và reset.
- Tạo các biến thể về vị trí, hướng, vật cản và tham số vật lý.
- Tích hợp các kịch bản cần thiết cho WS3.

**Giai đoạn 3 — Hiệu chỉnh và đánh giá**
- Kiểm tra hành vi vật lý và độ ổn định.
- So sánh kết quả với kỳ vọng lý thuyết hoặc dữ liệu tham chiếu.
- Ghi lại các giả định, sai lệch và giới hạn của sandbox.

**Giai đoạn 4 — Digital Twin**
- Xác định nguồn dữ liệu thực và phương pháp đồng bộ.
- Xây dựng module ước lượng sai lệch và hiệu chỉnh trạng thái.
- Đo độ trễ, tần số cập nhật và độ ổn định.
- Chỉ triển khai đồng bộ với robot thật khi đủ điều kiện phần cứng và dữ liệu.

**Giai đoạn 5 — Nghiên cứu nâng cao**
- Đánh giá PBD, Gaussian Splatting và các phương pháp Real-is-Sim phù hợp.
- Xây dựng nguyên mẫu giới hạn.
- Chỉ tích hợp vào kiến trúc chính khi chứng minh được lợi ích so với giải pháp hiện có.

## 8. Effort, phụ thuộc và rủi ro

**Effort:** L (nặng). Khối lượng công việc bao gồm xây dựng mô hình vật lý, đóng gói API, sinh kịch bản, kiểm thử và có thể cả tích hợp cảm biến hoặc hiệu chỉnh trạng thái. Digital Twin và các phương pháp mô phỏng nâng cao có thể cần một giai đoạn nghiên cứu riêng.

**Phụ thuộc:**
- **WS1 — Data & Expert Knowledge:** Cung cấp mô tả robot, thông tin nhiệm vụ, thông số và dữ liệu cảm biến khi có.
- **WS2 — Baseline Models:** Cung cấp mô hình hoặc kỹ năng cần chạy trong môi trường mô phỏng.
- **WS3 — Testing & Benchmark:** Cung cấp yêu cầu về kịch bản và cách đo kết quả.

**Rủi ro và biện pháp xử lý:**

| Rủi ro | Biện pháp |
|---|---|
| Mô phỏng không phản ánh đúng ma sát hoặc tiếp xúc | Kiểm tra từng thành phần vật lý và ghi rõ giả định |
| Mô hình robot sai thông số hoặc giới hạn khớp | Đối chiếu tài liệu, kiểm tra cấu hình và chạy thử từng chuyển động |
| API không tương thích với WS2/WS3 | Thống nhất định dạng đầu vào/đầu ra trước khi tích hợp |
| Bộ sinh tạo ra tình huống không hợp lệ | Kiểm tra miền tham số và xác thực scene trước khi chạy |
| Digital Twin hiệu chỉnh chậm hoặc không ổn định | Đo độ trễ, tách lỗi ước lượng khỏi lỗi đồng bộ và kiểm thử trên dữ liệu ghi lại |
| Thiếu dữ liệu hoặc robot thật | Ưu tiên sandbox và nguyên mẫu; không tuyên bố đã xác nhận sim-to-real |
| Công nghệ nâng cao làm chậm sản phẩm chính | Giữ PBD/Gaussian Splatting ở nhánh nghiên cứu cho đến khi có kết quả so sánh |

## 9. Cấu trúc thư mục đề xuất

```text
WS4-Sandbox-Digital-Twin/
├── README.md
├── configs/
│   ├── robot/
│   ├── physics/
│   └── scenarios/
├── assets/
│   ├── robot/
│   ├── objects/
│   └── environments/
├── src/
│   ├── simulation/
│   ├── sandbox_api/
│   ├── scenario_generator/
│   ├── calibration/
│   ├── digital_twin/
│   └── advanced_research/
├── scenes/
├── scripts/
│   ├── run_scene.py
│   ├── reset_scene.py
│   ├── generate_scenarios.py
│   └── evaluate_simulation.py
├── logs/
├── results/
│   ├── calibration/
│   ├── stability/
│   └── digital_twin/
└── docs/
    ├── setup.md
    ├── simulation_api.md
    ├── scenario_generator.md
    ├── calibration.md
    └── limitations.md
```

Cấu trúc này là đề xuất ban đầu; nhóm có thể điều chỉnh theo công nghệ và cách tổ chức mã nguồn thực tế, nhưng cần tách rõ phần mô phỏng cơ bản, API, sinh kịch bản, hiệu chỉnh và Digital Twin.

## 10. Bàn giao cho các Workstream tiếp theo

- **WS2 — Baseline Models:** Cung cấp môi trường chạy mô hình, trạng thái đầu vào/đầu ra và các kịch bản cần thiết để kiểm thử hành vi.
- **WS3 — Testing & Benchmark:** Cung cấp sandbox, API, bộ sinh tình huống và khả năng lưu log để thực hiện benchmark tự động.
- **WS5 — Deployment Preparation:** Cung cấp thông tin về mô hình robot, giới hạn vật lý, sai lệch mô phỏng và các yêu cầu cần kiểm tra trước khi triển khai.
- **WS1 — Data & Expert Knowledge:** Phối hợp bổ sung thông số, dữ liệu cảm biến và dữ liệu thực tế khi có thể dùng để hiệu chỉnh.

**Nguyên tắc bàn giao:** Sandbox chạy được là điều kiện nền tảng để kiểm thử; Digital Twin đồng bộ được là một cấp độ phát triển cao hơn; còn việc chính sách hoạt động tốt trên robot thật là một bước xác minh riêng. Không gộp ba mức này thành một tiêu chí nghiệm thu duy nhất.
