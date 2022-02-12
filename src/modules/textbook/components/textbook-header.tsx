import { Stack, Typography, Divider } from '@mui/material';

export const TextbookHeader = ({ color }: TextbookColorProp) => {
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
        sx={{ '&:hover': { color: color } }}
      >
        Учебник
      </Typography>
      <Typography
        variant="h4"
        component="button"
        className="textbook_button"
        sx={{ '&:hover': { color: color } }}
      >
        Словарь
      </Typography>
    </Stack>
  );
};
