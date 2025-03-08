import { Piece } from "../models/piece";

type direction = 'left' | 'right' | 'down' | 'up'

export function move(dir: direction, clickedPos: number, emptyPos: number, pieces: Piece[], updatedPieces: Piece[], columns?: number) {
  switch(dir) {
    case 'left':
      for(let i = clickedPos; i < emptyPos; i++) {
        updatedPieces[i+1] = { number: pieces[i].number, position: pieces[i+1].position };
      }
      break;
    case 'right':
      for(let i = emptyPos; i < clickedPos; i++) {
        updatedPieces[i] = { number: pieces[i+1].number, position: pieces[i].position };
      }
      break;
    case 'down':
      if (columns) {
        for(let i = clickedPos; i < emptyPos; i=i+columns) {
          updatedPieces[i+columns] = { number: pieces[i].number, position: pieces[i+columns].position };
        }
      }
      break;
    case 'up':
      if (columns) {
        for(let i = clickedPos; i > emptyPos; i=i-columns) {
          updatedPieces[i-columns] = { number: pieces[i].number, position: pieces[i-columns].position };
        }
      }
  }

  return updatedPieces;
}