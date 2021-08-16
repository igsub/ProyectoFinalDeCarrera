import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import LoginView from "./components/login/LoginView"
import Meetform from "./components/meet/Meetform"
import MeetRoute from "./MeetRoute"


const Routes = () => {
    
    
    return (
        <BrowserRouter>
            <Switch>
                {/* <Redirect from="/" to="/about" /> */}
                {/* <MeetRoute component={About} path="/" appProps={{needAutentication: false}} /> */}
                <MeetRoute component={LoginView} path="/login" appProps={{needAutentication: false}} />
                <MeetRoute component={Meetform} path="/meet" appProps={{needAutentication: true}}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;