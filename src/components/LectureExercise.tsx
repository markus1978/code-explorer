import {highlight, languages} from "prismjs/components/prism-core"
// Prims core import has to come first.

import {Button, Sheet, Stack, Typography} from "@mui/joy"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism.css"
import {useCallback, useEffect, useRef, useState} from "react"
import Editor from "react-simple-code-editor"
import {GameState, Level} from "../types/level"

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
  const {grid, startPosition} = level

  const gridHeight = grid.length
  const gridWidth = grid[0].length
  const cellSize = 40
  const moveDelay = 200 // ms

  const draw = useCallback(
    (context: CanvasRenderingContext2D, gameState: GameState) => {
      context.fillStyle = "#eee"
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)

      // Draw grid and obstacles
      for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
          context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize)
          if (grid[y][x] === "wall") {
            context.fillStyle = "#555"
            context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
          } else if (grid[y][x] === "goal") {
            context.fillStyle = "green"
            context.beginPath()
            context.arc(
              x * cellSize + cellSize / 2,
              y * cellSize + cellSize / 2,
              cellSize / 3,
              0,
              2 * Math.PI,
            )
            context.fill()
          }
        }
      }

      // Draw character
      context.fillStyle = gameState.color
      context.fillRect(
        gameState.position.x * cellSize,
        gameState.position.y * cellSize,
        cellSize,
        cellSize,
      )
    },
    [grid],
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
    let callCount = 0
    let currentLogicalPos = {...startPosition}
    const gameStates: GameState[] = [
      {position: {...startPosition}, color: "blue"},
    ]

    const canMove = (x: number, y: number): boolean => {
      const newX = currentLogicalPos.x + Math.sign(x)
      const newY = currentLogicalPos.y + Math.sign(y)

      return (
        newX >= 0 &&
        newX < gridWidth &&
        newY >= 0 &&
        newY < gridHeight &&
        grid[newY][newX] !== "wall"
      )
    }

    const move = (x: number, y: number) => {
      if (callCount++ > 100) {
        throw new Error("Zu viele Funktionsaufrufe!")
      }
      if (canMove(x, y)) {
        currentLogicalPos = {
          x: currentLogicalPos.x + Math.sign(x),
          y: currentLogicalPos.y + Math.sign(y),
        }
        gameStates.push({position: {...currentLogicalPos}, color: "blue"})
      } else {
        gameStates.push({position: {...currentLogicalPos}, color: "red"})
      }
    }

    const look = (x: number, y: number) => {
      if (callCount++ > 500) {
        throw new Error("Zu viele Funktionsaufrufe!")
      }
      const newX = currentLogicalPos.x + Math.sign(x)
      const newY = currentLogicalPos.y + Math.sign(y)

      return (
        newX >= 0 &&
        newX < gridWidth &&
        newY >= 0 &&
        newY < gridHeight &&
        grid[newY][newX] !== "wall" &&
        grid[newY][newX] !== "obstacle"
      )
    }

    const context = level.availableFunctions({move, look})

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
          }, moveDelay)
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
  }

  return (
    <Stack spacing={2} sx={{width: "100%"}}>
      <Stack direction="row" spacing={4}>
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js, "javascript")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
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
              width={gridWidth * cellSize}
              height={gridHeight * cellSize}
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
        </Stack>
      </Stack>
      {error && (
        <Typography color="danger" sx={{mt: 1}}>
          Du hast leider einen Fehler in deinem Code:
          <br />
          <i>{error}</i>
        </Typography>
      )}
    </Stack>
  )
}

export default LectureExercise
