import { Direction, RobotState, XYDirection, XYCoordinates } from "../../types";
import { defaultTabletopBoundary } from "../../variables";
import { isOutsideBoundary } from "../utils";
import { curry, compose } from "ramda";
import {
  RobotNotOnTabletopError,
  UserFacingError,
  ErrorHandler,
} from "../../errors";

const getXYDirection = (cardinalDirection: Direction): XYDirection => {
  switch (cardinalDirection) {
    case Direction.North: {
      return [0, 1];
    }
    case Direction.South: {
      return [0, -1];
    }
    case Direction.East: {
      return [-1, 0];
    }
    case Direction.West: {
      return [1, 0];
    }
  }
};

const getMoveDistance = curry(
  (direction: XYDirection, magnitude: number): XYCoordinates =>
    direction.map((coordinate) => magnitude * coordinate) as XYCoordinates
);

const getCoordinateDifference = compose(getMoveDistance, getXYDirection);

const getChangedCoordinates = curry(
  (
    coordinates: XYCoordinates,
    coordinateDifference: XYCoordinates
  ): XYCoordinates =>
    (coordinates as number[]).map(
      (coordinate, index) => coordinate + coordinateDifference[index]
    ) as XYCoordinates
);

const getNewCoordinates = (
  coordinates: XYCoordinates,
  direction: Direction,
  magnitude: number
) => {
  const coordinateDifference = getCoordinateDifference(direction)(magnitude);
  const newCoordinates = getChangedCoordinates(
    coordinates,
    coordinateDifference
  );
  return newCoordinates;
};

export const moveRobot = (
  state: RobotState | null,
  tabletopBoundary: XYCoordinates = defaultTabletopBoundary,
  moveSteps: number
): RobotState | void => {
  try {
    if (!state) throw RobotNotOnTabletopError;

    const { coordinates, direction } = state;
    const newCoordinates = getNewCoordinates(coordinates, direction, moveSteps);

    if (isOutsideBoundary(newCoordinates, tabletopBoundary)) {
      throw new UserFacingError("You can’t move the robot beyond the table");
    }

    return { ...state, coordinates: newCoordinates };
  } catch (err) {
    ErrorHandler(err);
  }
};
