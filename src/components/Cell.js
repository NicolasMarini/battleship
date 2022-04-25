import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { placeShip, makeMove } from "../actions/actions"
import {
  getPaintedCells,
  getAllCellsIdsFromAllShips,
  getCellColorByStatus
} from "../utils/helpers"
import shipStatuses from "../enums/shipStatuses"

const Cell = ({ playerId, id, letter, number }) => {
  const dispatch = useDispatch()
  const currentShipToPlace = useSelector(state => state.currentShipToPlace)
  const player = useSelector(state => state.players[playerId])
  const { availableCells } = player
  const gameStarted = useSelector(state => state.gameStarted)
  const currentPlayerMoving = useSelector(state => state.currentPlayerMoving)
  const missedShots = useSelector(
    state => state.players[currentPlayerMoving].missedShots
  )

  const players = useSelector(state => state.players)

  const allCellsIdsFromAllShips = getAllCellsIdsFromAllShips(player.ships)

  console.log("CELL currentPlayerMoving: ", currentPlayerMoving)
  console.log("currentShipToPlace: ", currentShipToPlace)
  console.log("currentPlayer: ", player)
  console.log("gameStarted: ", gameStarted)
  // console.log("UPDATED STATE: ", state)
  console.log("CELL MISSED SHOTS: ", missedShots)
  console.log(
    "allCellsIdsFromAllShips: ",
    getAllCellsIdsFromAllShips(player.ships)
  )
  console.log("CELL PLAYERS: ", players)

  const actionToDispatch = () => {
    if (!gameStarted) {
      dispatch(
        placeShip({
          playerId,
          ship: currentShipToPlace,
          cell: {
            id,
            letter,
            number
          }
        })
      )
    }

    dispatch(
      makeMove({
        playerId,
        ship: currentShipToPlace,
        cell: {
          id,
          letter,
          number
        }
      })
    )
  }

  const paintedCells = getPaintedCells(player).map(cell => cell.id)

  const getBackgroundColor = () => {
    let cell = allCellsIdsFromAllShips.find(cell => cell.id === id)
    if (!cell && player.id !== currentPlayerMoving) {
      cell = missedShots.find(cell => cell.id === id)
    }

    return getCellColorByStatus(cell)
  }

  return (
    <button
      disabled={!availableCells.includes(id) && availableCells.length > 0}
      style={{
        display: "inline-block",
        border: "1px solid black",
        width: 30,
        height: 30,
        backgroundColor: getBackgroundColor()
        // paintedCells.includes(id) ? "grey" : "#fff"
      }}
      onClick={actionToDispatch}
    >
      {`${letter}${number}`}
    </button>
  )
}

export default Cell
