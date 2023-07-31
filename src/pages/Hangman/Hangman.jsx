import React, { useState, useEffect } from 'react'

const Hangman = () => {

  const words = ["diplomatic", "health", "thaw", "victory", "casualty", "union", "year", "pension", "assumption", "texture"]
  const [clue, setClue] = useState("")
  const [randomWord, setRandomWord] = useState("")
  const [lives, setLives] = useState(5)

  const initGame = () => {
    const random = words[Math.round(Math.random() * words.length)]
    setRandomWord(random)
    setClue(random.split("").map(i => "_")
      // .join(" ").trim()
    )
  }

  const checkLetter = (e) => {
    e.preventDefault()
    const findAndReplaceLetters = (letter, word, prevClue) => {
      const newClue = []
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newClue.push(word[i])
        } else if (prevClue[i] !== "_") {
          newClue.push(prevClue[i])
        } else { newClue.push("_") }

      }
      return newClue
      // .join(" ").trim()
    }

    if (randomWord.includes(e.target.elements[0].value)) {
      const nextClue = findAndReplaceLetters(e.target.elements[0].value, randomWord, clue)
      setClue(nextClue)
    } else {
      setLives(lives - 1)
      if (lives == 0) { alert("Sorry! You lost.") }
      else {
        alert("That letter doesn't exist")
      }
    }
    e.target.elements[0].value = ""
  }

  useEffect(() => {
    if (!clue.includes("_") && (clue !== "")) { alert("You won!") }
  }, [clue])

  return (
    <>
      <button onClick={initGame}>Start</button>
      {/* <p>{randomWord}</p> */}
      <p>{clue}</p>
      <form onSubmit={checkLetter}>
        <input placeholder="Add a letter" />
        <button type="submit">Go</button>
      </form>
      <p>{(lives >= 0) ? `Lives remaining: ${lives}` : "You lose"}</p>
    </>
  )
}

export default Hangman