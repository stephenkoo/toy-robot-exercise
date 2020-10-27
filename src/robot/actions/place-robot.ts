import {
  getOutsideTabletopErrorMessage,
  invalidDirectionErrorMessage,
} from "../../messages";
import { PlaceCommandAction, RobotState, XYCoordinates } from "../../types";
import { isOutsideBoundary, isValidDirection } from "../utils";

/**
 * Places robot on the tabletop
 *
 * @param state - current robot state
 * @param placeCommandAction - command action object with action type of
 * "PLACE" & data object
 * @param placeCommandAction.data - contains coordinates & direction to place
 * robot
 * @param tabletopBoundary - throws error if placed outside the tabletop
 * boundary
 * @returns new robot state after placing robot
 */
export const placeRobot = (
  state: RobotState | null,
  { data }: PlaceCommandAction,
  tabletopBoundary: XYCoordinates
): RobotState | never => {
  const { coordinates, direction } = data;

  if (isOutsideBoundary(coordinates))
    throw Error(getOutsideTabletopErrorMessage(tabletopBoundary));
  if (!isValidDirection(direction)) throw Error(invalidDirectionErrorMessage);
  return { ...state, ...data };
};
