import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF9500',
      contrastText: '#6E4B20'
    },
    secondary: {
      main: '#ffd59a',
      contrastText: '#6E4B20'
    },
    text: {
      primary: '#6E4B20',
      secondary: '#9B8D75'
    },
    background: {
      default: '#FF9500'
    }
    //top teksti #6f5128
    //background #ffd59a
    //uusi background #d7a662
    //uusi teksti #574421
    //2 background #d78e41
    // secondary: {
    //   light: '#ffffff',
    //   main: '#f9fbe7',
    //   dark: '#c6c8b5',
    //   contrastText: '#000000',
    // },
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

