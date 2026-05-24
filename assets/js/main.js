/* FlipIt Digital — Site Scripts */

(function () {
  // Mark active nav link based on path
  const path = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.getAttribute('data-nav') === path) a.classList.add('active');
  });

  // Mobile menu toggle
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      const expanded = menu.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') menu.classList.remove('open');
    });
  }

  // Reveal-on-scroll
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  // Update copyright year
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // FAQ accordion: close others (optional)
  document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        document.querySelectorAll('.faq-item[open]').forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  // Browse filter (very light demo)
  const productList = document.getElementById('product-list');
  if (productList) {
    const cards = Array.from(productList.querySelectorAll('.product-card'));
    const search = document.getElementById('search');
    const filterLinks = document.querySelectorAll('[data-filter-cat]');
    const sortSelect = document.getElementById('sort');
    let activeCat = 'all';

    function apply() {
      const q = (search?.value || '').toLowerCase().trim();
      cards.forEach((c) => {
        const cat = c.dataset.cat || '';
        const title = (c.dataset.title || '').toLowerCase();
        const tags = (c.dataset.tags || '').toLowerCase();
        const matchCat = activeCat === 'all' || cat === activeCat;
        const matchSearch = !q || title.includes(q) || tags.includes(q);
        c.style.display = matchCat && matchSearch ? '' : 'none';
      });

      // sort
      const mode = sortSelect?.value || 'featured';
      const sorted = cards.slice().sort((a, b) => {
        if (mode === 'price-asc') return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        if (mode === 'price-desc') return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        if (mode === 'rating') return parseFloat(b.dataset.rating) - parseFloat(a.dataset.rating);
        return 0;
      });
      sorted.forEach((c) => productList.appendChild(c));
    }

    filterLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        filterLinks.forEach((l) => l.classList.remove('active'));
        link.classList.add('active');
        activeCat = link.dataset.filterCat;
        apply();
      });
    });
    if (search) search.addEventListener('input', apply);
    if (sortSelect) sortSelect.addEventListener('change', apply);
  }

  // Bar chart auto-grow on view
  document.querySelectorAll('.bar').forEach((bar, i) => {
    const target = bar.dataset.h || (40 + Math.random() * 60);
    bar.style.height = '0%';
    setTimeout(() => { bar.style.height = `${target}%`; }, 200 + i * 60);
  });
})();
