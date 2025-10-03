import React from "react"
import CodeSnippet from "./CodeSnippet"
import LectureText from "./LectureText"

type LectureFunctionProps = {
  signature: string
  explanation: string // Changed from children
}

function LectureFunction({signature, explanation}: LectureFunctionProps) {
  // Changed prop name
  return (
    <tr>
      <td>
        <CodeSnippet language="javascript" inline={true}>
          {signature}
        </CodeSnippet>
      </td>
      <td>
        <LectureText markdownContent={explanation} /> {/* Render explanation */}
      </td>
    </tr>
  )
}

export default LectureFunction
