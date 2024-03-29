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
import { isMobile } from "react-device-detect"

const useStyles = makeStyles((theme) => ({
	root: {},
	mobileTextfieldContainer: {
		margin: "0.4rem",
		width: "100%",
	},
	desktopTextfieldContainer: {
		margin: "0.4rem",
		width: "75%",
	},
	textfield: {
		width: "100%",
	},
	button: {
		marginTop: "1rem",
	},
	desktopMap: {
		height: "60vh",
		width: "100%",
		margin: "10px 50px",
		filter: "drop-shadow(-1px 5px 3px #ccc)",
	},
	mobileMap: {
		height: "60vh",
		width: "100%",
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
							weatherMatters: weatherMatters,
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
					weatherMatters: weatherMatters,
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
		<Page showBack={true} flexDirection='column' justifyContent='center' alignItems='center' alignContent='center' title="Meeting Information">
			<Box sx={{ display: "flex", alignItems: "flex-end" }} className={isMobile ? classes.mobileTextfieldContainer : classes.desktopTextfieldContainer}>
				<TitleIcon style={{ fill: "darkgrey" }} />
				<TextField variant='standard' color='secondary' label='Title' className={classes.textfield} onChange={(e) => setMeetTitle(e.target.value)} defaultValue={meetState.title} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }} className={isMobile ? classes.mobileTextfieldContainer : classes.desktopTextfieldContainer}>
				<EventNoteIcon style={{ fill: "darkgrey" }} />
				<TextField variant='standard' color='secondary' label='Description' className={classes.textfield} onChange={(e) => setMeetDescription(e.target.value)} defaultValue={meetState.description}/>
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }} className={isMobile ? classes.mobileTextfieldContainer : classes.desktopTextfieldContainer}>
				<LocationOnIcon style={{ fill: "darkgrey" }} />
				<GoogleAutocomplete mapState={mapState} setMapState={setMapState} autocompleteState={autocompleteState} setAutocompleteState={setAutocompleteState}/>
			</Box>
			<Box className={isMobile ? classes.mobileMap : classes.desktopMap}>
				<MyGoogleMap mapState={mapState} setMapState={setMapState} autocompleteState={autocompleteState} setAutocompleteState={setAutocompleteState} />
			</Box>
			<Box sx={{ display: "flex", alignItems: "flex-end" }}>
				<FormControlLabel
					className={classes.switchWeather}
					control={<Switch checked={weatherMatters} />}
					label='Wheater matters?'
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
