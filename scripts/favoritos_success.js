// scripts/favoritos_success.js
// En index-logued, muestra un modal de éxito al agregar a favoritos.
(function () {
  'use strict';

  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay favorite-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal favorite-modal';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'favorite-modal-icon';
    iconWrap.innerHTML = '<i class="fa-solid fa-heart" aria-hidden="true"></i>';

    const title = document.createElement('h3');
    title.className = 'favorite-modal-title';
    title.textContent = 'Agregado a favoritos';

    const msg = document.createElement('p');
    msg.className = 'favorite-modal-message';
    msg.textContent = 'Podrás verlo en tu lista de favoritos.';

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    const btnOk = document.createElement('button');
    btnOk.type = 'button';
    btnOk.className = 'btn btn-primary';
    btnOk.textContent = 'Entendido';

    actions.appendChild(btnOk);
    content.appendChild(iconWrap);
    content.appendChild(title);
    content.appendChild(msg);
    content.appendChild(actions);

    modal.appendChild(content);

    const open = () => {
      overlay.classList.add('active');
      modal.classList.add('active');
      document.addEventListener('keydown', onKeyDown);
      btnOk.focus();
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
    btnOk.addEventListener('click', close);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    return { open };
  }

  function attachHandlers(open) {
    // Captura clics en corazones alojados dentro de botones
    document.addEventListener('click', function (e) {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const heartIcon = target.closest('i.fa-heart');
      if (heartIcon) {
        const btn = heartIcon.closest('button');
        if (btn) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') e.stopImmediatePropagation();
          open();
        }
      }
    }, true); // capture para adelantarnos a otros listeners
  }

  function init() {
    const { open } = createModal();
    attachHandlers(open);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
