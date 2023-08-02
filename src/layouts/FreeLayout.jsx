import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "../components/AppBar"

export const FreeLayout = () => {
  const { user } = useAuth()
  const outlet = useOutlet()

  //remove test/
  if (user) return <Navigate to="/dashboard/" replace />

  return (
    <>
      <h1>The Games Hub</h1>
      {/* <AppBar pages={
        [{ label: "Login 🔐", path: "/login" }]
      }
      /> */}
      {outlet}
    </>
  )
}