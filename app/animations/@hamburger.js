import gsap from "gsap";

export default function animate() {
  const defaults = { ease: "power4.in", duration: 0.5 };
  const tl = gsap.timeline({ paused: true, defaults });
  const elements = { hamburger: ".navigation__hamburger", header: ".header" };

  tl.fromTo(
    elements.header,
    {
      y: 0,
      autoAlpha: 1,
      ease: "power4.inout",
      duration: 0,
    },
    {
      y: "-2.9rem",
      autoAlpha: 0,
      ease: "power4.inout",
      duration: 0.2,
    }
  );
  tl.fromTo(
    elements.hamburger,
    {
      x: "10.6rem",
      autoAlpha: 0,
      ease: "power4.in",
    },
    {
      x: 0,
      autoAlpha: 1,
      ease: "power4.out",
    }
  );

  return tl;
}
