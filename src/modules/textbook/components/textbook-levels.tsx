import { Stack, Typography, Chip, Avatar } from '@mui/material';
import { colors } from '../../../app/constants';
import { LEVELS, SHORT_LEVELS } from '../constants';

export const TextbookLevels = ({ group, changeGroup }: TextbookLevelsProps) => {
  const chipList = LEVELS.map((level, index) => {
    return (
      <Chip
        id={String(index)}
        key={SHORT_LEVELS[index]}
        className="textbook_chip"
        avatar={
          <Avatar sx={{ backgroundColor: colors[index] }}>
            <p className="textbook_level__avatar">{SHORT_LEVELS[index]}</p>
          </Avatar>
        }
        label={level}
        sx={{
          backgroundColor:
            colors[group] === colors[index] ? colors[index] : null,
          '&:hover': { backgroundColor: colors[index] },
          fontSize: '14px',
          cursor: 'pointer',
          transition: '0.2s',
        }}
        onClick={() => {
          if (index !== group) {
            changeGroup(index);
          }
        }}
      />
    );
  });

  return (
    <div className="textbook_levels">
      <Typography>Уровни сложности слов</Typography>
      <Stack className="textbook_levels-list" direction="row" spacing={1}>
        {chipList}
      </Stack>
    </div>
  );
};
