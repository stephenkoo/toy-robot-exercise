import {
  AppState,
  Command,
  Direction,
  OtherCommandAction,
  PlaceCommandAction,
  TurnCommandAction,
} from "../../types";
import { moveRobot, placeRobot, reportRobot, turnRobot } from "../actions";
import { commandRobot } from "../command-robot";

jest.mock("../actions", () => ({
  placeRobot: jest.fn(),
  turnRobot: jest.fn(),
  moveRobot: jest.fn(),
  reportRobot: jest.fn(),
}));

describe("commandRobot", () => {
  const robot: AppState["robot"] = null;
  const tabletopBoundary: AppState["tabletopBoundary"] = [100, 200];

  it("runs the placeRobot command if the action type is PLACE", () => {
    const mockAction: PlaceCommandAction = {
      type: Command.Place,
      data: {
        coordinates: [80, 80],
        direction: Direction.East,
      },
    };
    commandRobot(robot, mockAction, tabletopBoundary);
    expect(placeRobot).toHaveBeenCalledWith(
      robot,
      mockAction,
      tabletopBoundary
    );
  });

  it("runs the turnRobot command if the action type is LEFT or RIGHT", () => {
    const leftAction: TurnCommandAction = {
      type: Command.Left,
    };
    commandRobot(robot, leftAction, tabletopBoundary);

    expect(turnRobot).toHaveBeenCalledWith(robot, leftAction);

    const rightAction: TurnCommandAction = {
      type: Command.Right,
    };
    commandRobot(robot, rightAction, tabletopBoundary);

    expect(turnRobot).toHaveBeenCalledWith(robot, rightAction);
  });

  it("runs the moveRobot command if the action type is MOVE", () => {
    const moveAction: OtherCommandAction = {
      type: Command.Move,
    };
    commandRobot(robot, moveAction, tabletopBoundary);

    expect(moveRobot).toHaveBeenCalledWith(robot, tabletopBoundary);
  });

  it("runs the reportRobot command if the action type is REPORT", () => {
    const reportAction: OtherCommandAction = {
      type: Command.Report,
    };
    commandRobot(robot, reportAction, tabletopBoundary);

    expect(reportRobot).toHaveBeenCalledWith(robot);
  });
});
