import { Box, Button, Switch, TextField } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import EventNoteIcon from "@material-ui/icons/EventNote"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import TitleIcon from "@material-ui/icons/Title"
import FormControlLabel from "@mui/material/FormControlLabel"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import "../../App.css"
import weatherService from "../../Services/weatherService"
import { setMeet } from "../../Store/meetSlice"
import Page from "../General/Page"
import GoogleAutocomplete from "../Googlemap/GoogleAutocomplete"
import MyGoogleMap from "../Googlemap/MyGoogleMap"

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

const Step1 = () => {
	const dispatch = useDispatch()
	const meetState = useSelector((state) => state.meet)

	const classes = useStyles()
	const [meetDescription, setMeetDescription] = useState("")
	const [meetTitle, setMeetTitle] = useState("")
	const [weatherMatters, setWeatherMatters] = useState(false)

	const [mapState, setMapState] = useState({
		mapApiLoaded: false,
		mapInstance: null,
		mapApi: null,
		geoCoder: null,
		places: [],
		center: [-38.7135817, -62.2509458],
		zoom: 12,
		address: "",
		draggable: true,
		lat: -38.7135817,
		lng: -62.2509458,
	})

	const [autocompleteState, setAutocompleteState] = useState({
		value: null,
		inputValue: null,
		options: [],
	})

	const onClick = () => {
		// let newMeeting = {
		// 	title: meetTitle,
		// 	description: meetDescription,
		// 	location: {
		// 		lat: mapState.lat.toString(),
		// 		lng: mapState.lng.toString(),
		// 		address: autocompleteState.inputValue,
		// 	},
		// }

		if (weatherMatters) {
			let weatherValues = []
			weatherService
				.getWeatherByDate({
					lat: mapState.lat.toString(),
					lon: mapState.lng.toString(),
				})
				.then((response) => {
					weatherValues = response.data.list.map((d) => {
						let newDT = {
							main: d.main,
							datetime: d.dt_txt,
							weather: d.weather,
						}
						return newDT
					})
					//newMeeting.weather = weatherValues
					dispatch(
						setMeet({
							...meetState,
							weather: weatherValues,
							weatherMatters: true,
							title: meetTitle,
							description: meetDescription,
							location: {
								lat: mapState.lat,
								lng: mapState.lng,
								address: autocompleteState.inputValue,
							},
						})
					)
				})
				.catch((e) => console.log(e))

			
		} else {
			dispatch(
				setMeet({
					...meetState,
					title: meetTitle,
					weatherMatters: false,
					description: meetDescription,
					location: {
						lat: mapState.lat,
						lng: mapState.lng,
						address: autocompleteState.inputValue,
					},
				})
			)
		}

		//meetingService.addMeeting(newMeeting)
	}

	return (
		<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center'>
			<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
				<TitleIcon style={{ fill: "darkgrey" }} />
				<TextField variant='standard' label='Título' className={classes.textfield} onChange={(e) => setMeetTitle(e.target.value)} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
				<EventNoteIcon style={{ fill: "darkgrey" }} />
				<TextField variant='standard' label='Notas adicionales' className={classes.textfield} onChange={(e) => setMeetDescription(e.target.value)} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
				<LocationOnIcon style={{ fill: "darkgrey" }} />
				<GoogleAutocomplete mapState={mapState} setMapState={setMapState} autocompleteState={autocompleteState} setAutocompleteState={setAutocompleteState} />
			</Box>
			<Box className={classes.map}>
				<MyGoogleMap mapState={mapState} setMapState={setMapState} autocompleteState={autocompleteState} setAutocompleteState={setAutocompleteState} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }}>
				<FormControlLabel
					className={classes.switchWeather}
					control={<Switch defaultChecked checked={weatherMatters} />}
					label='Tener en cuenta el clima?'
					onClick={() => setWeatherMatters(!weatherMatters)}
					disabled={!autocompleteState.value}
				/>
			</Box>
			<Button onClick={onClick} component={Link} to='/meetform' type='submit' variant='contained' color='secondary' disabled={!meetTitle} className={classes.button}>
				Siguiente
			</Button>
		</Page>
	)
}

export default Step1
