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

// Cookie consent (same pattern as psicologiasupernova.com.br — no pixel wired yet)
const CONSENT_KEY = 'ss_cookie_consent';

function showCookieBanner() {
  if (document.getElementById('cookieBanner')) return;
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.className = 'cookie-banner';
  banner.innerHTML = `
    <p>Usamos cookies para melhorar sua experiência no site. Você pode aceitar ou recusar cookies não essenciais.</p>
    <div class="cookie-actions">
      <button type="button" class="btn btn-outline btn-sm" id="cookieDecline">Recusar</button>
      <button type="button" class="btn btn-primary btn-sm" id="cookieAccept">Aceitar</button>
    </div>`;
  document.body.appendChild(banner);
  requestAnimationFrame(() => banner.classList.add('visible'));

  document.getElementById('cookieAccept').addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'granted');
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
  if (consent !== 'granted' && consent !== 'denied') showCookieBanner();
})();

document.querySelectorAll('[data-cookie-settings]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showCookieBanner();
  });
});
