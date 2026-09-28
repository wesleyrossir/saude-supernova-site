const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Cookie consent: gates Google Analytics 4 (same pattern as psicologiasupernova.com.br)
const CONSENT_KEY = 'ss_cookie_consent';
const GA_ID = 'G-CW7W7BD57Y';

function initGA() {
  if (window.__gaLoaded) return;
  window.__gaLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
}

function showCookieBanner() {
  if (document.getElementById('cookieBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>Usamos cookies para melhorar sua experiência e medir, de forma agregada, o uso do site (Google Analytics). Você pode aceitar ou recusar cookies não essenciais. <a href="https://psicologiasupernova.com.br/privacidade.html">Saiba mais</a>.</p>
    <div class="cookie-actions">
      <button type="button" class="btn btn-outline btn-sm" id="cookieDecline">Recusar</button>
      <button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Aceitar</button>
    </div>`;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('visible'));

  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
    initGA();
    hideCookieBanner();
  });
  document.getElementById('cookieDecline').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'denied');
    hideCookieBanner();
  });
}

function hideCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  banner.classList.remove('visible');
  setTimeout(() => banner.remove(), 300);
}

(function initCookieConsent() {
  let consent;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) { consent = null; }
  if (consent === 'granted') initGA();
  else if (consent !== 'denied') showCookieBanner();
})();

document.querySelectorAll('[data-cookie-settings]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showCookieBanner();
  });
});

// Track WhatsApp CTA clicks as GA4 generate_lead
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    if (typeof gtag === 'function') gtag('event', 'generate_lead', { method: 'whatsapp' });
  });
});
