import {GridCellType, Position} from "../types/level"

export function parseGrid(
  shorthandGrid: string[],
  charMap: {[key: string]: GridCellType},
): {grid: GridCellType[][]; startPosition: Position; goalPosition: Position} {
  let startPosition: Position | null = null
  let goalPosition: Position | null = null
  const grid: GridCellType[][] = shorthandGrid.map((rowString, y) =>
    rowString.split("").map((char, x) => {
      const cellType = charMap[char]
      if (!cellType) {
        console.warn(
          `Unknown character '${char}' in grid shorthand. Defaulting to 'empty'.`,
        )
        return "empty"
      }
      if (cellType === "start") {
        startPosition = {x, y}
        return "empty"
      }
      if (cellType === "goal") {
        goalPosition = {x, y}
        return "empty"
      }
      return cellType
    }),
  )

  if (!startPosition) {
    throw new Error("Start position not found in grid.")
  }
  if (!goalPosition) {
    throw new Error("Goal position not found in grid.")
  }

  return {grid, startPosition, goalPosition}
}
