import { BrowserRouter, Route, Switch } from "react-router-dom"
import LoginView from "./components/login/LoginView"
import Meetform from "./components/meet/Meetform"
import MeetRoute from "./MeetRoute"


const Routes = () => {
    
    
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route exact path="/" component={LoginView} /> */}
                <MeetRoute component={LoginView} path="/" needAutentication={false} />
                <MeetRoute component={Meetform} path="/new-meet" needAutentication={true}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;

// import React from "react";
// import { Switch, Redirect, BrowserRouter as Router } from "react-router-dom";
// import LibritRoute from "Shared/Components/LibritRoute/LibritRoute";
// import { SectionType } from "Core/Security/SectionType";
// import { ActionType } from "Core/Security/ActionType";
// import Dashboard from "Views/Dashboard";
// import Roles from "Views/Roles";
// import Users from "Views/Users";
// import MyAccount from "Views/MyAccount";
// import Login from "Views/Login/Login";
// import Settings from "Views/Settings/Settings";
// import NotFound from "Views/Errors/NotFound";
// import RecoverPassword from "Views/Login/Components/RecoverPassword";
// import ActivateAccount from "Views/Login/Components/ActivateAccount";
// import NotAuthorize from "Views/Errors/NotAuthorize";
// import Notifications from "Views/Notifications";
// import MyNotifications from "Views/MyNotifications";
// import MarketOrders from "Views/MarketOrders";
// import DataUpdates from "Views/DataUpdates";

// /**
//  * Routing component used to configure the main views of the app 
//  */
// const Routes = () => (
//   <Router>
//     <Switch>
//       <Redirect exact from="/" to="/dashboard" />
//       <LibritRoute component={Dashboard} exact path="/dashboard" />
//       <LibritRoute component={Roles} exact isProtected={true} path="/roles/:id?" section={SectionType.Roles} />
//       <LibritRoute component={Users} exact isProtected={true} path="/users/:id?" section={SectionType.Users} />
//       <LibritRoute component={Settings} exact isProtected={true} path="/settings" section={SectionType.Settings} />
//       <LibritRoute component={Login} exact isProtected={false} path="/login" />
//       <LibritRoute component={ActivateAccount} exact isProtected={false} path="/activate" />
//       <LibritRoute component={RecoverPassword} exact isProtected={false} path="/recover" />
//       <LibritRoute component={NotFound} exact path="/not-found" isProtected={false} />
//       <LibritRoute component={NotAuthorize} exact path="/not-authorize" isProtected={false} />
//       <LibritRoute component={MyAccount} exact isProtected={true} path="/myaccount" />
//       <LibritRoute component={Notifications} exact isProtected={true} path="/notifications/:id?" section={SectionType.Notifications} action={ActionType.Send} />
//       <LibritRoute component={MyNotifications} exact isProtected={true} path="/mynotifications/:id?" />
//       <LibritRoute component={MarketOrders} exact isProtected={true} path="/marketorders/:id?" />
//       <LibritRoute component={DataUpdates} exact isProtected={true} path="/dataupdates/:entityType" />
//       <Redirect to="/not-found" />
//     </Switch>
//   </Router>
// );

// export default Routes;