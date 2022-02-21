import { Stack, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { colors } from '../../../app/constants';
import { RootState } from '../../../store';

export const TextbookHeader = ({
  group,
  isVocabularyActive,
  setIsVocabularyActive,
}: TextbookHeaderProp) => {
  const user = useSelector((state: RootState) => state.user);
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
      {user.userId && (
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
      )}
    </Stack>
  );
};
