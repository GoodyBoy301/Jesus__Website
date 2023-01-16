import gsap from "gsap";

export function enter(percentage, texts, callback) {
  const isMobile = innerWidth < 768;

  const tl = gsap.timeline();

  tl.set(percentage.elements[0], {
    opacity: 1,
  })
    .fromTo(
      percentage.chars,
      {
        y: "100%",
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      },
      {
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        stagger: 0.2,
        delay: 1,
      }
    )
    .fromTo(
      ".preloader__texts",
      {
        minHeight: 0,
        opacity: 0,
      },
      {
        minHeight: isMobile ? "7.1rem" : "calc(14.3rem - 1.1404475rem)",
        opacity: 1,
      }
    )
    .fromTo(
      texts.lines[0].children,
      {
        y: "100%",
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      },
      {
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        stagger: 0.05,
        delay: 2.85,
      },
      "-1"
    )
    .to(".preloader__bar", {
      width: "1%",
    })
    .call(callback);

  return tl;
}

export function leave(percentage, texts, callback) {
  percentage.innerHTML =
    '<div class="line" style="display: block; text-align: start; width: 100%;"><div class="word" style="display: inline-block;"><div class="char" style="display: inline-block;">9</div><div class="char" style="display: inline-block;">9</div><div class="char" style="display: inline-block;">%</div></div></div>';

  const tl = gsap.timeline({ defaults: { duration: 0.25, ease: "power2.in" } });

  tl.to(".preloader__texts", {
    minHeight: 0,
    opacity: 0,
  })
    .to(
      texts.lines[4].children,
      {
        opacity: 0,
      },
      "-1"
    )
    .fromTo(
      percentage.querySelectorAll(".char"),
      {
        y: 0,
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0, 0 0)",
      },
      {
        y: "100%",
        clipPath: "polygon(0 0%, 100% 0%, 100% 0, 0 0)",
        stagger: 0.05,
      }
    )
    .to(".preloader__track", {
      scaleX: 0,
    })
    .to(".preloader", {
      opacity: 0,
      duration: 1,
    })
    .call(callback);

  return tl;
}

export function progress(oldRemainder, newRemainder, texts, callback) {
  const tl = gsap.timeline();

  tl.to(texts.lines[Math.min(oldRemainder, 3)]?.children, {
    y: "-100%",
    clipPath: "polygon(0% 100%, 100% 100%,  100% 100%, 0% 100%)",
  })
    .fromTo(
      texts.lines[Math.min(newRemainder, 4)]?.children,
      {
        y: "100%",
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.2,
      },
      {
        y: 0,
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
        stagger: 0.05,
      }
    )
    .call(callback);

  return tl;
}
