import { Piece } from "../models/piece"
import PuzzlePiece from "./PuzzlePiece";

interface PuzzleBoardProps {
  isActive: boolean;
  pieces: Piece[];
  setPieces: (pieces: Piece[]) => void;
  setMoves: (moves: number) => void;
  moves: number;
  columns: number;
}

const PuzzleBoard = ({ isActive, pieces, setPieces, setMoves, moves, columns }: PuzzleBoardProps) => {
  const pieceWidth = 100 / columns; // Calculate widths in percentage for scalabilty

  function onClickPiece(clickedPiece: Piece) {
    const emptyPiece: Piece = pieces.find(p => p.isEmpty)!;
    const emptyPos = emptyPiece.position;
    const clickedPos = clickedPiece.position;
    const updatedPieces: Piece[] = [...pieces];
    let shouldMove: boolean = false;

    function setClickedEmpty() {
      updatedPieces[clickedPos] = { number: -1, position: clickedPos, isEmpty: true };
    }

    // Y-axis movement
    if (((clickedPos - emptyPos) % columns === 0)) { // Check if click occured on the column where the empty piece is
      // Down
      if (clickedPos < emptyPos) {
        for(let i = clickedPos; i < emptyPos; i=i+columns) {
          updatedPieces[i+columns] = { number: pieces[i].number, position: pieces[i+columns].position };
        }
      }
      // Up
      else {
        for(let i = clickedPos; i > emptyPos; i=i-columns) {
          updatedPieces[i-columns] = { number: pieces[i].number, position: pieces[i-columns].position };
        }
      }
      shouldMove = true;
    }
  
    // X-axis movement
    else {
      const groupedRows: Piece[][] = [];

      // Group each row into an array
      for (let i = 0; i < updatedPieces.length; i+=columns) {
        groupedRows.push(pieces.slice(i, i + columns));
      }

      for (let i = 0; i < groupedRows.length; i++) {
        // Determine if the clicked and empty pieces are in the same row
        if (groupedRows[i].includes(clickedPiece) && groupedRows[i].includes(emptyPiece)) {
          // Left
          if (clickedPos < emptyPos) {
            for(let i = clickedPos; i < emptyPos; i++) {
              updatedPieces[i+1] = { number: pieces[i].number, position: pieces[i+1].position };
              shouldMove = true;
            }
            break;
          }
          // Right
          else {
            for(let i = emptyPos; i < clickedPos; i++) {
              updatedPieces[i] = { number: pieces[i+1].number, position: pieces[i].position };
              shouldMove = true;
            }
            break;
          }
        }
      }
    }

    if (shouldMove) {
      setClickedEmpty();
      setPieces(updatedPieces);
      setMoves(moves + 1);
    }
  }

  return (
    <div className={`puzzleboard ${!isActive ? 'inactive' : ''}`}>
      {pieces && pieces.map((piece) => (
        <PuzzlePiece key={piece.number} piece={piece} onClickPiece={onClickPiece} pieceWidth={pieceWidth} />
      ))}
    </div>
  );
}

export default PuzzleBoard;