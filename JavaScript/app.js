document.querySelectorAll(".hovered-ripple").forEach((el) => {
  el.addEventListener("mouseenter", function (e) {
    const span = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - rect.left - size / 2}px`;
    span.style.top = `${e.clientY - rect.top - size / 2}px`;
    this.appendChild(span);
    setTimeout(() => span.remove(), 600);
  });
});