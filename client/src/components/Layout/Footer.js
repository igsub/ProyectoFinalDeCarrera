import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
    root: {
        position: "fixed",
        bottom: 0,
        padding: "1rem"
    },
    link: {
        color: "#f50057"
    }
})

const Footer = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Typography variant='subtitle2'><Link className={classes.link} to={ {pathname: "https://github.com/igsub/ProyectoFinalDeCarrera"}} target="_blank">Pagina</Link> creada con fines educativos</Typography>
            <Typography variant='caption'>Dimatz Juan y Suburu Ignacio</Typography>
        </div>
    )
}

export default Footer