import { makeStyles, Grid, Paper } from '@material-ui/core'
import React from 'react'
import NavBar from '../General/NavBar'
import Footer from './Footer'
import { isMobile } from 'react-device-detect'

const MOBILE_MAIN_CONTAINER_HEIGTH = window.screen.height - 140 // navbar + footer
const DESKTOP_MAIN_CONTAINER_HEIGTH = window.screen.height - 172

const useStyles = makeStyles({
    page: {
        width: "100%",
        overflowY: "auto",
        //minHeight: isMobile ? MOBILE_MAIN_CONTAINER_HEIGTH : DESKTOP_MAIN_CONTAINER_HEIGTH,
        display: "flex",
        justifyContent: "center"
    },
    footerContainer: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    paper: {
        padding: "2rem"
    }
})

const Layout = ({children}) => {
    const classes = useStyles()
    return (    
        <Grid container spacing={0} className={classes.page} justifyContent="center">
            <Grid item xs={12}>
                <NavBar />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                {children}
            </Grid>
            <Grid item xs={12} className={classes.footerContainer}>
                <Footer />
            </Grid>
        </Grid>
  )
}

export default Layout
