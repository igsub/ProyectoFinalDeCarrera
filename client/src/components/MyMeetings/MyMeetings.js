import React, { useState, useEffect } from 'react'
import userService from '../../Services/userService'
import { useAuth0 } from '@auth0/auth0-react'
import { Grid } from '@material-ui/core'

const MyMeetings = () => {
    const { user } = useAuth0()
    const [meetings, setMeetings] = useState([])

    useEffect(() => {
        userService.getAllUserMeetings(user.email)
            .then(response => setMeetings(response))
            .catch(error => console.log(error))
    }, [])

    return (
        <Grid container>{meetings.length}</Grid>
    )
}

export default MyMeetings