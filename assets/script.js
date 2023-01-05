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

let sliderIndex = 0;

createDots(dotsEl);

arrowLeft.addEventListener("click", () => {
  sliderIndex = sliderIndex <= 0 ? slides.length - 1 : --sliderIndex;

  slider();
});

arrowRight.addEventListener("click", () => {
  sliderIndex = sliderIndex >= slides.length - 1 ? 0 : ++sliderIndex;

  slider();
});

/**
 *
 * @param {Element} element
 */
function createDots(element) {
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("div");

    if (element.children.length <= 0) {
      dot.classList.add("dot", "dot_selected");
    } else {
      dot.classList.add("dot");
    }

    element.appendChild(dot);
  }

  element.addEventListener("click", (e) => {
    e.preventDefault()

    sliderIndex = i;

    slider();
  });
}

function slider() {
  const imgEl = document.querySelector("#banner img");
  const textEl = document.querySelector("#banner p");

  imgEl.setAttribute(
    "src",
    `./assets/images/slideshow/${slides[sliderIndex].image}`
  );

  textEl.innerHTML = slides[sliderIndex].tagLine;

  [...dotsEl.children].forEach((el) => {
    el.className = "dot";
  });

  dotsEl.children.item(sliderIndex).className = "dot dot_selected";
}
