document.addEventListener("DOMContentLoaded", () => {
  const imagenes = document.querySelectorAll("img");

  imagenes.forEach(img => {

    const rutaReal = img.src;

    img.dataset.src = rutaReal;
    img.src = "assets/patito.png"; 

    
    const real = new Image();
    real.src = rutaReal;

    real.onload = () => {
      img.src = rutaReal; 
    };
  });
});
document.getElementById("miImagen").addEventListener("click", () => {
  window.location.href = "https://tusitio.com/otra-pagina.html";
});