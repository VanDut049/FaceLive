/* Facelive enhancements: VI/EN switch, in-page download view, OS downloads, reveals. */
(() => {
  'use strict';
  const config = window.FACELIVE_CONFIG || {};
  const root = document.documentElement;
  const toastEl = document.querySelector('.toast');

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('visible'), 2800);
  }

  /* ---------- 1. Language (VI/EN) ---------- */
  const META = {
    vi: {
      title: 'Facelive — Phần mềm livestream AI & quản lý đa nền tảng',
      desc: 'Livestream dễ hơn cùng Facelive. Khám phá Live Face Swap AI, video AI tự động và quản lý tài khoản TikTok, Facebook, Shopee.'
    },
    en: {
      title: 'Facelive — AI Livestream Software & Multi-platform Management',
      desc: 'Livestream more easily with Facelive. Explore Live Face Swap AI, automated AI video and account management for TikTok, Facebook and Shopee.'
    }
  };
  const switches = [...document.querySelectorAll('.lang-switch')];
  const metaDesc = document.querySelector('meta[name="description"]');

  function setLang(lang) {
    if (lang !== 'vi' && lang !== 'en') lang = 'vi';
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.title = META[lang].title;
    if (metaDesc) metaDesc.setAttribute('content', META[lang].desc);
    switches.forEach(sw => {
      const cur = sw.querySelector('.lang-current');
      if (cur) cur.textContent = lang.toUpperCase();
      sw.querySelectorAll('[data-set-lang]').forEach(li =>
        li.setAttribute('aria-selected', String(li.dataset.setLang === lang)));
    });
    document.querySelectorAll('[data-ph-vi]').forEach(el => { el.placeholder = el.dataset[lang === 'en' ? 'phEn' : 'phVi']; });
    try { localStorage.setItem('facelive-lang', lang); } catch {}
  }
  function closeLangMenus() {
    switches.forEach(sw => {
      sw.classList.remove('open');
      sw.querySelector('.lang-btn')?.setAttribute('aria-expanded', 'false');
    });
  }
  switches.forEach(sw => {
    const btn = sw.querySelector('.lang-btn');
    btn?.addEventListener('click', e => {
      e.stopPropagation();
      const willOpen = !sw.classList.contains('open');
      closeLangMenus();
      if (willOpen) { sw.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
    sw.querySelectorAll('[data-set-lang]').forEach(li =>
      li.addEventListener('click', e => { e.stopPropagation(); setLang(li.dataset.setLang); closeLangMenus(); }));
  });
  document.addEventListener('click', e => { if (!e.target.closest('.lang-switch')) closeLangMenus(); });

  let initial = 'vi';
  try { const s = localStorage.getItem('facelive-lang'); if (s) initial = s; } catch {}
  setLang(initial);

  /* ---------- 2. In-page download screens (per product) ---------- */
  function openDownload(key) {
    const dl = document.getElementById('tai-' + key);
    if (!dl) return;
    document.querySelector('#modal')?.close?.();
    dl.hidden = false;
    document.body.classList.add('download-open');
    detectOS(dl);
    dl.querySelector('.dv-scroll')?.scrollTo(0, 0);
    requestAnimationFrame(() => dl.querySelector('.dv-back')?.focus());
  }
  function closeDownload() {
    let any = false;
    document.querySelectorAll('.download-view:not([hidden])').forEach(dl => { dl.hidden = true; any = true; });
    if (any) document.body.classList.remove('download-open');
  }
  // Capture phase so we intercept before script.js's legacy modal.
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open-download]');
    if (opener && !e.target.closest('[data-get]') && !e.target.closest('[data-close-download]')) {
      e.preventDefault();
      e.stopPropagation();
      openDownload(opener.dataset.openDownload || 'ai');
    }
  }, true);
  document.addEventListener('click', e => { if (e.target.closest('[data-close-download]')) closeDownload(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDownload(); });

  /* ---------- 3. OS downloads (per product, e.g. data-get="ai-win", "stream-win") ---------- */
  const safeUrl = v => { try { const u = new URL(v); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } };
  const urlFor = (key, os) => {
    const C = config, cap = os.charAt(0).toUpperCase() + os.slice(1).replace('-i', 'I');
    return C['downloadUrl_' + key + '_' + os] || C['downloadUrl' + cap] || C.downloadUrl || '';
  };
  const updatingMsg = () => root.getAttribute('data-lang') === 'en'
    ? 'Download link is being updated — please check back soon.'
    : 'Liên kết tải đang được cập nhật — vui lòng quay lại sau.';
  document.addEventListener('click', e => {
    const get = e.target.closest('[data-get]');
    if (!get) return;
    const parts = get.dataset.get.split('-');       // ai-win · ai-mac · ai-mac-intel · stream-win
    const key = parts.shift();
    const os = parts.join('-') || 'win';
    const url = safeUrl(urlFor(key, os));
    if (url) window.location.assign(url);
    else toast(updatingMsg());
  });

  /* ---------- 4. OS detection → highlight the viewer's platform (multi-OS screens) ---------- */
  function detectOS(dl) {
    if (!dl) return;
    const ua = (navigator.userAgent + ' ' + (navigator.platform || '')).toLowerCase();
    let os = 'win';
    if (/mac|iphone|ipad|ipod/.test(ua)) os = 'mac';
    else if (/linux|x11|cros/.test(ua) && !/android/.test(ua)) os = 'lin';
    else if (/win/.test(ua)) os = 'win';
    const card = dl.querySelector(`.os-card[data-os="${os}"]`);
    if (!card) return;
    dl.querySelectorAll('.os-card.you').forEach(c => c.classList.remove('you'));
    card.classList.add('you');
  }

  // OS highlight for the in-page download blocks inside each product
  document.querySelectorAll('.product-view').forEach(detectOS);

  /* ---------- 5. Scroll reveal ---------- */
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window) {
    const targets = document.querySelectorAll(
      '.hero-copy > *, .benefit-card, .audience-card, .step-card, .review-card, .stat-card, .feature-list > div, .platform-strip, .version-grid > *, .experience-copy > *, .final-cta, #cau-hoi .section-head, .faq details'
    );
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(t => { t.classList.add('reveal'); io.observe(t); });
  }
})();

/* ---------- Product landing views + sign-up form ---------- */
(() => {
  'use strict';
  const body = document.body;

  function openProduct(key) {
    const pv = document.getElementById('product-' + key);
    if (!pv) return;
    document.querySelector('#modal')?.close?.();
    pv.hidden = false;
    body.classList.add('product-open');
    pv.querySelector('.pv-video')?.play().catch(() => {});
    pv.querySelector('.pv-scroll')?.scrollTo(0, 0);
    requestAnimationFrame(() => pv.querySelector('.pv-back')?.focus());
  }
  function closeProducts() {
    let any = false;
    document.querySelectorAll('.product-view:not([hidden])').forEach(pv => { pv.querySelector('.pv-video')?.pause(); pv.hidden = true; any = true; });
    if (any) body.classList.remove('product-open');
  }
  // capture phase so it beats script.js's legacy [data-version]/[data-download] handlers
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open-product]');
    if (opener) { e.preventDefault(); e.stopPropagation(); openProduct(opener.dataset.openProduct); }
  }, true);
  document.addEventListener('click', e => { if (e.target.closest('[data-close-product]')) closeProducts(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeProducts(); });

  // trial sign-up form (front-end validation; wire a real endpoint later)
  const form = document.querySelector('.signup-form');
  if (form) {
    const digits = v => (v || '').replace(/\D/g, '');
    const fields = {
      name: { test: v => v.trim().length >= 2 },
      phone: { test: v => { const d = digits(v); return d.length >= 9 && d.length <= 11; } },
      email: { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) }
    };
    Object.keys(fields).forEach(k => {
      const el = form.querySelector('#su-' + k);
      fields[k].el = el;
      el.addEventListener('input', () => {
        const wrap = el.closest('.su-field');
        if (wrap.classList.contains('invalid')) wrap.classList.toggle('invalid', !fields[k].test(el.value));
      });
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true, firstBad = null;
      Object.keys(fields).forEach(k => {
        const good = fields[k].test(fields[k].el.value);
        fields[k].el.closest('.su-field').classList.toggle('invalid', !good);
        if (!good && !firstBad) firstBad = fields[k].el;
        ok = ok && good;
      });
      if (!ok) { firstBad?.focus(); return; }
      form.classList.add('sent');
    });
  }
})();

/* ---------- Contact buttons → sign-up form on the home page ---------- */
document.addEventListener('click', e => {
  if (!e.target.closest('[data-support],[data-plan-cta]')) return;
  e.preventDefault();
  e.stopImmediatePropagation();
  document.querySelectorAll('.product-view:not([hidden]), .download-view:not([hidden])').forEach(o => { o.querySelector('.pv-video')?.pause(); o.hidden = true; });
  document.body.classList.remove('product-open', 'download-open');
  const signup = document.getElementById('dang-ky');
  if (signup) {
    const head = signup.querySelector('.section-head') || signup;
    window.scrollTo({ top: head.getBoundingClientRect().top + scrollY - (document.querySelector('.header')?.offsetHeight || 88) - 16, behavior: 'smooth' });
  }
}, true);

/* ---------- "Xem cách hoạt động" on FaceLiveStream → scroll to and play the hero video ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-play-video]');
  if (!b) return;
  const v = b.closest('.product-view')?.querySelector('.pv-video');
  if (!v) return;
  v.scrollIntoView({ behavior: 'smooth', block: 'center' });
  // fullscreen needs the click's user gesture, so request it right here
  const fs = v.requestFullscreen ? v.requestFullscreen() : (v.webkitEnterFullscreen && v.webkitEnterFullscreen());
  if (fs && fs.catch) fs.catch(() => {});
  v.play().catch(() => {});
});

/* ---------- Review slider buttons ---------- */
document.addEventListener('click', e => {
  const b = e.target.closest('[data-review-prev],[data-review-next]');
  if (!b) return;
  const grid = document.querySelector('.review-grid');
  if (!grid) return;
  const step = (grid.querySelector('.review-card')?.offsetWidth || 320) + 20;
  grid.scrollBy({ left: b.hasAttribute('data-review-next') ? step : -step, behavior: 'smooth' });
});

/* ---------- In-page links land on the section heading, just under the sticky header ---------- */
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.hasAttribute('data-close-download')) return;
  const id = a.getAttribute('href').slice(1);
  const target = id && document.getElementById(id);
  if (!target || !target.classList.contains('section')) return;
  e.preventDefault();
  const fromPv = a.closest('.product-view');
  const inPv = target.closest('.product-view');
  if (fromPv && !inPv) {                      // leaving a product page for a main-page section
    fromPv.querySelector('.pv-video')?.pause();
    fromPv.hidden = true;
    document.body.classList.remove('product-open');
  }
  const head = target.querySelector('.section-head') || target;
  if (inPv) {
    const box = inPv.querySelector('.pv-scroll');
    const bar = inPv.querySelector('.pv-header');
    box.scrollTo({ top: head.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop - (bar?.offsetHeight || 0) - 16, behavior: 'smooth' });
  } else {
    const bar = document.querySelector('.header');
    window.scrollTo({ top: head.getBoundingClientRect().top + scrollY - (bar?.offsetHeight || 88) - 16, behavior: 'smooth' });
  }
});

/* ---------- Logo = home: clicking the logo inside any overlay closes it ---------- */
(() => {
  'use strict';
  document.addEventListener('click', e => {
    const lg = e.target.closest('.product-view .logo, .download-view .logo');
    if (!lg) return;
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll('.product-view:not([hidden]), .download-view:not([hidden])').forEach(o => { o.querySelector('.pv-video')?.pause(); o.hidden = true; });
    document.body.classList.remove('product-open', 'download-open');
    window.scrollTo(0, 0);
  }, true);
})();

/* ---------- Reviews: dot pagination + auto-slide (pauses on hover / touch / focus) ---------- */
(() => {
  const grid = document.querySelector('.review-grid');
  const dotsEl = document.querySelector('.review-dots');
  if (!grid) return;
  const cards = [...grid.querySelectorAll('.review-card')];
  const posOf = c => c.getBoundingClientRect().left - grid.getBoundingClientRect().left + grid.scrollLeft;
  const dots = cards.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Đánh giá ${i + 1}`);
    b.addEventListener('click', () => grid.scrollTo({ left: posOf(cards[i]), behavior: 'smooth' }));
    dotsEl?.appendChild(b);
    return b;
  });
  const syncDots = () => {
    let best = 0, bestDist = Infinity;
    cards.forEach((c, i) => { const d = Math.abs(posOf(c) - grid.scrollLeft); if (d < bestDist) { bestDist = d; best = i; } });
    dots.forEach((d, i) => d.classList.toggle('active', i === best));
  };
  grid.addEventListener('scroll', syncDots, { passive: true });
  syncDots();

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let paused = false;
  const pause = () => { paused = true; };
  const resume = () => { paused = false; };
  grid.addEventListener('pointerenter', pause);
  grid.addEventListener('pointerleave', resume);
  grid.addEventListener('focusin', pause);
  grid.addEventListener('focusout', resume);
  grid.addEventListener('touchstart', pause, { passive: true });
  grid.addEventListener('touchend', () => setTimeout(resume, 3000), { passive: true });
  setInterval(() => {
    if (paused || document.hidden) return;
    const atEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
    const next = cards.find(c => posOf(c) > grid.scrollLeft + 4);
    grid.scrollTo({ left: atEnd || !next ? 0 : posOf(next), behavior: 'smooth' });
  }, 4000);
})();
