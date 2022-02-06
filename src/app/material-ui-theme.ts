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
  // palette: {
  //   primary: {
  //     light: '#7eceef',
  //     main: '#647295',
  //     dark: '#029ee0',
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: '#f39991',
  //     main: '#ea7166',
  //     dark: '#f2523d',
  //     contrastText: '#fff',
  //   },
  //   info: {
  //     light: '#ea7166',
  //     main: '#ffcd24',
  //     dark: '#90ccf4',
  //     contrastText: '#fff',
  //   },
  // },
});

export default theme;
