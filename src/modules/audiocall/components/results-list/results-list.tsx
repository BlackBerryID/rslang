import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import React from "react";

import './results-list.scss';
import { base } from "../../../../api";

const ResultsList = ({ answeredWords }: { answeredWords: { word: Word, flag: boolean }[] }) => {
  return (
    <div className="results-list">
      <List>
        {answeredWords.map((item, index) => {
          console.log(item);
          return <ListItem disablePadding key={index}>
            <ListItemButton onClick={() => new Audio(`${base}/${item.word.audio}`).play()}>
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

export default ResultsList;
