import { BrowserRouter, Route, Switch } from "react-router-dom"
import Meetform from "./Components/Meet/Meetform"
import Home from "./Components/Home/Home"
import PrivateRoute from "./PrivateRoute"
import Step1 from "./Components/Step1/Step1"
import MeetStatus from "./Components/Meet/MeetStatus"
import Invited from "./Components/Meet/Invited"

const Routes = () => {
	return (
		<BrowserRouter>
			<Switch>
				<PrivateRoute path='/meetform'>
					<Meetform />
				</PrivateRoute>
				<Route path={"/meetinvitation/:id?"}>
					<Invited />
				</Route>
				<PrivateRoute path='/meet/:id?'>
					<MeetStatus />
				</PrivateRoute>
				<PrivateRoute path='/step1'>
					<Step1 />
				</PrivateRoute>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		</BrowserRouter>
	)
}

export default Routes
