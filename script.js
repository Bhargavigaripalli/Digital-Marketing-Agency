/* ============================================================
   STACKLY - Modern Digital Marketing Agency Interactive Engine
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. PRELOADER & INITIALIZATION
     ------------------------------------------------------------ */
  const loader = document.getElementById('loader');
  const ldBar = document.querySelector('.ld-bar');
  
  if (loader && ldBar) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 10;
      if (progress >= 100) {
        progress = 100;
        ldBar.style.width = '100%';
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add('loaded');
          initGSAPAnimations();
          initHeroParticles();
          initFAQAccordion();
        }, 300);
      } else {
        ldBar.style.width = progress + '%';
      }
    }, 100);
  } else {
    initGSAPAnimations();
    initHeroParticles();
    initFAQAccordion();
  }

  /* ------------------------------------------------------------
     2. INTERACTIVE CURSOR
     ------------------------------------------------------------ */
  const curDot = document.getElementById('cur-dot');
  const curRing = document.getElementById('cur-ring');
  
  if (curDot && curRing) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      curDot.style.left = mouseX + 'px';
      curDot.style.top = mouseY + 'px';
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      curRing.style.left = ringX + 'px';
      curRing.style.top = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    const hoverables = document.querySelectorAll('a, button, .feat-card, .campaign-card, input, select, .faq-header');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
    });
  }

  /* ------------------------------------------------------------
     3. HERO KINETIC PARTICLES CANVAS
     ------------------------------------------------------------ */
  function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    const particles = [];
    const numParticles = window.innerWidth < 768 ? 25 : 55;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(255, 107, 0, ' : 'rgba(255, 204, 0, ',
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(255, 107, 0, 0.8)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 136, 0, ${0.25 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ------------------------------------------------------------
     4. FAQ ACCORDION TOGGLE
     ------------------------------------------------------------ */
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const header = item.querySelector('.faq-header');
      if (header) {
        header.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          faqItems.forEach(i => i.classList.remove('active'));
          if (!isActive) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  /* ------------------------------------------------------------
     5. NAVBAR & SCROLL PROGRESS
     ------------------------------------------------------------ */
  const navbar = document.getElementById('navbar');
  const scrollTopBtn = document.getElementById('scrolltop');
  const progressBar = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    
    if (progressBar && totalScroll > 0) {
      const scrollPercent = (currentScroll / totalScroll) * 100;
      progressBar.style.width = scrollPercent + '%';
    }

    if (navbar) {
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (scrollTopBtn) {
      if (currentScroll > 400) {
        scrollTopBtn.classList.add('show');
      } else {
        scrollTopBtn.classList.remove('show');
      }
    }
  });

  /* ------------------------------------------------------------
     6. MOBILE DRAWER MENU
     ------------------------------------------------------------ */
  const ham = document.getElementById('ham');
  const mobMenu = document.getElementById('mob-menu');
  const mobClose = document.getElementById('mob-close');

  if (ham && mobMenu) {
    ham.addEventListener('click', () => mobMenu.classList.add('active'));
  }
  if (mobClose && mobMenu) {
    mobClose.addEventListener('click', () => mobMenu.classList.remove('active'));
  }

  /* ------------------------------------------------------------
     7. STATS COUNTER ANIMATION
     ------------------------------------------------------------ */
  const statElements = document.querySelectorAll('.hstat-num');
  let animatedStats = false;

  function runCounterAnimation() {
    statElements.forEach(el => {
      const targetText = el.innerText.trim();
      const numMatch = targetText.match(/\d+/);
      if (!numMatch) return;
      const targetNum = parseInt(numMatch[0]);
      const suffix = targetText.replace(numMatch[0], '');
      
      let count = 0;
      const duration = 2000;

      const timer = setInterval(() => {
        count += Math.ceil(targetNum / 40);
        if (count >= targetNum) {
          count = targetNum;
          el.innerHTML = count + suffix;
          clearInterval(timer);
        } else {
          el.innerHTML = count + suffix;
        }
      }, 30);
    });
  }

  if (statElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          runCounterAnimation();
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(el => observer.observe(el));
  }

  /* ------------------------------------------------------------
     8. INTERACTIVE ROI CALCULATOR
     ------------------------------------------------------------ */
  const budgetInput = document.getElementById('calc-budget');
  const budgetVal = document.getElementById('calc-budget-val');
  const industrySelect = document.getElementById('calc-industry');
  const resLeads = document.getElementById('res-leads');
  const resRevenue = document.getElementById('res-revenue');
  const resRoas = document.getElementById('res-roas');

  function calculateROI() {
    if (!budgetInput) return;
    const budget = parseInt(budgetInput.value);
    budgetVal.innerText = '$' + budget.toLocaleString();

    let multiplier = 3.8;
    let costPerLead = 45;

    if (industrySelect) {
      const ind = industrySelect.value;
      if (ind === 'ecommerce') { multiplier = 4.2; costPerLead = 25; }
      else if (ind === 'b2b') { multiplier = 3.5; costPerLead = 85; }
      else if (ind === 'saas') { multiplier = 4.6; costPerLead = 60; }
      else if (ind === 'healthcare') { multiplier = 3.9; costPerLead = 50; }
    }

    const leads = Math.round(budget / costPerLead);
    const revenue = Math.round(budget * multiplier);
    const roas = multiplier.toFixed(1) + 'x';

    if (resLeads) resLeads.innerText = leads.toLocaleString() + '+';
    if (resRevenue) resRevenue.innerText = '$' + revenue.toLocaleString();
    if (resRoas) resRoas.innerText = roas;
  }

  if (budgetInput) {
    budgetInput.addEventListener('input', calculateROI);
    if (industrySelect) industrySelect.addEventListener('change', calculateROI);
    calculateROI();
  }

  /* ------------------------------------------------------------
     9. PORTFOLIO FILTER TABS
     ------------------------------------------------------------ */
  const filterTabs = document.querySelectorAll('.ctab');
  const campaignCards = document.querySelectorAll('.campaign-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      campaignCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'All' || filter === cat) {
          card.style.display = 'block';
          setTimeout(() => card.style.opacity = '1', 50);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  /* ------------------------------------------------------------
     10. 3D CARD TILT & HERO PARALLAX
     ------------------------------------------------------------ */
  const tiltCards = document.querySelectorAll('.feat-card, .hero-insights-img-wrap');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 14;
      const rotateY = (centerX - x) / 14;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  /* ------------------------------------------------------------
     11. TESTIMONIAL SLIDER AUTOMATION
     ------------------------------------------------------------ */
  const testimonials = [
    {
      quote: "“Stackly transformed our entire growth funnel. Their paid search and email automation strategies delivered a 4.2x ROAS within 90 days. Incredible team!”",
      name: "Marcus Vance",
      title: "CMO, Nexus Tech",
      avatar: "downloaded_images/therapist-arvind.webp"
    },
    {
      quote: "“The data clarity Stackly provides is unprecedented. We scaled from 10k to 250k monthly active users with their keyword SEO cluster systems.”",
      name: "Elena Rostova",
      title: "VP Growth, Solis AI",
      avatar: "downloaded_images/therapist-kavitha.webp"
    },
    {
      quote: "“Superb creative team and conversion experts. Every brief turned into high-performing paid social campaign decks with launch-ready reporting dashboards.”",
      name: "David Chen",
      title: "Founder, Zenith Brand Labs",
      avatar: "downloaded_images/therapist-vikram.webp"
    }
  ];

  let currentTesti = 0;
  const tQuote = document.querySelector('.testi-quote');
  const tName = document.querySelector('.testi-info h5');
  const tTitle = document.querySelector('.testi-info p');
  const tAvatar = document.querySelector('.testi-avatar');

  function updateTestimonial(index) {
    if (!tQuote) return;
    const data = testimonials[index];
    tQuote.style.opacity = '0';
    setTimeout(() => {
      tQuote.innerText = data.quote;
      if (tName) tName.innerText = data.name;
      if (tTitle) tTitle.innerText = data.title;
      if (tAvatar) tAvatar.src = data.avatar;
      tQuote.style.opacity = '1';
    }, 300);
  }

  if (tQuote) {
    setInterval(() => {
      currentTesti = (currentTesti + 1) % testimonials.length;
      updateTestimonial(currentTesti);
    }, 6000);
  }

  /* ------------------------------------------------------------
     12. GSAP ENTRANCE ANIMATIONS
     ------------------------------------------------------------ */
  function initGSAPAnimations() {
    if (typeof gsap === 'undefined') return;

    const animateIfExists = (target, vars) => {
      if (document.querySelector(target)) {
        gsap.from(target, vars);
      }
    };

    animateIfExists('#hero-badge', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
    animateIfExists('#hero-title', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
    animateIfExists('#hero-sub', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
    animateIfExists('.hero-btns', { opacity: 0, y: 30, duration: 0.8, delay: 0.8 });
    animateIfExists('.hero-stats', { opacity: 0, y: 30, duration: 0.8, delay: 1 });
    animateIfExists('.hero-insights', { opacity: 0, scale: 0.9, duration: 1.2, delay: 0.5 });
    animateIfExists('.hero-float-badge-top', { opacity: 0, x: 30, duration: 1, delay: 1.2 });
    animateIfExists('.hero-insights-card', { opacity: 0, x: -30, duration: 1, delay: 1.4 });
  }

  /* ------------------------------------------------------------
     13. CASE STUDY MODAL PREVIEW
     ------------------------------------------------------------ */
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  window.openModal = function(title, category, metrics) {
    if (!modalOverlay || !modalBody) return;
    modalBody.innerHTML = `
      <div style="font-size:0.85rem; color:var(--accent-cyan); font-weight:700; text-transform:uppercase; margin-bottom:0.5rem;">${category}</div>
      <h2 style="font-family:var(--font-heading); font-size:2rem; margin-bottom:1rem; color:#fff;">${title}</h2>
      <p style="color:var(--text-secondary); margin-bottom:1.5rem; line-height:1.7;">Detailed case study report showcasing conversion optimizations, organic search acquisition channels, and scaled performance results.</p>
      <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:1rem; background:var(--bg-primary); padding:1.25rem; border-radius:var(--radius-md); border:1px solid var(--border-light); margin-bottom:1.5rem;">
        <div><span style="font-size:0.8rem; color:var(--text-muted);">ROAS Increase</span><strong style="display:block; font-size:1.5rem; color:var(--accent-cyan);">${metrics || '3.8x'}</strong></div>
        <div><span style="font-size:0.8rem; color:var(--text-muted);">Conversion Boost</span><strong style="display:block; font-size:1.5rem; color:var(--accent-purple);">+142%</strong></div>
      </div>
      <button class="hbtn-main" style="width:100%; justify-content:center;" onclick="document.getElementById('modal-overlay').classList.remove('active')">Close Details</button>
    `;
    modalOverlay.classList.add('active');
  };

  if (modalClose) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

});
