// Código para hacer funcional el carrusel sin tocar el HTML/CSS existente
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carrusel');
  if (!carousel) return;

  const track = carousel.querySelector('.imagenes');
  const slides = Array.from(track.children);
  const leftBtn = carousel.querySelector('.nav-btn.left');
  const rightBtn = carousel.querySelector('.nav-btn.right');
  const dotsContainer = carousel.querySelector('.dots');
  const dots = dotsContainer
    ? Array.from(dotsContainer.querySelectorAll('.dot'))
    : [];

  let index = 0;
  // Si existe un punto activo, empezar por ese
  const activeDot = dots.findIndex((d) => d.classList.contains('active'));
  if (activeDot >= 0) index = activeDot;

  const update = () => {
    // Mover el track usando porcentaje (no requiere cálculo de ancho)
    track.style.transform = `translateX(-${index * 100}%)`;

    // actualizar clases de puntos
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
      d.setAttribute('aria-pressed', i === index ? 'true' : 'false');
    });
  };

  const prev = () => {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };

  const next = () => {
    index = (index + 1) % slides.length;
    update();
  };

  const goTo = (i) => {
    if (i < 0 || i >= slides.length) return;
    index = i;
    update();
  };

  // botones
  if (leftBtn) leftBtn.addEventListener('click', prev);
  if (rightBtn) rightBtn.addEventListener('click', next);

  // puntos
  dots.forEach((d) => {
    d.addEventListener('click', (e) => {
      const idx = Number(d.dataset.index ?? dots.indexOf(d));
      if (!Number.isNaN(idx)) goTo(idx);
    });
    // keyboard support para cada punto
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = Number(d.dataset.index ?? dots.indexOf(d));
        goTo(idx);
      }
    });
  });

  // teclas izquierda/derecha (ignorar cuando se escribe en inputs/textareas)
  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const ignore =
      target &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable);
    if (ignore) return;

    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // swipe touch
  let startX = 0;
  let isTouching = false;
  const THRESHOLD = 40; // px mínimo para considerar swipe

  track.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        isTouching = true;
        startX = e.touches[0].clientX;
      }
    },
    { passive: true }
  );

  track.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;
    const endX =
      (e.changedTouches &&
        e.changedTouches[0] &&
        e.changedTouches[0].clientX) ||
      startX;
    const delta = endX - startX;
    if (Math.abs(delta) > THRESHOLD) {
      if (delta > 0) prev();
      else next();
    }
  });

  // asegurar estado inicial
  update();

  // si el tamaño de las slides cambia (por ejemplo imágenes cargan tarde), forzar repaint
  window.addEventListener('resize', () => update());
});
