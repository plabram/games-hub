import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "../components/AppBar/AppBar"

export const ProtectedLayout = () => {
  const { user } = useAuth()
  const outlet = useOutlet()

  if (!user) return <Navigate to="/" />

  return (
    <>
      <AppBar pages={
        [
          { label: "Dashboard 🙋🏻‍♀️", path: "dashboard" },
          { label: "TicTacToe", path: "tictactoe" },
          { label: "Sudoku", path: "sudoku" },
          { label: "Hangman", path: "hangman" }
        ]
      }
      />
      {outlet}
    </>
  )
}