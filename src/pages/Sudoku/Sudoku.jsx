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
    if (!isNaN(e.target.valueAsNumber)) {
      tempBoard[index] = e.target.valueAsNumber
    }
    else {
      tempBoard[index] = null
    }
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
    else if (sudoData.board.some(cell => cell === null)) {
      if (confirm("Are you sure? You have unfinished squares, so will lose the game.")) {
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
                {cell !== null ? <input placeholder={cell} type="number" max="9" min="0" onChange={(e) => changeHandler(e, index)} /> :
                  <input type="number" max="9" min="0" onChange={(e) => changeHandler(e, index)} />}
              </button>
            ))}
        </div>
        <button onClick={clickHandler}>Check Answer</button>

        <div className={sudoData.solutionVisible ? "solution-visible" : "solution-invisible"}>
          {sudoData.solution.map((cell, index) => <span key={index}>{cell}</span>)}
        </div>
      </div>
      <StartButton init={initGame} visibility={sudoData.visible} />
    </div >
  )
}

export default SudokuComponent