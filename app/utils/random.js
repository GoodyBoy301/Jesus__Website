export function asyncRandom(limit, timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random() * limit);
    }, timeout);
  });
}
