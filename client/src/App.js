import './App.css';
import NavBar from './components/general/NavBar';
import { useState } from 'react';
import {
  Paper,
  Switch,
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@material-ui/core'
import Routes from './Routes';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper style={{ height: '100vh' }}>
        <NavBar/>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Routes />
      </Paper>
    </ThemeProvider>
  );
}

export default App;