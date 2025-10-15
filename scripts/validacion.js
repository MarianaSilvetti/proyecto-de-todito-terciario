'use strict';

(function () {
  const form = document.getElementById('login-form');
  if (!form) return;

  const fields = [
    {
      el: form.querySelector('#username'),
      errEl: document.getElementById('username-error'),
      validate: (v) => {
        const email = (v || '').trim();
        if (email === '') return false;
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Por favor ingresá un email válido',
    },
    {
      el: form.querySelector('#password'),
      errEl: document.getElementById('password-error'),
      validate: (v) => v.trim() !== '',
      message: 'Por favor ingresá tu contraseña',
    },
  ];

  const showError = (field, msg) => {
    field.errEl.textContent = msg;
    field.errEl.style.display = 'block';
    field.el.classList.add('input-error');
  };

  const clearError = (field) => {
    field.errEl.textContent = '';
    field.errEl.style.display = 'none';
    field.el.classList.remove('input-error');
  };

  fields.forEach((f) => {
    f.el.addEventListener('input', () => clearError(f));
    f.el.addEventListener('blur', () => {
      const value = f.el.value || '';
      if (value.trim() !== '' && !f.validate(value)) {
        showError(f, f.message);
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstInvalid = null;
    fields.forEach((f) => clearError(f));

    fields.forEach((f) => {
      const value = f.el.value || '';
      if (!f.validate(value)) {
        showError(f, f.message);
        if (!firstInvalid) firstInvalid = f.el;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return; // evita el envío
    }

    form.submit();
  });
})();

// Agrego funcionalidad para Recuperar Contraseña sin tocar la validación del login.
// Se expone window.mostrarMensaje() para que Recuperar.html pueda llamarla desde onsubmit.
(function () {
  'use strict';

  window.mostrarMensaje = function () {
    const emailEl = document.getElementById('email');
    const errorEl = document.getElementById('email-error');
    const confirmation = document.getElementById('confirmation-message');
    const userEmail = document.getElementById('user-email');
    const emailValue = emailEl ? (emailEl.value || '').trim() : '';

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);

    if (!emailValue || !isValidEmail) {
      if (errorEl) {
        errorEl.textContent = 'Por favor ingresá un email válido';
        errorEl.style.display = 'block';
      }
      if (emailEl) emailEl.classList.add('input-error');
      return false; // conserva comportamiento de "no recargar"
    }

    // limpiar error si existía
    if (errorEl) {
      errorEl.style.display = 'none';
      errorEl.textContent = '';
    }
    if (emailEl) emailEl.classList.remove('input-error');

    if (userEmail) userEmail.innerText = emailValue;
    if (confirmation) confirmation.style.display = 'block';

    return false;
  };

  // Mejora progresiva: conectar el submit del formulario de recuperación si existe
  const recoveryForm = document.getElementById('recovery-form');
  if (recoveryForm) {
    recoveryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.mostrarMensaje();
    });
  }
})();

/* Tooltip informativo para cualquier logo en .logo-container a img
   Muestra "Clickea para volver al inicio" por unos segundos cuando se hace
   hover o focus sobre la imagen del logo, y también al cargar la página. */
(function () {
  'use strict';

  const LOGO_SELECTOR = '.logo-container a img';
  const TOOLTIP_TEXT = 'Clickea para volver al inicio';
  const TOOLTIP_DURATION = 3000;

  function setupLogoTooltip(logoImg) {
    if (!logoImg) return;
    const parentLink = logoImg.closest('a');
    if (!parentLink) return;

    // envolver la img en un contenedor si no existe (necesario para posicionar el tooltip)
    let wrapper = parentLink.querySelector('.logo-wrapper');
    if (!wrapper || !wrapper.contains(logoImg)) {
      wrapper = document.createElement('span');
      wrapper.className = 'logo-wrapper';
      parentLink.replaceChild(wrapper, logoImg);
      wrapper.appendChild(logoImg);
    }

    // crear el elemento tooltip si no existe
    let tooltip = wrapper.querySelector('.logo-tooltip');
    if (!tooltip) {
      tooltip = document.createElement('span');
      tooltip.className = 'logo-tooltip';
      tooltip.setAttribute('role', 'status');
      tooltip.setAttribute('aria-hidden', 'true');
      tooltip.innerText = TOOLTIP_TEXT;
      wrapper.appendChild(tooltip);
    }

    let hideTimer = null;

    const showTooltip = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      tooltip.setAttribute('aria-hidden', 'false');
      tooltip.classList.add('visible');
      // ocultar luego de TOOLTIP_DURATION ms
      hideTimer = setTimeout(() => {
        tooltip.classList.remove('visible');
        tooltip.setAttribute('aria-hidden', 'true');
        hideTimer = null;
      }, TOOLTIP_DURATION);
    };

    const hideTooltip = () => {
      if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
      }
      tooltip.classList.remove('visible');
      tooltip.setAttribute('aria-hidden', 'true');
    };

    // eventos: mostrar en hover/focus, ocultar en leave/blur o click
    wrapper.addEventListener('mouseenter', showTooltip);
    wrapper.addEventListener('focusin', showTooltip);
    wrapper.addEventListener('mouseleave', hideTooltip);
    wrapper.addEventListener('focusout', hideTooltip);
    wrapper.addEventListener('click', () => {
      showTooltip();
    });

    // accesibilidad: permitir que la imagen sea focusable si no lo es
    if (!logoImg.hasAttribute('tabindex')) {
      logoImg.setAttribute('tabindex', '0');
    }

    // Mostrar el tooltip automáticamente en cada carga de la página
    window.addEventListener('load', () => {
      showTooltip();
    });
  }

  // Seleccionar todos los logos y aplicar el tooltip
  const logos = document.querySelectorAll(LOGO_SELECTOR);
  logos.forEach(setupLogoTooltip);
})();
