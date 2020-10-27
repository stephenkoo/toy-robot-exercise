import {
  getOutsideTabletopErrorMessage,
  robotNotPlacedErrorMessage,
} from "../../messages";
import { Direction, RobotState, XYCoordinates } from "../../types";
import {
  defaultRobotStepsPerMove,
  defaultTabletopBoundary,
} from "../../variables";
import { isOutsideBoundary } from "../utils";

/**
 * @param state - current robot state which includes coordinates & direction
 * @param tabletopBoundary - throws error if move would cause robot to move
 * outside the tabletop boundary
 * @param stepsPerMove - amount of steps taken in the robot's direction
 * @returns new robot state with new coordinates after moving in the direction
 * the robot was facing
 */
export const moveRobot = (
  state: RobotState | null,
  tabletopBoundary: XYCoordinates = defaultTabletopBoundary,
  stepsPerMove: number = defaultRobotStepsPerMove
): RobotState | never => {
  if (!state) throw Error(robotNotPlacedErrorMessage);

  const { coordinates, direction } = state;
  const [x, y] = coordinates;

  let newCoordinates: XYCoordinates;

  switch (direction) {
    case Direction.North: {
      newCoordinates = [x, y + stepsPerMove];
      break;
    }
    case Direction.South: {
      newCoordinates = [x, y - stepsPerMove];
      break;
    }
    case Direction.East: {
      newCoordinates = [x + stepsPerMove, y];
      break;
    }
    case Direction.West: {
      newCoordinates = [x - stepsPerMove, y];
    }
  }

  if (isOutsideBoundary(newCoordinates, tabletopBoundary)) {
    throw Error(getOutsideTabletopErrorMessage(tabletopBoundary));
  }

  return { ...state, coordinates: newCoordinates };
};
