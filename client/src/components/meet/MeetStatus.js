import Page from "../General/Page"
import { useSelector, useDispatch } from "react-redux"
import { makeStyles, createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { setMeet } from "../../Store/meetSlice"
import meetingService from "../../Services/meetingService"
import MUIDataTable from "mui-datatables"
import _, { forEach } from "lodash"
import moment from "moment"
import DisplayMeetData from "./DisplayMeetData"
import InvitationLinkButton from "./InvitationLinkButton"
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { IconButton, Modal, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core"
import CircularProgress from "@material-ui/core/CircularProgress"

const useStyles = makeStyles((theme) => ({
	root: {},
	table: {
		margin: "1rem",
	},
	button: {
		margin: "1rem",
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
				},
				// '&:nth-child(1)': { 
				// 	backgroundColor: '#b2ff66'
				// },
				// '&:nth-child(2)': { 
				// 	backgroundColor: '#d4f7b2'
				// },
				// '&:nth-child(3)': { 
				// 	backgroundColor: '#e2f5cf'
				// },
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
	const [data, setData] = useState([])
	const [selectedDate, setSelectedDate] = useState(null)
	const [openDialog, setOpenDialog] = useState(false)
	const [loading, setLoading] = useState(false)
	const [endedMeeting, setEndedMeeting] = useState(false)

	const formatTableData = (array) => {
		let formattedData = []
		forEach(array, (dt) => {
			forEach(dt.timeslots, (ts) => {
				formattedData.push({ date: dt.date, range: ts.range, start: ts.start, end: ts.end })
			})
		})
		return _.sortBy(formattedData, ["date", "range"])
	}

	useEffect(() => {
		if (id) {
			let isMounted = true
			meetingService
				.getMeeting(id)
				.then((response) => {
					console.log("getMeetingResponse: ", response)
					dispatch(setMeet(response.data?.meeting))
				})
				.catch((e) => console.log(e))
			
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

			return () => {
				isMounted = false
			}
		}
	}, [id])


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
				customBodyRender: (v) => moment(v, "YYYY/MM/DD").format("dddd D [of] MMMM [,] YYYY"),
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
		responsive: "standard",
		customToolbarSelect: () => null,
		isRowSelectable: () => !endedMeeting,
		onRowSelectionChange: (currentRowSelected) => {			
			setSelectedDate(currentRowSelected[0])
		},
		customToolbarSelect: () => (<>
			<IconButton title="Select date for the meeting" onClick={selectFinalDate}>
				<EventAvailableIcon className={classes.selectFInalDateButton}/>
			</IconButton>
		</>)
	}

	return (
		<>
			<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center'>
				<DisplayMeetData title={meetState.title} description={meetState.description} location={meetState.location} />
				<MuiThemeProvider theme={getMuiTheme()}>
					<MUIDataTable title={"Dates available to choose"} data={data} columns={columns} options={options} className={classes.table} />
				</MuiThemeProvider>
				{!endedMeeting ? <InvitationLinkButton path={`${window.location.protocol}//${window.location.host}/meetinvitation/${id}`} className={classes.button} /> : null}
				
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
