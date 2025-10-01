import React from "react"
import Editor from "react-simple-code-editor"
import {highlight, languages} from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/themes/prism.css"

type CodeEditorProps = {
  code: string
  setCode: (code: string) => void
}

function CodeEditor({code, setCode}: CodeEditorProps) {
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js)}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        borderRadius: "4px",
        width: "100%",
      }}
    />
  )
}

export default CodeEditor
