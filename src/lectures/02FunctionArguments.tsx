import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureFunction from "../components/LectureFunction"
import LectureFunctions from "../components/LectureFunctions"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {Character} from "../types/level"
import {parseGrid} from "../utils/levelParser"
import {stripIndent} from "../utils/string"

export default function FunctionArguments() {
  return (
    <Lecture>
      <LectureTitle>Lektion 2: Funktionen mit Argumenten</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          In der letzten Lektion hast du gelernt, wie man Funktionen aufruft. Aber was ist, wenn wir der Funktion sagen wollen, *wie* sie etwas tun soll? Hier kommen die **Argumente** ins Spiel.

          Argumente sind wie zusätzliche Anweisungen, die du einer Funktion gibst. Du schreibst sie in die Klammern. Zum Beispiel könnten wir unserer \`moveRight\` Funktion sagen, wie viele Schritte sie nach rechts gehen soll.

          \`moveRight(4)\`

          Das sagt der Figur, sie soll sich 4 Felder nach rechts bewegen. Probiere es aus!
        `}
      />
      <LectureFunctions>
        <LectureFunction
          signature="moveDown(steps: number)"
          explanation={stripIndent`
            Bewegt die Figur um die angegebene Anzahl \`steps\` nach unten.
          `}
        />
        <LectureFunction
          signature="moveRight(steps: number)"
          explanation={stripIndent`
            Bewegt die Figur um die angegebene Anzahl \`steps\` nach rechts.
          `}
        />
        <LectureFunction
          signature="moveLeft(steps: number)"
          explanation={stripIndent`
            Bewegt die Figur um die angegebene Anzahl \`steps\` nach links.
          `}
        />
      </LectureFunctions>
      <LectureText
        markdownContent={stripIndent`
          Versuche, die Figur über die Ziele (grüne Punkte) zu bewegen.
        `}
      />
      <LectureExercise
        level={{
          ...parseGrid([
            "S.........",
            "..........",
            "..........",
            "..........",
            ".......G..",
            "..........",
            "...G......",
            "..........",
            "..........",
            ".........G",
          ]),
          availableFunctions: (character: Character) => ({
            moveDown: (steps: number) => character.move(0, steps),
            moveRight: (steps: number) => character.move(steps, 0),
            moveLeft: (steps: number) => character.move(-steps, 0),
          }),
          initialCode: stripIndent`
            moveRight(4)
          `,
        }}
      />
    </Lecture>
  )
}
