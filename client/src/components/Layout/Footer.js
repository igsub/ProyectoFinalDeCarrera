import { makeStyles, Typography, Grid } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        padding: "1rem",
        alignSelf: "flex-end",
        textAlign: "end"
    },
    link: {
        color: "#f50057"
    }
})

const Footer = () => {
    const classes = useStyles()
    return (
            <div className={classes.root}>
                <Typography variant='subtitle2'><Link className={classes.link} to={ {pathname: "https://github.com/igsub/ProyectoFinalDeCarrera"}} target="_blank">Page</Link> created by</Typography>
                <Typography variant='caption'>Dimatz Juan and Suburu Ignacio</Typography>
            </div>
    )
}

export default Footer