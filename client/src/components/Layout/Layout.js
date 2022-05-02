import { makeStyles } from '@material-ui/core'
import React from 'react'
import NavBar from '../General/NavBar'
import Footer from './Footer'

const useStyles = makeStyles({
    page: {
        background: "#ffe1e100",
        width: "100%",
        height: "100vh"
    }
})

const Layout = ({children}) => {
    const classes = useStyles()
    return (    
        
        <div className={classes.page}>
            <NavBar />
            {children}
            <Footer />
        </div>
  )
}

export default Layout
