import Component from "classes/Component";
import gsap from "gsap";

export default class Reveal extends Component {
  constructor(params) {
    super(params);
    this.threshold = params.threshold || 0.75;
    this.unobserve = params.unobserve ?? true;
    this.createObserver();
  }

  createObserver() {
    const options = { threshold: this.threshold };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this[entry.target.getAttribute("data-reveal")](entry.target);
          if (this.unobserve) this.observer.unobserve(entry.target);
        } else {
          this[entry.target.getAttribute("data-reveal") + "Reverse"]?.call(
            this,
            entry.target
          );
        }
      });
    }, options);

    Object.entries(this.elements).forEach(([key, value]) => {
      if (value.forEach) {
        value.forEach((element) => {
          this.observer.observe(element);
        });
      } else this.observer.observe(value);
    });
  }

  curtain(element) {
    gsap.fromTo(
      element,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        autoAlpha: 1,
        scale: 1.05,
      },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        autoAlpha: 1,
        scale: 1,
        delay: element.getAttribute("data-delay"),
        duration: 0.5,
      }
    );
  }
  after(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 1,
      },
      {
        "--bottom": "100%",
        "--top": "0%",
        autoAlpha: 1,
        delay: element.getAttribute("data-delay"),
        duration: 1,
        ease: "power1.in",
      }
    );
  }
  slide(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 1,
      },
      {
        "--left": "100%",
        autoAlpha: 1,
        delay: element.getAttribute("data-delay"),
        duration: 0.5,
        ease: "expo.inout",
      }
    );
  }
  fadeIn(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        delay: element.getAttribute("data-delay"),
        duration: 1,
      }
    );
  }
  fadeInReverse(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 1,
        delay: element.getAttribute("data-delay"),
        duration: 1,
      },
      {
        autoAlpha: 0,
      }
    );
  }
  fadeInDarken(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 0,
        filter: "grayscale(1)",
      },
      {
        autoAlpha: 1,
        filter: "grayscale(0)",
        delay: element.getAttribute("data-delay"),
        // duration: 1,
      }
    );
  }
  fadeInDarkenReverse(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 1,
        filter: "grayscale(0)",
        delay: element.getAttribute("data-delay"),
        // duration: 1,
      },
      {
        autoAlpha: 0,
        filter: "grayscale(1)",
      }
    );
  }
  splitTextUp(element) {
    gsap.set(element.querySelectorAll(".char"), { opacity: 0 });
    gsap.fromTo(
      element.querySelectorAll(".char"),
      {
        autoAlpha: 1,
        y: "100%",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: element.getAttribute("data-delay") || 0.2,
        duration: 0.4,
        stagger: 0.03,
      }
    );
  }
  splitTextUpReverse(element) {
    gsap.fromTo(
      element.querySelectorAll(".char"),
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        delay: element.getAttribute("data-delay") || 0.2,
        duration: 0.4,
        stagger: 0.03,
      },
      {
        autoAlpha: 1,
        y: "100%",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      }
    );
    gsap.set(element.querySelectorAll(".char"), { opacity: 0 });
  }
  grayToBlack(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 1,
        x: "-25%",
      },
      {
        autoAlpha: 1,
        x: "75rem",
        delay: element.getAttribute("data-delay") || 0.2,
        duration: 1,
      }
    );
  }
  grayToBlackReverse(element) {
    gsap.fromTo(
      element,
      {
        autoAlpha: 1,
        x: "75rem",
        delay: element.getAttribute("data-delay") || 0.2,
        duration: 1,
      },
      {
        autoAlpha: 1,
        x: "-25%",
      }
    );
  }
}
