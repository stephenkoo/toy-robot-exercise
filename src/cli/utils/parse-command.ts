import { invalidCommandErrorMessage } from "../../messages";
import { Command, CommandAction } from "../../types";
import { normalizeInput } from "./normalize-input";
import { parsePlaceCommandArguments } from "./parse-place-command-arguments";

/**
 * @param input - takes raw command line string
 * @returns CommandAction data object to apply to the robot.
 */
export const parseCommand = (input: string): CommandAction | never => {
  const normalizedInput = normalizeInput(input);
  const [command, ...args] = normalizedInput.split(" ");

  switch (command) {
    case Command.Place: {
      const [x, y, direction] = parsePlaceCommandArguments(args[0]);
      return {
        type: command,
        data: {
          coordinates: [x, y],
          direction,
        },
      };
    }
    case Command.Move:
    case Command.Left:
    case Command.Right:
    case Command.Report: {
      return {
        type: command,
      };
    }
    default: {
      throw Error(invalidCommandErrorMessage);
    }
  }
};
