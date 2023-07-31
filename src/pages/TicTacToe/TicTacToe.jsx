import React, { useState, useEffect } from 'react'

const TicTacToe = () => {

  const [tiles, setTiles] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])

  const [isStarted, setIsStarted] = useState(false)
  const [turn, setTurn] = useState("X")

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
      setTurn("X")
    }
  }

  useEffect(() => {

    const noNullTiles = !tiles.some((row) => (row.some(i => i === null)))
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
    if (finishGame("X")) { alert("You win") }
    if (finishGame("O")) { alert("The computer wins") }
    if (!finishGame("X") && !finishGame("O") && noNullTiles) { alert("It's a draw") }
  }, [tiles])



  const clickHandler = (i, j) => {
    if (tiles[i][j] === null && turn === "X") {
      play(i, j, "X")
      setTurn("O")
      computerPlays()
    }
    else if (turn !== "X") {
      alert("The computer is playing.")
    }
    else {
      alert("Someone has already used that tile.")
    }
  }


  return (
    <>
      <button onClick={() => setIsStarted(!isStarted)}>{isStarted ? "End Game" : "Start Game"}</button>
      <p>{(turn === "X") ? "It's X's turn." : "It's O's turn."}</p>
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