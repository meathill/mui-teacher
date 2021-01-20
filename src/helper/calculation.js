export function swap(a, b) {
  return [b, a];
}

export function rand(from, to) {
  const total = to - from + 1;
  return 1 + Math.random() * total >> 0;
}
