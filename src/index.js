import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      // main: '#e77d11',
      main: '#d88833',
      contrastText: '#6E4B20'
    },
    secondary: {
      main: '#ffd59a',
      contrastText: '#6E4B20'
    },
    text: {
      primary: '#663E11',
      secondary: '#9B8D75'
    },
    background: {
      default: '#d88833'
    }
    //#551c02 teksti primary
  },
  typography: {
    fontFamily: [
      'Arvo',
      'serif',
    ].join(','),
  },
})

ReactDOM.render(
<ThemeProvider theme={theme}>
  <App />
</ThemeProvider>
, document.getElementById('root'));

