import { Piece } from "../models/piece"

export function shuffle(data: Piece[]) {
  // Shuffle the pieces but make sure new positions are assigned
  const result = [...data]
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }, index) => {
      value.position = index;
      return value;
    });

  return result;
}