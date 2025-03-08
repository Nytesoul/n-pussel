import { Piece } from "../models/piece"
import { move } from "../util/movePieces";
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

    const groupedRows: Piece[][] = [];
    let clickedRowIndex: number = 0;
    let emptyRowIndex: number = 0;

    // Group each row into an array
    for (let i = 0, rowIndex = 0; i < updatedPieces.length; i+=columns, rowIndex++) {
      const currentRow = pieces.slice(i, i + columns);
      groupedRows.push(currentRow);

      if (currentRow.includes(clickedPiece)) {
        clickedRowIndex = rowIndex;
      }
      if (currentRow.includes(emptyPiece)) {
        emptyRowIndex = rowIndex;
      }
    }

    // X-axis movement
    if (clickedRowIndex === emptyRowIndex) {
      if (clickedPos < emptyPos) {
        move('left', clickedPos, emptyPos, pieces, updatedPieces);
      }
      else {
        move('right', clickedPos, emptyPos, pieces, updatedPieces);
      }
      shouldMove = true;
    }
    // Y-axis movement
    else if (groupedRows[clickedRowIndex].indexOf(clickedPiece) === groupedRows[emptyRowIndex].indexOf(emptyPiece)) {
      if (clickedRowIndex < emptyRowIndex) {
        move('down', clickedPos, emptyPos, pieces, updatedPieces, columns);
      }
      else {
        move('up', clickedPos, emptyPos, pieces, updatedPieces, columns);
      }
      shouldMove = true;
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