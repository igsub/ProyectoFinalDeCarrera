import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const PrivateRoute = ({ children, ...rest }) => {
    const { isAutenticated } = useAuth0();
    
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAutenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
export default PrivateRoute;