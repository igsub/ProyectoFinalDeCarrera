import { Button, Box } from "@material-ui/core"
import { useEffect, useState } from "react"
import datetimesService from "../../services/datetimesService"
import Meetcalendar from "./Meetcalendar"
import Timelist from "./Timelist"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import WeatherCards from "./WeatherCards"

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		flexWrap: "wrap",
	},
	form: {
		display: "flex",
		borderRadius: "8px",
		//backgroundColor: "lightgray",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
		margin: "2rem",
		padding: "2rem",
	},
	submitButton: {
		display: "flex",
		alignSelf: "center",
		padding: "2rem",
	},
	nextPrev: {
		display: "flex",
		justifyContent: "flex-end",
	},
	calendar: {
		display: "flex",
		flexDirection: "row",
	},
	switchWeather: {
		marginTop: "1rem",
	},
	weatherCards: {
		display: "flex",
		flexDirection: "row",
		marginBottom: "2rem",
	},
}))

const Meetform = () => {
	const classes = useStyles()
	const [selectedDate, setSelectedDate] = useState({})
	const meetState = useSelector((state) => state.meet)

	useEffect(() => {}, [selectedDate])

	const handleSubmit = (event) => {
		event.preventDefault()
		//datetimesService.addNewDatetime({meetId: uuidv4(), userId: "da", start: 3, end:5, description: "ddescripcion larga"})
	}

	return (
		<Box className={classes.root}>
			<form onSubmit={handleSubmit} className={classes.form}>
				<div></div>
				<Box className={classes.weatherCards}>{meetState.weather && meetState.weather.length > 0 ? <WeatherCards /> : null}</Box>
				<Box className={classes.calendar}>
					<Meetcalendar setSelectedDate={setSelectedDate} />
					<Timelist />
				</Box>
				<Box className={classes.submitButton}>
					<Button type='submit' variant='contained' color='primary'>
						Crear
					</Button>
				</Box>
			</form>
		</Box>
	)
}

export default Meetform
