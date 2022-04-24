import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { placeShip } from "../actions/actions"
import { getPaintedCells } from "../utils/helpers"

const Cell = ({ playerId, id, letter, number }) => {
  // console.log("data: ", data)
  // console.log("id: ", id)
  const dispatch = useDispatch()
  const currentShipToPlace = useSelector(state => state.currentShipToPlace)
  // const board = useSelector(state => state.boards.boardPlayer1)
  const player = useSelector(state => state.players[playerId])
  const { availableCells } = player

  const shouldPaintCell = player => {
    // if (getPaintedCells(_board) === 0) return false
    getPaintedCells(player)

    // console.log(
    //   "shouldPaintCell cells boolean: ",
    //   Boolean(cells.find(cell => cell === `${letter}${number}`))
    // )
    // return Boolean(cells.find(cell => cell === `${letter}${number}`))
  }

  console.log("currentShipToPlace: ", currentShipToPlace)
  console.log("currentPlayer: ", player)

  return (
    <button
      disabled={!availableCells.includes(id) && availableCells.length > 0}
      style={{
        display: "inline-block",
        border: "1px solid black",
        width: 30,
        height: 30,
        backgroundColor: getPaintedCells(player).includes(id) ? "grey" : "#fff"
      }}
      onClick={() =>
        dispatch(
          player.boardCreationAction
          // placeShip({
          //   playerId,
          //   ship: currentShipToPlace,
          //   cell: {
          //     id,
          //     letter,
          //     number
          //   }
          // })
        )
      }
    >
      {`${letter}${number}`}
      {/* <button onClick={() => alert("rotating...")}>Rotate</button> */}
    </button>
  )
}

export default Cell
