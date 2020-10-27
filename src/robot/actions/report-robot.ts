import {
  getReportRobotMessage,
  robotNotPlacedErrorMessage,
} from "../../messages";
import { RobotState } from "../../types";

export const reportRobot = (robotState: RobotState | null): void | never => {
  if (!robotState) throw Error(robotNotPlacedErrorMessage);
  console.log(getReportRobotMessage(robotState));
};
