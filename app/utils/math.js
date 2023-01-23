import gsap from "gsap";

export function lerp(p1, p2, t) {
  return gsap.utils.interpolate(p1, p2, t);
}

export function clamp(min, max, number) {
  return gsap.utils.clamp(min, max, number);
}

export function random(min, max) {
  return gsap.utils.random(min, max);
}

export function asyncRandom(limit, timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() * limit);
    }, timeout);
  });
}

export function map(valueToMap, inMin, inMax, outMin, outMax) {
  return gsap.utils.mapRange(inMin, inMax, outMin, outMax, valueToMap);
}

export function pixelToRem(pixels, innerWidth = window.innerWidth) {
  return (innerWidth / 1512) * 10 * pixels;
}

export function snap(value, lowerLimit, upperLimit) {
  let normal = map(value, lowerLimit, upperLimit, 0, 6);
  normal = Math.round(normal);
  const snapTo = (normal / 6) * upperLimit;
  return snapTo;
}

export function snapTo(normal, upperLimit, lowerLimit, fract = 6) {
  if (!lowerLimit){
    return (normal / fract) * upperLimit;
  } else {
    const snapTo = (normal / fract) * upperLimit;
    return map(snapTo, 0, upperLimit, lowerLimit, upperLimit)
  } 
}
