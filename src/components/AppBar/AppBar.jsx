import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import "./AppBar.css"

const AppBar = ({ pages }) => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleNavigate = (path) => {
    if (path) navigate(path)
  }
  return (
    <div className="header-and-nav">
      <div className="logout">{
        !!user && (
          <button key={logout} onClick={logout}>Logout 🚪</button>
        )
      }</div>
      <header>
        <h1>Games Hub</h1>
      </header>
      <nav>
        {
          pages?.map((page) => (
            <button key={page.label} onClick={() => handleNavigate(page.path)}>
              {page.label}
            </button>
          ))
        }
      </nav>
    </div>
  )
}

export default AppBar