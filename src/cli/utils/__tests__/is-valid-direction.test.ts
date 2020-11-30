import { isValidDirection } from "../is-valid-direction";

jest.mock("../../../variables", () => ({
  clockwiseDirections: ["east", "south", "west", "north"],
}));

describe("isValidDirection", () => {
  it("correctly identifies that a direction is a value in the clockwiseDirections array", () => {
    expect(isValidDirection("north")).toEqual(true);
    expect(isValidDirection("south")).toEqual(true);
    expect(isValidDirection("east")).toEqual(true);
    expect(isValidDirection("west")).toEqual(true);
  });

  it("correctly identifies that a direction is not a value in the clockwiseDirections array", () => {
    expect(isValidDirection("northWest")).toEqual(false);
    expect(isValidDirection("NORTH")).toEqual(false);
  });
});
