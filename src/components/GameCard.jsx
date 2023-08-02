import React from 'react'
import { Link } from 'react-router-dom'

const GameCard = ({ title, link, lost, won }) => {
  return (
    <div className='gamecard'>
      <h3><Link to={link}>{title}</Link></h3>
      <p>Wins: {won} | Losses: {lost}</p>
      <p>Level: {(won > 50) ? "Superstar" : (won > 10) ? "Expert" : (won > 5) ? "Artisan" : "Beginner"}</p>
    </div>
  )
}

export default GameCard