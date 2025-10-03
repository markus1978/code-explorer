import {LectureMeta} from "../types/lecture"
import FunctionCallLecture from "./01FunctionCallLecture"
import FunctionCallWithArgumentsLecture from "./02FunctionCallWithArgumentsLecture"
import ForLoopsLecture from "./03ForLoopsLecture"
import NestedForLoopsLecture from "./04NestedForLoopsLecture"

export const toc: LectureMeta[] = [
  {
    id: 1,
    title: "Lektion 1: Funktionen rufen",
    description: "Lerne, wie man Funktionen aufruft, um die Figur zu bewegen.",
    component: FunctionCallLecture,
  },
  {
    id: 2,
    title: "Lektion 2: Funktionen mit Argumenten",
    description: "Lerne, wie man Funktionen Argumente übergibt.",
    component: FunctionCallWithArgumentsLecture,
  },
  {
    id: 3,
    title: "Lektion 3: For-Schleifen",
    description: "Lerne, wie man Code mit For-Schleifen wiederholt.",
    component: ForLoopsLecture,
  },
  {
    id: 4,
    title: "Lektion 4: Verschachtelte For-Schleifen",
    description: "Lerne, wie man For-Schleifen ineinander verschachtelt.",
    component: NestedForLoopsLecture,
  },
]
