import Lecture from "../components/Lecture"
import LectureExercise from "../components/LectureExercise"
import LectureFunction from "../components/LectureFunction"
import LectureFunctions from "../components/LectureFunctions"
import LectureText from "../components/LectureText"
import LectureTitle from "../components/LectureTitle"
import {Character} from "../types/level"
import {parseGrid} from "../utils/levelParser"
import {stripIndent} from "../utils/string"

export default function LoopsWithConditions() {
  return (
    <Lecture>
      <LectureTitle>Lektion 6: Schleifen mit Bedingungen</LectureTitle>
      <LectureText
        markdownContent={stripIndent`
          Du bist jetzt ein echter Profi! Lass uns unser Wissen über Schleifen und Bedingungen kombinieren. Was ist, wenn wir wollen, dass sich unsere Figur bewegt, *solange* der Weg frei ist?

          Wir können eine \`for\`-Schleife so umbauen, dass sie eine Bedingung anstelle eines Zählers verwendet.

          \`\`\`javascript
          for (;lookRight();) {
            moveRight()
          }
          \`\`\`

          Schau dir die Schleifenbedingung genau an: \`;lookRight();\`. Das bedeutet: Die Schleife hat keine Startvariable und keinen Zähler. Sie läuft einfach so lange weiter, wie \`lookRight()\` den Wert \`true\` zurückgibt. Sobald die Figur vor einer Wand steht, gibt \`lookRight()\` \`false\` zurück und die Schleife stoppt.

          **Profi-Tipp:** Hierfür wird oft eine \`while\`-Schleife verwendet, die genau für solche Fälle gedacht ist. Aber eine \`for\`-Schleife funktioniert auch!
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
          Benutze eine \`for\`-Schleife mit einer \`look\`-Bedingung, um die Figur durch den Gang zu bewegen. Du musst nicht mehr selbst die Schritte zählen!
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
            for (;lookRight();) {
              moveRight()
            }
            // Füge hier weitere Schleifen hinzu. Wieviel brauchst du?
          `,
        }}
      />
    </Lecture>
  )
}
