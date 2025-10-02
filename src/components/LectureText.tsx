import {Typography} from "@mui/joy"
import React from "react"
import ReactMarkdown from "react-markdown"
import "../styles/markdown.css" // New import

type LectureTextProps = {
  children: string // Children should be a string for markdown
}

function LectureText({children}: LectureTextProps) {
  return (
    <Typography component="div" className="markdown-body">
      {" "}
      {/* Add className */}
      <ReactMarkdown>{children}</ReactMarkdown>
    </Typography>
  )
}

export default LectureText
