import React from "react";
import { VolumeUp } from "@mui/icons-material";
import { Card, CardMedia, Container, IconButton, Typography } from "@mui/material";
import { base } from "../../../../api";

import './word-info.scss';
import { AudioPlayer } from "../../helpers/audio-player";

const WordInfo = ({ word }: { word: Word }) => {

  const audio = new AudioPlayer()
  return (
    <Card sx={{ width: 400, height: 300 }}>
      <CardMedia
        component="img"
        height="200"
        image={`${base}/${word.image}`}
        alt={word.word}
      />
      <Container sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        columnGap: '20px',
        p: '10px'
      }}>
        <Typography variant="h3">
          {word.word}
        </Typography>
        <IconButton
          aria-label="volume"
          sx={{ p: 2 }}
          onClick={() => { audio.playEffect(`${base}/${word.audio}`) }}
        >
          <VolumeUp sx={{ fontSize: 40 }} />
        </IconButton>
      </Container>
    </Card>
  );
}

export { WordInfo };
