class Slider {
  slideIdActive = 1;
  dotEls = [];

  constructor(slides, selector) {
    this.slides = slides;
    this.selector = selector;

    this.imgEl = document.querySelector(`${selector} > img`);
    this.textEl = document.querySelector(`${selector} > p`);
    this.dotContainerEl = document.querySelector(`${selector} > .dots`);

    const [arrowLeft, arrowRight] = document.querySelectorAll(
      `${this.selector} > .arrow`
    );
    this.arrowLeftEl = arrowLeft;
    this.arrowRightEl = arrowRight;

    this.handleClickArrowChangeSlideActive =
      this.handleClickArrowChangeSlideActive.bind(this);

    this.handleClickDotChangeSlideActive =
      this.handleClickDotChangeSlideActive.bind(this);
  }

  slider() {
    const slide = this.slides[this.slideIdActive - 1];

    this.imgEl.setAttribute("src", `./assets/images/slideshow/${slide.image}`);

    this.textEl.innerHTML = slide.tagLine;

    this.dotEls.forEach((dot) => {
      if (dot.getAttribute("data-id") == this.slideIdActive) {
        dot.classList.add("dot_selected");
      } else {
        dot.classList.remove("dot_selected");
      }
    });
  }

  handleClickArrowChangeSlideActive(e) {
    const arrow = e.target;
    const slidesLenght = this.slides.length;

    if (arrow.classList.contains("arrow_left")) {
      this.slideIdActive =
        this.slideIdActive <= 1 ? slidesLenght : --this.slideIdActive;
    } else if (arrow.classList.contains("arrow_right")) {
      this.slideIdActive =
        this.slideIdActive >= slidesLenght ? 1 : ++this.slideIdActive;
    } else return;

    this.slider();
  }

  handleClickDotChangeSlideActive(e) {
    const dotId = e.target.getAttribute("data-id");
    this.slideIdActive = parseInt(dotId, 10);

    this.slider();
  }

  createDotEl(id) {
    const dot = document.createElement("div");

    dot.setAttribute("data-id", id);

    dot.classList.add("dot");
    if (this.dotEls.length < 1) dot.classList.add("dot_selected");

    this.dotEls.push(dot);
  }

  insertDots(dotEls) {
    dotEls.forEach((dotEl) => {
      this.dotContainerEl.insertAdjacentElement("beforeend", dotEl);
    });
  }

  init() {
    this.slides.forEach((_, index) => this.createDotEl(index + 1));
    this.insertDots(this.dotEls);

    this.arrowLeftEl.addEventListener(
      "click",
      this.handleClickArrowChangeSlideActive
    );

    this.arrowRightEl.addEventListener(
      "click",
      this.handleClickArrowChangeSlideActive
    );

    this.dotEls.forEach((dot) => {
      dot.addEventListener("click", this.handleClickDotChangeSlideActive);
    });
  }
}
