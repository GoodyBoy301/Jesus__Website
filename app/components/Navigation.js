import gsap from "gsap";
import Component from "classes/Component";
import { map } from "utils/math";

export default class Preloader extends Component {
  constructor(template) {
    super({
      element: ".navigation",
      elements: {
        links: ".header__item",
        screenLinks: ".navigation__screen__link",
        activeLink: `#${template}`,
        wrapper: ".home__wrapper",
        worksWrapper: ".home__works__wrapper",
        hamburger: ".navigation__hamburger__wrapper",
        screen: ".navigation__screen__wrapper",
      },
    });
    this.addEventListeners();
    this.create();
  }

  create() {
    this.reCalculate();
    this.previousIndex = 0;
  }
  reCalculate() {
    this.isMobile = innerWidth < 768;

    this.scrolls = [
      {
        target: 0,
        targetX: 0,
      },
      {
        target:
          (this.elements.wrapper.clientHeight - innerHeight) /
          (this.isMobile ? 10.25 : 7),
        targetX: 0,
      },
      {
        target:
          (this.elements.wrapper.clientHeight - innerHeight) /
          (this.isMobile ? 4.75 : 2.375),
        targetX: 0,
      },
      {
        // target:
        //   (this.elements.wrapper.clientHeight - innerHeight) /
        //   (this.isMobile ? 1.12 : 1.55),
        target:
          (this.elements.wrapper.clientHeight - innerHeight) /
          (this.isMobile ? 1.12 : 1.3),
        current:
          (this.elements.wrapper.clientHeight - innerHeight) /
          (this.isMobile ? 1.12 : 1.3),
        targetX: this.isMobile
          ? 0
          : this.elements.worksWrapper?.clientWidth - innerWidth,
      },
      {
        target:
          (this.elements.wrapper.clientHeight - innerHeight) /
          (this.isMobile ? 1 : 1.05),
        targetX: this.isMobile
          ? 0
          : this.elements.worksWrapper?.clientWidth - innerWidth,
      },
    ];
  }

  navigate(index, close = false) {
    const toWorks =
      (this.previousIndex === 2 && index === 3) ||
      (this.previousIndex === 3 && index === 2);
    if (
      this.isMobile &&
      Math.abs(index - this.previousIndex) <= 1 &&
      !toWorks
    ) {
      scrollTo({ top: this.scrolls[index].target, behavior: "smooth" });
    } else if (this.isMobile) {
      scrollTo({
        top: map(
          0.75,
          0,
          1,
          this.scrolls[this.previousIndex].target,
          this.scrolls[index].target
        ),
      });
      scrollTo({ top: this.scrolls[index].target, behavior: "smooth" });
    } else {
      this.dispatchEvent({ type: "smoothScroll", scroll: this.scrolls[index] });
    }
    if (close) this.toggle();
    this.previousIndex = index;
  }

  toggle() {
    const { hamburger, screen } = this.elements;
    if (hamburger.classList.contains("open")) {
      hamburger.classList.remove("open");
      screen.classList.remove("open");
    } else {
      hamburger.classList.add("open");
      screen.classList.add("open");
    }
  }

  addEventListeners() {
    this.elements.links.forEach((element, index) => {
      element.onclick = () => this.navigate(index);
    });
    this.elements.screenLinks.forEach((element, index) => {
      element.onclick = () => this.navigate(index, true);
    });
    this.elements.hamburger.onclick = () => this.toggle();
  }
}
