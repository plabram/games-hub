import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { lazy, useState } from 'react'

import { ProtectedLayout } from "../src/layouts/ProtectedLayout"
import { FreeLayout } from "./layouts/FreeLayout/FreeLayout"
import { Login } from "../src/pages/Login"
const TicTacToe = lazy(() => import('./pages/TicTacToe/TicTacToe'))
const Hangman = lazy(() => import('./pages/Hangman/Hangman'))
const Sudoku = lazy(() => import('./pages/Sudoku/Sudoku'))
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))

function App() {

  //TicTacToe States
  const [tiles, setTiles] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [turn, setTurn] = useState("")

  //Hangman States
  const [clue, setClue] = useState("")
  const [randomWord, setRandomWord] = useState("")
  const [lives, setLives] = useState(5)
  const [usedLetters, setUsedLetters] = useState("")
  const [visible, setVisible] = useState(false)

  //Sudoku States
  const [sudokuBoard, setSudokuBoard] = useState(null)
  const [fullBoard, setFullBoard] = useState(false)
  const [sudoVisible, setSudoVisible] = useState(false)

  //Wins and Losses
  const [ticWon, setTicWon] = useState(0)
  const [ticLost, setTicLost] = useState(0)
  const [hangWon, setHangWon] = useState(0)
  const [hangLost, setHangLost] = useState(0)
  const [sudoWon, setSudoWon] = useState(0)
  const [sudoLost, setSudoLost] = useState(0)
  const [ticVisible, setTicVisible] = useState(false)

  return (
    <>
      <Routes>
        <Route element={<FreeLayout />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="dashboard" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Dashboard ticWon={ticWon} ticLost={ticLost} hangWon={hangWon} hangLost={hangLost} sudoWon={sudoWon} sudoLost={sudoLost}
              />
            </React.Suspense>
          } />
          <Route path="tictactoe" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <TicTacToe tiles={tiles} setTiles={setTiles} turn={turn} setTurn={setTurn}
                ticWon={ticWon} setTicWon={setTicWon} ticLost={ticLost} setTicLost={setTicLost}
                ticVisible={ticVisible} setTicVisible={setTicVisible}
              />
            </React.Suspense>
          } />
          <Route path="hangman" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Hangman clue={clue} setClue={setClue} randomWord={randomWord} setRandomWord={setRandomWord} lives={lives} setLives={setLives} usedLetters={usedLetters} setUsedLetters={setUsedLetters}
                visible={visible} setVisible={setVisible} hangWon={hangWon} setHangWon={setHangWon} hangLost={hangLost} setHangLost={setHangLost}
              />
            </React.Suspense>
          } />
          <Route path="sudoku" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Sudoku sudokuBoard={sudokuBoard} setSudokuBoard={setSudokuBoard} fullBoard={fullBoard} setFullBoard={setFullBoard}
                sudoWon={sudoWon} setSudoWon={setSudoWon} sudoLost={sudoLost} setSudoLost={setSudoLost} sudoVisible={sudoVisible} setSudoVisible={setSudoVisible}
              />
            </React.Suspense>
          } />
        </Route>
      </Routes>
    </>
  )
}

export default App
