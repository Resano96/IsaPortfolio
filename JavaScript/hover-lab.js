// ===============================
// 🌐 CONTROL DE TRANSICIONES ENTRE PÁGINAS
// ===============================
(() => {
  const body = document.body;
  const btn = document.getElementById("toggleTransition");

  const TRANSITIONS = [
    "transition-fade",
    "transition-overlay",
    "transition-zoomout",
    "transition-slide",
  ];

  const getIndex = () => {
    const val = parseInt(localStorage.getItem("transitionIndex"), 10);
    return Number.isInteger(val) && val >= 0 && val < TRANSITIONS.length ? val : 0;
  };
  const setIndex = (i) => localStorage.setItem("transitionIndex", String(i));

  const applyTransitionClass = (i) => {
    body.classList.remove(
      ...TRANSITIONS,
      "loaded",
      "transitioning",
      "transitioning-slide"
    );
    body.classList.add(TRANSITIONS[i]);
  };

  const updateButtonLabel = (i) => {
    if (!btn) return;
    const name = TRANSITIONS[i].replace("transition-", "");
    btn.textContent = `Transición: ${name}`;
  };

  const playEntry = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => body.classList.add("loaded"));
    });
  };

  const playExit = (href, i) => {
    const transition = TRANSITIONS[i];
    body.classList.remove("loaded");

    if (transition.includes("slide")) {
      body.classList.add("transitioning-slide");
    } else if (transition.includes("overlay")) {
      body.classList.add("transitioning");
    }

    setTimeout(() => (window.location.href = href), 600);
  };

  const initTransitions = () => {
    body.classList.remove("transitioning", "transitioning-slide");

    const currentIndex = getIndex();
    applyTransitionClass(currentIndex);
    updateButtonLabel(currentIndex);
    playEntry();

    document.querySelectorAll("a.transition-link").forEach((link) => {
      if (link.hostname === window.location.hostname) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          playExit(link.href, getIndex());
        });
      }
    });

    if (btn) {
      btn.addEventListener("click", () => {
        const nextIndex = (getIndex() + 1) % TRANSITIONS.length;
        setIndex(nextIndex);
        playExit(window.location.href, getIndex());
      });
    }
  };

  window.addEventListener("DOMContentLoaded", initTransitions);
})();

// ===============================
// 🌀 EFECTOS HOVER INTERACTIVOS
// ===============================

// --- Hover Tilt (inclinación 3D) ---
document.querySelectorAll(".hovered-tilt").forEach((card) => {
  const img = card.querySelector("img");
  if (!img) return;

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -60;
    img.style.transform = `rotateY(${x}deg) rotateX(${y}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    img.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });
});

// --- Hover ZoomFade (zoom + opacidad suave) ---
document.querySelectorAll(".hovered-zoomfade").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    el.style.transition = "transform 0.4s ease, opacity 0.4s ease";
    el.style.transform = "scale(1.05)";
    el.style.opacity = "0.95";
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "scale(1)";
    el.style.opacity = "1";
  });
});

// --- Hover Grain (textura granular animada) ---
document.querySelectorAll(".hovered-grain").forEach((el) => {
  const noise = document.createElement("div");
  noise.classList.add("grain-layer");
  Object.assign(noise.style, {
    position: "absolute",
    inset: "0",
    background:
      "url('https://grainy-gradients.vercel.app/noise.svg') repeat center",
    opacity: "0",
    mixBlendMode: "overlay",
    transition: "opacity 0.4s ease",
    pointerEvents: "none",
    zIndex: "2",
  });
  el.style.position = "relative";
  el.appendChild(noise);

  el.addEventListener("mouseenter", () => {
    noise.style.opacity = "0.35";
  });
  el.addEventListener("mouseleave", () => {
    noise.style.opacity = "0";
  });
});

// --- Hover Reveal (imagen secundaria que aparece al pasar) ---
document.querySelectorAll(".hovered-reveal").forEach((card) => {
  const main = card.querySelector(".main");
  const hover = card.querySelector(".hover");
  if (!main || !hover) return;

  hover.style.opacity = "0";
  hover.style.position = "absolute";
  hover.style.top = "0";
  hover.style.left = "0";
  hover.style.transition = "opacity 0.4s ease";

  card.style.position = "relative";
  card.style.overflow = "hidden";

  card.addEventListener("mouseenter", () => {
    hover.style.opacity = "1";
  });
  card.addEventListener("mouseleave", () => {
    hover.style.opacity = "0";
  });
});

// --- Hover Magnetic (efecto imán más visible) ---
document.querySelectorAll(".hovered-nav").forEach((link) => {
  link.addEventListener("mousemove", (e) => {
    const rect = link.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    
    // multiplicadores más altos → más movimiento
    const moveX = offsetX * 0.25; 
    const moveY = offsetY * 0.25; 
    
    link.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  });

  link.addEventListener("mouseleave", () => {
    link.style.transform = "translate(0, 0) scale(1)";
  });
});

// ===============================
// 💡 INDICADOR VISUAL DEL MODO ACTUAL
// ===============================
(() => {
  const existing = document.getElementById("transition-indicator");
  if (existing) existing.remove();

  const el = document.createElement("div");
  el.id = "transition-indicator";
  Object.assign(el.style, {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    background: "rgba(0,0,0,0.7)",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    fontSize: "0.9rem",
    opacity: "0",
    transition: "opacity 0.4s ease",
    zIndex: "99999",
    pointerEvents: "none",
  });
  document.body.appendChild(el);

  const updateIndicator = () => {
    const val = localStorage.getItem("transitionIndex");
    const idx = val ? parseInt(val, 10) : 0;
    const name = ["fade", "overlay", "zoomout", "slide"][idx] || "fade";
    el.textContent = `Modo: ${name}`;
    el.style.opacity = "1";
    setTimeout(() => (el.style.opacity = "0"), 1200);
  };

  window.addEventListener("DOMContentLoaded", updateIndicator);
})();