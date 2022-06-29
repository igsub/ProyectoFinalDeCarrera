import React, { useState, useEffect } from "react"
import userService from "../../Services/userService"
import { useAuth0 } from "@auth0/auth0-react"
import Page from "../General/Page"
import MUIDataTable from "mui-datatables"
import { makeStyles } from "@material-ui/core/styles"
import { Grid } from "@material-ui/core"

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

	useEffect(() => {
		if (user.email) {
			userService
				.getAllUserMeetings(user.email)
				.then((response) => setMeetings(response.data))
				.catch((error) => console.log(error))
		}
	}, [])

	const columns = [
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
		<Page showBack={true} flexDirection='column' justifyContent='center' alignItems='center' alignContent='center'>
			<MUIDataTable title={"My meetings"} data={meetings} columns={columns} options={options} className={classes.table} />
		</Page>
	)
}

export default MyMeetings
