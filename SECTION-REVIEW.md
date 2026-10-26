# Kiểm tra bố cục từng section

## Bản hiện tại — giao diện lớn, ảnh tách lớp, logo sát chữ

- `previews/experience-layered-review.png`: kiểm tra 3 ảnh cửa sổ độc lập và nhân vật TQA phóng lớn. Nền ngoài ảnh alpha=0, không còn mảng nền chữ nhật. Tài khoản phía sau, cấu hình và OBS phía trước; nhân vật ở lớp cuối, phần mềm chiếm diện tích lớn hơn.
- `previews/hero-enlarged-review.png`: giao diện tách theo 11.png, tăng cỡ màn hình và giữ logo gốc trong ảnh. Người mẫu nhỏ hơn tương đối để ưu tiên màn hình và bớt che live preview.
- `previews/brand-title-alignment-review.png`: biểu tượng F sát chữ “acelive”, icon thẻ nằm cạnh tiêu đề. Mascot tại section đối tượng nằm cạnh h2, không còn ở cuối section.
- Đã bỏ cả nút và xử lý modal “Xem giao diện chi tiết”. Các mục kiểm tra cũ về nút này bên dưới không còn áp dụng.

Các bản trên là render tĩnh, không phải screenshot trình duyệt. Xem IMAGE-PROMPTS-LAYERS.md để biết prompt và đường dẫn ảnh mới.

Các tệp `previews/section-*.png` là bản render bố cục tĩnh bằng bộ dựng SVG, có ghi chú ngay trên ảnh; không phải ảnh chụp trình duyệt và không xác nhận được kết quả responsive/CSS thực tế. Đã thử lấy inventory trình duyệt và mở in-app browser: không có browser khả dụng.

| Section | Tệp xem trước | Quan sát và điều chỉnh |
|---|---|---|
| Ai nên dùng | previews/section-audience.png | Bốn ảnh đầy đủ, gương mặt không mất; tiêu đề doanh nghiệp dài nên dành chiều cao đồng nhất cho mọi card. Thay ảnh nền CSS bằng img trực tiếp. |
| Cách hoạt động | previews/section-steps.png | Bốn card tách rõ, icon và số thứ tự có không gian riêng; đường kết nối chỉ ở khe giữa card. Hiệu ứng xuất hiện/idle được kiểm tra bằng trạng thái IntersectionObserver, chưa chụp được animation thực. |
| Hero | previews/section-hero.png | Người mẫu đứng ngoài khung như bố cục tham chiếu mới; sửa lại trường cấu hình theo 11.png, giữ phần token và kịch bản đọc được khi phóng to SVG. Người mẫu trên web là lớp img riêng để chuyển động độc lập. |
| Trải nghiệm | previews/section-experience.png | Ảnh giao diện theo 16.png có ba cụm nội dung; chừa riêng phía phải cho nhân viên TQA. Điều chỉnh ảnh giao diện chiếm 75% và nhân vật 28% vùng minh họa, chỉ chạm nhẹ mép ngoài, thêm nút phóng to vì nhiều chữ UI nhỏ. |

## Tài nguyên mới

- assets/audience-business.png — hình doanh nghiệp.
- assets/audience-agency.png — hình agency.
- assets/interface-reference-art.png — giao diện tạo dựa trên ảnh 16.png.
- assets/tqa-staff-cutout.png — nhân vật nữ mới mặc áo TQA Solution; kiểm tra pixel góc có alpha=0.
- assets/hero-interface.svg — giao diện hero vẽ theo 11.png, không chứa người mẫu bên ngoài.

Nhân viên TQA là nhân vật minh họa AI theo yêu cầu người dùng, không phải ảnh một nhân viên thực. Prompt được lưu trong IMAGE-PROMPTS-UPDATE.md.

## Kiểm tra mã nguồn

PASS: 4 img đối tượng, ảnh nhân vật tách riêng, tham chiếu tài nguyên, SVG/HTML IDs, JavaScript syntax, chuyển phiên bản V1/V2, reveal/idle/reduced-motion của 4 bước, HTML gộp không cần file ảnh ngoài.

Chưa kiểm tra trực tiếp browser desktop/mobile, thao tác phóng to và frame time. Không tuyên bố đã chụp screenshot hoặc đạt 120 fps.
# Cập nhật: bỏ đường kẻ, icon quanh mẫu nữ và đồng bộ mascot

- Quy trình: bỏ pseudo-element tạo đường kẻ xuyên thẻ. Giữ mũi tên trong khoảng trống; reveal và icon chuyển động vẫn hoạt động.
- Hero: TikTok ở trên bên phải mẫu nữ, Facebook cạnh bên phải, Shopee phía dưới bên trái. Badge nổi nhẹ bằng transform và có reduced-motion.
- Logo: một mascot master dùng cho HTML, hero, V1/V2, tài khoản và cấu hình. SVG thay lớp logo giữ nguyên giao diện raster; OBS không có logo F.
- Đã xem render tĩnh: steps-clean-review.png, hero-enlarged-review.png, experience-layered-review.png và ảnh logo từng cửa sổ. Đã kéo badge Facebook vào trong mép khung sau khi xem render.
- Kiểm tra nguồn/tài nguyên, standalone HTML, logic V1/V2 và hướng dẫn đều đạt. Chưa có screenshot browser hoặc đo FPS thực tế.

Các mục bên dưới là lịch sử kiểm tra trước.

