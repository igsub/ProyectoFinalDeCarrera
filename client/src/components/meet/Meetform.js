import Nextprev from '../general/Nextprev'
import {Switch, TextField, Typography, Button, Box} from '@material-ui/core'
import { useState } from 'react'
import datetimesService from '../../services/datetimesService'
import Meetcalendar from './Meetcalendar'
import Timelist from './Timelist'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap"
    },
    form:{
        display: "flex",
        borderRadius:"8px",
        backgroundColor: "lightgray", 
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "2rem",
        padding: "2rem",
    },
    submitButton: {
        display: "flex",
        alignSelf:"flex-end",
        padding: "2rem",
    },
    nextPrev: {
        display: "flex",
        justifyContent: "flex-end"
    },
    calendar: {
        display: "flex",
        flexDirection: "row"
    },
    switchWeather: {
        display: "inline-flex",
        alignContent: "flex-end"
    }
  }));

const Meetform = () => {
    const [description, setDescription] = useState("");
    const [weathermatters, setWeatherMatters] = useState(false);
    const [datetime, setDatetime] = useState([]);
    const classes = useStyles();
    const [selectedDateAndTimes, setSelectedDateAndTimes] = useState({});

    let data = {
        description: description,
        weather: weathermatters
    }

    const handleDecriptionChange = (event) => {
        setDescription(event.target.value)
    };
    const handleWeatherMatters = (event) => {
        setWeatherMatters(event.target.checked)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        datetimesService.addNewDatetime({meetId: "test", userId: "da", start: 3, end:5, description: "ddescripcion larga"})
    }
    const displayDateTimes = () => {
        datetimesService.getAll().then(item => setDatetime(item.data))
    }

    console.log(data.description,data.weather)
    return <Box className={classes.root}>
                <form onSubmit={handleSubmit} className={classes.form}>       
                    <TextField id="outlined-basic" label="Motivo de la reunion" variant="outlined" onChange={handleDecriptionChange}></TextField>
                    <Box className={classes.switchWeather}>
                        <Typography>Importa el clima?</Typography>
                        <Switch onChange={handleWeatherMatters}>Importa el clima?</Switch>
                    </Box>
                    <div></div>
                    <Box className={classes.calendar}>
                        <Meetcalendar setSelectedDate={setSelectedDateAndTimes}/>
                        <Timelist setSelectedTimes={setSelectedDateAndTimes}/>
                    </Box>
                    <Box className={classes.submitButton}>
                        <Button type="submit" variant="contained" color="primary">Crear</Button>
                    </Box>
                </form>
                {/* <Box>
                    <ul>
                        {datetime.map(p => <li key={p._id}>{p.description} - {p.weather? "True":"False"}</li>)}
                    </ul>  
                </Box> */}
            </Box>
}

export default Meetform;