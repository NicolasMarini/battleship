import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { generateRandomBoard } from "../actions/actions"
import Row from "./Row"
import shipIds from "../enums/shipIds"

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const letters = ["a", "b", "c", "d"]
// const numbers = [1, 2, 3, 4]

const Board = ({ playerId }) => {
  const dispatch = useDispatch()
  const player = useSelector(state => state.players[playerId])

  const currentShipToPlace = useSelector(state => state.currentShipToPlace)

  console.log("Board currentShipToPlace: ", currentShipToPlace)

  return (
    <>
      <div>
        <h4>{player.name}</h4>
      </div>
      <div>
        {numbers.map(number => (
          <div>
            <Row playerId={playerId} number={number} letters={letters} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Board
