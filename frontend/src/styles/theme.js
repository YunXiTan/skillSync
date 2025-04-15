import { createTheme } from '@mui/material/styles';

export const colors = {
  primary: {
    main: '#FFB84C',      // Warm Yellow
    light: '#FFD89C',
    dark: '#F29727',
    contrastText: '#2D2D2D'
  },
  secondary: {
    main: '#F16767',      // Soft Coral
    light: '#FF9B9B',
    dark: '#D14D4D',
    contrastText: '#fff'
  },
  error: {
    main: '#FF6B6B',      // Soft Red
    light: '#FF9B9B',
    dark: '#D14D4D',
  },
  warning: {
    main: '#FFA41B',      // Amber
    light: '#FFB74D',
    dark: '#F57C00',
  },
  info: {
    main: '#7BD3EA',      // Soft Blue
    light: '#A1E3F6',
    dark: '#54B4D3',
  },
  success: {
    main: '#9ACD32',      // Yellow Green
    light: '#B5D85B',
    dark: '#7BA428',
  },
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  background: {
    default: '#FFFBF5',   // Warm White
    paper: '#FFFFFF',
    dark: '#2D2D2D',
  },
};

export const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    error: colors.error,
    warning: colors.warning,
    info: colors.info,
    success: colors.success,
    grey: colors.grey,
    background: colors.background,
    mode: 'light',
    text: {
      primary: '#2D2D2D',
      secondary: '#525252',
    }
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  shape: {
    borderRadius: 12,  // Slightly more rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
}); 