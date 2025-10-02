import {Stack} from '@mui/joy'
import React from 'react'

type LectureProps = {
  children: React.ReactNode
}

function Lecture({children}: LectureProps) {
  return (
    <Stack spacing={4} sx={{maxWidth: 1024, margin: 'auto', p: 2}}>
      {children}
    </Stack>
  )
}

export default Lecture
