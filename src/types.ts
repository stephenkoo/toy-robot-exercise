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
 * When the robot is not yet placed on the tabletop when the app is initialized,
 * its value is null.
 */
export type AppState = {
  robot: RobotState | null;
  tabletopBoundary: XYCoordinates;
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

export type TurnCommandAction = Action<
  Extract<Command, Command.Left | Command.Right>
>;

export type OtherCommandAction = Action<
  Extract<Command, Command.Move | Command.Report>
>;

/**
 * Stricter type than a generic Action.
 * CommandAction["type"] must be one of the Command enum values
 */
export type CommandAction =
  | PlaceCommandAction
  | TurnCommandAction
  | OtherCommandAction;
