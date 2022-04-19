import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import { useAuth0 } from "@auth0/auth0-react"
import userService from "../../Services/userService"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { Avatar } from "@material-ui/core"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../../Store/userSlice"
import { Button } from "@material-ui/core"

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
		const path = window.location.protocol + "//" + window.location.host
		console.log(path)
		logout({ returnTo: path })
	}

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						MeetAPP
					</Typography>
					{user ? (
						<div>
							{name}
							<IconButton aria-label='account of current user' aria-controls='menu-appbar' aria-haspopup='true' onClick={handleMenu} color='inherit'>
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
								<MenuItem onClick={handleClose}>Profile</MenuItem>
								<MenuItem onClick={handleClose}>My account</MenuItem>
								<MenuItem onClick={handleLogout}>Log out</MenuItem>
							</Menu>
						</div>
					) : (
						<Button onClick={loginWithRedirect}>Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}
