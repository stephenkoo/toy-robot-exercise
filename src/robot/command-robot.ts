import {
  TurnCommand,
  Command,
  // CommandAction,
  // RobotState,
  // XYCoordinates,
} from "../types";
import { moveRobot, placeRobot, reportRobot, turnRobot } from "./actions";
import { RobotState } from "../types";
// import { Curry } from "ramda";

import { curry } from "ramda";
// type CommandMap = Record<Command, () => void>;

export const commandMap = {
  LEFT: turnRobot(TurnCommand.Left),
  RIGHT: turnRobot(TurnCommand.Right),
  PLACE: placeRobot,
  MOVE: moveRobot,
  REPORT: reportRobot,
};

// /**
//  * @param state - initial robot state. Is null if robot is not placed on tabletop.
//  * @param action - action on the robot. Only the "REPORT" action type does not
//  * affect robot state.
//  * @param tabletopBoundary - if a place or move action type will move the robot
//  * outside the tabletop boundary, the action will be ignored.
//  * @returns new robot state after action is applied
//  */
// export const commandRobot = (
//   state: RobotState | null,
//   action: CommandAction,
//   tabletopBoundary: XYCoordinates
// ): RobotState | null | never => {
//   switch (action.type) {
//     case Command.Place: {
//       return placeRobot(state, action, tabletopBoundary);
//     }
//     case Command.Left:
//     case Command.Right: {
//       return turnRobot(state, action);
//     }
//     case Command.Move: {
//       return moveRobot(state, tabletopBoundary);
//     }
//     case Command.Report: {
//       reportRobot(state);
//       return state;
//     }
//   }
// };
