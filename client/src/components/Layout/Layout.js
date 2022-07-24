import { makeStyles, Grid, Paper } from '@material-ui/core'
import React from 'react'
import NavBar from '../General/NavBar'
import Footer from './Footer'

const useStyles = makeStyles({
    page: {
        background: "linear-gradient(180deg, rgba(232,232,232,0.4318102240896359) 40%, rgba(240,98,146,0.3054516806722689) 100%)",
        width: "100%",
        //overflowY: "scroll"
    },
    footerContainer: {
        display: "flex",
        flexDirection: "row-reverse"
    },
    paper: {
        padding: "2rem"
    }
})

const Layout = ({children}) => {
    const classes = useStyles()
    return (    
        
        // <div className={classes.page}>
            <Grid container spacing={0} className={classes.page} justifyContent="center">
                <Grid item xs={12}>
                    <NavBar />
                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    {/* <Paper elevation={2} className={classes.paper}>
                        {children}
                    </Paper> */}
                    {children}
                </Grid>
                <Grid item xs={12} className={classes.footerContainer}>
                    <Footer />
                </Grid>
            </Grid>
        
            
        //</div>
  )
}

export default Layout
