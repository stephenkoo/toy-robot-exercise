import { invalidPlaceArgumentMessage } from "../../messages";
import { Direction, XYCoordinates } from "../../types";

const validPlaceArgumentsRegex = /^[1-9]\d*,[1-9]\d*,(NORTH|SOUTH|EAST|WEST)$/;

/**
 * @param input - raw input string of arguments for the pace command
 * @returns formatted place command arguments in an array
 */
export const parsePlaceCommandArguments = (
  argumentsString: string
): [...XYCoordinates, Direction] | never => {
  const isArgumentsValid = validPlaceArgumentsRegex.test(argumentsString);

  if (!isArgumentsValid) throw Error(invalidPlaceArgumentMessage);

  const [x, y, direction] = argumentsString.split(",");

  return [parseInt(x), parseInt(y), direction as Direction];
};
