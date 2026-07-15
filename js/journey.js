/**
 * AfterExam — Student Journey scroll-driven animation
 * Reuses the GSAP SVG stroke-dashoffset technique from the reference demo.
 * Adapted: horizontal layout, dark theme, glowing particle, milestone card reveals.
 * Added: gsap.matchMedia for clean mobile viewport resets.
 */
(function () {
  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const section  = document.getElementById('journey');
    const pathEl   = document.getElementById('journey-path');
    const glowEl   = document.getElementById('journey-glow-path');
    const cards    = document.querySelectorAll('.journey-card');
    const labels   = document.querySelectorAll('.journey-label');

    if (!section || !pathEl) return;

    let mm = gsap.matchMedia();

    // Desktop: width > 768px
    // Desktop: width > 768px
    mm.add("(min-width: 769px)", () => {
      const pathLength = pathEl.getTotalLength();

      // Initialise stroke-draw on both layers
      [pathEl, glowEl].forEach(p => {
        if (!p) return;
        p.style.strokeDasharray  = pathLength;
        p.style.strokeDashoffset = pathLength;
      });

      // Combined Progress-linked timeline that drives both path draws + pinning with spacing
      const proxyObj = { progress: 0 };
      const scrollAnim = gsap.to(proxyObj, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start:   'top top',
          end:     'bottom bottom',
          pin:     '#journey-sticky',
          pinSpacing: true, // Allocates padding to pin spacer so no overlapping happens with subsequent sections
          scrub:   1,
          onUpdate(self) {
            const p = self.progress;

            // Draw dim path
            if (pathEl) pathEl.style.strokeDashoffset = pathLength * (1 - p);
            // Draw bright glow trail
            if (glowEl) glowEl.style.strokeDashoffset = pathLength * (1 - p);

            // Milestone activation thresholds (0 to 1)
            const thresholds = [0.04, 0.27, 0.50, 0.73, 0.94];
            thresholds.forEach((thresh, i) => {
              const card  = cards[i];
              const label = labels[i];
              if (!card) return;
              if (p >= thresh) {
                card.classList.add('visible');
                if (label) label.classList.add('active-label');
              } else {
                card.classList.remove('visible');
                if (label) label.classList.remove('active-label');
              }
            });
          },
        },
      });

      const st = scrollAnim.scrollTrigger;
      const thresholds = [0.04, 0.27, 0.50, 0.73, 0.94];

      const navigateToStep = (index) => {
        if (!st) return;
        const progress = thresholds[index];
        const start = st.start;
        const end = st.end;
        const targetScroll = start + progress * (end - start);
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
      };

      labels.forEach((label, idx) => {
        label.style.cursor = 'pointer';
        label.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          navigateToStep(idx);
        });
      });

      cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
          // If width is desktop, we smooth scroll. Otherwise let it navigate to the href.
          if (window.innerWidth > 768) {
            e.preventDefault();
            e.stopPropagation();
            navigateToStep(idx);
          }
        });
      });
    });

    // Mobile: width <= 768px
    mm.add("(max-width: 768px)", () => {
      // Ensure all items are fully active/visible immediately in mobile vertical stack
      cards.forEach(card => card.classList.add('visible'));
      labels.forEach(label => label.classList.add('active-label'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
