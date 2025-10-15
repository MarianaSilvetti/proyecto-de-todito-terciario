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
  const recoveryForm = document.getElementById('.recovery-form');
  if (recoveryForm) {
    recoveryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      window.mostrarMensaje();
    });
  }
})();
