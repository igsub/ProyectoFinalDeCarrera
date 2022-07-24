import { Button, Box } from "@material-ui/core"
import { useEffect, useState } from "react"
import Meetcalendar from "./Meetcalendar"
import Timelist from "./Timelist"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector } from "react-redux"
import WeatherCards from "./WeatherCards"
import meetingService from "../../Services/meetingService"
import { useHistory } from "react-router-dom"
import Page from "../General/Page"
import { isMobile } from "react-device-detect"

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
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	submitButton: {
		display: "flex",
		alignSelf: "center",
		paddingTop: "2rem",
	},
	nextPrev: {
		display: "flex",
		justifyContent: "flex-end",
	},
	calendar: {
		display: "flex",
		flexDirection: "row",
	},
	mobileCalendar: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center" 
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
	const userState = useSelector((state) => state.user)
	const history = useHistory()

	useEffect(() => {}, [selectedDate])

	const handleSubmit = (event) => {
		event.preventDefault()
		const formattedDatetimes = meetState.datetimes.map((e) => {
			return { date: e.date, timeslots: e.times }
		})
		meetingService
			.addMeeting({
				title: meetState.title,
				ownerEmail: userState.email,
				description: meetState.description,
				location: meetState.location,
				weather: meetState.weather,
				weatherMatters: meetState.weatherMatters,
				datetimesByUser: [{ email: userState.email, datetimes: formattedDatetimes }],
			})
			.then((response) => {
				const meetId = response.data._id
				history.push(`/meet/${meetId}`)
			})
			.catch((error) => console.log(error))
	}

	return (
		<Page showBack={true}>
			<Box className={classes.form}>
				<div></div>
				<Box className={classes.weatherCards}>
					{meetState.weather && meetState.weather.length > 0 ? <WeatherCards /> : null}
				</Box>
				<Box className={isMobile ? classes.mobileCalendar : classes.calendar}>
					<Meetcalendar setSelectedDate={setSelectedDate} />
					<Timelist />
				</Box>
				<Box className={classes.submitButton}>
					<Button variant='contained' color='secondary' onClick={handleSubmit}>
						Crear
					</Button>
				</Box>
			</Box>
		</Page>
	)
}

export default Meetform
