import { BrowserRouter, Route, Switch } from "react-router-dom"
import Meetform from "./Components/Meet/Meetform"
import Home from "./Components/Home/Home"
import PrivateRoute from "./PrivateRoute"
import Step1 from "./Components/Step1/Step1"
import MeetStatus from "./Components/Meet/MeetStatus"
import Invited from "./Components/Meet/Invited"
import Layout from "./Components/Layout/Layout"
import Callback from "./Components/Callback/Callback"

const Routes = () => {
	return (
		<BrowserRouter>
			<Layout>
				<Switch>
					<PrivateRoute path='/meetform'>
						<Meetform />
					</PrivateRoute>
					<PrivateRoute path={"/meetinvitation/:id"}>
						<Invited />
					</PrivateRoute>
					<PrivateRoute path='/meet/:id?'>
						<MeetStatus />
					</PrivateRoute>
					<PrivateRoute path='/step1'>
						<Step1 />
					</PrivateRoute>
					<Route path={"/callback"}>
						<Callback />
					</Route>
					<Route path='/'>
						<Home />
					</Route>
				</Switch>
			</Layout>
		</BrowserRouter>
	)
}

export default Routes
