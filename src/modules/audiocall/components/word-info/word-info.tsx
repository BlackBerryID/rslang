import { VolumeUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";
import { base } from "../../../../api";

import './word-info.scss';

const WordInfo = ({ word }: { word: Word }) => {

  return (
    <div className="word-info">
      <img src={`${base}/${word.image}`}></img>
      <h3>{word.word}</h3>
      <h4>{word.transcription}</h4>
      <IconButton
        aria-label="volume"
        onClick={() => (new Audio(`${base}/${word.audio}`).play())}
      >
        <VolumeUp sx={{ fontSize: 40 }} />
      </IconButton>
    </div>
  );
}

export default WordInfo;
