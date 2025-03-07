interface SuccessPopupProps {
  moves: number;
  setBoardActive: (status: boolean) => void;
  resetPuzzle: () => void;
}

const SuccessPopup = ({ moves, setBoardActive, resetPuzzle }: SuccessPopupProps) => {
  function handleOkClick() {
    setBoardActive(true);
    resetPuzzle();
  }

  return (
    <div className="success-popup">
      <h2>Bra gjort!</h2>
      <br />
      Du löste pusslet!<br />
      Det tog dig <strong>{moves}</strong> steg att lösa.
      <br />
      <br />
      <button className="btn" onClick={handleOkClick}>Stäng</button>
    </div>
  )
}

export default SuccessPopup