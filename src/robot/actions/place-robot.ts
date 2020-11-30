import { Direction, RobotState, XYCoordinates } from "../../types";
import { isOutsideBoundary } from "../utils";
import { UserFacingError, ErrorHandler } from "../../errors";
import { curry } from "ramda";

export const placeRobot = curry(
  (
    tabletopBoundary: XYCoordinates,
    coordinates: XYCoordinates,
    direction: Direction
  ): RobotState | void => {
    try {
      if (isOutsideBoundary(coordinates, tabletopBoundary)) {
        throw new UserFacingError("You can’t place the robot beyond the table");
      }

      return {
        coordinates,
        direction,
      };
    } catch (err) {
      ErrorHandler(err);
    }
  }
);
