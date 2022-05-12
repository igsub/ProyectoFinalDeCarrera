import React from "react"
import { Redirect, Route } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const PrivateRoute = ({ children, ...rest }) => {
	const { isAuthenticated, loginWithRedirect } = useAuth0()
	const isLoggedIn = isAuthenticated || localStorage.getItem("token") !== null

	return (
		<Route
			{...rest}
			render={({ location }) => {
				if (isLoggedIn ) {
					return children
				} else {
					window.localStorage.setItem("callbackURL", window.location.pathname)
					loginWithRedirect()
					// return <Redirect
					// 	to={{
					// 		pathname: "/",
					// 		state: { from: location },
					// 	}}
					// />
				}
				}
			}
		/>
	)
}
export default PrivateRoute
