import Nextprev from '../general/Nextprev'
import './Meetform.css'
import {TextField} from '@material-ui/core'

const Meetform = () => {
    
    return <Nextprev>
        
        <label>
            <TextField id="outlined-basic" label="Motivo de la reunion" variant="outlined"></TextField>
        </label>
              
    </Nextprev>
}

export default Meetform;