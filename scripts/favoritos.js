// scripts/favoritos.js
// Renderiza la lista de favoritos en <main class="favoritos"> leyendo ids desde favoritosData
// y encontrando los productos completos en productosData.

(function () {
  'use strict';

  function formatCurrencyARS(amount, { maximumFractionDigits = 0 } = {}) {
    try {
      return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: maximumFractionDigits,
        maximumFractionDigits,
      }).format(amount);
    } catch (e) {
      const parts = amount.toFixed(maximumFractionDigits).split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return '$' + parts.join(',');
    }
  }

  function buildFavoritoItem(producto, onRemove) {
    const { id, title, price, image } = producto;
    const perInstallment = price / 3;

    const item = document.createElement('div');
    item.className = 'favorito-item';
    item.dataset.productId = id;

    const imgWrap = document.createElement('div');
    imgWrap.className = 'favorito-image';
    const img = document.createElement('img');
    img.src = image?.src || '';
    img.alt = image?.alt || title || 'Producto';
    img.loading = 'lazy';
    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'favorito-info';
    const h2 = document.createElement('h2');
    h2.textContent = title || '';
    const priceEl = document.createElement('p');
    priceEl.className = 'precio';
    priceEl.textContent = formatCurrencyARS(price, { maximumFractionDigits: 0 });
    const cuotas = document.createElement('p');
    cuotas.className = 'cuotas';
    cuotas.textContent = `3 cuotas sin interés de ${formatCurrencyARS(perInstallment, { maximumFractionDigits: 2 })}`;
    info.appendChild(h2);
    info.appendChild(priceEl);
    info.appendChild(cuotas);

    const actions = document.createElement('div');
    actions.className = 'favorito-actions';

    const btnCart = document.createElement('button');
    btnCart.className = 'action add-cart';
    btnCart.textContent = 'Agregar al carrito';
    btnCart.addEventListener('click', () => {
      if (window.CartModal && typeof window.CartModal.open === 'function') {
        window.CartModal.open();
      } else {
        alert('Producto agregado al carrito');
      }
    });

    const btnBuy = document.createElement('button');
    btnBuy.className = 'action buy';
    btnBuy.textContent = 'Comprar';
    btnBuy.addEventListener('click', () => {
      alert('Redirigiendo a la compra...');
    });

    const btnRemove = document.createElement('button');
    btnRemove.className = 'action remove';
    btnRemove.textContent = 'Eliminar';
    btnRemove.addEventListener('click', () => {
      if (typeof onRemove === 'function') onRemove(id, item);
    });

    actions.appendChild(btnCart);
    actions.appendChild(btnBuy);
    actions.appendChild(btnRemove);

    item.appendChild(imgWrap);
    item.appendChild(info);
    item.appendChild(actions);

    return item;
  }

  function renderFavoritos() {
    const container = document.querySelector('main.favoritos');
    if (!container) return;

    const listWrapper = document.createElement('div');
    listWrapper.className = 'favoritos-list';

    const ids = (typeof favoritosData !== 'undefined' && Array.isArray(favoritosData)) ? favoritosData.slice() : [];
    const productos = (typeof productosData !== 'undefined' && Array.isArray(productosData)) ? productosData : [];

    const findById = (id) => productos.find(p => p.id === id);

    const current = ids.map(findById).filter(Boolean);

    const onRemove = (id, node) => {
      // Remueve del DOM y de la lista actual en memoria
      node.remove();
      const index = current.findIndex(p => p.id === id);
      if (index >= 0) current.splice(index, 1);
      if (current.length === 0) {
        showEmptyState(container);
      }
    };

    if (current.length === 0) {
      showEmptyState(container);
      return;
    }

    current.forEach(p => listWrapper.appendChild(buildFavoritoItem(p, onRemove)));

    container.innerHTML = '';
    container.appendChild(listWrapper);
  }

  function showEmptyState(container) {
    container.innerHTML = '';
    const empty = document.createElement('div');
    empty.className = 'favoritos-empty';
    empty.textContent = 'No tenés productos en Favoritos.';
    container.appendChild(empty);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderFavoritos);
  } else {
    renderFavoritos();
  }
})();
