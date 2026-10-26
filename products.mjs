// Product landing pages (FaceLiveAI / FaceLiveStream) + trial sign-up form.
// Content ported from Chingchong.html; design follows aKien (Facelive) system.
// Helpers {L, icon, mark, logo, langSwitch} are passed in from build.mjs.

const SPEC={
  os:'<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  gpu:'<rect x="2.5" y="6" width="19" height="11" rx="2"/><circle cx="9" cy="11.5" r="2.6"/><path d="M15 9.5h3M15 13.5h3M5 17v2M8 17v2"/>',
  ram:'<rect x="2.5" y="7" width="19" height="9" rx="1.5"/><path d="M6.5 10v3M10 10v3M14 10v3M17.5 10v3M5 16v2.5M19 16v2.5"/>',
  cpu:'<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx=".8"/><path d="M9.5 2.5V6M14.5 2.5V6M9.5 18v3.5M14.5 18v3.5M2.5 9.5H6M2.5 14.5H6M18 9.5h3.5M18 14.5h3.5"/>',
  disk:'<rect x="2.5" y="13" width="19" height="7" rx="2"/><path d="M5.5 13 8 4.5h8l2.5 8.5"/><path d="M6.5 16.5h.01M10 16.5h.01"/>',
  device:'<circle cx="12" cy="10" r="7"/><circle cx="12" cy="10" r="2.6"/><path d="M8 20.5h8M12 17v3.5"/>',
  obs:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.5"/>',
  api:'<circle cx="7.5" cy="15.5" r="4"/><path d="M10.4 12.6 20 3M16 7l3 3M14 9l2 2"/>'
};
const specSvg=n=>`<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${SPEC[n]||''}</svg>`;
const OSICON={
  win:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5.5 10.6 4.3V11.2H3V5.5ZM10.6 12.4v6.9L3 18.1V12.4h7.6ZM11.9 4.1 21 2.8V11.2h-9.1V4.1ZM21 12.4v8.2l-9.1-1.3V12.4H21Z"/></svg>',
  mac:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.3 12.6c0-2 1.6-3 1.7-3.1-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.5 2 1 0 1.3-.6 2.5-.6 1.1 0 1.5.6 2.5.6s1.7-.9 2.4-1.9c.7-1.1 1-2.1 1-2.2-.1 0-2.3-.9-2.3-3.2zM14.6 6.2c.5-.7.9-1.6.8-2.6-.8 0-1.8.6-2.4 1.3-.5.6-1 1.5-.8 2.5.9 0 1.8-.5 2.4-1.2z"/></svg>',
  lin:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="m7.5 9.5 3 2.5-3 2.5M13 15h3.5"/></svg>'
};
const OSNAME={win:'Windows',mac:'macOS',lin:'Linux'};

function buildProducts(L){
  return {
    ai:{
      name:'FaceLiveAI', tint:'ai', hero:'v1-workspace.svg',
      featImgs:['interface-accounts-branded.svg','interface-config-branded.svg'],
      heroAlt:'Giao diện FaceLiveAI — ghép avatar AI lên webcam và quản lý nhiều tài khoản',
      badge:L('Dành cho người livestream bán hàng trên TikTok & Facebook','For live sellers on TikTok & Facebook'),
      h1:L('Bán hàng livestream, <em>không cần lộ mặt thật</em>','Sell on livestream, <em>without showing your real face</em>'),
      sub:L('Ghép avatar AI lên webcam theo thời gian thực. Quản lý nhiều tài khoản TikTok và Facebook trên cùng một màn hình, mỗi tài khoản một avatar riêng.','Overlay an AI avatar on your webcam in real time. Manage multiple TikTok and Facebook accounts on one screen, each with its own avatar.'),
      note:L('Windows, macOS, Linux · Cần License Key · Cần webcam và GPU phù hợp','Windows, macOS, Linux · License Key required · Requires a webcam and a suitable GPU'),
      pains:[
        L('Ngại lộ mặt khi bán hàng','Uncomfortable showing your face while selling'),
        L('Muốn tách thương hiệu shop khỏi gương mặt cá nhân','Want to keep your shop’s brand separate from your personal face'),
        L('Mỗi kênh một gương mặt, nhưng chỉ có một người vận hành','A different face for each channel, but only one person running them all')
      ],
      steps:[
        ['download',L('Cài đặt và nhập License Key','Install and enter your License Key'),L('Cài app, nhập License Key được cấp. App tự dò và cài môi trường kỹ thuật chạy ngầm, bạn không cần thao tác lập trình.','Install the app and enter the License Key you were given. The app detects and sets up the technical environment in the background — no programming needed.')],
        ['users',L('Thêm tài khoản, tải ảnh avatar','Add accounts, upload avatar photos'),L('Thêm tài khoản TikTok (đăng nhập qua Streamlabs) hoặc Facebook Page (dán Page Access Token), rồi tải lên 1 ảnh avatar cho từng tài khoản.','Add a TikTok account (sign in via Streamlabs) or a Facebook Page (paste a Page Access Token), then upload 1 avatar photo for each account.')],
        ['eye',L('Xem trước hình đã ghép','Preview the composited image'),L('Bấm Bật hình để khởi động ghép avatar, rồi xem trước hình ghép ngay trong app. Chưa có gì được đẩy ra nền tảng thật.','Click Start video to begin the avatar overlay, then preview the composited image right in the app. Nothing is pushed to the real platform yet.')],
        ['live',L('Bật live','Go live'),L('Khi khung hình ghép hợp lệ, nút Bật live mới mở khóa. Bấm để lên sóng thật; nếu mất mạng giữa chừng, app tự kết nối lại.','Only once the composited frame is valid does the Go live button unlock. Click it to go on air for real; if your connection drops, the app reconnects automatically.')]
      ],
      features:[
        ['bolt',L('Face swap thời gian thực','Real-time face swap'),L('Avatar AI thay gương mặt ngay trên luồng webcam, mượt trong lúc bạn nói chuyện và trả lời bình luận.','The AI avatar replaces your face right on the webcam feed, staying smooth while you talk and reply to comments.')],
        ['users',L('Nhiều tài khoản, một màn hình','Many accounts, one screen'),L('Quản lý các tài khoản TikTok và Facebook trong một danh sách, mỗi tài khoản một avatar riêng.','Manage your TikTok and Facebook accounts in one list, each with its own avatar.')],
        ['eye',L('Xem trước trước khi phát thật','Preview before going live'),L('Nút Bật live chỉ mở khóa khi khung hình ghép đã hợp lệ, hình gốc chưa ghép không bị đẩy ra nền tảng.','The Go live button only unlocks once the composited frame is valid, so your original, un-swapped image is never pushed to the platform.')],
        ['settings',L('Tự cài môi trường','Automatic environment setup'),L('App tự dò và cài mọi thứ cần thiết, không cần biết lập trình.','The app detects and installs everything it needs. No programming knowledge required.')],
        ['shield',L('Ổn định khi vận hành','Stable in operation'),L('Tự kết nối lại khi mất mạng. Một tài khoản gặp lỗi không ảnh hưởng các tài khoản khác.','Reconnects automatically when the network drops. An error on one account doesn’t affect the others.')],
        ['help',L('License Key theo máy','Per-machine License Key'),L('Một key cho một máy. App tự đo phần cứng để gợi ý số tài khoản chạy đồng thời.','One key per machine. The app measures your hardware to suggest how many accounts can run at the same time.')]
      ],
      specs:[
        ['os',L('Hệ điều hành','Operating system'),L('Windows 10/11, macOS 12+, hoặc Ubuntu/Debian 22.04+','Windows 10/11, macOS 12+, or Ubuntu/Debian 22.04+')],
        ['gpu',L('GPU','GPU'),L('NVIDIA 4GB VRAM, hoặc chip Apple Silicon','NVIDIA with 4GB VRAM, or Apple Silicon')],
        ['ram',L('RAM','RAM'),L('8GB','8GB')],
        ['cpu',L('CPU','CPU'),L('4 nhân','4 cores')],
        ['disk',L('Ổ đĩa','Storage'),L('Trống 20GB','20GB free')],
        ['device',L('Thiết bị','Device'),L('Webcam','Webcam')]
      ],
      specnote:L('Face swap chạy trực tiếp trên máy của bạn nên cấu hình càng mạnh, càng chạy được nhiều tài khoản cùng lúc.','Face swap runs directly on your computer, so the more powerful your setup, the more accounts you can run at the same time.'),
      faqs:[
        [L('Máy không có GPU NVIDIA thì sao?','What if my computer doesn’t have an NVIDIA GPU?'),L('Face swap chạy trực tiếp trên máy bạn nên cần GPU NVIDIA (từ 4GB VRAM) hoặc chip Apple Silicon. Nếu máy chưa đáp ứng, app sẽ báo rõ để bạn biết trước khi lên sóng.','Face swap runs directly on your computer, so it needs an NVIDIA GPU (4GB VRAM or more) or Apple Silicon. If your computer doesn’t meet this, the app tells you clearly before you go live.')],
        [L('Dùng ảnh avatar thế nào?','How do avatar photos work?'),L('Mỗi tài khoản dùng 1 ảnh .jpg hoặc .png, tối đa 10MB (ảnh người thật hoặc ảnh AI tạo sẵn). Một avatar gắn đúng một tài khoản. Tải ảnh mới sẽ ghi đè từ phiên live kế tiếp.','Each account uses 1 .jpg or .png photo, up to 10MB (a real person or a ready-made AI image). One avatar is tied to exactly one account. A new photo replaces it from the next live session.')],
        [L('TikTok livestream qua đâu?','How does TikTok streaming connect?'),L('TikTok đăng nhập qua tài khoản Streamlabs, app tự lấy token. Facebook thì dán Page Access Token. Khi kết nối thay đổi, bạn có thể nhập RTMP thủ công.','For TikTok, you sign in with Streamlabs and the app fetches the token automatically. For Facebook, you paste a Page Access Token. If the connection changes, you can enter RTMP manually.')],
        [L('Token của tôi được lưu ở đâu?','Where is my token stored?'),L('Token đăng nhập TikTok/Facebook chỉ lưu trên máy của bạn. Phiên bản hiện tại lưu dạng chưa mã hóa, nên hãy dùng trên máy cá nhân đáng tin cậy.','Your TikTok/Facebook sign-in tokens are stored only on your computer. The current version stores them unencrypted, so use the app on a trusted personal computer.')],
        [L('License Key hoạt động ra sao?','How does the License Key work?'),L('Mỗi key dùng cho một máy và do chúng tôi cấp. Để dùng thử, bạn đăng ký qua form, chúng tôi liên hệ xác minh rồi gửi key.','Each key is for one computer and is issued by us. To try the app, sign up through the form; we contact you to verify and then send you a key.')],
        [L('Có cập nhật phiên bản mới không?','Are there new versions?'),L('Có. Bản sửa lỗi phát hành hàng tháng, bản tính năng mới theo quý. Khi nền tảng đổi cách kết nối, chúng tôi vá khẩn cấp.','Yes. Bug-fix releases ship monthly and new-feature releases quarterly. When a platform changes how it connects, we ship an urgent patch.')]
      ],
      dlOs:['win','mac','lin'],
      dlNote:L('Chạy trên Windows, macOS và Linux. Cần License Key để kích hoạt sau khi cài — đăng ký dùng thử để nhận key.','Runs on Windows, macOS and Linux. A License Key is required to activate after installing — sign up for a trial to get one.'),
      dlLead:L('Chạy được trên Windows, macOS và Linux — cùng một bộ tính năng, kể cả Setup Wizard tự động cài đặt cho mọi nền tảng.','Runs on Windows, macOS and Linux — the same feature set, including a Setup Wizard that installs automatically on every platform.'),
      dlOsReq:{win:L('Windows 10/11 · GPU NVIDIA từ 4GB VRAM','Windows 10/11 · NVIDIA GPU with 4GB+ VRAM'),mac:L('macOS 12+ · Máy dùng chip Apple Silicon','macOS 12+ · Apple Silicon Macs'),lin:L('Ubuntu/Debian 22.04+ · GPU NVIDIA từ 4GB VRAM','Ubuntu/Debian 22.04+ · NVIDIA GPU with 4GB+ VRAM')}
    },

    stream:{
      name:'FaceLiveStream', tint:'stream', hero:'v2-workspace.svg',
      featImgs:['interface-obs.png','v2-workspace.svg'],
      heroAlt:'Giao diện FaceLiveStream — dựng MC ảo, playlist điều khiển OBS và AI trả lời bình luận',
      badge:L('Dành cho người bán hàng và agency livestream TikTok, Facebook, Shopee','For sellers and agencies livestreaming on TikTok, Facebook and Shopee'),
      h1:L('Biến kịch bản thành <em>phiên live bán hàng</em>','Turn scripts into <em>live selling sessions</em>'),
      sub:L('AI trọn quy trình: từ dựng MC, phát sóng đến trả lời bình luận. Phát lên TikTok, Facebook, Shopee qua OBS, tối đa 6 kênh cùng lúc.','AI handles the whole process: from building the host and broadcasting to replying to comments. Stream to TikTok, Facebook and Shopee via OBS, on up to 6 channels at once.'),
      note:L('Windows, macOS, Linux · Cần License Key · Cần webcam và GPU phù hợp','Windows, macOS, Linux · License Key required · Requires a webcam and a suitable GPU'),
      pains:[
        L('Không có người live đều đặn','No one available to go live consistently'),
        L('Trả lời bình luận không xuể','Too many comments to keep up with'),
        L('Chuẩn bị nội dung cho nhiều sản phẩm tốn công','Preparing content for many products takes a lot of work')
      ],
      steps:[
        ['monitor',L('Kết nối OBS và tài khoản live','Connect OBS and your live accounts'),L('Bật WebSocket trong OBS, nhập URL và mật khẩu vào app. Khai báo các kênh TikTok, Facebook, Shopee một lần, lúc live chỉ việc tích chọn.','Enable WebSocket in OBS and enter its URL and password in the app. Add your TikTok, Facebook and Shopee channels once; when you go live, just tick the ones you want.')],
        ['file',L('Nạp sản phẩm và kho tri thức','Load products and the knowledge base'),L('Nhập sản phẩm (hoặc Import Excel), thêm tài liệu về chính sách, ship, thông số; đặt tên và tính cách cho MC. Điền API key LLM và Embedding.','Enter products (or Import Excel), add documents on policies, shipping and specs, and give your host a name and personality. Fill in your LLM and Embedding API keys.')],
        ['edit',L('Tạo video MC từ kịch bản','Create host videos from scripts'),L('Chọn video mẫu và giọng đọc, nạp kịch bản CSV/Excel. Có thể tạo cả nhóm video, mỗi sản phẩm một video.','Choose a sample video and a voice, then load a CSV/Excel script. You can create a whole group of videos, one per product.')],
        ['live',L('Bấm live, AI trả lời bình luận','Go live, AI replies to comments'),L('Thêm video vào playlist, chọn tài khoản rồi Bắt đầu live. Bật AI trả lời bình luận, MC trả lời bằng chữ hoặc bằng clip video ngắn.','Add videos to the playlist, choose your accounts and click Start live. Turn on AI comment replies and the host answers in text or with a short video clip.')]
      ],
      features:[
        ['chat',L('AI trả lời bình luận','AI comment replies'),L('AI soạn câu trả lời dựa trên Kho tri thức của shop và Tính cách AI bạn đặt (tên, giọng điệu, chủ đề không được nhắc tới).','AI writes replies based on your shop’s Knowledge base and the AI Personality you set (name, tone, topics it must not mention).')],
        ['edit',L('Kịch bản thành video MC ảo','Scripts into virtual host videos'),L('Nạp kịch bản CSV/Excel, MC ảo đọc bằng giọng nhân bản từ video mẫu.','Load a CSV/Excel script and the virtual host reads it in a voice cloned from the sample video.')],
        ['file',L('Video nhóm theo sản phẩm','Video groups by product'),L('Mỗi sản phẩm một video, ghép từ nhiều phân cảnh toàn cảnh, trung cảnh, cận cảnh.','One video per product, assembled from multiple scenes: wide, medium and close-up shots.')],
        ['monitor',L('Playlist điều khiển OBS','A playlist that controls OBS'),L('Phát lần lượt, ngẫu nhiên, lặp lại, hoặc đặt giờ tự dừng.','Play in order, shuffle, loop, or set a time to stop automatically.')],
        ['play',L('Trả lời bằng clip video','Reply with video clips'),L('MC trả lời bằng clip ngắn, chèn giữa playlist rồi phát tiếp đúng chỗ vừa dừng.','The host answers with a short clip inserted into the playlist, then resumes exactly where it left off.')],
        ['chart',L('Live tối đa 6 kênh','Live on up to 6 channels'),L('Phát cùng lúc nhiều kênh, kèm ghim sản phẩm bằng overlay.','Stream to multiple channels at once, with product pinning via overlay.')]
      ],
      specs:[
        ['os',L('Hệ điều hành','Operating system'),L('Windows 10/11 64-bit','Windows 10/11 64-bit')],
        ['ram',L('RAM','RAM'),L('16GB','16GB')],
        ['gpu',L('GPU','GPU'),L('NVIDIA từ 8GB VRAM','NVIDIA with 8GB VRAM or more')],
        ['disk',L('Ổ đĩa','Storage'),L('Khoảng 4GB cho model, cộng dung lượng video (app luôn chừa 5GB trống)','About 4GB for models, plus space for videos (the app always keeps 5GB free)')],
        ['obs',L('OBS','OBS'),L('OBS Studio bản 28 trở lên','OBS Studio 28 or later')],
        ['api',L('API key','API keys'),L('Cần API key LLM và Embedding (nhà cung cấp tương thích OpenAI)','LLM and Embedding API keys required (OpenAI-compatible provider)')]
      ],
      specnote:L('Nếu máy không có GPU NVIDIA, app vẫn mở được ở chế độ chỉ điều khiển (quản lý dữ liệu, OBS, tài khoản live) nhưng không dựng được MC ảo.','If your computer has no NVIDIA GPU, the app still opens in control-only mode (managing data, OBS and live accounts), but it can’t build the virtual host.'),
      faqs:[
        [L('Cần chuẩn bị API key gì?','What API keys do I need?'),L('Cần API key LLM (để AI soạn câu trả lời) và API key Embedding (để tra cứu Kho tri thức), kèm Base URL và tên model. App gọi thẳng nhà cung cấp bằng key của bạn. Thiếu key LLM thì AI không trả lời, các phần còn lại vẫn dùng bình thường.','You need an LLM API key (so AI can write replies) and an Embedding API key (to search the Knowledge base), with a Base URL and model name. The app calls the provider directly with your key. Without an LLM key, AI won’t reply, but everything else works as usual.')],
        [L('Không có GPU NVIDIA thì sao?','What if I don’t have an NVIDIA GPU?'),L('App vẫn mở ở chế độ chỉ điều khiển, nhưng không dựng được avatar và video MC. Để dựng MC ảo, bạn cần GPU NVIDIA từ 8GB VRAM.','The app still opens in control-only mode, but it can’t build avatars or host videos. To build a virtual host, you need an NVIDIA GPU with 8GB VRAM or more.')],
        [L('AI có trả lời sai không?','Can AI give wrong answers?'),L('AI trả lời dựa trên Kho tri thức và Tính cách AI bạn thiết lập. Nếu kho tri thức thiếu thông tin, câu trả lời sẽ chung chung. Hãy nạp đủ tài liệu về giá, ship, đổi trả, và dùng mục “Chủ đề không được nhắc tới” để tránh nội dung nhạy cảm.','AI answers based on the Knowledge base and AI Personality you set up. If the knowledge base is missing information, answers will be generic. Load enough documents on pricing, shipping and returns, and use “Topics not to mention” to steer clear of sensitive content.')],
        [L('Live nhiều kênh có an toàn không?','Is streaming to multiple channels safe?'),L('TikTok có thể hạn chế tài khoản khi nhiều kênh phát nội dung giống nhau từ cùng một máy. Nên dùng chế độ “Clip riêng từng kênh”, cho mỗi kênh sản phẩm và thứ tự khác nhau. App sẽ nhắc rủi ro và yêu cầu xác nhận trước khi phát.','TikTok may restrict accounts when several channels stream the same content from one computer. Use “Separate clips per channel” mode and give each channel different products and order. The app reminds you of the risks and asks you to confirm before streaming.')],
        [L('Dữ liệu lưu ở đâu?','Where is my data stored?'),L('Video, sản phẩm, kho tri thức và playlist đều lưu trên máy của bạn. Máy chủ của chúng tôi chỉ giữ license, cài đặt và bản cập nhật. Bạn nên tự sao lưu thư mục thư viện định kỳ.','Videos, products, the knowledge base and playlists are all stored on your computer. Our servers only keep your license, settings and updates. You should back up your library folder regularly.')],
        [L('License Key dùng được trên mấy máy?','How many computers can a License Key be used on?'),L('Mỗi key gắn với một máy. Gỡ app rồi cài lại trên cùng máy vẫn dùng tiếp được. Muốn đổi sang máy khác, hãy liên hệ chúng tôi để đặt lại.','Each key is tied to one computer. Uninstalling and reinstalling on the same computer keeps it working. To move to another computer, contact us to reset it.')]
      ],
      dlOs:['win','mac','lin'],
      dlNote:L('Cần License Key để kích hoạt sau khi cài — đăng ký dùng thử để nhận key.','A License Key is required to activate after installing — sign up for a trial to get one.'),
      dlLead:L('Chạy được trên Windows, macOS và Linux — cùng một bộ tính năng, kể cả Setup Wizard tự động cài đặt cho mọi nền tảng.','Runs on Windows, macOS and Linux — the same feature set, including a Setup Wizard that installs automatically on every platform.'),
      dlOsReq:{win:L('Windows 10/11 64-bit · GPU NVIDIA từ 8GB VRAM','Windows 10/11 64-bit · NVIDIA GPU with 8GB+ VRAM'),mac:L('macOS 12+ · Máy dùng chip Apple Silicon','macOS 12+ · Apple Silicon Macs'),lin:L('Ubuntu/Debian 22.04+ · GPU NVIDIA từ 8GB VRAM','Ubuntu/Debian 22.04+ · NVIDIA GPU with 8GB+ VRAM')}
    }
  };
}

// Subscription packages (draft, from the 10-2026 pricing research "Khung gói thuê bao đề xuất")
const PLANS={
  ai:{
    trial:{vi:'Dùng thử 3 ngày miễn phí · 2 tài khoản · 10 giờ-tài khoản',en:'3-day free trial · 2 accounts · 10 account-hours'},
    tiers:[
      {name:'Starter',price:'399.000đ',unit:'≈1.330đ/giờ',accounts:'2',hours:'300',note:{vi:'Dành cho shop nhỏ, mỗi ngày live 5 giờ',en:'For small shops, 5 live hours a day'}},
      {name:'Growth',price:'990.000đ',unit:'≈1.100đ/giờ',accounts:'5',hours:'900',note:{vi:'Mỗi ngày live 6 giờ trên 5 tài khoản',en:'6 live hours a day across 5 accounts'}},
      {name:'Pro',price:'1.990.000đ',unit:'≈830đ/giờ',accounts:'10',hours:'2.400',note:{vi:'Mỗi ngày live 8 giờ trên 10 tài khoản',en:'8 live hours a day across 10 accounts'}}
    ],
    topup:{vi:'Mua thêm giờ: 100 giờ ≈150.000đ · 500 giờ ≈600.000đ',en:'Top-up hours: 100 hours ≈150,000đ · 500 hours ≈600,000đ'}
  },
  stream:{
    trial:{vi:'Dùng thử 3 ngày miễn phí · 2 tài khoản · 20 giờ-tài khoản',en:'3-day free trial · 2 accounts · 20 account-hours'},
    tiers:[
      {name:'Starter',price:'499.000đ',unit:'≈2.500đ/giờ',accounts:'1',hours:'200',note:{vi:'Một tài khoản, khoảng 6,5 giờ live mỗi ngày',en:'One account, about 6.5 live hours a day'}},
      {name:'Growth',price:'1.490.000đ',unit:'≈1.240đ/giờ',accounts:'3',hours:'1.200',note:{vi:'Ba tài khoản, khoảng 40 giờ-tài khoản mỗi ngày',en:'Three accounts, about 40 account-hours a day'}},
      {name:'Pro',price:'2.990.000đ',unit:'≈1.000đ/giờ',accounts:'6',hours:'3.000',note:{vi:'Sáu tài khoản cùng lúc',en:'Six accounts live at once'}}
    ],
    topup:{vi:'Mua thêm giờ: 100 giờ ≈300.000đ · 500 giờ ≈1.250.000đ',en:'Top-up hours: 100 hours ≈300,000đ · 500 hours ≈1,250,000đ'}
  }
};
const planSection=(k,L,headHtml,icon)=>{
  const d=PLANS[k];
  return `<section class="pv-plans section" id="${k}-plans"><div class="container">${headHtml(L,L('LICENSE KEY','LICENSE KEY'),L('Chọn <em>License Key</em> phù hợp','Choose the <em>License Key</em> that fits'),L('Mua key theo gói, tính theo giờ-tài khoản mỗi tháng. Bắt đầu bằng bản dùng thử miễn phí.','Buy a key by plan, priced by account-hours per month. Start with a free trial.'))}<div class="plan-grid">${d.tiers.map((t,i)=>{const hot=i===1;return `<article class="plan-card${hot?' featured':''}"><div class="plan-top">${hot?`<span class="plan-badge">${L('Đề xuất','Suggested')}</span>`:''}</div><h3>${t.name} Key</h3><p class="plan-price"><b>${t.price}</b><span>${L('/tháng','/month')}</span></p><ul class="plan-meta"><li>${icon('check')}<span>${L('Tài khoản live cùng lúc: ','Accounts live at once: ')}<b>${t.accounts}</b></span></li><li>${icon('check')}<span>${L('Giờ/tháng: ','Hours/month: ')}<b>${t.hours}</b></span></li></ul><button class="btn ${hot?'primary':'outline'} plan-btn" type="button" data-plan-cta>${L('Đăng ký dùng thử','Sign up for a trial')}</button></article>`;}).join('')}</div><p class="plan-trial">${L('Dùng thử 3 ngày miễn phí','Free 3-day trial')}</p></div></section>`;
};

export function renderProductViews({L, icon, mark, logo, langSwitch}){
  const P=buildProducts(L);
  const navItem=(k,anchor,vi,en)=>`<a href="#${k}-${anchor}" class="pv-link" data-pv-scroll>${L(vi,en)}</a>`;
  const view=(k)=>{
    const p=P[k];
    const osLabel={win:'Windows',mac:'macOS',lin:'Linux'};
    return `<div class="product-view" id="product-${k}" data-tint="${p.tint}" role="dialog" aria-modal="true" aria-label="${p.name}" hidden>
<header class="pv-header"><div class="container pv-nav"><div class="pv-nav-l">${logo}</div><nav class="pv-links">${navItem(k,'overview','Tổng quan','Overview')}${navItem(k,'how','Cách hoạt động','How it works')}${navItem(k,'features','Tính năng','Features')}${navItem(k,'specs','Cấu hình','Requirements')}${navItem(k,'plans','License Key','License Key')}${navItem(k,'faq','FAQ','FAQ')}</nav><div class="pv-actions">${langSwitch}<button class="btn primary pv-dlbtn" data-open-download="${k}">${icon('download')}${L('Tải phần mềm','Download')}</button></div></div></header>
<div class="pv-scroll">
<section class="pv-hero section" id="${k}-overview"><div class="aurora" aria-hidden="true"><span></span><span></span></div><div class="container pv-hero-grid"><div class="pv-hero-copy"><span class="pv-badge"><i class="dot"></i>${p.badge}</span><h1>${p.h1}</h1><p class="pv-sub">${p.sub}</p><div class="hero-actions"><button class="btn primary" data-open-download="${k}">${icon('download')}${L('Tải phần mềm','Download')}</button>${k==='stream'?`<button class="btn secondary" type="button" data-play-video>${icon('play')}${L('Xem cách hoạt động','See how it works')}</button>`:`<a class="btn secondary" href="#${k}-how" data-pv-scroll>${icon('play')}${L('Xem cách hoạt động','See how it works')}</a>`}</div><p class="pv-note">${icon('shield')}${p.note}</p></div><div class="pv-hero-art"><div class="pv-art-glow"></div>${k==='stream'?`<video class="pv-video" src="qka-relive-huong-dan-v2.mp4" controls playsinline preload="metadata" aria-label="Video hướng dẫn FaceLiveStream"></video>`:`<img src="assets/${p.hero}" alt="${p.heroAlt}" width="1200" height="740" loading="lazy" decoding="async">`}<span class="pv-chip pv-chip-live">${icon('live')}LIVE</span><span class="pv-chip pv-chip-ai">${icon('bot')}${L('AI đang chạy','AI running')}</span></div></div></section>

<section class="pv-pain section" id="${k}-pain"><div class="container">${headHtml(L,L('VẤN ĐỀ','THE CHALLENGE'),L('Thách thức khi livestream bán hàng','Challenges in live selling'),'')}<div class="pain-grid">${p.pains.map((t,i)=>`<article class="pain-card"><span class="pain-num">0${i+1}</span><p>${t}</p></article>`).join('')}</div></div></section>

<section class="pv-how section" id="${k}-how"><div class="container">${headHtml(L,L('CÁCH HOẠT ĐỘNG','HOW IT WORKS'),L('Từ cài đặt đến lên sóng, <em>trong 4 bước</em>','From install to on-air, <em>in 4 steps</em>'),'')}<div class="four-grid steps-grid">${p.steps.map(([ic,t,d],n)=>`<article class="step-card"><span class="step-number">0${n+1}</span><span class="icon-bubble">${icon(ic)}</span><h3>${t}</h3><p>${d}</p>${n<3?`<span class="step-arrow">${icon('arrow')}</span>`:''}</article>`).join('')}</div></div></section>

<section class="pv-features section" id="${k}-features"><div class="container">${headHtml(L,L('TÍNH NĂNG','FEATURES'),L('Mọi thứ bạn cần để <em>lên sóng</em>','Everything you need to <em>go live</em>'),'')}<div class="feat-split"><div class="feat-art"><div class="feat-glow"></div><img class="feat-img-main" src="assets/${p.featImgs[0]}" alt="${p.name} — giao diện phần mềm" loading="lazy" decoding="async"><img class="feat-img-sub" src="assets/${p.featImgs[1]}" alt="${p.name} — màn hình chi tiết" loading="lazy" decoding="async"></div><div class="feature-list feat-list">${p.features.map(([ic,t,d])=>`<div><span class="icon-bubble">${icon(ic)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div></div></div></section>

<section class="pv-specs section" id="${k}-specs"><div class="container">${headHtml(L,L('CẤU HÌNH MÁY','SYSTEM REQUIREMENTS'),L('Cấu hình <em>tối thiểu</em>','<em>Minimum</em> requirements'),L('Deep-Live-Cam xử lý AI ngay trên máy của bạn, nên máy cần đạt mức tối thiểu bên dưới.','Deep-Live-Cam processes AI right on your computer, so it needs to meet the minimum below.'))}<div class="spec-grid">${p.specs.map(([ic,lab,val])=>`<article class="spec-card"><span class="spec-ico">${specSvg(ic)}</span><div><b>${lab}</b><span>${val}</span></div></article>`).join('')}</div></div></section>

<section class="pv-faq faq section" id="${k}-faq"><div class="container">${headHtml(L,L('FAQ','FAQ'),L('Câu hỏi <em>thường gặp</em>','Frequently <em>asked</em>'),'')}<div class="faq-grid">${p.faqs.map(([q,a])=>`<details><summary><span class="question-icon">?</span><span>${q}</span><span class="plus">+</span></summary><div class="answer"><p>${a}</p></div></details>`).join('')}</div></div></section>

${planSection(k,L,headHtml,icon)}<section class="pv-dl section" id="${k}-download"><div class="container"><div class="pv-dl-band"><div><span class="eyebrow"><i class="dot"></i>${L('Sẵn sàng lên sóng?','Ready to go live?')}</span><h2>${L('Tải '+p.name,'Download '+p.name)}</h2><p>${p.dlNote}</p></div><div class="pv-dl-actions"><button class="btn primary" data-open-download="${k}">${icon('download')}${L('Tải phần mềm','Download')}</button><a class="btn ghost" href="#dang-ky" data-close-product>${icon('arrow')}${L('Đăng ký dùng thử','Sign up for a trial')}</a></div><div class="pv-dl-os">${p.dlOs.map(o=>`<span>${icon('check')}${osLabel[o]}</span>`).join('')}</div></div></div></section>

<footer class="pv-footer"><div class="container"><div class="pv-foot-logo">${logo}</div><span>${L('© 2026 Facelive. Mọi nội dung AI đều được gắn nhãn theo quy định của từng nền tảng.','© 2026 Facelive. All AI content is labeled according to each platform’s rules.')}</span><button data-support>${L('Liên hệ','Contact')}</button></div></footer>
</div></div>`;
  };
  return view('ai')+view('stream');
}

// local heading helper (mirrors build.mjs heading but self-contained)
function headHtml(L,pill,title,sub){
  return `<div class="section-head">${pill?`<span class="eyebrow">${pill}</span>`:''}<h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>`;
}

export function renderSignup({L, icon}){
  return `<section class="section signup" id="dang-ky"><div class="container">${headHtml(L,L('ĐĂNG KÝ DÙNG THỬ','SIGN UP FOR A TRIAL'),L('Bắt đầu livestream <em>cùng AI</em>','Start livestreaming <em>with AI</em>'),L('Để lại thông tin, chúng tôi sẽ liên hệ xác minh và gửi License Key dùng thử cho bạn.','Leave your details and we’ll contact you to verify and send a trial License Key.'))}
<div class="signup-grid"><form class="signup-form" novalidate><div class="su-field"><label for="su-name">${L('Họ và tên','Full name')}</label><input id="su-name" name="name" type="text" data-ph-vi="Nhập họ và tên" data-ph-en="Enter your full name" autocomplete="name" required><small class="su-err" data-err="name">${L('Vui lòng nhập họ và tên.','Please enter your full name.')}</small></div>
<div class="su-field"><label for="su-phone">${L('Số điện thoại','Phone number')}</label><input id="su-phone" name="phone" type="tel" data-ph-vi="Nhập số điện thoại" data-ph-en="Enter your phone number" inputmode="tel" autocomplete="tel" required><small class="su-err" data-err="phone">${L('Số điện thoại chưa đúng (số Việt Nam, 9–11 chữ số).','Please enter a valid Vietnamese phone number (9–11 digits).')}</small></div>
<div class="su-field"><label for="su-email">${L('Email','Email')}</label><input id="su-email" name="email" type="email" data-ph-vi="Nhập địa chỉ email" data-ph-en="Enter your email address" autocomplete="email" required><small class="su-err" data-err="email">${L('Email chưa đúng định dạng.','Please enter a valid email address.')}</small></div>
<div class="su-field"><label for="su-product">${L('Sản phẩm quan tâm','Product of interest')}</label><div class="su-select"><select id="su-product" name="product"><option value="ai">FaceLiveAI</option><option value="stream">FaceLiveStream</option><option value="both">${L('Cả hai','Both')}</option></select><span>⌄</span></div></div>
<button type="submit" class="btn primary su-submit">${L('Gửi đăng ký','Submit')}</button>
<div class="su-ok" hidden><span class="su-ok-ico">${icon('check')}</span><b>${L('Đã gửi đăng ký','Registration sent')}</b><p>${L('Cảm ơn bạn. Chúng tôi sẽ liên hệ qua số điện thoại hoặc email để xác minh.','Thank you. We’ll contact you by phone or email to verify.')}</p></div></form></div></div></section>`;
}

// Two separate, product-specific download screens (FaceLiveAI: Win/mac/Linux · FaceLiveStream: Windows only).
export function renderDownloadViews({L, icon, logo, langSwitch}){
  const P=buildProducts(L);
  const reqSub=L('Deep-Live-Cam xử lý AI ngay trên máy của bạn, nên máy cần đạt mức tối thiểu bên dưới.','Deep-Live-Cam processes AI right on your computer, so it needs to meet the minimum below.');
  const foot=L('© 2026 Facelive. Mọi nội dung AI đều được gắn nhãn theo quy định của từng nền tảng.','© 2026 Facelive. All AI content is labeled according to each platform’s rules.');
  const view=(k)=>{
    const p=P[k];
    const multi=p.dlOs.length>1;
    const card=(o)=>`<article class="os-card" data-os="${o}">${multi?`<span class="os-pill">${L('Gợi ý cho máy bạn','Suggested for you')}</span>`:''}<span class="os-icon">${OSICON[o]}</span><h3>${OSNAME[o]}</h3><p class="os-note">${p.dlOsReq[o]}</p>${o==='mac'?`<button class="btn primary os-get" data-get="${k}-mac">${icon('download')}${L('Tải xuống · Apple Silicon','Download · Apple Silicon')}</button><button class="btn ghost os-get" data-get="${k}-mac-intel">${L('Intel','Intel')}</button>`:`<button class="btn primary os-get" data-get="${k}-${o}">${icon('download')}${L('Tải xuống','Download')}</button>`}<small class="os-ver">${L('Bản mới nhất: v1.0.8','Latest: v1.0.8')}</small></article>`;
    return `<div class="download-view product-dl" id="tai-${k}" data-tint="${p.tint}" role="dialog" aria-modal="true" aria-label="Tải ${p.name}" hidden>
<header class="dv-header"><div class="container dv-nav"><div class="dv-nav-l">${logo}</div><div class="dv-actions">${langSwitch}</div></div></header>
<div class="dv-scroll"><div class="container dv-body"><div class="dv-hero"><span class="eyebrow"><i class="dot"></i>${multi?L('Sẵn sàng cho Windows · macOS · Linux','Ready for Windows · macOS · Linux'):L('Dành cho Windows','For Windows')}</span><h1>${L('Tải '+p.name,'Download '+p.name)}</h1><p>${p.dlLead}</p></div>
<div class="os-grid${multi?'':' os-grid-single'}">${p.dlOs.map(card).join('')}</div>
<section class="req-section">${headHtml(L,'',L('Cấu hình máy tối thiểu','Minimum requirements'),reqSub)}<div class="req-wrap"><table class="req-table req-table-2"><thead><tr><th>${L('Thành phần','Component')}</th><th>${L('Yêu cầu tối thiểu','Minimum requirement')}</th></tr></thead><tbody>${p.specs.map(([ic,lab,val])=>`<tr><td class="req-k">${lab}</td><td>${val}</td></tr>`).join('')}</tbody></table></div><p class="req-note">${p.specnote}</p></section></div></div>
<footer class="dv-footer"><div class="container"><div class="dv-foot-logo">${logo}</div><span>${foot}</span><button data-support>${L('Liên hệ','Contact')}</button></div></footer></div>`;
  };
  return view('ai')+view('stream');
}
