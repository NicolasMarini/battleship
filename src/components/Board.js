import React from "react"
import Row from "./Row"

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const letters = ["a", "b", "c"]
// const numbers = [1, 2, 3]

const Board = () => {
  // const boardRows = generateBoardStructure(letters, numbers)

  // console.log("boardRows: ", boardRows)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey"
      }}
    >
      {numbers.map(number => (
        <div style={{ flexDirection: "row", backgroundColor: "green" }}>
          <Row number={number} letters={letters} />
        </div>
      ))}
    </div>
  )
}

export default Board
