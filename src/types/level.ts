export type Position = {x: number; y: number}
export type GridCellType = "empty" | "wall" | "obstacle" | "start" | "goal"

export type GameState = {
  position: Position
  color: string
  // Add more state properties here as needed (e.g., direction, inventory)
}

export type Character = {
  move: (x: number, y: number) => void
  look: (x: number, y: number) => boolean
}

export type Level = {
  grid: GridCellType[][]
  startPosition: Position
  goalPosition: Position
  availableFunctions: (character: Character) => {[key: string]: () => void}
  initialCode: string
}
