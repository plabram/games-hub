import React, { useEffect } from 'react'
import "./Hangman.css"


const Hangman = ({ hangData, setHangData, result, setResult }) => {

  const words = ["diplomatic", "health", "thaw", "victory", "casualty", "union", "year", "pension", "assumption", "texture"]

  const initGame = () => {
    const random = words[Math.round(Math.random() * words.length)]
    const randomPrettified = random.split("").map(i => "_").join(" ").trim()
    setHangData({
      ...hangData,
      randomWord: random,
      clue: randomPrettified,
      visible: true
    })
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

    if (hangData.randomWord.includes(e.target.elements[0].value)) {
      const nextClue = findAndReplaceLetters(e.target.elements[0].value, hangData.randomWord, hangData.clue)
      setHangData({ ...hangData, clue: nextClue })
    } else {
      setHangData({ ...hangData, lives: hangData.lives - 1 })

      if (hangData.lives == 0) {
        alert(`Sorry! You lost. The word is ${hangData.randomWord}.`)
        setResult({
          ...result,
          hangLost: result.hangLost + 1
        })
      }
      else {
        alert("This letter isn't in the word.")
        console.log(hangData.usedLetters)
        setHangData({ ...hangData, usedLetters: [...hangData.usedLetters, e.target.elements[0].value] })
        console.log(hangData.usedLetters)
      }
    }
    e.target.elements[0].value = ""
  }

  useEffect(() => {
    if (!hangData.clue.includes("_") && (hangData.clue !== "")) {
      alert("You won!")
      setResult({
        ...result,
        hangWon: result.hangWon + 1
      })
      initGame()
    }
  }, [hangData.clue])

  return (
    <div className={hangData.visible ? "hangman-visible" : "hangman-invisible"}>
      <div className="hangman-game">
        <p>{(hangData.lives >= 0) ? `Lives remaining: ${hangData.lives}` : "You lose"}</p>
        <p className="clue">{hangData.clue}</p>
        <form onSubmit={checkLetter}>
          <input placeholder="Type a letter" required />
          <button type="submit">Try</button>
        </form>
        <p className="used-letters"><s>{hangData.usedLetters}</s></p>
      </div>
      <button onClick={initGame}>{hangData.visible ? "Start Over" : "Start"}</button>
    </div>
  )
}

export default Hangman