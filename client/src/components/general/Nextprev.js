import Card from './Card'
import './General.css'
import {Button} from '@material-ui/core'

const Nextprev = (props) => {
    const classes = props.className? 'nextprev ' + props.className: 'nextprev';
    return <Card className={classes}>
        {props.children}
        <div className='buttons '>            
                <Button className='prevbutton'>Previous</Button>            
                <Button className='nextbutton'>Next</Button>            
        </div>
    </Card>
}

export default Nextprev;