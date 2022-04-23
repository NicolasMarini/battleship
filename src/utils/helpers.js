import { shipsToPlace, letters } from "./constants"

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

export const addCellVertically = (letters, firstLetterIndex, cell, direction) =>
  direction === "top"
    ? `${letters[firstLetterIndex]}${cell.number - 1}`
    : `${letters[firstLetterIndex]}${cell.number + 1}`

export const addOneCellInAllDirections = (letters, firstLetterIndex, cell) => [
  addCellHorizontally(letters, firstLetterIndex, cell, "right"),
  addCellHorizontally(letters, firstLetterIndex, cell, "left"),
  addCellVertically(letters, firstLetterIndex, cell, "top"),
  addCellVertically(letters, firstLetterIndex, cell, "bottom")
]

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

export const isThereEnoughSpaceToPlaceShipVertically = (
  player,
  shipId,
  cellIdToAdd,
  direction // top or bottom
) => {
  const { size: shipSize } = findShipById(player, shipId)
  const { letter: cellLetter, number: cellNumber } = splitCellId(cellIdToAdd)

  let counter = 0

  // if (direction === "bottom") {
  const allPaintedCells = getPaintedCells(player, shipId)

  for (let i = 1; i <= shipSize - 1; i++) {
    const cellNumberValue =
      direction === "bottom" ? cellNumber + i : cellNumber - i

    // checks that the cells to the bottom are valid and available
    if (
      !allPaintedCells.includes(`${cellLetter}${cellNumberValue}`) &&
      isValidCellNumber(cellNumberValue)
    ) {
      counter += 1
    }
  }
  // } else {
  //   for (let i = 1; i <= shipSize - 1; i++) {
  //     // checks that the cells to the top are valid and available
  //     if (
  //       !allPaintedCells.includes(`${cellLetter}${cellNumberValue}`) &&
  //       isValidCellNumber(cellNumberValue)
  //     ) {
  //       counter += 1
  //     }
  //   }
  // }

  return counter === shipSize - 1
}

export const isThereEnoughSpaceToPlaceShipHorizontally = (
  player,
  shipId,
  cellIdToAdd,
  direction // left or right
) => {
  const { size: shipSize } = findShipById(player, shipId)
  const { letter: cellLetter } = splitCellId(cellIdToAdd)

  const letterIndexInLetters = letters.findIndex(
    letter => letter === cellLetter
  )

  if (direction === "left") {
    return letterIndexInLetters - shipSize >= 0
  }

  return letterIndexInLetters + shipSize <= 10
}

export const isLastCellToTheRight = firstLetterIndex =>
  firstLetterIndex + 1 === 10

export const isFirstCellToTheLeft = firstLetterIndex => firstLetterIndex === 0

export const removeHorizontalCells = (availableCells, cell) =>
  availableCells.filter(cellId => splitCellId(cellId).letter === cell.letter)

export const removeVerticalCells = (availableCells, cell) =>
  availableCells.filter(cellId => splitCellId(cellId).number === cell.number)
