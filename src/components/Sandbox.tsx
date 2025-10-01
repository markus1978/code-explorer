import {Button, Sheet, Stack, Typography} from "@mui/joy"
import {useCallback, useEffect, useRef, useState} from "react"

const GRID_SIZE = 10
const CELL_SIZE = 40
const MOVE_DELAY = 200

type SandboxProps = {
  code: string
}

function Sandbox({code}: SandboxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [characterPos, setCharacterPos] = useState({x: 0, y: 0})
  const [error, setError] = useState<string | null>(null)
  const goalPos = {x: 3, y: 2}

  const draw = useCallback(
    (context: CanvasRenderingContext2D, charPos: {x: number; y: number}) => {
      context.fillStyle = "#eee"
      context.fillRect(0, 0, context.canvas.width, context.canvas.height)

      // Draw grid
      for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
          context.strokeRect(i * CELL_SIZE, j * CELL_SIZE, CELL_SIZE, CELL_SIZE)
        }
      }

      // Draw goal
      context.fillStyle = "green"
      context.beginPath()
      context.arc(
        goalPos.x * CELL_SIZE + CELL_SIZE / 2,
        goalPos.y * CELL_SIZE + CELL_SIZE / 2,
        CELL_SIZE / 3,
        0,
        2 * Math.PI,
      )
      context.fill()

      // Draw character
      context.fillStyle = "blue"
      context.fillRect(
        charPos.x * CELL_SIZE,
        charPos.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
      )
    },
    [goalPos.x, goalPos.y],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext("2d")
    if (!context) return
    draw(context, characterPos)
  }, [characterPos, draw])

  const handleRunCode = async () => {
    setError(null)
    let currentPos = {x: 0, y: 0}
    setCharacterPos(currentPos)
    const moveQueue: (() => Promise<void>)[] = []

    const move = (dx: number, dy: number) => {
      console.log(`Moving by (${dx}, ${dy})`)
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          const newX = currentPos.x + dx
          const newY = currentPos.y + dy

          if (newX >= 0 && newX < GRID_SIZE && newY >= 0 && newY < GRID_SIZE) {
            currentPos = {x: newX, y: newY}
            setCharacterPos(currentPos)
          }
          resolve()
        }, MOVE_DELAY)
      })
    }

    const moveUp = () => moveQueue.push(() => move(0, -1))
    const moveDown = () => moveQueue.push(() => move(0, 1))
    const moveRight = () => moveQueue.push(() => move(1, 0))
    const moveLeft = () => moveQueue.push(() => move(-1, 0))

    // Expose functions to the evaluated code
    const context = {moveRight, moveLeft, moveUp, moveDown}
    try {
      // eslint-disable-next-line no-new-func
      const userFunction = new Function(...Object.keys(context), code)
      userFunction(...Object.values(context))

      for (const moveFunc of moveQueue) {
        await moveFunc()
      }
    } catch (e: any) {
      setError(e.message)
      console.error("Error executing code:", e)
    }
  }

  const handleReset = () => {
    setError(null)
    setCharacterPos({x: 0, y: 0})
  }

  return (
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
  )
}

export default Sandbox
