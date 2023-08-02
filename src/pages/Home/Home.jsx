import React from 'react'
import GameCard from '../../components/GameCard'

const Home = ({ ticWon, ticLost, hangWon, hangLost, sudoWon, sudoLost }) => {
  return (
    <>
      <GameCard title="TicTacToe" link="/tictactoe" lost={ticLost} won={ticWon} />
      <GameCard title="Hangman" link="/hangman" lost={hangLost} won={hangWon} />
      <GameCard title="Sudoku" link="/sudoku" lost={sudoLost} won={sudoWon} />
    </>
  )
}

export default Home