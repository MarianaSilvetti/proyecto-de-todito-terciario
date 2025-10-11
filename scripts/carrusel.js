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

  // === Autoplay (cada 10s) y control de reinicio/pausa ===
  const AUTOPLAY_MS = 10000;
  let autoplayId = null;

  const stopAutoplay = () => {
    if (autoplayId !== null) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    autoplayId = setInterval(() => {
      next();
    }, AUTOPLAY_MS);
  };

  const resetAutoplay = () => {
    // reinicia el intervalo cuando el usuario interactúa
    stopAutoplay();
    startAutoplay();
  };

  // Pausar autoplay cuando la pestaña pierde foco y reanudar al volver
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  // botones: preservamos funcionalidad y reiniciamos autoplay al interactuar
  if (leftBtn) {
    // eliminar listeners previos si existieran no necesario aquí, añadimos handler que reinicia
    leftBtn.addEventListener('click', (e) => {
      prev();
      resetAutoplay();
    });
  }
  if (rightBtn) {
    rightBtn.addEventListener('click', (e) => {
      next();
      resetAutoplay();
    });
  }

  // puntos (dots)
  dots.forEach((d, i) => {
    d.addEventListener('click', (e) => {
      const idx = Number(d.dataset.index ?? i);
      if (!Number.isNaN(idx)) {
        goTo(idx);
        resetAutoplay();
      }
    });
    // keyboard support para cada punto
    d.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const idx = Number(d.dataset.index ?? i);
        goTo(idx);
        resetAutoplay();
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

    if (e.key === 'ArrowLeft') {
      prev();
      resetAutoplay();
    }
    if (e.key === 'ArrowRight') {
      next();
      resetAutoplay();
    }
  });

  // swipe touch: pausar mientras el usuario toca y reiniciar después
  let startX = 0;
  let isTouching = false;
  const THRESHOLD = 40; // px mínimo para considerar swipe

  track.addEventListener(
    'touchstart',
    (e) => {
      if (e.touches.length === 1) {
        isTouching = true;
        startX = e.touches[0].clientX;
        stopAutoplay(); // pausamos mientras el usuario interactúa
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
    resetAutoplay(); // reiniciamos autoplay después del touch
  });

  // también reiniciamos autoplay si se hace click/tap en el carrusel (por ejemplo en las flechas)
  carousel.addEventListener('click', () => {
    resetAutoplay();
  });

  // asegurar estado inicial
  update();

  // iniciar autoplay por defecto
  startAutoplay();

  // si el tamaño de las slides cambia (por ejemplo imágenes cargan tarde), forzar repaint
  window.addEventListener('resize', () => update());
});
