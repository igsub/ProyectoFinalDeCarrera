import Page from "../General/Page"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles, createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { setMeet } from "../../Store/meetSlice"
import meetingService from "../../Services/meetingService"
import MUIDataTable from "mui-datatables"
import _, { forEach } from "lodash"
import moment from "moment"
import DisplayMeetData from "./DisplayMeetData"
import InvitationLinkButton from "./InvitationLinkButton"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { IconButton, Modal, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"
import WeatherCards from "./WeatherCards"

const useStyles = makeStyles((theme) => ({
	root: {},
	table: {
		margin: "1rem",
	},
	button: {
		margin: "1rem",
	},
	meetEndedLabel: {
		margin: "1rem"
	},
	selectFInalDateButton: {
		color: theme.palette.secondary.main
	},
}))

const getMuiTheme = (theme) => createTheme({
	overrides: {
		MUIDataTableBodyRow: {
			root: {
				'&:nth-child(odd)': { 
					backgroundColor: '#06060626'
				}
			}
		},
		MuiTableRow: { 
			root: 
			{ 
				'&$hover:hover': {
					backgroundColor: '#f7cfdca1'
				},
				'&$selected': {
					backgroundColor: '#f7cfdca1 !important'
				}
			}
		}
	}
})

const MeetStatus = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const meetState = useSelector((state) => state.meet)
	const classes = useStyles()
	const location = useLocation()
	const from = location.state ? location.state?.from : null
	const [data, setData] = useState([])
	const [selectedDate, setSelectedDate] = useState(null)
	const [openDialog, setOpenDialog] = useState(false)
	const [loading, setLoading] = useState(false)
	const [endedMeeting, setEndedMeeting] = useState(false)
	const [meetingDate, setMeetingDate] = useState(null)

	const formatTableData = (array) => {
		let formattedData = []
		forEach(array, (dt) => {
			forEach(dt.timeslots, (ts) => {
				formattedData.push({ date: dt.date, range: ts.range, start: ts.start, end: ts.end })
			})
		})
		return _.sortBy(formattedData, ["date", "range"])
	}

	const getMeetingData = () => {
		meetingService
				.getMeeting(id)
				.then((response) => {
					dispatch(setMeet(response.data?.meeting))
					const datetime = response.data?.meeting.final_selection
					if (datetime) setMeetingDate({...datetime, from: datetime.timeslot.start, to: datetime.timeslot.end})
				})
				.catch((e) => console.log(e))
	}

	useEffect(() => {
		if (id) {
			let isMounted = true
			
			meetingService
				.getMostVoted(id)
				.then((response) => {
					const mapData = _.orderBy(response.data.votos.map(item => (
						{
							...item, 
							start: item.timeslot.start, 
							end: item.timeslot.end, 
							range: item.timeslot.range
						})), 
						["count", "date", "range"], ["desc", "asc", "asc"])
					setData(mapData)
				})
				.catch((e) => console.log(e))

			getMeetingData()
			return () => {
				isMounted = false
			}
		}
	}, [id])

	useEffect(() => {
		if (meetingDate && data) {
			const idx = data.findIndex(item => item.date === meetingDate.date)
			setSelectedDate({index: idx, dataIndex: idx})
			setEndedMeeting(true)
		}
	}, [meetingDate, data])


	const selectFinalDate = () => {
		setOpenDialog(true)
	}

	const handleClose = () => {
		setOpenDialog(false)
	}

	const handleSubmitFinalDate = () => {
		console.log(selectedDate)
		const finalDate = data[selectedDate.index]
		const finalDatetime = {
			meeting_id: id,
			date: finalDate.date,
			timeslot: finalDate.timeslot
		}
		setLoading(true)
		meetingService.selectFinalDatetime(finalDatetime)
			.then(response => {
				console.log(response)
				if (response.status === 200) setEndedMeeting(true)
				setLoading(false)
				setOpenDialog(false)
			})
			.catch(error => {
				console.log(error)
				setLoading(false)
				setOpenDialog(false)
			})
	}

	const columns = [
		{
			name: "date",
			label: "Day",
			options: {
				filter: true,
				sort: false,
				customBodyRender: (v) => moment(v, "YYYY/MM/DD").format("dddd D [of] MMMM[,] YYYY"),
			},
		},
		{
			name: "range",
			options: {
				display: "excluded",
			},
		},
		{
			name: "start",
			label: "From",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			name: "end",
			label: "To",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			name: "votes",
			label: "Votes",
			options: {
				filter: false,
				sort: false,
			},
		},
		{
			name: "count",
			label: "Priority",
			options: {
				filter: false,
				sort: false,
			},
		}
	]

	const options = {
		selectableRows: "single",
		search: false,
		filterType: "dropdown",
		download: false,
		print: false,
		filter: false,
		viewColumns: false,
		rowsSelected: selectedDate ? [selectedDate.index] : [],
		customToolbarSelect: () => null,
		isRowSelectable: () => !endedMeeting,
		onRowSelectionChange: (currentRowSelected) => {
			if (selectedDate?.index === currentRowSelected[0]?.index) {
				setSelectedDate(null)
			} else {
				setSelectedDate(currentRowSelected[0])
			}
		},
		customToolbarSelect: () => (<>
			<IconButton title="Select date for the meeting" onClick={selectFinalDate}>
				<EventAvailableIcon className={classes.selectFInalDateButton}/>
			</IconButton>
		</>)
	}

	return (
		<>
			<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center' title="Meeting" showBack={from === "mymeetings"}>
				{meetState.weatherMatters ? <WeatherCards /> : null}
				<DisplayMeetData title={meetState.title} description={meetState.description} location={meetState.location} />
				<MuiThemeProvider theme={getMuiTheme()}>
					<MUIDataTable title={"Dates available to choose"} data={data} columns={columns} options={options} className={classes.table} />
				</MuiThemeProvider>
				{!endedMeeting ? 
					<InvitationLinkButton path={`${window.location.protocol}//${window.location.host}/meetinvitation/${id}`} className={classes.button} /> 
					: <Typography variant="h6" className={classes.meetEndedLabel}>
					The meeting was set for 
					<Box fontWeight={700} display='inline'>
						{` ${moment(meetingDate.date, "YYYY/MM/DD").format("dddd D [of] MMMM[,] YYYY")} `}
					</Box>
					, between 
					<Box fontWeight={700} display='inline'>
						{` ${meetingDate.from}`}
					</Box>
					hs and 
					<Box fontWeight={700} display='inline'>
						{` ${meetingDate.to}`}
					</Box>
					hs
						</Typography>}
				
			</Page>
			<Dialog
				open={openDialog}
				onClose={handleClose}>
				<DialogTitle>
					{"Decide date?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						If you continue, the selected date will be the final date for the meeting and emails will be sent to all the invitees.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={handleClose}>Cancel</Button>
					{!loading ? <Button variant="contained" color="secondary" onClick={handleSubmitFinalDate} autoFocus>Continue</Button> 
					: <CircularProgress color='secondary' /> }
				</DialogActions>
			</Dialog>
		</>
	)
}

export default MeetStatus
