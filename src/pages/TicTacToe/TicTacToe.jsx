import React, { useState } from 'react'

const TicTacToe = () => {

  const [tiles, setTiles] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])

  const [isStarted, setIsStarted] = useState(false)
  const [turn, setTurn] = useState("X")
  const [totalTurns, setTotalTurns] = useState(1)

  const play = (a, b, player) => {
    const tempTiles = [...tiles]
    tempTiles[a][b] = `${player}`
    setTiles(tempTiles)
  }

  const playRandomIfAvailable = (arr) => {
    const arrFlat = arr.flat()
    const n = Math.round(Math.random() * arrFlat.length)
    if (arrFlat[n] !== null) { playRandomIfAvailable(arr) }
    else {
      const i = Math.floor(n / 3)
      const j = n % 3
      play(i, j, "O")
      setTurn("X")
      console.log(totalTurns)
    }
  }

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

  const clickHandler = (i, j) => {
    if (tiles[i][j] === null && turn === "X" && totalTurns < 5) {
      setTotalTurns(totalTurns + 1)
      play(i, j, "X")
      finishGame("X") ? alert("You win") :
        setTurn("O")
      playRandomIfAvailable(tiles)
      if (finishGame("O")) {
        alert("The computer wins")
      }
    }
    else if (totalTurns >= 5) {
      finishGame("X") ? alert("You win") : alert("It's a draw")
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