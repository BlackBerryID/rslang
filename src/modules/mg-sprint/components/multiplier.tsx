import { Box } from '@mui/material';
export const MGSprintMultiplier = (props: {
  base: number;
  coef: number;
  score: number;
}) => (
  <Box display="flex" alignItems="center">
    {props.base} × {props.coef} | {props.score}
  </Box>
);
