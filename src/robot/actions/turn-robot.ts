import { robotNotPlacedErrorMessage } from "../../messages";
import { Command, RobotState, TurnCommandAction } from "../../types";
import { clockwiseDirections } from "../../variables";
import { getCircularArrayIndex } from "../utils";

/**
 * @param state - robot state (null if not placed on tabletop)
 * @param action - turn command action object with action.type of
 * "LEFT" or "RIGHT"
 * @param rotationAmount - number of indexes to jump per rotation in the
 * clockwiseDirections array.
 * @returns new robot state with new direction
 */
export const turnRobot = (
  state: RobotState | null,
  action: TurnCommandAction,
  rotationAmount = 1
): RobotState | never => {
  if (!state) throw Error(robotNotPlacedErrorMessage);

  const currentDirectionIndex = clockwiseDirections.indexOf(state.direction);

  const increment =
    action.type === Command.Right ? rotationAmount : -rotationAmount;

  const newDirectionIndex = getCircularArrayIndex(
    clockwiseDirections,
    currentDirectionIndex,
    increment
  );

  const newDirection = clockwiseDirections[newDirectionIndex];

  return { ...state, direction: newDirection };
};
