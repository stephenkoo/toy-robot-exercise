import { getOutsideTabletopErrorMessage } from "../../../messages";
import {
  Command,
  Direction,
  PlaceCommandAction,
  RobotState,
  XYCoordinates,
} from "../../../types";
import { placeRobot } from "../place-robot";

describe("placeRobot", () => {
  const mockTabletopBoundary: XYCoordinates = [100, 200];

  it("returns a robot state when placed", () => {
    const robotState = null;

    const mockRobotPlaceAction: PlaceCommandAction = {
      type: Command.Place,
      data: {
        coordinates: [4, 5],
        direction: Direction.North,
      },
    };

    const newRobotState: RobotState = {
      coordinates: [4, 5],
      direction: Direction.North,
    };

    expect(
      placeRobot(robotState, mockRobotPlaceAction, mockTabletopBoundary)
    ).toEqual(newRobotState);

    const mockRobotPlaceAction2: PlaceCommandAction = {
      type: Command.Place,
      data: {
        coordinates: [1, 2],
        direction: Direction.East,
      },
    };

    const newRobotState2: RobotState = {
      coordinates: [1, 2],
      direction: Direction.East,
    };

    expect(
      placeRobot(newRobotState, mockRobotPlaceAction2, mockTabletopBoundary)
    ).toEqual(newRobotState2);
  });

  it("throws an error if robot is placed outside tabletop", () => {
    const robotState = null;

    const mockRobotPlaceAction: PlaceCommandAction = {
      type: Command.Place,
      data: {
        coordinates: [200, 5],
        direction: Direction.North,
      },
    };

    expect(() => {
      placeRobot(robotState, mockRobotPlaceAction, mockTabletopBoundary);
    }).toThrow(getOutsideTabletopErrorMessage(mockTabletopBoundary));
  });
});
