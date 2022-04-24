import main from "../reducers/main"
import Board from "../components/Board"

const GameScreen = () => {
  return (
    <div>
      <Board playerId="player1" />
      <Board playerId="cpu" />
    </div>
  )
}

export default GameScreen
