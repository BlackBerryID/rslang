import { Stack, Typography, Divider } from '@mui/material';
import { colors } from '../../../app/constants';

export const TextbookHeader = ({
  group,
  isVocabularyActive,
  setIsVocabularyActive,
}: TextbookHeaderProp) => {
  return (
    <Stack
      className="textbook_header"
      divider={
        <Divider orientation="vertical" flexItem sx={{ margin: '0 5px' }} />
      }
      direction="row"
    >
      <Typography
        variant="h4"
        component="button"
        className="textbook_button"
        sx={{
          '&:hover': { color: colors[group] },
          color: `${isVocabularyActive ? '#ccc' : '#000'}`,
        }}
        onClick={() => setIsVocabularyActive(false)}
      >
        Учебник
      </Typography>
      <Typography
        variant="h4"
        component="button"
        className="textbook_button"
        sx={{
          '&:hover': { color: colors[group] },
          color: `${isVocabularyActive ? '#000' : '#ccc'}`,
        }}
        onClick={() => setIsVocabularyActive(true)}
      >
        Словарь
      </Typography>
    </Stack>
  );
};
