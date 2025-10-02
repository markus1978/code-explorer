export type Position = {x: number; y: number}
export type GridCellType = "empty" | "wall" | "obstacle" | "start" | "goal"

export type Level = {
  grid: GridCellType[][]
  startPosition: Position
  goalPosition: Position
  availableFunctions: string[]
  initialCode: string
}
