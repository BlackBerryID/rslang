import { Typography } from '@mui/material';

export const TextbookHeader = ({ color }: TextbookHeaderProps) => {
  return (
    <div className="textbook_header">
      <Typography
        variant="h4"
        component="button"
        className="textbook_button"
        sx={{ '&:hover': { color: color } }}
        onClick={() => console.log('textbook')}
      >
        Учебник
      </Typography>
      <Typography component="div" variant="h4" className="textbook_line">
        |
      </Typography>
      <Typography
        variant="h4"
        component="button"
        className="textbook_button"
        sx={{ '&:hover': { color: color } }}
        onClick={() => console.log('textbook')}
      >
        Словарь
      </Typography>
    </div>
  );
};
