import React from "react"
import Cell from "./Cell"

const Row = ({ playerId, number, letters, selectedShip }) => {
  console.log("number: ", number)

  return (
    <>
      {Object.keys(letters).map(key => {
        console.log("letter: ", letters[key])
        return (
          <Cell
            playerId={playerId}
            cellId={`${letters[key]}${number}`}
            letter={letters[key]}
            number={number}
          />
        )
      })}
    </>
  )
}

export default Row
