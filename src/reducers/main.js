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

export const getPaintedCells = board => {
  const boardLetters = getBoardKeys(board)
  const paintedCells = []

  boardLetters.forEach(letter => {
    // console.log("function prueba letter: ", letter)
    for (let i = 1; i <= 10; i++) {
      const cell = board[letter][i]
      if (cell.shipType !== null) {
        paintedCells.push(cell.id)
      }
    }
  })
  console.log("paintedCells:: ", paintedCells)
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
    number: cellIdAsArray[1]
  })
  return { letter: cellIdAsArray[0], number: cellIdAsArray[1] }
}

const reducer = (state = initialState, action) => {
  // console.log("action: ", action)
  switch (action.type) {
    case "PLACE_SHIP":
      /*
      const { shipId, letter, number } = action.payload

      // console.log("payload: ", action.payload)

      const boardPlayer1 = state.boards.boardPlayer1

      let cells = { ...boardPlayer1[letter][number] }
      cells = { id: `${letter}${number}`, shipType: shipId, status: "PLACED" }

      const currentShipIndex = findShipIndexInArray(shipId.id)

      const numberOfAppearences = countAppearancesOfAShipOnTheBoard(
        state.boards.boardPlayer1,
        shipId
      )

      const currentSelectedShip = shipsToPlace.find(
        ship => ship.id === shipId.id
      )
      console.log("currentSelectedShip: ", currentSelectedShip)

      const isShipCompletelyPlaced =
        numberOfAppearences === currentSelectedShip.size

      console.log("currentShip size: ", currentSelectedShip.size)
      // console.log("currentShipIndex: ", currentShipIndex)
      console.log("numberOfAppearences: ", numberOfAppearences)
      // console.log("shipsToPlace values: ", Object.values(shipsToPlace))
      // console.log("shipsToPlace:: ", shipsToPlace)

      console.log("isShipCompletelyPlaced: ", isShipCompletelyPlaced)

      if (isShipCompletelyPlaced) console.log("completo...")
      const nextShipIndex = currentShipIndex + 1
      // console.log("nextShipIndex: ", nextShipIndex)
      console.log("next ship to place: ", shipsToPlace[nextShipIndex])

      // console.log("action letter:: ", letter)
      // console.log("action number:: ", number)

      const boardPlayer1Letters = Object.keys(state.boards.boardPlayer1)

      const firstLetterIndex = boardPlayer1Letters.findIndex(
        letterItem => letterItem === letter
      )

      // console.log("firstLetterIndex:: ", firstLetterIndex)
      // console.log("boardPlayer1 keys:: ", boardPlayer1Letters)

      const placeShipInCells = (firstLetterIndex, board) => {
        const shipSize = shipsToPlace[currentShipIndex].size
        const firstLetter = letters[firstLetterIndex]
        // console.log("next letter:: ")

        let obj = {}
        for (let i = 0; i < shipSize; i++) {
          obj = {
            ...obj,
            ...{
              [i === 0 ? firstLetter : letters[firstLetterIndex + i]]: {
                ...state.boards.boardPlayer1[letter],
                [number]: {
                  id: `${
                    i === 0 ? firstLetter : letters[firstLetterIndex + i]
                  }${number}`,
                  shipType: shipId,
                  status: "PLACED"
                }
              }
            }
          }

          // console.log("partial obj: ", obj)
        }

        return obj
      }

      console.log("state.currentShipToPlace: ", state.currentShipToPlace)
      console.log(
        "new current ship: ",
        isShipCompletelyPlaced || state.currentShipToPlace.id === "carrier"
          ? shipsToPlace[nextShipIndex]
          : state.currentShipToPlace
      )

      return {
        ...state,
        boards: {
          ...state.boards,
          boardPlayer1: {
            ...state.boards.boardPlayer1,
            ...placeShipInCells(firstLetterIndex, boardPlayer1)
            // ...{
            //   [letter]: {
            //     ...state.boards.boardPlayer1[letter],
            //     [number]: { id: null, shipType: shipId, status: "PLACED" }
            //   },
            //   [boardPlayer1Letters[firstLetterIndex + 1]]: {
            //     ...state.boards.boardPlayer1[letter],
            //     [number]: { id: null, shipType: shipId, status: "PLACED" }
            //   }
          }
        },
        currentShipToPlace:
          isShipCompletelyPlaced || state.currentShipToPlace.id === "carrier"
            ? shipsToPlace[nextShipIndex]
            : state.currentShipToPlace
      }*/
      const { playerId, shipId, cellId } = action.payload
      const player = state.players[playerId]
      const cell = splitCellId(cellId)

      console.log("NEW PAYLOAD: ", action.payload)
      console.log("NEW PLAYER: ", { ...player })
      // const cellId = `${letter}${number}`

      const updatedPlayerBoard = {
        ...player,
        ships: [...player.ships, cellId]
      }

      const updatedShip = player.ships.find(ship => ship.id === shipId.id)
      console.log("NEW ship: ", updatedShip)
      // updatedShip.cells = [...updatedShip.cells, cellId]

      console.log("NEW updatedPlayerBoard: ", updatedPlayerBoard)

      const firstLetterIndex = letters.findIndex(
        letterItem => letterItem === cell.letter
      )

      const fillShipCells = (shipToFill, cellNumber) => {
        const updatedShip = { ...shipToFill }

        for (let i = 0; i < updatedShip.size; i++) {
          updatedShip.cells = [
            ...updatedShip.cells,
            `${letters[firstLetterIndex + i]}${cellNumber}`
          ]
        }

        return updatedShip
      }

      const updatedShipNew = fillShipCells(updatedShip, cell.number)

      console.log("NEW SHIP UPDATED: ", updatedShipNew)

      const isShipPlaced = isShipCompletelyPlaced(player.ships, shipId.id)
      console.log("NEW isShipPlaced: ", isShipPlaced)

    default:
      return state
  }
}

export default reducer
