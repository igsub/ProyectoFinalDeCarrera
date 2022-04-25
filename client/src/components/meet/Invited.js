import _, { forEach } from "lodash"
import MUIDataTable from "mui-datatables"
import React, { useEffect, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import meetingService from "../../Services/meetingService"
import { setMeet } from "../../Store/meetSlice"
import Page from "../General/Page"
import moment from "moment"
import { Box, TextField, Button } from "@material-ui/core"
import { Email } from "@material-ui/icons"
import { DriveEta } from "@material-ui/icons"
import { useAuth0 } from "@auth0/auth0-react"
import DisplayMeetData from "./DisplayMeetData"

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
	calendar: {
		display: "flex",
		flexDirection: "row",
	},
}))

const Invited = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const classes = useStyles();
	const meetState = useSelector((state) => state.meet)
	const userState = useSelector((state) => state.user)
	const [selectedDates, setSelectedDates] = useState([])
	const [invitedName, setInvitedName] = useState()
	const [invitedEmail, setInvitedEmail] = useState()
	const[data, setData] = useState([]);
	const { isAuthenticated } = useAuth0()

	const formatTableData = (array) => {
		let formattedData = []
		forEach(array, dt => {
			forEach(dt.timeslots, ts => {
				formattedData.push({date: dt.date, range: ts.range, start: ts.start, end: ts.end})
			})
		})
		return _.sortBy(formattedData, ['date', 'range'])
	}

	useEffect(() => {
		if (id) {
			let isMounted = true
			meetingService
				.getMeeting(id)
				.then((response) => {
					dispatch(setMeet(response.data?.meeting))
					const meet = response.data?.meeting
					const idx = _.findIndex(meet.datetimesByUser, (dtByUser) => dtByUser.email === meet.ownerEmail)
					const tableData = formatTableData(meet.datetimesByUser[idx].datetimes)
					if (isMounted) setData(tableData)
				})
				.catch((e) => console.log(e))

			return () => { isMounted = false }
		}
	}, [id])

	const submitVotes = () => {
		let votes = []
		_.forEach(selectedDates, (sd) => {
			let currentValue = data[sd.index]
			if (votes.length > 0 && _.findIndex(votes, v => v.date === currentValue.date) !== -1) {
				let idx = _.findIndex(votes, v => v.date === currentValue.date)
				votes[idx].timeslots.push({
					range: currentValue.range,
					start: currentValue.start,
					end: currentValue.end
				})
			}
			else {
				const timeslots = [{
					range: currentValue.range,
					start: currentValue.start,
					end: currentValue.end
				}]
				votes.push({date: currentValue.date, timeslots})
			}
		})
		meetingService.voteDatetimes({meeting_id: id, email: invitedEmail, datetimes: votes})
	}
	
	const columns = [
		{
			name: "date",
			label: "Día",
			options: {
				filter: true,
				sort: false,
				customBodyRender: v => moment(v, "YYYY/MM/DD").format('dddd D [of] MMMM [,] YYYY')
			}
		},
		{
			name: "range",
			options: {	
				display: "excluded"
			}
		},
		{
			name: "start",
			label: "Desde",
			options: {
				filter: false,
				sort: false
			}
		},
		{
			name: "end",
			label: "Hasta",
			options: {
				filter: false,
				sort: false
			}
		}
	]
	const options = {
		search: false,
		filterType: "dropdown",
		download: false,
		print: false,
		filter: false,
		viewColumns: false,
		customToolbarSelect: () => null,
		onRowSelectionChange: (currentRowSelected, allRowsSelected) => {			
			setSelectedDates(allRowsSelected)
		}
	}

	return (
		<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center'>
				<DisplayMeetData title={meetState.title} description={meetState.description} location={meetState.location} />
					{!isAuthenticated ? (<>
						<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
							<Email style={{ fill: "darkgrey" }} />
							<TextField
								variant='standard'
								label='Email'
								className={classes.textfield}
								onChange={e => setInvitedEmail(e.target.value)}
								InputProps={{
									readOnly: false,
								}}
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
							<DriveEta style={{ fill: "darkgrey" }} />
							<TextField
								variant='standard'
								label='Nombre'
								className={classes.textfield}
								onChange={e => setInvitedName(e.target.value)}
								InputProps={{
									readOnly: false,
								}}
							/>
						</Box>
					</>) : <>
						<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
							<Email style={{ fill: "darkgrey" }} />
							<TextField
								variant='standard'
								label='Email'
								className={classes.textfield}
								InputProps={{
									readOnly: true,
								}}
								value={userState.email}
								focused
							/>
						</Box>
						<Box sx={{ display: "flex", alignItems: "flex-end" }} className={classes.textfieldContainer}>
							<DriveEta style={{ fill: "darkgrey" }} />
							<TextField
								variant='standard'
								label='Nombre'
								className={classes.textfield}
								InputProps={{
									readOnly: true,
								}}
								value={userState.fullName}
								focused
							/>
						</Box>
					</>
					}
			<MUIDataTable title={"Días y horarios disponibles"} data={data} columns={columns} options={options} />
			<Button
				onClick={submitVotes}
				variant="contained"
				color="secondary"
			>
				Enviar Seleccionados
			</Button>
		</Page>
	)
}

export default Invited
