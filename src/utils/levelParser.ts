import {GridCellType, Position} from "../types/level"

const charMap: {[key: string]: GridCellType} = {
  ".": "empty",
  "#": "wall",
  S: "start",
  G: "goal",
}

export function parseGrid(shorthandGrid: string[]): {
  grid: GridCellType[][]
  startPosition: Position
} {
  let startPosition: Position | null = null
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
      return cellType
    }),
  )

  if (!startPosition) {
    throw new Error("Start position not found in grid.")
  }

  return {grid, startPosition}
}
