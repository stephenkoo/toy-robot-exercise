import { getCircularArrayIndex } from "../get-circular-array-index";

describe("getCircularArrayIndex", () => {
  const mockCircularArray = ["north", "east", "south", "west"];
  const getIndex = (arrayValue: string) =>
    mockCircularArray.indexOf(arrayValue);

  it("correctly increments or decrements in the array when no loops are necessary", () => {
    const eastIndex = getIndex("east");
    const increment = 2;
    const expectedIncrementIndex = getIndex("west");

    expect(
      getCircularArrayIndex(mockCircularArray, eastIndex, increment)
    ).toEqual(expectedIncrementIndex);

    const decrement = -1;
    const expectedDecrementIndex = getIndex("north");

    expect(
      getCircularArrayIndex(mockCircularArray, eastIndex, decrement)
    ).toEqual(expectedDecrementIndex);
  });

  it("correctly loops to the start of the array when incrementing beyond end of array", () => {
    const eastIndex = getIndex("east");
    const increment = 5;
    const expectedIndex = getIndex("south");

    expect(
      getCircularArrayIndex(mockCircularArray, eastIndex, increment)
    ).toEqual(expectedIndex);
  });

  it("correctly loops to the end of the array when decrementing beyond start of array", () => {
    const eastIndex = getIndex("east");
    const increment = -2;
    const expectedIndex = getIndex("west");

    expect(
      getCircularArrayIndex(mockCircularArray, eastIndex, increment)
    ).toEqual(expectedIndex);
  });

  it("correctly cycles over array when the increment or decrement is multiple times larger than the array length", () => {
    const eastIndex = getIndex("east");
    const increment = 13;
    const expectedIncrementIndex = getIndex("south");

    expect(
      getCircularArrayIndex(mockCircularArray, eastIndex, increment)
    ).toEqual(expectedIncrementIndex);

    const decrement = -15;
    const expectedDecrementIndex = getIndex("south");

    expect(
      getCircularArrayIndex(mockCircularArray, eastIndex, decrement)
    ).toEqual(expectedDecrementIndex);
  });
});
