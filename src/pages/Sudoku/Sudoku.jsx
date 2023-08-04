import { makepuzzle, solvepuzzle } from "sudoku";
import "./Sudoku.css"

const SudokuComponent = ({
  sudokuBoard, setSudokuBoard,
  sudoData, setSudoData,
  result, setResult
}) => {

  const initGame = () => {
    const newBoard = makepuzzle()
    const solution = solvepuzzle(newBoard)
    console.log(solution)
    setSudokuBoard(newBoard)
    setSudoData({
      ...sudoData,
      visible: true,
      solution: solution,
      solutionVisible: false
    })

    const inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach((input) => {
      input.value = '';
    })
  }

  const changeHandler = (e, index) => {
    const newBoard = sudokuBoard
    newBoard[index] = e.target.valueAsNumber
    setSudokuBoard(newBoard)
    if (sudokuBoard && !sudokuBoard.some(cell => cell === null)) {
      setSudoData({
        ...sudoData,
        fullBoard: true
      })
    }
  }

  const clickHandler = () => {
    let solution = ""
    const solutionGrid = (arr) => {
      let string = ""
      for (const i in arr) {
        string += `<span>${arr[i]}</span>`
      }
      return string
    }

    if (!sudokuBoard.some(cell => cell === null)
      && sudokuBoard.every((value, index) => value === sudoData.solution[index])) {
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
        // document.getElementById("solution-grid").innerHTML = solutionGrid(sudoData.solution)
      }
    }
  }

  return (
    <div className={sudoData.visible ? "sudo-visible" : "sudo-invisible"}>
      <div className="sudoku-game">
        <p>Each row and column must contain a number from 0-8, with no repeats.</p>
        <div className="sudoku-board">
          {sudokuBoard &&
            sudokuBoard.map((cell, index) => (
              <button key={index} className="sudoku-cell">
                {cell !== null ? cell :
                  <input type="number" max="9" min="0" onChange={(e) => changeHandler(e, index)} />}
              </button>
            ))}
        </div>
        <button className={sudoData.fullBoard ? "button-visible" : "button-invisible"} onClick={clickHandler}>Check Answer</button>

        <div className={sudoData.solutionVisible ? "solution-visible" : "solution-invisible"}>
          {sudoData.solution.map((cell, index) => <span key={index}>{cell}</span>)}
        </div>
        <button onClick={initGame}>{sudoData.visible ? "Start Over" : "Start"}</button>
      </div>
    </div>
  )
}

export default SudokuComponent