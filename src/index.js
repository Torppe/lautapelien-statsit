import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffc046',
      main: '#ff8f00',
      dark: '#c56000',
      contrastText: '#000000',
    },
    secondary: {
      light: '#ffffff',
      main: '#f9fbe7',
      dark: '#c6c8b5',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Arial'
    ]
  },
})

ReactDOM.render(
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
, document.getElementById('root'));

