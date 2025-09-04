
// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Modal open/close
document.querySelectorAll('[data-open-modal]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const id = btn.getAttribute('data-open-modal');
    const dlg = document.querySelector(id);
    if (dlg && dlg.showModal) dlg.showModal();
  });
});
document.querySelectorAll('dialog [data-close]').forEach(btn => {
  btn.addEventListener('click', e => btn.closest('dialog').close());
});

// Demo contact form (client-only)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  statusEl.textContent = 'Sending… (demo)';
  setTimeout(() => { statusEl.textContent = 'Thanks! I\'ll reply shortly.'; form.reset(); }, 900);
});

// Simple hash scroll offset for sticky nav
function offsetScroll() {
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 70; // nav height
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href && href.length > 1) {
      e.preventDefault();
      history.pushState(null, '', href);
      offsetScroll();
    }
  });
});
window.addEventListener('load', offsetScroll);

// Theme toggle (Solarized light/dark)
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light' || saved === 'dark') {
  root.setAttribute('data-theme', saved);
}
toggle?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});