// Fonction pour initialiser un slider
function initSlider(container) {
  let slides = container.querySelectorAll(".slides");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function changeSlide(step) {
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // Boutons
  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");
  if (prev && next) {
    prev.addEventListener("click", () => changeSlide(-1));
    next.addEventListener("click", () => changeSlide(1));
  }

  // Affiche la première image
  showSlide(currentIndex);
}

// Initialise tous les sliders présents sur la page
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slideshow-container").forEach(container => {
    initSlider(container);
  });
});
