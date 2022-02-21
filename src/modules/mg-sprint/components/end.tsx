import { Box, Typography, Chip, Button } from '@mui/material';
import { MGSprintStatTable } from './table';
import { NavLink } from 'react-router-dom';
import { Paths } from '../../../app/constants';
import SchoolIcon from '@mui/icons-material/School';
import DangerousIcon from '@mui/icons-material/Dangerous';
import ReplayIcon from '@mui/icons-material/Replay';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

import s from './end.module.scss';

export const MGSprintEnd = ({
  statistic,
  onResetAction,
}: {
  statistic: {
    wrong: Array<GameResult>;
    right: Array<GameResult>;
    score: number;
  };
  onResetAction: () => void;
}) => {
  return (
    <Box className={s['statistic-container']}>
      <Typography
        variant="h4"
        component="h3"
        textAlign="center"
        className={s['statistic-container__result']}
      >
        Ваш результат: {statistic.score} очков.
      </Typography>
      <Box
        className={`${s['statistic-container__column']} ${s['statistic-container__column_wrong']}`}
      >
        <Box className={s['statistic-container__column__header']}>
          <Chip
            icon={<DangerousIcon />}
            label={statistic.wrong.length}
            color="error"
            sx={{ fontSize: '16px' }}
          />
          <Typography variant="h4" component="h3" textAlign="center">
            Ошибки
          </Typography>
        </Box>
        <MGSprintStatTable elements={statistic.wrong} />
      </Box>
      <Box
        className={`${s['statistic-container__column']} ${s['statistic-container__column_right']}`}
      >
        <Box className={s['statistic-container__column__header']}>
          <Chip
            icon={<SchoolIcon />}
            label={statistic.right.length}
            color="success"
            sx={{ fontSize: '16px' }}
          />
          <Typography variant="h4" component="h3" textAlign="center">
            Правильные
          </Typography>
        </Box>
        <MGSprintStatTable elements={statistic.right} />
      </Box>
      <Box className={`${s['statistic-container__actions']}`}>
        <Button
          variant="outlined"
          size="large"
          startIcon={<ReplayIcon />}
          onClick={onResetAction}
        >
          Заново
        </Button>
        <NavLink to={Paths.textBook}>
          <Button
            variant="outlined"
            size="large"
            startIcon={<LocalLibraryIcon />}
            sx={{ width: '100%' }}
          >
            В учебник
          </Button>
        </NavLink>
      </Box>
    </Box>
  );
};
