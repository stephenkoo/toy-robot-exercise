export type XYCoordinates = [number, number];

export enum Direction {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
}

export type RobotState = {
  coordinates: XYCoordinates;
  direction: Direction;
};
