import { createTheme } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';

const COLOR_PRIMARY = '#1976d2';

const theme = createTheme({
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: COLOR_PRIMARY,
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          fontSize: '24px',
        },
      },
    },
  },
  palette: {
    primary: {
      main: COLOR_PRIMARY,
    },
  },
});

export default theme;
