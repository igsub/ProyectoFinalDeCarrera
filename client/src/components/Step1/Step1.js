import { TextField, Box } from "@material-ui/core"
import Page from "../general/Page"
import LocationOnIcon from '@material-ui/icons/LocationOn';
import TitleIcon from '@material-ui/icons/Title';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root:{
    },
    textfieldContainer: {
        margin: "0.4rem",
        width: "50%"
    },
    textfield: {
        width: "100%"
    }
  }));

const Step1 = () => {
    const classes = useStyles();

    return <Page flexDirection="column" justifyContent="center" alignItems="center" alignContent="center" >
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.textfieldContainer}>
            <TitleIcon style={{fill: "darkgrey"}}/>
            <TextField variant="standard" label="Título" className={classes.textfield}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.textfieldContainer}>
            <LocationOnIcon style={{fill: "darkgrey"}}/>
            <TextField variant="standard" label="Ubicación" className={classes.textfield}/>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={classes.textfieldContainer}>
            <EventNoteIcon style={{fill: "darkgrey"}}/>
            <TextField variant="standard" label="Notas adicionales" className={classes.textfield}/>
        </Box>
    </Page>
}

export default Step1