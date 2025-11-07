// Fonction pour initialiser un slider donné
function initSlider(container) {
  const slides = container.querySelectorAll(".slides");
  if (!slides.length) return; // aucun slide, on sort

  let currentIndex = 0;

  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");

  // Afficher la diapositive correspondant à l’index
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  // Changer d’image
  function changeSlide(step) {
    currentIndex = (currentIndex + step + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  // Gestion des clics sur les flèches
  if (prev) prev.addEventListener("click", () => changeSlide(-1));
  if (next) next.addEventListener("click", () => changeSlide(1));

  // Afficher la première image
  showSlide(currentIndex);

  // ✅ Marque le slider comme initialisé
  container.dataset.sliderInitialized = "true";
}

// Fonction pour initialiser tous les sliders présents dans le DOM
function initAllSliders() {
  document.querySelectorAll(".slideshow-container").forEach(container => {
    if (!container.dataset.sliderInitialized) {
      initSlider(container);
    }
  });
}

// Lancement à la fin du chargement du DOM
document.addEventListener("DOMContentLoaded", initAllSliders);

// ✅ Observer le DOM pour détecter les sliders ajoutés dynamiquement
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.nodeType === 1) {
        if (node.classList.contains("slideshow-container")) {
          initSlider(node);
        } else {
          node.querySelectorAll(".slideshow-container").forEach(initSlider);
        }
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });


