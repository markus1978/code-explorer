import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {GridCellType, Level} from "../types/level"
import {parseGrid} from "../utils/levelParser"
import {stripIndent} from "../utils/string"

const charMap: {[key: string]: GridCellType} = {
  ".": "empty",
  "#": "wall",
  S: "start",
  G: "goal",
}

const functionCallLevel: Level = {
  ...parseGrid(
    [
      "S.........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      ".........G",
    ],
    charMap,
  ),
  availableFunctions: ["moveRight", "moveDown", "moveUp", "moveLeft"],
  initialCode: stripIndent`
    moveRight()
    moveDown()
  `,
}

function FunctionCallLecture() {
  return (
    <Lecture>
      <LectureTitle>Lektion 1: Funktionen rufen</LectureTitle>
      <LectureText>
        Willkommen zu deinem ersten Programmierabenteuer! Dein Ziel ist es, die
        Figur zur Ziellinie zu bewegen. Benutze die Befehle `moveRight()` und
        `moveDown()`, um die Figur zu bewegen.
      </LectureText>
      <LectureExercise level={functionCallLevel} />
    </Lecture>
  )
}

export default FunctionCallLecture
