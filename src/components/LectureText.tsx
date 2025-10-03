import {Typography} from "@mui/joy"
import ReactMarkdown from "react-markdown"
import "../styles/markdown.css"
import CodeSnippet from "./CodeSnippet"

type LectureTextProps = {
  markdownContent: string // Changed from children
}

function LectureText({markdownContent}: LectureTextProps) {
  return (
    <Typography component="div" className="markdown-body">
      <ReactMarkdown
        components={{
          code({node, className, children, ...props}) {
            const match = /language-(\w+)/.exec(className || "")
            const lang = match ? match[1] : "javascript" // Default to javascript if no language specified

            return (
              <CodeSnippet language={lang} inline {...props}>
                {String(children).replace(/\n$/, "")}
              </CodeSnippet>
            )
          },
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </Typography>
  )
}

export default LectureText
