import React, { useState, useEffect } from 'react'
import "./TicTacToe.css"

const TicTacToe = ({ ticWon, setTicWon, ticLost, setTicLost, tiles, setTiles, turn, setTurn,
  ticVisible, setTicVisible }) => {

  const players = ["X", "O"]

  const initGame = () => {
    setTicVisible(true)
    setTiles([
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ])
    const randomPlayer = Math.round(Math.random())
    setTurn(players[randomPlayer])
  }

  const play = (a, b, player) => {
    const tempTiles = [...tiles]
    tempTiles[a][b] = `${players[player]}`
    setTiles(tempTiles)
    const nextPlayer = (player === 0) ? 1 : 0
    setTurn(players[nextPlayer])
  }

  const playRandom = (player) => {
    const arrFlat = tiles.flat()
    const n = Math.round(Math.random() * arrFlat.length)
    if (arrFlat[n] !== null
    ) { playRandom(player) }
    else {
      const i = Math.floor(n / 3)
      const j = n % 3
      play(i, j, player)
    }
  }

  const clickHandler = (i, j) => {
    if (turn === players[1]) {
      alert("The computer is playing.")
    } else if (tiles[i][j] !== null) {
      alert("Someone has already used that tile.")
    }
    else {
      play(i, j, 0)
    }
  }

  useEffect(() => {
    if (turn === players[1]) {
      playRandom(1)
    }
  }, [turn])

  useEffect(() => {
    const finishGame = (user) => {
      if (tiles[0][0] === user && tiles[0][1] === user && tiles[0][2] === user ||
        tiles[1][0] === user && tiles[1][1] === user && tiles[1][2] === user ||
        tiles[2][0] === user && tiles[2][1] === user && tiles[2][2] === user ||
        tiles[0][0] === user && tiles[1][0] === user && tiles[2][0] === user ||
        tiles[0][1] === user && tiles[1][1] === user && tiles[2][1] === user ||
        tiles[0][2] === user && tiles[1][2] === user && tiles[2][2] === user ||
        tiles[0][0] === user && tiles[1][1] === user && tiles[2][2] === user ||
        tiles[0][2] === user && tiles[1][1] === user && tiles[2][0] === user
      )
        return true
      else return false
    }
    if (finishGame(players[0])) {
      setTicWon(ticWon + 1)
      setTiles([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
      setTurn("")
      setTicVisible(false)
      alert("You win")
    }
    if (finishGame(players[1])) {
      setTicLost(ticLost + 1)
      setTiles([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
      setTurn("")
      setTicVisible(false)
      alert("The computer wins")
    }
    if (!finishGame(players[0])
      && !finishGame(players[1])
      && !tiles.some((row) => (row.some(i => i === null)))) {
      setTiles([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
      setTurn("")
      setTicVisible(false)
      alert("It's a draw")
    }
  }, [tiles])


  return (
    <div className={ticVisible ? "tictactoe-visible" : "tictactoe-invisible"}>
      <div className='tictactoe-game'>
        <p>Player: {turn}</p>
        <div className="board">
          {tiles.map((row, rowIndex) => (
            <p key={rowIndex}>
              {row.map((tile, columnIndex) => (
                <button key={columnIndex} onClick={() => clickHandler(rowIndex, columnIndex)}>
                  {tile}
                </button>
              ))}
            </p>
          ))}
        </div>
      </div>
      <button onClick={initGame}>{ticVisible ? "Start Over" : "Start"}</button>
    </div>
  )
}

export default TicTacToe