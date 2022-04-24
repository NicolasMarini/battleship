import { shipsToPlace, letters, orientations } from "./constants"

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
  cellNumber,
  direction
) =>
  direction === "left"
    ? `${letters[firstLetterIndex - 1]}${cellNumber}`
    : `${letters[firstLetterIndex + 1]}${cellNumber}`

export const addCellVertically = (
  letters,
  firstLetterIndex,
  cellNumber,
  direction
) =>
  direction === "top"
    ? `${letters[firstLetterIndex]}${cellNumber - 1}`
    : `${letters[firstLetterIndex]}${cellNumber + 1}`

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

export const cellIdToCellObject = cellId => {
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
  const { letter: cellLetter, number: cellNumber } = cellIdToCellObject(
    cellIdToAdd
  )

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
  const { letter: cellLetter } = cellIdToCellObject(cellIdToAdd)

  const letterIndexInLetters = letters.findIndex(
    letter => letter === cellLetter
  )

  if (direction === "left") {
    return letterIndexInLetters > 0
  }

  return (
    letterIndexInLetters + shipSize <= 10 &&
    10 - letterIndexInLetters >= shipSize
  )
}

export const isLastCellToTheRight = firstLetterIndex =>
  firstLetterIndex + 1 === 10

export const isFirstCellToTheLeft = firstLetterIndex => firstLetterIndex === 0

export const removeHorizontalCells = (availableCells, cell) =>
  availableCells.filter(
    cellId => cellIdToCellObject(cellId).letter === cell.letter
  )

export const removeVerticalCells = (availableCells, cellNumber) =>
  availableCells.filter(
    cellId => cellIdToCellObject(cellId).number === cellNumber
  )

export const shipHasMoreThanOneCell = ship => ship.cells.length > 1

// if a ship has two cells with the same number that means that the ship is palced horizontally
export const isShipIsPlacedHorizontally = ship =>
  cellIdToCellObject(ship.cells[0]).number ===
  cellIdToCellObject(ship.cells[1]).number

// if a ship has two cells with the same letter that means that the ship is placed vertically
export const isShipIsPlacedVertically = ship =>
  cellIdToCellObject(ship.cells[0]).letter ===
  cellIdToCellObject(ship.cells[1]).letter

export const isShipCompletelyPlaced = ship => ship.cells.length === ship.size

// returns the letters of all the painted cells for a ship
export const getPaintedCellsLetters = (player, shipId) => {
  const paintedCells = getPaintedCellsByShip(player, shipId)

  return paintedCells.map(cellId => cellIdToCellObject(cellId).letter)
}

// returns the indexes from letters for a ship's cells
export const getLetterIndexes = shipCellsLetter =>
  shipCellsLetter.map(cellLetter => getFirstLetterIndex(letters, cellLetter))

// HORIZONTAL SHIP
export const getGreatestLetterIndex = letterIndexes =>
  Math.max(...letterIndexes)

export const isTheLastCellToTheRight = letterIndexes =>
  getGreatestLetterIndex(letterIndexes) === 9

export const isTheFirstCellToTheLeft = letterIndexes =>
  getGreatestLetterIndex(letterIndexes) === 9

export const getNextCellToTheRight = (cellNumber, letterIndexes) => {
  const greatestLetterIndex = getGreatestLetterIndex(letterIndexes)

  const nextCellToTheRight = addCellHorizontally(
    letters,
    getFirstLetterIndex(letters, letters[greatestLetterIndex]),
    cellNumber,
    "right"
  )

  return nextCellToTheRight
}

export const getFirstLetterIndex = (letters, letter) =>
  letters.findIndex(letterItem => letterItem === letter)

export const getNextCellToTheLeft = (
  cellNumber,
  firstHorizontalPaintedCellIndex
) =>
  addCellHorizontally(
    letters,
    getFirstLetterIndex(letters, letters[firstHorizontalPaintedCellIndex]),
    cellNumber,
    "left"
  )

// VERTICAL SHIP
export const getFirstCellToTheTop = (player, shipId) => {
  const paintedCells = getPaintedCellsByShip(player, shipId)
  const paintedCellsNumbers = paintedCells.map(
    cellId => cellIdToCellObject(cellId).number
  )
  return Math.min(...paintedCellsNumbers)
}

export const getLastCellToTheBottom = (player, shipId) => {
  const paintedCells = getPaintedCellsByShip(player, shipId)
  const paintedCellsNumbers = paintedCells.map(
    cellId => cellIdToCellObject(cellId).number
  )
  return Math.max(...paintedCellsNumbers)
}

export const getPreviousVerticalCellId = (letter, firstCellToTheTop) =>
  `${letter}${firstCellToTheTop - 1}`

export const getNextVerticalCellId = (letter, lastCellToTheBottom) =>
  `${letter}${lastCellToTheBottom + 1}`

// CPU fuctions

export const getRandomLetter = () =>
  letters[Math.floor(Math.random() * letters.length)]

export const getRandomOrientation = () =>
  orientations[Math.floor(Math.random() * orientations.length)]

export const buildRandomShip = shipSize => {
  const randomLetter = getRandomLetter()
  const randomOrientation = getRandomOrientation()
  console.log("randomLetter: ", randomLetter)
  console.log("randomOrientation: ", randomOrientation)
}
