import React, { useEffect } from 'react'
import "./Hangman.css"


const Hangman = ({ clue, setClue, randomWord, setRandomWord, lives, setLives, usedLetters, setUsedLetters,
  hangWon, setHangWon, hangLost, setHangLost, visible, setVisible }) => {

  const words = ["diplomatic", "health", "thaw", "victory", "casualty", "union", "year", "pension", "assumption", "texture"]

  const initGame = () => {
    const random = words[Math.round(Math.random() * words.length)]
    setRandomWord(random)
    setClue(random.split("").map(i => "_").join(" ").trim())
    setVisible(true)
  }

  const checkLetter = (e) => {
    e.preventDefault()
    const findAndReplaceLetters = (letter, word, prevClue) => {
      const trimmedClue = prevClue.replace(/\s/g, '')
      const newClue = []
      for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
          newClue.push(word[i])
        } else if (trimmedClue[i] !== "_") {
          newClue.push(trimmedClue[i])
        } else { newClue.push("_") }

      }
      return newClue.join(" ").trim()
    }

    if (randomWord.includes(e.target.elements[0].value)) {
      const nextClue = findAndReplaceLetters(e.target.elements[0].value, randomWord, clue)
      setClue(nextClue)
    } else {
      setLives(lives - 1)
      if (lives == 0) {
        alert("Sorry! You lost.")
        setHangLost(hangLost + 1)
      }
      else {
        alert("That letter doesn't exist")
        setUsedLetters([...usedLetters, `${e.target.elements[0].value} `])
      }
    }
    e.target.elements[0].value = ""
  }

  useEffect(() => {
    if (!clue.includes("_") && (clue !== "")) {
      alert("You won!")
      setHangWon(hangWon + 1)
    }
  }, [clue])

  return (
    <div className={visible ? "hangman-visible" : "hangman-invisible"}>
      <div className="hangman-game">
        <p>{(lives >= 0) ? `Lives remaining: ${lives}` : "You lose"}</p>
        <p className="clue">{clue}</p>
        <form onSubmit={checkLetter}>
          <input placeholder="Type a letter" required />
          <button type="submit">Try</button>
        </form>
        <p><s>{usedLetters}</s></p>
      </div>
      <button onClick={initGame}>{visible ? "Start Over" : "Start"}</button>
    </div>
  )
}

export default Hangman