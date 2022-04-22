import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectShip } from "../actions/actions"
import Row from "./Row"
import shipIds from "../enums/shipIds"

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const letters = ["a", "b", "c", "d"]
// const numbers = [1, 2, 3, 4]

const Board = ({ playerId }) => {
  // const boardRows = generateBoardStructure(letters, numbers)

  // console.log("boardRows: ", boardRows)

  // const [selectedShip, setSelectedShip] = useState(null)
  const currentShipToPlace = useSelector(state => state.currentShipToPlace)
  const boardPlayer1 = useSelector(state => state.boards.boardPlayer1)
  const dispatch = useDispatch()

  console.log("Board currentShipToPlace: ", currentShipToPlace)
  console.log("boardPlayer1:: ", boardPlayer1)

  return (
    <>
      <div>
        <h4>Carrier (4 cells)</h4>
        {/* <h4>Selected: {JSON.stringify(selectedShip)}</h4> */}
        <div
          // onClick={() => dispatch(selectShip(testSelectedShip))}
          style={{ backgroundColor: "blue", width: 100, height: 25 }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "grey"
        }}
      >
        {numbers.map(number => (
          <div style={{ flexDirection: "row", backgroundColor: "green" }}>
            <Row playerId={playerId} number={number} letters={letters} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Board
