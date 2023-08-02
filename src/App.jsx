import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import React, { lazy, useState } from 'react'

const Home = lazy(() => import('./pages/Home/Home'))
const TicTacToe = lazy(() => import('./pages/TicTacToe/TicTacToe'))
const Hangman = lazy(() => import('./pages/Hangman/Hangman'))
const Sudoku = lazy(() => import('./pages/Sudoku/Sudoku'))


function App() {

  //TicTacToe States
  const [tiles, setTiles] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [isStarted, setIsStarted] = useState(false)
  const [turn, setTurn] = useState("X")

  //Hangman States
  const [clue, setClue] = useState("")
  const [randomWord, setRandomWord] = useState("")
  const [lives, setLives] = useState(5)
  const [usedLetters, setUsedLetters] = useState("")

  //Sudoku States
  const [sudokuBoard, setSudokuBoard] = useState(null)
  const [fullBoard, setFullBoard] = useState(false)

  //Wins and Losses
  const [ticWon, setTicWon] = useState(0)
  const [ticLost, setTicLost] = useState(0)
  const [hangWon, setHangWon] = useState(0)
  const [hangLost, setHangLost] = useState(0)
  const [sudoWon, setSudoWon] = useState(0)
  const [sudoLost, setSudoLost] = useState(0)


  return (
    <>
      <header>
        <h1>Games Hub</h1>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/hangman">Hangman</Link>
          <Link to="/sudoku">Sudoku</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Home ticWon={ticWon} ticLost={ticLost} hangWon={hangWon} hangLost={hangLost} sudoWon={sudoWon} sudoLost={sudoLost} />
          </React.Suspense>
        } />
        <Route path="/tictactoe" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <TicTacToe tiles={tiles} setTiles={setTiles} isStarted={isStarted} setIsStarted={setIsStarted} turn={turn} setTurn={setTurn}
              ticWon={ticWon} setTicWon={setTicWon} ticLost={ticLost} setTicLost={setTicLost}
            />
          </React.Suspense>
        } />
        <Route path="/Hangman" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Hangman clue={clue} setClue={setClue} randomWord={randomWord} setRandomWord={setRandomWord} lives={lives} setLives={setLives} usedLetters={usedLetters} setUsedLetters={setUsedLetters}
              hangWon={hangWon} setHangWon={setHangWon} hangLost={hangLost} setHangLost={setHangLost}
            />
          </React.Suspense>
        } />
        <Route path="/Sudoku" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Sudoku sudokuBoard={sudokuBoard} setSudokuBoard={setSudokuBoard} fullBoard={fullBoard} setFullBoard={setFullBoard}
              sudoWon={sudoWon} setSudoWon={setSudoWon} sudoLost={sudoLost} setSudoLost={setSudoLost}
            />
          </React.Suspense>
        } />
      </Routes>
    </>
  )
}

export default App
