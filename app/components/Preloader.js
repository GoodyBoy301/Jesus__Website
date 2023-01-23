import * as animate from "animations/@preloader";
import Component from "classes/Component";
import gsap from "gsap";
import SplitType from "split-type";
import { asyncRandom } from "utils/math";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        percentage: ".preloader__number",
        texts: ".preloader__text",
        bar: ".preloader__bar",
      },
    });
    this.isMobile = innerWidth < 768;

    this.percentage = new SplitType(this.elements.percentage);
    this.texts = new SplitType(this.elements.texts);
    this.limit = 100;
    this.value = "00";
    this.amountLoaded = 0;
    this.remainder = 0;

    animate.enter(this.percentage, this.texts, this.pseudoPreload.bind(this));
  }

  async onCompleted() {
    this.dispatchEvent({ type: "preloaded" });
    this.destroy();
  }

  async pseudoPreload() {
    if (this.amountLoaded === this.limit) return;

    const random = await asyncRandom(5, 200);

    this.amountLoaded += random;
    if (this.amountLoaded >= this.limit) this.amountLoaded = this.limit;

    gsap.to(this.elements.bar, {
      width: `${this.amountLoaded}%`,
      delay: 0.4,
      duration: 0.4,
    });

    this.value = ("0" + Math.floor(this.amountLoaded)).slice(-2);
    this.percentage.chars[0].innerText = this.value[0];
    this.percentage.chars[1].innerText = this.value[1];

    const remainder = Math.floor(this.amountLoaded / 20);

    if (this.remainder === 4) {
      this.amountLoaded === this.limit
        ? animate.leave(
            this.elements.percentage,
            this.texts,
            this.onCompleted.bind(this)
          )
        : this.pseudoPreload();
    } else if (this.remainder !== remainder) {
      animate.progress(
        this.remainder,
        remainder,
        this.texts,
        this.pseudoPreload.bind(this)
      );
    } else {
      requestAnimationFrame(this.pseudoPreload.bind(this));
    }

    this.remainder = remainder;
  }

  destroy() {
    this.element.parentElement.removeChild(this.element);
    if (this.isMobile) document.querySelector("html").style.overflow = "scroll";
  }
}
