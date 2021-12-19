import { BrowserRouter, Route, Switch } from "react-router-dom"
import Meetform from "./components/meet/Meetform"
import Home from "./components/home/Home"
import PrivateRoute from "./PrivateRoute"
import Step1 from "./components/Step1/Step1"


const Routes = () => {
    
    
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path="/meetform">
                    <Meetform />
                </PrivateRoute>
                <Route path="/step1">
                    <Step1 />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;