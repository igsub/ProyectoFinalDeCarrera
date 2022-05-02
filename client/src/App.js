import { Auth0Provider } from "@auth0/auth0-react";
import {
  createTheme, CssBaseline, ThemeProvider
} from "@material-ui/core";
import "./App.css";
import Routes from "./Routes";

function App() {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const theme = createTheme();

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;
