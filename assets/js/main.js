(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (
      !selectHeader.classList.contains('scroll-up-sticky') &&
      !selectHeader.classList.contains('sticky-top') &&
      !selectHeader.classList.contains('fixed-top')
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add('scrolled')
      : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile Navigation Toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const body = document.querySelector('body');

  function mobileNavToggle() {
    body.classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }

  // Ensure the toggle button is visible and correctly set on page load and resize
  function handleResize() {
    if (window.innerWidth <= 1199) {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.style.display = 'block';
      }
    } else {
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.style.display = 'none';
      }
      body.classList.remove('mobile-nav-active');
      if (mobileNavToggleBtn) {
        mobileNavToggleBtn.classList.remove('bi-x');
        mobileNavToggleBtn.classList.add('bi-list');
      }
    }
  }

  // Attach event listeners for resizing and initial load
  window.addEventListener('load', handleResize);
  window.addEventListener('resize', handleResize);

  // Attach event listener for mobile nav toggle
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1199) {
        mobileNavToggle();
      }
    });
  }

  // Close mobile nav on link click (only for mobile)
  document.querySelectorAll('.navmenu a').forEach((navLink) => {
    navLink.addEventListener('click', () => {
      if (
        body.classList.contains('mobile-nav-active') &&
        window.innerWidth <= 1199
      ) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add('active')
        : scrollTop.classList.remove('active');
    }
  }

  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox',
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector('.swiper-config').innerHTML.trim()
      );

      if (swiperElement.classList.contains('swiper-tab')) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener('load', initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll('.faq-item h3, .faq-item .faq-toggle')
    .forEach((faqItem) => {
      faqItem.addEventListener('click', () => {
        faqItem.parentNode.classList.toggle('faq-active');
      });
    });

  /**
   * Correct scrolling position upon page load for URLs containing hash links
   */
  window.addEventListener('load', function () {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll('.navmenu a.active')
          .forEach((link) => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();



document.getElementById('accept-all').addEventListener('click', function() {
    // Save consent and hide banner
    document.cookie = "cookieConsent=true; path=/; max-age=" + 60 * 60 * 24 * 365;
    document.getElementById('cookie-banner').style.display = 'none';
  });

  // You can add further logic for the "Customize" button here



function toggleADRContent() {
  const content = document.getElementById("adr-content");
  const button = document.getElementById("adr-toggle-btn");

  if (content.classList.contains("adr-collapsed")) {
    content.classList.remove("adr-collapsed");
    content.classList.add("adr-expanded");
    button.textContent = "Show Less";
  } else {
    content.classList.remove("adr-expanded");
    content.classList.add("adr-collapsed");
    button.textContent = "Read More";
  }
}

