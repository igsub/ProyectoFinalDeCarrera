import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, Box, Button, Grid } from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import userService from "../../Services/userService"
import { setUser } from "../../Store/userSlice"
import logo from "../../Images/MeetApp-logos_black.png"
import { useHistory } from "react-router-dom"
import CircularProgress from "@material-ui/core/CircularProgress"
import { isMobile } from "react-device-detect"

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	appbar: {
		boxShadow: "none",
	},
	toolbar: {
		display: "flex",
	},
	name: {
		fontWeight: "600",
		marginRight: "1rem",
	},
	logo: {
		maxWidth: "15rem",
		width: "30vw",
		padding: theme.spacing(2),
	},
	logoMobile: {
		maxWidth: "15rem",
		width: "35vw",
		padding: theme.spacing(2),
	},
	iconButton: {
		fontSize: "min(3vw, 20px)",
	},
	userContainer: {
		padding: "1rem",
	},
}))

export default function NavBar() {
	const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0()
	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const { user, logout } = useAuth0()
	const name = user?.name
	const picture = user?.picture
	const history = useHistory()
	const [isHomePage, setIsHomePage] = useState(history.location.pathname === "/")

	useEffect(() => {
		if (user) {
			userService
				.login({ name: user.name, email: user.email })
				.then((response) => {
					localStorage.setItem("token", response.data?.token)
					dispatch(
						setUser({
							...userState,
							token: response.data?.token,
							email: user.email,
							firstName: user.given_name,
							lastName: user.family_name,
							fullName: user.name,
						})
					)
				})
				.catch((error) => console.log(error))
		}
	}, [user])

	useEffect(() => {
		return history.listen((location) => {
			setIsHomePage(location.pathname === "/")
		})
	}, [history])

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const handleLogout = () => {
		localStorage.removeItem("token")
		const path = window.location.protocol + "//" + window.location.host
		logout({ returnTo: path })
	}

	const handleLogIn = () => {
		setAnchorEl(null)
		localStorage.setItem("callbackURL", window.location.pathname)
		loginWithRedirect()
	}

	const handleMyMeetings = () => {
		setAnchorEl(null)
		history.push("/mymeetings")
	}

	return (
		<Box className={classes.root}>
			<AppBar position='static' color='transparent' elevation={0}>
				<Toolbar>
					<Grid container justifyContent='space-between' alignContent="center">
						<Grid item>
							{!isHomePage && isAuthenticated ? (
								<a href={`${window.location.protocol}//${window.location.host}`}>
									<img alt='meet-app' src={logo} className={isMobile ? classes.logoMobile : classes.logo} />
								</a>
							) : null}
						</Grid>
						<Grid item>
							<div className={isMobile ? null : classes.userContainer}>
								{user ? (
									<>
										<IconButton className={classes.iconButton} aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleMenu} color='inherit'>
											{isMobile ? null : <Typography className={classes.name}>{name}</Typography> }
											<Avatar src={picture}/>
										</IconButton>

										<Menu
											id='menu-appbar'
											anchorEl={anchorEl}
											anchorOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											keepMounted
											transformOrigin={{
												vertical: "top",
												horizontal: "right",
											}}
											open={open}
											onClose={handleClose}
										>
											<MenuItem key="option-mymeetings" onClick={handleMyMeetings}>
												<Typography>My Meetings</Typography>
											</MenuItem>
											<MenuItem key="option-logout" onClick={handleLogout}>
												<Typography>Log out</Typography>
											</MenuItem>
										</Menu>
									</>
								) : isLoading ? (
									<CircularProgress color='secondary' />
								) : (
									<Button color='secondary' variant='contained' onClick={handleLogIn}>
										Log in
									</Button>
								)}
							</div>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</Box>
	)
}
