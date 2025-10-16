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





// Menú móvil con fondo blanco sólido y sin movimiento del contenido
const lanzador = '.menu-toggle';
const desplegable = 'nav';
const claseAbierto = 'open';
const overlaySelector = '.menu-overlay';

function initNav() {
  const btn = document.querySelector(lanzador);
  const nav = document.querySelector(desplegable);
  const overlay = document.querySelector(overlaySelector);

  // Si no hay botón o nav, salir silenciosamente
  if (!btn || !nav) return;

  const toggle = () => {
    const abierto = nav.classList.toggle(claseAbierto);
    btn.classList.toggle('active', abierto);
    if (overlay) overlay.classList.toggle('active', abierto);

    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (abierto) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  };

  // Abrir / cerrar menú
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggle();
  });

  // Cerrar al hacer click en un enlace dentro del nav
  nav.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      nav.classList.remove(claseAbierto);
      btn.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  });

  // Cerrar al hacer click en el overlay (si existe)
  if (overlay) {
    overlay.addEventListener('click', () => {
      nav.classList.remove(claseAbierto);
      btn.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    });
  }
}

initNav();