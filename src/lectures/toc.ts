import {LectureMeta} from "../types/lecture"
import FunctionCall from "./01FunctionCall"
import FunctionCallWithArgumentsLecture from "./02FunctionArguments"
import ForLoopsLecture from "./03ForLoops"
import NestedForLoopsLecture from "./04NestedForLoops"
import IfConditions from "./05IfConditions"

export const toc: LectureMeta[] = [
  {
    id: 1,
    title: "Lektion 1: Funktionen rufen",
    description: "Lerne, wie man Funktionen aufruft, um die Figur zu bewegen.",
    component: FunctionCall,
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
  {
    id: 5,
    title: "Lektion 5: If-Bedingungen",
    description: "Lerne, wie man mit If-Bedingungen Entscheidungen trifft.",
    component: IfConditions,
  },
]
