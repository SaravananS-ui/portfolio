/**
 * Saravanan S. - Portfolio JavaScript
 * Features: Typewriter with Reduced Motion check, Mobile Navigation Drawer,
 *           Scrollspy Header, and IntersectionObserver Reveal Animations.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Typewriter Effect (Accessible & Reduced-Motion Aware) ---
  const typedTarget = document.getElementById('typed-text');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typedTarget) {
    if (prefersReducedMotion) {
      typedTarget.textContent = 'ECE Graduate | Aspiring Software Developer';
    } else {
      const titles = [
        'ECE Graduate | Aspiring Software Developer',
        'Frontend & Junior Software Developer',
        'Practical Problem Solver & Builder'
      ];
      let titleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typingSpeed = 70;
      const deletingSpeed = 35;
      const pauseEnd = 1800;
      const pauseStart = 400;

      function typeWriter() {
        if (!typedTarget) return;

        const currentTitle = titles[titleIndex];

        if (!isDeleting) {
          typedTarget.textContent = currentTitle.substring(0, charIndex + 1);
          charIndex++;

          if (charIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseEnd);
            return;
          }
          setTimeout(typeWriter, typingSpeed);
        } else {
          typedTarget.textContent = currentTitle.substring(0, charIndex - 1);
          charIndex--;

          if (charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            setTimeout(typeWriter, pauseStart);
            return;
          }
          setTimeout(typeWriter, deletingSpeed);
        }
      }

      // Start typewriter
      typeWriter();
    }
  }

  // --- 2. Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.removeAttribute('hidden');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNav || !navToggle) return;
    mobileNav.setAttribute('hidden', '');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && !mobileNav.hasAttribute('hidden')) {
      closeMobileNav();
      navToggle?.focus();
    }
  });

  // --- 3. Scrollspy & Header Active State ---
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-links .nav-link:not(.nav-external-link)');
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header border / background enhancement on scroll
    if (header) {
      if (scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scrollspy section detection
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --- 4. IntersectionObserver for Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // If reduced-motion is preferred or IntersectionObserver unsupported, reveal immediately
    revealElements.forEach(el => el.classList.add('active'));
  }

});
