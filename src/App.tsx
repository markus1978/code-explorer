import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom"
import {toc} from "./lectures/toc"
import {Stack, Typography} from "@mui/joy"
import LectureLayout from "./components/LectureLayout" // New import

function LecturePage() {
  const {lectureId} = useParams<{lectureId: string}>()
  const id = Number(lectureId)
  const lecture = toc.find((l) => l.id === id)

  if (!lecture) {
    return <Typography color="danger">Lektion nicht gefunden.</Typography>
  }

  const LectureComponent = lecture.component
  return <LectureComponent />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lectures/1" replace />} />
        <Route
          path="/lectures/:lectureId"
          element={
            <LectureLayout>
              {" "}
              {/* Wrap LecturePage with LectureLayout */}
              <LecturePage />
            </LectureLayout>
          }
        />
        <Route
          path="*"
          element={<Typography>Seite nicht gefunden.</Typography>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
