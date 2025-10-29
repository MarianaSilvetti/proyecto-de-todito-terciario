// scripts/productos.js
// Automatiza la creación de cards de productos desde una lista y las inyecta en el contenedor existente.
// Contrato rápido:
// - Entrada: array de productos con { id, title, titleFull?, price, image: {src, alt}, installments?: { count, interestFree } }
// - Salida: Render de .card dentro del contenedor (por defecto: 'main.productos')
// - Errores: Si no existe el contenedor, no hace nada (logea en consola en modo dev)

(function () {
  'use strict';

  class Productos {
    constructor({ containerSelector = 'main.productos', products = [] } = {}) {
      this.containerSelector = containerSelector;
      this.container = document.querySelector(containerSelector);
      this.products = products;
    }

    setProducts(products) {
      this.products = Array.isArray(products) ? products : [];
      return this;
    }

    render() {
      if (!this.container) {
        if (typeof window !== 'undefined' && window.console) {
          console.warn('[Productos] Contenedor no encontrado. Selector:', this.containerSelector);
        }
        return;
      }

      // Limpia el contenedor antes de renderizar
      this.container.innerHTML = '';

      const fragment = document.createDocumentFragment();
      this.products.forEach((p) => {
        const card = this.#createCard(p);
        fragment.appendChild(card);
      });

      this.container.appendChild(fragment);
    }

    #formatCurrencyARS(amount, { maximumFractionDigits = 0 } = {}) {
      try {
        return new Intl.NumberFormat('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: maximumFractionDigits,
          maximumFractionDigits,
        }).format(amount);
      } catch (e) {
        // Fallback simple por si Intl no está disponible
        const parts = amount.toFixed(maximumFractionDigits).split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return '$' + parts.join(',');
      }
    }

    #createCard(product) {
      const { id, title, titleFull, price, image, installments } = product;

      const count = installments?.count ?? 3;
      const interestFree = installments?.interestFree !== false; // por defecto true
      const perInstallment = price / count;

      const card = document.createElement('div');
      card.className = 'card';
      if (id) card.dataset.productId = String(id);

      // Imagen
      const imgWrap = document.createElement('div');
      imgWrap.className = 'card-image';
      const img = document.createElement('img');
      img.src = image?.src || '';
      img.alt = image?.alt || title || 'Producto';
      imgWrap.appendChild(img);

      // Contenido
      const content = document.createElement('div');
      content.className = 'card-content';

      const info = document.createElement('div');
      info.className = 'product-info';

      const h2 = document.createElement('h2');
      h2.textContent = title || '';
      if (titleFull) h2.dataset.full = titleFull;

      const priceEl = document.createElement('p');
      priceEl.textContent = this.#formatCurrencyARS(price, { maximumFractionDigits: 0 });

      const h3 = document.createElement('h3');
      const cuota = this.#formatCurrencyARS(perInstallment, { maximumFractionDigits: 2 });
      h3.textContent = `${count} cuotas ${interestFree ? 'sin interés ' : ''}de ${cuota}`;

      info.appendChild(h2);
      info.appendChild(priceEl);
      info.appendChild(h3);

      const actions = document.createElement('div');
      actions.className = 'product-actions';
      const addBtn = document.createElement('button');
      addBtn.innerHTML = '<i class="fa-solid fa-bag-shopping"></i>';
      addBtn.type = 'button';
      addBtn.setAttribute('aria-label', 'Agregar al carrito');
      const favBtn = document.createElement('button');
      favBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      favBtn.type = 'button';
      favBtn.setAttribute('aria-label', 'Agregar a favoritos');

      actions.appendChild(addBtn);
      actions.appendChild(favBtn);

      content.appendChild(info);
      content.appendChild(actions);

      card.appendChild(imgWrap);
      card.appendChild(content);

      return card;
    }
  }

  // Exponer la clase globalmente
  window.Productos = Productos;

  // Auto-inicialización en index si existe el contenedor
  function getCategoryFromPage() {
    // Detecta la categoría por el nombre de archivo
    const path = window.location.pathname;
    const match = path.match(/categorias\/(\w+)\.html$/);
    return match ? match[1].toLowerCase() : null;
  }

  function initProductos() {
    const container = document.querySelector('main.productos');
    if (!container) return;

    let lista = [];
    if (typeof productosData !== 'undefined' && Array.isArray(productosData)) {
      const categoria = getCategoryFromPage();
      if (categoria) {
        lista = productosData.filter(p => p.category === categoria);
      } else {
        lista = productosData;
      }
    }

    new Productos({ containerSelector: 'main.productos', products: lista }).render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductos);
  } else {
    initProductos();
  }
})();
