import React from "react"
import Cell from "./Cell"

const Row = ({ number, letters }) => {
  console.log("number: ", number)

  return (
    <>
      {Object.keys(letters).map(key => {
        console.log("letter: ", letters[key])
        return <Cell id={`${letters[key]}${number}`} />
      })}
    </>
  )
}

export default Row
