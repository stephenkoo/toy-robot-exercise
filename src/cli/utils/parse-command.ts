import { normalizeInput } from "./normalize-input";
import { getValidCommand, getCommandsAsArray } from "./get-valid-command";
import {
  Command,
  CommandObject,
  TurnCommand,
  NonTurnCommand,
} from "../../types";
import { UserFacingError, ErrorHandler } from "../../errors/index";
import { commands } from "../../variables";

type Command = {
  command: string | null;
  arguments: string[];
};

const removeEmptyStrings = (array: string[]) =>
  array.filter((element) => !!element);

/**
 * @param input - takes raw command line string
 * @returns command object
 */
export const parseCommand = (input: string): CommandObject | undefined => {
  try {
    const normalizedInput = normalizeInput(input);
    const [commandString, ...args] = normalizedInput.split(" ");

    const command = getValidCommand(commandString);

    if (!command) {
      throw new UserFacingError(
        `Command is invalid. Valid commands: ${commands.join(", ")}`
      );
    }

    return {
      command,
      arguments: removeEmptyStrings(args),
    };
  } catch (err) {
    ErrorHandler(err);
  }
};

/**
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
 */
