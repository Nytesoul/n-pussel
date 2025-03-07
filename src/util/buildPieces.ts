import { Piece } from "../models/piece";

export function buildPieces(numOfPieces: number) {
  const piecesArr: Piece[] = [];
  let pieceNumber: number = 1;

  // Add 1 to pieces to account for the empty space
  for (let i = 0; i < numOfPieces+1; i++) {
    piecesArr.push({
      number: i !== numOfPieces ? pieceNumber : -1,
      position: i,
      ...(i === numOfPieces && { isEmpty: true })
    })

    if (i !== numOfPieces) {
      pieceNumber += 1;
    }
  }

  return piecesArr;
}