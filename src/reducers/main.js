import shipTypes from "../enums/shipTypes"
import shipIds from "../enums/shipIds"

const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const letters = ["a", "b", "c"]
// const numbers = [1, 2, 3]

const generateRow = (letter, numbers) => {
  let row = { [letter]: {} }

  for (let i = 1; i <= numbers.length; i++) {
    const cellObj = { id: null, shipType: null, status: null }

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

const initialState = {
  currentShipToPlace: shipIds.carrier,
  boards: { boardPlayer1, boardCPU }
}

const reducer = (state = initialState, action) => {
  console.log("action: ", action)
  switch (action.type) {
    case "SELECT_SHIP":
      console.log("SELECT_SHIP payload: ", action.payload)
      return {
        ...state,
        selectedShip: action.payload
      }

    case "PLACE_SHIP":
      console.log("PLACE_SHIP: ", action)
      if (action.payload.shipType === "carrier") {
        let cells = [...state.carrier.cells]
        cells = ["a10", "b10", "c10", "d10"]
        return {
          ...state,
          carrier: { cells }
        }
      }

    default:
      return state
  }
}

export default reducer
