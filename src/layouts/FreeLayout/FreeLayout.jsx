import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./FreeLayout.css"

export const FreeLayout = () => {
  const { user } = useAuth()
  const outlet = useOutlet()

  //remove test/
  if (user) return <Navigate to="/dashboard/" replace />

  return (
    <div className="free-header">
      <h1>The Games Hub</h1>
      {outlet}
    </div>
  )
}