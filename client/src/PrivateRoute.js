import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuth0();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          isAuthenticated? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
export default PrivateRoute;