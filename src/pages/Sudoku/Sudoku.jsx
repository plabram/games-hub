import { makepuzzle, solvepuzzle } from "sudoku";
import StartButton from "../../components/StartButton/StartButton";
import "./Sudoku.css"

const SudokuComponent = ({ sudoData, setSudoData, result, setResult }) => {

  const initGame = () => {
    const newBoard = makepuzzle()
    const solution = solvepuzzle(newBoard)

    setSudoData({
      ...sudoData,
      visible: true,
      solution: solution,
      solutionVisible: false,
      board: newBoard
    })

    const inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach((input) => {
      input.value = '';
    })
  }

  const changeHandler = (e, index) => {
    const tempBoard = sudoData.board
    tempBoard[index] = e.target.valueAsNumber

    setSudoData({ ...sudoData, board: tempBoard })
  }

  const clickHandler = () => {
    if (!sudoData.board.some(cell => cell === null)
      && sudoData.board.every((value, index) => value === sudoData.solution[index])) {
      alert("You won!")
      setResult({
        ...result,
        sudoWon: result.sudoWon + 1
      })
    }
    else {
      if (confirm("That wasn't right. See solution?")) {
        setResult({
          ...result,
          sudoLost: result.sudoLost + 1
        })
        setSudoData({
          ...sudoData,
          solutionVisible: true
        })
      }
    }
  }

  return (
    <div className={sudoData.visible ? "sudo-visible" : "sudo-invisible"}>
      <div className="sudoku-game">
        <p>Each row and column must contain a number from 0-8, with no repeats.</p>
        <div className="sudoku-board">
          {sudoData.board &&
            sudoData.board.map((cell, index) => (
              <button key={index} className="sudoku-cell">
                {cell !== null ? cell :
                  <input type="number" max="9" min="0" onChange={(e) => changeHandler(e, index)} />}
              </button>
            ))}
        </div>
        <button className={(!sudoData.board.some(cell => cell === null)) ? "button-visible" : "button-invisible"} onClick={clickHandler}>Check Answer</button>

        <div className={sudoData.solutionVisible ? "solution-visible" : "solution-invisible"}>
          {sudoData.solution.map((cell, index) => <span key={index}>{cell}</span>)}
        </div>
      </div>
      <StartButton init={initGame} visibility={sudoData.visible} />
      {/* <button onClick={initGame}>{sudoData.visible ? "Start Over" : "Start"}</button> */}
    </div >
  )
}

export default SudokuComponent