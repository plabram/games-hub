import React, { useState, useEffect } from 'react'

const TicTacToe = ({ ticWon, setTicWon, ticLost, setTicLost, tiles, setTiles, turn, setTurn }) => {

  const players = ["X", "O"]


  const initGame = () => {
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
    tempTiles[a][b] = `${player}`
    setTiles(tempTiles)
  }

  const computerPlays = () => {
    const arrFlat = tiles.flat()
    const n = Math.round(Math.random() * arrFlat.length)
    if (arrFlat[n] !== null) { computerPlays() }
    else {
      const i = Math.floor(n / 3)
      const j = n % 3
      play(i, j, "O")
    }
  }

  const clickHandler = (i, j) => {
    if (tiles[i][j] === null && turn === "X") {
      play(i, j, "X")
      setTurn("O")
      // computerPlays()
    }
    else if (turn !== "X") {
      alert("The computer is playing.")
    }
    else {
      alert("Someone has already used that tile.")
    }
  }

  useEffect(() => {
    if (turn === "O") {
      // return () => clearTimeout(timer);
      computerPlays()
      setTurn("X")
    }
  }, [turn])

  useEffect(() => {

    console.log("render the board")
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
    if (finishGame("X")) {
      alert("You win")
      setTicWon(ticWon + 1)
      setTurn("X")
    }
    if (finishGame("O")) {
      alert("The computer wins")
      setTicLost(ticLost + 1)
      setTurn("O")
    }
    if (!finishGame("X")
      && !finishGame("O")
      && !tiles.some((row) => (row.some(i => i === null)))) { alert("It's a draw") }
  }, [tiles])


  return (
    <>
      <button onClick={initGame}>New Game</button>
      <p>Player: {turn}</p>
      <div>
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
    </>
  )
}

export default TicTacToe