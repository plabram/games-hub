import './App.css'
import { Routes, Route } from 'react-router-dom'
import React, { lazy, useState, useEffect } from 'react'

const FreeLayout = lazy(() => import("../src/layouts/ProtectedLayout"))
const ProtectedLayout = lazy(() => import("./layouts/FreeLayout/FreeLayout"))
const Login = lazy(() => import("../src/pages/Login"))
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
      visible: false,
      board: [],
      solution: [],
      solutionVisible: false
    }
  )

  //Wins and Losses
  const storedItems = JSON.parse(localStorage.getItem("result"))
  const [result, setResult] = useState(storedItems)

  useEffect(() => {
    localStorage.setItem("result", JSON.stringify({
      ticWon: 0,
      ticLost: 0,
      hangWon: 0,
      hangLost: 0,
      sudoWon: 0,
      sudoLost: 0
    }))
  }, [result])

  return (
    <>
      <Routes>
        <Route element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <FreeLayout />
          </React.Suspense>
        }>
          <Route path="/" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Login />
            </React.Suspense>
          } />
        </Route >
        <Route path="/" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <ProtectedLayout />
          </React.Suspense>
        }>
          <Route path="dashboard" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Dashboard {...result} />
            </React.Suspense>
          } />
          <Route path="tictactoe" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <TicTacToe
                ticData={ticData} setTicData={setTicData} result={result} setResult={setResult}
              />
            </React.Suspense>
          } />
          <Route path="hangman" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Hangman
                hangData={hangData} setHangData={setHangData} result={result} setResult={setResult}
              />
            </React.Suspense>
          } />
          <Route path="sudoku" element={
            <React.Suspense fallback={<h2>Loading...</h2>}>
              <Sudoku
                sudoData={sudoData} setSudoData={setSudoData} result={result} setResult={setResult}
              />
            </React.Suspense>
          } />
        </Route>
      </Routes >
    </>
  )
}

export default App
