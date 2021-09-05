import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import Meetform from "./components/meet/Meetform"
import Home from "./components/home/Home"
import PrivateRoute from "./PrivateRoute"


const Routes = () => {
    
    
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/meetform">
                    <Meetform />
                </PrivateRoute>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;