import {
  Command,
  Direction,
  RobotState,
  TurnCommandAction,
} from "../../../types";
import { turnRobot } from "../turn-robot";

describe("turnRobot", () => {
  const mockRobotState: RobotState = {
    coordinates: [31, 42],
    direction: Direction.North,
  };

  const mockLeftAction: TurnCommandAction = {
    type: Command.Left,
  };

  const mockRightAction: TurnCommandAction = {
    type: Command.Right,
  };

  it("returns new robot state after rotation", () => {
    expect(turnRobot(mockRobotState, mockLeftAction)).toEqual({
      ...mockRobotState,
      direction: Direction.West,
    });

    expect(turnRobot(mockRobotState, mockRightAction)).toEqual({
      ...mockRobotState,
      direction: Direction.East,
    });
  });

  it("allows rotation amount value to be modified", () => {
    expect(turnRobot(mockRobotState, mockLeftAction, 2)).toEqual({
      ...mockRobotState,
      direction: Direction.South,
    });

    expect(turnRobot(mockRobotState, mockRightAction, 3)).toEqual({
      ...mockRobotState,
      direction: Direction.West,
    });
  });
});
