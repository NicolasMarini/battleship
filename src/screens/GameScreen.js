import main from "../reducers/main"
import Board from "../components/Board"
import "./GameScreen.css"

const GameScreen = () => {
  return (
    <div className={"container"}>
      <div>
        <Board playerId="player1" />
      </div>
      <div>
        <Board playerId="cpu" />
      </div>
    </div>
  )
}

export default GameScreen
