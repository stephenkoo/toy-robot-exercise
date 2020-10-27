import { createInterface } from "readline";
import { introductionMessage } from "../messages";
import { commandRobot } from "../robot/command-robot";
import { AppState } from "../types";
import { defaultTabletopBoundary } from "../variables";
import { parseCommand } from "./utils";

export const runRobotApp = (): void => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let robot: AppState["robot"] = null;
  const tabletopBoundary: AppState["tabletopBoundary"] = defaultTabletopBoundary;

  const initializeApp = () => {
    console.log(introductionMessage);
    rl.prompt();
  };

  initializeApp();

  rl.on("line", (line: string) => {
    try {
      const action = parseCommand(line);

      robot = commandRobot(robot, action, tabletopBoundary);

      rl.prompt();
    } catch (error) {
      console.error(error);
      rl.prompt();
    }
  });
};
