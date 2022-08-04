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
import { isMobile } from "react-device-detect"

const MOBILE_WIDTH = isMobile ? window.innerWidth - 2 * parseFloat(getComputedStyle(document.documentElement).fontSize) : "800px"

const useStyles = makeStyles((theme) => ({
	root: {
		overflowX: "auto",
		display: "flex",
		marginBottom: "1rem"
	},
	cards: {
		display: "flex",
		flexDirection: "row",
	},
	cardContent: {
		textAlign: "center",
	},
}))

const mapDayWeatherToColor = {
	"01d": "#0089ff26",
	"02d": "#F1F1F126",
	"03d": "#ffffff",
	"04d": "#4E696926",
	"09d": "#32323c26",
	"10d": "#09447926",
	"11d": "#17296626",
	"13d": "#90b8cf26",
	"50d": "#97aedd26",
	"01n": "#0089ff26",
	"02n": "#F1F1F126",
	"03n": "#ffffff",
	"04n": "#4E696926",
	"09n": "#32323c26",
	"10n": "#09447926",
	"11n": "#17296626",
	"13n": "#90b8cf26",
	"50n": "#97aedd26",
}

const WeatherCards = () => {
	const meetState = useSelector((state) => state.meet)
	const classes = useStyles()

	const formatDatatime = (d) => {
		const date = moment(d, "YYYY-MM-DD hh:mm:ss").format("dddd D [of] MMMM[,] YYYY")
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
			<TableContainer style={{ maxWidth: MOBILE_WIDTH, overflowX: "none" }}>
				<Table aria-label='simple table'>
					<TableBody>
						<TableRow>
							{meetState.weather.map((d) => (
								<TableCell key={d.datetime}>
									<Card sx={{ minWidth: 100 }} key={d.datetime} style={{ backgroundColor: mapDayWeatherToColor[d.weather[0].icon] }}>
										<CardContent className={classes.cardContent}>
											{formatDatatime(d.datetime)}
											<Typography variant='h5' component='div'>
												<img alt='' src={`http://openweathermap.org/img/wn/${d.weather[0].icon}.png`} title={d.weather[0].description} />
											</Typography>
											<Typography sx={{ mb: 1.5 }} color='text.secondary'>
												{d.weather[0].main}
											</Typography>
											<Typography sx={{ mb: 1.5 }} color='text.secondary'>											
												{`${Math.round(d.main.temp)}°C`}
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
