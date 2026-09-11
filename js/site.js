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

// Homepage: featured property cards from js/listings.js (entries with "featured": true).
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

  const featured = LISTINGS.filter((l) => l.featured).slice(0, 6);
  grid.innerHTML = featured.map((l) => {
    const [cls, label] = pill(l.type);
    return `
      <a class="card" href="${esc(l.flyer)}" target="_blank" rel="noopener">
        <div class="card-media">
          <img src="${esc(l.img)}" alt="${esc(l.name)}, ${esc(l.city)}" loading="lazy" style="object-position:50% ${Number(l.crop ?? 21)}%">
          <span class="pill ${cls}">${label}</span>
        </div>
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
  }).join('');

  const n = LISTINGS.length;
  ['stat-count', 'all-count'].forEach((id) => { const e = document.getElementById(id); if (e) e.textContent = n; });
})();
