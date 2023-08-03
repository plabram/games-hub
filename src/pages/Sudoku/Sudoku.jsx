// import React, { useState, useEffect } from 'react'
import { makepuzzle, solvepuzzle } from "sudoku";
import "./Sudoku.css"

const SudokuComponent = ({ sudokuBoard, setSudokuBoard, fullBoard, setFullBoard, sudoWon, setSudoWon, sudoLost, setSudoLost, sudoVisible, setSudoVisible }) => {

  const solved = solvepuzzle(sudokuBoard)

  const initGame = () => {
    setSudoVisible(true)
    const newBoard = makepuzzle()
    setSudokuBoard(newBoard)
    console.log(solved)
    const inputElements = document.querySelectorAll('input[type="number"]');
    inputElements.forEach((input) => {
      input.value = '';
    })
  }

  console.log(solved)

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
        string += `<span>${arr[i]}</span>`
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

  return (
    <div className={sudoVisible ? "sudo-visible" : "sudo-invisible"}>
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
        <button className={fullBoard ? "button-visible" : "button-invisible"} onClick={clickHandler}>Check Answer</button>
        <div id="solution-grid" className="solution"></div>
      </div>
      <button onClick={initGame}>{sudoVisible ? "Start Over" : "Start"}</button>
    </div>
  )
}

export default SudokuComponent