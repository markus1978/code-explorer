import {highlight, languages} from "prismjs/components/prism-core"
// Prims core import has to come first.

import {Button, Sheet, Stack, Typography} from "@mui/joy"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism.css"
import {useCallback, useEffect, useRef, useState} from "react"
import Editor from "react-simple-code-editor"
import {GameState, Level, Position} from "../types/level"

type LectureExerciseProps = {
  level: Level
}

function LectureExercise({level}: LectureExerciseProps) {
  const [code, setCode] = useState(level.initialCode)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [currentGameState, setCurrentGameState] = useState<GameState>({
    position: level.startPosition,
    color: "blue",
  })

  // Parse the grid once when the component mounts or level changes
  const {grid, startPosition, goalPosition} = level

  const GRID_SIZE = grid.length
  const CELL_SIZE = 40
  const MOVE_DELAY = 200 // ms

  const draw = useCallback(
    (context: CanvasRenderingContext2D, gameState: GameState) => {
      context.fillStyle = "#eee"
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)

      // Draw grid and obstacles
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          context.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          if (grid[y][x] === "wall") {
            context.fillStyle = "#555"
            context.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
          }
        }
      }

      // Draw goal
      context.fillStyle = "green"
      context.beginPath()
      context.arc(
        goalPosition.x * CELL_SIZE + CELL_SIZE / 2,
        goalPosition.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 3,
        0,
        2 * Math.PI,
      )
      context.fill()

      // Draw character
      context.fillStyle = gameState.color
      context.fillRect(
        gameState.position.x * CELL_SIZE,
        gameState.position.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
      )
    },
    [goalPosition, grid, GRID_SIZE],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    draw(context, currentGameState)
  }, [currentGameState, draw])

  const handleRunCode = async () => {
    setError(null)
    let currentLogicalPos = {...startPosition}
    const gameStates: GameState[] = [
      {position: {...startPosition}, color: "blue"},
    ]

    const canMove = (dx: number, dy: number): boolean => {
      const newX = currentLogicalPos.x + dx
      const newY = currentLogicalPos.y + dy

      return (
        newX >= 0 &&
        newX < GRID_SIZE &&
        newY >= 0 &&
        newY < GRID_SIZE &&
        grid[newY][newX] !== "wall"
      )
    }

    const move = (dx: number, dy: number) => {
      if (canMove(dx, dy)) {
        currentLogicalPos = {
          x: currentLogicalPos.x + dx,
          y: currentLogicalPos.y + dy,
        }
        gameStates.push({position: {...currentLogicalPos}, color: "blue"})
      } else {
        gameStates.push({position: {...currentLogicalPos}, color: "red"})
      }
    }

    const look = (dx: number, dy: number): boolean => {
      const newX = currentLogicalPos.x + dx
      const newY = currentLogicalPos.y + dy

      return (
        newX >= 0 &&
        newX < GRID_SIZE &&
        newY >= 0 &&
        newY < GRID_SIZE &&
        grid[newY][newX] !== "wall" &&
        grid[newY][newX] !== "obstacle"
      )
    }

    const availableFunctionsMap: {[key: string]: () => void | boolean} = {
      moveUp: () => move(0, -1),
      moveDown: () => move(0, 1),
      moveRight: () => move(1, 0),
      moveLeft: () => move(-1, 0),
      lookUp: () => look(0, -1),
      lookDown: () => look(0, 1),
      lookRight: () => look(1, 0),
      lookLeft: () => look(-1, 0),
    }

    const context: {[key: string]: () => void | boolean} = {}
    level.availableFunctions.forEach((funcName) => {
      if (availableFunctionsMap[funcName]) {
        context[funcName] = availableFunctionsMap[funcName]
      }
    })

    try {
      // eslint-disable-next-line no-new-func
      const userFunction = new Function(...Object.keys(context), code)
      userFunction(...Object.values(context))

      // Animate the recorded path
      for (let i = 0; i < gameStates.length; i++) {
        await new Promise<void>((resolve) => {
          setTimeout(() => {
            setCurrentGameState(gameStates[i])
            resolve()
          }, MOVE_DELAY) // Corrected: fixed delay
        })
      }
    } catch (e: any) {
      setError(e.message)
      console.error("Error executing code:", e)
    }
  }

  const handleReset = () => {
    setError(null)
    setCurrentGameState({position: {...startPosition}, color: "blue"})
    setCode(level.initialCode)
  }

  return (
    <Stack direction="row" spacing={4}>
      <Editor
        value={code}
        onValueChange={(code) => setCode(code)}
        highlight={(code) => highlight(code, languages.js, "javascript")}
        padding={10}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "4px",
          width: "100%",
        }}
      />
      <Stack spacing={1}>
        <Sheet sx={{height: "100%"}}>
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            style={{border: "1px solid #ddd"}}
          />
        </Sheet>
        <Stack direction="row" spacing={1}>
          <Button onClick={handleRunCode} sx={{mt: 1}}>
            Code ausführen
          </Button>
          <Button onClick={handleReset} sx={{mt: 1, ml: 1}}>
            Zurücksetzen
          </Button>
        </Stack>
        {error && (
          <Typography color="danger" sx={{mt: 1}}>
            {error}
          </Typography>
        )}
      </Stack>
    </Stack>
  )
}

export default LectureExercise
