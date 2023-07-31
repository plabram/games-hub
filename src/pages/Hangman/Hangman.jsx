import React, { useState, useEffect } from 'react'

const Hangman = () => {

  const words = ["diplomatic", "health", "thaw", "victory", "casualty", "union", "year", "pension", "assumption", "texture"]
  const [clue, setClue] = useState("")
  const [randomWord, setRandomWord] = useState("")

  const initGame = () => {
    const random = words[Math.round(Math.random() * words.length)]
    setRandomWord(random)
    setClue(random.split("").map(i => "_").join(" ").trim())
  }

  // useEffect(() => {
  //   console.log(clue)
  // }, [clue])

  const checkLetter = (e) => {
    e.preventDefault()
    console.log(randomWord, e.target.elements[0].value)

    const findAndReplaceClueLetters = (letter, word) => {
      const newClue = []
      for (let i = 0; i < word.length; i++) {
        (word[i] === letter) ? newClue.push(word[i]) : newClue.push("_")
      }

      return newClue.join(" ").trim()
    }
    const nextClue = findAndReplaceClueLetters(e.target.elements[0].value, randomWord)
    setClue(nextClue)
    e.target.elements[0].value = ""

  }

  return (
    <>
      <button onClick={initGame}>Start</button>
      <p>{randomWord}</p>
      <p>{clue}</p>
      <form onSubmit={checkLetter}>
        <input placeholder="Add a letter" />
        <button type="submit">Go</button>
      </form>
    </>
  )
}

export default Hangman