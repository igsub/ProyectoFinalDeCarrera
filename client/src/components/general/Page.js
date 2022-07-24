import { Typography, Grid, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { motion } from "framer-motion/dist/framer-motion"
import { useHistory } from "react-router-dom"
import { ArrowBackIos } from "@material-ui/icons"
import { isMobile } from "react-device-detect"

const Page = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			alignContent: "center"
		},
		backArrowButton: {
			position: "absolute",
			left: "10%",
			top: "50%",
		},
		backArrowButtonMobile: {
			position: "fixed",
			bottom: "0px",
			left: "0px",
			padding: "1.5rem",
			color: theme.palette.secondary.main
		},
		arrowIcon: {
			transform: "scale(1.8)",
		},
		titleContainer: {
			alignSelf: "start"
		},
		title: {
			textAlign: "left"
		}
	}))

	const history = useHistory()
	const classes = useStyles()

	return (
		<motion.div className={classes.root} initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
			<Grid container>
				<Grid item className={classes.titleContainer}>
					<Typography variant='h6' className={classes.title}>{props.title ? props.title : null}</Typography>
				</Grid>
			</Grid>
			{props.children}
			{props.showBack? (
				<IconButton onClick={() => history.goBack()} className={isMobile ? classes.backArrowButtonMobile : classes.backArrowButton} size='large'>
					<ArrowBackIos className={classes.arrowIcon} />
				</IconButton>
			) : null}
		</motion.div>
	)
}

export default Page
