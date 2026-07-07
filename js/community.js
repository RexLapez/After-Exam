/* ─────────────────────────────────────────────────────────────
   community.js  –  After Exam Community Q&A Engine (Supabase Relational version)
   ─────────────────────────────────────────────────────────── */

import { supabase } from './supabase.js';

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

/* ── Auth State & Elements ── */
let sessionUser = null;
let profile = null;
let signUpMode = false;
let posts = [];
let communitiesList = [];
let activeFilter = 'all';
let searchQuery = '';

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
  const colors = ['#8b5cf6', '#06b6d4', '#a855f7', '#eab308', '#f97316', '#22d3ee'];
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

async function fetchCommunities() {
  try {
    const { data, error } = await supabase
      .from('communities')
      .select('*')
      .eq('is_active', true);

    if (error) throw error;
    communitiesList = data || [];

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
    const { data, error } = await supabase
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

    if (error) throw error;

    posts = (data || []).map(p => {
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
        color: p.community?.color || '#06b6d4',
        avatar: authorName.charAt(0).toUpperCase(),
        avatarColor: stringToColor(p.author?.username || 'anon'),
        text: p.content,
        upvotes: voters.length,
        voters: voters,
        replies: replies
      };
    });

    renderFeed();
  } catch (err) {
    console.error('Error fetching community feed:', err);
    feed.innerHTML = `<div class="empty-state">
      <h3 style="color:#ef4444;">Error loading community posts</h3>
      <p>${err.message}</p>
    </div>`;
  }
}

/* ── Render Feed ── */
const feed = document.getElementById('feed');

function renderFeed() {
  const filtered = posts.filter(p => {
    const matchCat = activeFilter === 'all' || p.category === activeFilter;
    const matchSearch = !searchQuery || p.text.toLowerCase().includes(searchQuery) || p.title.toLowerCase().includes(searchQuery) || p.author.toLowerCase().includes(searchQuery);
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
    const voted = sessionUser && p.voters && p.voters.includes(sessionUser.id);
    const isAuthor = sessionUser && p.authorId === sessionUser.id;
    return `
    <div class="post-card" id="card-${p.id}">
      <div class="post-card-header">
        <div class="post-avatar" style="background:${p.avatarColor}20;border:1.5px solid ${p.avatarColor}40;color:${p.avatarColor};">${p.avatar}</div>
        <div class="post-meta">
          <div class="post-author">
            ${esc(p.author)}
            ${p.isMod ? '<span class="mod-badge">Moderator</span>' : ''}
          </div>
          <div class="post-time">${p.time}</div>
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

  const voted = p.voters.includes(sessionUser.id);

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
    alert('Action failed: ' + err.message);
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
    alert('Failed to reply: ' + err.message);
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
    alert('Failed to post: ' + err.message);
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
