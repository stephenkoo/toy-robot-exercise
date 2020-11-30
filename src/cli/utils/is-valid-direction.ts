import { clockwiseDirections } from "../../variables";
import { Direction } from "../../types";

export const isValidDirection = (input: string): input is Direction =>
  clockwiseDirections.some((direction) => direction === input);
