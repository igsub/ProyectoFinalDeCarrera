import { Button, Box, Typography } from "@material-ui/core"
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
import moment from "moment";

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
	}
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
				history.push({ pathname: `/meet/${meetId}`, state: { from: "meetform" } })
			})
			.catch((error) => console.log(error))
	}

	return (
		<Page showBack={true} title="Dates Selection">
			<Box className={classes.form}>
				
					{meetState.weather && meetState.weather.length > 0 ? 
						<Box>
							<WeatherCards />
						</Box>
					: null}
					{meetState.weather && meetState.weather.length > 0 ? 
						<Typography variant="subtitle2" style={{marginBottom: "1rem", marginLeft: "1rem", marginRight: "1rem"}}>
							{`The weather forecast is available until the ${moment(moment().add("day", 5)).format("dddd D [of] MMMM[,] YYYY")}. Selections beyond that date will not take the weather into account.`}
						</Typography>
					: null}
				
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
