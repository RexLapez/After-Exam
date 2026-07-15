/* ─────────────────────────────────────────────────────────────
   community.js  –  After Exam Community Q&A Engine (Supabase Relational version)
   ─────────────────────────────────────────────────────────── */

import { supabase } from './supabase.js';


/* ── Auth State & Elements ── */
let sessionUser = null;
let profile = null;
let signUpMode = false;
let posts = [];
let communitiesList = [];
let activeFilter = 'all';
let searchQuery = '';
let currentSort = 'newest';

const authZone = document.getElementById('auth-zone');
const authModal = document.getElementById('auth-modal');
const authForm = document.getElementById('auth-form');
const modalTitle = document.getElementById('modal-title');
const modalSub = document.getElementById('modal-sub');
const authBtn = document.getElementById('auth-btn');
const toggleLink = document.getElementById('toggle-link');
const toggleText = document.getElementById('toggle-text');

const fieldUser = document.getElementById('field-username');
const fieldEmail = document.getElementById('field-email');
const fieldPass = document.getElementById('field-password');
const composeAvatar = document.getElementById('compose-avatar');
const usernameFieldGroup = document.getElementById('username-field-group');
const authErrorMsg = document.getElementById('auth-error-msg');

function renderAuthZone() {
  if (sessionUser && profile) {
    const dispName = profile.display_name || profile.username || 'User';
    authZone.innerHTML = `
      <div class="user-pill" id="user-pill">
        <div class="pill-avatar">${dispName.charAt(0).toUpperCase()}</div>
        <span>${dispName}</span>
      </div>`;
    document.getElementById('user-pill').addEventListener('click', async () => {
      if (confirm('Log out from Community?')) {
        const { error } = await supabase.auth.signOut();
        if (error) alert(error.message);
      }
    });
    composeAvatar.textContent = dispName.charAt(0).toUpperCase();
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
  authErrorMsg.style.display = 'none';
  authErrorMsg.textContent = '';
  modalTitle.textContent = isSignUp ? 'Create Account' : 'Welcome Back';
  modalSub.textContent = isSignUp
    ? 'Sign up to post questions and reply to community discussions.'
    : 'Log in to post questions and reply to discussions.';
  authBtn.textContent = isSignUp ? 'Create Account' : 'Log In';
  toggleText.textContent = isSignUp ? 'Already have an account?' : "Don't have an account?";
  toggleLink.textContent = isSignUp ? 'Log In' : 'Sign Up';

  if (isSignUp) {
    usernameFieldGroup.style.display = 'flex';
    fieldUser.required = true;
  } else {
    usernameFieldGroup.style.display = 'none';
    fieldUser.required = false;
  }

  authModal.classList.add('show');
  if (isSignUp) {
    fieldUser.focus();
  } else {
    fieldEmail.focus();
  }
}

function closeModal() {
  authModal.classList.remove('show');
  authForm.reset();
}

document.getElementById('modal-close').addEventListener('click', closeModal);
authModal.addEventListener('click', (e) => { if (e.target === authModal) closeModal(); });
toggleLink.addEventListener('click', () => openModal(!signUpMode));

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  authErrorMsg.style.display = 'none';
  authErrorMsg.textContent = '';

  const email = fieldEmail.value.trim();
  const password = fieldPass.value.trim();
  const username = fieldUser.value.trim();

  authBtn.disabled = true;
  authBtn.textContent = signUpMode ? 'Creating Account...' : 'Logging In...';

  try {
    if (signUpMode) {
      if (!username) throw new Error('Username is required.');
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          }
        }
      });
      if (error) throw error;
      if (data.user && !data.session) {
        alert('Registration successful! Please check your inbox to confirm your email.');
        closeModal();
        return;
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
    }
    closeModal();
  } catch (err) {
    authErrorMsg.textContent = err.message;
    authErrorMsg.style.display = 'block';
  } finally {
    authBtn.disabled = false;
    authBtn.textContent = signUpMode ? 'Create Account' : 'Log In';
  }
});

/* ── Supabase Loader Functions ── */
function stringToColor(str) {
  const colors = ['#D14836', '#F97316', '#EA580C', '#EAB308', '#F59E0B', '#EF4444'];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

function formatTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return 'Just now';

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  return `${days} days ago`;
}

function getMockPosts() {
  return [
    {
      id: 'mock-1',
      title: 'Can a PCB student do BCA? I don\'t have Maths in Class 12.',
      author: 'Priya_NEET25',
      authorId: 'mock-user-1',
      isMod: false,
      category: 'computing',
      categoryLabel: '💻 Computing & Tech',
      color: '#F97316',
      avatar: 'P',
      avatarColor: '#D14836',
      text: 'Hey everyone! I took Biology in Class 12 and really want to get into software development. I read that some universities offer BCA for non-math students. Is this true, and will I face difficulty in coding?',
      upvotes: 14,
      voters: [],
      time: '2 hours ago',
      replies: [
        {
          id: 101,
          author: 'Amit_Tech',
          isMod: false,
          color: '#10b981',
          time: '2 hours ago',
          text: 'Yes, many universities like Symbiosis, Christ, and various state universities offer admission to PCB students for BCA. You will have to study basic math in the first semester, but if you practice programming daily, you will do great!'
        },
        {
          id: 102,
          author: 'Neha_Biology',
          isMod: false,
          color: '#f59e0b',
          time: '1 hour ago',
          text: 'I am in my 2nd year of BCA now and I had PCB. Coding was new to me, but starting early with Python really helped.'
        }
      ]
    },
    {
      id: 'mock-2',
      title: 'B.Tech Biotech vs B.Pharm - Which has better job opportunities in India?',
      author: 'Rohan_S',
      authorId: 'mock-user-2',
      isMod: false,
      category: 'biotech',
      categoryLabel: '🧬 Biotech & Applied',
      color: '#10b981',
      avatar: 'R',
      avatarColor: '#3b82f6',
      text: 'Confused between these two. I want a stable career after Class 12. Both sound interesting but I want to know about industrial placement packages in India.',
      upvotes: 8,
      voters: [],
      time: '4 hours ago',
      replies: [
        {
          id: 201,
          author: 'Dr_Anoop',
          isMod: true,
          color: '#ef4444',
          time: '3 hours ago',
          text: 'B.Pharm is highly regulated and offers immediate licensing. You can work in QA/QC, production, or open a retail store. B.Tech Biotech is more research-oriented; placements are good in top tier colleges (VIT, Manipal), but you usually need MS/PhD to get high-paying R&D roles.'
        }
      ]
    },
    {
      id: 'mock-3',
      title: 'How difficult is BVSc (Veterinary Science) compared to MBBS?',
      author: 'Ananya_K',
      authorId: 'mock-user-3',
      isMod: false,
      category: 'medical',
      categoryLabel: '🩺 Medical & Allied',
      color: '#D14836',
      avatar: 'A',
      avatarColor: '#F97316',
      text: 'I got a decent rank in NEET but might miss MBBS. I love animals and am considering BVSc. Is the course load similar to MBBS?',
      upvotes: 11,
      voters: [],
      time: '5 hours ago',
      replies: [
        {
          id: 301,
          author: 'Vety_Student',
          isMod: false,
          color: '#F97316',
          time: '4 hours ago',
          text: 'The syllabus is actually wider because you study anatomy and diseases of multiple species (canine, bovine, feline, equine etc.) instead of just humans. But it is incredibly rewarding and has fantastic government job opportunities!'
        }
      ]
    }
  ];
}

async function fetchCommunities() {
  try {
    let { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('is_active', true);

    if (error) {
      console.warn("Supabase fetch error for communities, using local defaults:", error.message);
      data = null;
    }

    if (!data || data.length === 0) {
      communitiesList = [
        { id: 1, name: 'Medical & Allied', slug: 'medical', color: '#D14836', icon: '🩺', is_active: true },
        { id: 2, name: 'Biotech & Applied', slug: 'biotech', color: '#22C55E', icon: '🧬', is_active: true },
        { id: 3, name: 'Computing & Tech', slug: 'computing', color: '#F97316', icon: '💻', is_active: true }
      ];
    } else {
      communitiesList = data;
    }

    const composeCat = document.getElementById('compose-cat');
    if (composeCat) {
      composeCat.innerHTML = communitiesList.map(c => `
        <option value="${c.id}">${c.icon} ${c.name}</option>
      `).join('');
    }
  } catch (err) {
    console.error('Error fetching communities:', err);
  }
}

async function fetchAndRenderFeed() {
  try {
    let { data, error } = await supabase
      .from('community_posts')
      .select(`
        id,
        title,
        content,
        community_id,
        created_at,
        author_id,
        author:profiles!community_posts_author_id_fkey(username, display_name, is_moderator),
        community:communities!community_posts_community_id_fkey(name, slug, color, icon),
        post_comments(
          id,
          content,
          created_at,
          author:profiles!post_comments_author_id_fkey(username, display_name, is_moderator)
        ),
        post_reactions(
          user_id
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn("Supabase fetch error, using local fallback posts:", error.message);
      data = null;
    }

    if (!data || data.length === 0) {
      // Use fallback mock posts if database is empty/inaccessible
      posts = getMockPosts();
    } else {
      posts = data.map(p => {
        const replies = (p.post_comments || [])
          .map(r => ({
            id: r.id,
            author: r.author?.display_name || r.author?.username || 'Anonymous',
            isMod: r.author?.is_moderator || false,
            color: stringToColor(r.author?.username || 'anon'),
            time: formatTimeAgo(r.created_at),
            text: r.content
          }))
          .sort((a, b) => a.id - b.id); // oldest replies first

        const voters = (p.post_reactions || []).map(v => v.user_id);
        const authorName = p.author?.display_name || p.author?.username || 'Anonymous';

        return {
          id: p.id,
          title: p.title || 'Untitled Discussion',
          author: authorName,
          authorId: p.author_id,
          isMod: p.author?.is_moderator || false,
          category: p.community?.slug || 'medical',
          categoryLabel: p.community ? `${p.community.icon} ${p.community.name}` : '🩺 Medical & Allied',
          color: p.community?.color || '#F97316',
          avatar: authorName.charAt(0).toUpperCase(),
          avatarColor: stringToColor(p.author?.username || 'anon'),
          text: p.content,
          upvotes: voters.length,
          voters: voters,
          replies: replies
        };
      });
    }

    renderFeed();
  } catch (err) {
    console.error('Error fetching community feed, using mock posts fallback:', err);
    posts = getMockPosts();
    renderFeed();
  }
}

/* ── Render Feed ── */
const feed = document.getElementById('feed');

function renderFeed() {
  let filtered = posts.filter(p => {
    const matchCat = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = !searchQuery || p.text.toLowerCase().includes(searchQuery) || p.title.toLowerCase().includes(searchQuery) || p.author.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  // Apply sorting filters
  if (currentSort === 'trending') {
    filtered.sort((a, b) => (b.upvotes + b.replies.length) - (a.upvotes + a.replies.length));
  } else if (currentSort === 'helpful') {
    filtered.sort((a, b) => b.upvotes - a.upvotes);
  } else if (currentSort === 'answered') {
    filtered.sort((a, b) => b.replies.length - a.replies.length);
  } else {
    // Newest is default (posts are loaded reverse chronological)
  }

  if (!filtered.length) {
    feed.innerHTML = `<div class="empty-state">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <h3>No discussions found</h3>
      <p>Try a different filter or be the first to ask!</p>
    </div>`;
    return;
  }

  feed.innerHTML = filtered.map(p => {
    const voted = sessionUser && p.voters && p.voters.includes(sessionUser.id);
    const isAuthor = sessionUser && p.authorId === sessionUser.id;

    // Custom Verified Badges based on author profiles
    let badgeHTML = '';
    const authorLower = p.author.toLowerCase();
    if (authorLower.includes('devika') || authorLower.includes('anoop') || authorLower.includes('doctor') || p.isMod) {
      badgeHTML = '<span class="alumni-badge" style="background:rgba(209,72,54,0.1);color:#D14836;border:1px solid rgba(209,72,54,0.2);margin-left:0.4rem;">✨ Mentor</span>';
    } else if (authorLower.includes('rohan') || authorLower.includes('aniket') || authorLower.includes('neha') || authorLower.includes('alumni')) {
      badgeHTML = '<span class="alumni-badge" style="background:rgba(34,197,94,0.1);color:#22C55E;border:1px solid rgba(34,197,94,0.2);margin-left:0.4rem;">🎓 Verified Alumni</span>';
    } else if (authorLower.includes('aarav') || authorLower.includes('priya') || authorLower.includes('rep')) {
      badgeHTML = '<span class="rep-badge" style="background:rgba(6,182,212,0.1);color:#06B6D4;border:1px solid rgba(6,182,212,0.2);margin-left:0.4rem;">🏛️ College Rep</span>';
    }

    // Engagement stats
    const readTime = Math.max(1, Math.ceil(p.text.split(' ').length / 200)) + ' min read';
    const views = Math.abs(p.title.length * 7 + 12) + ' views';

    return `
    <div class="post-card" id="card-${p.id}">
      <div class="post-card-header">
        <div class="post-avatar" style="background:${p.avatarColor}20;border:1.5px solid ${p.avatarColor}40;color:${p.avatarColor};">${p.avatar}</div>
        <div class="post-meta">
          <div class="post-author" style="display:flex;align-items:center;flex-wrap:wrap;gap:0.25rem;">
            ${esc(p.author)}
            ${badgeHTML}
          </div>
          <div class="post-time">${p.time} • ${readTime} • ${views}</div>
        </div>
        <span class="cat-pill" style="background:${p.color}08;color:${p.color};border:1px solid ${p.color}20;">${p.categoryLabel}</span>
      </div>
      <h3 class="post-title" style="font-family:'Outfit',sans-serif;font-size:1.15rem;font-weight:700;color:#fff;margin:0.75rem 0 0.5rem;line-height:1.4;">${esc(p.title)}</h3>
      <p class="post-body" style="margin-top:0.25rem;">${esc(p.text)}</p>
      <div class="post-actions">
        <button class="act-btn ${voted ? 'upvoted' : ''}" data-upvote="${p.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="${voted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
          <span class="upvote-count">${p.upvotes}</span>
        </button>
        <button class="act-btn" data-toggle="${p.id}">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${p.replies.length} ${p.replies.length === 1 ? 'Reply' : 'Replies'}
        </button>
        <button class="act-btn" data-bookmark="${p.id}">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          Bookmark
        </button>
        ${isAuthor ? `
          <button class="act-btn" data-edit="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"/></svg>
            Edit
          </button>
          <button class="act-btn" data-delete="${p.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            Delete
          </button>
        ` : ''}
      </div>
      <div class="replies-section" id="replies-${p.id}">
        <div class="replies-list">
          ${p.replies.map(r => {
            let rBadgeHTML = '';
            const rAuthorLower = r.author.toLowerCase();
            if (rAuthorLower.includes('devika') || rAuthorLower.includes('anoop') || rAuthorLower.includes('doctor') || r.isMod) {
              rBadgeHTML = '<span class="alumni-badge" style="background:rgba(209,72,54,0.1);color:#D14836;border:1px solid rgba(209,72,54,0.2);margin-left:0.4rem;padding:0.05rem 0.35rem;font-size:0.58rem;">✨ Mentor</span>';
            } else if (rAuthorLower.includes('rohan') || rAuthorLower.includes('aniket') || rAuthorLower.includes('neha')) {
              rBadgeHTML = '<span class="alumni-badge" style="background:rgba(34,197,94,0.1);color:#22C55E;border:1px solid rgba(34,197,94,0.2);margin-left:0.4rem;padding:0.05rem 0.35rem;font-size:0.58rem;">🎓 Verified Alumni</span>';
            }
            return `
            <div class="reply-item">
              <div class="reply-avatar" style="background:${r.color}22;border:1.5px solid ${r.color}40;color:${r.color};">${r.author.charAt(0)}</div>
              <div class="reply-content">
                <div class="reply-meta" style="display:flex;align-items:center;flex-wrap:wrap;gap:0.25rem;">
                  <span class="reply-author">${esc(r.author)}</span>
                  ${rBadgeHTML}
                  <span class="reply-time">${r.time}</span>
                </div>
                <p class="reply-text">${esc(r.text)}</p>
              </div>
            </div>`;
          }).join('')}
        </div>
        <div class="reply-compose">
          <input type="text" class="reply-input" placeholder="${sessionUser ? 'Write a reply…' : 'Login to reply…'}" data-reply-for="${p.id}">
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
  feed.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => startInlineEdit(btn.dataset.edit));
  });
  feed.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => handleDeletePost(btn.dataset.delete));
  });
  feed.querySelectorAll('.reply-input').forEach(inp => {
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleReply(inp.dataset.replyFor, inp);
      }
    });
    inp.addEventListener('focus', () => {
      if (!sessionUser) { inp.blur(); openModal(); }
    });
  });
}

/* ── Upvote / React ── */
async function handleUpvote(id) {
  if (!sessionUser) { openModal(); return; }
  const p = posts.find(x => x.id == id);
  if (!p) return;

  const idx = p.voters.indexOf(sessionUser.id);
  const voted = idx !== -1;

  try {
    if (voted) {
      const { error } = await supabase
        .from('post_reactions')
        .delete()
        .eq('user_id', sessionUser.id)
        .eq('post_id', id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('post_reactions')
        .insert({
          user_id: sessionUser.id,
          post_id: id,
          reaction_type: 'upvote'
        });
      if (error) throw error;
    }
    await fetchAndRenderFeed();
    const sec = document.getElementById(`replies-${id}`);
    if (sec) sec.classList.add('open');
  } catch (err) {
    console.warn('Failed to upvote in Supabase, updating locally:', err.message);
    if (voted) {
      p.voters.splice(idx, 1);
      p.upvotes = p.voters.length;
    } else {
      p.voters.push(sessionUser.id);
      p.upvotes = p.voters.length;
    }
    renderFeed();
    const sec = document.getElementById(`replies-${id}`);
    if (sec) sec.classList.add('open');
  }
}

/* ── Reply / Comment ── */
async function handleReply(id, inp) {
  if (!sessionUser) { openModal(); return; }
  const text = inp ? inp.value.trim() : '';
  if (!text) return;

  try {
    const { error } = await supabase
      .from('post_comments')
      .insert({
        post_id: id,
        author_id: sessionUser.id,
        content: text
      });

    if (error) throw error;
    if (inp) inp.value = '';
    await fetchAndRenderFeed();
    const sec = document.getElementById(`replies-${id}`);
    if (sec) sec.classList.add('open');
  } catch (err) {
    console.warn('Failed to reply in Supabase, updating locally:', err.message);
    const post = posts.find(x => x.id == id);
    if (post) {
      post.replies.push({
        id: Date.now(),
        author: profile?.display_name || profile?.username || 'You',
        isMod: profile?.is_moderator || false,
        color: '#a78bfa',
        time: 'Just now',
        text: text
      });
    }
    if (inp) inp.value = '';
    renderFeed();
    const sec = document.getElementById(`replies-${id}`);
    if (sec) sec.classList.add('open');
  }
}

/* ── Edit / Delete Post ── */
function startInlineEdit(id) {
  const card = document.getElementById(`card-${id}`);
  if (!card) return;

  const post = posts.find(x => x.id == id);
  if (!post) return;

  const titleEl = card.querySelector('.post-title');
  const bodyEl = card.querySelector('.post-body');
  const actionsEl = card.querySelector('.post-actions');

  if (card.classList.contains('editing')) return;
  card.classList.add('editing');

  const titleInp = document.createElement('input');
  titleInp.type = 'text';
  titleInp.className = 'edit-title-input';
  titleInp.value = post.title;

  const bodyText = document.createElement('textarea');
  bodyText.className = 'edit-body-textarea';
  bodyText.value = post.text;

  const editActions = document.createElement('div');
  editActions.className = 'edit-actions';

  const saveBtn = document.createElement('button');
  saveBtn.className = 'edit-save-btn';
  saveBtn.textContent = 'Save';
  saveBtn.addEventListener('click', () => handleSaveEdit(id, titleInp.value.trim(), bodyText.value.trim(), saveBtn));

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'edit-cancel-btn';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.addEventListener('click', () => {
    card.classList.remove('editing');
    renderFeed();
  });

  editActions.appendChild(saveBtn);
  editActions.appendChild(cancelBtn);

  titleEl.style.display = 'none';
  bodyEl.style.display = 'none';
  actionsEl.style.display = 'none';

  card.insertBefore(titleInp, actionsEl);
  card.insertBefore(bodyText, actionsEl);
  card.insertBefore(editActions, actionsEl);
}

async function handleSaveEdit(id, newTitle, newContent, saveBtn) {
  if (!newTitle) { alert('Title cannot be empty'); return; }
  if (!newContent) { alert('Content cannot be empty'); return; }

  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';

  try {
    const { error } = await supabase
      .from('community_posts')
      .update({
        title: newTitle,
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) throw error;
    await fetchAndRenderFeed();
  } catch (err) {
    alert('Failed to save changes: ' + err.message);
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save';
  }
}

async function handleDeletePost(id) {
  if (!confirm('Are you sure you want to delete this discussion? This action cannot be undone.')) return;

  try {
    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    await fetchAndRenderFeed();
  } catch (err) {
    alert('Failed to delete post: ' + err.message);
  }
}

/* ── Post New Question ── */
const postBtn = document.getElementById('post-btn');
const composeTitle = document.getElementById('compose-title');
const composeTa = document.getElementById('compose-textarea');
const composeCat = document.getElementById('compose-cat');

postBtn.addEventListener('click', async () => {
  if (!sessionUser) { openModal(); return; }
  const title = composeTitle.value.trim();
  const text = composeTa.value.trim();
  if (!title) { composeTitle.focus(); return; }
  if (!text) { composeTa.focus(); return; }

  postBtn.disabled = true;
  postBtn.textContent = 'Posting...';

  try {
    const { error } = await supabase
      .from('community_posts')
      .insert({
        author_id: sessionUser.id,
        community_id: parseInt(composeCat.value),
        title: title,
        content: text
      });

    if (error) throw error;
    composeTitle.value = '';
    composeTa.value = '';
    await fetchAndRenderFeed();
    feed.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    console.warn('Failed to post to Supabase, saving locally:', err.message);
    const newPostId = 'local-' + Date.now();
    const targetCommunity = communitiesList.find(c => c.id == composeCat.value);
    const newPost = {
      id: newPostId,
      title: title,
      author: profile?.display_name || profile?.username || 'You',
      authorId: sessionUser.id,
      isMod: profile?.is_moderator || false,
      category: targetCommunity?.slug || 'medical',
      categoryLabel: targetCommunity
        ? `${targetCommunity.icon} ${targetCommunity.name}`
        : '🩺 Medical & Allied',
      color: targetCommunity?.color || '#F97316',
      avatar: (profile?.display_name || profile?.username || 'You').charAt(0).toUpperCase(),
      avatarColor: '#D14836',
      text: text,
      upvotes: 0,
      voters: [],
      replies: []
    };
    posts.unshift(newPost);
    renderFeed();
    composeTitle.value = '';
    composeTa.value = '';
    feed.scrollIntoView({ behavior: 'smooth' });
  } finally {
    postBtn.disabled = false;
    postBtn.textContent = 'Post Question';
  }
});

composeTitle.addEventListener('focus', () => {
  if (!sessionUser) { composeTitle.blur(); openModal(); }
});

composeTa.addEventListener('focus', () => {
  if (!sessionUser) { composeTa.blur(); openModal(); }
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

/* ── Listen for Auth Changes & Persistent Session ── */
supabase.auth.onAuthStateChange(async (event, session) => {
  sessionUser = session?.user || null;
  if (sessionUser) {
    // Fetch profile details
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionUser.id)
      .single();

    if (!error && data) {
      profile = data;
    } else {
      profile = {
        id: sessionUser.id,
        username: sessionUser.user_metadata?.username || 'user',
        display_name: sessionUser.user_metadata?.username || 'User',
        is_moderator: false
      };
    }
  } else {
    profile = null;
  }
  renderAuthZone();
  await fetchCommunities();
  await fetchAndRenderFeed();
});

/* ── Header Sticky Scroll & Mobile Menu Toggles ── */
{
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const backdrop = document.getElementById('nav-backdrop');

  const closeMenu = () => {
    if (nav) nav.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    if (menuToggle) {
      menuToggle.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  };

  // Mobile menu toggle
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const isExpanded = nav.classList.contains('active');
      if (backdrop) backdrop.classList.toggle('active', isExpanded);
      document.body.style.overflow = isExpanded ? 'hidden' : '';
      menuToggle.innerHTML = isExpanded
        ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Bind Sorters click event listeners
  const sortWrapper = document.getElementById('feed-sort-wrapper');
  if (sortWrapper) {
    sortWrapper.querySelectorAll('.sort-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        sortWrapper.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.getAttribute('data-sort');
        renderFeed();
      });
    });
  }

  // Bind tags click event listeners inside sidebar
  document.querySelectorAll('.sidebar-widget .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.sidebar-widget .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      // sync with main filter buttons
      document.querySelectorAll('.filter-row > .chip').forEach(c => {
        c.classList.toggle('active', c.getAttribute('data-filter') === activeFilter);
      });
      renderFeed();
    });
  });
}
