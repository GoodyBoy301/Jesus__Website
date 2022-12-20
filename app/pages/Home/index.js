import Page from "classes/Page";
import gsap from "gsap";
import NormalizeWheel from "normalize-wheel";
import Prefix from "prefix";
import { clamp, lerp } from "utils/math";
import Reveal from "classes/Reveal";

export default class Home extends LongPage {
  constructor() {
    super({
      element: ".home",
      id: "home",
      elements: {},
    });
  }

  /** Life Cycle */
  create() {
    super.create();
    this.reCalculate();
  }
  reCalculate() {
    super.reCalculate();
  }
}
