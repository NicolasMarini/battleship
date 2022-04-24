import React from "react"
import Board from "../components/Board"
import main from "../reducers/main"

const StartScreen = () => {
  return (
    <div>
      <Board playerId="player1" />
    </div>
  )
}

export default StartScreen
