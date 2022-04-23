import { shipsToPlace } from "./constants"

export const getBoardKeys = board => {
  return Object.keys(board)
}

// checks if a cell number is inside the board (from 1 to 10)
export const isValidCellNumber = cellNumber =>
  cellNumber <= 10 && cellNumber >= 1

// checks if a cell number is inside the board (from A to J)
export const isValidCellLetter = (letters, cellLetter) =>
  letters.includes(cellLetter)

export const addCellHorizontally = (
  letters,
  firstLetterIndex,
  cell,
  direction
) =>
  direction === "left"
    ? `${letters[firstLetterIndex - 1]}${cell.number}`
    : `${letters[firstLetterIndex + 1]}${cell.number}`

// receives an array with all the horizontal painted cells
// and returns the index of the letter that is furthest to the left
export const getFirstCellIdFromPaintedCells = letterIndexes =>
  Math.min(...letterIndexes)

export const getPaintedCells = player => {
  const { ships } = player
  let paintedCells = []
  ships.forEach(ship => {
    if (ship.cells.length > 0) {
      paintedCells = [...paintedCells, ...ship.cells]
    }
  })

  return paintedCells
}

export const getPaintedCellsByShip = (player, shipId) => {
  const { ships } = player
  let paintedCells = []
  ships.forEach(ship => {
    if (ship.id === shipId && ship.cells.length > 0) {
      paintedCells = [...paintedCells, ...ship.cells]
    }
  })

  return paintedCells
}

export const findShipIndexInArray = currentShipId =>
  shipsToPlace.findIndex(ship => ship.id === currentShipId)

export const splitCellId = cellId => {
  const cellIdAsArray = [...cellId]
  return {
    letter: cellIdAsArray[0],
    number: Number(cellId.substr(1, cellId.length - 1))
  }
}

// finds a ship (by its id) in a player
export const findShipById = (player, shipId) =>
  player.ships.find(shipItem => shipItem.id === shipId)
