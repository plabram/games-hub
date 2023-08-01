import React, { useState, useEffect } from 'react'
import { makepuzzle, solvepuzzle } from "sudoku";
import "./Sudoku.css"

const SudokuComponent = () => {


  const [sudokuBoard, setSudokuBoard] = useState(null);
  const [fullBoard, setFullBoard] = useState(false)


  useEffect(() => {
    const newBoard = makepuzzle();
    setSudokuBoard(newBoard);
  }, []);

  const changeHandler = (e, index) => {
    console.log(e)
    console.log(index)
    const newBoard = sudokuBoard
    newBoard[index] = e.target.valueAsNumber
    setSudokuBoard(newBoard)
    console.log(sudokuBoard)
    if (sudokuBoard && !sudokuBoard.some(cell => cell === null)) { setFullBoard(true) }
  }

  const solved = solvepuzzle(sudokuBoard);


  const clickHandler = () => {
    console.log("solution:", solved)
    console.log("attempt", sudokuBoard)
    let test = "test"
    if (sudokuBoard.every((value, index) => value === solved[index])) { alert("You won!") }
    else {
      if (confirm("That wasn't right. See solution?")) { test = solved }
    }
    document.getElementById("test").innerHTML = test;
  }
  console.log("global solution:", solved)

  return (
    <>
      <div className="sudoku-board">
        {sudokuBoard &&
          sudokuBoard.map((cell, index) => (
            <button key={index} className="sudoku-cell">
              {cell !== null ? cell :
                <input type="number" max="9" min="0" onChange={(e) => changeHandler(e, index)}></input>}
            </button>
          ))}
      </div>
      <button className={fullBoard ? "visible" : "visible"} onClick={clickHandler}>Check Answer</button>
      <p id="test" className="solution"></p>
    </>
  )
}

export default SudokuComponent