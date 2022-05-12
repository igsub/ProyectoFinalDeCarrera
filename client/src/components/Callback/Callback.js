import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"

const Callback = () => {
    const { isAuthenticated } = useAuth0()
    const history = useHistory()
    const redirectURL = window.localStorage.getItem("callbackURL")

    useEffect(() => { 
        if (isAuthenticated) {
            history.push(redirectURL)
        } 
    }, [isAuthenticated])

  return (
    <></>
  )
}

export default Callback