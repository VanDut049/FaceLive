# Facelive landing page

Mở `index.html` cùng các file CSS/JS/assets, hoặc mở `facelive-single-file.html` để xem bản HTML đã nhúng toàn bộ tài nguyên. Không cần cài thư viện. Google Fonts cần mạng; trang vẫn có font dự phòng khi ngoại tuyến.

Có Node.js: chạy `node serve.mjs`, mở http://127.0.0.1:4173.

## Thiết kế hiện tại

- Thanh điều hướng ghép biểu tượng F sát chữ **acelive**, không lặp chữ F.
- Hero dùng `hero-reference-branded.svg`: giao diện từ mockup 11 và logo linh vật chuẩn ở lớp riêng. Người mẫu áo kem đứng bên cạnh; icon TikTok, Facebook, Shopee bay quanh người mẫu, không còn xếp hàng ở phía trên.
- V1/V2 dạng đối đầu: hover để mở rộng toàn cảnh, giữ dải logo phiên bản còn lại; mobile dùng chạm. Chuyển động dùng transform/opacity với lớp trượt kích thước cố định.
- Đối tượng: bốn ảnh thật trong thẻ img. Icon nằm cạnh tiêu đề từng card; mascot F nằm cạnh tiêu đề section.
- Quy trình: xuất hiện lần lượt khi cuộn tới, icon nổi nhẹ và vòng sóng ở bước cuối; chỉ giữ mũi tên giữa các thẻ, bỏ đường kẻ xuyên nội dung. Chuyển động dừng khi ra ngoài viewport, hỗ trợ reduced-motion.
- Trải nghiệm: ba ảnh PNG riêng có nền trong suốt — tài khoản phía sau, cấu hình live và OBS phía trước; nhân vật TQA lớn hơn ở bên cạnh. Đã bỏ nút “Xem giao diện chi tiết”.

## Cấu hình URL thật

Điền `downloadUrl`, `videoUrl` và `supportUrl` trong `config.js`. Chỉ dùng HTTPS. `videoUrl` là file video phát trực tiếp, không phải URL trang YouTube. Để trống thì trang hiển thị thông báo chờ cập nhật; không giả vờ tải bộ cài hay phát video.

## Sửa và gộp lại

- `build.mjs`: sinh HTML, logo và gọi bộ dựng SVG.
- `visuals.mjs`: bố cục hero và các lớp ảnh trải nghiệm; các SVG hỗ trợ.
- `brand.mjs`: dùng duy nhất `mascot-master.png` cho logo HTML và logo trong ảnh phần mềm. SVG bọc ảnh quản lý/cấu hình giữ nguyên nội dung giao diện, thay lớp thương hiệu bằng cùng mẫu F.
- `versions.mjs`: section V1/V2.
- `styles.css`, `refinements.css`, `cinematic.css`, `sections.css`: CSS theo đúng thứ tự tải; giữ đủ bốn tệp.
- `script.js`: menu, modal, FAQ, chuyển phiên bản và hiệu ứng quy trình.
- `node build.mjs` rồi `node package.mjs`: cập nhật HTML và bản một file. Nếu sửa index.html trực tiếp, chỉ chạy package; chạy build sẽ sinh lại index từ nguồn.

## Ảnh và kiểm tra

Ảnh nguồn/tách lớp nằm trong `assets/`. Prompt và công cụ được ghi trong IMAGE-PROMPTS.md, IMAGE-PROMPTS-UPDATE.md, IMAGE-PROMPTS-LAYERS.md và IMAGE-PROMPTS-BRAND.md. Nhân vật nữ mặc áo TQA Solution là nhân vật AI mới theo yêu cầu người dùng, không phải ảnh nhân viên thật.

Các bản trong `previews/` là render tĩnh, không phải screenshot trình duyệt. Bản mới nhất: experience-layered-review.png, hero-enlarged-review.png, brand-title-alignment-review.png. Đã kiểm tra alpha, hình ảnh, cú pháp và trạng thái sự kiện; chưa có browser kết nối để kiểm tra toàn trang hoặc đo FPS thực tế.

Đánh giá/số liệu và nền tảng giữ theo mockup, cần chủ thương hiệu xác nhận trước khi công bố. Trang chưa có backend, bộ cài hay video chính thức.
