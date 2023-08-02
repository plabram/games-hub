import React, { useState, useEffect } from 'react'
import { makepuzzle, solvepuzzle } from "sudoku";
import "./Sudoku.css"

const SudokuComponent = ({ sudokuBoard, setSudokuBoard, fullBoard, setFullBoard, sudoWon, setSudoWon, sudoLost, setSudoLost }) => {

  const solved = solvepuzzle(sudokuBoard)

  console.log(solved)

  useEffect(() => {
    const newBoard = makepuzzle()
    setSudokuBoard(newBoard)
  }, []);

  const changeHandler = (e, index) => {
    const newBoard = sudokuBoard
    newBoard[index] = e.target.valueAsNumber
    setSudokuBoard(newBoard)
    if (sudokuBoard && !sudokuBoard.some(cell => cell === null)) { setFullBoard(true) }
  }

  const clickHandler = () => {
    let solution = ""
    const solutionGrid = (arr) => {
      let string = ""
      for (const i in arr) {
        string += `<p>${arr[i]}</p>`
      }
      return string
    }

    if (sudokuBoard.every((value, index) => value === solved[index])) {
      alert("You won!")
      setSudoWon(sudoWon + 1)
    }
    else {
      if (confirm("That wasn't right. See solution?")) {
        solution = solved
        setSudoLost(sudoLost + 1)
      }
    }
    document.getElementById("solution-grid").innerHTML = solutionGrid(solution);
  }

  const resetGame = () => {
    const newBoard = makepuzzle()
    setSudokuBoard(newBoard)
    const inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach((input) => {
      input.value = '';
    })
  }

  return (
    <>
      <button onClick={resetGame}>Start Again</button>
      <div className="sudoku-board">
        {sudokuBoard &&
          sudokuBoard.map((cell, index) => (
            <button key={index} className="sudoku-cell">
              {cell !== null ? cell :
                <input type="number" max="9" min="0" onChange={(e) => changeHandler(e, index)} />}
            </button>
          ))}
      </div>
      <button className={fullBoard ? "visible" : "visible"} onClick={clickHandler}>Check Answer</button>
      <div id="solution-grid" className="solution"></div>
    </>
  )
}

export default SudokuComponent