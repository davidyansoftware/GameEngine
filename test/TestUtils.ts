import * as assert from "assert";

export function assertAlmostEqual(
  a: number,
  b: number,
  precision: number = 2
): void {
  const tolerance = Math.pow(10, -precision);
  assert.ok(Math.abs(a - b) < tolerance);
}
