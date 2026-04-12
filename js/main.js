/* ============================================================
   MADRASA MADINATUL ILM — main.js
   Navbar, mobile menu, scroll reveal, counter animation,
   shared navbar/footer injection
   ============================================================ */

/* ── Shared HTML Components ── */
const PHONE_NUMBER  = '923144928492'; // WhatsApp number (no +, no spaces)
const WHATSAPP_MSG  = encodeURIComponent('السلام علیکم، مدرسہ مدینۃ العلم کے بارے میں معلومات چاہیے۔');
const WA_LINK       = `https://wa.me/${PHONE_NUMBER}?text=${WHATSAPP_MSG}`;

const NAV_HTML = `
<nav id="navbar">
  <div class="container nav-inner">
    <a href="index.html" class="nav-logo">
      <img src="assets/logo.png" alt="Madrasa Madinatul Ilm Logo" onerror="this.style.display='none'">
      <div class="nav-logo-text">
        <span class="arabic-name">مدرسہ مدینۃ العلم</span>
        <span class="en-name">Madinatul Ilm · Bat Khela</span>
      </div>
    </a>
    <nav class="nav-links">
      <a href="index.html"   data-page="index">Home</a>
      <a href="about.html"   data-page="about">About</a>
      <a href="courses.html" data-page="courses">Courses</a>
      <a href="gallery.html" data-page="gallery">Gallery</a>
      <a href="contact.html" data-page="contact" class="nav-cta">Contact Us</a>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="mobile-nav" id="mobileNav">
  <a href="index.html"   data-page="index">🏠 Home</a>
  <a href="about.html"   data-page="about">🕌 About</a>
  <a href="courses.html" data-page="courses">📖 Courses</a>
  <a href="gallery.html" data-page="gallery">🖼️ Gallery</a>
  <a href="contact.html" data-page="contact">📞 Contact</a>
</div>
`;

const FOOTER_HTML = `
<footer id="footer">
  <div class="container">
    <div class="footer-grid">
      <!-- Brand -->
      <div class="footer-brand">
        <div class="nav-logo" style="margin-bottom:16px;">
          <img src="assets/logo.png" alt="Logo" style="height:48px;width:48px;border-radius:50%;background:white;padding:2px;" onerror="this.style.display='none'">
          <div class="nav-logo-text">
            <span class="arabic-name">مدرسہ مدینۃ العلم</span>
            <span class="en-name">Madinatul Ilm · Bat Khela</span>
          </div>
        </div>
        <p>A centre of Islamic knowledge and spiritual excellence in Bat Khela, Khyber Pakhtunkhwa. Providing quality Islamic education since our founding.</p>
        <p class="arabic-quote">طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ</p>
      </div>
      <!-- Links -->
      <div class="footer-col">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="index.html">→ Home</a></li>
          <li><a href="about.html">→ About Us</a></li>
          <li><a href="courses.html">→ Our Courses</a></li>
          <li><a href="gallery.html">→ Gallery</a></li>
          <li><a href="contact.html">→ Contact</a></li>
        </ul>
      </div>
      <!-- Contact -->
      <div class="footer-col">
        <h4>Contact</h4>
        <div class="footer-contact-item">
          <span>📍</span>
          <span>Bat Khela, District Malakand,<br>Khyber Pakhtunkhwa, Pakistan</span>
        </div>
        <div class="footer-contact-item">
          <span>📞</span>
          <span>+92 314 4928492</span>
        </div>
        <div class="footer-contact-item">
          <span>💬</span>
          <a href="${WA_LINK}" target="_blank" rel="noopener">WhatsApp Us</a>
        </div>
        <div class="footer-contact-item">
          <span>🕐</span>
          <span>Fajr – Isha<br>All Days Except Friday</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© ${new Date().getFullYear()} مدرسہ مدینۃ العلم — All Rights Reserved</span>
      <span>Made with ❤️ for the Ummah · Bat Khela, KPK</span>
    </div>
  </div>
</footer>

<!-- WhatsApp Floating Button -->
<a href="${WA_LINK}" class="wa-float" target="_blank" rel="noopener" aria-label="WhatsApp">
  <span class="wa-tooltip">Chat on WhatsApp</span>
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
`;

/* ── Inject Components ── */
function injectComponents() {
  const navPlaceholder    = document.getElementById('navbar-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (navPlaceholder)    navPlaceholder.innerHTML    = NAV_HTML;
  if (footerPlaceholder) footerPlaceholder.innerHTML = FOOTER_HTML;

  setActiveNavLink();
  initNavbar();
}

/* ── Set Active Nav Link ── */
function setActiveNavLink() {
  const page    = document.body.dataset.page || 'index';
  const allLinks = document.querySelectorAll('[data-page]');
  allLinks.forEach(link => {
    if (link.dataset.page === page) link.classList.add('active');
  });
}

/* ── Navbar Scroll Effect ── */
function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (!navbar) return;

  // Initial check
  if (window.scrollY > 30) navbar.classList.add('scrolled');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }
}

/* ── Scroll Reveal Observer ── */
function initScrollReveal() {
  const revealEls   = document.querySelectorAll('.reveal');
  const staggerEls  = document.querySelectorAll('.reveal-stagger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el  => observer.observe(el));
  staggerEls.forEach(el => observer.observe(el));
}

/* ── Counter Animation ── */
function animateCounter(el, target, duration = 1800) {
  const start    = performance.now();
  const startVal = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease     = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current  = Math.round(startVal + (target - startVal) * ease);
    el.textContent = current + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

function initCounters() {
  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  if (!counterEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => observer.observe(el));
}

/* ── Gallery Lightbox (simple) ── */
function initGallery() {
  const items = document.querySelectorAll('.gallery-item[data-src]');
  if (!items.length) return;

  // Create lightbox
  const lb = document.createElement('div');
  lb.id    = 'lightbox';
  lb.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;
    display:none;align-items:center;justify-content:center;cursor:pointer;
    padding:20px;
  `;
  lb.innerHTML = '<img id="lb-img" style="max-width:90vw;max-height:90vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.5);">';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('#lb-img');

  items.forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src       = item.dataset.src;
      lbImg.alt       = item.dataset.alt || '';
      lb.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });

  lb.addEventListener('click', () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lb.click();
  });
}

/* ── Contact Form ── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const phone   = form.querySelector('[name="phone"]').value.trim();
    const course  = form.querySelector('[name="course"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    // Build WhatsApp message
    const text = encodeURIComponent(
      `السلام علیکم\nنام: ${name}\nفون: ${phone}\nکورس: ${course}\nپیغام: ${message}`
    );

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled    = true;

    setTimeout(() => {
      window.open(`https://wa.me/${PHONE_NUMBER}?text=${text}`, '_blank');
      const success = document.getElementById('form-success');
      if (success) success.classList.add('visible');
      form.reset();
      btn.textContent = 'Send Message';
      btn.disabled    = false;
    }, 600);
  });
}

/* ── Init All ── */
document.addEventListener('DOMContentLoaded', () => {
  injectComponents();
  initScrollReveal();
  initCounters();
  initGallery();
  initContactForm();
});
