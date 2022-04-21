export const selectShip = selectedShip => {
  return {
    type: "SELECT_SHIP",
    payload: selectedShip
  }
}

export const placeShip = cellData => {
  return {
    type: "PLACE_SHIP",
    payload: cellData
  }
}
