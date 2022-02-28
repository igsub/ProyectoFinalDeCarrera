import { Redirect, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const MeetRoute = ({ component: Comp, appProps, ...rest }) => {
  const { isAutenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={(props) =>
        appProps.needAutentication ? (
          isAutenticated ? (
            <Comp {...props} {...appProps} />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <Comp {...props} {...appProps} />
        )
      }
    />
  );
};

export default MeetRoute;
