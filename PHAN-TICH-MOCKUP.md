# Phân tích và triển khai landing page Facelive

## Hệ thiết kế

Nền trắng pha lavender, chữ xanh đen, nhấn tím/indigo, bo góc mềm, viền mảnh và bóng đổ nhẹ. Nội dung marketing là HTML, biểu tượng chức năng là SVG, chân dung và giao diện được tách thành tài nguyên riêng. Không dùng toàn bộ ảnh mockup làm nguyên một section.

## Phương án từng khu vực

| Mockup / khu vực | Cách dựng hiện tại |
|---|---|
| Logo gốc | Một ảnh mascot-master.png tách nền từ tham chiếu; tái sử dụng trong SVG cho thanh điều hướng, footer, CTA và tất cả ảnh phần mềm hiện dùng. Biểu tượng F đứng sát chữ “acelive”, không lặp F. |
| 11.png — Hero | hero-reference-branded.svg bọc ảnh giao diện và lớp logo mascot chuẩn. Giữ sidebar/tài khoản/nền tảng/token/kịch bản/live preview. Người mẫu và icon nền tảng là lớp riêng; icon bay quanh mẫu nữ, bỏ hàng nhãn trên đầu. |
| 12.png — Hai phiên bản | HTML đối đầu V1/V2, vùng che trượt bằng hai lớp translate đối ứng, ảnh workspace rộng được hé lộ khi chọn. Giữ dải logo phía còn lại; mobile chạm để đổi. |
| 13.png — Lợi ích | Card HTML và SVG icon; nền/gradient dùng CSS. |
| 14.png — Đối tượng | Bốn ảnh img trực tiếp, tránh ảnh nền lớn trong custom property. Icon đặt cạnh từng h3; mascot F cạnh h2 “Ai nên dùng Facelive?”. Không còn mascot rời ở cuối section. |
| 15.png — Quy trình | Bốn card HTML, reveal lệch nhịp, icon nổi và vòng sóng bước 4. Đã bỏ đường kẻ chạy xuyên các thẻ, chỉ còn mũi tên trong khoảng trống. IntersectionObserver dừng idle motion ngoài viewport; hỗ trợ reduced-motion. |
| 16.png — Trải nghiệm | Từ ảnh tham chiếu tạo 3 PNG alpha độc lập: quản lý tài khoản, cấu hình livestream và OBS. Xếp lớp có z-index, phóng lớn cửa sổ và nhân vật TQA. Ánh sáng nền dùng CSS; không còn hình chữ nhật chứa cả nền hay nút “Xem giao diện chi tiết”. |
| 17.png — Đánh giá | HTML text/card/stats; avatar nguồn. Chưa kiểm chứng độc lập các lời đánh giá và số liệu. |
| 18.png — FAQ / CTA | details/summary native, SVG icon và mascot; tương thích Windows theo mockup. |

## Thứ tự lớp ở phần trải nghiệm

1. Ánh sáng lavender CSS, z-index 0, hòa vào nền section.
2. assets/interface-accounts-branded.svg, z-index 1: cửa sổ quản lý tài khoản phía sau, logo mascot chuẩn.
3. assets/interface-config-branded.svg, z-index 3: cấu hình livestream phía trước bên trái, logo mascot chuẩn.
4. assets/interface-obs.png, z-index 4: bảng tích hợp OBS phía trước bên phải.
5. assets/tqa-staff-cutout.png, z-index 5: nhân vật nữ TQA Solution, phóng lớn và có vùng riêng.

Các ảnh đã kiểm tra alpha=0 tại góc/cạnh ngoài; bề mặt cửa sổ vẫn trắng đục. Kích thước và vị trí mỗi lớp được điều khiển trong sections.css, không cần tạo lại nguyên ảnh để dịch vị trí. Chuyển sang một ảnh ứng dụng chính rộng hơn và các lớp phía trước giúp đọc cấu trúc rõ hơn so với bản composite cũ.

## Hero và logo

Hero hiện dùng ảnh tách trực tiếp theo 11.png thay cho dashboard tự dựng đơn giản. Các trường danh mục tài khoản, acc_1 — TikTok, Streamlabs, token và kịch bản cùng live preview được giữ đúng kiểu tham chiếu. Nguồn SVG cũ còn trong assets để đối chiếu nhưng không dùng làm hình hero chính.

Thanh điều hướng dùng biểu tượng F làm chữ đầu, phần chữ chỉ còn “acelive”; gap bằng 0 và căn sát. Logo trong hero, hai workspace V1/V2 và các cửa sổ trải nghiệm dùng cùng mascot master. Với ảnh raster, lớp logo được thay trong SVG riêng, không tạo lại toàn bộ giao diện và chữ nội dung.

## Nguồn ảnh

Các lần tạo ảnh dùng image_gen tích hợp; prompt và đường dẫn nằm trong IMAGE-PROMPTS.md, IMAGE-PROMPTS-UPDATE.md và IMAGE-PROMPTS-LAYERS.md. Không ghi đè ảnh tham chiếu gốc. Nhân viên TQA là nhân vật minh họa AI được người dùng yêu cầu tạo mới.

## Kiểm tra và giới hạn

Đã kiểm tra cú pháp, tài nguyên, ID/anchor, HTML gộp, logic V1/V2, reveal/reduced-motion, việc bỏ nút xem chi tiết, 3 lớp giao diện và vị trí cấu trúc icon/tiêu đề. Đã xem bản render ảnh tĩnh và alpha của 4 tài nguyên mới.

Các preview là render tĩnh, không phải screenshot CSS từ browser. Công cụ không có browser kết nối; chưa xác nhận trực tiếp layout desktop/mobile hay tốc độ khung hình. Không cam kết 120 fps trên mọi thiết bị. Các URL tải phần mềm/video/hỗ trợ cần điền trong config.js trước khi dùng chính thức.
