(() => {
  'use strict';
  const config = window.FACELIVE_CONFIG || {};
  const modal = document.querySelector('#modal');
  const content = document.querySelector('#modal-content');
  const menu = document.querySelector('#navigation');
  const toggle = document.querySelector('.menu-toggle');
  const duel = document.querySelector('.version-duel');
  if (duel) {
    const touchLayout = matchMedia('(max-width: 700px)');
    const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
    const panels = [...duel.querySelectorAll('.duel-panel')];
    function selectVersion(side) {
      duel.dataset.active = side;
      panels.forEach(panel => {
        const collapsed = side !== 'none' && panel.dataset.side !== side;
        panel.querySelector('.duel-body').inert = collapsed;
        panel.querySelector('.duel-body').setAttribute('aria-hidden', String(collapsed));
        panel.querySelector('.duel-rail').setAttribute('aria-expanded', String(side === panel.dataset.side));
      });
    }
    function resetDuel() { selectVersion(touchLayout.matches ? '1' : 'none'); }
    panels.forEach(panel => {
      panel.addEventListener('pointerenter', () => {
        if (hoverPointer.matches && !touchLayout.matches) selectVersion(panel.dataset.side);
      });
      panel.addEventListener('focusin', () => selectVersion(panel.dataset.side));
      panel.querySelector('.duel-rail').addEventListener('click', () => selectVersion(panel.dataset.side));
    });
    duel.addEventListener('pointerleave', () => {
      if (hoverPointer.matches && !touchLayout.matches && !duel.contains(document.activeElement)) selectVersion('none');
    });
    duel.addEventListener('focusout', () => {
      requestAnimationFrame(() => { if (!duel.contains(document.activeElement) && !duel.matches(':hover')) resetDuel(); });
    });
    duel.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const side = e.key === 'ArrowLeft' ? '1' : '2';
        selectVersion(side);
        duel.querySelector(`[data-select-version="${side}"]`).focus();
      } else if (e.key === 'Escape') resetDuel();
    });
    touchLayout.addEventListener('change', resetDuel);
    resetDuel();
  }
  let lastFocus;
  const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch { return ''; } };
  function closeMenu() { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Mở menu'); }
  toggle.addEventListener('click', () => { const open = menu.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu'); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => { if (!e.target.closest('.nav-wrap')) closeMenu(); });
  window.addEventListener('resize', () => { if (innerWidth > 640) closeMenu(); });
  function showModal(html) {
    if (!modal.open) lastFocus = document.activeElement;
    content.innerHTML = html;
    if (!modal.open) modal.showModal();
    document.body.classList.add('modal-open');
    document.querySelector('.modal-close').focus();
  }
  modal.addEventListener('close', () => { content.querySelector('video')?.pause(); document.body.classList.remove('modal-open'); lastFocus?.focus(); });
  document.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', e => { const r = modal.getBoundingClientRect(); if (e.target === modal && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) modal.close(); });
  function download() {
    const url = safeUrl(config.downloadUrl);
    if (url) { window.location.assign(url); return; }
    showModal('<span class="eyebrow">FACELIVE CHO WINDOWS</span><h2 id="modal-title">Sẵn sàng cho buổi live tiếp theo</h2><p>Phiên bản dành cho Windows 10 / 11 (64-bit).</p><p>Liên kết bộ cài chính thức đang được cập nhật. Bạn có thể tìm hiểu hai phiên bản và cách bắt đầu ngay trên trang.</p><a class="btn primary" href="#phien-ban" data-close-modal>Khám phá phiên bản →</a>');
  }
  const versionDetails = {
    1: ['Live Face Swap AI', 'Dành cho livestream trực tiếp với khuôn mặt tùy chỉnh.', ['Thay đổi khuôn mặt trong thời gian thực bằng AI.', 'Quản lý tài khoản, nguồn webcam và âm thanh.', 'Phù hợp cho người bán hàng và nhà sáng tạo nội dung.']],
    2: ['Live Video AI & Tự động', 'Dành cho phát nội dung video AI và tự động hóa tương tác.', ['Thiết lập playlist video để phát theo nội dung đã chuẩn bị.', 'Hỗ trợ phản hồi bình luận bằng AI.', 'Phù hợp cho thương hiệu và đội ngũ quản lý nhiều kênh.']]
  };
  function version(n) {
    const [title, desc, list] = versionDetails[n];
    showModal(`<span class="eyebrow">FACELIVE · VER ${n}</span><h2 id="modal-title">${title}</h2><p>${desc}</p><ul>${list.map(t=>`<li>${t}</li>`).join('')}</ul><p>Khả năng tương thích và cấu hình máy cần được kiểm tra theo bản phát hành chính thức.</p><button class="btn primary" data-download>Tải Facelive cho Windows</button>`);
  }
  function demo() {
    const url = safeUrl(config.videoUrl);
    if (url) {
      showModal('<span class="eyebrow">KHÁM PHÁ FACELIVE</span><h2 id="modal-title">Giới thiệu Facelive</h2><video controls playsinline preload="metadata"></video>');
      content.querySelector('video').src = url;
      return;
    }
    showModal('<span class="eyebrow">KHÁM PHÁ FACELIVE</span><h2 id="modal-title">Từ ý tưởng đến buổi live</h2><p>Video giới thiệu sẽ được cập nhật. Trước tiên, hãy khám phá quy trình bắt đầu:</p><div class="demo-walkthrough"><div><b>1</b>Tải và cài đặt Facelive trên Windows</div><div><b>2</b>Kết nối tài khoản nền tảng của bạn</div><div><b>3</b>Chuẩn bị hình ảnh, video và nội dung</div><div><b>4</b>Kiểm tra cấu hình và bắt đầu phát sóng</div></div><a class="btn primary" href="#giao-dien" data-close-modal>Khám phá giao diện →</a>');
  }
  function support() {
    const url = safeUrl(config.supportUrl);
    if (url) { window.location.assign(url); return; }
    showModal('<span class="eyebrow">HỖ TRỢ FACELIVE</span><h2 id="modal-title">Cùng bạn bắt đầu</h2><p>Kênh hỗ trợ chính thức đang được cập nhật. Để lại thông tin, chúng tôi sẽ liên hệ và gửi License Key dùng thử cho bạn.</p><a class="btn primary" href="#dang-ky" data-close-modal>Đăng ký dùng thử →</a>');
  }
  document.addEventListener('click', e => {
    if (e.target.closest('[data-download]')) download();
    else if (e.target.closest('[data-demo]')) demo();
    else if (e.target.closest('[data-version]')) version(e.target.closest('[data-version]').dataset.version);
    else if (e.target.closest('[data-support]')) support();
    else if (e.target.closest('[data-policy]')) showModal('<span class="eyebrow">THÔNG TIN SỬ DỤNG</span><h2 id="modal-title">Thông tin về trang giới thiệu</h2><p>Trang này thể hiện thiết kế landing page Facelive từ các mockup được cung cấp. Hình ảnh giao diện là minh họa; tên khách hàng, lời đánh giá và số liệu được giữ theo mockup và chưa xác minh độc lập.</p><p>Trang không có biểu mẫu thu thập dữ liệu, không gửi dữ liệu tới máy chủ ứng dụng và không sử dụng công cụ theo dõi. Font chữ được tải từ Google Fonts khi có kết nối; khi ngoại tuyến sẽ dùng font dự phòng.</p><p>Chính sách quyền riêng tư và điều khoản của phần mềm cần được bổ sung từ đơn vị vận hành trước khi phát hành chính thức.</p>');
    else if (e.target.closest('[data-close-modal]')) modal.close();
  });
  document.querySelectorAll('.faq details').forEach(item => item.addEventListener('toggle', () => {
    if (item.open) document.querySelectorAll('.faq details').forEach(other => { if (other !== item) other.open = false; });
  }));
  const stepsSection=document.querySelector('#cach-hoat-dong');
  if (stepsSection && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    stepsSection.classList.add('has-step-motion');
    const stepsObserver=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting) stepsSection.classList.add('steps-revealed');
        stepsSection.classList.toggle('steps-in-view',entry.isIntersecting);
      });
    },{threshold:.18});
    stepsObserver.observe(stepsSection);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      menu.querySelectorAll('a').forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    }), { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
  }
})();
