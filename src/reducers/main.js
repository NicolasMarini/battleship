import shipIds from "../enums/shipIds"
import { letters, numbers, shipsToPlace } from "../utils/constants"
import {
  addCellHorizontally,
  addCellToShip,
  addCellVertically,
  findShipById,
  findShipIndexInArray,
  getFirstCellIdFromPaintedCells,
  getFirstCellToTheTop,
  getFirstLetterIndex,
  getLastCellToTheBottom,
  getLetterIndexes,
  getNextCellToTheLeft,
  getNextCellToTheRight,
  getPaintedCells,
  getPaintedCellsLetters,
  isFirstCellToTheLeft,
  isLastCellToTheRight,
  isShipCompletelyPlaced,
  isShipIsPlacedHorizontally,
  isShipIsPlacedVertically,
  isTheLastCellToTheRight,
  isThereEnoughSpaceToPlaceShipHorizontally,
  isThereEnoughSpaceToPlaceShipVertically,
  isValidCellLetter,
  isValidCellNumber,
  removeHorizontalCells,
  removeVerticalCells,
  shipHasMoreThanOneCell,
  shipWasHit,
  getAvailableCellsHorizontally,
  getAvailableCellsVertically
} from "../utils/helpers"

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
      { id: shipIds.carrier, size: 4, cells: [], status: null },
      { id: shipIds.cruiser1, size: 3, cells: [], status: null },
      { id: shipIds.cruiser2, size: 3, cells: [], status: null },
      { id: shipIds.cruiser3, size: 3, cells: [], status: null },
      { id: shipIds.submarine, size: 2, cells: [], status: null }
    ]
  },
  cpu: {
    id: "cpu",
    name: "cpu",
    availableCells: [],
    ships: [
      {
        id: shipIds.carrier,
        size: 4,
        cells: [
          {
            id: "a1",
            status: null
          },
          {
            id: "b1",
            status: null
          },
          {
            id: "c1",
            status: null
          },
          {
            id: "d1",
            status: null
          }
        ],
        status: null
      },
      {
        id: shipIds.cruiser1,
        size: 3,
        cells: [
          {
            id: "d3",
            status: null
          },
          {
            id: "d4",
            status: null
          },
          {
            id: "d5",
            status: null
          }
        ],
        status: null
      },
      {
        id: shipIds.cruiser2,
        size: 3,
        cells: [
          {
            id: "e10",
            status: null
          },
          {
            id: "f10",
            status: null
          },
          {
            id: "g10",
            status: null
          }
        ],
        status: null
      },
      {
        id: shipIds.cruiser3,
        size: 3,
        cells: [
          {
            id: "j3",
            status: null
          },
          {
            id: "j4",
            status: null
          },
          {
            id: "j5",
            status: null
          }
        ],
        status: null
      },
      {
        id: shipIds.submarine,
        size: 2,
        cells: [
          {
            id: "f3",
            status: null
          },
          {
            id: "g3",
            status: null
          }
        ],
        status: null
      }
    ]
  }
}

const initialState = {
  players: gamePlayers,
  // gameStarted: true,
  gameStarted: false,
  currentPlayerMoving: gamePlayers.player1.id,
  currentShipToPlace: gamePlayers["player1"]["ships"][[0]],
  boards: { boardPlayer1, boardCPU }
}

const updatedPlayerShips = (playerShips, shipId, cellId) => {
  const updatedShipsArray = []

  playerShips.forEach(ship => {
    console.log("ship item: ", ship)
    if (ship.id === shipId) {
      const updatedShip = {
        ...ship,
        cells: [...ship.cells, { id: cellId, status: null }]
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

  console.log("shipHasMoreThanOneCell: ", shipHasMoreThanOneCell(playerShip))
  // checks if the ship is on horizontal or vertical position
  // 2 or more cells are needed as with only 1 cell there's no position yet
  if (shipHasMoreThanOneCell(playerShip)) {
    const shipPlacedHorizontally = isShipIsPlacedHorizontally(playerShip)
    const shipPlacedVertically = isShipIsPlacedVertically(playerShip)

    if (shipPlacedHorizontally) {
      if (!isShipCompletelyPlaced(playerShip)) {
        availableCells = getAvailableCellsHorizontally(
          availableCells,
          cell,
          player,
          playerShip
        )
      } else {
        availableCells = []
      }
    } else if (shipPlacedVertically) {
      if (!isShipCompletelyPlaced(playerShip)) {
        availableCells = getAvailableCellsVertically(
          availableCells,
          cell,
          player,
          playerShip,
          firstLetterIndex
        )
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
      break
    case "MAKE_MOVE":
      const { cell: selectedCell, playerId: targetPlayerId } = action.payload
      const targetPlayer = state.players[targetPlayerId]

      console.log("make_move payload: ", action.payload)
      console.log("make_move targetPlayer: ", targetPlayer)
      console.log(
        "make_move was the ship hit: ",
        shipWasHit(targetPlayer, selectedCell)
      )

      shipWasHit(targetPlayer, selectedCell)

      return {
        ...state,
        currentPlayerMoving: gamePlayers.cpu.id
      }

    case "PLACE_SHIP":
      const {
        playerId,
        ship,
        cell,
        cell: { id: cellId, letter: cellLetter, number: cellNumber }
      } = action.payload
      const player = state.players[playerId]

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
        cellId,
        "left"
      )

      const isThereEnoughSpaceToTheRight = isThereEnoughSpaceToPlaceShipHorizontally(
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

      const playerShips = [...state.players[playerId].ships]
      const currentShipIndex = findShipIndexInArray(ship.id)
      const nextShipIndex = currentShipIndex + 1

      console.log("reduce player: ", player)

      const updatedPlayerShips = addCellToShip(playerShips, ship.id, cellId)

      playerShips.push(cellId)

      const updatedPlayer = {
        ...state.players[playerId],
        ships: updatedPlayerShips
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
