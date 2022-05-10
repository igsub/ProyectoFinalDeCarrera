import { makeStyles } from '@material-ui/core'
import React from 'react'
import NavBar from '../General/NavBar'
import Footer from './Footer'

const useStyles = makeStyles({
    page: {
        background: "linear-gradient(180deg, rgba(232,232,232,0.4318102240896359) 40%, rgba(240,98,146,0.3054516806722689) 100%)",
        width: "100%",
        height: "100vh",
        overflowY: "scroll"
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
