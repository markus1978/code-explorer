import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureFunction from "../components/LectureFunction"
import LectureFunctions from "../components/LectureFunctions"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {Character, GridCellType, Level} from "../types/level"
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
      "...G......",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
      "..........",
    ],
    charMap,
  ),
  availableFunctions: (character: Character) => ({
    moveDown: () => character.move(0, 1),
    moveRight: () => character.move(1, 0),
  }),
  initialCode: stripIndent`
    moveRight()
    moveDown()
  `,
}

function FunctionCallLecture() {
  return (
    <Lecture>
      <LectureTitle>Lektion 1: Funktionen rufen</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Willkommen zu deinem ersten Programmierabenteuer! In dieser Lektion
          lernen wir was **Funktionen** sind und wie wir sie **rufen** können.

          Funktionen sind wie kleine Maschinen, die eine bestimmte Aufgabe
          erledigen. Wenn du \`moveRight()\` schreibst, sagst du dem Computer, dass
          er die Figur nach rechts bewegen soll. Genauso funktioniert
          \`moveDown()\`.

          Ein in Funktionsruf besteht aus dem Funktionsnamen gefolgt
          von Klammern. Die Klammern zeigen an, dass du die Funktion ausführst.

          Die folgenden Funktionen stehen dir in diesem Level zur Verfügung:
        `}
      />
      <LectureFunctions>
        <LectureFunction
          signature="moveDown()"
          explanation={stripIndent`
            Bewegt die Figur ein Feld nach unten.
          `}
        />
        <LectureFunction
          signature="moveRight()"
          explanation={stripIndent`
            Bewegt die Figur ein Feld nach rechts.
          `}
        />
      </LectureFunctions>
      <LectureText
        markdownContent={stripIndent`
          Versuche, die Figur zum Ziel (grüner Punkt) zu bewegen, indem du die
          Funktionen \`moveRight()\` und \`moveDown()\` aufrufst. Ein paar Rufe haben
          wir dir schon vorgegeben.
        `}
      />
      <LectureExercise level={functionCallLevel} />
    </Lecture>
  )
}

export default FunctionCallLecture
