export function createUniqueKey () {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function zip<A, B> (a: A[], b: B[]) {
  return a.map((x, i) => [x, b[i]]);
}
