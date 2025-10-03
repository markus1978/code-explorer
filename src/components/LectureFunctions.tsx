import {Sheet, Table} from "@mui/joy" // Added Sheet
import React from "react"

type LectureFunctionsProps = {
  children: React.ReactNode
}

function LectureFunctions({children}: LectureFunctionsProps) {
  return (
    <Sheet
      variant="outlined"
      sx={{
        borderRadius: "sm",
        "& .markdown-body p": {
          margin: "0 !important",
        },
      }}
    >
      <Table borderAxis="bothBetween" hoverRow>
        <tbody>{children}</tbody>
      </Table>
    </Sheet>
  )
}

export default LectureFunctions
