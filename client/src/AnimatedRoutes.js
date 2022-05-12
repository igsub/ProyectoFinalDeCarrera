import React from 'react'
import Meetform from "./Components/Meet/Meetform"
import Home from "./Components/Home/Home"
import PrivateRoute from "./PrivateRoute"
import Step1 from "./Components/Step1/Step1"
import MeetStatus from "./Components/Meet/MeetStatus"
import Invited from "./Components/Meet/Invited"
import Callback from "./Components/Callback/Callback"
import { Route, Switch, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion/dist/framer-motion"

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence initial>
            <Switch location={location} key={location.pathname}>
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
        </AnimatePresence>
    )
}

export default AnimatedRoutes