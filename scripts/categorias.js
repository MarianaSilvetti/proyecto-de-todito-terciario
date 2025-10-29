'use strict';

(function () {
  // Elementos del DOM
  const categoryBtn = document.getElementById('category-btn');
  const categoriesMenu = document.getElementById('categories-menu');
  const categoriesOverlay = document.getElementById('categories-overlay');
  const subcategoriesGrid = document.getElementById('subcategories-grid');
  const categoryItems = document.querySelectorAll('.category-item');

  // Los datos de subcategorías se cargan desde listas.js
  // Se accede a través de la variable global subcategoriasData

  let menuOpenTimeout = null;
  let menuCloseTimeout = null;

  // Función para mostrar el menú (por click)
  function showMenu() {
    categoriesMenu.classList.add('active');
    categoriesOverlay.classList.add('active');
    if (categoryBtn) {
      categoryBtn.setAttribute('aria-expanded', 'true');
      categoryBtn.classList.add('active');
    }
    // Asegurar categoría activa y subcategorías renderizadas
    const active = document.querySelector('.category-item.active');
    if (!active) {
      if (categoryItems.length > 0) {
        categoryItems[0].classList.add('active');
        const cat = categoryItems[0].getAttribute('data-category') || 'blanqueria';
        renderSubcategories(cat);
      } else {
        renderSubcategories('blanqueria');
      }
    }
  }

  // Función para ocultar el menú
  function hideMenu() {
    categoriesMenu.classList.remove('active');
    categoriesOverlay.classList.remove('active');
    if (categoryBtn) {
      categoryBtn.setAttribute('aria-expanded', 'false');
      categoryBtn.classList.remove('active');
    }
  }

  // Función para renderizar subcategorías
  function renderSubcategories(category) {
    const subcategorias = subcategoriasData[category] || subcategoriasData.blanqueria;
    
    subcategoriesGrid.innerHTML = '';
    
    subcategorias.forEach(subcat => {
      const item = document.createElement('a');
      item.href = subcat.link;
      item.className = 'subcategory-item';
      
      const circle = document.createElement('div');
      circle.className = 'subcategory-circle';
      
      if (subcat.isVerTodo) {
        circle.classList.add('ver-todo');
      } else if (subcat.image) {
        const img = document.createElement('img');
        img.src = subcat.image;
        img.alt = subcat.name;
        img.loading = 'lazy';
        circle.appendChild(img);
      }
      
      const name = document.createElement('div');
      name.className = 'subcategory-name';
      name.textContent = subcat.name;
      
      item.appendChild(circle);
      item.appendChild(name);
      subcategoriesGrid.appendChild(item);
    });
  }

  // Toggle por click en el botón de categorías
  if (categoryBtn) {
    categoryBtn.setAttribute('aria-haspopup', 'true');
    categoryBtn.setAttribute('aria-expanded', 'false');
    categoryBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (categoriesMenu.classList.contains('active')) {
        hideMenu();
      } else {
        showMenu();
      }
    });
  }

  // Evitar que los clicks dentro del menú cierren el menú
  if (categoriesMenu) {
    categoriesMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // Event listeners para los items de categoría (hover y click)
  categoryItems.forEach(item => {
    const handleActivate = function() {
      // Remover clase active de todos los items
      categoryItems.forEach(i => i.classList.remove('active'));
      // Agregar clase active al item actual
      this.classList.add('active');
      // Renderizar subcategorías correspondientes
      const category = this.getAttribute('data-category');
      renderSubcategories(category);
    };

    item.addEventListener('mouseenter', handleActivate);
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleActivate.call(item);
    });
  });

  // Cerrar menú al hacer click en el overlay
  if (categoriesOverlay) {
    categoriesOverlay.addEventListener('click', hideMenu);
  }

  // Cerrar al click fuera del botón/menú
  document.addEventListener('click', (e) => {
    const clickDentroMenu = categoriesMenu && categoriesMenu.contains(e.target);
    const clickEnBoton = categoryBtn && categoryBtn.contains(e.target);
    if (!clickDentroMenu && !clickEnBoton && categoriesMenu.classList.contains('active')) {
      hideMenu();
    }
  });

  // Renderizar subcategorías por defecto (blanquería)
  renderSubcategories('blanqueria');
  
  // Marcar la primera categoría como activa por defecto
  if (categoryItems.length > 0) {
    categoryItems[0].classList.add('active');
  }
})();
