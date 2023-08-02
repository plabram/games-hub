import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export const Login = () => {
  const { login } = useAuth()
  const [user, setUser] = useState("")

  const handleInput = (ev) => {
    const { name, value } = ev.target
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    login(user)
  }

  return (
    <div>
      <h2>This is the login page</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">
          <input type="email" name="email" id="email" required onChange={handleInput} />
        </label>
        <label htmlFor="password">
          <input type="password" name="password" id="password" required onChange={handleInput} />
        </label>
        <button type="submit">Log In 🔑</button>
      </form>
      <Link to="/register">{"Don't have an account? Sign up."}
      </Link>
    </div>
  )
}