import { clockwiseDirections } from "../../variables";

export const isValidDirection = (input: string): boolean =>
  clockwiseDirections.some((direction) => direction === input);
