import {Button, List, ListItem, ListItemButton, Sheet, Stack} from "@mui/joy" // Added Menu, MenuItem
import React from "react"
import {useNavigate, useParams} from "react-router-dom"
import {toc} from "../lectures/toc"
import {LectureMeta} from "../types/lecture"

type LectureLayoutProps = {
  children: React.ReactNode
}

function LectureLayout({children}: LectureLayoutProps) {
  const {lectureId} = useParams<{lectureId: string}>()
  const navigate = useNavigate()
  const currentLectureId = Number(lectureId)

  const currentLectureIndex = toc.findIndex(
    (lecture) => lecture.id === currentLectureId,
  )
  const currentLecture = toc[currentLectureIndex]

  const handleNext = () => {
    if (currentLectureIndex < toc.length - 1) {
      navigate(`/lectures/${toc[currentLectureIndex + 1].id}`)
    }
  }

  const handlePrevious = () => {
    if (currentLectureIndex > 0) {
      navigate(`/lectures/${toc[currentLectureIndex - 1].id}`)
    }
  }

  return (
    <Stack direction="row" spacing={2} sx={{height: "100vh"}}>
      <Sheet sx={{width: 250, borderRight: "1px solid #ddd"}}>
        <List>
          {toc.map((lecture: LectureMeta) => (
            <ListItem key={lecture.id}>
              <ListItemButton
                selected={lecture.id === currentLectureId}
                onClick={() => navigate(`/lectures/${lecture.id}`)}
                sx={{justifyContent: "flex-start"}}
              >
                {lecture.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Sheet>

      <Stack sx={{flexGrow: 1, p: 2, marginLeft: "0 !important"}}>
        {children}

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{mt: "auto", py: 2, borderTop: "1px solid #ddd"}}
        >
          <Button onClick={handlePrevious} disabled={currentLectureIndex === 0}>
            Zurück
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentLectureIndex === toc.length - 1}
          >
            Weiter
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default LectureLayout
