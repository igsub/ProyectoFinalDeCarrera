import {Switch, TextField, Typography, Button, Box} from '@material-ui/core'
import { useEffect, useState } from 'react'
import datetimesService from '../../services/datetimesService'
import Meetcalendar from './Meetcalendar'
import Timelist from './Timelist'
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import weatherService from '../../services/weatherService'


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
        //backgroundColor: "lightgray", 
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        margin: "2rem",
        padding: "2rem",
    },
    submitButton: {
        display: "flex",
        alignSelf: "center",
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
        marginTop: "1rem"
    }
  }));

const Meetform = () => {
    const [description, setDescription] = useState("");
    const [weatherMatters, setWeatherMatters] = useState(false);
    const [datetime, setDatetime] = useState([]);
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState({});
    const [selectedTimes, setSelectedTimes] = useState([]);

    useEffect(() => {
        
    }, [ selectedDate ]);

    let data = {
        description: description,
        weather: weatherMatters
    }

    const handleDecriptionChange = (event) => {
        setDescription(event.target.value)
    };
    
    const handleWeatherMatters = (event) => {
        setWeatherMatters(event.target.checked)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        //datetimesService.addNewDatetime({meetId: uuidv4(), userId: "da", start: 3, end:5, description: "ddescripcion larga"})
    }

    const displayDateTimes = () => {
        datetimesService.getAll().then(item => setDatetime(item.data))
    }

    console.log(data.description,data.weather)
    return <Box className={classes.root}>
                <form onSubmit={handleSubmit} className={classes.form}>                  
                    
                    <div></div>
                    <Box className={classes.calendar}>
                        <Meetcalendar setSelectedDate={setSelectedDate}/>
                        <Timelist setSelectedTimes={setSelectedTimes}/>
                    </Box>
                    <Box className={classes.switchWeather}>
                        <FormControlLabel control={<Switch defaultChecked checked={weatherMatters} />} label="Tener en cuenta el clima?" onClick={() => setWeatherMatters(!weatherMatters)}/>
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