import { Stack, Typography, Chip, Avatar } from '@mui/material';
import { colors } from '../../../app/constants';
import { levels, shortLevels } from '../constants';

export const TextbookLevels = () => {
  const chipList = levels.map((level, index) => {
    return (
      <Chip
        key={shortLevels[index]}
        className="textbook_chip"
        avatar={
          <Avatar sx={{ backgroundColor: colors[index] }}>
            <p className="textbook_level__avatar">{shortLevels[index]}</p>
          </Avatar>
        }
        label={level}
        sx={{
          '&:hover': { backgroundColor: colors[index] },
          fontSize: '14px',
          cursor: 'pointer',
          transition: '0.2s',
        }}
      ></Chip>
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
