import { useState, useEffect } from "react";
import { Piece } from "./models/piece";
import { buildPieces } from "./util/buildPieces";
import { isCorrect } from "./util/isCorrect";
import { shuffle } from "./util/shuffle";
import PuzzleBoard from "./components/PuzzleBoard";
import SuccessPopup from "./components/SuccessPopup";

function App() {
  const COLUMNS = 5;
  const ROWS = 3;
  const numOfPieces = COLUMNS * ROWS - 1;

  const [boardActive, setBoardActive] = useState<boolean>(true);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const initialPieces = buildPieces(numOfPieces);
    const shuffledPieces = shuffle(initialPieces);
    setPieces(shuffledPieces);
  }, [numOfPieces])

  useEffect(() => {
    if (moves > 0) {
      checkResult();
    }
  }, [moves, pieces])

  function resetPuzzle() {
    setPieces(shuffle(pieces));
    setMoves(0);
    setSuccess(false);
  }

  function checkResult() {
    if (isCorrect(pieces)) {
      setSuccess(true);
      setBoardActive(false);
    }
  }

  return (
    <>
      <div className="wrapper">
        <h1>React n-pussel</h1>
        Skrivet av Tobias Franzén
        <div className="space"></div>
        {COLUMNS > 0 ? (
          <PuzzleBoard
            isActive={boardActive}
            pieces={pieces}
            setPieces={setPieces}
            setMoves={setMoves}
            moves={moves}
            columns={COLUMNS}
          />
        ) : (
          <div>
            Spelet är felaktigt konfigurerat.
          </div>
        )}
        <div className="centered">
          <br />
          Antal steg: {moves}
          <div className="space"></div>
          <button className="btn" onClick={resetPuzzle}>Slumpa</button>
        </div>
      </div>
      {success && (
        <SuccessPopup moves={moves} setBoardActive={setBoardActive} resetPuzzle={resetPuzzle} />
      )}
    </>
  )
}

export default App
