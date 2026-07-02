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



  // --- Stars & Shooting Stars Background ---
  const canvas = document.getElementById('stars-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStar = null;
    let lastShootingStarTime = Date.now();
    let nextSpawnDelay = Math.random() * 1000 + 4000; // 4 to 5 seconds delay

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    }

    function initStars() {
      stars = [];
      // Density-based star count
      const count = Math.floor((canvas.width * canvas.height) / 7000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.015 + 0.005,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    }

    function spawnShootingStar() {
      shootingStar = {
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.3,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 10 + 15,
        dx: Math.random() * 3 + 6, // diagonal vector X
        dy: Math.random() * 2 + 4, // diagonal vector Y
        opacity: 1,
        fadeSpeed: Math.random() * 0.02 + 0.01
      };
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw normal stars
      stars.forEach(star => {
        star.opacity += star.twinkleSpeed * star.direction;
        if (star.opacity >= 1) {
          star.opacity = 1;
          star.direction = -1;
        } else if (star.opacity <= 0) {
          star.opacity = 0;
          star.direction = 1;
          // Relocate to keep sky dynamic
          star.x = Math.random() * canvas.width;
          star.y = Math.random() * canvas.height;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update and draw shooting star
      if (shootingStar) {
        // Create tail gradient for shooting star
        const grad = ctx.createLinearGradient(
          shootingStar.x,
          shootingStar.y,
          shootingStar.x - shootingStar.dx * (shootingStar.length / shootingStar.speed),
          shootingStar.y - shootingStar.dy * (shootingStar.length / shootingStar.speed)
        );
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x - shootingStar.dx * (shootingStar.length / shootingStar.speed),
          shootingStar.y - shootingStar.dy * (shootingStar.length / shootingStar.speed)
        );
        ctx.stroke();

        // Move shooting star
        shootingStar.x += shootingStar.dx;
        shootingStar.y += shootingStar.dy;
        shootingStar.opacity -= shootingStar.fadeSpeed;

        if (shootingStar.opacity <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar = null;
        }
      } else {
        const now = Date.now();
        if (now - lastShootingStarTime > nextSpawnDelay) {
          spawnShootingStar();
          lastShootingStarTime = now;
          nextSpawnDelay = Math.random() * 1000 + 4000; // 4 to 5 seconds delay
        }
      }

      requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    drawStars();
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
});
