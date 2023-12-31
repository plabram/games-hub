import { createContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null)
  const navigate = useNavigate()

  const login = async (data) => {
    if (data.email === "test@test.com" && data.password === "Secure") {
      setUser(data)
      navigate("/dashboard", { replace: true })
    } else { alert("That user doesn't exist") }
  }

  const logout = () => {
    setUser()
    navigate("/", { replace: true })
  }

  const value = useMemo(() => ({
    user,
    login,
    logout
  }), [user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}