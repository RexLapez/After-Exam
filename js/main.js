document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & Scroll Effects ---
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

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    // Change menu icon between hamburger and cross
    const isExpanded = nav.classList.contains('active');
    menuToggle.innerHTML = isExpanded
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });
  });

  // --- FAQs Accordion ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all first
      faqItems.forEach(i => i.classList.remove('active'));
      // Toggle current
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });





  // --- Scroll-Reveal Observer ---
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12 // Trigger when 12% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

  // --- Career Streams Tab Switcher ---
  const domainTabs = document.querySelectorAll('.domain-tab');
  const domainGroups = document.querySelectorAll('.domain-group');

  if (domainTabs.length > 0 && domainGroups.length > 0) {
    domainTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetDomain = tab.getAttribute('data-domain');

        // Deactivate all tabs
        domainTabs.forEach(t => t.classList.remove('active'));
        // Activate current tab
        tab.classList.add('active');

        // Toggle active domain group
        domainGroups.forEach(group => {
          if (group.id === `domain-${targetDomain}`) {
            group.classList.add('active');

            // Re-trigger scroll reveal active state for children of active group
            const reveals = group.querySelectorAll('.reveal');
            reveals.forEach(el => el.classList.add('active'));
          } else {
            group.classList.remove('active');
          }
        });
      });
    });
  }

  // --- Premium Stats Observer & Counter Animation ---
  const statCols = document.querySelectorAll('.reveal-stat');
  if (statCols.length > 0) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const col = entry.target;
          col.classList.add('revealed');
          
          const numEl = col.querySelector('.stat-number');
          const targetNum = parseInt(col.getAttribute('data-target') || '0', 10);
          
          if (numEl && targetNum > 0) {
            let startTimestamp = null;
            const duration = 1500; // 1.5s
            
            const step = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = Math.min((timestamp - startTimestamp) / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
              numEl.textContent = Math.floor(easeProgress * targetNum);
              
              if (progress < 1) {
                window.requestAnimationFrame(step);
              } else {
                numEl.textContent = targetNum;
              }
            };
            window.requestAnimationFrame(step);
          }
          
          observer.unobserve(col); // Animate only once
        }
      });
    }, {
      threshold: 0.1
    });

    statCols.forEach(col => statsObserver.observe(col));
  }
});
