import { invalidCommandErrorMessage } from "../../../messages";
import { parseCommand } from "../parse-command";

describe("parseCommand", () => {
  it("throws an error for invalid command strings", () => {
    const mockInput = "DANCE";
    const invalidPlaceInput = "PLACE1,2,NORTH";

    expect(() => {
      parseCommand(mockInput);
    }).toThrow(invalidCommandErrorMessage);

    expect(() => {
      parseCommand(invalidPlaceInput);
    }).toThrow(invalidCommandErrorMessage);
  });

  it("returns the correct robot action object for a valid place command", () => {
    const validInput = "PLACE 13,5,EAST";
    const messyValidInput = "   pLaCE 13,5,EaST  ";

    const expectedAction = {
      type: "PLACE",
      data: {
        coordinates: [13, 5],
        direction: "EAST",
      },
    };

    expect(parseCommand(validInput)).toEqual(expectedAction);
    expect(parseCommand(messyValidInput)).toEqual(expectedAction);
  });

  it("returns the correct robot action object for a valid move command", () => {
    expect(parseCommand("MOVE")).toEqual({ type: "MOVE" });
  });

  it("returns the correct robot action object for a valid left command", () => {
    expect(parseCommand("LEFT")).toEqual({ type: "LEFT" });
  });

  it("returns the correct robot action object for a valid right command", () => {
    expect(parseCommand("RIGHT")).toEqual({ type: "RIGHT" });
  });

  it("returns the correct robot action object for a valid report command", () => {
    expect(parseCommand("REPORT")).toEqual({ type: "REPORT" });
  });

  it("ignores additional arguments when not used by commands", () => {
    const mockPlaceInput = "PLACE 2,3,WEST MELBOURNE";
    const mockMoveInput = "MOVE 9000";
    const mockLeftInput = "LEFT ON YOUR LEFT";
    const mockRightInput = "RIGHT ON RIGHT ON RIGHT ON";
    const mockReportInput = "REPORT --impostor";

    expect(parseCommand(mockPlaceInput)).toEqual({
      type: "PLACE",
      data: {
        coordinates: [2, 3],
        direction: "WEST",
      },
    });

    expect(parseCommand(mockMoveInput)).toEqual({
      type: "MOVE",
    });

    expect(parseCommand(mockLeftInput)).toEqual({
      type: "LEFT",
    });

    expect(parseCommand(mockRightInput)).toEqual({
      type: "RIGHT",
    });

    expect(parseCommand(mockReportInput)).toEqual({
      type: "REPORT",
    });
  });
});
