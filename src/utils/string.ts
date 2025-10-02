export function stripIndent(strings: TemplateStringsArray, ...values: any[]) {
  const fullString = strings.reduce((acc, str, i) => {
    return acc + str + (values[i] !== undefined ? values[i] : "")
  }, "")

  const lines = fullString.split("\n")

  // Filter out empty lines to find the common indent
  const nonBlankLines = lines.filter((line) => line.trim().length > 0)

  if (nonBlankLines.length === 0) {
    return "" // If all lines are blank, return empty string
  }

  // Find the minimum indentation of all non-blank lines
  let minIndent = Infinity
  for (const line of nonBlankLines) {
    const match = line.match(/^\s*/)
    if (match && match[0].length < minIndent) {
      minIndent = match[0].length
    }
  }

  // Apply the stripping
  const strippedLines = lines.map((line) => {
    if (line.trim().length === 0) {
      return "" // Keep blank lines blank
    }
    return line.substring(minIndent)
  })

  // Remove leading/trailing blank lines and join
  return strippedLines.join("\n").trim()
}
