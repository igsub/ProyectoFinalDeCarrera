import React, { useState, useEffect } from "react"
import userService from "../../Services/userService"
import { useAuth0 } from "@auth0/auth0-react"
import Page from "../General/Page"
import MUIDataTable from "mui-datatables"
import { makeStyles, createTheme, MuiThemeProvider } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
	root: {},
	table: {
		margin: "1rem",
	},
}))

const MyMeetings = () => {
	const { user } = useAuth0()
	const [meetings, setMeetings] = useState([])
	const classes = useStyles()
	const history = useHistory()

	useEffect(() => {
		if (user?.email) {
			userService
				.getAllUserMeetings(user.email)
				.then((response) => setMeetings(response.data))
				.catch((error) => console.log(error))
		}
	}, [user])
	

	const columns = [
		{
			name: "_id",
			options: {
				filter: true,
				sort: false,
				display: "excluded"
			},
		},
		{
			name: "title",
			label: "Title",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "description",
			label: "Description",
			options: {
				filter: true,
				sort: false,
			},
		},
		{
			name: "location",
			label: "Location",
			options: {
				filter: false,
				sort: false,
				customBodyRender: (v) => (v ? v.address : "Not available"),
			},
		},
		{
			name: "ownerEmail",
			label: "Owner Email",
			options: {
				filter: false,
				sort: false,
			},
		},
	]

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

	const options = {
		selectableRows: "none",
		search: false,
		filterType: "dropdown",
		download: false,
		print: false,
		filter: false,
		viewColumns: false,
		customToolbarSelect: () => null,
		onRowClick: (rowData) => {
			if (rowData[4] === user.email)
				history.push({pathname: `/meet/${rowData[0]}`, state: {from: "mymeetings"}})
			else 
				history.push({pathname: `/meetinvitation/${rowData[0]}`, state: {from: "mymeetings"}})
		}
	}

	return (
		<Page showBack={true} flexDirection='column' justifyContent='center' alignItems='center' alignContent='center' title="My Meetings">
			<MuiThemeProvider theme={getMuiTheme()}>
				<MUIDataTable title={"Created meetings and invitations"} data={meetings} columns={columns} options={options} className={classes.table} />
			</MuiThemeProvider>
		</Page>
	)
}

export default MyMeetings
