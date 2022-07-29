import React from "react"
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, makeStyles, alpha, createTheme, MuiThemeProvider } from "@material-ui/core"
import TimeIcon from "@material-ui/icons/AccessTime"
import { useDispatch, useSelector } from "react-redux"
import { setMeet } from "../../Store/meetSlice"
import _ from "lodash"

const useStyles = makeStyles(() => ({
	selectedListItem: {
		backgroundColor: "lightgrey",
	},
	listItemIcon: {
		minWidth: "30px"
	}
}))

const fourHourTime = [
	{
		range: 1,
		start: "8:00",
		end: "12:00",
		description: "Morning",
		color: "#FFF3D0"
	},
	{
		range: 2,
		start: "12:00",
		end: "16:00",
		description: "Afternoon",
		color: "#FFE3A7"
	},
	{
		range: 3,
		start: "16:00",
		end: "20:00",
		description: "Evening",
		color: "#FF7040"
	},
	{
		range: 4,
		start: "20:00",
		end: "24:00",
		description: "Night",
		color: "#42518C"
	},
]

const Timelist = (props) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const meetState = useSelector((state) => state.meet)

	const handleCheck = (value) => {
		const newValues = _.cloneDeep(meetState.currentTimes) || []
		const idx = _.findIndex(newValues, (t) => t.range === value.range)

		idx === -1 ? newValues.push(value) : newValues.splice(idx, 1)

		const newDatetimes = _.cloneDeep(meetState.datetimes)
		const datetimesIdx = _.findIndex(newDatetimes, (dt) => dt.date === meetState.currentDate)
		newDatetimes[datetimesIdx].times = newValues

		dispatch(
			setMeet({
				...meetState,
				currentTimes: newValues,
				datetimes: newDatetimes,
			})
		)
	}

	

const muiTheme = createTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "red",
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "yellow",
        },
      },
    },
  },
});

const getListItemColor = (item) => {
	return meetState.currentTimes && _.findIndex(meetState.currentTimes, (ct) => ct.range === item.range) !== -1 ? "white" : alpha(item.color, 0.5)
}

	return (
		<MuiThemeProvider theme={muiTheme}>
		<List style={{ maxHeight: 400, overflow: "auto" }}>
			{fourHourTime.map((t) => (
				<ListItem
					style={{selected: "red", backgroundColor: getListItemColor(t)}}
					className={meetState.currentTimes && _.findIndex(meetState.currentTimes, (ct) => ct.range === t.range) !== -1 ? classes.selectedListItem : null}
					key={t.start}
					button
					onClick={() => handleCheck(t)} 
					disabled={meetState.currentDate ? false : true}
				>
					<ListItemIcon className={classes.listItemIcon}>
						<Checkbox color="red" edge='start' checked={_.findIndex(meetState.currentTimes, (ct) => (ct ? t.range === ct.range : -1)) !== -1} disableRipple />
					</ListItemIcon>
					<ListItemIcon className={classes.listItemIcon}>
						<TimeIcon />
					</ListItemIcon>
					<ListItemText primary={`${t.description} (${t.start} - ${t.end})`} />
				</ListItem>
			))}
		</List>
		</MuiThemeProvider>
	)
}

export default Timelist
