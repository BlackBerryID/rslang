import { createTheme } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';
import { deepOrange } from '@mui/material/colors';

const COLOR_PRIMARY = '#8ca9d3';

export const theme = createTheme({
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
    MuiLink: {
      styleOverrides: {
        root: {
          contrastText: 'green',
        },
      },
    },
  },
  palette: {
    primary: {
      light: '#bacbe5',
      main: '#8ca9d3',
      dark: '#5989c3',
      contrastText: '#fff',
    },
    secondary: {
      light: deepOrange['200'],
      main: deepOrange['A100'],
      dark: deepOrange['A200'],
      contrastText: '#fff',
    },
    info: {
      light: '#ff2237',
      main: '#f21137',
      dark: '#e00030',
      contrastText: '#fff',
    },
    error: {
      light: '#ff2237',
      main: '#f21137',
      dark: '#e00030',
      contrastText: '#fff',
    },
  },
});
