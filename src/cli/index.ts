import { createInterface } from "readline";
import { introductionMessage } from "../messages";
import { AppState, TurnCommand, Direction } from "../types";
import { defaultTabletopBoundary } from "../variables";
import { parseCommand } from "./utils";
import { ErrorHandler } from "../errors/index";
import { commandMap } from "../robot/command-robot";
import { parsePlaceCommandArguments } from "./utils/parse-place-command-arguments";

export const runRobotApp = (): void => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const robot: AppState["robot"] = null;
  const tabletopBoundary: AppState["tabletopBoundary"] = defaultTabletopBoundary;

  const initializeApp = () => {
    console.log(`Hi! Welcome to my toy robot CLI app.
To start, place the robot on the tabletop`);
    rl.prompt();
  };

  initializeApp();

  rl.on("line", (line: string) => {
    try {
      const commandObject = parseCommand(line);

      if (!commandObject) return;

      const { command, arguments } = commandObject;

      switch (command) {
        case TurnCommand.Left: {
          const leftCom = commandMap[command];

          const newRes = leftCom(robot, 1);
          console.log("🚀 ~ file: index.ts ~ line 39 ~ rl.on ~ newRes", newRes);
          // (robot)(1);
        }
        case Command.Place:
          const placeArguments = parsePlaceCommandArguments(arguments);

          if (placeArguments) {
          }
          commandMap[command](tabletopBoundary)(args);
      }
      const bla = commandMap[command];

      getValidCommand();

      runCommand(commandValue, appState);
      /**
       * runCommand = ({ command, arguments }, state) => {
       *  if (command.command === "MOVE") { moveRobot(arguments) }
       *  if (command.command === "PLACE") { }
       * }
       */

      // runRobotApp(command)
      // robot = commandRobot(robot, action, tabletopBoundary);

      rl.prompt();
    } catch (err) {
      ErrorHandler(err);
      rl.prompt();
    }
  });
};
