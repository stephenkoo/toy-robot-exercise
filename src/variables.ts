import { Direction, XYCoordinates } from "./types";

export const defaultTabletopBoundary: XYCoordinates = [5, 5];
export const defaultRobotStepsPerMove = 1;

/**
 * Directions in clockwise order
 */
export const clockwiseDirections: Direction[] = [
  Direction.North,
  Direction.East,
  Direction.South,
  Direction.West,
];
