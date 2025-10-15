// Selecciona las imágenes dentro del contenedor .arts
const artImages = document.querySelectorAll(".arts .art-image");

// Crear el modal si no existe
let artViewer = document.createElement("div");
artViewer.classList.add("art-viewer");
let modalImg = document.createElement("img");
artViewer.appendChild(modalImg);
document.body.appendChild(artViewer);

// Al hacer clic en una imagen, abrir el modal
artImages.forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    artViewer.style.display = "flex";
    setTimeout(() => artViewer.classList.add("active"), 10);
  });
});

// Cerrar el modal al hacer clic en cualquier parte
artViewer.addEventListener("click", () => {
  artViewer.classList.remove("active");
  setTimeout(() => (artViewer.style.display = "none"), 300);
});