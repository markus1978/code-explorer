import {LectureMeta} from "../types/lecture"
import FunctionCallLecture from "./FunctionCallLecture"
import PlaceholderLecture2 from "./PlaceholderLecture2" // New import
import PlaceholderLecture3 from "./PlaceholderLecture3" // New import

export const toc: LectureMeta[] = [
  {
    id: 1,
    title: "Lektion 1: Funktionen rufen",
    description: "Lerne, wie man Funktionen aufruft, um die Figur zu bewegen.",
    component: FunctionCallLecture,
  },
  {
    id: 2,
    title: "Lektion 2: Platzhalter",
    description: "Dies ist die zweite Platzhalter-Lektion.",
    component: PlaceholderLecture2,
  },
  {
    id: 3,
    title: "Lektion 3: Noch ein Platzhalter",
    description: "Dies ist die dritte Platzhalter-Lektion.",
    component: PlaceholderLecture3,
  },
]
