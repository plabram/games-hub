import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppBar from "../components/AppBar"

export const FreeLayout = () => {
  const { user } = useAuth()
  const outlet = useOutlet()

  if (user) return <Navigate to="/dashboard/" replace />

  return (
    <>
      <AppBar pages={
        [
          // { label: "Home 🏠", path: "/" },
          { label: "Login 🔐", path: "/login" }]
      }
      />
      {outlet}
    </>
  )
}