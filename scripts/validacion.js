'use strict';

(function () {
  const form = document.querySelector('.login-form');
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
