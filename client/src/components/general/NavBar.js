import { useAuth0 } from "@auth0/auth0-react"
import { Avatar, Button } from "@material-ui/core"
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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	appbar: {
		boxShadow: 'none', 
	},
	toolbar: {
		display: "flex",
		justifyContent: "end"
	},
	name: {
		fontWeight: "600",
		marginRight: "1rem",
	}
}))

export default function NavBar() {
	const { loginWithRedirect } = useAuth0()
	const dispatch = useDispatch()
	const userState = useSelector((state) => state.user)
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)
	const { user, logout } = useAuth0()
	const name = user?.name
	const picture = user?.picture

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

	return (
		<div className={classes.root}>
			<AppBar position='static' color="transparent" elevation={0} >
				<Toolbar className={classes.toolbar}>
					{user ? (
						<div>
							<IconButton className={classes.iconButton} aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleMenu} color='inherit'>
								<Typography className={classes.name}>{name}</Typography>
								<Avatar src={picture} />
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
								<MenuItem onClick={handleLogout}><Typography>Log out</Typography></MenuItem>
							</Menu>
						</div>
					) : (
						<Button color="secondary" variant="contained" onClick={loginWithRedirect}>Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}
