import React from 'react'
import GameCard from '../components/GameCard';
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';
import AppBar from "../components/AppBar/AppBar"

const Dashboard = ({ ticWon, ticLost, hangWon, hangLost, sudoWon, sudoLost }) => {
  const { user } = useAuth()
  const outlet = useOutlet()

  if (!user) return <Navigate to="/" />

  return (
    <>
      <GameCard title="TicTacToe" link="/tictactoe" lost={ticLost} won={ticWon} />
      <GameCard title="Hangman" link="/hangman" lost={hangLost} won={hangWon} />
      <GameCard title="Sudoku" link="/sudoku" lost={sudoLost} won={sudoWon} />
      {outlet}
    </>
  )
}

export default Dashboard


// import React from 'react'
// import GameCard from '../../components/GameCard'
// import { Navigate, useOutlet } from "react-router-dom";
// import { useAuth } from '../../hooks/useAuth';
// import AppBar from "../../components/AppBar"

// const Home = ({ ticWon, ticLost, hangWon, hangLost, sudoWon, sudoLost }) => {
// const { user } = useAuth()
// const outlet = useOutlet()

// if (!user) return <Navigate to="/" />

// return (
//   <>
//     <GameCard title="TicTacToe" link="/tictactoe" lost={ticLost} won={ticWon} />
//     <GameCard title="Hangman" link="/hangman" lost={hangLost} won={hangWon} />
//     <GameCard title="Sudoku" link="/sudoku" lost={sudoLost} won={sudoWon} />
//     {outlet}
//   </>
// )
// }

// export default Home