import Nextprev from '../general/Nextprev'
import {Switch, TextField, Typography, Button} from '@material-ui/core'
import Card from '../general/Card'
import { useState } from 'react'
import datetimesService from '../../services/datetimesService'
import Meetcalendar from './Meetcalendar'
import Timelist from './Timelist'
import TwoColumnCard from '../general/TwoColumnCard'


const Meetform = () => {
    const [description, setDescription] = useState("");
    const [weathermatters, setWeatherMatters] = useState(false);
    const [datetime, setDatetime] = useState([]);
    
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
        datetimesService.newdatetime(data);
        displayDateTimes();
    }
    const displayDateTimes = () => {
        datetimesService.getAll().then(item => setDatetime(item.data))
    }

    console.log(data.description,data.weather)
    return <Card>
                <form onSubmit={handleSubmit}>       
                    <TextField id="outlined-basic" label="Motivo de la reunion" variant="outlined" onChange={handleDecriptionChange}></TextField>
                    <Typography>Weather matters?</Typography>
                    <Switch onChange={handleWeatherMatters}></Switch>
                    <div></div>
                    <TwoColumnCard>
                        <Meetcalendar/>
                        <Timelist/>
                    </TwoColumnCard>
                    <Button color="primary" type="submit">submit</Button>
                </form>
                <div>
                    <ul>
                        {datetime.map(p => <li key={p._id}>{p.description} - {p.weather? "True":"False"}</li>)}
                    </ul>  
                </div>                   
                <Nextprev/>
            </Card>
}

export default Meetform;