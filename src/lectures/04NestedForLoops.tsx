import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureFunction from "../components/LectureFunction"
import LectureFunctions from "../components/LectureFunctions"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {Character} from "../types/level"
import {parseGrid} from "../utils/levelParser"
import {stripIndent} from "../utils/string"

export default function NestedForLoops() {
  return (
    <Lecture>
      <LectureTitle>Lektion 4: Verschachtelte For-Schleifen</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Du hast gelernt, wie man Schleifen benutzt, um Dinge zu wiederholen. Aber was ist, wenn du eine Wiederholung in einer anderen Wiederholung brauchst? Das nennt man **verschachtelte Schleifen**.

          Schau dir das Labyrinth an. Du musst ein Muster wiederholen: ein paar Schritte nach rechts, dann einen Schritt nach unten. Das ist ein perfekter Fall für eine verschachtelte Schleife!

          \`\`\`javascript
          for (let i = 0; i < 4; i++) {
            // Äußere Schleife: wiederholt den Block 4 Mal
            for (let j = 0; j < 2; j++) {
              // Innere Schleife: wiederholt moveRight() 2 Mal
              moveRight()
            }
            moveDown() // Nach der inneren Schleife einmal nach unten gehen
          }
          \`\`\`

          Die äußere Schleife steuert, wie oft das gesamte Muster wiederholt wird. Die innere Schleife steuert einen Teil des Musters.
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
          Passe die Zahlen in den verschachtelten Schleifen an, um die Figur durch das Labyrinth zum Ziel zu navigieren ohne an die Wände zu stoßen.
        `}
      />
      <LectureExercise
        level={{
          ...parseGrid([
            "S...####..",
            "###....###",
            "..####....",
            ".....####G",
            "..........",
            "..........",
            "..........",
            "..........",
            "..........",
            "..........",
          ]),
          availableFunctions: (character: Character) => ({
            moveDown: () => character.move(0, 1),
            moveRight: () => character.move(1, 0),
          }),
          initialCode: stripIndent`
            // Korrigiere die Zahlen in den Schleifen, um zum Ziel zu gelangen
            for (let i = 0; i < 5; i++) {
              for (let j = 0; j < 5; j++) {
                moveRight()
              }
              moveDown()
            }
          `,
        }}
      />
      <LectureText
        markdownContent={stripIndent`
          Du kannst auch mit zwei inneren Schleifen experimentieren, wenn du möchtest!
        `}
      />
      <LectureExercise
        level={{
          ...parseGrid([
            "S#........",
            ".#........",
            ".###......",
            "...#......",
            "##.#......",
            ".#.###....",
            ".#...#....",
            ".###.#....",
            "...#.###..",
            "...#..G#..",
          ]),
          availableFunctions: (character: Character) => ({
            moveDown: () => character.move(0, 1),
            moveRight: () => character.move(1, 0),
          }),
          initialCode: stripIndent`
            // Jetzt mit zwei inneren Schleifen experimentieren
          `,
        }}
      />
    </Lecture>
  )
}
