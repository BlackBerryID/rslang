import { Stack, Typography, Divider } from '@mui/material';
import { colors } from '../../../app/constants';

export const TextbookHeader = ({ group }: TextbookHeaderProp) => {
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
        sx={{ '&:hover': { color: colors[group] } }}
      >
        Учебник
      </Typography>
      <Typography
        variant="h4"
        component="button"
        className="textbook_button"
        sx={{ '&:hover': { color: colors[group] } }}
      >
        Словарь
      </Typography>
    </Stack>
  );
};
