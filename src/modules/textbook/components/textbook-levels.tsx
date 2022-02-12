import { Stack, Typography, Chip, Avatar } from '@mui/material';
import { colors } from '../../../app/constants';
import { levels, shortLevels } from '../constants';

export const TextbookLevels = ({ setColor }: TextbookLevelsProps) => {
  const chipList = levels.map((level, index) => {
    return (
      <Chip
        id={String(index)}
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

  const changeColor = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    let result = null;
    if (target.classList.contains('textbook_chip')) result = target.id;
    if (target.parentElement) {
      if (target.parentElement.classList.contains('textbook_chip'))
        result = target.parentElement.id;
      if (
        target.parentElement.parentElement?.classList.contains('textbook_chip')
      )
        result = target.parentElement.parentElement.id;
    }
    if (result) setColor(colors[Number(result)]);
  };

  return (
    <div className="textbook_levels">
      <Typography>Уровни сложности слов</Typography>
      <Stack
        className="textbook_levels-list"
        direction="row"
        spacing={1}
        onClick={changeColor}
      >
        {chipList}
      </Stack>
    </div>
  );
};
