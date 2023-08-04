import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { lazy, useState, useEffect } from 'react'

import { ProtectedLayout } from "../src/layouts/ProtectedLayout"
import { FreeLayout } from "./layouts/FreeLayout/FreeLayout"
import { Login } from "../src/pages/Login"
const TicTacToe = lazy(() => import('./pages/TicTacToe/TicTacToe'))
const Hangman = lazy(() => import('./pages/Hangman/Hangman'))
const Sudoku = lazy(() => import('./pages/Sudoku/Sudoku'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))

function App() {

  //TicTacToe States
  const [ticData, setTicData] = useState(
    {
      tiles: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turn: "",
      visible: false
    }
  )

  //Hangman States
  const [hangData, setHangData] = useState(
    {
      clue: "",
      randomWord: "",
      lives: 5,
      usedLetters: [],
      visible: false
    }
  )

  //Sudoku States
  const [sudoData, setSudoData] = useState(
    {
      fullBoard: false,
      visible: false,
      board: [],
      solution: [],
      solutionVisible: false
    }
  )
  // const [sudokuBoard, setSudokuBoard] = useState(null)

  //Wins and Losses
  const [result, setResult] = useState({
    ticWon: 0,
    ticLost: 0,
    hangWon: 0,
    hangLost: 0,
    sudoWon: 0,
    sudoLost: 0
  })

  // const [result, setResult] = useState(() => window.localStorage.setItem("result", {
  //   ticWon: 0,
  //   ticLost: 0,
  //   hangWon: 0,
  //   hangLost: 0,
  //   sudoWon: 0,
  //   sudoLost: 0
  // }))

  return (
    <>
      <Routes>
        <Route element={<FreeLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="dashboard" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Dashboard {...result} />
            </React.Suspense>
          } />
          <Route path="tictactoe" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <TicTacToe
                ticData={ticData} setTicData={setTicData}
                result={result} setResult={setResult}
              />
            </React.Suspense>
          } />
          <Route path="hangman" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Hangman
                hangData={hangData} setHangData={setHangData}
                result={result} setResult={setResult}
              />
            </React.Suspense>
          } />
          <Route path="sudoku" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Sudoku
                sudoData={sudoData} setSudoData={setSudoData}
                result={result} setResult={setResult}
              // sudokuBoard={sudokuBoard} setSudokuBoard={setSudokuBoard}
              />
            </React.Suspense>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
