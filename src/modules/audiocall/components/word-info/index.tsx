import { VolumeUp } from "@mui/icons-material";
import { Card, CardContent, CardMedia, Container, IconButton, Typography } from "@mui/material";
import { flexbox } from "@mui/system";
import React from "react";
import { base } from "../../../../api";

import './word-info.scss';

const WordInfo = ({ word }: { word: Word }) => {

  return (
    <Card >
      <CardMedia
        component="img"
        height="140"
        image={`${base}/${word.image}`}
        alt={word.word}
      />
      <CardContent>
        <Typography variant="h3">
          {word.word}
        </Typography>
      </CardContent>
      <Container sx={{ display:'flex', justifyContent:'center' }}>
        <IconButton
          aria-label="volume"
          sx={{margin:"0 auto"}}
          onClick={() => (new Audio(`${base}/${word.audio}`).play())}
        >
          <VolumeUp sx={{ fontSize: 40 }} />
        </IconButton>
      </Container>
    </Card>
  );
}

export { WordInfo };
