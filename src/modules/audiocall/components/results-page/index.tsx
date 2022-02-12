import React, { useState } from "react";
import { Box, Button} from "@mui/material";
import { ResultsInfo } from "../results-info";
import { ResultsList } from "../results-list";
import { Paths } from "../../../../app/constants"
import { NavLink } from "react-router-dom";
import ReplayIcon from '@mui/icons-material/Replay';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import './results-page.scss';

const ResultsPage = ({ answeredWords, setIsGameStarted }: {
  answeredWords: { word: Word, flag: boolean }[],
  setIsGameStarted: (flag: boolean) => void
}) => {

  const [isInfoView, setIsInfoView] = useState(true);

  return (

    <div className="results-page">
      <Box sx={{ display: 'flex', columnGap: '20px' }}>
        <Button
          variant={isInfoView ? "contained" : "outlined"}
          onClick={() => setIsInfoView(true)}
        >Результаты
        </Button>
        <Button
          variant={isInfoView ? "outlined" : "contained"}
          onClick={() => setIsInfoView(false)}
        >
          Статистика
        </Button>
      </Box>
      {
        isInfoView ?
          <ResultsInfo answersCount={answeredWords.length} correctAnswers={answeredWords.filter((word) => word.flag).length} /> :
          <ResultsList answeredWords={answeredWords} />
      }
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '20px' }}>
        <Button
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={() => { setIsGameStarted(false) }}
        >
          Заново
        </Button>
        <NavLink to={Paths.textBook}>
          <Button
            variant="outlined"
            startIcon={<LocalLibraryIcon />}
          >
            В учебник
          </Button>
        </NavLink>
      </Box>
    </div>
  )
};

export { ResultsPage };
