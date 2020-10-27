import { RobotState, XYCoordinates } from "./types";
import { clockwiseDirections } from "./variables";

export const validCommandsMessage = `Valid commands:
PLACE X,Y,F (e.g. PLACE 1,2,EAST)
MOVE
LEFT
RIGHT
REPORT`;

export const introductionMessage = `Hi! Welcome to my toy robot CLI app.
To start, place the robot on the tabletop.

${validCommandsMessage}`;

export const getTabletopBoundaryMessage = (boundary: XYCoordinates): string => {
  const [x, y] = boundary;
  return `Tabletop dimensions: ${x}x${y}`;
};

export const getOutsideTabletopErrorMessage = (
  boundary: XYCoordinates
): string => `You can’t place or move the robot beyond the table.
${getTabletopBoundaryMessage(boundary)}
`;

export const getReportRobotMessage = ({
  coordinates,
  direction,
}: RobotState): string => {
  const [x, y] = coordinates;
  return `Output: ${x},${y},${direction}`;
};

export const invalidCommandErrorMessage = `Unrecognized command.

${validCommandsMessage}`;

export const robotNotPlacedErrorMessage = `Robot must first be placed on tabletop.
Use command PLACE X,Y,F (e.g. PLACE 1,2,EAST)`;

export const invalidPlaceArgumentMessage = `Invalid PLACE argument format.
Follow the format: PLACE 2,3,NORTH`;

export const invalidDirectionErrorMessage = `The direction is not valid.
Directions can either be: ${clockwiseDirections.join(", ")}.`;
