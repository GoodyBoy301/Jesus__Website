import Page from "classes/Page";
import NormalizeWheel from "normalize-wheel";
import Prefix from "prefix";
import { clamp, lerp, pixelToRem, snapTo } from "utils/math";


export default class LongPage extends Page {
  constructor(params) {
    super(params);
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate({ scroll: {} });
    this.transformPrefix = Prefix("transform");
    // this.Revealer = new Reveal({
    //   elements: {},
    // });
  }
  update() {
    this.scroll && this.smoothScroll();
  }
  destroy() {
    // this.Revealer.observer.disconnect();
  }

  reCalculate({
    scroll: {
      current = 0,
      target = 0,
      currentX = 0,
      targetX = 0,
      last = { y: 0, clientY: 0, x: 0, clientX: 0 },
      limit = (this.elements.wrapper.clientHeight - innerHeight) / 2.275,
      limitVertA = (this.elements.wrapper.clientHeight - innerHeight) / 2.275,
      limitVertB = this.elements.wrapper.clientHeight - innerHeight,
      limitHor = this.elements.worksWrapper.clientWidth - innerWidth,
      normal = 0,
    },
  }) {
    this.isMobile = innerWidth < 768;
    this.hamLowerLimit = pixelToRem(15);
    this.showHam = this.isMobile ? true : false;

    this.scrollUp = true;
    this.scroll = {
      current,
      target,
      currentX,
      targetX,
      last,
      limit: this.isMobile ? limit * 2.275 : limit,
      limitVertA: this.isMobile ? limitVertA * 2.275 : limitVertA,
      limitVertB,
      limitHor,
      normal,
    };
    this.snapPoints = [
      (this.elements.wrapper.clientHeight - innerHeight) / 4.5,
      (this.elements.wrapper.clientHeight - innerHeight) / 2.90275,
      (this.elements.wrapper.clientHeight - innerHeight) / 1.776,
      (this.elements.wrapper.clientHeight - innerHeight) / 1.4576,
      (this.elements.wrapper.clientHeight - innerHeight) / 1.24036,
    ];
    this.elements.wrapper.style[this.transformPrefix] = "unset";
  }

  onMousewheel(event) {
    const { pixelY } = NormalizeWheel(event);
    const worksLowerLimit = this.scroll.target >= this.scroll.limitVertA;
    if (worksLowerLimit && !this.scrollUp && !this.scrollDown) {
      const pixel = clamp(
        0,
        this.scroll.targetX + pixelY,
        this.scroll.limitHor
      );

      if (this.stillSnapping) {
        return;
      } else {
        if (pixel < 0) this.scrollUp = true;
        if (pixel >= this.scroll.limitHor) this.scrollDown = true;

        pixelY / 1000 > 0 ? this.scroll.normal++ : this.scroll.normal--;

        if (this.scroll.normal >= 0 && this.scroll.normal <= 6) {
          this.scroll.targetX = snapTo(
            this.scroll.normal,
            this.scroll.limitHor
          );
        }

        this.stillSnapping = true;
        setTimeout(() => (this.stillSnapping = false), 1000);
      }
    } else if (this.scrollUp) {
      const pixel = clamp(0, this.scroll.target + pixelY, this.scroll.limit);
      if (pixel >= this.scroll.limit) this.scrollUp = false;
      this.scroll.target = pixel < 0 ? 0 : pixel;
    } else if (this.scrollDown) {
      const pixel = clamp(
        this.scroll.limitVertA,
        this.scroll.target + pixelY,
        this.scroll.limitVertB
      );
      if (pixel <= this.scroll.limit) this.scrollDown = this.scrollUp = false;

      this.scroll.target =
        pixel < this.scroll.limitVertA ? this.scroll.limitVertA : pixel;
    }
  }

  onTouchDown(event) {
    this.isDown = true;
    if (this.scroll.target === this.scroll.limitVertA && !this.isMobile) {
      const clientX = event.clientX || event.touches[0]?.clientX;
      this.scroll.last.x = clientX;
    } else {
      const clientY = event.clientY || event.touches[0]?.clientY;
      this.scroll.last.y = clientY;
    }
  }

  onTouchMove(event) {
    if (!this.isDown) return;

    const worksLowerLimit = this.scroll.target >= this.scroll.limitVertA;
    if (
      worksLowerLimit &&
      !this.scrollUp &&
      !this.scrollDown &&
      !this.isMobile
    ) {
      const clientX = event.clientX || event.touches[0]?.clientX;
      if (clientX === this.scroll.last.clientX) return;
      this.scroll.last.clientX = clientX;
      let client = this.scroll.last.x - clientX;
      client *= 3;
      const pixel = clamp(
        0,
        this.scroll.targetX + client,
        this.scroll.limitHor
      );
      if (pixel < 0) this.scrollUp = true;
      if (pixel >= this.scroll.limitHor) this.scrollDown = true;
      this.scroll.targetX = pixel < 0 ? 0 : pixel;
    } else if (this.scrollUp) {
      const clientY = event.clientY || event.touches[0]?.clientY;
      if (clientY === this.scroll.last.clientY) return;
      this.scroll.last.clientY = clientY;
      const client = this.scroll.last.y - clientY;
      const pixel = clamp(0, this.scroll.target + client, this.scroll.limit);
      if (pixel >= this.scroll.limit && !this.isMobile) this.scrollUp = false;
      this.scroll.target = pixel < 0 ? 0 : pixel;
    } else if (this.scrollDown) {
      const clientY = event.clientY || event.touches[0]?.clientY;
      this.scroll.last.clientY = clientY;
      const client = this.scroll.last.y - clientY;
      const pixel = clamp(
        this.scroll.limitVertA,
        this.scroll.target + client,
        this.scroll.limitVertB
      );
      if (pixel <= this.scroll.limit) this.scrollDown = this.scrollUp = false;

      this.scroll.target =
        pixel < this.scroll.limitVertA ? this.scroll.limitVertA : pixel;
    } else if (this.isMobile) {
      this.scrollUp = true;
    }
  }

  onTouchUp() {
    this.isDown = false;
  }

  smoothScroll() {
    if (this.isMobile) {
      this.ham();
      return;
    }

    const scrollTo = {};
    const min = 0;
    const max =
      this.scroll.targetX >= 1
        ? this.scroll.limitVertB
        : this.scroll.limitVertA;
    scrollTo.x = clamp(
      0,
      this.scroll.limitHor,
      lerp(this.scroll.currentX, this.scroll.targetX, 0.1)
    );

    this.scroll.currentX = scrollTo.x < 0.01 ? 0 : scrollTo.x;

    this.elements.worksWrapper.style[
      this.transformPrefix
    ] = `translateX(-${this.scroll.currentX}px)`;

    scrollTo.y = clamp(
      min,
      max,
      lerp(this.scroll.current, this.scroll.target, 0.1)
    );

    this.scroll.current = scrollTo.y < 0.01 ? 0 : scrollTo.y;
    this.scroll.current = scrollTo.y < min ? min : scrollTo.y;
    this.elements.wrapper.style[
      this.transformPrefix
    ] = `translateY(-${this.scroll.current}px)`;

    this.elements.parallaxElements?.forEach((element) => {
      if (this.isMobile) return;
      element.style[this.transformPrefix] = `translateY(-${
        this.scroll.current * element.getAttribute("data-parallax")
      }px)`;
    });

    this.ham();
  }

  addEventListeners() {
    window.addEventListener("wheel", this.onMousewheel.bind(this));
    window.addEventListener("touchstart", this.onTouchDown.bind(this));
    window.addEventListener("touchmove", this.onTouchMove.bind(this));
    window.addEventListener("touchend", this.onTouchUp.bind(this));
  }
  removeEventListeners() {
    window.removeEventListener("wheel", this.onMousewheel.bind(this));
    window.removeEventListener("touchstart", this.onTouchDown.bind(this));
    window.removeEventListener("touchmove", this.onTouchMove.bind(this));
    window.removeEventListener("touchend", this.onTouchUp.bind(this));
  }
}
