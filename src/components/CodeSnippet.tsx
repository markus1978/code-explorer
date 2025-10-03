import React from "react"
import Prism from "prismjs"
import {highlight, languages} from "prismjs/components/prism-core"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript" // Always load javascript
import "prismjs/themes/prism.css" // Or a specific theme

type CodeSnippetProps = {
  children: string
  language?: string // e.g., 'javascript', 'python', 'css'
  inline?: boolean // New prop to indicate inline code
}

function CodeSnippet({
  children,
  language = "javascript",
  inline = false,
}: CodeSnippetProps) {
  // Ensure the language grammar is loaded. If not, fall back to javascript.
  // For other languages, they need to be explicitly imported in this file or a central place.
  const grammar = languages[language] || languages.javascript
  const actualLanguage = languages[language] ? language : "javascript"

  const highlightedCode = highlight(children, grammar, actualLanguage)

  const codeElement = (
    <code
      className={`language-${actualLanguage}`}
      dangerouslySetInnerHTML={{__html: highlightedCode}}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: "14px",
        display: inline ? "inline-block" : "block", // Explicitly set display
      }}
    />
  )

  return inline ? (
    codeElement
  ) : (
    <pre
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: "14px",
      }}
    >
      {codeElement}
    </pre>
  )
}

export default CodeSnippet
