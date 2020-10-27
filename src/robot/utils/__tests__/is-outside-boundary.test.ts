import { isOutsideBoundary } from "../is-outside-boundary";

describe("isOutsideBoundary", () => {
  const mockBoundary2D = [5, 6];
  const mockBoundary3D = [7, 8, 9];

  it("correctly identifies that coordinates are outside a boundary", () => {
    expect(isOutsideBoundary([4, 8], mockBoundary2D)).toEqual(true);
    expect(isOutsideBoundary([6, 3], mockBoundary2D)).toEqual(true);
    expect(isOutsideBoundary([1, 2, 99], mockBoundary3D)).toEqual(true);
  });

  it("correctly identifies that coordinates are inside a boundary", () => {
    expect(isOutsideBoundary([4, 3], mockBoundary2D)).toEqual(false);
    expect(isOutsideBoundary([7, 8, 3], mockBoundary3D)).toEqual(false);
  });
});
