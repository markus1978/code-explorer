import React, { useState, useEffect } from 'react';
import { Sheet, Grid, Typography, Stack } from '@mui/joy';
import yaml from 'js-yaml';
import CodeEditor from './components/CodeEditor';
import Sandbox from './components/Sandbox';

function App() {
  const [lecture, setLecture] = useState(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    fetch('/lectures.yml')
      .then((response) => response.text())
      .then((text) => {
        const lectures = yaml.load(text);
        setLecture(lectures[0]);
        setCode(lectures[0].initialCode);
      });
  }, []);

  if (!lecture) {
    return <div>Wird geladen...</div>;
  }

  return (
    <Stack spacing={4} sx={{ maxWidth: 1024, margin: 'auto', p: 2 }}>
      <Typography level="h1">{lecture.title}</Typography>
      <Typography sx={{ mt: 2 }}>{lecture.explanation}</Typography>
      <Stack direction="row" spacing={4}>
        <CodeEditor code={code} setCode={setCode} />
        <Sandbox code={code} />
      </Stack>
    </Stack>
  );
}

export default App;