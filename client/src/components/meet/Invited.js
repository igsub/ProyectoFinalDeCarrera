import _, { forEach } from "lodash"
import MUIDataTable from "mui-datatables"
import React, { useEffect, useRef, useState } from "react"
import { makeStyles, createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import meetingService from "../../Services/meetingService"
import { setMeet } from "../../Store/meetSlice"
import Page from "../General/Page"
import moment from "moment"
import { Box, TextField, Button, Grid, Typography } from "@material-ui/core"
import { Email } from "@material-ui/icons"
import BadgeIcon from '@mui/icons-material/Badge';
import { useAuth0 } from "@auth0/auth0-react"
import DisplayMeetData from "./DisplayMeetData"
import { clsx } from 'clsx'
import WeatherCards from "./WeatherCards"


const useStyles = makeStyles((theme) => ({
	root: {},
	button: {
		margin: "1rem",
	},
	tableContainer: {
		marginTop: "1rem"
	},
	// buttonContainer: {
	// 	marginTop: "1rem"
	// },
	labelColor: {
    color: theme.palette.secondary.dark
  },
	submittedLabel:{
		color: theme.palette.secondary.dark,
		margin: "1rem"
	},
	button:{
		margin: "1rem"
	},
	meetEndedLabel: {
		margin: "1rem"
	},
}))

const getMuiTheme = (theme) => createTheme({
	overrides: {
		MUIDataTable: {
			root: {
			},
			paper: {
				//boxShadow: "none",
			}
		},
		MUIDataTableBodyRow: {
			root: {
				'&:nth-child(odd)': { 
					backgroundColor: '#06060626'
				}
			}
		},
		MUIDataTableBodyCell: {
			root: {

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

const Invited = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const classes = useStyles();
	const meetState = useSelector((state) => state.meet)
	const userState = useSelector((state) => state.user)
	const [selectedDates, setSelectedDates] = useState([])
	const [invitedName, setInvitedName] = useState("")
	const [data, setData] = useState([])
	const [hasVoted, setHasVoted] = useState(false)
	const [endedMeeting, setEndedMeeting] = useState(false)
	const [meetingDate, setMeetingDate] = useState(null)

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

	useEffect(() => {
		if (userState.email && data.length > 0) {
			setInvitedName(userState.fullName)
			const ownSelectedDatesIdx = _.findIndex(meetState.datetimesByUser, (dtByUser) => dtByUser.email === userState.email)
			const ownSelectedDates = ownSelectedDatesIdx !== -1 ? formatTableData(meetState.datetimesByUser[ownSelectedDatesIdx].datetimes) : []
			const idxs = []
			ownSelectedDates.forEach(ownDate => {
				let foundIdx = _.findIndex(data, el => el.date === ownDate.date && el.range === ownDate.range)
				if (foundIdx !== -1) idxs.push({index: foundIdx, dataIndex: foundIdx})
			})
			setSelectedDates(idxs)

			const datetime = meetState.final_selection
			if (datetime) {
				setMeetingDate({...datetime, from: datetime.timeslot.start, to: datetime.timeslot.end})
				setEndedMeeting(true)
			}
		}	
	}, [userState, data])

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
		meetingService.voteDatetimes({meeting_id: id, email: userState.email, datetimes: votes})
		
		setHasVoted(true)
	}
	
	const columns = [
		{
			name: "date",
			label: "Day",
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
			label: "From",
			options: {
				filter: false,
				sort: false
			}
		},
		{
			name: "end",
			label: "To",
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
		rowsSelected: selectedDates.length > 0 ? selectedDates.map(i => i.index) : [],
		isRowSelectable: () => !hasVoted && !endedMeeting,
		customToolbarSelect: () => null,
		onRowSelectionChange: (currentRowSelected, allRowsSelected) => {		
			console.log(allRowsSelected)	
			setSelectedDates(allRowsSelected)
		}
	}

	return (
		<>
		<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center' title="Vote Dates">
				{meetState.weatherMatters ? <WeatherCards /> : null}
				<DisplayMeetData title={meetState.title} description={meetState.description} location={meetState.location} />
					<>
						<Grid item xs={12}>
							<Typography variant="h5" className={classes.labelColor}>
								Email
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1">
								{userState.email}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="h5" className={classes.labelColor}>
								Name
							</Typography>
						</Grid>
						<Grid item xs={12} sm={8} md={4}>
							{userState.fullName  && userState.fullName !== userState.email? 
								<Typography variant="subtitle1">
									{userState.fullName}
								</Typography>
							: <TextField
							variant='standard'
							color="secondary"
							inputProps={{min: 0, style: { textAlign: 'center' }}}
							onChange={e => setInvitedName(e.target.value)}
						/>}							
						</Grid>
					</>
			<Grid container className={classes.tableContainer} justifyContent="center">
				<MuiThemeProvider theme={getMuiTheme()}>
					<MUIDataTable title={"Dates available"} data={data} columns={columns} options={options} />
				</MuiThemeProvider>
			</Grid>
			<Grid container className={classes.buttonContainer} justifyContent="center">
				{hasVoted? 
				<Typography variant="h5" className={classes.labelColor}>
					Votes Submitted!
				</Typography>
				: endedMeeting ? 
				<Typography component="div" variant="h6" className={classes.meetEndedLabel}>
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
				</Typography>
				:<Button
					onClick={submitVotes}
					variant="contained"
					color="secondary"
					disabled={!invitedName || selectedDates.length === 0}
					className={classes.button}
				>
					Send selected dates
				</Button>
				}	
			</Grid>
		</Page>
		</>
	)
}

export default Invited
