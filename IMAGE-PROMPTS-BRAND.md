# Đồng bộ linh vật Facelive

Nguồn: `assets/brand-reference.png`, logo người dùng cung cấp.

Công cụ: `image_gen` tích hợp, edit với nền trong suốt. Đầu ra: `assets/mascot-master.png`. Mọi logo hiện dùng trên trang và trong hình phần mềm tái sử dụng ảnh master này.

Prompt đã dùng:

> Use case: background-extraction / identity-preserve. Extract ONLY the original mascot-shaped letter F at the START of the LARGE upper Facelive wordmark in the supplied reference. This is NOT a redesign. Preserve its exact original silhouette and proportions: a long rounded indigo-blue diagonal upper cap pointing right, dark charcoal/black F body, white face inset under the cap, two black vertical rounded eyes and the tiny smiling mouth. Match the supplied dark charcoal and muted indigo-blue colors; do not turn the whole F purple, do not make it glossy 3D, do not add limbs, do not change the face. Remove the remaining letters 'acelive', the lower app tile, and the white page background. Output ONE isolated faithful F mascot on genuine transparent alpha, centered with a small 3-5 percent clear margin, no outer tile, no shadow, no other text or objects. High fidelity to the supplied exact logo is essential.

`brand.mjs` tạo SVG bọc raster và lớp logo, giữ nội dung giao diện:

- `assets/mascot.svg`, `assets/favicon.svg`: master với viewBox theo biên alpha trong `mascot-master.json`.
- `assets/hero-reference-branded.svg`: giao diện hero và logo chuẩn.
- `assets/interface-accounts-branded.svg`: cửa sổ tài khoản và logo chuẩn.
- `assets/interface-config-branded.svg`: cửa sổ cấu hình và logo chuẩn.
- Workspace V1/V2 và SVG phần mềm khác gọi cùng hàm `uiBrand`.

Ảnh raster/tham chiếu gốc vẫn được giữ. HTML dùng một symbol chung, chỉ nhúng master một lần.
