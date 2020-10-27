import { invalidPlaceArgumentMessage } from "../../../messages";
import { parsePlaceCommandArguments } from "../parse-place-command-arguments";

describe("parsePlaceCommandArguments", () => {
  it("throws an error when the argument string has invalid coordinates", () => {
    const negativeCoordinateString = "1,-1,NORTH";
    const zeroLeadingCoordinateString = "02,1,SOUTH";
    const nonNumberCoordinateString = "a,3,EAST";

    expect(() => {
      parsePlaceCommandArguments(negativeCoordinateString);
    }).toThrow(invalidPlaceArgumentMessage);

    expect(() => {
      parsePlaceCommandArguments(zeroLeadingCoordinateString);
    }).toThrow(invalidPlaceArgumentMessage);

    expect(() => {
      parsePlaceCommandArguments(nonNumberCoordinateString);
    }).toThrow(invalidPlaceArgumentMessage);
  });

  it("throws an error when the argument string has an invalid direction", () => {
    const mockString = "1,1,BLORTH";

    expect(() => {
      parsePlaceCommandArguments(mockString);
    }).toThrow(invalidPlaceArgumentMessage);
  });

  it("throws an error when the argument string includes invalid characters", () => {
    const mockString = "1,1,NORTHERN";
    const excessWhiteSpaceString = "a, 3, EAST";

    expect(() => {
      parsePlaceCommandArguments(mockString);
    }).toThrow(invalidPlaceArgumentMessage);

    expect(() => {
      parsePlaceCommandArguments(excessWhiteSpaceString);
    }).toThrow(invalidPlaceArgumentMessage);
  });

  it("returns arguments as an array if the argument string is valid", () => {
    const mockString = "3,5,WEST";

    expect(parsePlaceCommandArguments(mockString)).toEqual([3, 5, "WEST"]);
  });
});
