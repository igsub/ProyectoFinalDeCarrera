import { Route } from "react-router-dom";
import LoginView from "./components/login/LoginView";
import { useAuth0 } from "@auth0/auth0-react";


const MeetRoute = (path, component, needAutentication) => {
    
    const { isAutenticated } = useAuth0(); 
    const newPath = isAutenticated? path: needAutentication? "/": path ;
    const newComponent = isAutenticated? { ...component }: needAutentication? LoginView: { ...component } ;
    console.log(
        newComponent,
        newPath
    )
    return (
        <Route exact path={newPath} component={newComponent} />
    );
    
}

export default MeetRoute;


// import React from "react";
// import { Route, Redirect, RouteProps } from "react-router-dom";
// import MainLayout from "Layouts/MainLayout";
// import MinimalLayout from "Layouts/MinimalLayout";
// import securityService from "Core/Security/SecurityService";
// import { SectionType } from "Core/Security/SectionType";
// import { ActionType } from "Core/Security/ActionType";
// import pushNotificationService from "Core/Messaging/PushNotificationService";
// import pushNotificationApi from "Shared/Services/PushNotificationApi";
// import { UserProvider } from "Shared/Contexts/UserContext";
// export interface LibritRouteProps extends RouteProps {
//   isProtected?: boolean;
//   section?: SectionType;
//   action?: ActionType | string;
// }

// /**
//  * Represent a Route in the app
//  * @param props
//  */
//  const LibritRoute = (props: LibritRouteProps) => {
//     const { isProtected = true, path, component: Component, section, action, ...rest } = props;
//     const isOnlyAllowedIsNotAuthenticate = ["/login", "/recover", "/activate"].includes(path as string);
  
//     const canNavigate = ({ match }) => {
//       // Note: The order in wich the conditions are evaluated are important. The route more specific have to be evaluated before.
//       if (!section) return true;
//       if (action) return securityService.isAuthorized(section, action);
//       if (match.params && match.params.id === "new") return securityService.isAuthorized(section, ActionType.Create);
//       if (match.params && match.params.id) return securityService.isAuthorized(section, ActionType.Read);
//       return securityService.isAuthorized(section, ActionType.List);
//     };
  
//     /**
//      * Render or not a route based on permissions
//      * @param matchProps
//      */
//     const renderLibritRoute = (matchProps) => {
//       const isAuthenticated = securityService.isAuthenticated();
//       const isAuthorized = isAuthenticated && canNavigate(matchProps);
  
//       if (isAuthorized) {
//         pushNotificationService.initialize(pushNotificationApi.save.bind(pushNotificationApi));
//       }
  
//       return isAuthorized && isOnlyAllowedIsNotAuthenticate ? (
//         <Redirect to={{ pathname: "/", state: { from: window.location.pathname } }} />
//       ) : isAuthorized && isProtected ? (
//         <UserProvider>
//           <MainLayout>
//             <Component {...matchProps} />
//           </MainLayout>
//         </UserProvider>
//       ) : !isProtected ? (
//         <MinimalLayout>
//           <Component {...matchProps} />
//         </MinimalLayout>
//       ) : isAuthenticated && !isAuthorized ? (
//         <Redirect to={{ pathname: "/not-authorize", state: { from: window.location.pathname } }} />
//       ) : (
//         <Redirect to={{ pathname: "/login", state: { from: window.location.pathname } }} />
//       );
//     };
  
//     return <Route {...rest} render={renderLibritRoute} />;
//   };
  
//   export default LibritRoute;
  