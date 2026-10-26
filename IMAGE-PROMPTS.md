# Ảnh minh họa Facelive

Công cụ: image_gen tích hợp (built-in), không dùng CLI/API dự phòng. Ba ảnh được tạo mới từ mô tả, không phải ảnh khách hàng thật. Các ảnh gốc đã lưu trong assets; ảnh được ghép vào SVG bằng data URI để SVG mở độc lập.

## V1 — assets/v1-studio.png

Use case: ads-marketing. Asset type: wide illustration for the V1 Face Swap software section of the Facelive website. Create a premium photorealistic livestream studio scene, landscape 3:2 composition, a smiling adult Vietnamese female beauty creator with long dark brown hair in a cream knit blouse seated at a clean desk, looking towards the camera, professional camera and ring light visible at left, soft lilac illuminated modern studio behind her, cosmetic product and laptop at desk. Rich spacious environment across the entire wide image, elegant white and lavender palette, realistic skin, natural sophisticated lighting, commercial photography. The woman occupies right third, roomy studio environment at left. No typography, no logos, no UI panels, no border, no watermark. This image will be expanded full width behind a separate vector software interface.

## V2 — assets/v2-studio.png

Use case: ads-marketing. Asset type: wide illustration for V2 automated livestream video software of Facelive. Create a premium photorealistic commercial studio photograph, landscape 3:2 composition, an adult Vietnamese female beauty presenter with long dark brown hair and white blouse holding an elegant unbranded ivory cosmetic bottle beside her face at the right third. Modern content studio with a camera, small softbox and cosmetic display in the left half, spacious clean environment, cool pale blue and lavender lighting, white surfaces, sophisticated realistic skin and natural expression, polished commercial photography, broad scene framing that reveals workspace. No text, no logos, no UI, no frame, no watermark. Intended to be composited with native SVG software UI on a white-indigo SaaS website.

## Hero — assets/model-cutout.png

Use case: photorealistic-natural. Asset type: isolated transparent model for a premium livestream software website hero. Adult Vietnamese female beauty content creator, long flowing dark brown hair, friendly confident smile, cream knit top, front three-quarter waist-up portrait with both hands visible, one hand elegantly holding a small unbranded ivory cosmetic serum bottle near chest, other hand relaxed at waist. Natural realistic skin and subtle makeup, soft professional studio lighting, subject entirely inside frame with generous clear margins, hair intact, no chopped arms or fingers. Clean commercial photography, genuine transparent background, no other objects, no text, no frame, no watermark. Portrait composition.

Tham số: transparent_background=true cho model-cutout; false cho hai ảnh studio. Kiểm tra pixel ở các cạnh ảnh model có alpha=0.

## Tài nguyên vector kết hợp

- assets/hero-scene.svg: giao diện 2.5D, live preview, người mẫu, thẻ trợ lý AI. Logo LIVE của nền tảng nằm trong HTML/SVG để animation riêng.
- assets/v1-workspace.svg: cấu hình face swap + studio V1.
- assets/v2-workspace.svg: cấu hình video/playlist + studio V2.
- assets/experience-scene.svg: dashboard quản lý tài khoản, AI và tích hợp OBS, được vẽ hoàn toàn bằng SVG.
- previews/: bản PNG render từ SVG để kiểm tra hoặc xem nhanh. Đây là bản xuất từ vector, không phải ảnh AI tạo thêm.
