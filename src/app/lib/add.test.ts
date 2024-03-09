import { add } from "./add";

describe("Behavior", () => {
  test("should return sum of the two numbers", () => {
    expect(add(1, 2)).toBe(3);
  });
});
