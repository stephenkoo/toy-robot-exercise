import { commands, clockwiseDirections } from "../../variables";
import { Command, TurnCommand, NonTurnCommand } from "../../types";
import { UserFacingError, ErrorHandler } from "../../errors/index";

const isValidTurnCommand = (input: string): input is TurnCommand =>
  input in TurnCommand;

const isValidNonTurnCommand = (input: string): input is NonTurnCommand =>
  input in NonTurnCommand;

export const getValidCommand = (
  input: string
): TurnCommand | NonTurnCommand | undefined => {
  try {
    if (isValidTurnCommand(input)) return input as TurnCommand;
    if (isValidNonTurnCommand(input)) return input as NonTurnCommand;

    return undefined;
  } catch (err) {
    ErrorHandler(err);
  }
};
// export const isValidCommand = (input: string): input is Command => {
//   if (input in TurnCommand) return input as TurnCommand;
// };
// input in Command;
