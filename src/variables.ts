import { Direction, XYCoordinates } from "./types";
import { TurnCommand, NonTurnCommand } from "./types";

export const defaultTabletopBoundary: XYCoordinates = [5, 5];

export const defaultRobotStepsPerMove = 1;

const isString = (value: unknown): value is string => typeof value === "string";

export const getCommandsAsArray = (
  commandEnum: typeof TurnCommand | typeof NonTurnCommand
): string[] => Object.values(commandEnum).filter(isString);

export const commands = Object.freeze([
  ...getCommandsAsArray(TurnCommand),
  ...getCommandsAsArray(NonTurnCommand),
]);

/**
 * Directions in clockwise order
 */
export const clockwiseDirections: readonly Direction[] = Object.freeze([
  Direction.North,
  Direction.East,
  Direction.South,
  Direction.West,
]);
