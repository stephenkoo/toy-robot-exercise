import { RobotState } from "../../types";
import { ErrorHandler, UserFacingError } from "../../errors/index";

export const reportRobot = (robotState: RobotState | null): void => {
  try {
    if (!robotState)
      throw new UserFacingError(`Robot must first be placed on tabletop.
Use command PLACE X,Y,F (e.g. PLACE 1,2,EAST)`);

    const { coordinates, direction } = robotState;
    const [x, y] = coordinates;
    console.log(`Output: ${x},${y},${direction}`);
  } catch (err) {
    ErrorHandler(err);
  }
};
