 
import generateID from "./generateID";

describe("Behavior", () => {
  test("should generate a random id", () => {
    expect(generateID()).toBeTruthy();
  });
});
