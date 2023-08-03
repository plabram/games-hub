import React from 'react'
import { Link } from 'react-router-dom'
import "./GameCard.css"

const GameCard = ({ title, link, lost, won }) => {
  return (
    <div className='gamecard'>
      <Link to={link}>
        <h3>{title}</h3>
        <p>Wins: {won} | Losses: {lost}</p>
        <p><strong>Level: {(won > 50) ? "Superstar" : (won > 10) ? "Expert" : (won > 5) ? "Artisan" : "Beginner"}</strong></p>
      </Link>
    </div>
  )
}

export default GameCard