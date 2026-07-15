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

  const backdrop = document.getElementById('nav-backdrop');

  const closeMenu = () => {
    nav.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
    menuToggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  };

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    // Change menu icon between hamburger and cross
    const isExpanded = nav.classList.contains('active');
    if (backdrop) backdrop.classList.toggle('active', isExpanded);
    document.body.style.overflow = isExpanded ? 'hidden' : '';
    menuToggle.innerHTML = isExpanded
      ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
      : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
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

  // --- Career Preview Carousel ---
  const careerTrack = document.getElementById('career-carousel-track');
  const careerPrev = document.getElementById('career-carousel-prev');
  const careerNext = document.getElementById('career-carousel-next');

  if (careerTrack && careerPrev && careerNext) {
    const scrollAmount = 340; // card width + gap
    careerPrev.addEventListener('click', () => {
      careerTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    careerNext.addEventListener('click', () => {
      careerTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // --- Testimonials Carousel Auto-scroll ---
  const testimonialTrack = document.getElementById('testimonials-track');
  const indicators = document.querySelectorAll('#testimonials-indicators .indicator');
  let currentSlide = 0;
  const slideCount = indicators.length;
  let autoScrollTimer = null;

  const goToSlide = (idx) => {
    currentSlide = idx;
    if (testimonialTrack) {
      const slideWidth = testimonialTrack.clientWidth;
      testimonialTrack.scrollTo({
        left: slideWidth * idx,
        behavior: 'smooth'
      });
    }
    indicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === idx);
    });
  };

  indicators.forEach((ind, idx) => {
    ind.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoScroll();
    });
  });

  const startAutoScroll = () => {
    autoScrollTimer = setInterval(() => {
      let nextSlide = (currentSlide + 1) % slideCount;
      goToSlide(nextSlide);
    }, 4500);
  };

  const resetAutoScroll = () => {
    clearInterval(autoScrollTimer);
    startAutoScroll();
  };

  if (slideCount > 0) {
    startAutoScroll();
    window.addEventListener('resize', () => {
      goToSlide(currentSlide);
    });
  }

  // --- FAQ Search Bar Logic ---
  const faqSearchInput = document.getElementById('faq-search-input');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const items = document.querySelectorAll('#faq .faq-item');
      
      items.forEach(item => {
        const questionText = item.querySelector('.faq-question').textContent.toLowerCase();
        const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
        
        if (questionText.includes(query) || answerText.includes(query)) {
          item.style.display = 'block';
          if (query.length > 0) {
            item.classList.add('active'); // auto-expand when searching
          } else {
            item.classList.remove('active');
          }
        } else {
          item.style.display = 'none';
        }
      });
    });
  }





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
