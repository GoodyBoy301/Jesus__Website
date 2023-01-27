import LongPage from "classes/LongPage";
import Reveal from "classes/Reveal";
import SplitType from "split-type";
import animate from "../../animations/@hamburger";

export default class Home extends LongPage {
  constructor() {
    super({
      element: ".home",
      id: "home",
      elements: {
        wrapper: ".home__wrapper",
        worksWrapper: ".home__works__wrapper",
        parallaxElements: "[data-parallax]",
      },
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate({ scroll: {} });
    this.ham.animation = animate();
    new SplitType(".home__work__title");
    this.stats = new SplitType(".home__stats__number");
    this.stats.chars.forEach((char) => {
      char.setAttribute("before", Math.max(0, char.textContent - 1));
      char.setAttribute("after", char.textContent);
    });

    new Reveal({
      elements: {
        work__title: ".home__work__title",
        work__text: ".home__work__text",
        stat: ".home__stats__number",
        stat__desc: ".home__stats__description",
        // work__image: ".home__work__image",
        blackener: "h2 span",
      },
      animateIn: "fadeInScaleUp",
      threshold: this.isMobile ? 1 : 0.2,
      unobserve: this.isMobile ? true : false,
    });
  }

  ham() {
    const previousShowHam = this.showHam;
    this.showHam = this.scroll.current > this.hamLowerLimit ? true : false;
    if (this.showHam === previousShowHam) return;
    if (this.showHam || this.isMobile) this.ham.animation.play();
    else this.ham.animation.reverse();
  }
}
