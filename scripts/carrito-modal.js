// scripts/carrito-modal.js
// Modal de éxito para "agregar al carrito" en Favoritos (y reutilizable en otras páginas)
(function () {
  'use strict';

  function createModal() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay cart-overlay';

    const modal = document.createElement('div');
    modal.className = 'modal cart-modal';

    const content = document.createElement('div');
    content.className = 'modal-content';

    const iconWrap = document.createElement('div');
    iconWrap.className = 'cart-modal-icon';
    iconWrap.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i>';

    const title = document.createElement('h2');
    title.className = 'cart-modal-title';
    title.textContent = '¡Producto agregado al carrito!';

    const message = document.createElement('p');
    message.className = 'cart-modal-message';
    message.innerHTML = 'El producto fue agregado al carrito correctamente.<br>Próximamente vas a poder finalizar tu compra desde aquí.';

    const actions = document.createElement('div');
    actions.className = 'modal-actions';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'btn modal-close';
    closeBtn.textContent = 'Entendido';

    actions.appendChild(closeBtn);
    content.appendChild(iconWrap);
    content.appendChild(title);
    content.appendChild(message);
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

  // Exponer API global sencilla
  const api = setupModal();
  window.CartModal = {
    open: api.open,
  };
})();
