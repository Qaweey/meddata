import { extendTheme, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const colors = {
  brand: {
    900: '#ed8936',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
