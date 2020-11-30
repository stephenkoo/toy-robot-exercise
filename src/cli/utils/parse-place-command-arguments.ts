// import { invalidPlaceArgumentMessage } from "../../messages";
import { Direction, XYCoordinates } from "../../types";
import { UserFacingError, ErrorHandler } from "../../errors/index";
import { isValidDirection } from "./is-valid-direction";

const validPlaceArgumentsRegex = /^[1-9]\d*,[1-9]\d*,\w*$/;

/**
 * @param input - raw input string of arguments for the pace command
 * @returns formatted place command arguments in an array
 */
export const parsePlaceCommandArguments = (
  argumentsString: string
): [...XYCoordinates, Direction] | undefined => {
  try {
    const isArgumentsValid = validPlaceArgumentsRegex.test(argumentsString);

    if (!isArgumentsValid)
      throw new UserFacingError(
        "Invalid PLACE argument format. Follow the format: PLACE 2,3,NORTH"
      );

    const [x, y, inputtedDirection] = argumentsString.split(",");

    if (!isValidDirection(inputtedDirection))
      throw new UserFacingError("The direction is not valid.");

    return [parseInt(x), parseInt(y), inputtedDirection];
  } catch (err) {
    ErrorHandler(err);
  }
};
