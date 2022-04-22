import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { placeShip } from "../actions/actions"
import { getPaintedCells } from "../reducers/main"

const Cell = ({ playerId, id, letter, number, cellId }) => {
  // console.log("data: ", data)
  // console.log("id: ", id)
  const dispatch = useDispatch()
  const currentShipToPlace = useSelector(state => state.currentShipToPlace)
  const board = useSelector(state => state.boards.boardPlayer1)

  const shouldPaintCell = _board => {
    // if (getPaintedCells(_board) === 0) return false
    getPaintedCells(_board)

    // console.log(
    //   "shouldPaintCell cells boolean: ",
    //   Boolean(cells.find(cell => cell === `${letter}${number}`))
    // )
    // return Boolean(cells.find(cell => cell === `${letter}${number}`))
  }
  console.log("CELL playerId: ", playerId)

  console.log("ship to dispatch: ", {
    shipId: currentShipToPlace,
    letter,
    number
  })

  return (
    <div
      style={{
        display: "inline-block",
        border: "1px solid black",
        width: 25,
        height: 25,
        backgroundColor: getPaintedCells(board).includes(id) ? "grey" : "#fff"
      }}
      onClick={() =>
        // dispatch(placeShip({ shipId: currentShipToPlace, letter, number }))
        dispatch(
          placeShip({
            playerId: "player1",
            shipId: currentShipToPlace,
            cellId
            // letter,
            // number
          })
        )
      }
    >
      {`${letter}${number}`}
    </div>
  )
}

export default Cell
