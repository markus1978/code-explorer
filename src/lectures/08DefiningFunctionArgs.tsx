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
      <LectureTitle>Lektion 8: Funktionen mit Argumenten</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Wir haben gelernt, wie man eigene Funktionen schreibt. Aber was, wenn wir eine Funktion wollen, die flexibler ist? Zum Beispiel eine Funktion, die in *irgendeine* Richtung läuft, bis eine Wand kommt? Dafür brauchen wir **Argumente**!

          Argumente sind Variablen, die du einer Funktion beim Definieren gibst. Du kannst sie dann innerhalb der Funktion benutzen.

          \`\`\`javascript
          function moveUntilWall(x, y) {
            for (;look(x, y);) {
              move(x, y)
            }
          }
          \`\`\`

          Jetzt haben wir eine Super-Funktion! Du kannst sie mit verschiedenen Werten für \`x\` und \`y\` aufrufen, um in verschiedene Richtungen zu laufen:

          \`moveUntilWall(1, 0)\` Läuft nach rechts bis zur Wand.
          \`moveUntilWall(0, 1)\` Läuft nach unten bis zur Wand.
        `}
      />
      <LectureFunctions>
        <LectureFunction
          signature="move(x, y): void"
          explanation={stripIndent`
            Bewegt die Figur um ein Feld in Richtung (x, y).
          `}
        />
        <LectureFunction
          signature="look(x, y): boolean"
          explanation={stripIndent`
            Gibt \`true\` zurück, wenn in der gegebenen Richtung (x, y) kein Hindernis ist, sonst \`false\`.
          `}
        />
      </LectureFunctions>
      <LectureText
        markdownContent={stripIndent`
          Vervollständige die Funktionen \`moveUntilWall\`, damit die Figur die Ziele abläuft!
        `}
      />
      <LectureExercise
        level={{
          ...parseGrid([
            "S.......#.",
            "..........",
            "G..#......",
            ".......#..",
            "..........",
            "..........",
            "....G.....",
          ]),
          availableFunctions: (character: Character) => ({
            move: (x, y) => character.move(x, y),
            look: (x, y) => character.look(x, y),
          }),
          initialCode: stripIndent`
          // Füge die Parameter und Funktionskörper hinzu
          function moveUntilWall(...) {
            ...
          }

          // Benutze deine Funktion, um zum Ziel zu gelangen
          `,
        }}
      />
    </Lecture>
  )
}
