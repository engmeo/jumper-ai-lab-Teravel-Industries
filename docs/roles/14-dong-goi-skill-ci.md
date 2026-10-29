# Workstream 5 — Tích hợp, An toàn và Triển khai (Integration & Deployment)

## 1. Mục tiêu

Xây dựng quy trình chuẩn để tích hợp các mô hình, kỹ năng và môi trường mô phỏng từ WS1–WS4 thành các gói kỹ năng có thể quản lý phiên bản, kiểm thử và triển khai có kiểm soát.

Workstream này tập trung vào bốn hướng chính:

1. **An toàn:** Xác định giới hạn vận hành, điều kiện dừng và cơ chế xử lý lỗi.
2. **Đóng gói kỹ năng:** Chuẩn hóa định dạng skill bundle, giao diện giữa mô hình và hệ thống điều khiển.
3. **Tích hợp Sim2Real / Real-is-Sim:** Xây dựng quy trình chuyển từ dữ liệu trình diễn đến mô hình đã đánh giá và thử nghiệm trên robot thật khi có điều kiện.
4. **CI/CD và quản lý phiên bản:** Tự động hóa kiểm tra mã nguồn, mô hình và các gói triển khai trước khi cho phép sử dụng.

**Phạm vi hiện tại:** Khi chưa có robot thật, nhóm có thể hoàn thiện định dạng gói kỹ năng, API, kiểm thử tự động, kiểm tra tương thích trên mô phỏng và quy trình phê duyệt. Việc xác nhận giới hạn an toàn vật lý, driver, cảm biến và khả năng vận hành thực tế phải được thực hiện trên phần cứng phù hợp trước khi triển khai.

## 2. Các nhiệm vụ chính

### D5.1 — Xây dựng quy tắc an toàn và cơ chế Fail-safe (Safety & Fail-safe)

**Mục tiêu:** Xác định các điều kiện mà robot được phép vận hành, các tình huống cần dừng và cách hệ thống chuyển sang trạng thái an toàn khi phát hiện lỗi.

**Công việc:**
- Xác định các giới hạn vận hành theo từng nhiệm vụ, bao gồm vận tốc, phạm vi chuyển động, giới hạn khớp và lực khi các thông số tương ứng khả dụng.
- Xác định các vùng hoạt động được phép và các vùng cần tránh.
- Thiết kế các điều kiện dừng khi trạng thái robot lệch quá mức cho phép, cảm biến mất tín hiệu hoặc dữ liệu đầu vào không hợp lệ.
- Xác định các trường hợp phải dừng khẩn cấp, chẳng hạn phát hiện va chạm bất thường, vượt giới hạn hoặc mất khả năng giám sát.
- Xây dựng cơ chế phát hiện lỗi tín hiệu cảm biến, dữ liệu lỗi thời và lệnh điều khiển không hợp lệ.
- Thiết kế quy trình xử lý khi policy không trả về hành động đúng định dạng, vượt thời gian phản hồi hoặc đưa ra hành động ngoài giới hạn.
- Phân biệt dừng có kiểm soát, dừng khẩn cấp và các trạng thái phục hồi; xác định rõ điều kiện để tiếp tục vận hành.
- Xây dựng checklist an toàn trước khi chạy thử và trước khi cho phép triển khai kỹ năng.
- Kiểm thử các trường hợp lỗi trong mô phỏng trước khi xác minh trên robot thật.

**Sản phẩm bàn giao:**
- Tài liệu quy tắc an toàn theo nhiệm vụ.
- Danh sách giới hạn vận hành và điều kiện dừng.
- Bộ kiểm thử các tình huống lỗi và fail-safe.
- Checklist an toàn trước khi chạy thử.
- Báo cáo kết quả kiểm tra và các giới hạn chưa được xác minh.

**Tiêu chí nghiệm thu:**
- Các điều kiện dừng, trạng thái lỗi và hành động xử lý được mô tả rõ.
- Có kiểm thử cho các tình huống như mất tín hiệu, dữ liệu không hợp lệ và hành động vượt giới hạn.
- Các giới hạn quan trọng được kiểm tra trước khi hành động được gửi đến hệ thống điều khiển.
- Chỉ phê duyệt triển khai khi các tiêu chí an toàn bắt buộc của nhiệm vụ đã được xác minh.
- Kết quả mô phỏng không được dùng thay thế cho việc xác minh dừng khẩn cấp và an toàn vật lý trên phần cứng.

### D5.2 — Chuẩn hóa gói kỹ năng (Skill Bundle & Model Packaging)

**Mục tiêu:** Xây dựng định dạng đóng gói thống nhất để lưu trữ, kiểm tra, phân phối và triển khai các kỹ năng robot.

**Công việc:**
- Xác định cấu trúc skill bundle dùng chung cho các mô hình và kỹ năng từ WS2.
- Chuẩn hóa các thành phần trong gói, bao gồm policy hoặc checkpoint, metadata, cấu hình suy luận và thông tin phụ thuộc.
- Ghi rõ nhiệm vụ, phiên bản mô hình, nguồn dữ liệu, phương pháp huấn luyện, chỉ số benchmark và các giới hạn đã biết.
- Xác định phiên bản API đầu vào/đầu ra giữa policy và hệ thống điều khiển.
- Quy định cách kiểm tra gói trước khi tải hoặc thực thi, bao gồm tính toàn vẹn, định dạng, phiên bản và khả năng tương thích.
- Xây dựng cơ chế quản lý phiên bản và lưu lịch sử thay đổi.
- Xây dựng quy trình phê duyệt (sign-off) trước khi gói được đánh dấu sẵn sàng triển khai.
- Lưu thông tin người phê duyệt, kết quả kiểm thử và điều kiện sử dụng của từng phiên bản.

**Sản phẩm bàn giao:**
- Định dạng skill bundle và tài liệu đặc tả.
- Công cụ đóng gói và kiểm tra gói.
- Mẫu metadata.
- Quy ước đánh phiên bản và quản lý artefact.
- Quy trình phê duyệt và lịch sử triển khai.

**Cấu trúc gói đề xuất:**

```text
skill-bundle/
├── manifest.json
├── policy/
│   └── checkpoint
├── configs/
│   └── inference.yaml
├── metadata/
│   ├── model_info.json
│   └── dataset_info.json
├── benchmarks/
│   └── results.json
├── safety/
│   └── safety_limits.yaml
├── dependencies/
│   └── requirements.txt
└── README.md
```

Tên và cấu trúc thực tế có thể thay đổi theo loại mô hình. Nếu một thành phần không cần thiết hoặc chưa có, manifest phải ghi rõ thay vì giả định rằng mọi gói đều có đủ tất cả thành phần.

**Tiêu chí nghiệm thu:**
- Có thể đóng gói và kiểm tra một mô hình mẫu theo định dạng đã thống nhất.
- Gói chứa thông tin phiên bản, cấu hình suy luận, phụ thuộc và kết quả kiểm thử liên quan.
- Có thể xác định chính xác phiên bản mô hình được sử dụng trong một lần chạy.
- Gói lỗi định dạng, thiếu thành phần bắt buộc hoặc không đạt kiểm tra phải bị từ chối.
- Việc đóng gói thành công không tự động đồng nghĩa với việc gói đã được phê duyệt triển khai.

### D5.3 — Chuẩn hóa API tích hợp mô hình và hệ thống robot (Policy–Robot Interface)

**Mục tiêu:** Xây dựng giao diện thống nhất để các mô hình có thể trao đổi trạng thái và gửi hành động thông qua lớp điều khiển được kiểm tra an toàn.

**Công việc:**
- Xác định định dạng trạng thái đầu vào, bao gồm các trường cần thiết cho từng loại policy.
- Chuẩn hóa định dạng hành động đầu ra, đơn vị đo, thứ tự khớp và giới hạn giá trị.
- Xác định tần số cập nhật, thời gian chờ tối đa và cách xử lý khi policy không phản hồi.
- Xây dựng lớp chuyển đổi giữa đầu ra của policy và giao diện điều khiển trong mô phỏng hoặc trên phần cứng.
- Kiểm tra dữ liệu đầu vào bị thiếu, sai kích thước, sai đơn vị hoặc không hợp lệ.
- Kiểm tra đầu ra trước khi chuyển đến bộ điều khiển.
- Tách riêng lớp suy luận của mô hình khỏi các cơ chế giám sát và dừng an toàn.
- Cung cấp công cụ giả lập đầu vào/đầu ra để kiểm thử API khi chưa có robot thật.

**Sản phẩm bàn giao:**
- Đặc tả API và định dạng dữ liệu.
- Lớp tích hợp policy với hệ thống điều khiển.
- Bộ kiểm thử giao diện.
- Công cụ giả lập đầu vào/đầu ra.
- Tài liệu về lỗi, thời gian chờ và quy tắc xử lý.

**Tiêu chí nghiệm thu:**
- API có định nghĩa rõ về kiểu dữ liệu, đơn vị, giới hạn và điều kiện lỗi.
- Có thể kiểm tra giao tiếp với mô hình mẫu.
- Các đầu ra không hợp lệ được phát hiện trước khi chuyển đến lớp điều khiển.
- Có kiểm thử cho trường hợp policy không phản hồi hoặc trả về dữ liệu sai định dạng.
- Các chức năng bảo vệ an toàn không phụ thuộc hoàn toàn vào việc policy tự đưa ra quyết định dừng.

### D5.4 — Tích hợp quy trình Real-is-Sim / Sim2Real

**Mục tiêu:** Kết nối các bước thu thập dữ liệu, huấn luyện, đánh giá và triển khai thành một quy trình có thể truy xuất nguồn gốc và kiểm soát chất lượng.

**Công việc:**
- Xây dựng quy trình bàn giao dữ liệu trình diễn từ WS1 sang WS2.
- Xác định cách liên kết dữ liệu đầu vào, cấu hình huấn luyện và checkpoint được tạo ra.
- Tích hợp kết quả benchmark từ WS3 vào hồ sơ của từng phiên bản mô hình.
- Kết nối mô hình với sandbox WS4 để kiểm thử trước khi xem xét triển khai.
- Xây dựng điều kiện phê duyệt theo từng giai đoạn: kiểm tra dữ liệu, huấn luyện, đánh giá ngoại tuyến, kiểm thử mô phỏng và xác minh trên robot thật khi có.
- Khi có robot thật, thiết kế thử nghiệm so sánh hành vi trong mô phỏng và thực tế trên một số nhiệm vụ có thể đo lường, chẳng hạn đẩy vật hoặc một bài toán thao tác phù hợp.
- Ghi nhận sai lệch về tỷ lệ thành công, sai số, thời gian thực hiện và các điều kiện môi trường.
- Xác định các trường hợp phải quay lại bước hiệu chỉnh dữ liệu, mô hình hoặc mô phỏng.

**Sản phẩm bàn giao:**
- Sơ đồ quy trình từ dữ liệu đến triển khai.
- Các điểm kiểm tra chất lượng (quality gates).
- Công cụ liên kết dữ liệu, checkpoint và benchmark.
- Báo cáo tích hợp mô phỏng–thực tế khi có dữ liệu phần cứng.
- Quy trình quay lại phiên bản trước khi phát hiện lỗi.

**Tiêu chí nghiệm thu:**
- Có thể truy xuất từ gói kỹ năng về phiên bản mô hình, dữ liệu và kết quả benchmark tương ứng.
- Mỗi giai đoạn có điều kiện đầu vào, đầu ra và tiêu chí chuyển bước.
- Mô hình chưa đạt tiêu chí kiểm thử bắt buộc không được tự động đánh dấu sẵn sàng triển khai.
- Khi chưa có robot thật, hoàn thành quy trình offline và mô phỏng nhưng phải đánh dấu phần xác minh thực tế là chưa thực hiện.
- Kết quả Sim2Real chỉ được kết luận sau khi có dữ liệu kiểm thử thực tế phù hợp.

### D5.5 — Tự động hóa kiểm thử và CI/CD

**Mục tiêu:** Tự động phát hiện lỗi khi mã nguồn, cấu hình, API hoặc mô hình thay đổi; giảm nguy cơ triển khai một phiên bản chưa được kiểm tra.

**Công việc:**
- Thiết lập pipeline CI cho kiểm tra mã nguồn và các bài kiểm thử tự động.
- Xây dựng unit test cho các thành phần như tiền xử lý dữ liệu, kiểm tra định dạng gói và chuyển đổi trạng thái/hành động.
- Bổ sung integration test cho giao tiếp giữa policy, sandbox và lớp điều khiển.
- Chạy các bài kiểm thử mô phỏng mẫu trong pipeline khi tài nguyên và thời gian cho phép.
- Kiểm tra cấu hình, phụ thuộc và khả năng tải checkpoint.
- Tạo báo cáo kết quả test gắn với phiên bản mã nguồn và artefact.
- Thiết lập quality gates để ngăn gói không đạt yêu cầu được phát hành.
- Quản lý mã nguồn bằng Git; quản lý dữ liệu và checkpoint bằng cơ chế lưu trữ có phiên bản phù hợp.
- Chỉ tự động hóa triển khai lên phần cứng khi đã có quy trình phê duyệt, giới hạn quyền và điều kiện an toàn tương ứng.

**Sản phẩm bàn giao:**
- Cấu hình pipeline CI/CD.
- Bộ unit test và integration test.
- Báo cáo kiểm thử tự động.
- Quy tắc quản lý phiên bản cho mã nguồn và artefact.
- Quy trình phát hành và quay lại phiên bản trước.

**Tiêu chí nghiệm thu:**
- Các thay đổi mã nguồn có thể kích hoạt kiểm tra tự động.
- Pipeline phát hiện được các lỗi định dạng, lỗi kiểm thử hoặc lỗi tích hợp đã được thiết kế.
- Mỗi bản phát hành gắn với phiên bản mã nguồn và artefact cụ thể.
- Phiên bản không vượt qua các quality gates bắt buộc không được đánh dấu là bản phát hành hợp lệ.
- Quy trình triển khai có khả năng dừng hoặc quay lại phiên bản trước theo thiết kế.

### D5.6 — Kiểm tra tương thích và phê duyệt triển khai (Hardware Compatibility & Sign-off)

**Mục tiêu:** Bảo đảm mỗi kỹ năng chỉ được sử dụng trong cấu hình hệ thống đã được kiểm tra và phê duyệt.

**Công việc:**
- Xác định cấu hình phần cứng mục tiêu, bao gồm robot, bộ điều khiển, cảm biến và phiên bản driver.
- Kiểm tra sự tương thích giữa gói kỹ năng, thư viện phụ thuộc và hệ thống điều khiển.
- Xác minh các đơn vị đo, thứ tự khớp, giới hạn hành động và tần số cập nhật.
- Xây dựng checklist trước khi chạy thử, bao gồm kiểm tra cảm biến, kết nối, giới hạn chuyển động và cơ chế dừng.
- Quy định các cấp độ thử nghiệm: kiểm tra tĩnh, chạy mô phỏng, chạy thử có giám sát và vận hành trong phạm vi được phê duyệt.
- Lưu kết quả kiểm tra, phiên bản phần mềm, cấu hình phần cứng và người chịu trách nhiệm phê duyệt.
- Xác định điều kiện phải thu hồi hoặc vô hiệu hóa một phiên bản kỹ năng khi phát hiện lỗi.
- Khi chưa có phần cứng, hoàn thiện checklist, công cụ kiểm tra cấu hình và quy trình sign-off; không giả định rằng khả năng tương thích đã được xác nhận.

**Sản phẩm bàn giao:**
- Ma trận tương thích phần cứng/phần mềm.
- Checklist trước triển khai.
- Mẫu biên bản kiểm thử và phê duyệt.
- Quy trình thu hồi, vô hiệu hóa hoặc quay lại phiên bản trước.
- Báo cáo các điều kiện đã xác minh và chưa xác minh.

**Tiêu chí nghiệm thu:**
- Mỗi gói phát hành có thông tin cấu hình mục tiêu.
- Có quy trình kiểm tra tương thích trước khi triển khai.
- Có người hoặc vai trò chịu trách nhiệm phê duyệt.
- Các yêu cầu an toàn bắt buộc phải được xác minh trước khi chạy trên phần cứng.
- Mọi giới hạn chưa được xác minh được ghi rõ trong hồ sơ phát hành.

## 3. Vai trò và nhân sự

- **Kỹ sư DevOps/CI:** Quản lý pipeline tự động, kiểm thử, phiên bản mã nguồn và artefact.
- **Kỹ sư An toàn (Safety Engineer):** Xây dựng yêu cầu an toàn, điều kiện dừng, kiểm tra rủi ro và quy trình phê duyệt.
- **Kỹ sư Hệ thống/Robotics:** Tích hợp API, driver, cảm biến và giao tiếp với hệ thống robot.
- **Người phụ trách phát hành:** Quản lý phiên bản skill bundle, kết quả kiểm thử và hồ sơ sign-off.
- **Người phụ trách WS5:** Điều phối các quality gates và bảo đảm các nhóm bàn giao đúng định dạng.

Một người có thể đảm nhiệm nhiều vai trò tùy quy mô đội ngũ, nhưng trách nhiệm phát triển, kiểm thử và phê duyệt cần được phân định rõ đối với các chức năng liên quan đến an toàn.

## 4. Đầu vào và điều kiện thực hiện

**Đầu vào chính:**
- **WS1:** Dữ liệu trình diễn, metadata và tài liệu về nguồn gốc dữ liệu.
- **WS2:** Mô hình, checkpoint, cấu hình suy luận và hướng dẫn chạy.
- **WS3:** Kết quả benchmark, báo cáo lỗi và các điều kiện mô hình đã vượt qua.
- **WS4:** Sandbox, API mô phỏng và các kịch bản kiểm thử.
- **Phần cứng mục tiêu:** Robot, bộ điều khiển, cảm biến và driver khi sẵn có.

**Điều kiện tối thiểu để bắt đầu:**
- Có ít nhất một mô hình mẫu để đóng gói.
- Có định dạng API hoặc giao diện suy luận được mô tả.
- Có môi trường chạy thử để kiểm tra gói.
- Có tiêu chí kiểm thử và quy tắc quản lý phiên bản.
- Có danh sách các yêu cầu an toàn cần xác minh trước khi triển khai.

Khi chưa có robot thật, nhóm vẫn có thể hoàn thành đóng gói, kiểm tra API, CI, quản lý artefact và thử nghiệm trong sandbox. Các tiêu chí phụ thuộc vào driver, cảm biến và hành vi vật lý phải được ghi nhận là chờ xác minh trên phần cứng.

## 5. Đầu ra chung của WS5

1. **Skill Bundle:** Gói kỹ năng có phiên bản, metadata, cấu hình và thông tin phụ thuộc.
2. **Safety Package:** Quy tắc vận hành, checklist, điều kiện dừng và hồ sơ kiểm thử an toàn.
3. **Integration API:** Đặc tả và lớp giao tiếp giữa mô hình với hệ thống điều khiển.
4. **CI/CD Pipeline:** Quy trình tự động kiểm tra mã nguồn, mô hình và các bài kiểm thử tích hợp.
5. **Release Records:** Lịch sử phát hành, phiên bản artefact, kết quả test và hồ sơ sign-off.
6. **Deployment Guide:** Hướng dẫn cài đặt, cấu hình, kiểm tra tương thích và chạy thử.
7. **Sim2Real Report:** Báo cáo so sánh mô phỏng–thực tế khi đã có dữ liệu thực phù hợp.
8. **Rollback Procedure:** Quy trình quay lại phiên bản trước hoặc vô hiệu hóa gói khi phát hiện lỗi.

## 6. Tiêu chí nghiệm thu tổng thể

- [ ] Có định dạng skill bundle thống nhất và công cụ kiểm tra gói.
- [ ] Có metadata, phiên bản và thông tin phụ thuộc cho từng artefact phát hành.
- [ ] Có API rõ ràng giữa policy và lớp điều khiển.
- [ ] Có unit test và integration test tự động cho các thành phần chính.
- [ ] Có kiểm thử mô phỏng trong pipeline khi điều kiện kỹ thuật cho phép.
- [ ] Có quy tắc fail-safe và checklist an toàn cho từng nhiệm vụ triển khai.
- [ ] Có quality gates ngăn gói không đạt yêu cầu được phát hành.
- [ ] Có quy trình sign-off và người chịu trách nhiệm phê duyệt.
- [ ] Có hướng dẫn triển khai, kiểm tra tương thích và quay lại phiên bản trước.
- [ ] Có báo cáo phân biệt rõ phần đã xác minh trong mô phỏng và phần đã xác minh trên robot thật.

**Nguyên tắc nghiệm thu:** Một gói kỹ năng chỉ được phê duyệt cho đúng phạm vi phần cứng và nhiệm vụ đã kiểm tra. Không suy rộng kết quả từ một cấu hình sang cấu hình khác nếu chưa có bằng chứng tương thích.

## 7. Kế hoạch triển khai đề xuất

**Giai đoạn 1 — Chuẩn hóa artefact và API**
- Xác định cấu trúc skill bundle.
- Chuẩn hóa metadata và phiên bản.
- Xây dựng kiểm tra định dạng và API với mô hình mẫu.

**Giai đoạn 2 — CI và kiểm thử tích hợp**
- Thiết lập unit test và integration test.
- Tích hợp sandbox từ WS4 vào pipeline.
- Tạo báo cáo tự động và quality gates.

**Giai đoạn 3 — Quy trình an toàn và phát hành**
- Xây dựng checklist, điều kiện dừng và quy trình sign-off.
- Hoàn thiện hướng dẫn triển khai và rollback.
- Kiểm tra quy trình từ mô hình đến gói phát hành trong môi trường mô phỏng.

**Giai đoạn 4 — Xác minh phần cứng và Sim2Real**
- Kiểm tra driver, cảm biến, giao tiếp và giới hạn vận hành trên cấu hình mục tiêu.
- Thực hiện chạy thử có giám sát theo quy trình đã được phê duyệt.
- So sánh kết quả thực tế với mô phỏng.
- Chỉ mở rộng phạm vi sử dụng sau khi đáp ứng các yêu cầu kiểm thử và an toàn tương ứng.

## 8. Effort, phụ thuộc và rủi ro

**Effort:** M (trung bình), với điều kiện các đầu ra từ WS1–WS4 đã có định dạng tương đối ổn định. Nếu phải xây dựng lại giao diện giữa các nhóm, phát triển driver hoặc xác minh an toàn trên phần cứng mới, khối lượng thực tế có thể tăng đáng kể.

**Phụ thuộc:**
- **WS1 — Data & Expert Knowledge:** Dữ liệu và metadata có nguồn gốc rõ ràng.
- **WS2 — Baseline Models:** Mô hình, checkpoint và cấu hình suy luận.
- **WS3 — Testing & Benchmark:** Kết quả đánh giá và các trường hợp thất bại.
- **WS4 — Sandbox & Digital Twin:** Môi trường mô phỏng và API.
- **Robot thật:** Cần thiết cho các bước xác minh an toàn vật lý và đánh giá Sim2Real trên phần cứng.

**Rủi ro và biện pháp xử lý:**

| Rủi ro | Biện pháp |
|---|---|
| Bỏ sót tình huống an toàn | Xây dựng checklist theo nhiệm vụ, kiểm thử lỗi và rà soát trước triển khai |
| Gói kỹ năng không tương thích phần cứng | Kiểm tra phiên bản driver, cảm biến, đơn vị đo và cấu hình mục tiêu |
| Lỗi giao tiếp giữa policy và bộ điều khiển | Chuẩn hóa API, kiểm tra dữ liệu đầu vào/đầu ra và xử lý timeout |
| Artefact không truy xuất được nguồn gốc | Gắn phiên bản, metadata và mã định danh cho từng gói |
| CI không phát hiện lỗi tích hợp | Bổ sung integration test và các bài kiểm thử mô phỏng có tính đại diện |
| Mô hình tốt trong mô phỏng nhưng kém trên robot | Chạy thử theo từng cấp độ, đo sai lệch và giới hạn phạm vi triển khai |
| Triển khai nhầm phiên bản | Kiểm tra manifest, chữ ký hoặc checksum và quy trình phê duyệt trước phát hành |

## 9. Cấu trúc thư mục đề xuất

```text
WS5-Integration-Deployment/
├── README.md
├── bundle_spec/
│   ├── manifest.schema.json
│   └── example_bundle/
├── src/
│   ├── packaging/
│   ├── policy_interface/
│   ├── safety_checks/
│   ├── compatibility/
│   └── release_management/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── simulation/
│   └── safety/
├── ci/
│   └── pipeline_config
├── configs/
│   ├── safety/
│   └── hardware_profiles/
├── releases/
├── reports/
│   ├── benchmark/
│   ├── integration/
│   └── sim2real/
└── docs/
    ├── setup.md
    ├── skill_bundle_spec.md
    ├── safety_checklist.md
    ├── deployment.md
    ├── signoff.md
    └── rollback.md
```

Đây là cấu trúc tham khảo. Mã nguồn, dữ liệu và checkpoint lớn có thể cần các cơ chế lưu trữ khác nhau, nhưng phải có liên kết phiên bản và khả năng truy xuất về cùng một lần phát hành.

## 10. Bàn giao và phối hợp với các Workstream

- **WS1:** Bảo đảm dữ liệu và metadata có cấu trúc, phục vụ truy xuất nguồn gốc.
- **WS2:** Cung cấp mô hình, checkpoint, cấu hình suy luận và các giới hạn đã biết.
- **WS3:** Cung cấp benchmark, kết quả kiểm thử và điều kiện thành công/thất bại.
- **WS4:** Cung cấp sandbox, API và các kịch bản mô phỏng dùng trong pipeline kiểm thử.
- **Toàn dự án:** Áp dụng quy trình phiên bản hóa, phê duyệt và kiểm tra trước khi đưa kỹ năng vào sử dụng.

**Nguyên tắc bàn giao:** Mọi phiên bản kỹ năng phải có thể truy xuất nguồn gốc, tái tạo quy trình kiểm thử và xác định rõ phạm vi đã được phê duyệt. Việc triển khai trên robot thật là một cổng kiểm định riêng, không được tự động suy ra từ kết quả huấn luyện hoặc benchmark mô phỏng.
