import { defaultTabletopBoundary } from "../../variables";

export const isOutsideBoundary = (
  coordinates: number[],
  boundary: number[] = defaultTabletopBoundary
): boolean =>
  coordinates.some(
    (coordinate, index) => coordinate < 0 || coordinate > boundary[index]
  );
