import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";

import './results-list.scss';
import { base } from "../../../../api";
import { AudioPlayer } from "../../helpers/audio-player";

const ResultsList = ({ answeredWords }: { answeredWords: { word: Word, flag: boolean }[] }) => {

  const audio = new AudioPlayer();

  return (
    <div className="results-list">
      <List>
        {answeredWords.map((item, index) => {
          return <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => { audio.playEffect(`${base}/${item.word.audio}`) }}>
              <ListItemIcon>
                {item.flag ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
              </ListItemIcon>
              <ListItemText primary={item.word.wordTranslate} />
            </ListItemButton>
          </ListItem>
        })}
      </List>
    </div>
  );
}

export { ResultsList };
