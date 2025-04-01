import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';
import AppRoutes from './routes';

// 创建赛博朋克主题
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7C4DFF',
      light: '#9E7BFF',
      dark: '#5C35CC',
    },
    secondary: {
      main: '#FF4D8C',
      light: '#FF6FA3',
      dark: '#D93D74',
    },
    background: {
      default: '#0D0B14',
      paper: '#13111F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    error: {
      main: '#FF4D4D',
    },
    warning: {
      main: '#FFB84D',
    },
    info: {
      main: '#4DA6FF',
    },
    success: {
      main: '#4CAF50',
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #7C4DFF 0%, #FF4D8C 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#FFFFFF',
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1rem',
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 20px',
          transition: 'all 0.2s ease',
          fontSize: '0.9rem',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #7C4DFF 0%, #FF4D8C 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #9E7BFF 0%, #FF6FA3 100%)',
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(124, 77, 255, 0.3)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.12)',
          '&:hover': {
            borderColor: '#7C4DFF',
            background: 'rgba(124, 77, 255, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#13111F',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            borderColor: 'rgba(124, 77, 255, 0.2)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(13, 11, 20, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#13111F',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 77, 140, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF4D8C',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 24,
          fontSize: '0.75rem',
          fontWeight: 500,
        },
        filled: {
          background: 'rgba(124, 77, 255, 0.1)',
          color: '#9E7BFF',
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </Router>
  );
}

export default App; 