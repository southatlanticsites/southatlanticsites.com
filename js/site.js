// South Atlantic Sites — shared page behavior.

// Mobile navigation
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = 'Menu';
    }
  });
})();

// Hero: the closing word changes every 3 seconds.
(function () {
  const el = document.getElementById('rotate');
  if (!el) return;
  const words = Array.from(el.children);
  let i = 0;
  setInterval(() => {
    words[i].classList.remove('on');
    i = (i + 1) % words.length;
    words[i].classList.add('on');
  }, 3000);
})();

// Contact form: posts to the Google Form through a hidden iframe, then shows a confirmation.
(function () {
  const form = document.getElementById('contact-form');
  const sink = document.getElementById('gform-sink');
  if (!form || !sink) return;
  let submitted = false;
  form.addEventListener('submit', () => {
    submitted = true;
    const btn = form.querySelector('button');
    btn.textContent = 'Sending…';
    btn.disabled = true;
  });
  sink.addEventListener('load', () => {
    if (!submitted) return;
    form.innerHTML = '<p class="sent">Thanks. Your message is in. A broker will reply within 24 hours.</p>';
  });
})();

// Subscribe box: submits to MailerLite in the background and confirms in place.
// Without JavaScript the form still posts normally through the hidden iframe.
(function () {
  const form = document.getElementById('subscribe-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    const email = form.querySelector('input[type="email"]');
    btn.disabled = true;
    btn.textContent = 'Adding…';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form) });
      const data = await res.json();
      if (!data.success) throw new Error('rejected');
      form.innerHTML = '<p class="sent">Check your inbox to confirm, and you are on the list.</p>';
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Subscribe';
      email.setCustomValidity('That address was not accepted. Check it and try again.');
      email.reportValidity();
      email.addEventListener('input', () => email.setCustomValidity(''), { once: true });
    }
  });
})();

// Homepage: property cards from js/listings.js, six at a time with arrows.
// Entries with a "featured" number come first in that order; everything else follows in file order.
(function () {
  const grid = document.getElementById('featured');
  if (!grid || typeof LISTINGS === 'undefined') return;

  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const pill = (type) => {
    const t = type.toLowerCase();
    if (t.includes('sale') && t.includes('ground')) return ['pill-sale', 'For sale / ground lease'];
    if (t.includes('sale') && t.includes('lease')) return ['pill-sale', 'For sale / lease'];
    if (t.includes('sale')) return ['pill-sale', 'For sale'];
    if (t.includes('ground')) return ['pill-ground', 'Ground lease'];
    return ['pill-lease', 'For lease'];
  };

  // Show the street address under a building name; just the city when the name is the address.
  const location = (l) => (/^\d/.test(l.name) || /^(NEC|NWC|SEC|SWC|NC-|Hwy|US)/i.test(l.name)) ? l.city : `${l.address}, ${l.city}`;
  const priceLabel = (l) => (/lease/i.test(l.type) && !/sale/i.test(l.type)) ? 'Rent' : 'Price';

  const card = (l) => {
    const [cls, label] = pill(l.type);
    const media = l.img
      ? `<img src="${esc(l.img)}" alt="${esc(l.name)}, ${esc(l.city)}" loading="lazy" style="object-position:50% ${Number(l.crop ?? 21)}%">`
      : '';
    return `
      <a class="card" href="${esc(l.flyer)}" target="_blank" rel="noopener">
        <div class="card-media">${media}<span class="pill ${cls}">${label}</span></div>
        <div class="card-body">
          <h3>${esc(l.name)}</h3>
          <p class="loc">${esc(location(l))}</p>
          <div class="card-meta">
            <div><small>${priceLabel(l)}</small><b>${esc(l.price)}</b></div>
            <div><small>Size</small><b>${esc(l.size)}</b></div>
          </div>
          <p class="card-broker">${esc(l.broker)}</p>
        </div>
      </a>`;
  };

  const ordered = LISTINGS.slice().sort((a, b) => (a.featured || 99) - (b.featured || 99));
  const PAGE = 6;
  const pages = Math.max(1, Math.ceil(ordered.length / PAGE));
  let page = 0;

  const prev = document.getElementById('feat-prev');
  const next = document.getElementById('feat-next');
  const count = document.getElementById('feat-count');

  function render() {
    grid.innerHTML = ordered.slice(page * PAGE, page * PAGE + PAGE).map(card).join('');
    if (prev) prev.disabled = page === 0;
    if (next) next.disabled = page >= pages - 1;
    if (count) count.textContent = `${page + 1} / ${pages}`;
  }
  function go(step) {
    const target = Math.min(pages - 1, Math.max(0, page + step));
    if (target === page) return;
    page = target;
    render();
  }
  if (prev) prev.addEventListener('click', () => go(-1));
  if (next) next.addEventListener('click', () => go(1));
  if (pages <= 1) { const p = document.querySelector('.pager'); if (p) p.hidden = true; }

  // Swipe left or right on the cards to page on touch screens.
  let touchX = null;
  grid.addEventListener('touchstart', (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  grid.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
  }, { passive: true });

  render();

  const n = LISTINGS.length;
  ['stat-count', 'all-count'].forEach((id) => { const e = document.getElementById(id); if (e) e.textContent = n; });
})();
