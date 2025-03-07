import { Piece } from "../models/piece";

interface PuzzlePieceProps {
  piece: Piece;
  onClickPiece: (clickedPiece: Piece) => void;
  pieceWidth: number;
}

const PuzzlePiece = ({piece, onClickPiece, pieceWidth}: PuzzlePieceProps) => {
  function handleClickPiece() {
    onClickPiece(piece);
  }

  const pieceStyles: {[key: string]: string} = {
    width: `${pieceWidth}%`,
    paddingBottom: `${pieceWidth}%`,
  };

  if (!piece.isEmpty) {
    return (
      <div className={`puzzlepiece`} onClick={handleClickPiece} style={pieceStyles}>
        <div className="puzzlepiece-padding">
          <div className="puzzlepiece-inner"><span>{piece.number}</span></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`puzzlepiece`} style={pieceStyles}></div>
  )
}

export default PuzzlePiece;