import { Typography, Grid, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { motion } from "framer-motion/dist/framer-motion"
import { useHistory } from "react-router-dom"
import { ArrowBackIos } from "@material-ui/icons"

const Page = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			alignItems: "center",
			alignContent: "center",
			marginBottom: "2rem",
		},
		backArrowButton: {
			position: "absolute",
			left: "15%",
			top: "50%",
		},
		arrowIcon: {
			transform: "scale(1.8)",
		},
	}))

	const history = useHistory()
	const classes = useStyles()

	return (
		<motion.div className={classes.root} initial={{ width: 0 }} animate={{ width: "100%" }} exit={{ x: window.innerWidth, transition: { duration: 0.1 } }}>
			<Typography variant='h6'>{props.title ? props.title : null}</Typography>
			{props.children}
			{props.showBack ? (
				<IconButton onClick={() => history.goBack()} className={classes.backArrowButton} size='large'>
					<ArrowBackIos className={classes.arrowIcon} />
				</IconButton>
			) : null}
		</motion.div>
	)
}

export default Page
