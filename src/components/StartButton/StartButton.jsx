import "./StartButton.css"

const StartButton = ({ init, visibility }) => {
  return (
    <button onClick={init} className={visibility ? "button-start-again" : "button-start"}>{visibility ? "Start Over" : "Start"}</button>
  )
}

export default StartButton