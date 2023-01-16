class Slider {
  slideIdActive = 1;

  constructor(slides, selector) {
    this.slides = slides;
    this.selector = selector;

    this.imgEl = document.querySelector(`${selector} > img`);
    this.textEl = document.querySelector(`${selector} > p`);

    // Arrows
    const [arrowLeft, arrowRight] = document.querySelectorAll(
      `${this.selector} > .arrow`
    );
    this.arrowLeftEl = arrowLeft;
    this.arrowRightEl = arrowRight;

    // Dots
    this.dotContainerEl = document.querySelector(`${selector} > .dots`);
    this.dotEls = this.slides.map((_, index) =>
      this.createDotEl(++index, index === this.slideIdActive)
    );

    // Events
    this.onArrowChangeSlide = this.onArrowChangeSlide.bind(this);
    this.onDotChangeSlide = this.onDotChangeSlide.bind(this);
  }

  createDotEl(id, active = false) {
    const dotEl = document.createElement("div");

    dotEl.setAttribute("data-slide", id);
    dotEl.classList.add("dot");

    if (active) dotEl.classList.add("dot_selected");

    return dotEl;
  }

  slider() {
    const { image, tagLine } = this.slides[this.slideIdActive - 1];

    this.imgEl.setAttribute("src", `./assets/images/slideshow/${image}`);

    this.textEl.innerHTML = tagLine;
  }

  changeDotActive() {
    this.dotEls.forEach((dot) => {
      if (dot.getAttribute("data-slide") == this.slideIdActive) {
        dot.classList.add("dot_selected");
      } else {
        dot.classList.remove("dot_selected");
      }
    });
  }

  onArrowChangeSlide(e) {
    const arrow = e.target;
    const slidesLenght = this.slides.length;

    if (arrow.classList.contains("arrow_left")) {
      this.slideIdActive =
        this.slideIdActive <= 1 ? slidesLenght : --this.slideIdActive;
    } else if (arrow.classList.contains("arrow_right")) {
      this.slideIdActive =
        this.slideIdActive >= slidesLenght ? 1 : ++this.slideIdActive;
    } else return;

    this.changeDotActive();

    this.slider();
  }

  onDotChangeSlide(e) {
    const dotId = e.target.getAttribute("data-slide");

    this.slideIdActive = parseInt(dotId, 10);

    this.changeDotActive();

    this.slider();
  }

  disable() {
    this.arrowLeftEl.style.display = "none";
    this.arrowLeftEl.removeEventListener("click", this.onArrowChangeSlide);

    this.arrowRightEl.style.display = "none";
    this.arrowRightEl.removeEventListener("click", this.onArrowChangeSlide);

    this.dotEls.forEach((dotEl) => {
      dotEl.removeEventListener("click", this.onDotChangeSlide);

      this.dotContainerEl?.remove();
    });

    this.slideIdActive = 1;

    this.slider();
  }

  init() {
    this.arrowLeftEl.style.display = "block";
    this.arrowLeftEl.addEventListener("click", this.onArrowChangeSlide);

    this.arrowRightEl.style.display = "block";
    this.arrowRightEl.addEventListener("click", this.onArrowChangeSlide);

    this.dotEls.forEach((dotEl) => {
      this.dotContainerEl.insertAdjacentElement("beforeend", dotEl);

      dotEl.addEventListener("click", this.onDotChangeSlide);
    });
  }
}
