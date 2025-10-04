import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureFunction from "../components/LectureFunction"
import LectureFunctions from "../components/LectureFunctions"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {Character} from "../types/level"
import {parseGrid} from "../utils/levelParser"
import {stripIndent} from "../utils/string"

export default function DefiningFunctions() {
  return (
    <Lecture>
      <LectureTitle>Lektion 7: Eigene Funktionen definieren</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Bisher haben wir nur Funktionen aufgerufen, die schon da waren. Aber die wahre Superkraft beim Programmieren ist, seine eigenen Funktionen zu schreiben! Stell dir vor, du bringst deiner Figur einen neuen Trick bei.

          Mit dem \`function\`-Schlüsselwort kannst du eine neue Funktion erstellen:

          \`\`\`javascript
          function moveRightUntilWall() {
            // Dein Code kommt hier rein
            ...
          }
          \`\`\`

          Zuerst definierst du die Funktion mit \`function moveRightUntilWall() { ... }\`. Der Code in den Klammern ist der "Trick". Danach kannst du deine neue Funktion einfach aufrufen, so oft du willst!

          \`moveRightUntilWall()\`
        `}
      />
      <LectureFunctions>
        <LectureFunction
          signature="moveDown(): void"
          explanation={stripIndent`
            Bewegt die Figur ein Feld nach unten.
          `}
        />
        <LectureFunction
          signature="moveRight(): void"
          explanation={stripIndent`
            Bewegt die Figur ein Feld nach rechts.
          `}
        />
        <LectureFunction
          signature="moveLeft(): void"
          explanation={stripIndent`
            Bewegt die Figur ein Feld nach links.
          `}
        />
        <LectureFunction
          signature="lookDown(): boolean"
          explanation={stripIndent`
            Gibt \`true\` zurück, wenn der Weg nach unten frei ist, sonst \`false\`.
          `}
        />
        <LectureFunction
          signature="lookRight(): boolean"
          explanation={stripIndent`
            Gibt \`true\` zurück, wenn der Weg nach rechts frei ist, sonst \`false\`.
          `}
        />
        <LectureFunction
          signature="lookLeft(): boolean"
          explanation={stripIndent`
            Gibt \`true\` zurück, wenn der Weg nach links frei ist, sonst \`false\`.
          `}
        />
      </LectureFunctions>
      <LectureText
        markdownContent={stripIndent`
          Vervollständige die Funktionen \`moveRightUntilWall\`, \`moveDownUntilWall\` und \`moveLeftUntilWall\`, damit die Figur zum Ziel gelangt!
        `}
      />
      <LectureExercise
        level={{
          ...parseGrid([
            "S.......#.",
            "..........",
            "...#......",
            ".......#..",
            "..........",
            "..........",
            "....G.....",
          ]),
          availableFunctions: (character: Character) => ({
            moveDown: () => character.move(0, 1),
            moveRight: () => character.move(1, 0),
            moveLeft: () => character.move(-1, 0),
            lookRight: () => character.look(1, 0),
            lookDown: () => character.look(0, 1),
            lookLeft: () => character.look(-1, 0),
          }),
          initialCode: stripIndent`
          function moveRightUntilWall() {
            // Bewege die Figur nach rechts, bis sie auf eine Wand trifft
          }

          function moveDownUntilWall() {
            // Bewege die Figur nach unten, bis sie auf eine Wand trifft
          }

          function moveLeftUntilWall() {
            // Bewege die Figur nach links, bis sie auf eine Wand trifft
          }

          // Benutze deine Funktionen, um zum Ziel zu gelangen
          `,
        }}
      />
    </Lecture>
  )
}
