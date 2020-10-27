export type XYCoordinates = [number, number];

export enum Direction {
  North = "NORTH",
  South = "SOUTH",
  East = "EAST",
  West = "WEST",
}

export enum Command {
  Left = "LEFT",
  Right = "RIGHT",
  Place = "PLACE",
  Move = "MOVE",
  Report = "REPORT",
}

export type RobotState = {
  coordinates: XYCoordinates;
  direction: Direction;
};

/**
 * Action types that are dispatched to change the app's robot state.
 */
export type Action<Type = string> = {
  type: Type;
  data?: { [key: string]: unknown };
};

/**
 * Place action accepts parameters (coordinates and direction of the robot) in
 * the data field.
 */
export type PlaceCommandAction = Action<Command.Place> & {
  data: RobotState;
};
