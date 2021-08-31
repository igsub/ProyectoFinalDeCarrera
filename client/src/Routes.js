import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import LoginView from "./components/login/LoginView"
import Meetform from "./components/meet/Meetform"
import Home from "./components/home/Home"
import PrivateRoute from "./PrivateRoute"


const Routes = () => {
    
    
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
                <PrivateRoute path="meetform">
                    <Meetform />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;