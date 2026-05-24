/* FlipIt Digital — Site Scripts */

(function () {
  // ============== Animated Background ==============
  // Auroras + stars + rising particles + meteors + pulsing rings + themed icons + scanning beam.
  // Subtle mouse parallax shifts the whole canvas. Honors prefers-reduced-motion.
  const ICONS = {
    shield:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/></svg>',
    lock:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',
    coin:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M9 9h5a2 2 0 0 1 0 4h-4a2 2 0 0 0 0 4h6M12 6v3M12 16v2"/></svg>',
    bolt:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-linejoin="round"/></svg>',
    gift:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="8" width="18" height="13" rx="2"/><path d="M3 12h18M12 8v13M12 8c-2-3-7-3-7 0s3 0 7 0zm0 0c2-3 7-3 7 0s-3 0-7 0z"/></svg>',
    diamond:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 3h12l4 6-10 12L2 9z" stroke-linejoin="round"/><path d="M6 3l3 6m6-6-3 6m-6 0h12"/></svg>',
    star:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-7.5L2 10h7l3-7z" stroke-linejoin="round"/></svg>',
    chart:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 3v18h18M7 14l4-4 4 4 5-5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  function injectBackground() {
    if (document.querySelector('.bg-canvas')) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.createElement('div');
    canvas.className = 'bg-canvas';
    canvas.setAttribute('aria-hidden', 'true');

    // Aurora orbs (5)
    for (let i = 1; i <= 5; i++) {
      const o = document.createElement('div');
      o.className = `aurora aurora-${i}`;
      canvas.appendChild(o);
    }

    if (!reduce) {
      // Pulsing rings (5)
      const rings = document.createElement('div');
      rings.className = 'stars';
      for (let i = 1; i <= 5; i++) {
        const r = document.createElement('span');
        r.className = `ring ring-${i}`;
        rings.appendChild(r);
      }
      canvas.appendChild(rings);

      // Star field
      const stars = document.createElement('div');
      stars.className = 'stars';
      const starColors = ['', '', '', 'cyan', 'violet', 'green'];
      for (let i = 0; i < 80; i++) {
        const s = document.createElement('span');
        const color = starColors[Math.floor(Math.random() * starColors.length)];
        const big = Math.random() > 0.85 ? ' big' : '';
        s.className = `star ${color}${big}`.trim();
        s.style.left = `${Math.random() * 100}%`;
        s.style.top = `${Math.random() * 100}%`;
        s.style.setProperty('--dur', `${3 + Math.random() * 6}s`);
        s.style.setProperty('--delay', `${Math.random() * 6}s`);
        stars.appendChild(s);
      }
      canvas.appendChild(stars);

      // Shooting stars / meteors
      const meteors = document.createElement('div');
      meteors.className = 'stars';
      const meteorColors = ['', 'violet', 'green'];
      for (let i = 0; i < 4; i++) {
        const m = document.createElement('span');
        m.className = `meteor ${meteorColors[i % meteorColors.length]}`.trim();
        m.style.setProperty('--top', `${5 + Math.random() * 60}%`);
        m.style.setProperty('--dur', `${1.8 + Math.random() * 1.6}s`);
        m.style.setProperty('--delay', `${i * 6 + Math.random() * 8}s`);
        meteors.appendChild(m);
      }
      canvas.appendChild(meteors);

      // Rising particles
      const particles = document.createElement('div');
      particles.className = 'stars';
      const particleColors = ['', 'cyan', 'green'];
      for (let i = 0; i < 16; i++) {
        const p = document.createElement('span');
        p.className = `particle ${particleColors[i % particleColors.length]}`.trim();
        p.style.left = `${Math.random() * 100}%`;
        p.style.setProperty('--dur', `${14 + Math.random() * 18}s`);
        p.style.setProperty('--delay', `${Math.random() * 20}s`);
        p.style.setProperty('--drift', `${(Math.random() - 0.5) * 200}px`);
        particles.appendChild(p);
      }
      canvas.appendChild(particles);

      // Floating themed icons
      const icons = document.createElement('div');
      icons.className = 'stars';
      const iconNames = ['shield', 'lock', 'coin', 'bolt', 'gift', 'diamond', 'star', 'chart'];
      const iconTints = ['', 'cyan', 'green', 'amber'];
      iconNames.forEach((name, i) => {
        const ic = document.createElement('span');
        ic.className = `f-icon ${iconTints[i % iconTints.length]}`.trim();
        ic.style.left = `${5 + (i * 12) + Math.random() * 6}%`;
        ic.style.setProperty('--dur', `${22 + Math.random() * 14}s`);
        ic.style.setProperty('--delay', `${Math.random() * 25}s`);
        ic.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
        ic.style.setProperty('--rot', `${(Math.random() - 0.5) * 720}deg`);
        ic.style.width = `${22 + Math.random() * 16}px`;
        ic.style.height = ic.style.width;
        ic.innerHTML = ICONS[name];
        icons.appendChild(ic);
      });
      canvas.appendChild(icons);

      // Scanning light beam
      const beam = document.createElement('div');
      beam.className = 'beam';
      canvas.appendChild(beam);
    }

    document.body.prepend(canvas);

    // Subtle mouse parallax — nudges the whole canvas based on cursor position
    if (!reduce && window.matchMedia('(pointer: fine)').matches) {
      let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
      const STRENGTH = 12;
      window.addEventListener('mousemove', (e) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * STRENGTH * 2;
        targetY = (e.clientY / window.innerHeight - 0.5) * STRENGTH * 2;
      }, { passive: true });
      function loop() {
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;
        canvas.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }
  }
  injectBackground();

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

  // ====================================================================
  // CHAT — Multi-conversation widget (bot + buyer/seller chats)
  // ====================================================================
  // - Bot conversation: AI assistant on every page, handles FAQ/support
  // - Seller conversations: real cross-tab buyer<->seller chat (storage events)
  // - Inbox view: lists every conversation with avatar/preview/unread badge
  // - Auto-route: product page opens that seller, other pages open bot

  // -------- Conversation registry (peer + order seed data) --------
  const CONVS = {
    bot: {
      id: 'bot',
      type: 'bot',
      peer: {
        name: 'FlipIt Assistant',
        initials: 'FA',
        sub: 'AI support · usually replies instantly',
        verified: true,
        avatarBg: 'linear-gradient(135deg, var(--cyan), var(--emerald))',
        avatarFg: '#001a14',
        botEmoji: ''
      },
      order: null,
      seed: [
        { from: 'them', text: "Hi! I'm the FlipIt AI Assistant. Ask me about **escrow**, **KYC**, **fees**, **disputes**, **refunds**, or how to **list an asset** — anything across the platform.", offset: 1000 * 60 * 12 },
        { from: 'them', text: "Try one of the quick replies below to get started.", offset: 1000 * 60 * 11 }
      ]
    },
    'seller-pixelstore-adobe-cc': {
      id: 'seller-pixelstore-adobe-cc',
      type: 'seller',
      peer: {
        name: 'PixelStore',
        initials: 'PS',
        sub: 'Power Seller · ★ 4.9 · 8,420 sales',
        verified: true,
        avatarBg: 'linear-gradient(135deg, var(--emerald), var(--cyan))',
        avatarFg: '#001a14'
      },
      order: { listing: 'Adobe Creative Cloud · 1 Year', price: '$129', img: 'A', bg: 'linear-gradient(135deg, #FF1F36, #B70010)', status: 'In Escrow · Awaiting Delivery', orderId: 'FD-49281' },
      seed: [
        { from: 'them', text: "Hey! 👋 Saw you on the Adobe CC listing. The asset is fully verified through FlipIt — happy to answer anything before you grab it.", offset: 1000 * 60 * 8 },
        { from: 'them', text: "It's the 1-year All Apps plan, activated to your Adobe ID, delivered through escrow within 30 minutes of payment.", offset: 1000 * 60 * 7 }
      ]
    },
    'seller-domainking-startupbase': {
      id: 'seller-domainking-startupbase',
      type: 'seller',
      peer: {
        name: 'DomainKing',
        initials: 'DK',
        sub: 'Top 1% Seller · ★ 5.0 · 2,140 sales',
        verified: true,
        avatarBg: 'linear-gradient(135deg, #f6c33b, #ff7a18)',
        avatarFg: '#2a1700'
      },
      order: { listing: 'startupbase.io · Premium Domain', price: '$8,500', img: 'S', bg: 'linear-gradient(135deg, #6c5ce7, #00f5d4)', status: 'In Escrow · Pending Transfer', orderId: 'FD-49102' },
      seed: [
        { from: 'them', text: "Domain is held with Namecheap and ready to transfer the moment escrow releases. EPP code prepared.", offset: 1000 * 60 * 60 * 5 },
        { from: 'me',   text: "Sounds good. Could you confirm there are no outstanding renewal fees?", offset: 1000 * 60 * 60 * 4 },
        { from: 'them', text: "Confirmed — paid through 2027. Sending the screenshot now.", offset: 1000 * 60 * 60 * 4 - 1000 * 60 * 5 }
      ]
    },
    'seller-codecraft-saas': {
      id: 'seller-codecraft-saas',
      type: 'seller',
      peer: {
        name: 'CodeCraft Studio',
        initials: 'CC',
        sub: 'Verified Seller · ★ 4.8 · 312 sales',
        verified: true,
        avatarBg: 'linear-gradient(135deg, #6c5ce7, #ff2d6f)',
        avatarFg: '#fff'
      },
      order: { listing: 'TaskFlow SaaS · MRR Bundle', price: '$24,800', img: 'T', bg: 'linear-gradient(135deg, #14d68f, #00f5d4)', status: 'Disputed · Mediation Open', orderId: 'FD-48720' },
      seed: [
        { from: 'them', text: "We have all the source code, customer DB export, and Stripe migration ready as agreed.", offset: 1000 * 60 * 60 * 24 * 2 },
        { from: 'me',   text: "Mediator just joined. Let's keep things in here so we have a record.", offset: 1000 * 60 * 60 * 24 * 2 - 1000 * 60 * 30 }
      ]
    }
  };

  // -------- Page-aware default conversation --------
  function detectDefaultConv() {
    const path = location.pathname.toLowerCase();
    if (path.includes('product')) return 'seller-pixelstore-adobe-cc';
    return 'bot';
  }

  // -------- Role detection (only meaningful for seller chats) --------
  function detectRole() {
    const url = new URL(location.href);
    const as = url.searchParams.get('as');
    if (as === 'seller' || as === 'buyer') return as;
    if (location.pathname.includes('dashboard')) return 'seller';
    return 'buyer';
  }
  const ROLE = detectRole();

  // -------- Constants --------
  const STATE_KEY    = 'flipit_conversations_v5';
  const ACTIVE_KEY   = 'flipit_active_v5';
  const PRESENCE_KEY = 'flipit_presence_v5';
  const TYPING_KEY   = 'flipit_typing_v5';

  // One-time cleanup of old chat keys from prior versions
  try {
    Object.keys(localStorage).forEach(k => {
      if (/^flipit_(chat|presence|typing|read|active)_v[1-4](_|$)/.test(k)) localStorage.removeItem(k);
    });
  } catch (e) {}

  const EMOJIS = ['😀','😅','😂','🤣','😊','😍','🤩','😎','🤔','😴','🥳','😬','🙏','🙌','👍','👎','❤️','🔥','✨','💯','🚀','💸','✅','❌','🎉','💪','👏','😱','🤝','💡','💎','🎁','🛡️','🔒','📦','⚡'];
  const QUICK_REACTIONS = ['❤️','👍','🔥','😂','🎉','🙏'];

  // -------- Bot brain (FlipIt support assistant) --------
  const BOT_RULES = [
    {
      match: /(escrow|how.*safe|hold.*funds|fund.*hold|protect)/i,
      reply: () => "**Escrow** holds the buyer's funds while the seller delivers. Money only releases when *both* sides confirm the transfer is complete. If anything goes wrong, you can open a **dispute** within 14 days and FlipIt's mediation team takes over.",
      quick: ['How long does delivery take?', 'What if the seller never delivers?']
    },
    {
      match: /(kyc|identity|verif|id check|document)/i,
      reply: () => "Every seller goes through **KYC verification** — government ID + liveness check. High-volume sellers also do business verification. You'll see a cyan ✓ badge next to verified accounts. KYC typically completes in **under 4 minutes**.",
      quick: ['What docs do I need?', 'Is KYC required to buy?']
    },
    {
      match: /(fee|cost|charge|commission|how much.*you take|pricing)/i,
      reply: () => "FlipIt's fee is **3.5% of the sale price**, deducted from the seller. Buyers pay no platform fee. Stripe/PayPal processing is included. Premium sellers (over $50k volume) drop to **2.9%**.\n\nSee the full breakdown on the [Pricing page](pricing.html).",
      quick: ['Are there hidden fees?', 'Do I pay tax?']
    },
    {
      match: /(dispute|refund|cancel|problem|issue|fraud|scam)/i,
      reply: () => "Sorry to hear that. Open a **dispute** from your dashboard and a mediator joins within **24 hours**. Funds stay in escrow throughout. ~92% of disputes resolve within 48 hours, and the buyer is fully refunded if the seller can't prove delivery.",
      quick: ['Open a dispute', 'Talk to a human']
    },
    {
      match: /(list|sell|how.*sell|sell my|put up|create listing)/i,
      reply: () => "Selling on FlipIt is free to start:\n\n1. Click **Sell** in the nav\n2. Pick a category (Software, Domain, SaaS, Creator, etc.)\n3. Describe the asset, upload proof of ownership\n4. Set your price\n\nListings go live after a quick review (~2 hours). You only pay the 3.5% fee when something sells.",
      quick: ['Take me to Sell page', 'What can I sell?']
    },
    {
      match: /(deliver|delivery|how long|when.*get|receive)/i,
      reply: () => "Most digital assets deliver in **under 30 minutes**. Domains and SaaS transfers can take 24-72 hours depending on the registrar/provider. The seller has up to **7 days** to deliver, otherwise escrow auto-refunds.",
      quick: ['Track my order', 'Contact the seller']
    },
    {
      match: /(account|login|password|sign in|forgot|reset)/i,
      reply: () => "For account help: try **password reset** from the Login page, check your email for the link, and make sure 2FA isn't blocking you. Still stuck? I can hand you off to a human agent.",
      quick: ['Reset my password', 'Talk to a human']
    },
    {
      match: /(category|categor|what can.*buy|what.*sell)/i,
      reply: () => "FlipIt supports:\n\n- **Software licenses** (Adobe, Office, JetBrains, etc.)\n- **Domains** (premium, expired, exact match)\n- **SaaS businesses** (with MRR, code, customers)\n- **Creator assets** (newsletters, YouTube, IG)\n- **Code & templates** (themes, components, snippets)\n- **Digital art & 3D assets**",
      quick: ['Browse software', 'Browse SaaS']
    },
    {
      match: /(human|agent|person|real|live|support|help)/i,
      reply: () => "I'll loop in a human agent. Average wait time is **3 minutes**. While you wait, what's the order ID or listing you need help with?",
      quick: ['Skip — keep chatting', 'Open a ticket']
    },
    {
      match: /(thank|thanks|thx|cheers|appreciate)/i,
      reply: () => "You're welcome! 🙌 Anything else I can help with?",
      quick: ['How escrow works', 'Browse listings']
    },
    {
      match: /^\s*(hi|hey|hello|yo|sup|gm|gn|good (morning|evening|afternoon))/i,
      reply: () => "Hey there! 👋 Welcome to FlipIt. What can I help you with today?",
      quick: ['How escrow works', 'How to sell', 'See pricing']
    }
  ];
  const BOT_FALLBACK = [
    "Got it — could you tell me a bit more so I can point you to the right answer?",
    "Hmm, I'm not 100% sure I caught that. Want me to connect you with a human agent?",
    "Let me know which part you'd like to dig into — escrow, KYC, fees, listings, or something else?"
  ];
  const BOT_DEFAULT_QUICK = ['How escrow works', 'KYC verification', 'Pricing', 'Open a dispute', 'How to sell'];

  function botPickReply(text) {
    const t = (text || '').toLowerCase();
    for (const rule of BOT_RULES) {
      if (rule.match.test(t)) return { text: rule.reply(), quick: rule.quick || [] };
    }
    return { text: BOT_FALLBACK[Math.floor(Math.random() * BOT_FALLBACK.length)], quick: BOT_DEFAULT_QUICK };
  }

  // -------- Storage --------
  function loadAll() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return seedAll();
  }
  function seedAll() {
    const now = Date.now();
    const all = {};
    Object.values(CONVS).forEach(c => {
      const msgs = (c.seed || []).map((s, i) => ({
        id: 'seed-' + c.id + '-' + i,
        from: s.from === 'me' ? 'buyer' : (c.type === 'bot' ? 'them' : 'seller'),
        kind: 'text',
        text: s.text,
        ts: now - (s.offset || 0),
        reactions: {},
        status: 'read'
      }));
      all[c.id] = { messages: msgs, lastUpdated: now - (c.seed?.[0]?.offset || 0), unread: 0, lastQuick: null };
    });
    return all;
  }
  function saveAll(all) {
    try { localStorage.setItem(STATE_KEY, JSON.stringify(all)); } catch (e) {}
  }
  function getActiveId() {
    return localStorage.getItem(ACTIVE_KEY) || detectDefaultConv();
  }
  function setActiveId(id) {
    try { localStorage.setItem(ACTIVE_KEY, id || ''); } catch (e) {}
  }

  let allConvs = loadAll();
  let activeId = null; // null = inbox view
  let pendingAttachments = [];
  let replyingTo = null;
  let searchQuery = '';
  let unreadInThis = 0;
  let recording = false;
  let recStart = 0;
  let recInterval = null;
  let typingTimer = null;

  // For seller chats: who am I in the conversation
  function meRoleFor(conv) {
    if (conv.type === 'bot') return 'buyer'; // user is always buyer when chatting bot
    return ROLE === 'seller' ? 'seller' : 'buyer';
  }
  function peerRoleFor(conv) {
    if (conv.type === 'bot') return 'them';
    return ROLE === 'seller' ? 'buyer' : 'seller';
  }

  function uid() { return 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function esc(s) { const d = document.createElement('div'); d.textContent = s == null ? '' : String(s); return d.innerHTML; }
  function fmtTime(ts) { return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  function fmtBytes(n) {
    if (n < 1024) return n + ' B';
    if (n < 1048576) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  }
  function fmtRelative(ts) {
    const d = Date.now() - ts;
    if (d < 60000) return 'now';
    if (d < 3600000) return Math.floor(d / 60000) + 'm';
    if (d < 86400000) return Math.floor(d / 3600000) + 'h';
    if (d < 604800000) return Math.floor(d / 86400000) + 'd';
    return new Date(ts).toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
  function markup(s) {
    let t = esc(s);
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    t = t.replace(/(?<!["'>])(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    t = t.replace(/\n/g, '<br/>');
    return t;
  }

  // -------- Presence + typing (only for seller chats, scoped per-conv) --------
  function setPresence() {
    try {
      const data = JSON.parse(localStorage.getItem(PRESENCE_KEY) || '{}');
      Object.values(CONVS).forEach(c => {
        if (c.type === 'seller') {
          if (!data[c.id]) data[c.id] = {};
          data[c.id][ROLE] = Date.now();
        }
      });
      localStorage.setItem(PRESENCE_KEY, JSON.stringify(data));
    } catch (e) {}
  }
  function isPeerOnline(convId) {
    const c = CONVS[convId];
    if (!c || c.type !== 'seller') return false;
    try {
      const data = JSON.parse(localStorage.getItem(PRESENCE_KEY) || '{}');
      const peerRole = ROLE === 'buyer' ? 'seller' : 'buyer';
      const last = data[convId]?.[peerRole];
      return last && (Date.now() - last < 12000);
    } catch (e) { return false; }
  }
  setInterval(setPresence, 4000);
  setPresence();

  function setTyping(convId, on) {
    const c = CONVS[convId];
    if (!c || c.type !== 'seller') return;
    try {
      const data = JSON.parse(localStorage.getItem(TYPING_KEY) || '{}');
      if (!data[convId]) data[convId] = {};
      if (on) data[convId][ROLE] = Date.now();
      else delete data[convId][ROLE];
      localStorage.setItem(TYPING_KEY, JSON.stringify(data));
    } catch (e) {}
  }
  function isPeerTyping(convId) {
    const c = CONVS[convId];
    if (!c) return false;
    if (c.type === 'bot') return botTyping;
    try {
      const data = JSON.parse(localStorage.getItem(TYPING_KEY) || '{}');
      const peerRole = ROLE === 'buyer' ? 'seller' : 'buyer';
      const last = data[convId]?.[peerRole];
      return last && (Date.now() - last < 4000);
    } catch (e) { return false; }
  }
  let botTyping = false;

  // -------- Audio ping --------
  let audioCtx;
  function playPing() {
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.connect(g); g.connect(audioCtx.destination);
      o.type = 'sine';
      o.frequency.setValueAtTime(880, audioCtx.currentTime);
      o.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.08);
      g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.35);
      o.start();
      o.stop(audioCtx.currentTime + 0.4);
    } catch (e) {}
  }

  // ========== UI BUILDER ==========
  function buildUI() {
    const fab = document.createElement('button');
    fab.className = 'chat-fab';
    fab.setAttribute('aria-label', 'Open chat');
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-7.6-4.7L3 21l1.7-3.4A8.5 8.5 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z"/></svg><span class="badge-dot">0</span>';

    const panel = document.createElement('div');
    panel.className = 'chat-panel';
    panel.setAttribute('role', 'dialog');
    panel.innerHTML = `
      <!-- INBOX VIEW -->
      <div class="chat-view chat-inbox" data-view="inbox">
        <div class="chat-head inbox-head">
          <div class="inbox-title">
            <div class="inbox-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-7.6-4.7L3 21l1.7-3.4A8.5 8.5 0 0 1 12 3a8.38 8.38 0 0 1 9 8.5z"/></svg>
            </div>
            <div>
              <div class="name">Messages</div>
              <div class="sub" data-inbox-sub>Bot + your sellers</div>
            </div>
          </div>
          <div class="chat-actions">
            <button class="chat-icon-btn" data-action="inbox-search" title="Search" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/></svg>
            </button>
            <button class="chat-icon-btn" data-action="close" title="Close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
        <div class="inbox-search" data-inbox-search-bar>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/></svg>
          <input type="search" placeholder="Search conversations..." data-inbox-search-input />
          <button class="chat-icon-btn" data-action="inbox-search-close" aria-label="Close search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
          </button>
        </div>
        <div class="inbox-banner">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/></svg>
          <span>All conversations are <strong>end-to-end logged</strong> for escrow protection</span>
        </div>
        <div class="inbox-list" data-inbox-list></div>
      </div>

      <!-- CHAT VIEW -->
      <div class="chat-view chat-conv" data-view="chat">
        <div class="chat-head">
          <button class="chat-back" data-action="back-to-inbox" aria-label="Back to inbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M15 18l-6-6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class="chat-avatar" data-peer-avatar>FA</div>
          <div class="chat-meta">
            <div class="name" data-peer-name>FlipIt Assistant</div>
            <div class="sub" data-peer-status></div>
          </div>
          <div class="chat-actions">
            <button class="chat-icon-btn" data-action="search" title="Search" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/></svg>
            </button>
            <button class="chat-icon-btn" data-action="call" title="Call (demo)" aria-label="Call">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </button>
            <div class="chat-more-wrap">
              <button class="chat-icon-btn" data-action="more" title="More" aria-label="More">
                <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="18" r="1.6"/></svg>
              </button>
              <div class="chat-menu" data-menu>
                <button type="button" data-action="role-toggle" data-seller-only><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 12a9 9 0 0 1-15 6.7L3 16M3 16h4v4M21 8h-4V4"/></svg> Open the other side</button>
                <button type="button" data-action="mute"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" stroke-linecap="round"/></svg> Mute notifications</button>
                <button type="button" data-action="block" data-seller-only><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M5 5l14 14" stroke-linecap="round"/></svg> Block user</button>
                <button type="button" data-action="report" data-seller-only><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 21V4l16-1v14L4 21zM4 14h16"/></svg> Report</button>
                <button type="button" data-action="clear"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg> Clear conversation</button>
              </div>
            </div>
            <button class="chat-icon-btn" data-action="close" title="Close" aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>

        <div class="chat-search-bar" data-search-bar>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4" stroke-linecap="round"/></svg>
          <input type="search" placeholder="Search in conversation..." data-search-input />
          <button class="chat-icon-btn" data-action="search-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg></button>
        </div>

        <div class="chat-order-card" data-order-card></div>

        <div class="chat-body" data-chat-body></div>

        <button class="chat-scroll-btn" data-scroll-bottom aria-label="Scroll to latest">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span class="badge" data-scroll-badge></span>
        </button>

        <div class="chat-quick-replies" data-quick-replies></div>

        <div class="chat-reply-preview" data-reply-preview>
          <div class="rp-bar"></div>
          <div class="rp-content">
            <div class="rp-name">Replying to <span data-rp-name></span></div>
            <div class="rp-text" data-rp-text></div>
          </div>
          <button class="chat-icon-btn" data-action="cancel-reply" aria-label="Cancel reply">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg>
          </button>
        </div>

        <div class="chat-attachments" data-attachments></div>
        <div class="chat-templates" data-templates></div>
        <div class="chat-emoji-tray" data-emoji-tray></div>

        <form class="chat-input-row" data-chat-form>
          <button type="button" class="chat-icon-btn" data-action="attach" title="Attach" aria-label="Attach">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6.21M16 5l3 3M14 7l5-5 3 3-5 5"/></svg>
          </button>
          <button type="button" class="chat-icon-btn" data-action="emoji" title="Emoji" aria-label="Emoji">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c.85 1.2 2 2 3 2s2.15-.8 3-2"/></svg>
          </button>
          <button type="button" class="chat-icon-btn" data-action="record" title="Voice note" aria-label="Voice note" data-seller-only>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>
          </button>
          <textarea class="chat-input" data-chat-input rows="1" placeholder="Type a message..."></textarea>
          <button class="chat-send" type="submit" aria-label="Send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </form>

        <input type="file" data-file-input multiple accept="image/*,application/pdf,.doc,.docx,.txt,.zip" hidden />

        <div class="chat-recording" data-recording>
          <div class="rec-dot"></div>
          <div class="rec-time" data-rec-time>0:00</div>
          <div class="rec-bars"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <button type="button" class="chat-icon-btn" data-action="cancel-rec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12" stroke-linecap="round"/></svg></button>
          <button type="button" class="chat-send" data-action="send-rec"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    const lightbox = document.createElement('div');
    lightbox.className = 'chat-lightbox';
    lightbox.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><img alt="" />';
    document.body.appendChild(lightbox);

    return { fab, panel, lightbox };
  }

  const { fab, panel, lightbox } = buildUI();
  const inboxView    = panel.querySelector('[data-view="inbox"]');
  const chatView     = panel.querySelector('[data-view="chat"]');
  const inboxList    = panel.querySelector('[data-inbox-list]');
  const inboxSubEl   = panel.querySelector('[data-inbox-sub]');
  const inboxSearch  = panel.querySelector('[data-inbox-search-bar]');
  const inboxSearchInput = panel.querySelector('[data-inbox-search-input]');
  const body         = panel.querySelector('[data-chat-body]');
  const form         = panel.querySelector('[data-chat-form]');
  const input        = panel.querySelector('[data-chat-input]');
  const fileInput    = panel.querySelector('[data-file-input]');
  const attachBox    = panel.querySelector('[data-attachments]');
  const templateBox  = panel.querySelector('[data-templates]');
  const emojiTray    = panel.querySelector('[data-emoji-tray]');
  const replyPreview = panel.querySelector('[data-reply-preview]');
  const searchBar    = panel.querySelector('[data-search-bar]');
  const searchInput  = panel.querySelector('[data-search-input]');
  const scrollBtn    = panel.querySelector('[data-scroll-bottom]');
  const scrollBadge  = panel.querySelector('[data-scroll-badge]');
  const recBox       = panel.querySelector('[data-recording]');
  const recTime      = panel.querySelector('[data-rec-time]');
  const orderCard    = panel.querySelector('[data-order-card]');
  const quickReplies = panel.querySelector('[data-quick-replies]');
  const peerAvatarEl = panel.querySelector('[data-peer-avatar]');
  const peerNameEl   = panel.querySelector('[data-peer-name]');
  const peerStatusEl = panel.querySelector('[data-peer-status]');

  // ========== INBOX RENDERING ==========
  function lastMessagePreview(convId) {
    const conv = allConvs[convId];
    if (!conv || !conv.messages.length) return '';
    const last = conv.messages[conv.messages.length - 1];
    if (last.deleted) return 'Message deleted';
    if (last.kind === 'voice') return '🎤 Voice message';
    if (last.attachments?.length) {
      const has = last.attachments[0];
      return (has.type === 'image' ? '📷 Photo' : '📎 ' + (has.name || 'File'));
    }
    return last.text || '';
  }
  function lastMessageTs(convId) {
    const conv = allConvs[convId];
    if (!conv || !conv.messages.length) return 0;
    return conv.messages[conv.messages.length - 1].ts;
  }
  function unreadCountFor(convId) {
    const conv = allConvs[convId];
    if (!conv) return 0;
    const me = meRoleFor(CONVS[convId]);
    return conv.messages.filter(m => m.from !== me && m.status !== 'read').length;
  }
  function totalUnread() {
    return Object.keys(CONVS).reduce((sum, id) => sum + unreadCountFor(id), 0);
  }
  function renderInbox() {
    const q = (inboxSearchInput.value || '').toLowerCase();
    inboxList.innerHTML = '';
    const list = Object.values(CONVS)
      .map(c => ({ c, ts: lastMessageTs(c.id) }))
      .filter(x => {
        if (!q) return true;
        return (
          x.c.peer.name.toLowerCase().includes(q) ||
          (lastMessagePreview(x.c.id) + '').toLowerCase().includes(q) ||
          (x.c.order?.listing || '').toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.ts - a.ts);

    if (list.length === 0) {
      inboxList.innerHTML = '<div class="inbox-empty">No conversations match.</div>';
      return;
    }

    list.forEach(({ c }) => {
      const conv = allConvs[c.id];
      const unread = unreadCountFor(c.id);
      const ts = lastMessageTs(c.id);
      const preview = lastMessagePreview(c.id);
      const last = conv.messages[conv.messages.length - 1];
      const youPrefix = last && last.from === meRoleFor(c) ? '<span class="you">You: </span>' : '';
      const isBot = c.type === 'bot';
      const onlineDot = isBot ? 'online' : (isPeerOnline(c.id) ? 'online' : '');

      const row = document.createElement('button');
      row.className = 'inbox-row' + (unread > 0 ? ' unread' : '');
      row.innerHTML = `
        <div class="ir-avatar" style="background:${c.peer.avatarBg};color:${c.peer.avatarFg}">
          ${esc(c.peer.initials)}
          <span class="ir-online ${onlineDot}"></span>
          ${isBot ? '<span class="ir-bot-tag">AI</span>' : ''}
        </div>
        <div class="ir-info">
          <div class="ir-top">
            <span class="ir-name">${esc(c.peer.name)}${c.peer.verified ? ' <svg class="verify" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/></svg>' : ''}</span>
            <span class="ir-time">${ts ? fmtRelative(ts) : ''}</span>
          </div>
          <div class="ir-preview">${youPrefix}${esc(preview).slice(0, 80)}</div>
          ${c.order ? `<div class="ir-order">${esc(c.order.listing)} · ${esc(c.order.price)}</div>` : ''}
        </div>
        ${unread > 0 ? `<span class="ir-unread">${unread}</span>` : ''}
      `;
      row.addEventListener('click', () => activateConv(c.id));
      inboxList.appendChild(row);
    });

    const total = totalUnread();
    inboxSubEl.textContent = total > 0 ? `${total} unread message${total === 1 ? '' : 's'}` : 'Bot + your sellers';
  }

  // ========== ACTIVE CONVERSATION ==========
  function activeConv() { return CONVS[activeId]; }
  function activeState() { return allConvs[activeId]; }

  function activateConv(id) {
    activeId = id;
    setActiveId(id);
    panel.classList.remove('view-inbox');
    panel.classList.add('view-chat');
    const conv = CONVS[id];
    panel.dataset.convType = conv.type;
    panel.dataset.convId = id;

    // Update header
    peerAvatarEl.textContent = conv.peer.initials;
    peerAvatarEl.style.background = conv.peer.avatarBg;
    peerAvatarEl.style.color = conv.peer.avatarFg;
    peerNameEl.innerHTML = esc(conv.peer.name) + (conv.peer.verified ? ' <svg class="verify" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4" stroke-linecap="round"/></svg>' : '') + (conv.type === 'bot' ? ' <span class="bot-tag">AI</span>' : '');

    // Order card
    if (conv.order) {
      orderCard.innerHTML = `
        <div class="oc-thumb" style="background:${conv.order.bg}">${conv.order.img}</div>
        <div class="oc-info">
          <div class="oc-title">${esc(conv.order.listing)}</div>
          <div class="oc-meta">${esc(conv.order.price)} · #${esc(conv.order.orderId)}</div>
        </div>
        <span class="oc-status">${esc(conv.order.status)}</span>
      `;
      orderCard.classList.add('show');
    } else {
      orderCard.classList.remove('show');
    }

    // Show/hide seller-only buttons
    panel.querySelectorAll('[data-seller-only]').forEach(el => {
      el.style.display = conv.type === 'seller' ? '' : 'none';
    });

    // Reset composer state
    pendingAttachments = [];
    replyingTo = null;
    searchQuery = '';
    searchInput.value = '';
    searchBar.classList.remove('open');
    renderAttachmentsTray();
    renderReplyPreview();

    renderMessages();
    renderTypingIndicator();
    renderQuickReplies();
    markAllRead();
    body.scrollTop = body.scrollHeight;
    setTimeout(() => input.focus(), 200);
  }

  function backToInbox() {
    activeId = null;
    setActiveId('');
    panel.classList.remove('view-chat');
    panel.classList.add('view-inbox');
    panel.dataset.convType = '';
    renderInbox();
  }

  // ========== MESSAGE RENDERING ==========
  function renderMessages() {
    body.innerHTML = '';
    const conv = activeConv();
    const state = activeState();
    if (!conv || !state) return;
    const ME = meRoleFor(conv);

    let lastDay = '';
    state.messages.forEach((m) => {
      if (searchQuery) {
        const txt = (m.text || '') + ' ' + (m.attachments || []).map(a => a.name || '').join(' ');
        if (!txt.toLowerCase().includes(searchQuery.toLowerCase())) return;
      }
      const day = new Date(m.ts).toDateString();
      if (day !== lastDay) {
        const d = document.createElement('div');
        d.className = 'chat-day-divider';
        const today = new Date().toDateString();
        const yest = new Date(Date.now() - 86400000).toDateString();
        d.innerHTML = `<span>${day === today ? 'Today' : (day === yest ? 'Yesterday' : day)}</span>`;
        body.appendChild(d);
        lastDay = day;
      }
      body.appendChild(renderMessage(m, ME, conv));
    });

    // Bot typing indicator (if active)
    if (conv.type === 'bot' && botTyping) {
      const t = document.createElement('div');
      t.className = 'msg them typing-msg';
      t.innerHTML = '<div class="bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
      body.appendChild(t);
    }
    updateScrollBtn();
  }

  function renderMessage(m, ME, conv) {
    const isMe = m.from === ME;
    const wrap = document.createElement('div');
    wrap.className = `msg ${isMe ? 'me' : 'them'}${m.deleted ? ' deleted' : ''}`;
    wrap.dataset.id = m.id;

    if (m.replyTo) {
      const orig = activeState().messages.find(x => x.id === m.replyTo);
      if (orig) {
        const rp = document.createElement('div');
        rp.className = 'msg-reply';
        const oName = orig.from === ME ? 'You' : conv.peer.name;
        rp.innerHTML = `<div class="rp-bar"></div><div><div class="rp-name">${esc(oName)}</div><div class="rp-text">${esc((orig.text || '').slice(0, 80) || '[attachment]')}</div></div>`;
        rp.addEventListener('click', () => {
          const target = body.querySelector(`.msg[data-id="${orig.id}"]`);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('flash');
            setTimeout(() => target.classList.remove('flash'), 1600);
          }
        });
        wrap.appendChild(rp);
      }
    }

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    if (m.deleted) {
      bubble.innerHTML = '<em class="deleted-text">This message was deleted</em>';
    } else {
      if (m.attachments && m.attachments.length) {
        const atts = document.createElement('div');
        atts.className = 'msg-atts';
        m.attachments.forEach(a => atts.appendChild(renderAttachment(a)));
        bubble.appendChild(atts);
      }
      if (m.kind === 'voice') {
        const v = document.createElement('div');
        v.className = 'msg-voice';
        v.innerHTML = `<button class="voice-play"><svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6,4 20,12 6,20"/></svg></button><div class="voice-bars">${'<span></span>'.repeat(20)}</div><span class="voice-dur">${m.duration || '0:00'}</span>`;
        bubble.appendChild(v);
      }
      if (m.text) {
        const t = document.createElement('div');
        t.className = 'msg-text';
        t.innerHTML = markup(m.text);
        bubble.appendChild(t);
      }
    }

    if (m.reactions && Object.keys(m.reactions).length) {
      const rx = document.createElement('div');
      rx.className = 'msg-reactions';
      Object.entries(m.reactions).forEach(([emoji, users]) => {
        if (!users || !users.length) return;
        const mine = users.includes(ME);
        const chip = document.createElement('button');
        chip.className = `rx-chip ${mine ? 'mine' : ''}`;
        chip.innerHTML = `${emoji} <span>${users.length}</span>`;
        chip.addEventListener('click', () => toggleReaction(m.id, emoji));
        rx.appendChild(chip);
      });
      bubble.appendChild(rx);
    }

    const actions = document.createElement('div');
    actions.className = 'msg-actions';
    actions.innerHTML = `
      <button class="msg-act" data-react title="React"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01M9 15c.85 1.2 2 2 3 2s2.15-.8 3-2"/></svg></button>
      <button class="msg-act" data-reply title="Reply"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 17l-6-6 6-6M3 11h11a7 7 0 0 1 7 7v3"/></svg></button>
      ${isMe && !m.deleted ? '<button class="msg-act" data-edit title="Edit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg></button>' : ''}
      ${isMe && !m.deleted ? '<button class="msg-act" data-delete title="Delete"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg></button>' : ''}
    `;
    bubble.appendChild(actions);

    const popover = document.createElement('div');
    popover.className = 'rx-popover';
    QUICK_REACTIONS.forEach(em => {
      const b = document.createElement('button');
      b.textContent = em;
      b.addEventListener('click', () => { toggleReaction(m.id, em); popover.classList.remove('open'); });
      popover.appendChild(b);
    });
    bubble.appendChild(popover);

    actions.querySelector('[data-react]').addEventListener('click', () => {
      panel.querySelectorAll('.rx-popover.open').forEach(p => p.classList.remove('open'));
      popover.classList.add('open');
    });
    actions.querySelector('[data-reply]').addEventListener('click', () => startReply(m.id));
    if (isMe && !m.deleted) {
      actions.querySelector('[data-edit]').addEventListener('click', () => editMessage(m.id));
      actions.querySelector('[data-delete]').addEventListener('click', () => deleteMessage(m.id));
    }

    wrap.appendChild(bubble);

    const meta = document.createElement('div');
    meta.className = 'meta';
    let metaHtml = `${fmtTime(m.ts)}`;
    if (m.edited) metaHtml += ' · edited';
    if (isMe) {
      const read = m.status === 'read';
      metaHtml += ` <span class="read ${read ? 'on' : ''}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M2 12l4 4L14 6M10 16l4 4L22 8" stroke-linecap="round"/></svg></span>`;
    }
    meta.innerHTML = metaHtml;
    wrap.appendChild(meta);
    return wrap;
  }

  function renderAttachment(a) {
    if (a.type === 'image') {
      const img = document.createElement('img');
      img.src = a.dataUrl;
      img.alt = a.name || 'image';
      img.className = 'msg-img';
      img.addEventListener('click', () => openLightbox(a.dataUrl));
      return img;
    } else {
      const f = document.createElement('a');
      f.className = 'msg-file';
      f.href = a.dataUrl || '#';
      f.download = a.name || 'file';
      f.target = '_blank';
      f.innerHTML = `<div class="mf-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div><div><div class="mf-name">${esc(a.name)}</div><div class="mf-size">${fmtBytes(a.size || 0)}</div></div>`;
      return f;
    }
  }

  // ========== SEND / RECEIVE ==========
  function send(text) {
    const conv = activeConv();
    if (!conv) return;
    const ME = meRoleFor(conv);
    text = (text || '').trim();
    if (!text && pendingAttachments.length === 0) return;

    const msg = {
      id: uid(),
      from: ME,
      kind: 'text',
      text,
      ts: Date.now(),
      reactions: {},
      status: 'sent',
      attachments: pendingAttachments.length ? pendingAttachments.slice() : undefined,
      replyTo: replyingTo || undefined
    };
    activeState().messages.push(msg);
    activeState().lastUpdated = Date.now();
    saveAll(allConvs);

    input.value = '';
    autoResize();
    pendingAttachments = [];
    replyingTo = null;
    renderAttachmentsTray();
    renderReplyPreview();
    setTyping(activeId, false);
    renderMessages();
    renderQuickReplies();
    body.scrollTop = body.scrollHeight;

    setTimeout(() => markStatus(msg.id, 'delivered'), 250);

    // Bot replies locally
    if (conv.type === 'bot') {
      botRespond(text);
    }
  }

  function sendVoiceNote(durSec) {
    const conv = activeConv();
    if (!conv) return;
    const ME = meRoleFor(conv);
    const min = Math.floor(durSec / 60), sec = Math.floor(durSec % 60);
    const dur = `${min}:${String(sec).padStart(2, '0')}`;
    activeState().messages.push({ id: uid(), from: ME, kind: 'voice', duration: dur, ts: Date.now(), reactions: {}, status: 'sent' });
    activeState().lastUpdated = Date.now();
    saveAll(allConvs);
    renderMessages();
    body.scrollTop = body.scrollHeight;
  }

  function botRespond(userText) {
    botTyping = true;
    renderMessages();
    body.scrollTop = body.scrollHeight;
    const delay = 700 + Math.min(2200, userText.length * 35);
    setTimeout(() => {
      botTyping = false;
      const { text, quick } = botPickReply(userText);
      const conv = activeConv();
      if (!conv || conv.type !== 'bot') return;
      activeState().messages.push({
        id: uid(),
        from: 'them',
        kind: 'text',
        text,
        ts: Date.now(),
        reactions: {},
        status: 'delivered'
      });
      activeState().lastUpdated = Date.now();
      activeState().lastQuick = quick;
      saveAll(allConvs);
      renderMessages();
      renderQuickReplies();
      body.scrollTop = body.scrollHeight;
      playPing();
      // Auto-mark read since user is in this chat
      setTimeout(markAllRead, 600);
    }, delay);
  }

  function renderQuickReplies() {
    quickReplies.innerHTML = '';
    const conv = activeConv();
    if (!conv) { quickReplies.classList.remove('show'); return; }
    let chips = [];
    if (conv.type === 'bot') {
      const lastBot = [...activeState().messages].reverse().find(m => m.from === 'them');
      chips = activeState().lastQuick && activeState().lastQuick.length ? activeState().lastQuick : BOT_DEFAULT_QUICK;
    } else {
      chips = ['Is the listing still available?', 'Send proof of stock', 'When can you deliver?', 'Thanks!'];
    }
    chips.slice(0, 5).forEach(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'qr-chip';
      b.textContent = c;
      b.addEventListener('click', () => {
        if (c === 'Take me to Sell page') { location.href = 'sell.html'; return; }
        if (c === 'Browse software')      { location.href = 'browse.html?cat=software'; return; }
        if (c === 'Browse SaaS')          { location.href = 'browse.html?cat=saas'; return; }
        if (c === 'Browse listings')      { location.href = 'browse.html'; return; }
        send(c);
      });
      quickReplies.appendChild(b);
    });
    quickReplies.classList.add('show');
  }

  function markStatus(id, status) {
    const conv = activeState();
    if (!conv) return;
    const m = conv.messages.find(x => x.id === id);
    if (!m) return;
    m.status = status;
    saveAll(allConvs);
    renderMessages();
  }

  function markAllRead() {
    if (!activeId) return;
    const conv = CONVS[activeId];
    const state = allConvs[activeId];
    if (!state) return;
    const ME = meRoleFor(conv);
    let changed = false;
    state.messages.forEach(m => {
      if (m.from !== ME && m.status !== 'read') { m.status = 'read'; changed = true; }
    });
    if (changed) saveAll(allConvs);
    updateFabBadge();
  }

  function toggleReaction(id, emoji) {
    const ME = meRoleFor(activeConv());
    const m = activeState().messages.find(x => x.id === id);
    if (!m) return;
    if (!m.reactions) m.reactions = {};
    const arr = m.reactions[emoji] || [];
    const idx = arr.indexOf(ME);
    if (idx >= 0) arr.splice(idx, 1); else arr.push(ME);
    if (arr.length === 0) delete m.reactions[emoji]; else m.reactions[emoji] = arr;
    saveAll(allConvs);
    renderMessages();
  }

  function deleteMessage(id) {
    if (!confirm('Delete this message?')) return;
    const m = activeState().messages.find(x => x.id === id);
    if (!m) return;
    m.deleted = true; m.text = ''; m.attachments = undefined;
    saveAll(allConvs);
    renderMessages();
  }

  function editMessage(id) {
    const m = activeState().messages.find(x => x.id === id);
    if (!m) return;
    const newText = prompt('Edit message:', m.text || '');
    if (newText == null) return;
    m.text = newText; m.edited = true;
    saveAll(allConvs);
    renderMessages();
  }

  function startReply(id) { replyingTo = id; renderReplyPreview(); input.focus(); }
  function cancelReply() { replyingTo = null; renderReplyPreview(); }
  function renderReplyPreview() {
    if (!replyingTo) { replyPreview.classList.remove('open'); return; }
    const m = activeState().messages.find(x => x.id === replyingTo);
    if (!m) return;
    const ME = meRoleFor(activeConv());
    const name = m.from === ME ? 'yourself' : activeConv().peer.name;
    replyPreview.querySelector('[data-rp-name]').textContent = name;
    replyPreview.querySelector('[data-rp-text]').textContent = (m.text || '[attachment]').slice(0, 100);
    replyPreview.classList.add('open');
  }

  // ---------- Attachments ----------
  function handleFiles(files) {
    Array.from(files).forEach(f => {
      if (f.size > 4 * 1024 * 1024) { alert('Files larger than 4MB are not supported in this demo.'); return; }
      const isImg = /^image\//.test(f.type);
      const reader = new FileReader();
      reader.onload = (e) => {
        pendingAttachments.push({ type: isImg ? 'image' : 'file', name: f.name, size: f.size, dataUrl: e.target.result });
        renderAttachmentsTray();
      };
      reader.readAsDataURL(f);
    });
  }
  function renderAttachmentsTray() {
    attachBox.innerHTML = '';
    if (pendingAttachments.length === 0) { attachBox.classList.remove('has'); return; }
    attachBox.classList.add('has');
    pendingAttachments.forEach((a, i) => {
      const item = document.createElement('div');
      item.className = 'att-item';
      if (a.type === 'image') {
        item.innerHTML = `<img src="${a.dataUrl}" alt=""/><button class="att-rm" aria-label="Remove">&times;</button>`;
      } else {
        item.innerHTML = `<div class="att-file"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><span>${esc(a.name)}</span></div><button class="att-rm" aria-label="Remove">&times;</button>`;
      }
      item.querySelector('.att-rm').addEventListener('click', () => { pendingAttachments.splice(i, 1); renderAttachmentsTray(); });
      attachBox.appendChild(item);
    });
  }

  function renderEmojiTray(show) {
    emojiTray.innerHTML = '';
    if (!show) { emojiTray.classList.remove('open'); return; }
    emojiTray.classList.add('open');
    EMOJIS.forEach(e => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = e;
      b.addEventListener('click', () => { input.value += e; autoResize(); input.focus(); });
      emojiTray.appendChild(b);
    });
  }

  // ---------- Header status / typing indicator ----------
  function renderTypingIndicator() {
    if (!activeId) return;
    const conv = activeConv();
    if (!peerStatusEl) return;
    if (conv.type === 'bot') {
      peerStatusEl.innerHTML = '<span class="dot online"></span> AI assistant · usually replies instantly';
      return;
    }
    if (isPeerTyping(activeId)) {
      peerStatusEl.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span> typing...';
      peerStatusEl.classList.add('typing');
      return;
    }
    peerStatusEl.classList.remove('typing');
    if (isPeerOnline(activeId)) {
      peerStatusEl.innerHTML = '<span class="dot online"></span> Online now · usually replies in ~12 min';
    } else {
      peerStatusEl.innerHTML = '<span class="dot"></span> ' + esc(conv.peer.sub);
    }
  }
  setInterval(() => {
    if (panel.classList.contains('view-chat')) renderTypingIndicator();
    if (panel.classList.contains('view-inbox')) {
      // refresh inbox online dots & previews
      panel.querySelectorAll('.inbox-row').forEach((row, i) => {
        const dot = row.querySelector('.ir-online');
        if (!dot) return;
      });
    }
  }, 1500);

  // ---------- Scroll-to-bottom ----------
  function updateScrollBtn() {
    const nearBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 60;
    if (nearBottom) {
      scrollBtn.classList.remove('show');
      unreadInThis = 0;
      scrollBadge.textContent = ''; scrollBadge.classList.remove('show');
    } else {
      scrollBtn.classList.add('show');
    }
  }
  body.addEventListener('scroll', updateScrollBtn);
  scrollBtn.addEventListener('click', () => { body.scrollTop = body.scrollHeight; });

  // ---------- FAB unread badge ----------
  function updateFabBadge() {
    const total = totalUnread();
    const dot = fab.querySelector('.badge-dot');
    if (total > 0) {
      fab.classList.add('has-unread');
      dot.textContent = total > 99 ? '99+' : total;
    } else {
      fab.classList.remove('has-unread');
      dot.textContent = '';
    }
  }

  // ---------- Open / close panel ----------
  function openPanel() {
    panel.classList.add('open');
    fab.classList.add('open');
    const stored = getActiveId();
    const def = stored && CONVS[stored] ? stored : detectDefaultConv();
    activateConv(def);
  }
  function closePanel() {
    panel.classList.remove('open');
    fab.classList.remove('open');
  }

  fab.addEventListener('click', () => { panel.classList.contains('open') ? closePanel() : openPanel(); });
  panel.querySelectorAll('[data-action="close"]').forEach(b => b.addEventListener('click', closePanel));
  panel.querySelector('[data-action="back-to-inbox"]').addEventListener('click', backToInbox);

  // Header menu
  panel.querySelector('[data-action="more"]').addEventListener('click', (e) => {
    e.stopPropagation();
    panel.querySelector('[data-menu]').classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.chat-more-wrap')) {
      const menu = panel.querySelector('[data-menu]');
      if (menu) menu.classList.remove('open');
    }
  });
  panel.querySelector('[data-action="role-toggle"]').addEventListener('click', () => {
    const otherRole = ROLE === 'buyer' ? 'seller' : 'buyer';
    const url = new URL(location.href);
    url.searchParams.set('as', otherRole);
    window.open(url.toString(), '_blank');
  });
  panel.querySelector('[data-action="mute"]').addEventListener('click', () => alert('Notifications muted for this conversation.'));
  panel.querySelector('[data-action="block"]').addEventListener('click', () => alert('User blocked. They can no longer message you (demo).'));
  panel.querySelector('[data-action="report"]').addEventListener('click', () => alert('Report submitted to FlipIt Trust & Safety. Reference #' + Math.random().toString(36).slice(2, 8).toUpperCase()));
  panel.querySelector('[data-action="clear"]').addEventListener('click', () => {
    if (!confirm('Clear this conversation?')) return;
    if (activeState()) {
      activeState().messages = [];
      saveAll(allConvs);
      renderMessages();
    }
  });
  panel.querySelector('[data-action="call"]').addEventListener('click', () => alert('Voice/video calls are coming soon. (Demo only)'));

  // Search (in conversation)
  panel.querySelector('[data-action="search"]').addEventListener('click', () => { searchBar.classList.add('open'); searchInput.focus(); });
  panel.querySelector('[data-action="search-close"]').addEventListener('click', () => { searchBar.classList.remove('open'); searchInput.value = ''; searchQuery = ''; renderMessages(); });
  searchInput.addEventListener('input', (e) => { searchQuery = e.target.value; renderMessages(); });

  // Inbox search
  panel.querySelector('[data-action="inbox-search"]').addEventListener('click', () => { inboxSearch.classList.add('open'); inboxSearchInput.focus(); });
  panel.querySelector('[data-action="inbox-search-close"]').addEventListener('click', () => { inboxSearch.classList.remove('open'); inboxSearchInput.value = ''; renderInbox(); });
  inboxSearchInput.addEventListener('input', renderInbox);

  panel.querySelector('[data-action="cancel-reply"]').addEventListener('click', cancelReply);
  panel.querySelector('[data-action="attach"]').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
  panel.addEventListener('dragover', (e) => { e.preventDefault(); panel.classList.add('drag'); });
  panel.addEventListener('dragleave', () => panel.classList.remove('drag'));
  panel.addEventListener('drop', (e) => { e.preventDefault(); panel.classList.remove('drag'); if (e.dataTransfer && e.dataTransfer.files) handleFiles(e.dataTransfer.files); });

  panel.querySelector('[data-action="emoji"]').addEventListener('click', () => renderEmojiTray(!emojiTray.classList.contains('open')));

  panel.querySelector('[data-action="record"]').addEventListener('click', () => {
    if (recording) return;
    recording = true; recStart = Date.now();
    recBox.classList.add('open'); panel.classList.add('recording');
    recInterval = setInterval(() => {
      const s = Math.floor((Date.now() - recStart) / 1000);
      recTime.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    }, 250);
  });
  panel.querySelector('[data-action="cancel-rec"]').addEventListener('click', () => {
    recording = false; clearInterval(recInterval); recBox.classList.remove('open'); panel.classList.remove('recording'); recTime.textContent = '0:00';
  });
  panel.querySelector('[data-action="send-rec"]').addEventListener('click', () => {
    if (!recording) return;
    const dur = Math.max(1, (Date.now() - recStart) / 1000);
    recording = false; clearInterval(recInterval); recBox.classList.remove('open'); panel.classList.remove('recording'); recTime.textContent = '0:00';
    sendVoiceNote(dur);
  });

  function autoResize() {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  }
  input.addEventListener('input', () => {
    autoResize();
    if (activeConv()?.type === 'seller') {
      setTyping(activeId, true);
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => setTyping(activeId, false), 1500);
    }
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input.value); renderEmojiTray(false); }
  });
  form.addEventListener('submit', (e) => { e.preventDefault(); send(input.value); renderEmojiTray(false); });

  function openLightbox(src) { lightbox.querySelector('img').src = src; lightbox.classList.add('open'); }
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));

  // Cross-tab sync (seller convs only)
  window.addEventListener('storage', (e) => {
    if (e.key === STATE_KEY) {
      const old = allConvs;
      allConvs = loadAll();
      // Detect new messages in any seller conv
      Object.keys(CONVS).forEach(id => {
        const conv = CONVS[id];
        if (conv.type !== 'seller') return;
        const oldMsgs = old[id]?.messages || [];
        const newMsgs = allConvs[id]?.messages || [];
        if (newMsgs.length > oldMsgs.length) {
          const last = newMsgs[newMsgs.length - 1];
          const ME = meRoleFor(conv);
          if (last && last.from !== ME) {
            playPing();
            if (panel.classList.contains('open')) {
              if (activeId === id) {
                renderMessages();
                if (body.scrollHeight - body.scrollTop - body.clientHeight > 80) {
                  unreadInThis += 1;
                  scrollBadge.textContent = unreadInThis;
                  scrollBadge.classList.add('show');
                } else {
                  body.scrollTop = body.scrollHeight;
                  setTimeout(markAllRead, 600);
                }
              }
            }
          }
        }
      });
      if (panel.classList.contains('view-inbox')) renderInbox();
      else if (activeId) renderMessages();
      updateFabBadge();
    }
    if (e.key === TYPING_KEY || e.key === PRESENCE_KEY) renderTypingIndicator();
  });

  // Sitewide triggers
  function isMessageTrigger(el) {
    if (!el) return false;
    if (el.dataset && (el.dataset.action === 'message-seller' || el.dataset.action === 'message-buyer' || el.dataset.chat === 'open')) return true;
    if (el.id === 'message-seller') return true;
    const t = (el.textContent || '').trim().toLowerCase();
    return t === 'message seller' || t === 'message buyer' || t === 'open chat' || t === 'help' || t === 'support';
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, a');
    if (!btn) return;
    if (isMessageTrigger(btn)) {
      e.preventDefault();
      // Force product-page chat to open the seller conv even if a different one was last active
      if (location.pathname.toLowerCase().includes('product')) {
        setActiveId('seller-pixelstore-adobe-cc');
      }
      openPanel();
    }
  });

  // Heartbeat presence cleanup on tab close
  window.addEventListener('beforeunload', () => {
    try {
      const data = JSON.parse(localStorage.getItem(PRESENCE_KEY) || '{}');
      Object.keys(data).forEach(id => { if (data[id]) delete data[id][ROLE]; });
      localStorage.setItem(PRESENCE_KEY, JSON.stringify(data));
    } catch (e) {}
  });

  // ========== INIT ==========
  panel.classList.add('view-inbox');
  renderInbox();
  updateFabBadge();

  // Tag panel for role styling
  panel.classList.add('role-' + ROLE);
})();
