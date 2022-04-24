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

export const generateRandomBoard = () => {
  return {
    type: "GENERATE_RANDOM_BOARD"
  }
}
