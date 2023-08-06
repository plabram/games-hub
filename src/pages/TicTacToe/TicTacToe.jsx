import React, { useState, useEffect } from 'react'
import StartButton from '../../components/StartButton/StartButton'
import "./TicTacToe.css"

const TicTacToe = ({ result, setResult, ticData, setTicData }) => {


  const players = ["🥷", "💻"]

  const initGame = () => {
    const randomPlayer = Math.round(Math.random())
    setTicData({
      tiles: [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
      turn: players[randomPlayer],
      visible: true
    })
  }

  const play = (a, b, player) => {
    const tempTiles = [...ticData.tiles]
    tempTiles[a][b] = `${players[player]}`
    const nextPlayer = (player === 0) ? 1 : 0
    setTicData({
      ...ticData,
      tiles: tempTiles,
      turn: players[nextPlayer]
    })
  }

  const playRandom = (player) => {
    const arrFlat = ticData.tiles.flat()
    const n = Math.round(Math.random() * arrFlat.length)
    if (arrFlat[n] === null) {
      const i = Math.floor(n / 3)
      const j = n % 3
      play(i, j, player)
    }
    else {
      playRandom(player)
    }
  }

  const clickHandler = (i, j) => {
    if (ticData.turn === players[1]) {
      alert("The computer is playing.")
    } else if (ticData.tiles[i][j] !== null) {
      alert("Someone has already used that tile.")
    }
    else {
      play(i, j, 0)
    }
  }

  useEffect(() => {
    if (ticData.turn === players[1]) {
      playRandom(1)
    }
  }, [ticData.turn])


  useEffect(() => {
    const finishGame = (user) => {
      if (ticData.tiles[0][0] === user && ticData.tiles[0][1] === user && ticData.tiles[0][2] === user ||
        ticData.tiles[1][0] === user && ticData.tiles[1][1] === user && ticData.tiles[1][2] === user ||
        ticData.tiles[2][0] === user && ticData.tiles[2][1] === user && ticData.tiles[2][2] === user ||
        ticData.tiles[0][0] === user && ticData.tiles[1][0] === user && ticData.tiles[2][0] === user ||
        ticData.tiles[0][1] === user && ticData.tiles[1][1] === user && ticData.tiles[2][1] === user ||
        ticData.tiles[0][2] === user && ticData.tiles[1][2] === user && ticData.tiles[2][2] === user ||
        ticData.tiles[0][0] === user && ticData.tiles[1][1] === user && ticData.tiles[2][2] === user ||
        ticData.tiles[0][2] === user && ticData.tiles[1][1] === user && ticData.tiles[2][0] === user
      )
        return true
      else return false
    }
    if (finishGame(players[0])) {
      alert(`
      ${players[0]}
      You win.
      `)
      setResult({
        ...result,
        ticWon: result.ticWon + 1
      })
      setTicData({
        tiles: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        turn: "",
        visible: false
      })
    }
    else if (finishGame(players[1])) {
      alert(`
      ${players[1]}
      The computer wins
      `)
      setResult({
        ...result,
        ticWon: result.ticLost + 1
      })
      setTicData({
        tiles: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        turn: "",
        visible: false
      })
    }
    else if (!finishGame(players[0])
      && !finishGame(players[1])
      && !ticData.tiles.some((row) => (row.some(i => i === null)))) {
      alert(`
      ${players[0]} ${players[1]}
      No-one wins.
      `)
      setTicData({
        tiles: [
          [null, null, null],
          [null, null, null],
          [null, null, null],
        ],
        turn: "",
        visible: false
      })
    }
  }, [ticData.tiles])


  return (
    <div className={ticData.visible ? "tictactoe-visible" : "tictactoe-invisible"}>
      <div className='tictactoe-game'>
        <p><span>Player: {ticData.turn} {ticData.turn === ticData.turn[0] ? "(Computer)" : "(You)"}</span></p>
        <table className="board">
          {ticData.tiles.map((row, rowIndex) => (





            <tr key={rowIndex}>
              {row.map((tile, columnIndex) => (
                <td key={columnIndex}><button className="tic-button" onClick={() => clickHandler(rowIndex, columnIndex)}>
                  {tile}
                </button></td>
              ))}
            </tr>


          ))}
        </table>
      </div>
      <StartButton init={initGame} visibility={ticData.visible} />
      {/* <button onClick={initGame}>{ticData.visible ? "Start Over" : "Start"}</button> */}
    </div>
  )
}

export default TicTacToe