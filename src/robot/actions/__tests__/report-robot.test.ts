import { robotNotPlacedErrorMessage } from "../../../messages";
import { Direction, RobotState } from "../../../types";
import { reportRobot } from "../report-robot";

describe("reportRobot", () => {
  console.log = jest.fn();

  it("logs robot coordinates and direction", () => {
    const mockRobotState: RobotState = {
      coordinates: [31, 42],
      direction: Direction.West,
    };

    reportRobot(mockRobotState);
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("31"));
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("42"));
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(Direction.West)
    );
  });

  it("throws an error if robot is uninitialized (not placed on tabletop)", () => {
    expect(() => {
      reportRobot(null);
    }).toThrow(robotNotPlacedErrorMessage);
  });
});
