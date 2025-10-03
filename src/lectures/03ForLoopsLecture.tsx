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

const level: Level = {
  ...parseGrid(
    [
      "S.........",
      "..........",
      "..........",
      "..........",
      "........G.",
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
    for (let i = 0; i < 4; i++) {
      moveRight()
    }
  `,
}

function ForLoopsLecture() {
  return (
    <Lecture>
      <LectureTitle>Lektion 3: For-Schleifen</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Manchmal möchtest du, dass der Computer die gleiche Sache immer und immer wieder tut. Wäre es nicht mühsam, \`moveRight()\` vier Mal hintereinander zu schreiben? Genau hierfür gibt es **Schleifen**!

          Eine \`for\`-Schleife ist eine Möglichkeit, dem Computer zu sagen, dass er einen Codeblock mehrmals ausführen soll. Schau dir das Beispiel an:

          \`\`\`javascript
          for (let i = 0; i < 4; i++) {
            moveRight()
          }
          \`\`\`

          Das ist wie zu sagen: "Computer, zähle von 0 bis 3 (insgesamt 4 Mal), und bei jeder Zählung, bewege die Figur nach rechts."
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
          Benutze eine \`for\`-Schleife, um die Figur zum Ziel zu bewegen. Du wirst zwei Schleifen brauchen: eine für die Bewegung nach rechts und eine für die Bewegung nach unten.
        `}
      />
      <LectureExercise level={level} />
    </Lecture>
  )
}

export default ForLoopsLecture
