export function almostEqual(
  a: number,
  b: number,
  precision: number = 2
): boolean {
  const tolerance = Math.pow(10, -precision);
  return Math.abs(a - b) < tolerance;
}
