/* ─────────────────────────────────────────────────────────────
   community.js  –  After Exam Community Q&A Engine
   ─────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Starfield ── */
  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: Math.min(Math.max(Math.floor(canvas.width * canvas.height / 9000), 60), 220) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        speed: Math.random() * 0.04 + 0.008,
        op: Math.random() * 0.8 + 0.15,
        dir: Math.random() > 0.5 ? 1 : -1
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.op += s.speed * s.dir;
        if (s.op > 1 || s.op < 0.1) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.op})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resize);
    resize(); draw();
  }

  /* ── Auth State ── */
  let user = sessionStorage.getItem('ae_user') || null;

  const authZone = document.getElementById('auth-zone');
  const authModal = document.getElementById('auth-modal');
  const authForm = document.getElementById('auth-form');
  const modalTitle = document.getElementById('modal-title');
  const modalSub = document.getElementById('modal-sub');
  const authBtn = document.getElementById('auth-btn');
  const toggleLink = document.getElementById('toggle-link');
  const toggleText = document.getElementById('toggle-text');
  const fieldUser = document.getElementById('field-username');
  const fieldPass = document.getElementById('field-password');
  const composeAvatar = document.getElementById('compose-avatar');

  let signUpMode = false;

  function renderAuthZone() {
    if (user) {
      authZone.innerHTML = `
        <div class="user-pill" id="user-pill">
          <div class="pill-avatar">${user.charAt(0).toUpperCase()}</div>
          <span>${user}</span>
        </div>`;
      document.getElementById('user-pill').addEventListener('click', () => {
        if (confirm('Log out from Community?')) { user = null; sessionStorage.removeItem('ae_user'); renderAuthZone(); renderFeed(); }
      });
      composeAvatar.textContent = user.charAt(0).toUpperCase();
      composeAvatar.classList.remove('guest');
    } else {
      authZone.innerHTML = `<button class="btn btn-primary" id="login-btn" style="padding:0.45rem 1.2rem;font-size:0.88rem;">Login / Register</button>`;
      document.getElementById('login-btn').addEventListener('click', () => openModal());
      composeAvatar.textContent = '?';
      composeAvatar.classList.add('guest');
    }
  }

  function openModal(isSignUp = false) {
    signUpMode = isSignUp;
    modalTitle.textContent = isSignUp ? 'Create Account' : 'Welcome Back';
    modalSub.textContent = isSignUp
      ? 'Sign up to post questions and reply to community discussions.'
      : 'Log in to post questions and reply to discussions.';
    authBtn.textContent = isSignUp ? 'Create Account' : 'Log In';
    toggleText.textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
    toggleLink.textContent = isSignUp ? 'Log In' : 'Sign Up';
    authModal.classList.add('show');
    fieldUser.focus();
  }

  function closeModal() {
    authModal.classList.remove('show');
    authForm.reset();
  }

  document.getElementById('modal-close').addEventListener('click', closeModal);
  authModal.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });
  toggleLink.addEventListener('click', () => openModal(!signUpMode));

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const u = fieldUser.value.trim();
    if (!u) return;
    user = u;
    sessionStorage.setItem('ae_user', user);
    closeModal();
    renderAuthZone();
    renderFeed();
  });

  /* ── Seed Data ── */
  const SEED = [
    {
      id: 'p1', author: 'Rahul_PCB', isMod: false, category: 'computing',
      time: '2 hours ago', avatar: 'R', color: '#8b5cf6',
      text: 'Is BCA possible without a math background? I completed 12th with PCB biology stream and want to shift to computer applications. Most of my friends say I need maths but is this really true?',
      upvotes: 14, voters: [],
      replies: [
        { author: 'Prof. Arjun Mehta', isMod: true, color: '#06b6d4', time: '1 hr ago', text: 'Great question! In most Indian universities — IP University, Symbiosis, IGNOU, Amity — mathematics is NOT mandatory for BCA admission. Many colleges specifically welcome science students with Biology. A few private colleges may offer bridge courses in basics of computer math. Go for it!' },
        { author: 'Sneha_BCA2023', isMod: false, color: '#a855f7', time: '45 min ago', text: 'Confirming this from personal experience. I cleared 12th with PCB, joined BCA at a top college in Pune and am now working as a junior developer. The course teaches programming from scratch.' }
      ]
    },
    {
      id: 'p2', author: 'Aisha_Vet', isMod: false, category: 'medical',
      time: '5 hours ago', avatar: 'A', color: '#06b6d4',
      text: 'What is the actual salary scope after completing B.V.Sc (Veterinary Science) in India? I am very passionate about animals but my parents feel it has no scope compared to MBBS. Please help!',
      upvotes: 22, voters: [],
      replies: [
        { author: 'Dr. Kavita Rao (Govt. Vet Officer)', isMod: true, color: '#06b6d4', time: '3 hrs ago', text: 'B.V.Sc has excellent scope! Government Veterinary Officers start at ₹60,000–₹75,000/month with housing allowances. Corporate sector (Amul, Mother Dairy, Godrej Agrovet) offers 8–12 LPA starting packages. Premium pet clinics in metros can get you 7–10 LPA. Wildlife conservation positions are growing too. Don\'t let anyone underestimate this field!' },
        { author: 'Vikram_VetStudent', isMod: false, color: '#eab308', time: '2 hrs ago', text: 'Also worth mentioning — if you pursue specialization (surgery, oncology), private practice can easily go into 30–50 LPA range. The field is booming with pet ownership rising across India.' }
      ]
    },
    {
      id: 'p3', author: 'Priya_Bio', isMod: false, category: 'biotech',
      time: '1 day ago', avatar: 'P', color: '#a855f7',
      text: 'Confused between B.Tech Biotechnology and B.Pharm. I got a decent NEET score (around 420) but didn\'t qualify for MBBS. Which one has better industry placements and long-term growth?',
      upvotes: 18, voters: [],
      replies: [
        { author: 'Career Advisor (AFTER EXAM Team)', isMod: true, color: '#06b6d4', time: '20 hrs ago', text: 'Both are excellent! Here is a quick breakdown: B.Tech Biotech is ideal if you love lab work, research, and want to enter biopharma giants like Biocon, Dr. Reddy\'s, or startups. Starting salary: 4–8 LPA. B.Pharm is ideal for clinical settings, pharmacy retail chains, or drug approval roles with starting salary of 3.5–6 LPA. Long-term growth wise — B.Tech Biotech edges ahead if you pair it with M.Tech or MBA.' }
      ]
    },
    {
      id: 'p4', author: 'Arjun_NEET', isMod: false, category: 'medical',
      time: '2 days ago', avatar: 'A', color: '#f97316',
      text: 'Failed NEET twice. Parents are devastated. Honestly feeling lost. Should I try NEET a third time or look at BAMS/BHMS as alternatives? Is BAMS taken seriously as a doctor in society?',
      upvotes: 31, voters: [],
      replies: [
        { author: 'Dr. Suresh Nair (BAMS, 15 yrs practice)', isMod: true, color: '#06b6d4', time: '1 day ago', text: 'I understand your frustration. BAMS is a legitimate 5.5-year medical degree that gives you the title of "Doctor" and a license to practice. You can open clinics, work in government hospitals, join pharma companies, or even research Ayurvedic medicine internationally. The social perception is changing rapidly — especially post-COVID where Ayurveda had a massive resurgence. Please do not feel this is a lesser path.' },
        { author: 'NEETfailed_3rd_Success', isMod: false, color: '#8b5cf6', time: '22 hrs ago', text: 'I was in the exact same place 4 years ago. Took BAMS. Now running a thriving clinic. Zero regrets. Some of my batchmates who cracked NEET are still doing internships while I have been earning for 2 years already.' }
      ]
    },
    {
      id: 'p5', author: 'Neha_Bioinfo', isMod: false, category: 'biotech',
      time: '3 days ago', avatar: 'N', color: '#22d3ee',
      text: 'What exactly does a Bioinformatics graduate do in the industry? I see it listed under both Biotech and Computing. Is coding knowledge a must? Which colleges in India are best for this?',
      upvotes: 9, voters: [],
      replies: [
        { author: 'Career Advisor (AFTER EXAM Team)', isMod: true, color: '#06b6d4', time: '2 days ago', text: 'Bioinformatics sits at the intersection of Biology, Data Science and Computer Science. You analyze genomic sequences, build computational models for drug discovery, work in AI health startups, or join research institutions like CDFD, NCBS, or MNCs like TCS Life Sciences. Coding (Python/R) is essential but you pick it up during the course. Top colleges: BITS Pilani (MSc), NIT Calicut (MSc), TERI University. Starting salary: 4–9 LPA growing fast.' }
      ]
    }
  ];

  /* ── LocalStorage DB ── */
  const STORE = 'ae_community_v2';
  function loadPosts() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORE));
      return (saved && saved.length) ? saved : JSON.parse(JSON.stringify(SEED));
    } catch { return JSON.parse(JSON.stringify(SEED)); }
  }
  function savePosts(posts) {
    localStorage.setItem(STORE, JSON.stringify(posts));
  }

  let posts = loadPosts();
  let activeFilter = 'all';
  let searchQuery = '';

  /* ── Render Feed ── */
  const feed = document.getElementById('feed');

  function catClass(cat) {
    return { medical: 'cat-medical', biotech: 'cat-biotech', computing: 'cat-computing' }[cat] || 'cat-medical';
  }
  function catLabel(cat) {
    return { medical: '🩺 Medical & Allied', biotech: '🔬 Biotech & Applied', computing: '💻 Computing & Tech' }[cat] || cat;
  }

  function renderFeed() {
    const filtered = posts.filter(p => {
      const matchCat = activeFilter === 'all' || p.category === activeFilter;
      const matchSearch = !searchQuery || p.text.toLowerCase().includes(searchQuery) || p.author.toLowerCase().includes(searchQuery);
      return matchCat && matchSearch;
    });

    if (!filtered.length) {
      feed.innerHTML = `<div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        <h3>No discussions found</h3>
        <p>Try a different filter or be the first to ask!</p>
      </div>`;
      return;
    }

    feed.innerHTML = filtered.map(p => {
      const voted = user && p.voters && p.voters.includes(user);
      return `
      <div class="post-card" id="card-${p.id}">
        <div class="post-card-header">
          <div class="post-avatar" style="background:${p.color}20;border:1.5px solid ${p.color}40;color:${p.color};">${p.avatar}</div>
          <div class="post-meta">
            <div class="post-author">
              ${esc(p.author)}
              ${p.isMod ? '<span class="mod-badge">Moderator</span>' : ''}
            </div>
            <div class="post-time">${p.time}</div>
          </div>
          <span class="cat-pill ${catClass(p.category)}">${catLabel(p.category)}</span>
        </div>
        <p class="post-body">${esc(p.text)}</p>
        <div class="post-actions">
          <button class="act-btn ${voted ? 'upvoted' : ''}" data-upvote="${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${voted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            <span class="upvote-count">${p.upvotes}</span>
          </button>
          <button class="act-btn" data-toggle="${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            ${p.replies.length} ${p.replies.length === 1 ? 'Reply' : 'Replies'}
          </button>
        </div>
        <div class="replies-section" id="replies-${p.id}">
          <div class="replies-list">
            ${p.replies.map(r => `
              <div class="reply-item">
                <div class="reply-avatar" style="background:${r.color}22;border:1.5px solid ${r.color}40;color:${r.color};">${r.author.charAt(0)}</div>
                <div class="reply-content">
                  <div class="reply-meta">
                    <span class="reply-author">${esc(r.author)}</span>
                    ${r.isMod ? '<span class="mod-badge">Moderator</span>' : ''}
                    <span class="reply-time">${r.time}</span>
                  </div>
                  <p class="reply-text">${esc(r.text)}</p>
                </div>
              </div>`).join('')}
          </div>
          <div class="reply-compose">
            <input type="text" class="reply-input" placeholder="${user ? 'Write a reply…' : 'Login to reply…'}" data-reply-for="${p.id}">
            <button class="reply-submit" data-reply-btn="${p.id}">Reply</button>
          </div>
        </div>
      </div>`;
    }).join('');

    // Bind events
    feed.querySelectorAll('[data-upvote]').forEach(btn => {
      btn.addEventListener('click', () => handleUpvote(btn.dataset.upvote));
    });
    feed.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = document.getElementById(`replies-${btn.dataset.toggle}`);
        if (sec) { sec.classList.toggle('open'); btn.classList.toggle('reply-open'); }
      });
    });
    feed.querySelectorAll('[data-reply-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.replyBtn;
        const inp = feed.querySelector(`[data-reply-for="${id}"]`);
        handleReply(id, inp);
      });
    });
    feed.querySelectorAll('.reply-input').forEach(inp => {
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleReply(inp.dataset.replyFor, inp);
        }
      });
      inp.addEventListener('focus', () => {
        if (!user) { inp.blur(); openModal(); }
      });
    });
  }

  /* ── Upvote ── */
  function handleUpvote(id) {
    if (!user) { openModal(); return; }
    const p = posts.find(x => x.id === id);
    if (!p) return;
    if (!p.voters) p.voters = [];
    const idx = p.voters.indexOf(user);
    if (idx === -1) { p.voters.push(user); p.upvotes++; }
    else { p.voters.splice(idx, 1); p.upvotes--; }
    savePosts(posts);
    renderFeed();
    // Re-open replies if they were open
    const sec = document.getElementById(`replies-${id}`);
    if (sec && sec._wasOpen) sec.classList.add('open');
  }

  /* ── Reply ── */
  function handleReply(id, inp) {
    if (!user) { openModal(); return; }
    const text = inp ? inp.value.trim() : '';
    if (!text) return;
    const p = posts.find(x => x.id === id);
    if (!p) return;
    const colors = ['#8b5cf6', '#06b6d4', '#a855f7', '#eab308', '#f97316', '#22d3ee'];
    p.replies.push({
      author: user,
      isMod: false,
      color: colors[Math.floor(Math.random() * colors.length)],
      time: 'Just now',
      text
    });
    savePosts(posts);
    renderFeed();
    // Reopen this card's replies
    const sec = document.getElementById(`replies-${id}`);
    if (sec) sec.classList.add('open');
  }

  /* ── Post New Question ── */
  const postBtn = document.getElementById('post-btn');
  const composeTa = document.getElementById('compose-textarea');
  const composeCat = document.getElementById('compose-cat');

  postBtn.addEventListener('click', () => {
    if (!user) { openModal(); return; }
    const text = composeTa.value.trim();
    if (!text) { composeTa.focus(); return; }
    const colors = ['#8b5cf6', '#06b6d4', '#a855f7', '#eab308', '#f97316', '#22d3ee'];
    const newPost = {
      id: 'p' + Date.now(),
      author: user,
      isMod: false,
      category: composeCat.value,
      time: 'Just now',
      avatar: user.charAt(0).toUpperCase(),
      color: colors[Math.floor(Math.random() * colors.length)],
      text,
      upvotes: 0,
      voters: [],
      replies: []
    };
    posts.unshift(newPost);
    savePosts(posts);
    composeTa.value = '';
    renderFeed();
    // Scroll to top of feed
    feed.scrollIntoView({ behavior: 'smooth' });
  });

  composeTa.addEventListener('focus', () => {
    if (!user) { composeTa.blur(); openModal(); }
  });

  /* ── Search & Filter ── */
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.dataset.filter;
      renderFeed();
    });
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim().toLowerCase();
    renderFeed();
  });

  /* ── HTML Escape ── */
  function esc(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* ── Initial Render ── */
  renderAuthZone();
  renderFeed();

})();
