import { Box } from '@mui/material';
export const MGSprintTimer = (props: { time: number }) => (
  <Box display="flex" alignItems="center">
    {props.time}
  </Box>
);
