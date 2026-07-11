/**
 * typewriter.js — Premium typewriter animation with zero layout shift.
 *
 * Strategy to eliminate layout shift:
 *   The hero sentence is center-aligned. When the word changes length,
 *   the entire line re-centers and appears to jump. To prevent this we:
 *
 *   1. Wrap the animated word in a `slot` element (inline-block).
 *   2. On init (and on window resize), we probe-render each word off-screen
 *      using the exact computed font properties of the word element.
 *   3. We set `slot.style.minWidth` to the widest measurement.
 *
 *   Result: total line-2 width = len("It didn't measure your ") + slot_width
 *           = CONSTANT regardless of which word is displayed.
 *           The line never re-centers. No layout shift.
 *
 * Usage:
 *   import { initTypewriter } from '/js/typewriter.js';
 *   const cleanup = initTypewriter(wordEl, slotEl, { words: [...] });
 *   // Call cleanup() to stop all timers and listeners.
 */

/**
 * @param {HTMLElement} wordEl  — the <span> where typed characters appear
 * @param {HTMLElement} slotEl  — the inline-block wrapper whose min-width is reserved
 * @param {object}      options
 * @param {string[]}    options.words        — words to cycle through
 * @param {number}      options.typeSpeed    — ms per character while typing   (default 70)
 * @param {number}      options.deleteSpeed  — ms per character while deleting (default 40)
 * @param {number}      options.pauseAfter   — ms to pause after word is complete (default 2300)
 * @param {number}      options.pauseBefore  — ms to pause before typing next word (default 300)
 * @returns {() => void} cleanup — call to stop all timers / listeners
 */
export function initTypewriter(wordEl, slotEl, options = {}) {
  const {
    words       = ['future', 'potential', 'curiosity', 'creativity',
                   'resilience', 'ambition', 'worth'],
    typeSpeed   = 70,
    deleteSpeed = 40,
    pauseAfter  = 2300,
    pauseBefore = 300,
  } = options;

  if (!wordEl || !slotEl || words.length === 0) return () => {};

  // ─── Slot width reservation ──────────────────────────────────────────────

  /**
   * Measure the actual rendered pixel width of every word using an off-screen
   * probe element that inherits the exact same computed font properties as
   * wordEl. Sets slotEl.style.minWidth to the widest result.
   */
  function reserveSlotWidth() {
    const computed = getComputedStyle(wordEl);
    const probe    = document.createElement('span');

    // Mirror every typographic property so the measurement is exact.
    probe.style.cssText = [
      'position:absolute',
      'top:-9999px',
      'left:-9999px',
      'visibility:hidden',
      'pointer-events:none',
      'white-space:nowrap',
      `font-family:${computed.fontFamily}`,
      `font-size:${computed.fontSize}`,
      `font-weight:${computed.fontWeight}`,
      `font-style:${computed.fontStyle}`,
      `letter-spacing:${computed.letterSpacing}`,
    ].join(';');

    document.body.appendChild(probe);

    let maxWidth = 0;
    for (const word of words) {
      probe.textContent = word;
      maxWidth = Math.max(maxWidth, probe.getBoundingClientRect().width);
    }

    document.body.removeChild(probe);

    // Add 4 px buffer — gradient clip can add a sub-pixel sliver.
    slotEl.style.minWidth = `${Math.ceil(maxWidth) + 4}px`;
  }

  // Initial measurement — must happen after fonts have loaded.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(reserveSlotWidth);
  } else {
    reserveSlotWidth();
  }

  // Re-measure on resize (font-size uses clamp() so it changes with viewport).
  let resizeTimer;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(reserveSlotWidth, 150);
  }
  window.addEventListener('resize', onResize);

  // ─── Typewriter state machine ─────────────────────────────────────────────

  let wordIndex  = 0;
  let charIndex  = words[0].length;   // start with first word already rendered
  let isDeleting = false;
  let timerId    = null;
  let destroyed  = false;

  // Render first word immediately so there is no flash of empty text.
  wordEl.textContent = words[0];

  function tick() {
    if (destroyed) return;

    const current = words[wordIndex];

    if (!isDeleting) {
      // ── Typing ──────────────────────────────────────────────────────────
      charIndex++;
      wordEl.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        // Word complete → pause then start deleting.
        timerId = setTimeout(() => { isDeleting = true; tick(); }, pauseAfter);
        return;
      }

      // Subtle ±10 ms jitter makes it feel hand-typed, not robotic.
      timerId = setTimeout(tick, typeSpeed + (Math.random() * 20 - 10));

    } else {
      // ── Deleting ─────────────────────────────────────────────────────────
      charIndex--;
      wordEl.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        // Word erased → advance word, pause, then type next.
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        timerId    = setTimeout(tick, pauseBefore);
        return;
      }

      timerId = setTimeout(tick, deleteSpeed + (Math.random() * 10 - 5));
    }
  }

  // Start cycle: first word is already shown, so begin delete phase after pause.
  timerId = setTimeout(() => { isDeleting = true; tick(); }, pauseAfter);

  // ─── Cleanup ──────────────────────────────────────────────────────────────
  return function cleanup() {
    destroyed = true;
    clearTimeout(timerId);
    clearTimeout(resizeTimer);
    window.removeEventListener('resize', onResize);
  };
}
