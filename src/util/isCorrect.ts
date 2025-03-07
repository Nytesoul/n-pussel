import { Piece } from "../models/piece";

export function isCorrect(pieces: Piece[]) {
  for (let i = 1, length = pieces.length - 1; i < length; i++) {
    // Compare the current piece with the previous to determine if it follows the correct sequence
    if (pieces[i].number < pieces[i-1].number) {
      return false;
    }
  }
  return true;
}