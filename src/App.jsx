import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import React, { lazy } from 'react'

const Home = lazy(() => import('./pages/Home/Home'))
const TicTacToe = lazy(() => import('./pages/TicTacToe/TicTacToe'))
const Hangman = lazy(() => import('./pages/Hangman/Hangman'))
const Sudoku = lazy(() => import('./pages/Sudoku/Sudoku'))


function App() {

  return (
    <>
      <header>
        <h1>Games Hub</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/tictactoe">TicTacToe</Link>
          <Link to="/hangman">Hangman</Link>
          <Link to="/sudoku">Sudoku</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Home />
          </React.Suspense>
        } />
        <Route path="/tictactoe" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <TicTacToe />
          </React.Suspense>
        } />
        <Route path="/Hangman" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Hangman />
          </React.Suspense>
        } />
        <Route path="/Sudoku" element={
          <React.Suspense fallback={<h2>Loading...</h2>}>
            <Sudoku />
          </React.Suspense>
        } />
      </Routes>
    </>
  )
}

export default App
