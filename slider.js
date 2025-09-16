let slideIndex = 0;

function showSlide(n) {
  const slides = document.querySelectorAll(".slides");
  if (slides.length === 0) return;

  slideIndex = (n + slides.length) % slides.length;

  slides.forEach((s, i) => {
    s.style.display = (i === slideIndex) ? "block" : "none";
  });
}

function changeSlide(n) {
  showSlide(slideIndex + n);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(slideIndex);
  setInterval(() => changeSlide(1), 5000); // défile auto toutes les 5s
});
