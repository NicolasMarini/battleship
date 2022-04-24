import React from "react"
import Cell from "./Cell"

const Row = ({ playerId, number, letters, selectedShip }) => {
  console.log("number: ", number)

  return (
    <>
      {Object.keys(letters).map(key => {
        const letter = letters[key]

        console.log("ROW letter: ", letter)
        return (
          <Cell
            playerId={playerId}
            id={`${letter}${number}`}
            letter={letter}
            number={number}
          />
        )
      })}
    </>
  )
}

export default Row
