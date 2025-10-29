// scripts/proximamente.js
// Muestra un cuadro de diálogo genérico para funcionalidades aún no disponibles.
(function () {
  'use strict';

  const MESSAGE =
    'Esta funcionalidad estará disponible próximamente...<br>Gracias por su paciencia';

  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay proximamente-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal proximamente-modal';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const text = document.createElement('p');
    text.innerHTML = MESSAGE;

    const actions = document.createElement('div');
    actions.className = 'modal-actions';
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn modal-close';
    closeBtn.textContent = 'Entendido';

    actions.appendChild(closeBtn);
    content.appendChild(text);
    content.appendChild(actions);
    modal.appendChild(content);

    return { overlay, modal, closeBtn };
  }

  function setupModal() {
    const { overlay, modal, closeBtn } = createModal();
    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    const open = () => {
      overlay.classList.add('active');
      modal.classList.add('active');
      // focus para accesibilidad
      closeBtn.focus();
      document.addEventListener('keydown', onKeyDown);
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
    closeBtn.addEventListener('click', close);

    return { open };
  }

  function normalize(str) {
    return (str || '').toString().trim().toLowerCase();
  }

  function attachHandlers(open) {
    // Botones de NAV por texto
    const navButtons = Array.from(document.querySelectorAll('nav button'));
    const targets = ['oferta', 'vender', 'vendé', 'ayuda'];
    navButtons.forEach((btn) => {
      if (targets.includes(normalize(btn.textContent))) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          open();
        });
      }
    });

    // Mis compras (link sin funcionalidad)
    document.querySelectorAll('a').forEach((a) => {
      if (normalize(a.textContent) === 'mis compras') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          open();
        });
      }
    });

    // Carrito (si la página no existe o aún no implementada)
    document.querySelectorAll('a[href$="carrito.html"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });

    // Funciones de agregar a carro (ícono carrito en cards)
    document.querySelectorAll('button i.fa-bag-shopping').forEach((icon) => {
      const btn = icon.closest('button');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          open();
        });
      }
    });

    // Funciones de favoritos (ícono corazón en cards)
    document.querySelectorAll('button i.fa-heart').forEach((icon) => {
      const btn = icon.closest('button');
      if (btn) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          open();
        });
      }
    });

    // Botones de "Comprar" en favoritos (marcados con data-proximamente)
    document.querySelectorAll('button[data-proximamente="true"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        open();
      });
    });

    // Links del footer (excluyendo redes sociales y Freepik)
    document.querySelectorAll('footer a').forEach((a) => {
      // Excluir si tiene ícono de redes sociales o es el link de Freepik
      const hasSocialIcon = a.querySelector('i.fa-brands');
      const isFreepik = a.href && a.href.includes('freepik');
      
      if (!hasSocialIcon && !isFreepik && a.href === '#' || a.getAttribute('href') === '#') {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          open();
        });
      }
    });

    // Botón de usuario (user-menu)
    document.querySelectorAll('.user-menu').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });
  }

  function init() {
    const { open } = setupModal();
    attachHandlers(open);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
