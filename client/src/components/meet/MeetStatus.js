import { Box, TextField } from "@material-ui/core"
import Page from "../General/Page"
import { useSelector, useDispatch } from "react-redux"
import LocationOnIcon from "@material-ui/icons/LocationOn"
import TitleIcon from "@material-ui/icons/Title"
import EventNoteIcon from "@material-ui/icons/EventNote"
import { makeStyles } from "@material-ui/core/styles"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { setMeet } from "../../Store/meetSlice"
import meetingService from "../../Services/meetingService"
import MUIDataTable from "mui-datatables"
import _, { forEach } from "lodash"
import moment from "moment"
import DisplayMeetData from "./DisplayMeetData"
import InvitationLinkButton from "./InvitationLinkButton"

const useStyles = makeStyles((theme) => ({
	root: {},
	textfieldContainer: {
		margin: "0.4rem",
		width: "50%",
	},
	table: {
		margin: "1rem"
	},
	textfield: {
		width: "100%",
	},
	button: {
		margin: "1rem",
	},
}))

const MeetStatus = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const meetState = useSelector((state) => state.meet)
	const classes = useStyles()
	const [selectedDates, setSelectedDates] = useState([])
	const[data, setData] = useState([])

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
					console.log("getMeetingResponse: ", response)
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
		selectableRows: "none",
		search: false,
		filterType: "dropdown",
		download: false,
		print: false,
		filter: false,
		viewColumns: false,
		customToolbarSelect: () => null,
	}

	return (
		<>
			<Page flexDirection='column' justifyContent='center' alignItems='center' alignContent='center'>
				<DisplayMeetData title={meetState.title} description={meetState.description} location={meetState.location} />
				<MUIDataTable title={"Días y horarios disponibles"} data={data} columns={columns} options={options} className={classes.table}/>
				<InvitationLinkButton path={`${window.location.protocol}//${window.location.host}/meetinvitation/${id}`} className={classes.button}/>
			</Page>
		</>
	)
}

export default MeetStatus
