import { curry } from "ramda";

/**
 * Find the index of a circular array based on how many increments or
 * decrements are taken from a given index position.
 *
 * This utility is used in this app to cycle the direction of the robot
 * when rotating left or right.
 *
 * @param array the circular array to cycle through
 * @param currentIndex the current position to start incrementing from
 * @param increment increment of 1 represents +1 index position of the
 * currentIndex. -1 decrements 1 step back from the currentIndex.
 */
export const getCircularArrayIndex = curry(
  (arrayLength: number, currentIndex: number, increment: number): number => {
    /* increments after removing full cycles around the array */
    const effectiveIncrement = increment % arrayLength;

    const newRelativeIndex = currentIndex + effectiveIncrement;

    /**
     * Need to offset decrements beyond the 0th index or increments beyond
     * the last index (e.g. looping around the array) by adding or subtracting
     * the array length.
     */
    if (newRelativeIndex < 0) return newRelativeIndex + arrayLength;
    if (newRelativeIndex >= arrayLength) return newRelativeIndex - arrayLength;
    return newRelativeIndex;
  }
);
