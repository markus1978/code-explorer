import {Typography} from '@mui/joy'
import React from 'react'

type LectureTitleProps = {
  children: React.ReactNode
}

function LectureTitle({children}: LectureTitleProps) {
  return <Typography level="h1">{children}</Typography>
}

export default LectureTitle
