import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e77d11',
      contrastText: '#6E4B20'
    },
    secondary: {
      main: '#ffd59a',
      contrastText: '#6E4B20'
    },
    text: {
      primary: '#551c02',
      secondary: '#9B8D75'
    },
    background: {
      default: '#e77d11'
    }
    // #f0e7e7 	(240,231,231)
	// #451804 	(69,24,4)
	// #c1440e 	(193,68,14)
	// #e77d11 	(231,125,17)
	// #fda600 	(253,166,0)
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

