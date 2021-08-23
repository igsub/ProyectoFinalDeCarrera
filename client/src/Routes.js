import { BrowserRouter, Redirect, Switch } from "react-router-dom"
import LoginView from "./components/login/LoginView"
import Meetform from "./components/meet/Meetform"
import MeetRoute from "./MeetRoute"
import Home from "./components/home/Home"


const Routes = () => {
    
    
    return (
        <BrowserRouter>
            <Switch>
                <Redirect from="/" to="/home" />
                <MeetRoute component={Home} path="/home" appProps={{needAutentication: false}} />
                <MeetRoute component={LoginView} path="/login" appProps={{needAutentication: false}} />
                <MeetRoute component={Meetform} path="/meet" appProps={{needAutentication: true}}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;