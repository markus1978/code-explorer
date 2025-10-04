import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureFunction from "../components/LectureFunction"
import LectureFunctions from "../components/LectureFunctions"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {Character} from "../types/level"
import {parseGrid} from "../utils/levelParser"
import {stripIndent} from "../utils/string"

export default function IfConditions() {
  return (
    <Lecture>
      <LectureTitle>Lektion 5: If-Bedingungen</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Super gemacht! Jetzt wird es richtig spannend. Was ist, wenn unsere Figur nicht einfach blindlings loslaufen kann? Was ist, wenn eine Wand im Weg ist? Wir müssen dem Computer beibringen, Entscheidungen zu treffen. Dafür benutzen wir **If-Bedingungen**.

          Eine \`if\`-Bedingung ist wie eine Frage. "Wenn der Weg nach rechts frei ist, dann gehe nach rechts."

          \`\`\`javascript
          if (lookRight()) {
            moveRight()
          }
          \`\`\`

          Die Funktion \`lookRight()\` gibt \`true\` (wahr) zurück, wenn der Weg frei ist, und \`false\` (falsch), wenn eine Wand im Weg ist. Der Code in den geschweiften Klammern wird nur ausgeführt, wenn die Bedingung \`true\` ist.
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
      </LectureFunctions>
      <LectureText
        markdownContent={stripIndent`
          In diesem Labyrinth musst du zuerst prüfen, ob der Weg frei ist, bevor du dich bewegst. Kombiniere \`if\`-Bedingungen, um zum Ziel zu gelangen!
        `}
      />
      <LectureExercise
        level={{
          ...parseGrid(["S.##...", "#..#...", "##.####", ".#....#", ".####G#"]),
          availableFunctions: (character: Character) => ({
            moveDown: () => character.move(0, 1),
            moveRight: () => character.move(1, 0),
            lookRight: () => character.look(1, 0),
            lookDown: () => character.look(0, 1),
          }),
          initialCode: stripIndent`
            for (let i = 0; i < 7; i++) {
              if (lookRight()) {
                moveRight()
              }
              // Füge hier eine weitere If-Bedingung hinzu
            }
          `,
        }}
      />
    </Lecture>
  )
}
