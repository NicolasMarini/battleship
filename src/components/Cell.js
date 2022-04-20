import React from "react"

const Cell = ({ data, id }) => {
  console.log("data: ", data)
  console.log("id: ", id)

  const paintCell = () => {}

  return (
    <div
      style={{
        display: "inline-block",
        border: "1px solid black",
        width: 25,
        height: 25
      }}
    >
      {id}
    </div>
  )
}

export default Cell
