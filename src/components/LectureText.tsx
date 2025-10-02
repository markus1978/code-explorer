import {Typography} from '@mui/joy'
import React from 'react'

type LectureTextProps = {
  children: React.ReactNode
}

function LectureText({children}: LectureTextProps) {
  return <Typography>{children}</Typography>
}

export default LectureText
