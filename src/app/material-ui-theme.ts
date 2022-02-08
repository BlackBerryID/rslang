import { createTheme } from '@mui/material';
import type {} from '@mui/lab/themeAugmentation';

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
      light: '#fbe4e3',
      main: '#febeb0',
      dark: '#f89580',
      contrastText: '#666',
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
