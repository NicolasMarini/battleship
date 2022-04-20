export const paintCell = color => {
  return {
    type: "PAINT_CELL",
    payload: color
  }
}
