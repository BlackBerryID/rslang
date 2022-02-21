import { Box, Chip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SchoolIcon from '@mui/icons-material/School';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { AudioPlayer } from "../../../../utils/audio-player";
import { MGSprintStatTable } from "../../../mg-sprint/components/table";
import s from './end.module.scss';

const ResultsList = ({ answeredWords }: { answeredWords: { word: Word, flag: boolean }[] }) => {

  const [right, setRight] = useState<{ word: Word, flag: boolean }[]>([]);
  const [wrong, setWrong] = useState<{ word: Word, flag: boolean }[]>([]);

  useEffect(() => {
    if (answeredWords.length) {
      setRight(answeredWords.filter((word) => word.flag));
      setWrong(answeredWords.filter((word) => !word.flag));
    }
  }, [answeredWords]);
  return (
    <Box className={s['statistic-container']}>
      <Box
        className={`${s['statistic-container__column']} ${s['statistic-container__column_wrong']}`}
      >
        <Box className={s['statistic-container__column__header']}>
          <Chip
            icon={<DangerousIcon />}
            label={wrong.length}
            color="error"
            sx={{ fontSize: '16px' }}
          />
          <Typography variant="h4" component="h3" textAlign="center">
            Ошибки
          </Typography>
        </Box>
        <MGSprintStatTable elements={wrong.map((elem) => {
          return {
            id: elem.word._id as string,
            audio: elem.word.audio as string,
            word: elem.word.word as string,
            translate: elem.word.wordTranslate as string,
            result: elem.flag as boolean,
          };
        })}
        />
      </Box>
      <Box
        className={`${s['statistic-container__column']} ${s['statistic-container__column_right']}`}
      >
        <Box className={s['statistic-container__column__header']}>
          <Chip
            icon={<SchoolIcon />}
            label={right.length}
            color="success"
            sx={{ fontSize: '16px' }}
          />
          <Typography variant="h4" component="h3" textAlign="center">
            Правильные
          </Typography>
        </Box>
        <MGSprintStatTable elements={right.map((elem) => {
          return {
            id: elem.word._id as string,
            audio: elem.word.audio as string,
            word: elem.word.word as string,
            translate: elem.word.wordTranslate as string,
            result: elem.flag as boolean,
          };
        })} />
      </Box>
    </Box>
  );
  // return (
  //   <div className="results-list">
  //     <List>
  //       {answeredWords.map((item, index) => {
  //         return <ListItem disablePadding key={index}>
  //           <ListItemButton onClick={() => { AudioPlayer.playEffect(`${item.word.audio}`) }}>
  //             <ListItemIcon>
  //               {item.flag ? <CheckIcon color="success" /> : <ClearIcon color="error" />}
  //             </ListItemIcon>
  //             <ListItemText primary={item.word.wordTranslate} />
  //           </ListItemButton>
  //         </ListItem>
  //       })}
  //     </List>
  //   </div>
  // );
}

export { ResultsList };
