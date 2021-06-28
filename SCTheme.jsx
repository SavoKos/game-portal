import React from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: 'rgb(7, 4, 38)',
    primaryOpacity90: 'rgba(7, 4, 38, 0.9)',
    primaryOpacity50: 'rgba(7, 4, 38, 0.5)',
    primaryLight: '#201e3c',
    primaryLighter: '#090526',
    seaBlue: '#35bfff',
  },
  fontFamily: {
    poppins:
      'Poppins,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
    raleway:
      'Raleway,Poppins,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif',
  },
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
