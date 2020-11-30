import { RobotState, TurnCommand, Direction } from "../../types";
import { getCircularArrayIndex } from "../utils";
import { curry } from "ramda";
import { RobotNotOnTabletopError, ErrorHandler } from "../../errors";
import { clockwiseDirections } from "../../variables";

const getTurnIncrement = curry(
  (turnDirection: TurnCommand, turnSteps): number =>
    turnDirection === TurnCommand.Right ? turnSteps : -turnSteps
);

const getNewTurnDirection = (
  directions: Direction[],
  currentDirection: Direction,
  turnDirection: TurnCommand,
  turnSteps = 1
): Direction => {
  const currentDirectionIndex = directions.indexOf(currentDirection);
  const turnIncrement = getTurnIncrement(turnDirection, turnSteps);

  const newDirectionIndex = getCircularArrayIndex(
    directions.length,
    currentDirectionIndex,
    turnIncrement
  );

  const newDirection = directions[newDirectionIndex];
  return newDirection;
};

export const turnRobot = curry(
  (
    turnDirection: TurnCommand,
    state: null,
    turnSteps: number
  ): RobotState | undefined => {
    try {
      if (!state) throw RobotNotOnTabletopError;

      const { direction, ...rest } = state;

      const newDirection = getNewTurnDirection(
        clockwiseDirections,
        direction,
        turnDirection,
        turnSteps
      );

      return {
        ...rest,
        direction: newDirection,
      };
    } catch (err) {
      ErrorHandler(err);
    }
  }
);
