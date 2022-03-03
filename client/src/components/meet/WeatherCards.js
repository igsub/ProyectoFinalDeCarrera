import { Card, Box } from "@material-ui/core"
import { useSelector } from "react-redux"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import { Tooltip } from "@mui/material"
import { makeStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import moment from "moment"

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		overflowX: "auto",
		display: "flex",
	},
	cards: {
		display: "flex",
		flexDirection: "row",
	},
	cardContent: {
		textAlign: "center",
	},
}))

const WeatherCards = () => {
	const meetState = useSelector((state) => state.meet)
	const classes = useStyles()

	const formatDatatime = (d) => {
		const date = moment(d, "YYYY-MM-DD hh:mm:ss").format("LL")
		const time = moment(d).hour() + " hs"
		return (
			<>
				<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
					{date}
				</Typography>
				<br />
				<Typography sx={{ fontSize: 16, fontWeight: "bold" }} color='text.secondary' gutterBottom>
					{time}
				</Typography>
			</>
		)
	}

	return (
		<Paper className={classes.root}>
			<TableContainer style={{ width: 800 }}>
				<Table aria-label='simple table'>
					<TableBody>
						<TableRow>
							{meetState.weather.map((d) => (
								<TableCell key={d.datetime}>
									<Card sx={{ minWidth: 100 }} key={d.datetime}>
										<CardContent className={classes.cardContent}>
											{formatDatatime(d.datetime)}
											<Typography variant='h5' component='div'>
												<img alt='' src={`http://openweathermap.org/img/wn/${d.weather[0].icon}.png`} title={d.weather[0].description} />
											</Typography>
											<Typography sx={{ mb: 1.5 }} color='text.secondary'>
												{d.weather[0].main}
											</Typography>
										</CardContent>
									</Card>
								</TableCell>
							))}
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default WeatherCards
