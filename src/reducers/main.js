import shipTypes from "../enums/shipTypes"
import shipIds from "../enums/shipIds"

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const letters = ["a", "b", "c", "d"]
// const numbers = [1, 2, 3, 4]

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

const shipsToPlace = [
  { id: shipIds.carrier, size: 4 },
  { id: shipIds.cruiser1, size: 3 },
  { id: shipIds.cruiser2, size: 3 },
  { id: shipIds.cruiser3, size: 3 },
  { id: shipIds.submarine, size: 2 }
]

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
  Cpu: {
    id: "CPU",
    name: "CPU",
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

export const getBoardKeys = board => {
  return Object.keys(board)
}

export const getBoardEntries = board => {
  return Object.entries(board)
}

export const getPaintedCells = player => {
  // const boardLetters = getBoardKeys(board)

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
  // const boardLetters = getBoardKeys(board)

  const { ships } = player
  let paintedCells = []
  ships.forEach(ship => {
    if (ship.id === shipId && ship.cells.length > 0) {
      paintedCells = [...paintedCells, ...ship.cells]
    }
  })

  return paintedCells
}

/*
const countAppearancesOfAShipOnTheBoard = (board, shipId) => {
  const boardLetters = getBoardKeys(board)
  let counter = 0
  // console.log("function prueba board: ", JSON.stringify(board))
  // console.log("function prueba boardLetters: ", boardLetters)

  boardLetters.forEach(letter => {
    // console.log("function prueba letter: ", letter)
    for (let i = 1; i <= 10; i++) {
      const cell = board[letter][i]
      // console.log("function prueba board cell: ", cell)
      if (cell.shipType === shipId) {
        counter += 1
      }
    }
  })

  return counter
}*/

const isShipCompletelyPlaced = (ships, shipId) => {
  const shipToCountAppearances = ships.find(ship => ship.id === shipId)
  const boardLetters = getBoardKeys(ships)
  if (shipToCountAppearances.cells.length === shipToCountAppearances.size) {
    return true
  }

  return false
  /*
    let counter = 0
  // console.log("function prueba board: ", JSON.stringify(board))
  // console.log("function prueba boardLetters: ", boardLetters)

  boardLetters.forEach(letter => {
    // console.log("function prueba letter: ", letter)
    for (let i = 1; i <= 10; i++) {
      const cell = ships[letter][i]
      // console.log("function prueba board cell: ", cell)
      if (cell.shipType === shipId) {
        counter += 1
      }
    }
  })

  return counter
  */
}

// returns in how many cells a ship id appears to determine if the ship was completely placed on the board
/*
export const countAppearancesOfAShipOnTheBoard = (board, shipId) => {
  // console.log("findCellsByShipId shipId:: ", shipId)

  // iterates over all the letters in the board
  let counter = 0
  Object.entries(board).forEach(item => {
    // gets all the cells for each letter in the board
    const letter = item[0]
    // object containing an object for each cell from 1 to 10 for that letter
    const cellsObject = item[1]

    // console.log("prueba entries:: ", Object.entries(board))
    // console.log("prueba keys:: ", Object.keys(board))

    // console.log("findCellsByShipId letter:: ", letter)
    // console.log("findCellsByShipId cellsObject:: ", cellsObject)

    // iterates each cell from 1 to 10 for each letter
    Object.entries(cellsObject).forEach(cellObj => {
      // gets the cell
      const cell = cellObj[1]
      if (cell.shipType === shipId) {
        counter += 1
      }
      // console.log("findCellsByShipId cell:: ", cell)
    })
  })

  // console.log("findCellsByShipId counter:: ", counter)

  return counter

  // // console.log("findCellsByShipId board:: ", board)
  // board.filter(ship => // console.log("findCellsByShipId ship:: ", ship))
}
*/

const findShipIndexInArray = currentShipId =>
  shipsToPlace.findIndex(ship => ship.id === currentShipId)

const splitCellId = cellId => {
  const cellIdAsArray = [...cellId]

  console.log("cell obj: ", {
    letter: cellIdAsArray[0],
    number: cellId.substr(1, cellId.length - 1)
  })
  return {
    letter: cellIdAsArray[0],
    number: Number(cellId.substr(1, cellId.length - 1))
  }
}

export const findShipById = (player, shipId) =>
  player.ships.find(shipItem => shipItem.id === shipId)

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

  // CHEQUEAR QUE HAYA LUGAR PARA PONER EL BARCO Y QUE LAS CELDAS ESTEN LIBRES

  console.log("verifyEnoughSpaceToPlaceShip painted cells: ", paintedCells)
}

const removeHorizontalCells = (availableCells, cellId, cell) =>
  availableCells.filter(
    cellId =>
      // splitCellId(cellId).number !== cell.number ||
      splitCellId(cellId).letter === cell.letter
  )

const calculateAvailableCells = (player, ship, firstLetterIndex, cellId) => {
  const cell = splitCellId(cellId)
  let availableCells = [...player.availableCells]
  const playerShip = findShipById(player, ship.id)

  console.log("ship::::", playerShip)

  // checks if the ship is on horizontal or vertical position
  // 2 or more cells are needed as with only 1 cell there no position yet
  if (playerShip.cells.length > 1) {
    const isShipIsPlacedHorizontally =
      splitCellId(playerShip.cells[0]).number ===
      splitCellId(playerShip.cells[1]).number

    const isShipIsPlacedVertically =
      splitCellId(playerShip.cells[0]).letter ===
      splitCellId(playerShip.cells[1]).letter

    console.log("esta en la misma fila: ", isShipIsPlacedHorizontally)
    console.log("esta en la misma columna: ", isShipIsPlacedVertically)

    if (isShipIsPlacedHorizontally) {
      for (let i = 1; i < ship.size; i++) {
        availableCells.push(`${letters[firstLetterIndex + i]}${cell.number}`) // available to the right
      }

      for (let i = 1; i < ship.size; i++) {
        availableCells.push(`${letters[firstLetterIndex - i]}${cell.number}`) // available to the left
      }
    } else if (isShipIsPlacedVertically) {
      if (playerShip.cells.length < playerShip.size) {
        availableCells = removeHorizontalCells(availableCells, cellId, cell)
        const firstCellIdInShip = playerShip.cells[0]
        const letter = splitCellId(firstCellIdInShip).letter
        const lastCellIdInShip = playerShip.cells[playerShip.cells.length - 1]

        availableCells = availableCells.filter(
          cellId =>
            splitCellId(cellId).number ===
              splitCellId(firstCellIdInShip).number - 1 ||
            splitCellId(cellId).number ===
              splitCellId(lastCellIdInShip).number + 1
        )

        const nextCell = availableCells.find(
          cellId =>
            cellId ===
            `${splitCellId(lastCellIdInShip).letter}${
              splitCellId(lastCellIdInShip).number + 1
            }`
        )

        if (!nextCell) {
          availableCells = [
            ...availableCells,
            `${splitCellId(lastCellIdInShip).letter}${
              splitCellId(lastCellIdInShip).number + 1
            }`
          ]
        }

        // const pp = availableCells.map(cellId => splitCellId(cellId).number)
        const paintedCells = getPaintedCellsByShip(player, playerShip.id)
        const paintedCellsNumbers = paintedCells.map(
          cellId => splitCellId(cellId).number
        )
        const minimumCellIdInPaintedCells = Math.min(...paintedCellsNumbers)
        const maximumCellIdInPaintedCells = Math.max(...paintedCellsNumbers)

        const pp = paintedCells.map(cellId => splitCellId(cellId).number)

        const previousCellIdFromPaintedCells = `${letter}${
          minimumCellIdInPaintedCells - 1
        }`

        const nextCellIdFromPaintedCells = `${letter}${
          maximumCellIdInPaintedCells + 1
        }`

        availableCells = [
          ...availableCells,
          previousCellIdFromPaintedCells,
          nextCellIdFromPaintedCells
        ]

        console.log(
          "vertical previousCellIdFromPaintedCells: ",
          previousCellIdFromPaintedCells
        )

        console.log(
          "vertical nextCellIdFromPaintedCells: ",
          nextCellIdFromPaintedCells
        )

        console.log("vertical numbers: ", pp)

        console.log(
          "vertical minimumCellIdInPaintedCells: ",
          minimumCellIdInPaintedCells
        )
        console.log(
          "vertical maximumCellIdInPaintedCells: ",
          maximumCellIdInPaintedCells
        )
        console.log("vertical numbers: ", pp)
        console.log("vertical min number: ", Math.min(...pp))
        console.log("vertical max number: ", Math.max(...pp))
        console.log("vertical nextCell: ", nextCell)
        console.log("vertical first cell id: ", firstCellIdInShip)
        console.log("vertical last cell id: ", lastCellIdInShip)
        console.log("vertical painted cells: ", getPaintedCells(player))
        console.log("vertical cells: ", availableCells)
      } else {
        availableCells = []
      }
    }
  } else {
    for (let i = 1; i < ship.size; i++) {
      availableCells.push(`${letters[firstLetterIndex + i]}${cell.number}`) // available to the right
    }

    for (let i = 1; i < ship.size; i++) {
      availableCells.push(`${letters[firstLetterIndex - i]}${cell.number}`) // available to the left
    }

    for (let i = 1; i < ship.size; i++) {
      availableCells.push(`${letters[firstLetterIndex]}${cell.number - i}`) // available to the top
    }

    for (let i = 1; i < ship.size; i++) {
      availableCells.push(`${letters[firstLetterIndex]}${cell.number + i}`) // available to the bottom
    }
  }

  console.log("available cells: ", availableCells)
  return availableCells
}

const reducer = (state = initialState, action) => {
  // console.log("action: ", action)
  switch (action.type) {
    case "PLACE_SHIP":
      const { playerId, ship, cellId } = action.payload
      const player = state.players[playerId]
      const cell = splitCellId(cellId)

      const firstLetterIndex = letters.findIndex(
        letterItem => letterItem === cell.letter
      )

      const shipsArray = [...state.players[playerId].ships]
      const currentShipIndex = findShipIndexInArray(ship.id)
      const nextShipIndex = currentShipIndex + 1

      console.log("reduce player: ", player)
      let newArray = []
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
        cellId
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

      calculateAvailableCells()
    /*
      // verifyEnoughSpaceToPlaceShip(player)

      console.log("NEW PAYLOAD: ", action.payload)
      console.log("NEW PLAYER: ", { ...player })
      // const cellId = `${letter}${number}`

      const updatedPlayerBoard = {
        ...player,
        ships: [...player.ships, cellId]
      }

      const updatedShip = findShipById(player, ship.id)
      console.log("NEW ship: ", updatedShip)

      console.log("NEW updatedPlayerBoard: ", updatedPlayerBoard)

      const firstLetterIndex = letters.findIndex(
        letterItem => letterItem === cell.letter
      )

      if (!areCellsValid(ship, firstLetterIndex)) return state

      const updatedShipNew = fillShipCells(
        updatedShip,
        cell.number,
        firstLetterIndex
      )

      console.log("NEW SHIP UPDATED: ", updatedShipNew)

      const playerShips = player.ships
      const isShipPlaced = isShipCompletelyPlaced(playerShips, ship.id)
      const currentShipIndex = findShipIndexInArray(ship.id)
      const nextShipIndex = currentShipIndex + 1
      const isInitialShip = state.currentShipToPlace.id === "carrier"

      console.log(
        "UPDATED RES: ",
        updatedPlayerShips(playerShips, ship.id, updatedShipNew)
      )
      const updatedPlayer = {
        ...state.players[playerId],
        ships: updatedPlayerShips(playerShips, ship.id, updatedShipNew)
      }

      console.log("UPDATED currentShipToPlace: ", state.currentShipToPlace)
      console.log("UPDATED SHIP: ", updatedShipNew)
      console.log("UPDATED PLAYER: ", updatedPlayer)
      console.log("UPDATED nextShipIndex: ", nextShipIndex)

      return {
        ...state,
        players: {
          ...state.players,
          [playerId]: { ...state.players[playerId], ...updatedPlayer }
        },
        currentShipToPlace:
          nextShipIndex < shipsToPlace.length + 1
            ? shipsToPlace[nextShipIndex]
            : null
      }*/

    default:
      return state
  }
}

export default reducer
