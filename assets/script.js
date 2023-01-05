const slides = [
  {
    image: "slide1.jpg",
    tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
  },
  {
    image: "slide2.jpg",
    tagLine:
      "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
  },
  {
    image: "slide3.jpg",
    tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
  },
  {
    image: "slide4.png",
    tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
  },
];

/* ==== Carrousel ==== */
const dotsEl = document.querySelector(".dots");
const [arrowLeft, arrowRight] = document.querySelectorAll(".arrow");

let sliderId = 1; // Variable global de référence pour le slide actif en cours

createDots(dotsEl, slides.length);

// Permets d'écouter sur les dots et de sélectionner le slide que l'on souhaite
dotsEl.addEventListener("click", (e) => {
  e.preventDefault();

  const dot = e.target.getAttribute("data-id");

  if (!dot) return;

  sliderId = Number(dot);

  slider();
});

arrowLeft.addEventListener("click", () => {
  sliderId = sliderId <= 1 ? slides.length : --sliderId;

  slider();
}); // Flêche de gauche du slider

arrowRight.addEventListener("click", () => {
  sliderId = sliderId >= slides.length ? 1 : ++sliderId;

  slider();
}); // Flêche de droite du slider

/**
 * Fonction de changement de slide
 * Elle se sert de la variable de référence sliderIndex et de l'array slides
 */
function slider() {
  const imgEl = document.querySelector("#banner img");
  const textEl = document.querySelector("#banner p");

  const slideIndex = sliderId - 1;

  imgEl.setAttribute(
    "src",
    `./assets/images/slideshow/${slides[slideIndex].image}`
  );

  textEl.innerHTML = slides[slideIndex].tagLine;

  [...dotsEl.children].forEach((el) => {
    el.className = "dot";
  });

  dotsEl.children.item(slideIndex).className = "dot dot_selected";
}

/**
 * Créé les points (dots) et les ajoutes sur l'élément parent
 * @param {Element} element // Element parent
 * @param {number} length // Nombre de dot
 */
function createDots(element, length = 4) {
  for (let i = 0; i < length; i++) {
    const dot = document.createElement("div");

    dot.setAttribute("data-id", i + 1);

    if (element.children.length <= 0) {
      dot.classList.add("dot", "dot_selected");
    } else {
      dot.classList.add("dot");
    }

    element.appendChild(dot);
  }
}
