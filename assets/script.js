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

const [arrowLeft, arrowRight] = document.querySelectorAll(".arrow");
const dotsEl = document.querySelector(".dots");
const imgEl = document.querySelector("#banner img");
const textEl = document.querySelector("#banner p");

createDot(dotsEl);

let slideIndex = 0;

arrowLeft.addEventListener("click", (e) => {
  if (slideIndex <= 0) {
    slideIndex = slides.length - 1;
  } else {
    --slideIndex;
  }

  imgEl.setAttribute(
    "src",
    `./assets/images/slideshow/${slides[slideIndex].image}`
  );

  textEl.innerHTML = slides[slideIndex].tagLine;

  [...dotsEl.children].forEach((el) => {
    el.className = "dot";
  });

  dotsEl.children.item(slideIndex).className = "dot dot_selected";
});

arrowRight.addEventListener("click", () => {
  if (slideIndex >= slides.length - 1) {
    slideIndex = 0;
  } else {
    ++slideIndex;
  }

  imgEl.setAttribute(
    "src",
    `./assets/images/slideshow/${slides[slideIndex].image}`
  );

  textEl.innerHTML = slides[slideIndex].tagLine;

  [...dotsEl.children].forEach((el) => {
    el.className = "dot";
  });

  dotsEl.children.item(slideIndex).className = "dot dot_selected";
});

/**
 *
 * @param {Element} element
 */
function createDot(element) {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");

    if (element.children.length <= 0) {
      dot.classList.add("dot", "dot_selected");
    } else {
      dot.classList.add("dot");
    }

    element.appendChild(dot);
  }
}
