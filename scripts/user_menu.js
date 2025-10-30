// scripts/user_menu.js
// Despliega un menú bajo el botón de usuario logueado en index-logued.
(function () {
  'use strict';

  function createDropdown() {
    const menu = document.createElement('div');
    menu.className = 'user-dropdown';

    const personal = document.createElement('button');
    personal.type = 'button';
    personal.className = 'dropdown-item';
    personal.setAttribute('data-proximamente', 'true');
    personal.innerHTML = '<i class="fa-solid fa-id-card"></i><span>Datos personales</span>';

    const logout = document.createElement('a');
    logout.href = 'index.html';
    logout.className = 'dropdown-item logout';
    logout.innerHTML = '<i class="fa-solid fa-right-from-bracket"></i><span>Cerrar sesión</span>';

    menu.appendChild(personal);
    menu.appendChild(logout);

    document.body.appendChild(menu);
    return menu;
  }

  function positionDropdown(dropdown, anchor) {
    const rect = anchor.getBoundingClientRect();
    const menuWidth = dropdown.offsetWidth || 220;

    let left = Math.min(rect.left, window.innerWidth - menuWidth - 8);
    if (left < 8) left = 8;

    const top = rect.bottom + 8;

    dropdown.style.left = left + 'px';
    dropdown.style.top = top + 'px';
  }

  function init() {
    const btn = document.querySelector('header .user-actions .user-menu');
    if (!btn) return;

    const dropdown = createDropdown();

    let open = false;
    function show() {
      positionDropdown(dropdown, btn);
      dropdown.classList.add('open');
      open = true;
      const firstItem = dropdown.querySelector('.dropdown-item');
      if (firstItem) firstItem.focus();
    }
    function hide() {
      dropdown.classList.remove('open');
      open = false;
    }
    function toggle() {
      if (open) hide(); else show();
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    });

    document.addEventListener('click', (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (open && !t.closest('.user-dropdown') && !t.closest('.user-menu')) {
        hide();
      }
    });

    window.addEventListener('resize', () => { if (open) positionDropdown(dropdown, btn); });
    window.addEventListener('scroll', () => { if (open) positionDropdown(dropdown, btn); }, true);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && open) hide();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
