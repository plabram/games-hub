import "./StartButton.css"

const StartButton = ({ init, visibility, highlight }) => {
  return (
    <button onClick={init}
      className={visibility && highlight ? "button-start-again-highlighted" :
        visibility ? "button-start-again" :
          "button-start"}>
      {visibility ? "Start Over" : "Start"}
    </button>
  )
}

export default StartButton