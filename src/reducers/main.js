import shipTypes from "../enums/shipTypes"
import shipIds from "../enums/shipIds"
import {
  addCellHorizontally,
  getFirstCellIdFromPaintedCells,
  isValidCellLetter,
  isValidCellNumber,
  findShipIndexInArray,
  getPaintedCells,
  getPaintedCellsByShip,
  cellIdToCellObject,
  removeHorizontalCells,
  removeVerticalCells,
  findShipById,
  addCellVertically,
  isThereEnoughSpaceToPlaceShipVertically,
  isThereEnoughSpaceToPlaceShipHorizontally,
  isLastCellToTheRight,
  isFirstCellToTheLeft,
  shipHasMoreThanOneCell,
  isShipIsPlacedHorizontally,
  isShipIsPlacedVertically,
  isShipCompletelyPlaced,
  getPaintedCellsLetters,
  getLetterIndexes,
  getNextCellToTheRight,
  isTheLastCellToTheRight,
  getNextCellToTheLeft,
  getFirstLetterIndex,
  getFirstCellToTheTop,
  getLastCellToTheBottom,
  getPreviousVerticalCellId,
  getNextVerticalCellId,
  getRandomLetter,
  getRandomOrientation
} from "../utils/helpers"
import { letters, numbers, shipsToPlace } from "../utils/constants"

const generateRow = (letter, numbers) => {
  let row = { [letter]: {} }

  for (let i = 1; i <= numbers.length; i++) {
    const cellObj = {
      id: null,
      shipType: null,
      status: null
    }

    let letterRow = {
      [letter]: {
        ...row.letter,
        [i]: cellObj
      }
    }
    row[letter] = { ...row[letter], ...letterRow[letter] }
  }

  return row
}

const generateBoardStructure = (letters, numbers) => {
  let board = {}

  letters.forEach(letter => {
    board = { ...board, ...generateRow(letter, numbers) }
  })

  return board
}

const boardPlayer1 = generateBoardStructure(letters, numbers)
const boardCPU = generateBoardStructure(letters, numbers)

const gamePlayers = {
  player1: {
    id: "player1",
    name: "player1",
    availableCells: [],
    ships: [
      { id: shipIds.carrier, size: 4, cells: [] },
      { id: shipIds.cruiser1, size: 3, cells: [] },
      { id: shipIds.cruiser2, size: 3, cells: [] },
      { id: shipIds.cruiser3, size: 3, cells: [] },
      { id: shipIds.submarine, size: 2, cells: [] }
    ]
  },
  cpu: {
    id: "cpu",
    name: "cpu",
    availableCells: [],
    ships: [
      { id: shipIds.carrier, size: 4, cells: [] },
      { id: shipIds.cruiser1, size: 3, cells: [] },
      { id: shipIds.cruiser2, size: 3, cells: [] },
      { id: shipIds.cruiser3, size: 3, cells: [] },
      { id: shipIds.submarine, size: 2, cells: [] }
    ]
  }
}

const initialState = {
  players: gamePlayers,
  currentShipToPlace: gamePlayers["player1"]["ships"][[0]],
  boards: { boardPlayer1, boardCPU }
}

// function that receives the current list of ships from state (for a specific player)
// and updates that list with the new ship placed in the board
const updatedPlayerShips = (playerShips, shipId, updatedShipNew) => {
  const updatedShipsArray = []

  playerShips.forEach(ship => {
    if (ship.id === shipId) {
      const updatedShip = {
        ...ship,
        cells: updatedShipNew.cells
      }
      updatedShipsArray.push(updatedShip)
    } else {
      updatedShipsArray.push(ship)
    }
  })

  return updatedShipsArray
}

const updatedPlayerShipsNew = (playerShips, shipId, cellId) => {
  const updatedShipsArray = []

  playerShips.forEach(ship => {
    console.log("ship item: ", ship)
    if (ship.id === shipId) {
      const updatedShip = {
        ...ship,
        cells: [...ship.cells, cellId]
      }
      updatedShipsArray.push(updatedShip)
    } else {
      updatedShipsArray.push(ship)
    }
  })

  return updatedShipsArray
}

// Verifies if the cells to place a ship exceeds the board limits
const areCellsValid = (ship, firstLetterIndex) => {
  for (let i = 0; i < ship.size; i++) {
    if (!letters[firstLetterIndex + i]) return false
  }

  return true
}

// sets all the cells for a specific ship based on its size
const fillShipCells = (shipToFill, cellNumber, firstLetterIndex) => {
  const updatedShip = { ...shipToFill }

  for (let i = 0; i < updatedShip.size; i++) {
    updatedShip.cells = [
      ...updatedShip.cells,
      `${letters[firstLetterIndex + i]}${cellNumber}`
    ]
  }

  return updatedShip
}

// checks if there's enough space to the right or to the top on the board to place the ship
const verifyEnoughSpaceToPlaceShip = player => {
  const paintedCells = getPaintedCells(player)

  console.log("verifyEnoughSpaceToPlaceShip painted cells: ", paintedCells)
}

const calculateAvailableCells = (
  player,
  ship,
  firstLetterIndex,
  cell,
  isThereEnoughSpaceToTheTop,
  isThereEnoughSpaceToTheBottom,
  isThereEnoughSpaceToTheRight,
  isThereEnoughSpaceToTheLeft
) => {
  const { letter: cellLetter, number: cellNumber } = cell
  const playerShip = findShipById(player, ship.id)
  let availableCells = [...player.availableCells]

  // checks if the ship is on horizontal or vertical position
  // 2 or more cells are needed as with only 1 cell there's no position yet
  if (shipHasMoreThanOneCell(playerShip)) {
    const shipPlacedHorizontally = isShipIsPlacedHorizontally(playerShip)
    const shipPlacedVertically = isShipIsPlacedVertically(playerShip)
    const firstCellIdInShip = playerShip.cells[0]
    const letter = cellIdToCellObject(firstCellIdInShip).letter

    if (shipPlacedHorizontally) {
      if (!isShipCompletelyPlaced(playerShip)) {
        availableCells = removeVerticalCells(availableCells, cell.number)
        const shipCellsLetter = getPaintedCellsLetters(player, playerShip.id)
        const letterIndexes = getLetterIndexes(shipCellsLetter)

        const firstHorizontalPaintedCellIndex = getFirstCellIdFromPaintedCells(
          letterIndexes
        )

        availableCells = []

        const nextCellToTheRight = getNextCellToTheRight(
          cell.number,
          letterIndexes
        )
        // only add the cell if this is not the last cell to the right
        if (
          !isTheLastCellToTheRight(letterIndexes) &&
          // only adds the cell if it's not already included
          !availableCells.includes(nextCellToTheRight)
        ) {
          availableCells.push(nextCellToTheRight)
        }

        // only add the cell if this is not the first cell to the left
        if (firstHorizontalPaintedCellIndex > 0) {
          availableCells.push(
            getNextCellToTheLeft(cellNumber, firstHorizontalPaintedCellIndex)
          )
        }
      } else {
        availableCells = []
      }
    } else if (shipPlacedVertically) {
      if (!isShipCompletelyPlaced(playerShip)) {
        availableCells = removeHorizontalCells(availableCells, cell)
        const firstCellToTheTop = getFirstCellToTheTop(player, playerShip.id)

        const lastCellToTheBottom = getLastCellToTheBottom(
          player,
          playerShip.id
        )

        const previousCellId = getPreviousVerticalCellId(
          letter,
          firstCellToTheTop
        )

        if (lastCellToTheBottom < 10) {
          const nextCellId = getNextVerticalCellId(letter, lastCellToTheBottom)
          availableCells = [previousCellId, nextCellId]
        } else if (!availableCells.includes(previousCellId)) {
          availableCells = [previousCellId]
        }
      } else {
        availableCells = []
      }
    }
  } else {
    const firstLetterIndex = getFirstLetterIndex(letters, cell.letter)
    const isTheLastCellToTheRight = isLastCellToTheRight(firstLetterIndex)
    const isTheFirstCellToTheLeft = isFirstCellToTheLeft(firstLetterIndex)

    if (!isTheLastCellToTheRight && isThereEnoughSpaceToTheRight) {
      if ((isValidCellLetter(letters[firstLetterIndex + 1]), cell.letter)) {
        // available to the right
        availableCells.push(
          addCellHorizontally(letters, firstLetterIndex, cell.number, "right")
        )
      }
    }

    const previousHorizontalCell = `${letters[firstLetterIndex - 1]}${
      cell.number
    }`

    if (
      isThereEnoughSpaceToTheLeft &&
      !isTheFirstCellToTheLeft &&
      !getPaintedCells(player).includes(previousHorizontalCell)
    ) {
      if ((isValidCellLetter(letters[firstLetterIndex - 1]), cell.letter)) {
        // available to the left
        availableCells.push(
          addCellHorizontally(letters, firstLetterIndex, cell.number, "left")
        )
      }
    }

    if (isValidCellNumber(cell.number - 1)) {
      // available to the top
      availableCells.push(
        addCellVertically(letters, firstLetterIndex, cell.number, "top")
      )
    }

    if (isValidCellNumber(cell.number + 1)) {
      // available to the bottom
      availableCells.push(
        addCellVertically(letters, firstLetterIndex, cell.number, "bottom")
      )
    }
  }

  return availableCells
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GENERATE_RANDOM_BOARD":
    case "PLACE_SHIP":
      const {
        playerId,
        ship,
        cell,
        cell: { id: cellId, letter: cellLetter, number: cellNumber }
      } = action.payload
      const player = state.players[playerId]
      // const cell = cellIdToCellObject(cellId)

      const isThereEnoughSpaceToTheBottom = isThereEnoughSpaceToPlaceShipVertically(
        player,
        ship.id,
        cellId,
        "bottom"
      )

      const isThereEnoughSpaceToTheTop = isThereEnoughSpaceToPlaceShipVertically(
        player,
        ship.id,
        cellId,
        "top"
      )

      const isThereEnoughSpaceToTheLeft = isThereEnoughSpaceToPlaceShipHorizontally(
        player,
        ship.id,
        cellId,
        "left"
      )

      const isThereEnoughSpaceToTheRight = isThereEnoughSpaceToPlaceShipHorizontally(
        player,
        ship.id,
        cellId,
        "right"
      )

      const noAvailableDirections =
        !isThereEnoughSpaceToTheTop &&
        !isThereEnoughSpaceToTheBottom &&
        !isThereEnoughSpaceToTheLeft &&
        !isThereEnoughSpaceToTheRight

      if (noAvailableDirections) return state

      console.log(
        "BOTTOM isThereEnoughSpaceToPlaceShip: ",
        isThereEnoughSpaceToTheBottom
      )

      console.log(
        "TOP isThereEnoughSpaceToPlaceShip: ",
        isThereEnoughSpaceToTheTop
      )

      console.log(
        "LEFT isThereEnoughSpaceToPlaceShip: ",
        isThereEnoughSpaceToTheLeft
      )

      console.log(
        "RIGHT isThereEnoughSpaceToPlaceShip: ",
        isThereEnoughSpaceToTheRight
      )

      const firstLetterIndex = letters.findIndex(
        letterItem => letterItem === cellLetter
      )

      const shipsArray = [...state.players[playerId].ships]
      const currentShipIndex = findShipIndexInArray(ship.id)
      const nextShipIndex = currentShipIndex + 1

      console.log("reduce player: ", player)

      const prueba = shipsArray.map(shipItem => {
        console.log("reduce ship: ", shipItem)
        if (ship.id === shipItem.id) {
          return { ...shipItem, cells: [...shipItem.cells, cellId] }
        }

        return shipItem
      })

      console.log("reduce prueba: ", prueba)

      const pp = updatedPlayerShipsNew(player.ships, ship.id, [cellId])

      console.log("pp: ", pp)

      shipsArray.push(cellId)

      const updatedPlayer = {
        ...state.players[playerId],
        ships: prueba //[...state.players[playerId].ships, findShipIndexInArray(ship.id)]
      }

      updatedPlayer.availableCells = calculateAvailableCells(
        updatedPlayer,
        ship,
        firstLetterIndex,
        cell,
        isThereEnoughSpaceToTheTop,
        isThereEnoughSpaceToTheBottom,
        isThereEnoughSpaceToTheRight,
        isThereEnoughSpaceToTheLeft
      )

      const updatedShip = findShipById(updatedPlayer, ship.id)

      console.log("updated updatedShip: ", updatedShip)
      console.log("updated Player: ", updatedPlayer)

      const pruebaShip =
        nextShipIndex < shipsToPlace.length + 1 &&
        updatedShip.cells.length === updatedShip.size
          ? shipsToPlace[nextShipIndex]
          : "state.currentShipToPlace"

      console.log("pruebaShip: ", pruebaShip)

      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: { ...state.players[playerId], ...updatedPlayer }
        },
        currentShipToPlace:
          nextShipIndex < shipsToPlace.length + 1 &&
          updatedShip.cells.length === updatedShip.size
            ? shipsToPlace[nextShipIndex]
            : state.currentShipToPlace
      }

    default:
      return state
  }
}

export default reducer
