const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// const letters = ["a", "b", "c"]
// const numbers = [1, 2, 3]

const generateRow = (letter, numbers) => {
  let row = { [letter]: {} }
  for (let i = 1; i <= numbers.length; i++) {
    let letterRow = { [letter]: { ...row.letter, [i]: null } }
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

const initialState = { boards: { boardPlayer1, boardCPU } }

const reducer = (state = initialState, action) => {
  console.log("action: ", action)
  switch (action.type) {
    case "PAINT_CELL":
      console.log("painting cell")
      const newState = {
        ...state
      }
      return newState
    default:
      return state
  }
}

export default reducer
