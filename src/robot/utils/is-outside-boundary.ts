import { defaultTabletopBoundary } from "../../variables";
import { XYCoordinates } from "../../types";

export const isOutsideBoundary = (
  coordinates: XYCoordinates,
  boundary: XYCoordinates = defaultTabletopBoundary
): boolean =>
  coordinates.some(
    (coordinate, index) => coordinate < 0 || coordinate > boundary[index]
  );
