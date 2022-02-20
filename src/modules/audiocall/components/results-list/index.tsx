import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";

import './results-list.scss';
import { AudioPlayer } from "../../../../utils/audio-player";

const ResultsList = ({ answeredWords }: { answeredWords: { word: Word, flag: boolean }[] }) => {

  return (
    <div className="results-list">
      <List>
        {answeredWords.map((item, index) => {
          return <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => { AudioPlayer.playEffect(`${item.word.audio}`) }}>
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
