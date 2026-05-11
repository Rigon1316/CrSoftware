// ── NAV active link ──
document.addEventListener('DOMContentLoaded', () => {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
});

// ── WhatsApp helper ──
function openWhatsApp(msg) {
  const num = '593982429029';
  const text = encodeURIComponent(msg || 'Hola, quiero conocer sus servicios y solicitar una cotización.');
  window.open(`https://wa.me/${num}?text=${text}`, '_blank');
}

function sendForm() {
  const name = document.getElementById('f-name')?.value.trim();
  const phone = document.getElementById('f-phone')?.value.trim();
  const email = document.getElementById('f-email')?.value.trim();
  const service = document.getElementById('f-service')?.value.trim();
  const message = document.getElementById('f-msg')?.value.trim();
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');

  if (!name || !email || !message) {
    alert('Por favor completa tu nombre, correo y mensaje antes de enviar.');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert('Por favor ingresa un correo válido.');
    return;
  }

  const fullMessage = `Hola, mi nombre es ${name}.\nTeléfono: ${phone || 'No especificado'}\nCorreo: ${email}.\nServicio de interés: ${service || 'No especificado'}\nMensaje: ${message}`;

  openWhatsApp(fullMessage);

  if (form && success) {
    form.style.display = 'none';
    success.style.display = 'block';
  }
}

function initContactAccordion() {
  const toggles = document.querySelectorAll('.contact-item-toggle');
  toggles.forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.contact-item');
      if (!item) return;
      const isOpen = item.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
}

function initFooterAccordion() {
  const toggles = document.querySelectorAll('.footer-toggle');
  toggles.forEach(button => {
    button.addEventListener('click', () => {
      const col = button.closest('.footer-col');
      if (!col) return;
      const isOpen = col.classList.toggle('open');
      button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  });
}

// ── Scroll reveal ──
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = `fadeUp 0.7s ease ${e.target.dataset.delay || '0s'} both`;
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.opacity = '0';
    io.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initContactAccordion();
});
