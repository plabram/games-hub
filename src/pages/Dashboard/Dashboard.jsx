import GameCard from "../../components/GameCard/GameCard";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import "./Dashboard.css"


const Dashboard = (result) => {

  const { ticWon, ticLost, hangWon, hangLost, sudoWon, sudoLost } = result
  const { user } = useAuth()
  const outlet = useOutlet()

  if (!user) return <Navigate to="/" />

  return (
    <div className="dashboard">
      <GameCard title="TicTacToe ❌" link="/tictactoe" lost={ticLost} won={ticWon} />
      <GameCard title="Hangman 😵" link="/hangman" lost={hangLost} won={hangWon} />
      <GameCard title="Sudoku 🔢" link="/sudoku" lost={sudoLost} won={sudoWon} />
      {outlet}
    </div>
  )
}

export default Dashboard