import './App.css';
import NavBar from './components/general/NavBar';
import { useState } from 'react';
import { Auth0Provider } from "@auth0/auth0-react";
import {
  Paper,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@material-ui/core'
import Routes from './Routes';

function App() {
  
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const theme = createTheme({
    palette: {
      type: 'dark',
    },
  });

  return (
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper style={{ height: '100vh' }}>
          <NavBar/>
          <Routes />
        </Paper>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;