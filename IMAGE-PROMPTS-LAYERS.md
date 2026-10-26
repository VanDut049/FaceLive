# Ảnh tách lớp và hero từ mockup gốc

Công cụ: image_gen tích hợp (built-in). Ảnh PNG được lưu trong assets, không ghi đè ảnh nguồn tham chiếu. Tất cả dùng transparent_background=true; đã kiểm tra alpha tại góc/cạnh ngoài bằng 0.

## assets/interface-accounts.png

Tham chiếu: assets/interface-reference-art.png từ lần tạo trước, dựa trên mockup 16.png.

Use case: background-extraction / precise-object-edit. Reference is the existing Facelive interface artwork. Extract ONLY the large BACK account management software window from the reference. Reconstruct the lower edge naturally where foreground windows covered it, keeping the same account table and statuses. Preserve Facelive purple F branding, Vietnamese labels, sidebar, platform rows and the exact field hierarchy. One complete landscape desktop window on transparent background, nearly straight-on with a very slight perspective, no other windows. Remove the outer page background completely. Keep the white WINDOW SURFACE opaque. Genuine transparent alpha outside the window and a small soft shadow. Use tight framing with no more than 4% transparent margin around the window. High resolution, crisp legible screenshot-quality controls. Do not change wording, do not invent business analytics charts, do not add people, decorations, platform bubbles or marketing headlines.

## assets/interface-config.png

Tham chiếu: assets/interface-reference-art.png từ lần tạo trước, dựa trên mockup 16.png.

Use case: background-extraction / precise-object-edit. Reference is the existing Facelive interface artwork. Extract ONLY the FRONT LEFT livestream configuration software window from the reference: Facelive sidebar and panel titled 'Cấu hình livestream', account selector acc_1 — TikTok, title, description, category, thumbnail and bottom switches. Preserve the exact visual design, original purple F logo, Vietnamese labels and field hierarchy. One complete tall desktop panel on transparent background, nearly straight-on, no other windows. Remove the outer page background completely. Keep the white WINDOW SURFACE opaque. Genuine transparent alpha outside the window and a small soft shadow. Use tight framing with no more than 4% transparent margin around the window. High resolution, crisp legible screenshot-quality controls. Do not change wording, do not invent business analytics charts, do not add people, decorations, platform bubbles or marketing headlines.

## assets/interface-obs.png

Tham chiếu: assets/interface-reference-art.png từ lần tạo trước, dựa trên mockup 16.png.

Use case: background-extraction / precise-object-edit. Reference is the existing Facelive interface artwork. Extract ONLY the FRONT RIGHT advanced OBS settings window from the reference: title 'Cài đặt nâng cao', tabs, 'Kết nối OBS', toggle, Host 127.0.0.1, port 4455, masked password and guide card. Preserve exact Vietnamese text and field hierarchy, white/lavender UI with purple accents. One complete compact tall window on transparent background, nearly straight-on, no other windows. Remove the outer page background completely. Keep the white WINDOW SURFACE opaque. Genuine transparent alpha outside the window and a small soft shadow. Use tight framing with no more than 4% transparent margin around the window. High resolution, crisp legible screenshot-quality controls. Do not change wording, do not invent business analytics charts, do not add people, decorations, platform bubbles or marketing headlines.

## assets/hero-reference-cutout.png

Tham chiếu: C:/Users/devid/Downloads/11.png. Vai trò: ảnh gốc cần tách giao diện, giữ nội dung và logo.

Use case: background-extraction / precise-object-edit. Isolate ONLY the complete right-hand Facelive software application window from this reference 11.png. Remove ALL left-hand marketing text, page logo, page background, lavender background circles and the three detached platform badges outside the app. Preserve the actual app exactly: the original purple F logo with Facelive wordmark in its sidebar; Livestream, Tài khoản, Nội dung, Bình luận AI, Cài đặt, Công cụ, Hỗ trợ; account list acc_1 — TikTok; platform TikTok (qua Streamlabs), token input, login button, Kịch bản livestream AI; the right portrait livestream video with original model and chat overlays. Do not redesign, do not replace with another dashboard, do not alter logo glyph or text. The app's white window and every interior control must remain opaque. Genuine transparent alpha outside the application, only a soft tight shadow around it. Tight landscape framing with 2-4 percent transparent margin, high resolution and readable Vietnamese. No detached people, no outer card, no marketing headings.

## Cách ghép

Quản lý tài khoản ở z-index 1, cấu hình livestream 3, OBS 4, nhân vật TQA 5. Mỗi ảnh là một thẻ img riêng với nền alpha; ánh sáng nền dùng CSS. Hero dùng giao diện tham chiếu mới và người mẫu áo kem ở lớp riêng. Các ảnh minh họa giữ cấu trúc mockup, không phải kết nối đến phần mềm thực.
