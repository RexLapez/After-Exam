/**
 * wordCycler.js — Smooth blur-fade word cycling animation.
 *
 * Replaces the typewriter effect with an elegant vertical blur-slide
 * transition: each word softly lifts and blurs away while the next
 * descends and sharpens into focus. No cursor, no per-character logic.
 *
 * Layout-shift prevention:
 *   The animated word lives inside a fixed-width `slotEl`. On init (and
 *   on resize), we probe-render every word off-screen using the element's
 *   exact computed font properties, then set slotEl.style.minWidth to the
 *   widest measurement. The total width of line 2 is therefore constant —
 *   centering never shifts regardless of which word is displayed.
 *
 * Usage:
 *   import { initWordCycler } from '/js/wordCycler.js';
 *   const stop = initWordCycler(wordEl, slotEl, { words: [...] });
 *   stop(); // cancels all timers and listeners
 */

/**
 * @param {HTMLElement} wordEl   — the <span> whose textContent is swapped
 * @param {HTMLElement} slotEl   — inline-block wrapper; receives min-width
 * @param {object}      options
 * @param {string[]}    options.words       — words to cycle through
 * @param {number}      options.holdMs      — ms each word is fully visible (default 2800)
 * @param {number}      options.exitMs      — ms for exit animation          (default 350)
 * @param {number}      options.enterMs     — ms for enter animation         (default 450)
 * @returns {() => void} stop — call to cancel all timers / event listeners
 */
export function initWordCycler(wordEl, slotEl, options = {}) {
  const {
    words   = ['future', 'potential', 'curiosity', 'creativity',
               'resilience', 'ambition', 'worth'],
    holdMs  = 2800,
    exitMs  = 350,
    enterMs = 450,
  } = options;

  if (!wordEl || !slotEl || words.length === 0) return () => {};

  // ── CSS custom properties for animation durations ──────────────────────
  // These let the CSS @keyframes stay in sync without hardcoding numbers.
  wordEl.style.setProperty('--exit-ms',  `${exitMs}ms`);
  wordEl.style.setProperty('--enter-ms', `${enterMs}ms`);

  // ── Slot width reservation ─────────────────────────────────────────────
  function reserveSlotWidth() {
    const computed = getComputedStyle(wordEl);
    const probe    = document.createElement('span');

    probe.style.cssText = [
      'position:absolute', 'top:-9999px', 'left:-9999px',
      'visibility:hidden', 'pointer-events:none', 'white-space:nowrap',
      `font-family:${computed.fontFamily}`,
      `font-size:${computed.fontSize}`,
      `font-weight:${computed.fontWeight}`,
      `font-style:${computed.fontStyle}`,
      `letter-spacing:${computed.letterSpacing}`,
    ].join(';');

    document.body.appendChild(probe);
    let maxW = 0;
    for (const w of words) { probe.textContent = w; maxW = Math.max(maxW, probe.getBoundingClientRect().width); }
    document.body.removeChild(probe);

    slotEl.style.minWidth = `${Math.ceil(maxW) + 4}px`;
  }

  // Wait for fonts before measuring (Space Grotesk is loaded async)
  if (document.fonts?.ready) {
    document.fonts.ready.then(reserveSlotWidth);
  } else {
    reserveSlotWidth();
  }

  // Re-measure on resize — font-size uses clamp() so it changes with viewport
  let resizeTid;
  const onResize = () => { clearTimeout(resizeTid); resizeTid = setTimeout(reserveSlotWidth, 150); };
  window.addEventListener('resize', onResize);

  // ── Animation state machine ────────────────────────────────────────────
  let idx      = 0;
  let timerId  = null;
  let destroyed = false;

  // Render first word immediately — no flash of empty text
  wordEl.textContent = words[0];
  wordEl.dataset.state = 'visible';

  function cycle() {
    if (destroyed) return;

    // 1. Exit: blur + lift
    wordEl.dataset.state = 'exit';

    timerId = setTimeout(() => {
      if (destroyed) return;

      // 2. Swap the word text while invisible
      idx = (idx + 1) % words.length;
      wordEl.textContent = words[idx];

      // 3. Enter: descend + sharpen — force reflow so browser sees state change
      wordEl.dataset.state = 'enter';
      void wordEl.offsetWidth; // reflow

      requestAnimationFrame(() => {
        if (destroyed) return;
        wordEl.dataset.state = 'visible';

        // 4. Hold, then cycle again
        timerId = setTimeout(cycle, holdMs);
      });

    }, exitMs);
  }

  // Start first cycle after initial hold
  timerId = setTimeout(cycle, holdMs);

  // ── Cleanup ────────────────────────────────────────────────────────────
  return function stop() {
    destroyed = true;
    clearTimeout(timerId);
    clearTimeout(resizeTid);
    window.removeEventListener('resize', onResize);
  };
}
