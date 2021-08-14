import './App.css';
import Meetform from './components/meet/Meetform';
import NavBar from './components/general/NavBar';
import { useState } from 'react';
import {
  
  Paper,
  Switch,
  
  createTheme,
  ThemeProvider,
  CssBaseline
} from '@material-ui/core'

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
        <NavBar></NavBar>
        <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        <Meetform></Meetform>
      </Paper>
    </ThemeProvider>
    // <Meetform></Meetform>
  );
}

export default App;