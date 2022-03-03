import { Box, TextField } from "@material-ui/core"
import Page from "../general/Page"
import GoogleAutocomplete from "../googlemap/GoogleAutocomplete"
import { useSelector } from "react-redux"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import TitleIcon from "@material-ui/icons/Title"
import EventNoteIcon from "@material-ui/icons/EventNote"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
	root: {},
	textfieldContainer: {
		margin: "0.4rem",
		width: "50%",
	},
	textfield: {
		width: "100%",
	},
	button: {
		margin: "1rem",
	},
	map: {
		height: "60vh",
		width: "50%",
		margin: "10px 50px",
		filter: "drop-shadow(-1px 5px 3px #ccc)",
	},
	switchWeather: {
		justifyContent: "start",
	},
}))

const MeetStatus = () => {
	const meetState = useSelector((state) => state.meet)
	const classes = useStyles()

	return (
		<>
			<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center'>
				<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
					<TitleIcon style={{ fill: "darkgrey" }} />
					<TextField
						variant='standard'
						label='Título'
						className={classes.textfield}
						InputProps={{
							readOnly: true,
						}}
						value={meetState.title}
					/>
				</Box>
				<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
					<EventNoteIcon style={{ fill: "darkgrey" }} />
					<TextField
						variant='standard'
						label='Notas adicionales'
						className={classes.textfield}
						InputProps={{
							readOnly: true,
						}}
						value={meetState.description}
					/>
				</Box>
				{meetState.location ? (
					<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
						<LocationOnIcon style={{ fill: "darkgrey" }} />
						<TextField
							variant='standard'
							label='Ubicación'
							className={classes.textfield}
							InputProps={{
								readOnly: true,
							}}
							value={meetState.location.address}
						/>
					</Box>
				) : null}
			</Page>
		</>
	)
}

export default MeetStatus
