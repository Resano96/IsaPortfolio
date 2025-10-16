const cursor = document.createElement("div");
cursor.classList.add("cursor-ring");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});

document.querySelectorAll("a, button, .art-image").forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});



// Menú móvil con fondo blanco sólido, clic fuera y gesto de deslizamiento
const lanzador = '.menu-toggle';
const desplegable = 'nav';
const claseAbierto = 'open';
const overlaySelector = '.menu-overlay';

function initNav() {
  const btn = document.querySelector(lanzador);
  const nav = document.querySelector(desplegable);
  const overlay = document.querySelector(overlaySelector);
  if (!btn || !nav) return;

  const toggle = (abiertoForzado = null) => {
    const abierto =
      abiertoForzado !== null
        ? abiertoForzado
        : !nav.classList.contains(claseAbierto);
    nav.classList.toggle(claseAbierto, abierto);
    btn.classList.toggle('active', abierto);
    if (overlay) overlay.classList.toggle('active', abierto);

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    if (abierto) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  };

  // Abrir/cerrar con el botón
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  // Cerrar al hacer click en un enlace
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') toggle(false);
  });

  // Cerrar al hacer click fuera del menú
  document.addEventListener('click', (e) => {
    if (nav.classList.contains(claseAbierto)) {
      const isClickInsideNav = nav.contains(e.target) || btn.contains(e.target);
      if (!isClickInsideNav) toggle(false);
    }
  });

  // Cerrar al deslizar hacia la izquierda
  let startX = 0;
  nav.addEventListener('touchstart', (e) => {
    if (nav.classList.contains(claseAbierto)) {
      startX = e.touches[0].clientX;
    }
  }, { passive: true });

  nav.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;

    // Si se desliza hacia la izquierda más de 50px → cerrar
    if (diff < -50) {
      toggle(false);
      startX = 0;
    }
  }, { passive: true });

  nav.addEventListener('touchend', () => {
    startX = 0;
  });

  // --- 🧭 Abrir al deslizar desde el borde izquierdo hacia la derecha ---
  let edgeStartX = 0;
  let edgeStartY = 0;

  document.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    edgeStartX = touch.clientX;
    edgeStartY = touch.clientY;
  });

  document.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - edgeStartX;
    const diffY = Math.abs(touch.clientY - edgeStartY);

    // Evita activarse en scroll vertical
    if (diffY > 60) return;

    // Solo abre si el gesto empieza desde el borde izquierdo (<40px)
    // y se desliza hacia la derecha más de 80px
    if (!nav.classList.contains(claseAbierto) && edgeStartX < 60 && diffX > 80) {
      toggle(true);
    }
  });

  // También cerrar con overlay si existe
  if (overlay) overlay.addEventListener('click', () => toggle(false));
}

initNav();


// Desplazar hasta arriba al pulsar el logo en móvil
document.querySelectorAll('.mobile-logo').forEach((logo) => {
  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});

