
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
document.querySelectorAll('.dialog [data-close]').forEach(btn => {
  btn.addEventListener('click', e => btn.closest('.dialog').close());
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

// Theme slider toggle JS
const toggleInput = document.getElementById('themeToggle');
const root = document.documentElement;


function applyTheme(mode) {
  root.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  toggleInput.checked = mode === 'light';
}


// init
const saved = localStorage.getItem('theme');
if (saved === 'light' || saved === 'dark') {
  applyTheme(saved);
} else {
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(prefersLight ? 'light' : 'dark');
}


toggleInput?.addEventListener('change', () => {
  const next = toggleInput.checked ? 'light' : 'dark';
  applyTheme(next);
});


(function () {
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mainMenu');

  function setOpen(isOpen) {
    btn.setAttribute('aria-expanded', isOpen);
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menu.classList.toggle('open', isOpen);
    menu.setAttribute('aria-hidden', !isOpen);
    if (isOpen) document.addEventListener('keydown', onKeyDown);
    else document.removeEventListener('keydown', onKeyDown);
  }
  function onKeyDown(e) { if (e.key === 'Escape') setOpen(false); }

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') !== 'true';
    setOpen(open);
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a, .contact-btn')) setOpen(false);
  });

  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener ? mq.addEventListener('change', handleMQ) : mq.addListener(handleMQ);
  function handleMQ(e) {
    if (e.matches) { setOpen(false); } 
  }
})();