export type Position = {x: number; y: number}
export type GridCellType = "empty" | "wall" | "obstacle" | "start" | "goal"

export type GameState = {
  position: Position
  color: string
  // Add more state properties here as needed (e.g., direction, inventory)
}

export type Level = {
  grid: GridCellType[][]
  startPosition: Position
  goalPosition: Position
  availableFunctions: string[]
  initialCode: string
}
