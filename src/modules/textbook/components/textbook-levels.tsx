import { Stack, Typography, Chip, Avatar } from '@mui/material';
import { colors } from '../../../app/constants';
import { LEVELS, SHORT_LEVELS } from '../constants';

import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';
import SchoolIcon from '@mui/icons-material/School';

const vocabularyIcons = [
  <LocalLibraryIcon />,
  <FlashOnOutlinedIcon />,
  <SchoolIcon />,
];
const vocabularyText = ['Изучаемые', 'Сложные', 'Изученные'];

export const TextbookLevels = ({
  group,
  changeGroup,
  changeVocabularyGroup,
  vocabularyGroup,
  isVocabularyActive,
  vocabularyWords,
}: TextbookLevelsProps) => {
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

  const vocabularyChipList = vocabularyIcons.map((icon, index) => {
    return (
      <Chip
        id={String(index)}
        key={`vocabulary-chip-${index}`}
        className="textbook_chip"
        avatar={
          <Avatar sx={{ backgroundColor: colors[index + 1] }}>
            <p className="textbook_level__avatar">{icon}</p>
          </Avatar>
        }
        label={`${vocabularyText[index]} (Слов: ${
          (vocabularyWords[index] as Array<GetWord>)?.length
        })`}
        sx={{
          backgroundColor:
            colors[vocabularyGroup + 1] === colors[index + 1]
              ? colors[index + 1]
              : null,
          '&:hover': { backgroundColor: colors[index + 1] },
          fontSize: '14px',
          cursor: 'pointer',
          transition: '0.2s',
        }}
        onClick={() => {
          if (index !== vocabularyGroup) {
            changeVocabularyGroup(index);
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
      <Stack className="textbook_levels-list" direction="row" spacing={1}>
        {isVocabularyActive && vocabularyChipList}
      </Stack>
    </div>
  );
};
