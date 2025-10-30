// scripts/requiere_login.js
// Muestra un modal indicando que primero debe iniciar sesión para usar carrito o acciones de producto.
(function () {
  'use strict';

  function isLoggedPage() {
    const path = (window.location.pathname || '').toLowerCase();
    return path.endsWith('/favoritos.html') || path.endsWith('favoritos.html') ||
           path.endsWith('/index-logued.html') || path.endsWith('index-logued.html');
  }

  function createModal() {
    const path = (window.location.pathname || '').toLowerCase();
    const base = path.includes('/categorias/') ? '../' : '';
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay login-required-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal login-required-modal';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const title = document.createElement('h3');
    title.className = 'modal-title';
    title.textContent = 'Inicia sesión para continuar';

    const msg = document.createElement('p');
    msg.className = 'modal-message';
    msg.textContent = 'Para agregar productos al carrito o a favoritos, primero debes ingresar a tu cuenta.';

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

  const btnLogin = document.createElement('a');
  btnLogin.href = base + 'login.html';
    btnLogin.className = 'btn btn-primary';
    btnLogin.textContent = 'Ingresar';

  const btnRegister = document.createElement('a');
  btnRegister.href = base + 'registro.html';
    btnRegister.className = 'btn btn-secondary';
    btnRegister.textContent = 'Crear cuenta';

    const btnClose = document.createElement('button');
    btnClose.type = 'button';
    btnClose.className = 'btn btn-link';
    btnClose.textContent = 'Cancelar';

    actions.appendChild(btnLogin);
    actions.appendChild(btnRegister);
    actions.appendChild(btnClose);

    content.appendChild(title);
    content.appendChild(msg);
    content.appendChild(actions);
    modal.appendChild(content);

    const open = () => {
      overlay.classList.add('active');
      modal.classList.add('active');
      document.addEventListener('keydown', onKeyDown);
      // Focus en el primer CTA para accesibilidad
      btnLogin.focus();
    };

    const close = () => {
      overlay.classList.remove('active');
      modal.classList.remove('active');
      document.removeEventListener('keydown', onKeyDown);
    };

    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };

    overlay.addEventListener('click', close);
    btnClose.addEventListener('click', close);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    return { open };
  }

  function attachHandlers(open) {
    // Interceptar el carrito del header
    document.querySelectorAll('header .user-actions a[href$="carrito.html"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        open();
      }, true); // capture para adelantarnos a otros listeners
    });

    // Íconos de agregar al carrito en cards
    document.querySelectorAll('button i.fa-bag-shopping').forEach((icon) => {
      const btn = icon.closest('button');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        open();
      }, true);
    });

    // Íconos de favoritos en cards
    document.querySelectorAll('button i.fa-heart').forEach((icon) => {
      const btn = icon.closest('button');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
        open();
      }, true);
    });
  }

  function init() {
    if (isLoggedPage()) return; // No activar en páginas logueadas
    const { open } = createModal();
    attachHandlers(open);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
