import {
  getOutsideTabletopErrorMessage,
  robotNotPlacedErrorMessage,
} from "../../../messages";
import { Direction, RobotState, XYCoordinates } from "../../../types";
import { moveRobot } from "../move-robot";

describe("moveRobot", () => {
  const mockTabletopBoundary: XYCoordinates = [100, 200];

  it("returns a robot state with new coordinates based on the direction the robot is facing", () => {
    const mockRobotStateEast: RobotState = {
      coordinates: [50, 0],
      direction: Direction.East,
    };

    const newRobotStateEast: RobotState = {
      ...mockRobotStateEast,
      coordinates: [51, 0],
    };

    expect(moveRobot(mockRobotStateEast, mockTabletopBoundary)).toEqual(
      newRobotStateEast
    );

    const mockRobotStateNorth: RobotState = {
      coordinates: [20, 20],
      direction: Direction.North,
    };

    const newRobotStateNorth: RobotState = {
      ...mockRobotStateNorth,
      coordinates: [20, 21],
    };

    expect(moveRobot(mockRobotStateNorth, mockTabletopBoundary)).toEqual(
      newRobotStateNorth
    );
  });

  it("allows overriding the robot's default number of steps taken per move", () => {
    const mockRobotStateEast: RobotState = {
      coordinates: [50, 0],
      direction: Direction.East,
    };

    const newRobotStateEast: RobotState = {
      ...mockRobotStateEast,
      coordinates: [55, 0],
    };

    expect(moveRobot(mockRobotStateEast, mockTabletopBoundary, 5)).toEqual(
      newRobotStateEast
    );
  });

  it("throws an error if robot is not initialized (i.e. placed on tabletop) before moving", () => {
    const mockRobotState = null;

    expect(() => {
      moveRobot(mockRobotState, mockTabletopBoundary);
    }).toThrow(robotNotPlacedErrorMessage);
  });

  it("throws an error if moveRobot would move robot outside tabletop", () => {
    const mockRobotStateSouth: RobotState = {
      coordinates: [50, 0],
      direction: Direction.South,
    };
    expect(() => {
      moveRobot(mockRobotStateSouth, mockTabletopBoundary);
    }).toThrow(getOutsideTabletopErrorMessage(mockTabletopBoundary));

    const mockRobotStateEast: RobotState = {
      coordinates: [100, 20],
      direction: Direction.East,
    };
    expect(() => {
      moveRobot(mockRobotStateEast, mockTabletopBoundary);
    }).toThrow(getOutsideTabletopErrorMessage(mockTabletopBoundary));
  });
});
