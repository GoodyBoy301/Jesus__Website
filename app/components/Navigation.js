import gsap from "gsap";
import Component from "classes/Component";

export default class Preloader extends Component {
  constructor(template) {
    super({
      element: ".navigation",
      elements: {
        links: ".nav__item",
        anchorLinks: ".nav__item__destination",
        activeLink: `#${template}`,
        highlighter: ".nav__item__highlighter",
        wrapper: ".home__wrapper",
        worksWrapper: ".home__works__wrapper",
      },
    });
    this.addEventListeners();
    this.create();
  }

  create() {
    this.reCalculate();
    this.elements.activeLink.classList.add("nav__item__active");
    const bounds = this.elements.activeLink.getBoundingClientRect();
    gsap.to(".nav__item__highlighter", {
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
      top: bounds.top,
    });
  }
  reCalculate() {
    this.scrolls = [
      {
        target: 0,
        targetX: 0,
        // last: { y: 0, clientY: 0, x: 0, clientX: 0 },
        limit: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertA: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertB: this.elements.wrapper?.clientHeight - innerHeight,
        limitHor: this.elements.worksWrapper?.clientWidth - innerWidth,
      },
      {
        target: (this.elements.wrapper.clientHeight - innerHeight) / 7,
        targetX: 0,
        // last: { y: 0, clientY: 0, x: 0, clientX: 0 },
        limit: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertA: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertB: this.elements.wrapper?.clientHeight - innerHeight,
        limitHor: this.elements.worksWrapper?.clientWidth - innerWidth,
      },
      {},
      {
        target: (this.elements.wrapper.clientHeight - innerHeight) / 2.375,
        targetX: 0,
        // last: { y: 0, clientY: 0, x: 0, clientX: 0 },
        limit: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertA: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertB: this.elements.wrapper?.clientHeight - innerHeight,
        limitHor: this.elements.worksWrapper?.clientWidth - innerWidth,
      },
      {
        target: (this.elements.wrapper.clientHeight - innerHeight) / 1.55,
        targetX: this.elements.worksWrapper?.clientWidth - innerWidth,
        // last: { y: 0, clientY: 0, x: 0, clientX: 0 },
        limit: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertA: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertB: this.elements.wrapper?.clientHeight - innerHeight,
        limitHor: this.elements.worksWrapper?.clientWidth - innerWidth,
      },
      {
        target: (this.elements.wrapper.clientHeight - innerHeight) / 1.05,
        targetX: this.elements.worksWrapper?.clientWidth - innerWidth,
        // last: { y: 0, clientY: 0, x: 0, clientX: 0 },
        limit: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertA: (this.elements.wrapper?.clientHeight - innerHeight) / 2.375,
        limitVertB: this.elements.wrapper?.clientHeight - innerHeight,
        limitHor: this.elements.worksWrapper?.clientWidth - innerWidth,
      },
    ];
  }

  highlight(element, index) {
    this.elements.links.forEach((element) => {
      element.classList.remove("nav__item__active");
    });
    element.classList.add("nav__item__active");
    const bounds = element.getBoundingClientRect();
    gsap.to(".nav__item__highlighter", {
      left: bounds.left,
      width: bounds.width,
      height: bounds.height,
      top: bounds.top,
    });
    if (index === 2) {
      console.log(6);
    } else {
      this.dispatchEvent({ type: "smoothScroll", scroll: this.scrolls[index] });
    }
  }

  addEventListeners() {
    this.elements.links.forEach((element, index) => {
      element.onclick = () => this.highlight(element, index);
    });
    this.elements.anchorLinks.forEach((element) => {
      element.onclick = (e) => e.preventDefault();
    });
  }
}
