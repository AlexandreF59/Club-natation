// Fonction pour initialiser un slider donné
function initSlider(container) {
  const slides = container.querySelectorAll(".slides");
  if (!slides.length) return; // Aucun slide, on sort

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

  // Ajouter événements aux boutons si présents
  const prev = container.querySelector(".prev");
  const next = container.querySelector(".next");
  if (prev) prev.addEventListener("click", () => changeSlide(-1));
  if (next) next.addEventListener("click", () => changeSlide(1));

  // Affiche la première image
  showSlide(currentIndex);
}

// Initialisation automatique pour tous les sliders déjà dans le DOM
function initAllSliders() {
  document.querySelectorAll(".slideshow-container").forEach(container => {
    // Evite de réinitialiser un slider déjà initialisé
    if (!container.dataset.sliderInitialized) {
      initSlider(container);
      container.dataset.sliderInitialized = "true";
    }
  });
}

// Exécute dès que le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
  initAllSliders();
});

// Observer le DOM pour détecter les sliders ajoutés dynamiquement
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === 1 && node.classList.contains("slideshow-container")) {
        initSlider(node);
        node.dataset.sliderInitialized = "true";
      } else if (node.nodeType === 1) {
        // Recherche de sliders à l’intérieur des nouveaux noeuds
        node.querySelectorAll(".slideshow-container").forEach(slider => {
          initSlider(slider);
          slider.dataset.sliderInitialized = "true";
        });
      }
    });
  });
});

// Observer tout le body pour les ajouts dynamiques
observer.observe(document.body, { childList: true, subtree: true });

